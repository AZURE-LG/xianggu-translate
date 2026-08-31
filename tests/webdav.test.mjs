import assert from "node:assert/strict";
import { test } from "node:test";

import {
  createSyncDocument,
  normalizeWebDavUrl,
  parseSyncDocument,
  syncWebDavConfig,
  testWebDavConnection,
} from "../extension/js/webdav.js";

const config = {
  version: 4,
  provider: "openai",
  baseUrl: "https://api.openai.com/v1",
  apiKey: "绝不能同步",
  model: "gpt-4o-mini",
  sourceLanguage: { type: "auto", code: "auto", label: "自动检测" },
  targetLanguage: { type: "preset", code: "en", label: "英语" },
  autoTranslate: true,
  theme: "dark",
  colorPreset: "forest",
  webdav: { password: "绝不能同步" },
};

const settings = {
  url: "https://dav.example.com/xianggu/config.json",
  username: "user",
  password: "密钥",
};

test("WebDAV URL 沿用安全 URL 约束", () => {
  assert.equal(normalizeWebDavUrl(`${settings.url}/`), settings.url);
  assert.equal(normalizeWebDavUrl("http://dav.example.com/config.json"), "");
});

test("同步文档排除模型密钥和 WebDAV 凭据", () => {
  const document = createSyncDocument(config, 100);
  assert.equal(document.modifiedAt, 100);
  assert.equal("apiKey" in document.config, false);
  assert.equal("webdav" in document.config, false);
  assert.deepEqual(parseSyncDocument(document), document);
});

test("远端较新时下载，且不覆盖远端", async () => {
  let putCount = 0;
  globalThis.fetch = async (url, init) => {
    assert.equal(url, settings.url);
    assert.match(init.headers.Authorization, /^Basic /);
    if (init.method === "PUT") putCount += 1;
    return new Response(JSON.stringify(createSyncDocument({ ...config, theme: "light" }, 200)));
  };

  const result = await syncWebDavConfig({ settings, config, modifiedAt: 100 });
  assert.equal(result.direction, "downloaded");
  assert.equal(result.document.config.theme, "light");
  assert.equal(putCount, 0);
});

test("本地较新或远端不存在时上传", async () => {
  const methods = [];
  globalThis.fetch = async (url, init) => {
    methods.push(init.method);
    if (methods.length === 1) return new Response(null, { status: 404 });
    return new Response(null, { status: 204 });
  };

  const result = await syncWebDavConfig({ settings, config, modifiedAt: 100 });
  assert.equal(result.direction, "uploaded");
  assert.deepEqual(methods, ["GET", "PUT"]);
});

test("连接测试把不存在的同步文件视为可连接", async () => {
  globalThis.fetch = async () => new Response(null, { status: 404 });
  assert.equal(await testWebDavConnection(settings), true);
});
