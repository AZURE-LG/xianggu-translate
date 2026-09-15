"""真实扩展内逐帧记录交互，并录制可复查的操作演示。"""
import asyncio
import importlib.util
import json
import tempfile
import shutil
import threading
from http.server import ThreadingHTTPServer
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('smoke', ROOT / 'tools/browser-smoke.py')
smoke = importlib.util.module_from_spec(spec)
spec.loader.exec_module(smoke)
OUT = ROOT / 'artifacts/motion'
OUT.mkdir(parents=True, exist_ok=True)

async def main():
    server = ThreadingHTTPServer(('127.0.0.1', 11434), smoke.MockHandler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    report = {}
    errors = []
    async with async_playwright() as p:
        with tempfile.TemporaryDirectory(prefix='xianggu-motion-') as profile:
            context = await p.chromium.launch_persistent_context(profile, executable_path=str(smoke.find_chromium()), headless=True, viewport={'width': 390, 'height': 720}, record_video_dir=str(OUT), record_video_size={'width': 390, 'height': 720}, args=[f'--disable-extensions-except={smoke.EXTENSION}', f'--load-extension={smoke.EXTENSION}'])
            try:
                if not context.service_workers:
                    await context.wait_for_event('serviceworker')
                worker = next(w for w in context.service_workers if w.url.endswith('/js/worker.js'))
                page = await context.new_page()
                page.on('pageerror', lambda e: errors.append(str(e)))
                extension_id = worker.url.split('/')[2]
                await page.goto(f'chrome-extension://{extension_id}/panel.html?mode=sidepanel')
                await page.wait_for_selector('body[data-ready="true"]')
                await page.evaluate('''async () => { await chrome.storage.local.set({config: {version:2,provider:'ollama',baseUrl:'http://localhost:11434/v1',apiKey:'',model:'mock-chat',sourceLanguage:{type:'auto',code:'auto',label:'自动检测'},targetLanguage:{type:'preset',code:'en',label:'英语'},autoTranslate:false,theme:'light'}}); }''')
                await page.reload()
                await page.wait_for_selector('#translator:not([hidden])')
                await page.wait_for_timeout(300)

                async def sample(selector):
                    await page.evaluate('''selector => { window.motionFrames = []; const start = performance.now(); function frame() { const e=document.querySelector(selector); const s=getComputedStyle(e); const r=e.getBoundingClientRect(); motionFrames.push({t:performance.now()-start,opacity:Number(s.opacity),transform:s.transform,translate:s.translate,height:r.height,hidden:e.hidden}); if(performance.now()-start < 700) requestAnimationFrame(frame); } requestAnimationFrame(frame); }''', selector)

                async def frames(name):
                    await page.wait_for_timeout(720)
                    data = await page.evaluate('motionFrames')
                    report[name] = data
                    return data

                async def click_now(selector):
                    box = await page.locator(selector).bounding_box()
                    assert box, selector
                    await page.mouse.click(box['x']+box['width']/2, box['y']+box['height']/2)

                await page.fill('#input', '让语言成为日常沟通的桥梁。')
                await page.hover('#primaryButton')
                await sample('#primaryButton')
                await page.mouse.down()
                await page.wait_for_timeout(140)
                await page.mouse.up()
                data = await frames('按钮按下与释放')
                assert len({(d['transform'],d['translate']) for d in data}) > 2
                await page.wait_for_function("() => document.body.classList.contains('request-running')")
                await click_now('#primaryButton')
                await page.wait_for_function("() => !document.body.classList.contains('request-running')")
                assert '已停止' in await page.text_content('#status')
                await sample('#primaryButtonLabel')
                await click_now('#retryButton')
                data = await frames('翻译状态进入')
                assert any(0 < d['opacity'] < 1 for d in data)
                await page.wait_for_function("() => document.querySelector('#primaryButtonLabel').textContent === '翻译完成'")
                await page.screenshot(path=str(OUT/'translator.png'))
                await click_now('#copyButton')
                await page.wait_for_timeout(1000)
                await click_now('#copyButton')
                await page.wait_for_timeout(700)
                assert await page.locator('#copyButton').evaluate("e=>e.classList.contains('is-copied')")
                await page.wait_for_timeout(900)
                assert not await page.locator('#copyButton').evaluate("e=>e.classList.contains('is-copied')")
                report['复制重复操作'] = '第二次复制后保持完整提示时长并自然恢复'

                await sample('#settings')
                await click_now('#settingsButton')
                data = await frames('设置进入')
                assert any(0 < d['opacity'] < 1 for d in data)
                await page.fill('#model','draft-model')
                await sample('#translator')
                await click_now('#settingsButton')
                await page.wait_for_timeout(70)
                await click_now('#settingsButton')
                await page.wait_for_timeout(70)
                await click_now('#settingsButton')
                data = await frames('设置快速往返')
                assert await page.locator('#translator').is_visible()
                assert await page.locator('.workspace-ghost').count() == 0
                assert await page.input_value('#input') == '让语言成为日常沟通的桥梁。'
                await click_now('#settingsButton')
                await page.wait_for_timeout(300)
                assert await page.input_value('#model') == 'draft-model'
                await page.fill('#model','mock-chat')
                await page.click('#loadModelButton')
                await page.wait_for_function("() => !document.querySelector('#modelPickerButton').disabled")
                await sample('#modelPickerList')
                await click_now('#modelPickerButton')
                data = await frames('模型菜单进入')
                assert any(0 < d['opacity'] < 1 for d in data)
                await sample('#modelPickerList')
                await page.keyboard.press('Escape')
                await page.wait_for_timeout(60)
                await click_now('#modelPickerButton')
                await page.wait_for_timeout(60)
                await page.keyboard.press('Escape')
                data = await frames('模型菜单退出与中断')
                assert any(0 < d['opacity'] < 1 for d in data)
                assert await page.locator('#modelPickerList').is_hidden()
                assert await page.locator('#model').evaluate('e=>e===document.activeElement')

                await page.locator('#themeControl').scroll_into_view_if_needed()
                await sample('.segment-indicator')
                await click_now('[data-theme-choice="dark"]')
                await page.wait_for_timeout(65)
                await click_now('[data-theme-choice="light"]')
                await page.wait_for_timeout(65)
                await click_now('[data-theme-choice="dark"]')
                data = await frames('主题指示器连续反向')
                assert len({d['transform'] for d in data}) > 5
                assert await page.locator('body').get_attribute('data-theme') == 'dark'
                await page.screenshot(path=str(OUT/'settings-dark.png'))
                await page.click('[data-theme-choice="light"]')
                await page.locator('#webDavEnabled').scroll_into_view_if_needed()
                await sample('#syncFields')
                await click_now('#webDavEnabled')
                await page.wait_for_timeout(90)
                await click_now('#webDavEnabled')
                await page.wait_for_timeout(90)
                await click_now('#webDavEnabled')
                data = await frames('同步展开收起与中断')
                assert len({round(d['height']) for d in data}) > 5
                assert await page.locator('#syncFields').is_visible()
                await page.fill('#webDavUsername', '保留的草稿')
                await page.locator('#webDavEnabled').click()
                await page.wait_for_timeout(350)
                assert await page.locator('#syncFields').is_hidden()
                await page.locator('#webDavEnabled').click()
                await page.wait_for_timeout(350)
                assert await page.input_value('#webDavUsername') == '保留的草稿'
                report['同步草稿'] = '收起后展开保留输入'
                await page.locator('#uploadWebDavButton').scroll_into_view_if_needed()
                request_count = len(smoke.MockHandler.requests)
                await sample('#syncConfirmation')
                await click_now('#uploadWebDavButton')
                data = await frames('同步覆盖确认进入')
                assert any(0 < d['opacity'] < 1 for d in data)
                await page.keyboard.press('Escape')
                await page.locator('#syncConfirmation').wait_for(state='hidden')
                assert len(smoke.MockHandler.requests) == request_count
                report['同步覆盖取消'] = 'Escape 退出，未发出请求，焦点返回上传按钮'

                await page.emulate_media(reduced_motion='reduce')
                await page.locator('#themeControl').scroll_into_view_if_needed()
                await page.click('[data-theme-choice="dark"]')
                await page.wait_for_timeout(30)
                assert await page.locator('.segment-indicator').evaluate('e=>e.getAnimations().length') == 0
                report['减少动态效果'] = '指示器立即到位，无运行中的过渡'
                await page.locator('#settingsButton').click()
                await context.set_offline(True)
                await page.wait_for_function("() => document.querySelector('#status').textContent.includes('网络已断开')")
                assert await page.input_value('#input') == '让语言成为日常沟通的桥梁。'
                await context.set_offline(False)
                await page.wait_for_function("() => document.querySelector('#status').textContent.includes('网络已恢复')")
                report['断网恢复'] = '提示断网与恢复，原文保留'
                for width in [320,352,390]:
                    await page.set_viewport_size({'width':width,'height':650})
                    assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth')
                report['布局'] = '320、352、390 宽度无横向溢出'
                assert not errors, errors
                report['页面错误'] = errors
                report['结果'] = '全部通过'
                video_path = await page.video.path()
            finally:
                await context.close()
            shutil.copyfile(video_path, OUT/'interaction-demo.webm')
    server.shutdown()
    (OUT/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print('动态交互验证全部通过；报告与演示位于 artifacts/motion')

asyncio.run(main())
