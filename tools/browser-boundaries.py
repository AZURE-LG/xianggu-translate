"""在隔离扩展中验证长内容、服务错误、触屏、键盘和文字对比。"""
import asyncio
import importlib.util
import json
import tempfile
import threading
from http.server import ThreadingHTTPServer
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('smoke', ROOT/'tools/browser-smoke.py')
smoke = importlib.util.module_from_spec(spec)
spec.loader.exec_module(smoke)
OUT = ROOT/'artifacts/boundaries'
OUT.mkdir(parents=True, exist_ok=True)

class Handler(smoke.MockHandler):
    fail = False
    def do_POST(self):
        if self.fail:
            self.rfile.read(int(self.headers.get('Content-Length', '0')))
            self.send_cors(status=401)
            self.wfile.write(b'{"error":{"message":"Invalid API key"}}')
        else:
            super().do_POST()
    def log_message(self, *args):
        pass

CONTRAST = '''e => {
  const color = value => value.match(/[\\d.]+/g).map(Number);
  const lum = rgb => rgb.slice(0,3).map(v => v/255).map(v => v<=.04045 ? v/12.92 : ((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
  const foreground = color(getComputedStyle(e).color);
  let node=e, background;
  while(node) { const rgb=color(getComputedStyle(node).backgroundColor); if(rgb.length===3 || rgb[3]===1) { background=rgb; break; } node=node.parentElement; }
  if(!background) background=[255,255,255];
  const a=lum(foreground), b=lum(background);
  return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
}'''

