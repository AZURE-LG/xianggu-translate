import { normalizeBaseUrl } from "./core.js";

export const WEBDAV_SCHEMA_VERSION = 1;
export const WEBDAV_SYNC_DIRECTORY = "xianggu-translate";
export const WEBDAV_SYNC_FILE = "config.json";

function encodeBasicAuth(username, password) {
  const bytes = new TextEncoder().encode(`${username}:${password}`);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return `Basic ${btoa(binary)}`;
}

function webDavHeaders(settings, extra = {}) {
  return {
    ...(settings.username || settings.password
      ? { Authorization: encodeBasicAuth(settings.username, settings.password) }
      : {}),
    ...extra,
  };
}

export function normalizeWebDavUrl(value) {
  return normalizeBaseUrl(value);
}

function webDavRootUrl(value) {
  const normalized = normalizeWebDavUrl(value);
  return normalized ? `${normalized}/` : "";
}

export function webDavSyncFileUrl(value) {
  const rootUrl = webDavRootUrl(value);
  return rootUrl
    ? new URL(`${WEBDAV_SYNC_DIRECTORY}/${WEBDAV_SYNC_FILE}`, rootUrl).href
    : "";
}

function webDavSyncDirectoryUrl(value) {
  const rootUrl = webDavRootUrl(value);
  return rootUrl ? new URL(`${WEBDAV_SYNC_DIRECTORY}/`, rootUrl).href : "";
}

export function createSyncDocument(config, modifiedAt = Date.now(), options = {}) {
  return {
    schemaVersion: WEBDAV_SCHEMA_VERSION,
    modifiedAt,
    config: {
      version: config.version,
      provider: config.provider,
      baseUrl: config.baseUrl,
      ...(options.includeApiKey ? { apiKey: config.apiKey } : {}),
      model: config.model,
      sourceLanguage: config.sourceLanguage,
      targetLanguage: config.targetLanguage,
      autoTranslate: config.autoTranslate,
      theme: config.theme,
      colorPreset: config.colorPreset,
    },
  };
}

export function parseSyncDocument(value) {
  if (!value || typeof value !== "object") return null;
  if (value.schemaVersion !== WEBDAV_SCHEMA_VERSION) return null;
  if (!Number.isFinite(value.modifiedAt) || value.modifiedAt <= 0) return null;
  if (!value.config || typeof value.config !== "object" || Array.isArray(value.config)) return null;
  return value;
}

async function readError(response) {
  try {
    return (await response.text()).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
  } catch {
    return "";
  }
}

async function collectionExists(settings, url, signal) {
  const response = await fetch(url, {
    method: "PROPFIND",
    headers: webDavHeaders(settings, { Depth: "0" }),
    cache: "no-store",
    signal,
  });
  if (response.ok) return true;
  if (response.status === 404) return false;
  if (response.status === 405 || response.status === 501) return null;
  throw webDavError(response.status, await readError(response));
}

async function requireWebDavRoot(settings, signal) {
  const rootUrl = webDavRootUrl(settings.url);
  const exists = await collectionExists(settings, rootUrl, signal);
  if (exists === true) return rootUrl;
  if (exists === false) {
    throw new Error("WebDAV 服务地址不存在，请检查服务地址是否正确。");
  }

  const response = await fetch(rootUrl, {
    method: "GET",
    headers: webDavHeaders(settings),
    cache: "no-store",
    signal,
  });
  if (response.ok) return rootUrl;
  throw webDavError(response.status, await readError(response));
}

async function ensureCollection(settings, url, rootUrl, signal) {
  const exists = await collectionExists(settings, url, signal);
  if (exists === true) return;

  const parentUrl = new URL("../", url).href;
  if (url === rootUrl || !url.startsWith(rootUrl) || !parentUrl.startsWith(rootUrl)) {
    throw new Error("不能在 WebDAV 服务地址之外创建同步目录，请检查服务地址是否正确。");
  }

  if (parentUrl === rootUrl) {
    await requireWebDavRoot(settings, signal);
  } else {
    await ensureCollection(settings, parentUrl, rootUrl, signal);
  }
  const response = await fetch(url, {
    method: "MKCOL",
    headers: webDavHeaders(settings),
    signal,
  });
  if (response.ok || response.status === 405) return;
  if ((response.status === 404 || response.status === 409) &&
      await collectionExists(settings, url, signal) === true) return;
  throw webDavError(response.status, await readError(response));
}

function webDavError(status, detail = "") {
  let message;
  if (status === 401 || status === 403) {
    message = "WebDAV 鉴权失败，请检查用户名、密码和文件权限。";
  } else if (status === 404) {
    message = "WebDAV 路径不存在，请检查服务地址是否正确。";
  } else if (status === 405) {
    message = "WebDAV 服务不允许创建同步目录或写入文件，请检查服务地址和权限。";
  } else if (status === 409) {
    message = "WebDAV 服务无法创建内部同步目录，请检查服务地址和权限。";
  } else if (status === 413 || status === 507) {
    message = "WebDAV 存储空间不足或拒绝写入。";
  } else {
    message = `WebDAV 返回错误 ${status}。`;
  }
  return new Error(detail ? `${message}（${detail}）` : message);
}

async function putDocument(settings, document, signal) {
  const fileUrl = webDavSyncFileUrl(settings.url);
  const request = () => fetch(fileUrl, {
    method: "PUT",
    headers: webDavHeaders(settings, { "Content-Type": "application/json; charset=utf-8" }),
    body: JSON.stringify(document, null, 2),
    signal,
  });
  let response = await request();
  if (response.status === 404 || response.status === 409) {
    const rootUrl = webDavRootUrl(settings.url);
    await ensureCollection(settings, webDavSyncDirectoryUrl(settings.url), rootUrl, signal);
    response = await request();
  }
  if (!response.ok) throw webDavError(response.status, await readError(response));
}

export async function testWebDavConnection(settings, signal) {
  await requireWebDavRoot(settings, signal);
  return true;
}

export async function uploadWebDavConfig({
  settings,
  config,
  modifiedAt,
  includeApiKey = false,
  signal,
}) {
  const document = createSyncDocument(config, modifiedAt, { includeApiKey });
  await putDocument(settings, document, signal);
  return document;
}

export async function downloadWebDavConfig(settings, signal) {
  const response = await fetch(webDavSyncFileUrl(settings.url), {
    method: "GET",
    headers: webDavHeaders(settings, { Accept: "application/json" }),
    cache: "no-store",
    signal,
  });

  if (response.status === 404) {
    throw new Error("WebDAV 同步文件不存在，请先在一台设备上上传本机配置。");
  }
  if (!response.ok) throw webDavError(response.status, await readError(response));

  let document;
  try {
    document = parseSyncDocument(await response.json());
  } catch {
    document = null;
  }
  if (!document) {
    throw new Error("WebDAV 文件格式无效，无法下载配置。你可以上传本机配置来替换该文件。");
  }
  return document;
}
