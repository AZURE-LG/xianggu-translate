import assert from "node:assert/strict";
import { test } from "node:test";

import {
  createSyncDocument,
  downloadWebDavConfig,
  normalizeWebDavUrl,
  parseSyncDocument,
  testWebDavConnection,
  uploadWebDavConfig,
  webDavSyncFileUrl,
} from "../extension/js/webdav.js";

const config = {
  version: 4,
  provider: "openai",
  baseUrl: "https://api.openai.com/v1",
  apiKey: "需要同步的密钥",
  model: "gpt-4o-mini",
  sourceLanguage: { type: "auto", code: "auto", label: "自动检测" },
  targetLanguage: { type: "preset", code: "en", label: "英语" },
  autoTranslate: true,
  theme: "dark",
  colorPreset: "forest",
  webdav: { password: "绝不能同步" },
};

const settings = {
  url: "https://dav.example.com/dav",
  username: "user",
  password: "密钥",
};
const syncFileUrl = "https://dav.example.com/dav/xianggu-translate/config.json";

test("WebDAV URL 沿用安全 URL 约束", () => {
  assert.equal(normalizeWebDavUrl(`${settings.url}/`), settings.url);
  assert.equal(normalizeWebDavUrl("http://dav.example.com/dav"), "");
  assert.equal(webDavSyncFileUrl(settings.url), syncFileUrl);
});

test("同步文档默认排除 API Key 和 WebDAV 凭据", () => {
  const document = createSyncDocument(config, 100);
  assert.equal(document.modifiedAt, 100);
  assert.equal("apiKey" in document.config, false);
  assert.equal("webdav" in document.config, false);
  assert.deepEqual(parseSyncDocument(document), document);
});

test("勾选后同步文档包含 API Key", () => {
  const document = createSyncDocument(config, 100, { includeApiKey: true });
  assert.equal(document.config.apiKey, config.apiKey);
  assert.equal("webdav" in document.config, false);
});

test("上传直接使用本机配置覆盖远端文件", async () => {
  const methods = [];
  let uploadedDocument;
  globalThis.fetch = async (url, init) => {
    assert.equal(url, syncFileUrl);
    assert.match(init.headers.Authorization, /^Basic /);
    methods.push(init.method);
    uploadedDocument = JSON.parse(init.body);
    return new Response(null, { status: 204 });
  };

  const document = await uploadWebDavConfig({
    settings,
    config,
    modifiedAt: 100,
    includeApiKey: true,
  });
  assert.equal(document.config.apiKey, config.apiKey);
  assert.equal(uploadedDocument.config.apiKey, config.apiKey);
  assert.deepEqual(methods, ["PUT"]);
});

test("上传遇到父目录不存在时逐级创建目录后重试", async () => {
  const nestedSettings = {
    ...settings,
    url: "https://dav.example.com/dav/users/tester",
  };
  const nestedRootUrl = `${nestedSettings.url}/`;
  const nestedDirectoryUrl = `${nestedRootUrl}xianggu-translate/`;
  const nestedFileUrl = `${nestedDirectoryUrl}config.json`;
  const requests = [];
  const collections = new Set([nestedRootUrl]);
  globalThis.fetch = async (url, init) => {
    requests.push([init.method, url]);
    if (init.method === "PROPFIND") {
      return collections.has(url)
        ? new Response(null, { status: 207 })
        : new Response(null, { status: 404 });
    }
    if (init.method === "MKCOL") {
      const parentUrl = new URL("../", url).href;
      if (!collections.has(parentUrl)) return new Response(null, { status: 409 });
      if (collections.has(url)) return new Response(null, { status: 405 });
      collections.add(url);
      return new Response(null, { status: 201 });
    }
    const parentUrl = new URL("./", url).href;
    return collections.has(parentUrl)
      ? new Response(null, { status: 204 })
      : new Response(null, { status: 409 });
  };

  await uploadWebDavConfig({ settings: nestedSettings, config, modifiedAt: 100 });
  assert.deepEqual(requests, [
    ["PUT", nestedFileUrl],
    ["PROPFIND", nestedDirectoryUrl],
    ["PROPFIND", nestedRootUrl],
    ["MKCOL", nestedDirectoryUrl],
    ["PUT", nestedFileUrl],
  ]);
});

