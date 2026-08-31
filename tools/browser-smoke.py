import asyncio
import json
import os
import tempfile
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.async_api import async_playwright


ROOT = Path(__file__).resolve().parents[1]
EXTENSION = ROOT / "extension"
ARTIFACTS = ROOT / "artifacts"
CHROMIUM = Path(os.environ["LOCALAPPDATA"]) / "ms-playwright" / "chromium-1148" / "chrome-win" / "chrome.exe"


class MockHandler(BaseHTTPRequestHandler):
    requests = []
    sync_document = None

    def send_cors(self, content_type="application/json; charset=utf-8", status=200):
        self.send_response(status)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Authorization, Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
        self.send_header("Content-Type", content_type)
        self.end_headers()

    def do_OPTIONS(self):
        self.send_cors(status=204)

    def do_GET(self):
        MockHandler.requests.append(("GET", self.path))
        if self.path == "/webdav/config.json":
            if MockHandler.sync_document is None:
                self.send_cors(status=404)
                return
            self.send_cors()
            self.wfile.write(json.dumps(MockHandler.sync_document).encode("utf-8"))
            return
        if self.path != "/v1/models":
            self.send_cors(status=404)
            self.wfile.write(b'{"error":{"message":"not found"}}')
            return
        self.send_cors()
        self.wfile.write(json.dumps({
            "data": [
                {"id": "mock-chat"},
                {"id": "mock-embedding"},
            ]
        }).encode("utf-8"))

    def do_POST(self):
        length = int(self.headers.get("Content-Length", "0"))
        body = json.loads(self.rfile.read(length) or b"{}")
        system_prompt = body.get("messages", [{}])[0].get("content", "")
        MockHandler.requests.append(("POST", self.path, body.get("stream"), system_prompt))
        if self.path != "/v1/chat/completions":
            self.send_cors(status=404)
            self.wfile.write(b'{"error":{"message":"not found"}}')
            return

        if self.path != "/v1/chat/completions":
            self.send_cors(status=404)
            self.wfile.write(b'{"error":{"message":"not found"}}')
            return

        user_content = body["messages"][1]["content"]
        text = json.loads(user_content.split("\n", 1)[1])["sourceText"]
        translated = f"MOCK[{text}]"
        if not body.get("stream"):
            self.send_cors()
            self.wfile.write(json.dumps({
                "choices": [{
                    "message": {
                        "content": f"SOURCE: zh-CN\nTRANSLATION:\n{translated}"
                    },
                    "finish_reason": "stop",
                }]
            }).encode("utf-8"))
            return

        self.send_cors("text/event-stream; charset=utf-8")
        chunks = [
            "SOURCE: zh-CN\nTRANSLATION:\n",
            translated[:max(5, len(translated) // 2)],
            translated[max(5, len(translated) // 2):],
        ]
        try:
            for index, chunk in enumerate(chunks):
                payload = {
                    "choices": [{
                        "delta": {"content": chunk},
                        "finish_reason": "stop" if index == len(chunks) - 1 else None,
                    }]
                }
                self.wfile.write(f"data: {json.dumps(payload, ensure_ascii=False)}\n\n".encode("utf-8"))
                self.wfile.flush()
                if index < len(chunks) - 1:
                    time.sleep(0.25)
            self.wfile.write(b"data: [DONE]\n\n")
        except (BrokenPipeError, ConnectionAbortedError, ConnectionResetError):
            return

    def do_PUT(self):
        length = int(self.headers.get("Content-Length", "0"))
        MockHandler.sync_document = json.loads(self.rfile.read(length) or b"{}")
        MockHandler.requests.append(("PUT", self.path, MockHandler.sync_document))
        self.send_cors(status=204)

    def log_message(self, *args):
        return


async def main():
    ARTIFACTS.mkdir(exist_ok=True)
    server = ThreadingHTTPServer(("127.0.0.1", 11434), MockHandler)
    port = server.server_address[1]
    thread_server = server
    import threading
    threading.Thread(target=server.serve_forever, daemon=True).start()

    config = {
        "version": 2,
        "provider": "ollama",
        "baseUrl": "http://localhost:11434/v1",
        "apiKey": "",
        "model": "mock-chat",
        "sourceLanguage": {"type": "auto", "code": "auto", "label": "自动检测"},
        "targetLanguage": {"type": "preset", "code": "en", "label": "英语"},
        "autoTranslate": False,
        "theme": "light",
    }

    async def wait_until(predicate, timeout=10):
        elapsed = 0
        while elapsed < timeout:
            if await predicate():
                return
            await asyncio.sleep(0.1)
            elapsed += 0.1
        raise TimeoutError("浏览器冒烟条件等待超时")

    async def output_contains_mock():
        return "MOCK[你好，香菇]" in (await page.text_content("#output"))

    async def output_is_first_translation():
        return (await page.text_content("#output")) == "MOCK[你好，香菇]"

    async def partial_translation_visible():
        output = await page.text_content("#output")
        running = await page.locator("body").evaluate("element => element.classList.contains('request-running')")
        return output.startswith("MOCK[") and running

    async def models_loaded():
        return "已获取 1 个" in (await page.text_content("#status"))

    async def source_recognized():
        return "检测到：中文" in (await page.text_content("#detectedLanguageBadge"))

    async def translation_completed():
        return "翻译完成。" in (await page.text_content("#status"))

    async def translation_stopped():
        return "已停止" in (await page.text_content("#status"))

    async def translation_copied():
        return "已复制译文" in (await page.text_content("#status"))

    async def test_translation_succeeded():
        return "测试翻译成功" in (await page.text_content("#status"))

    async def automatic_translation_completed():
        return (await page.text_content("#output")) == "MOCK[自动翻译]"

    async def webdav_test_succeeded():
        return "WebDAV 连接成功" in (await options_page.text_content("#status"))

    async def webdav_sync_succeeded():
        return "已将本机设置上传到 WebDAV" in (await options_page.text_content("#status"))

    async def component_value(selector):
        return await page.locator(selector).evaluate("element => element.value")

    async def source_picker_open():
        return await page.locator("#quickSourceLanguage").evaluate("element => element.open")

    async def settings_tooltip_open():
        return await page.locator("#settingsTooltip").evaluate("element => element.open")

    async def set_component_value(selector, value):
        await page.locator(selector).evaluate(
            """(element, nextValue) => {
                element.value = nextValue;
                element.dispatchEvent(new Event('change', { bubbles: true }));
            }""",
            value,
        )

    with tempfile.TemporaryDirectory(prefix="xianggu-smoke-") as profile:
        async with async_playwright() as playwright:
            context = await playwright.chromium.launch_persistent_context(
                profile,
                executable_path=str(CHROMIUM),
                headless=True,
                viewport={"width": 352, "height": 450},
                args=[
                    f"--disable-extensions-except={EXTENSION}",
                    f"--load-extension={EXTENSION}",
                ],
            )
            try:
                if not context.service_workers:
                    await context.wait_for_event("serviceworker", timeout=15000)
                print("SERVICE WORKERS:", [item.url for item in context.service_workers])
                worker = next(
                    item for item in context.service_workers
                    if item.url.endswith("/js/worker.js")
                )
                extension_id = worker.url.split("/")[2]

                worker.on("console", lambda message: print("WORKER CONSOLE:", message.type, message.text))

                page = await context.new_page()
                page.on("console", lambda message: print("PAGE CONSOLE:", message.type, message.text))
                page.on("pageerror", lambda error: print("PAGE ERROR:", error))
                page.on("requestfailed", lambda request: print("REQUEST FAILED:", request.url, request.failure))
                await page.goto(f"chrome-extension://{extension_id}/popup.html")
                await page.wait_for_url("**/panel.html**")
                try:
                    await page.wait_for_selector('body[data-ready="true"]', timeout=5000)
                except Exception:
                    print("READY STATE:", await page.evaluate("() => document.body.dataset"))
                    print("LOCATION:", page.url)
                    raise

                await page.evaluate(
                    """async () => {
                        await chrome.storage.local.clear();
                        await chrome.storage.session.clear();
                    }""",
                )
                await page.reload()
                await page.wait_for_selector('body[data-ready="true"]')
                assert await page.locator("#settings").is_visible()
                assert not await page.locator("#translator").is_visible()
                assert await page.locator("#sidePanelButton").is_visible()
                assert await page.locator("#openOptionsButton").is_visible()
                await page.screenshot(path=str(ARTIFACTS / "browser-first-setup.png"), full_page=False)
                await page.select_option("#provider", "deepseek")
                assert await page.input_value("#baseUrl") == "https://api.deepseek.com"
                assert await page.input_value("#model") == "deepseek-v4-flash"
                assert await page.input_value("#apiKey") == ""

                await page.evaluate(
                    "async ({ config }) => await chrome.storage.local.set({ config })",
                    {"config": config},
                )
                await page.reload()
                try:
                    await page.wait_for_selector("#translator:not([hidden])", timeout=5000)
                except Exception:
                    print("POST RELOAD STORAGE:", await page.evaluate(
                        "async () => await chrome.storage.local.get('config')"
                    ))
                    print("POST RELOAD STATE:", {
                        "translator_hidden": await page.get_attribute("#translator", "hidden"),
                        "settings_hidden": await page.get_attribute("#settings", "hidden"),
                        "status": await page.text_content("#status"),
                    })
                    raise
                await page.wait_for_selector('body[data-ready="true"]')
                assert await page.locator("#translator").is_visible()
                assert not await page.locator("#settings").is_visible()
                assert await page.locator("#sidePanelButton").is_visible()

                assert await component_value("#quickSourceLanguage") == "auto"
                assert await component_value("#quickTargetLanguage") == "en"
                assert await page.locator("#swapLanguagesButton").evaluate("element => element.disabled")
                assert "自动翻译已关闭" in (await page.text_content("#autoModeHint"))
                await page.hover("#settingsButton")
                await wait_until(settings_tooltip_open)
                await page.screenshot(path=str(ARTIFACTS / "browser-tooltip.png"), full_page=False)
                await page.mouse.move(210, 300)
                await page.click("#quickSourceLanguage")
                await wait_until(source_picker_open)
                await page.screenshot(path=str(ARTIFACTS / "browser-language-picker.png"), full_page=False)
                await page.keyboard.press("Escape")
                await page.fill("#input", "临时文本")
                assert await page.locator("#clearInputButton").is_visible()
                await page.click("#clearInputButton")
                assert await page.input_value("#input") == ""
                assert await page.text_content("#output") == ""
                await page.fill("#input", "你好，香菇")
                await page.hover("#primaryButton")
                await page.screenshot(path=str(ARTIFACTS / "browser-translate-hover.png"), full_page=False)
                await page.click("#primaryButton")
                await wait_until(partial_translation_visible)
                assert not await page.locator("#status").is_visible()
                await page.screenshot(path=str(ARTIFACTS / "browser-streaming.png"), full_page=False)
                partial_output = await page.text_content("#output")
                await page.click("#primaryButton")
                await wait_until(translation_stopped)
                assert await page.text_content("#output") == partial_output
                assert not await page.locator("body").evaluate("element => element.classList.contains('request-running')")
                assert not await page.locator("#copyButton").evaluate("element => element.disabled")
                await page.click("#retryButton")
                try:
                    await wait_until(output_contains_mock)
                except Exception:
                    print("MOCK REQUESTS:", MockHandler.requests)
                    print("STATUS:", await page.text_content("#status"))
                    print("SOURCE:", await page.text_content("#detectedLanguageBadge"))
                    print("OUTPUT:", await page.text_content("#output"))
                    await page.screenshot(path=str(ARTIFACTS / "browser-failure.png"), full_page=True)
                    raise
                try:
                    await wait_until(source_recognized)
                except Exception:
                    print("SOURCE ACTUAL:", repr(await page.text_content("#detectedLanguageBadge")))
                    print("STATUS ACTUAL:", repr(await page.text_content("#status")))
                    raise
                await wait_until(translation_completed)
                await page.click("#copyButton")
                await wait_until(translation_copied)

                await page.fill("#input", "这段不应被重译")
                await page.click("#retryButton")
                await wait_until(output_is_first_translation)

                await page.click("#settingsButton")
                assert await page.locator("#settings").is_visible()
                assert not await page.locator("#translator").is_visible()
                assert await page.locator("#settingsAutoTranslate").evaluate("element => element.checked") is False
                assert await page.get_attribute('[data-theme-choice="light"]', "aria-checked") == "true"
                await page.fill("#model", "")
                await page.click("#loadModelButton")
                try:
                    await wait_until(models_loaded)
                except Exception:
                    print("MODEL STATUS:", repr(await page.text_content("#status")))
                    print("MODEL REQUESTS:", MockHandler.requests)
                    print("LOAD DISABLED:", await page.is_disabled("#loadModelButton"))
                    raise
                assert await page.get_attribute("#modelOptions option", "value") == "mock-chat"
                assert not await page.is_disabled("#modelPickerButton")
                await page.click("#modelPickerButton")
                assert await page.locator("#modelPickerList").is_visible()
                await page.screenshot(path=str(ARTIFACTS / "browser-model-picker.png"), full_page=True)
                await page.click('.model-picker-option[data-model-id="mock-chat"]')
                assert await page.input_value("#model") == "mock-chat"
                assert not await page.locator("#modelPickerList").is_visible()
                await page.click("#testTranslationButton")
                await wait_until(test_translation_succeeded)
                await page.screenshot(path=str(ARTIFACTS / "browser-settings.png"), full_page=True)

                await page.click("#settingsButton")
                await asyncio.sleep(0.3)
                print("SESSION BEFORE RELOAD:", await page.evaluate(
                    "async () => await chrome.storage.session.get('panel:popup')"
                ))
                await page.reload()
                await page.wait_for_selector("#input")
                restored_input = await page.input_value("#input")
                restored_output = await page.text_content("#output")
                print("RESTORED:", repr(restored_input), repr(restored_output))
                assert restored_input == "这段不应被重译"
                assert restored_output == "MOCK[你好，香菇]"

                await set_component_value("#quickTargetLanguage", "ja")
                assert await page.locator("#translator").is_visible()
                assert await component_value("#quickTargetLanguage") == "ja"
                assert (await page.evaluate("async () => (await chrome.storage.local.get('config')).config.targetLanguage.code")) == "ja"
                await set_component_value("#quickTargetLanguage", "en")

                await set_component_value("#quickSourceLanguage", "zh")
                assert await page.is_enabled("#swapLanguagesButton")
                await page.fill("#input", "你好，香菇")
                await page.click("#primaryButton")
                await wait_until(output_contains_mock)
                await wait_until(translation_completed)
                assert any(
                    len(item) > 3 and "源语言是中文（zh）" in item[3]
                    for item in MockHandler.requests
                    if item[0] == "POST"
                )
                await page.screenshot(path=str(ARTIFACTS / "browser-language-swap.png"), full_page=False)
                await page.click("#swapLanguagesButton")
                assert await component_value("#quickSourceLanguage") == "en"
                assert await component_value("#quickTargetLanguage") == "zh"
                assert await page.input_value("#input") == "MOCK[你好，香菇]"
                assert await page.text_content("#output") == ""
                await page.screenshot(path=str(ARTIFACTS / "browser-language-swapped.png"), full_page=False)
                await set_component_value("#quickSourceLanguage", "auto")
                await set_component_value("#quickTargetLanguage", "en")
                await page.fill("#input", "你好，香菇")
                await page.click("#primaryButton")
                await wait_until(output_contains_mock)
                await wait_until(translation_completed)

                assert await page.is_enabled("#sidePanelButton")
                options_page = await context.new_page()
                await options_page.set_viewport_size({"width": 720, "height": 800})
                await options_page.goto(f"chrome-extension://{extension_id}/options.html")
                await options_page.wait_for_url("**/panel.html?mode=options")
                await options_page.wait_for_selector('body[data-ready="true"]')
                assert await options_page.locator("#settings").is_visible()
                assert not await options_page.locator("#translator").is_visible()
                assert not await options_page.locator("#settingsButton").is_visible()
                assert not await options_page.locator("#openOptionsButton").is_visible()
                assert await options_page.evaluate("() => document.documentElement.scrollWidth <= window.innerWidth")
                await options_page.screenshot(path=str(ARTIFACTS / "browser-options.png"), full_page=True)
                await options_page.click('.color-preset[data-color-preset="forest"]')
                assert await options_page.get_attribute("body", "data-color-preset") == "forest"
                assert await options_page.get_attribute('.color-preset[data-color-preset="forest"]', "aria-checked") == "true"
                await options_page.screenshot(path=str(ARTIFACTS / "browser-color-forest.png"), full_page=True)
                await options_page.click('[data-theme-choice="dark"]')
                await options_page.wait_for_timeout(180)
                assert await options_page.get_attribute("body", "data-theme") == "dark"
                assert await options_page.evaluate(
                    "() => getComputedStyle(document.body).getPropertyValue('--surface-soft').trim() === '#313131'"
                )
                assert await options_page.evaluate(
                    "() => getComputedStyle(document.querySelector('.color-preset[data-color-preset=\"graphite\"]')).backgroundColor === 'rgb(49, 49, 49)'"
                )
                assert await options_page.evaluate(
                    "() => getComputedStyle(document.querySelector('#webDavUrl')).color === 'rgb(236, 236, 236)'"
                )
                assert await options_page.evaluate(
                    """() => {
                        const base = document.querySelector('#loadModelButton').shadowRoot?.querySelector('[part~="base"]');
                        return base && getComputedStyle(base).color !== 'rgb(0, 0, 0)';
                    }"""
                )
                await options_page.screenshot(path=str(ARTIFACTS / "browser-color-forest-dark.png"), full_page=True)
                await options_page.click('[data-theme-choice="light"]')
                await options_page.click('.color-preset[data-color-preset="graphite"]')
                await options_page.click("#webDavEnabled")
                await options_page.fill("#webDavUrl", "http://localhost:11434/webdav/config.json")
                await options_page.fill("#webDavUsername", "smoke-user")
                await options_page.fill("#webDavPassword", "smoke-password")
                await options_page.click("#testWebDavButton")
                await wait_until(webdav_test_succeeded)
                await options_page.click("#syncWebDavButton")
                await wait_until(webdav_sync_succeeded)
                assert MockHandler.sync_document is not None
                assert "apiKey" not in MockHandler.sync_document["config"]
                assert "webDav" not in MockHandler.sync_document["config"]
                await options_page.screenshot(path=str(ARTIFACTS / "browser-webdav.png"), full_page=True)
                await options_page.close()

                sidepanel_page = await context.new_page()
                await sidepanel_page.set_viewport_size({"width": 320, "height": 720})
                await sidepanel_page.goto(f"chrome-extension://{extension_id}/sidepanel.html")
                await sidepanel_page.wait_for_url("**/panel.html?mode=sidepanel")
                await sidepanel_page.wait_for_selector('body[data-ready="true"]')
                assert await sidepanel_page.locator("#translator").is_visible()
                assert not await sidepanel_page.locator("#sidePanelButton").is_visible()
                assert await sidepanel_page.evaluate("() => document.documentElement.scrollWidth <= window.innerWidth")
                await sidepanel_page.screenshot(path=str(ARTIFACTS / "browser-sidepanel-320.png"), full_page=False)
                await sidepanel_page.click("#settingsButton")
                assert await sidepanel_page.locator("#settings").is_visible()
                assert await sidepanel_page.locator("#openOptionsButton").is_visible()
                assert not await sidepanel_page.locator("#sidePanelButton").is_visible()
                await sidepanel_page.screenshot(path=str(ARTIFACTS / "browser-sidepanel-settings.png"), full_page=False)
                await sidepanel_page.click("#settingsButton")
                await sidepanel_page.set_viewport_size({"width": 520, "height": 800})
                await sidepanel_page.screenshot(path=str(ARTIFACTS / "browser-sidepanel-520.png"), full_page=False)
                await sidepanel_page.close()

                await page.screenshot(path=str(ARTIFACTS / "browser-popup.png"), full_page=True)
                await page.click("#settingsButton")
                await page.click("#settingsAutoTranslate")
                assert await page.locator("#settingsAutoTranslate").evaluate("element => element.checked") is True
                await page.click('[data-theme-choice="dark"]')
                await page.click("#saveSettingsButton")
                await page.wait_for_selector("#translator:not([hidden])")
                await page.wait_for_selector('body[data-theme="dark"]')
                assert "输入后自动翻译" in (await page.text_content("#autoModeHint"))
                await page.fill("#input", "自动翻译")
                await wait_until(automatic_translation_completed, timeout=12)
                await page.screenshot(path=str(ARTIFACTS / "browser-popup-dark.png"), full_page=True)
                print(json.dumps({
                    "ok": True,
                    "extension_id": extension_id,
                    "mock_port": port,
                }, ensure_ascii=False))
            finally:
                await context.close()
    thread_server.shutdown()


if __name__ == "__main__":
    asyncio.run(main())
