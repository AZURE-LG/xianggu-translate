import { parseMarkedOutput } from "./core.js";
import {
  requestModels,
  requestTestTranslation,
  requestTranslation,
} from "./api.js";
import {
  downloadWebDavConfig,
  testWebDavConnection,
  uploadWebDavConfig,
} from "./webdav.js";

const FIRST_BYTE_TIMEOUT = 20_000;
const TOTAL_TIMEOUT = 120_000;
const SETTINGS_TIMEOUT = 30_000;

const sessionControllers = new Map();
const settingsControllers = new Map();

chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== "xianggu-translate") return;

  let sessionId = null;

  port.onMessage.addListener((message) => {
    if (!message || typeof message.sessionId !== "string") return;
    sessionId = message.sessionId;

    if (message.type === "translate") {
      handleTranslate(port, message);
      return;
    }

    if (message.type === "stop") {
      const controller = sessionControllers.get(message.sessionId);
      if (controller) {
        controller.userStopped = true;
        controller.abort();
      }
      return;
    }

    if (message.type === "models") {
      handleModels(port, message);
      return;
    }

    if (message.type === "test") {
      handleTest(port, message);
      return;
    }

    if (message.type === "webdav-test") {
      handleWebDavTest(port, message);
      return;
    }

    if (message.type === "webdav-upload") {
      handleWebDavUpload(port, message);
      return;
    }

    if (message.type === "webdav-download") {
      handleWebDavDownload(port, message);
    }
  });

  port.onDisconnect.addListener(() => {
    if (!sessionId) return;
    const controller = sessionControllers.get(sessionId);
    if (controller) {
      controller.abortedByDisconnect = true;
      controller.abort();
      sessionControllers.delete(sessionId);
    }

    const settingsController = settingsControllers.get(sessionId);
    settingsController?.abort();
    settingsControllers.delete(sessionId);
  });
});

function post(port, requestId, payload) {
  try {
    port.postMessage({ requestId, ...payload });
  } catch {
    // 面板已关闭时不再投递消息。
  }
}

async function handleTranslate(port, message) {
  const { sessionId, requestId, config, text } = message;
  const previous = sessionControllers.get(sessionId);
  if (previous) previous.abort();

  const controller = new AbortController();
  sessionControllers.set(sessionId, controller);

  let firstByteTimer = setTimeout(() => {
    controller.timeoutReason = "first";
    controller.abort();
  }, FIRST_BYTE_TIMEOUT);
  let totalTimer = setTimeout(() => {
    controller.timeoutReason = "total";
    controller.abort();
  }, TOTAL_TIMEOUT);

  const clearTimers = () => {
    clearTimeout(firstByteTimer);
    clearTimeout(totalTimer);
  };

  const isActive = () => sessionControllers.get(sessionId) === controller;
  const send = (payload) => {
    if (isActive()) post(port, requestId, payload);
  };

  try {
    const result = await requestTranslation({
      config,
      text,
      signal: controller.signal,
      onUpdate: (content) => {
        const parsed = parseMarkedOutput(content, false);
        if (parsed.sourceLanguage) {
          send({ type: "source", sourceLanguage: parsed.sourceLanguage });
        }
        if (parsed.translation) {
          send({ type: "delta", translation: parsed.translation });
        }
      },
      onFirstByte: () => {
        clearTimeout(firstByteTimer);
        firstByteTimer = null;
      },
    });

    send({ type: "done", ...result });
  } catch (error) {
    if (controller.userStopped) {
      send({ type: "stopped" });
    } else if (controller.abortedByDisconnect || !isActive()) {
      // 面板关闭或请求已被新请求取代时静默终止。
    } else if (controller.timeoutReason === "first") {
      send({ type: "error", message: "等待模型首个返回超时，请检查网络或更换模型。" });
    } else if (controller.timeoutReason === "total") {
      send({ type: "error", message: "翻译总耗时超时，请稍后重试。" });
    } else if (error?.status) {
      send({ type: "error", message: error.message });
    } else if (error?.name === "ProtocolError") {
      send({ type: "error", message: error.message });
    } else {
      send({ type: "error", message: "无法连接服务商，请检查网络或 Base URL。" });
    }
  } finally {
    clearTimers();
    if (isActive()) sessionControllers.delete(sessionId);
  }
}

function createSettingsController(sessionId) {
  const previous = settingsControllers.get(sessionId);
  previous?.abort();

  const controller = new AbortController();
  settingsControllers.set(sessionId, controller);
  const timer = setTimeout(() => controller.abort(), SETTINGS_TIMEOUT);
  controller.finish = () => {
    clearTimeout(timer);
    if (settingsControllers.get(sessionId) === controller) {
      settingsControllers.delete(sessionId);
    }
  };
  return controller;
}

function describeSettingsError(error) {
  if (error?.name === "AbortError") {
    return "操作超时，请检查服务商地址后重试。";
  }
  if (error?.status) return error.message;
  if (error?.name === "ProtocolError") return error.message;
  return "无法连接服务商，请检查网络或 Base URL。";
}

async function handleModels(port, message) {
  const { sessionId, requestId, config } = message;
  const controller = createSettingsController(sessionId);
  try {
    const models = await requestModels(config, controller.signal);
    post(port, requestId, { type: "models", models });
  } catch (error) {
    post(port, requestId, { type: "models-error", message: describeSettingsError(error) });
  } finally {
    controller.finish();
  }
}

async function handleTest(port, message) {
  const { sessionId, requestId, config } = message;
  const controller = createSettingsController(sessionId);
  try {
    const result = await requestTestTranslation(config, controller.signal);
    post(port, requestId, { type: "test", result });
  } catch (error) {
    post(port, requestId, { type: "test-error", message: describeSettingsError(error) });
  } finally {
    controller.finish();
  }
}

async function handleWebDavTest(port, message) {
  const { sessionId, requestId, settings } = message;
  const controller = createSettingsController(sessionId);
  try {
    await testWebDavConnection(settings, controller.signal);
    post(port, requestId, { type: "webdav-test" });
  } catch (error) {
    post(port, requestId, {
      type: "webdav-test-error",
      message: error?.name === "AbortError"
        ? "WebDAV 连接测试超时。"
        : error?.message || "无法连接 WebDAV，请检查地址和网络。",
    });
  } finally {
    controller.finish();
  }
}

async function handleWebDavUpload(port, message) {
  const { sessionId, requestId, settings, config, modifiedAt, includeApiKey } = message;
  const controller = createSettingsController(sessionId);
  try {
    await uploadWebDavConfig({
      settings,
      config,
      modifiedAt,
      includeApiKey,
      signal: controller.signal,
    });
    post(port, requestId, { type: "webdav-upload" });
  } catch (error) {
    post(port, requestId, {
      type: "webdav-upload-error",
      message: error?.name === "AbortError"
        ? "WebDAV 上传超时。"
        : error?.message || "无法上传到 WebDAV，请检查地址和网络。",
    });
  } finally {
    controller.finish();
  }
}

async function handleWebDavDownload(port, message) {
  const { sessionId, requestId, settings } = message;
  const controller = createSettingsController(sessionId);
  try {
    const document = await downloadWebDavConfig(settings, controller.signal);
    post(port, requestId, { type: "webdav-download", document });
  } catch (error) {
    post(port, requestId, {
      type: "webdav-download-error",
      message: error?.name === "AbortError"
        ? "WebDAV 下载超时。"
        : error?.message || "无法从 WebDAV 下载，请检查地址和网络。",
    });
  } finally {
    controller.finish();
  }
}
