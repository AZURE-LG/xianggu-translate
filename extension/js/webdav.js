import { normalizeBaseUrl } from "./core.js";

export const WEBDAV_SCHEMA_VERSION = 1;

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

export function createSyncDocument(config, modifiedAt = Date.now()) {
  return {
    schemaVersion: WEBDAV_SCHEMA_VERSION,
    modifiedAt,
    config: {
      version: config.version,
      provider: config.provider,
      baseUrl: config.baseUrl,
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

function webDavError(status, detail = "") {
  let message;
  if (status === 401 || status === 403) {
    message = "WebDAV 鉴权失败，请检查用户名、密码和文件权限。";
  } else if (status === 404) {
    message = "WebDAV 路径不存在，请先创建目标目录。";
  } else if (status === 405) {
    message = "WebDAV 服务不允许此操作，请确认填写的是可读写的文件地址。";
  } else if (status === 409) {
    message = "WebDAV 目标目录不存在，请先创建目录。";
  } else if (status === 413 || status === 507) {
    message = "WebDAV 存储空间不足或拒绝写入。";
  } else {
    message = `WebDAV 返回错误 ${status}。`;
  }
  return new Error(detail ? `${message}（${detail}）` : message);
}

async function putDocument(settings, document, signal) {
  const response = await fetch(settings.url, {
    method: "PUT",
    headers: webDavHeaders(settings, { "Content-Type": "application/json; charset=utf-8" }),
    body: JSON.stringify(document, null, 2),
    signal,
  });
  if (!response.ok) throw webDavError(response.status, await readError(response));
}

export async function testWebDavConnection(settings, signal) {
  const response = await fetch(settings.url, {
    method: "GET",
    headers: webDavHeaders(settings, { Accept: "application/json" }),
    cache: "no-store",
    signal,
  });
  if (response.ok || response.status === 404) return true;
  throw webDavError(response.status, await readError(response));
}

export async function syncWebDavConfig({ settings, config, modifiedAt, signal }) {
  const localDocument = createSyncDocument(config, modifiedAt);
  const response = await fetch(settings.url, {
    method: "GET",
    headers: webDavHeaders(settings, { Accept: "application/json" }),
    cache: "no-store",
    signal,
  });

  if (response.status === 404) {
    await putDocument(settings, localDocument, signal);
    return { direction: "uploaded", document: localDocument };
  }
  if (!response.ok) throw webDavError(response.status, await readError(response));

  let remoteDocument;
  try {
    remoteDocument = parseSyncDocument(await response.json());
  } catch {
    remoteDocument = null;
  }
  if (!remoteDocument) {
    throw new Error("WebDAV 文件格式无效，未覆盖本地或远端配置。");
  }

  if (remoteDocument.modifiedAt > localDocument.modifiedAt) {
    return { direction: "downloaded", document: remoteDocument };
  }
  if (remoteDocument.modifiedAt < localDocument.modifiedAt) {
    await putDocument(settings, localDocument, signal);
    return { direction: "uploaded", document: localDocument };
  }
  return { direction: "unchanged", document: localDocument };
}
