"""验证真实剪贴板读取及异步 API 受限时的兼容读取。"""
import asyncio
import importlib.util
import json
import shutil
import tempfile
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("smoke", ROOT / "tools/browser-smoke.py")
smoke = importlib.util.module_from_spec(spec)
spec.loader.exec_module(smoke)

async def main():
    async with async_playwright() as p:
        with tempfile.TemporaryDirectory(prefix="xianggu-clipboard-") as temporary:
            extension = Path(temporary) / "extension"
            shutil.copytree(smoke.EXTENSION, extension)
            # 测试副本预授予权限；正式扩展仍在点击时申请可选权限。
            manifest_path = extension / "manifest.json"
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["permissions"].append("clipboardRead")
            manifest["optional_permissions"].remove("clipboardRead")
            manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
            context = await p.chromium.launch_persistent_context(
                str(Path(temporary) / "profile"), executable_path=str(smoke.find_chromium()),
                headless=True, permissions=["clipboard-read", "clipboard-write"],
                args=[f"--disable-extensions-except={extension}", f"--load-extension={extension}"])
            try:
                if not context.service_workers:
                    await context.wait_for_event("serviceworker")
                worker = next(w for w in context.service_workers if w.url.endswith("/js/worker.js"))
                page = await context.new_page()
                errors = []
                page.on("pageerror", lambda error: errors.append(str(error)))
                await page.goto(f"chrome-extension://{worker.url.split('/')[2]}/panel.html?mode=sidepanel")
                await page.wait_for_selector('body[data-ready="true"]')
                await page.evaluate("""async () => {
                    const {config} = await chrome.storage.local.get('config');
                    await chrome.storage.local.set({config: {...config, provider:'ollama',
                        baseUrl:'http://localhost:11434/v1', model:'mock-chat', autoTranslate:false}});
                }""")
                await page.reload()
                await page.wait_for_selector('#translator:not([hidden])')
                for fallback in [False, True]:
                    await page.evaluate("navigator.clipboard.writeText('剪贴板测试\\n第二行 😀')")
                    if fallback:
                        await page.evaluate("""() => {
                            navigator.clipboard.readText = async () => {
                                throw new DOMException('模拟异步读取受限', 'NotAllowedError');
                            };
                        }""")
                    await page.locator('#pasteInputButton').click()
                    await page.wait_for_function("document.getElementById('input').value.includes('第二行')")
                    assert await page.locator('#input').input_value() == '剪贴板测试\n第二行 😀'
                    assert await page.locator('textarea[aria-label="读取剪贴板"]').count() == 0
                    assert await page.locator('#input').evaluate('e => document.activeElement === e')
                    await page.fill('#input', '保留原文')
                await page.evaluate("navigator.clipboard.writeText('')")
                await page.locator('#pasteInputButton').click()
                await page.wait_for_function("document.getElementById('status').textContent.includes('没有可粘贴')")
                assert await page.locator('#input').input_value() == '保留原文'
                await page.evaluate("chrome.permissions.request = async () => false")
                await page.locator('#pasteInputButton').click()
                await page.wait_for_function("document.getElementById('status').textContent.includes('需要剪贴板授权')")
                assert await page.locator('#input').input_value() == '保留原文'
                assert not errors, errors
                print('真实剪贴板普通读取、兼容读取、空文本、拒绝授权检查通过')
            finally:
                await context.close()

asyncio.run(main())