async def main():
    report = {'数据来源':'全部为本地测试输入与模拟服务，不代表真实翻译质量或远端服务可用性'}
    server=ThreadingHTTPServer(('127.0.0.1',11434),Handler)
    threading.Thread(target=server.serve_forever,daemon=True).start()
    try:
        async with async_playwright() as p:
            with tempfile.TemporaryDirectory(prefix='xianggu-boundary-') as profile:
                context=await p.chromium.launch_persistent_context(profile, executable_path=str(smoke.find_chromium()), headless=True, has_touch=True, viewport={'width':390,'height':720}, args=[f'--disable-extensions-except={smoke.EXTENSION}',f'--load-extension={smoke.EXTENSION}'])
                try:
                    if not context.service_workers: await context.wait_for_event('serviceworker')
                    worker=next(w for w in context.service_workers if w.url.endswith('/js/worker.js'))
                    base=f"chrome-extension://{worker.url.split('/')[2]}/panel.html"
                    page=await context.new_page()
                    errors=[]
                    page.on('pageerror',lambda e: errors.append(str(e)))
                    await page.goto(base+'?mode=sidepanel')
                    await page.wait_for_selector('body[data-ready="true"]')
                    await page.evaluate('''async () => { await chrome.storage.local.set({config:{version:2,provider:'ollama',baseUrl:'http://localhost:11434/v1',apiKey:'',model:'mock-chat',sourceLanguage:{type:'auto',code:'auto',label:'自动检测'},targetLanguage:{type:'preset',code:'en',label:'英语'},autoTranslate:false,theme:'light',colorPreset:'graphite'}}); }''')
                    await page.reload()
                    await page.wait_for_selector('#translator:not([hidden])')
                    await page.fill('#input','字'*5001)
                    assert await page.locator('#input').get_attribute('aria-invalid') == 'true'
                    assert await page.locator('#primaryButton').is_disabled()
                    assert '超出 1 字' in await page.text_content('#charCount')
                    await page.keyboard.press('Control+Enter')
                    assert await page.locator('#status').evaluate("e=>e.classList.contains('error')")
                    long_text=('这是一段用于检查长内容滚动的测试文本。\n'*120)+'x'*1800
                    await page.fill('#input',long_text)
                    assert await page.locator('#input').get_attribute('aria-invalid') == 'false'
                    await page.keyboard.press('Control+Enter')
                    await page.wait_for_function("() => !document.body.classList.contains('request-running') && document.body.classList.contains('has-output')")
                    assert await page.text_content('#output') == f'MOCK[{long_text}]'
                    assert await page.locator('#output').evaluate('e=>e.scrollHeight>e.clientHeight && e.scrollWidth<=e.clientWidth')
                    await page.screenshot(path=str(OUT/'long-content.png'))
                    report['长内容']='5001 字被阻止并说明删减数量；可接受的长文本通过键盘翻译，原文和译文各自滚动，无横向溢出'

                    Handler.fail=True
                    await page.fill('#input','错误后保留的原文')
                    await page.locator('#primaryButton').tap()
                    await page.wait_for_function("() => document.querySelector('#status').classList.contains('error') && !document.body.classList.contains('request-running')")
                    assert await page.input_value('#input') == '错误后保留的原文'
                    await page.screenshot(path=str(OUT/'service-error.png'))
                    Handler.fail=False
                    await page.locator('#retryButton').tap()
                    await page.wait_for_function("() => document.querySelector('#output').textContent==='MOCK[错误后保留的原文]' && !document.body.classList.contains('request-running')")
                    report['服务错误与重试']='模拟 HTTP 401 显示错误，原文保留；触屏点击重译后成功'

                    await page.locator('#settingsButton').tap()
                    await page.locator('[data-theme-choice="light"]').focus()
                    await page.keyboard.press('ArrowRight')
                    assert await page.locator('[data-theme-choice="dark"]').get_attribute('aria-checked')=='true'
                    assert await page.locator('[data-theme-choice="dark"]').evaluate('e=>document.activeElement===e')
                    await page.keyboard.press('Home')
                    assert await page.locator('[data-theme-choice="system"]').get_attribute('aria-checked')=='true'
                    report['键盘']='Ctrl+Enter 翻译；方向键与 Home 切换主题并同步选中、焦点状态'
                    await page.locator('#settingsButton').tap()
                    targets={}
                    for selector in ['#settingsButton','#copyButton','#retryButton','#clearInputButton','#primaryButton']:
                        box=await page.locator(selector).bounding_box()
                        assert box['width']>=43.9 and box['height']>=43.9, (selector,box)
                        targets[selector]={'宽':box['width'],'高':box['height']}
                    report['触屏点击范围']=targets

                    ratios={}
                    for theme in ['light','dark']:
                        for preset in ['graphite','forest','lake','sunset','lavender']:
                            await page.locator('#settingsButton').click()
                            await page.locator(f'.color-preset[data-color-preset="{preset}"]').click()
                            await page.locator(f'[data-theme-choice="{theme}"]').click()
                            await page.locator('#saveSettingsButton').click()
                            await page.wait_for_selector('#translator:not([hidden])')
                            await page.wait_for_timeout(260)
                            measured={selector:round(await page.locator(selector).evaluate(CONTRAST),2) for selector in ['#input','#output','#charCount','#autoModeHint','#primaryButton']}
                            ratios[f'{theme}/{preset}']=measured
                            assert all(r>=4.5 for r in measured.values()), (theme,preset,measured)
                    report['实测文字对比度']=ratios
                    layouts=[]
                    for mode,width,height in [('sidepanel',320,650),('sidepanel',520,800),('popup',460,560),('options',320,700),('options',860,900)]:
                        await page.set_viewport_size({'width':width,'height':height})
                        await page.goto(base+f'?mode={mode}')
                        await page.wait_for_selector('body[data-ready="true"]')
                        assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth'), (mode,width)
                        if mode=='options':
                            await page.locator('#saveSettingsButton').scroll_into_view_if_needed()
                            assert await page.locator('#saveSettingsButton').is_visible()
                        layouts.append({'模式':mode,'宽':width,'高':height,'结果':'无横向溢出，主要操作可达'})
                    report['尺寸']=layouts
                    assert not errors,errors
                    report['页面脚本错误']=errors
                    report['结果']='全部通过'
                finally:
                    await context.close()
    finally:
        server.shutdown()
        (OUT/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print('长内容、异常、触屏、键盘、对比度和多尺寸验证通过')

asyncio.run(main())
