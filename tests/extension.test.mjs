import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { test } from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const extensionRoot = join(root, "extension");

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

test("Manifest V3 配置保持最小权限且引用有效", () => {
  const manifest = JSON.parse(readFileSync(join(extensionRoot, "manifest.json"), "utf8"));
  assert.equal(manifest.manifest_version, 3);
  assert.deepEqual(manifest.permissions, ["storage", "sidePanel"]);
  assert.equal(manifest.optional_host_permissions.includes("http://*/*"), true);
  assert.equal(manifest.optional_host_permissions.includes("https://*/*"), true);
  assert.equal("content_scripts" in manifest, false);
  assert.equal(manifest.permissions.includes("tabs"), false);
  assert.equal(manifest.permissions.includes("activeTab"), false);
  assert.equal(manifest.permissions.includes("scripting"), false);

  const references = [
    manifest.action.default_popup,
    manifest.options_page,
    manifest.side_panel.default_path,
    manifest.background.service_worker,
    ...Object.values(manifest.action.default_icon),
    ...Object.values(manifest.icons),
  ];
  for (const reference of references) {
    assert.equal(existsSync(join(extensionRoot, reference)), true, reference);
  }
});

test("面板 HTML 没有重复 ID、内联脚本或远程脚本", () => {
  const html = readFileSync(join(extensionRoot, "panel.html"), "utf8");
  const css = readFileSync(join(extensionRoot, "css", "panel.css"), "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);

  assert.doesNotMatch(html, /<script(?![^>]*\ssrc=)[^>]*>/i);
  assert.doesNotMatch(html, /<script[^>]+src=["']https?:/i);
  assert.doesNotMatch(html, /<link[^>]+href=["']https?:/i);
  assert.doesNotMatch(css, /url\(["']?https?:/i);
  assert.match(css, /\[hidden\]\s*\{[^}]*display:\s*none\s*!important/i);
});

test("设计稿所需的本地字体与核心工作区完整", () => {
  const html = readFileSync(join(extensionRoot, "panel.html"), "utf8");
  const cssPath = join(extensionRoot, "css", "panel.css");
  const css = readFileSync(cssPath, "utf8");

  for (const id of [
    "translator",
    "settings",
    "quickSourceLanguage",
    "quickTargetLanguage",
    "swapLanguagesButton",
    "clearInputButton",
    "pasteInputButton",
    "themeToggleButton",
    "modelShortcutButton",
    "modelPickerButton",
    "openOptionsButton",
    "settingsAutoTranslate",
    "themeControl",
    "colorPresetControl",
  ]) {
    assert.match(html, new RegExp(`\\bid="${id}"`));
  }

  const fontReferences = [...css.matchAll(/url\(["']?([^"')]+\.(?:woff2|ttf))["']?\)/gi)]
    .map((match) => match[1]);
  assert.equal(fontReferences.length >= 2, true);
  for (const reference of fontReferences) {
    assert.equal(existsSync(resolve(dirname(cssPath), reference)), true, reference);
  }

  assert.match(html, /<wa-select\b/i);
  assert.match(html, /<wa-button\b/i);
  assert.match(html, /<wa-switch\b/i);
  for (const reference of [
    "vendor/webawesome.js",
    "vendor/webawesome.css",
    "vendor/LICENSE-Web-Awesome.md",
  ]) {
    assert.equal(existsSync(join(extensionRoot, reference)), true, reference);
  }

  const vendorCss = readFileSync(join(extensionRoot, "vendor", "webawesome.css"), "utf8");
  assert.doesNotMatch(vendorCss, /@import\s/i);
  assert.doesNotMatch(vendorCss, /url\(["']?https?:/i);
});

test("HTML 引用的本地资源都存在", () => {
  const htmlFiles = walk(extensionRoot).filter((path) => /\.html$/i.test(path));
  for (const file of htmlFiles) {
    const content = readFileSync(file, "utf8");
    const references = [...content.matchAll(/\b(?:href|src)="([^"]+)"/g)]
      .map((match) => match[1])
      .filter((reference) => !/^https?:|^data:/i.test(reference));

    for (const reference of references) {
      assert.equal(existsSync(resolve(dirname(file), reference)), true, `${file}: ${reference}`);
    }
  }
});

test("扩展 JavaScript 语法可通过 Node 解析", () => {
  const jsFiles = walk(extensionRoot).filter((path) => extname(path) === ".js");
  assert.equal(jsFiles.length > 0, true);
  for (const file of jsFiles) {
    const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
    assert.equal(result.status, 0, `${file}\n${result.stderr}`);
  }
});

test("内置图标尺寸完整", () => {
  for (const size of [16, 32, 48, 128]) {
    const bytes = readFileSync(join(extensionRoot, "icons", `icon${size}.png`));
    assert.equal(bytes.readUInt32BE(0), 0x89504e47);
    assert.equal(bytes.readUInt32BE(4), 0x0d0a1a0a);
    assert.equal(bytes.readUInt32BE(16), size);
    assert.equal(bytes.readUInt32BE(20), size);
  }
});

test("交付目录不包含开发测试文件", () => {
  const paths = walk(extensionRoot);
  assert.equal(paths.some((path) => /(^|[/\\])(tests|node_modules)([/\\]|$)/i.test(path)), false);
  assert.equal(paths.every((path) => statSync(path).isFile()), true);
});
