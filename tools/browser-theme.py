"""录制主题切换并验证真实圆形过渡、重复操作和减少动态效果。"""
import asyncio
import importlib.util
import json
import shutil
import tempfile
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('smoke',ROOT/'tools/browser-smoke.py')
smoke=importlib.util.module_from_spec(spec); spec.loader.exec_module(smoke)
OUT=ROOT/'artifacts/theme'; OUT.mkdir(parents=True,exist_ok=True)

async def main():
    report={}
    async with async_playwright() as p:
        with tempfile.TemporaryDirectory(prefix='xianggu-theme-') as profile:
            context=await p.chromium.launch_persistent_context(profile,executable_path=str(smoke.find_chromium()),headless=True,viewport={'width':416,'height':650},record_video_dir=str(OUT),record_video_size={'width':416,'height':650},args=[f'--disable-extensions-except={smoke.EXTENSION}',f'--load-extension={smoke.EXTENSION}'])
            try:
                if not context.service_workers: await context.wait_for_event('serviceworker')
                worker=next(w for w in context.service_workers if w.url.endswith('/js/worker.js'))
                page=await context.new_page(); errors=[]
                page.on('pageerror',lambda e:errors.append(str(e)))
                await page.goto(f"chrome-extension://{worker.url.split('/')[2]}/panel.html?mode=sidepanel")
                await page.wait_for_selector('body[data-ready="true"]')
                await page.evaluate('''async()=>{await chrome.storage.local.set({config:{version:2,provider:'ollama',baseUrl:'http://localhost:11434/v1',model:'mock-chat',apiKey:'',sourceLanguage:{type:'auto',code:'auto',label:'自动检测'},targetLanguage:{type:'preset',code:'en',label:'英语'},autoTranslate:false,theme:'light'}})}''')
                await page.reload(); await page.wait_for_selector('#translator:not([hidden])')
                await page.fill('#input','主题切换验证，不发送翻译请求。')
                async def begin():
                    await page.evaluate('''()=>{ window.themeFrames=[]; const start=performance.now(); function frame(){themeFrames.push({t:performance.now()-start,clip:document.querySelector('.theme-snapshot') ? getComputedStyle(document.querySelector('.theme-snapshot')).clipPath : 'none',theme:document.body.dataset.theme}); if(performance.now()-start<700)requestAnimationFrame(frame); } requestAnimationFrame(frame); }''')
                async def click():
                    r=await page.locator('#themeToggleButton').bounding_box()
                    await page.mouse.click(r['x']+r['width']/2,r['y']+r['height']/2)
                for target in ['dark','light']:
                    await begin(); await click()
                    await page.wait_for_timeout(100)
                    await page.screenshot(path=str(OUT/f'{target}-middle.png'))
                    await page.wait_for_timeout(620)
                    frames=await page.evaluate('themeFrames')
                    assert len({f['clip'] for f in frames if f['clip'].startswith('path(')})>3,frames
                    assert await page.locator('body').get_attribute('data-theme')==target
                    report[target]=frames
                await begin()
                await page.evaluate("() => { window.clickLog=[]; document.addEventListener('click',e=>clickLog.push({id:e.target.closest?.('button')?.id ?? e.target.tagName,theme:document.body.dataset.theme}),true); }")
                for delay in [60,75,50,80,0]:
                    await click(); await page.wait_for_timeout(delay)
                await page.wait_for_timeout(750)
                assert await page.locator('body').get_attribute('data-theme')=='dark'
                assert await page.locator('.theme-snapshot').count()==0
                assert await page.locator('#input').input_value()=='主题切换验证，不发送翻译请求。'
                report['连续五次切换']='最终为深色，无残留过渡，输入保持'
                await page.locator('#themeToggleButton').focus()
                await page.keyboard.press('Enter'); await page.wait_for_timeout(500)
                assert await page.locator('body').get_attribute('data-theme')=='light'
                assert await page.locator('#themeToggleButton').evaluate('e=>document.activeElement===e')
                report['键盘']='Enter 触发切换，焦点保持在按钮'
                await page.emulate_media(reduced_motion='reduce')
                await click(); await page.wait_for_timeout(100)
                assert await page.locator('body').get_attribute('data-theme')=='dark'
                assert await page.locator('.theme-snapshot').count()==0
                report['减少动态效果']='立即切换，保留状态，无展开动画'
                assert not errors,errors
                report['页面错误']=errors
                report['结果']='全部通过'
                video=await page.video.path()
            finally:
                await context.close()
            shutil.copyfile(video,OUT/'theme-demo.webm')
    (OUT/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print('主题实际过渡、连续切换、键盘与减少动态效果验证通过')

asyncio.run(main())