test("目录已存在但 MKCOL 会返回 404 时通过 PROPFIND 识别", async () => {
  const requests = [];
  globalThis.fetch = async (url, init) => {
    requests.push([init.method, url]);
    if (init.method === "PROPFIND") return new Response(null, { status: 207 });
    return requests.filter(([method]) => method === "PUT").length === 1
      ? new Response("Not Found", { status: 404 })
      : new Response(null, { status: 204 });
  };

  await uploadWebDavConfig({ settings, config, modifiedAt: 100 });
  assert.deepEqual(requests, [
    ["PUT", syncFileUrl],
    ["PROPFIND", "https://dav.example.com/dav/xianggu-translate/"],
    ["PUT", syncFileUrl],
  ]);
});

test("服务根地址不存在时停止创建目录", async () => {
  const requests = [];
  globalThis.fetch = async (url, init) => {
    requests.push([init.method, url]);
    return new Response(null, { status: 404 });
  };
  await assert.rejects(
    uploadWebDavConfig({ settings, config, modifiedAt: 100 }),
    /服务地址不存在/,
  );
  assert.deepEqual(requests, [
    ["PUT", syncFileUrl],
    ["PROPFIND", "https://dav.example.com/dav/xianggu-translate/"],
    ["PROPFIND", "https://dav.example.com/dav/"],
  ]);
});

test("未勾选时上传内容不包含 API Key", async () => {
  const methods = [];
  let uploadedDocument;
  globalThis.fetch = async (url, init) => {
    methods.push(init.method);
    uploadedDocument = JSON.parse(init.body);
    return new Response(null, { status: 204 });
  };

  await uploadWebDavConfig({ settings, config, modifiedAt: 100 });
  assert.equal("apiKey" in uploadedDocument.config, false);
  assert.deepEqual(methods, ["PUT"]);
});

test("下载直接返回远端配置，不比较时间戳", async () => {
  const remoteDocument = createSyncDocument({ ...config, theme: "light" }, 50, {
    includeApiKey: true,
  });
  globalThis.fetch = async (url, init) => {
    assert.equal(url, syncFileUrl);
    assert.equal(init.method, "GET");
    return new Response(JSON.stringify(remoteDocument));
  };

  const document = await downloadWebDavConfig(settings);
  assert.equal(document.modifiedAt, 50);
  assert.equal(document.config.theme, "light");
  assert.equal(document.config.apiKey, config.apiKey);
});

test("下载拒绝无效远端文件", async () => {
  globalThis.fetch = async () => new Response("不是同步文档");

  await assert.rejects(
    downloadWebDavConfig(settings),
    /文件格式无效/,
  );
});

test("下载不存在的远端文件时提示先上传", async () => {
  globalThis.fetch = async () => new Response(null, { status: 404 });
  await assert.rejects(downloadWebDavConfig(settings), /先在一台设备上上传/);
});

test("连接测试验证 WebDAV 服务根地址", async () => {
  globalThis.fetch = async (url, init) => {
    assert.equal(url, `${settings.url}/`);
    assert.equal(init.method, "PROPFIND");
    return new Response(null, { status: 207 });
  };
  assert.equal(await testWebDavConnection(settings), true);
});

test("连接测试拒绝不存在的服务根地址", async () => {
  globalThis.fetch = async () => new Response(null, { status: 404 });
  await assert.rejects(testWebDavConnection(settings), /服务地址不存在/);
});

test("连接测试兼容不支持 PROPFIND 的服务根地址", async () => {
  const methods = [];
  globalThis.fetch = async (url, init) => {
    methods.push(init.method);
    return new Response(null, { status: init.method === "PROPFIND" ? 405 : 200 });
  };
  assert.equal(await testWebDavConnection(settings), true);
  assert.deepEqual(methods, ["PROPFIND", "GET"]);
});
