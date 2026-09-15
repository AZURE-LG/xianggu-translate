import {
  AUTO_SOURCE_LANGUAGE,
  DEFAULT_TARGET_LANGUAGE,
  LANGUAGE_OPTIONS,
  MAX_CUSTOM_LANGUAGE_LENGTH,
  MAX_INPUT_LENGTH,
  PROVIDERS,
  countCodePoints,
  formatSourceLanguage,
  isBuiltInBaseUrl,
  normalizeBaseUrl,
  normalizeSourceLanguage,
  normalizeTargetLanguage,
  permissionPattern,
  usesPlainHttp,
} from "./core.js";
import { normalizeWebDavUrl } from "./webdav.js";

const THEME_ORDER = ["system", "light", "dark"];
const COLOR_PRESET_ORDER = ["graphite", "claude", "chatgpt", "forest", "lake", "sunset", "lavender"];

const DEFAULT_CONFIG = {
  version: 4,
  provider: "openai",
  baseUrl: PROVIDERS.openai.baseUrl,
  apiKey: "",
  model: PROVIDERS.openai.model,
  sourceLanguage: { ...AUTO_SOURCE_LANGUAGE },
  targetLanguage: { ...DEFAULT_TARGET_LANGUAGE },
  autoTranslate: true,
  theme: "system",
  colorPreset: "graphite",
  modifiedAt: 0,
  webDav: {
    enabled: false,
    url: "",
    username: "",
    password: "",
    includeApiKey: false,
  },
};

const state = {
  mode: "popup",
  sessionId: crypto.randomUUID(),
  requestId: 0,
  activeRequestId: 0,
  settingsRequestId: 0,
  config: null,
  port: null,
  running: false,
  composing: false,
  debounceTimer: null,
  statusTimer: null,
  sessionSaveTimer: null,
  models: [],
  lastRequestText: "",
  lastSourceLanguage: "",
  settingsBusy: false,
  ready: false,
};

const elements = {};

document.addEventListener("DOMContentLoaded", async () => {
  collectElements();
  state.mode = new URLSearchParams(window.location.search).get("mode") ?? "popup";
  document.body.dataset.mode = state.mode;

  populateProviders();
  populateLanguages();
  bindEvents();
  await loadConfig();
  connectWorker();
  updateCharCount();
  setRunningState();
  await restoreSessionState();
  state.ready = true;
  document.body.dataset.ready = "true";
  updateModeControls();
  initializeMotion();
});

function collectElements() {
  const ids = [
    "sidePanelButton",
    "sidePanelTooltip",
    "openOptionsButton",
    "settingsButton",
    "settingsTooltip",
    "themeToggleButton",
    "translator",
    "settings",
    "input",
    "charCount",
    "clearInputButton",
    "pasteInputButton",
    "autoModeHint",
    "primaryButton",
    "primaryButtonLabel",
    "copyButton",
    "copyButtonLabel",
    "retryButton",
    "status",
    "quickSourceLanguage",
    "quickTargetLanguage",
    "swapLanguagesButton",
    "detectedLanguageBadge",
    "output",
    "modelShortcutButton",
    "modelShortcutLabel",
    "settingsForm",
    "settingsTitle",
    "settingsIntro",
    "provider",
    "baseUrl",
    "baseUrlWarning",
    "apiKey",
    "toggleApiKey",
    "clearApiKey",
    "model",
    "modelPickerButton",
    "modelPickerList",
    "loadModelButton",
    "modelOptions",
    "targetLanguage",
    "customTargetLanguage",
    "settingsAutoTranslate",
    "theme",
    "themeControl",
    "colorPreset",
    "colorPresetControl",
    "testTranslationButton",
    "saveSettingsButton",
    "webDavEnabled",
    "webDavUrl",
    "webDavUsername",
    "webDavPassword",
    "toggleWebDavPassword",
    "webDavIncludeApiKey",
    "testWebDavButton",
    "uploadWebDavButton",
    "downloadWebDavButton",
  ];
  for (const id of ids) {
    elements[id] = document.getElementById(id);
  }
}

function populateProviders() {
  elements.provider.replaceChildren();
  for (const [value, item] of Object.entries(PROVIDERS)) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = item.label;
    elements.provider.append(option);
  }
}

function populateLanguages() {
  elements.targetLanguage.replaceChildren();
  for (const language of LANGUAGE_OPTIONS) {
    const option = document.createElement("option");
    option.value = language.code;
    option.textContent = language.label;
    elements.targetLanguage.append(option);
  }

  const custom = document.createElement("option");
  custom.value = "custom";
  custom.textContent = "自定义";
  elements.targetLanguage.append(custom);
}

function populateQuickLanguageSelectors(sourceLanguage, targetLanguage) {
  const source = normalizeSourceLanguage(sourceLanguage);
  const target = normalizeTargetLanguage(targetLanguage) ?? { ...DEFAULT_TARGET_LANGUAGE };

  elements.quickSourceLanguage.replaceChildren();
  for (const language of [AUTO_SOURCE_LANGUAGE, ...LANGUAGE_OPTIONS]) {
    const option = document.createElement("wa-option");
    option.value = language.code;
    option.textContent = language.label;
    elements.quickSourceLanguage.append(option);
  }
  elements.quickSourceLanguage.value = source.code;

  elements.quickTargetLanguage.replaceChildren();
  for (const language of LANGUAGE_OPTIONS) {
    const option = document.createElement("wa-option");
    option.value = language.code;
    option.textContent = language.label;
    elements.quickTargetLanguage.append(option);
  }
  if (target.type === "custom") {
    const custom = document.createElement("wa-option");
    custom.value = "custom";
    custom.textContent = target.label;
    elements.quickTargetLanguage.append(custom);
  }
  elements.quickTargetLanguage.value = target.type === "preset" ? target.code : "custom";
}

function bindEvents() {
  elements.input.addEventListener("input", handleInput);
  elements.input.addEventListener("compositionstart", () => {
    state.composing = true;
  });
  elements.input.addEventListener("compositionend", () => {
    state.composing = false;
    scheduleAutoTranslate();
  });
  elements.input.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      startTranslation();
    }
  });

  elements.primaryButton.addEventListener("click", () => {
    if (state.running) {
      stopActiveRequest("已停止，可复制当前译文。");
    } else {
      startTranslation();
    }
  });
  elements.retryButton.addEventListener("click", () => {
    elements.retryButton.classList.add("is-retrying");
    setTimeout(() => elements.retryButton.classList.remove("is-retrying"), 500);
    startTranslation({ retry: true });
  });
  elements.copyButton.addEventListener("click", copyOutput);

  elements.settingsButton.addEventListener("click", toggleSettings);
  elements.themeToggleButton.addEventListener("click", toggleQuickTheme);
  elements.sidePanelButton.addEventListener("click", openSidePanel);
  elements.openOptionsButton.addEventListener("click", openOptionsPage);
  elements.clearInputButton.addEventListener("click", clearTranslation);
  elements.pasteInputButton.addEventListener("click", pasteInput);
  elements.modelShortcutButton.addEventListener("click", openModelSettings);
  elements.swapLanguagesButton.addEventListener("click", swapLanguages);
  elements.quickSourceLanguage.addEventListener("change", updateQuickLanguages);
  elements.quickTargetLanguage.addEventListener("change", updateQuickLanguages);
  elements.provider.addEventListener("change", handleProviderChange);
  elements.toggleApiKey.addEventListener("click", toggleApiKeyVisibility);
  elements.clearApiKey.addEventListener("click", () => {
    elements.apiKey.value = "";
    elements.apiKey.focus();
  });
  elements.loadModelButton.addEventListener("click", loadModels);
  elements.modelPickerButton.addEventListener("click", openModelPicker);
  elements.model.addEventListener("keydown", handleModelInputKeydown);
  document.addEventListener("click", (event) => {
    if (!event.target.closest?.(".model-input-control")) closeModelPicker();
  });
  elements.testTranslationButton.addEventListener("click", testTranslation);
  elements.webDavEnabled.addEventListener("change", updateWebDavFormState);
  elements.toggleWebDavPassword.addEventListener("click", toggleWebDavPasswordVisibility);
  elements.testWebDavButton.addEventListener("click", testWebDav);
  elements.uploadWebDavButton.addEventListener("click", uploadWebDav);
  elements.downloadWebDavButton.addEventListener("click", downloadWebDav);
  elements.settingsForm.addEventListener("submit", saveSettings);

  for (const button of elements.themeControl.querySelectorAll("[data-theme-choice]")) {
    button.addEventListener("click", (event) => selectThemeChoice(button.dataset.themeChoice, true, event));
    button.addEventListener("keydown", handleThemeChoiceKeydown);
  }

  for (const button of elements.colorPresetControl.querySelectorAll("[data-color-preset]")) {
    button.addEventListener("click", () => selectColorPreset(button.dataset.colorPreset, true));
    button.addEventListener("keydown", handleColorPresetKeydown);
  }

  elements.targetLanguage.addEventListener("change", () => {
    const isCustom = elements.targetLanguage.value === "custom";
    elements.customTargetLanguage.disabled = !isCustom;
    if (isCustom) elements.customTargetLanguage.focus();
  });

  elements.baseUrl.addEventListener("input", updateBaseUrlWarning);

  if (globalThis.chrome?.storage?.onChanged) {
    globalThis.chrome.storage.onChanged.addListener(async (changes, area) => {
      if (area !== "local" || !changes.config) return;
      const nextConfig = normalizeConfig(changes.config.newValue);
      if (JSON.stringify(nextConfig) === JSON.stringify(state.config)) return;
      const preserveSettings = !elements.settings.hidden;
      state.config = nextConfig;
      await renderConfig({ preserveSettings });
    });
  }

  if (window.matchMedia) {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener?.("change", () => {
      if ((state.config?.theme ?? "system") === "system") applyTheme();
    });
  }
}

async function loadConfig() {
  const stored = await chrome.storage.local.get("config");
  const incoming = stored.config;
  state.config = incoming ? normalizeConfig(incoming) : { ...DEFAULT_CONFIG };

  const migrated = JSON.stringify(incoming ?? null) !== JSON.stringify(state.config);
  if (!incoming || migrated) {
    await saveConfig(state.config);
  }
  await renderConfig();
}

function normalizeConfig(value) {
  const raw = value && typeof value === "object" ? value : {};
  const provider = PROVIDERS[raw.provider] ? raw.provider : "openai";
  const preset = PROVIDERS[provider];
  const targetLanguage = normalizeTargetLanguage(raw.targetLanguage) ?? { ...DEFAULT_TARGET_LANGUAGE };
  const rawWebDav = raw.webDav && typeof raw.webDav === "object" ? raw.webDav : {};

  return {
    version: 4,
    provider,
    baseUrl: normalizeBaseUrl(raw.baseUrl) || preset.baseUrl,
    apiKey: typeof raw.apiKey === "string" ? raw.apiKey.slice(0, 500) : "",
    model: typeof raw.model === "string" ? raw.model.trim().slice(0, 160) : preset.model,
    sourceLanguage: normalizeSourceLanguage(raw.sourceLanguage),
    targetLanguage,
    autoTranslate: raw.autoTranslate !== false,
    theme: THEME_ORDER.includes(raw.theme) ? raw.theme : "system",
    colorPreset: COLOR_PRESET_ORDER.includes(raw.colorPreset) ? raw.colorPreset : "graphite",
    modifiedAt: Number.isFinite(raw.modifiedAt) && raw.modifiedAt > 0 ? raw.modifiedAt : Date.now(),
    webDav: {
      enabled: rawWebDav.enabled === true,
      url: normalizeStoredWebDavUrl(rawWebDav.url),
      username: typeof rawWebDav.username === "string" ? rawWebDav.username.trim().slice(0, 200) : "",
      password: typeof rawWebDav.password === "string" ? rawWebDav.password.slice(0, 500) : "",
      includeApiKey: rawWebDav.includeApiKey === true,
    },
  };
}

function normalizeStoredWebDavUrl(value) {
  const normalized = normalizeWebDavUrl(value);
  if (!normalized) return "";

  const url = new URL(normalized);
  const segments = url.pathname.split("/").filter(Boolean);
  if (segments.at(-1)?.toLowerCase() !== "config.json") return normalized;

  segments.pop();
  url.pathname = segments.length ? `/${segments.join("/")}` : "/";
  return normalizeWebDavUrl(url.href);
}

function isConfigComplete(config) {
  return Boolean(
    config.baseUrl &&
    config.model &&
    config.targetLanguage &&
    (!PROVIDERS[config.provider]?.requiresApiKey || config.apiKey),
  );
}

async function renderConfig(options = {}) {
  fillSettingsForm(state.config);
  populateQuickLanguageSelectors(state.config.sourceLanguage, state.config.targetLanguage);
  updateAutoModeHint();
  updateDetectedLanguage();
  updateSwapState();
  updateBaseUrlWarning();
  updateModelShortcut();

  if (state.mode === "options" || options.preserveSettings) {
    showSettings();
  } else if (isConfigComplete(state.config)) {
    showTranslator();
  } else {
    showSettings();
    updateStatus("请先完成初始配置。");
  }
  applyColorPreset(state.config.colorPreset);
  await applyTheme();
}

function fillSettingsForm(config) {
  elements.provider.value = config.provider;
  elements.baseUrl.value = config.baseUrl;
  elements.apiKey.value = config.apiKey ?? "";
  elements.model.value = config.model ?? "";
  elements.settingsAutoTranslate.checked = Boolean(config.autoTranslate);
  elements.webDavEnabled.checked = Boolean(config.webDav?.enabled);
  elements.webDavUrl.value = config.webDav?.url ?? "";
  elements.webDavUsername.value = config.webDav?.username ?? "";
  elements.webDavPassword.value = config.webDav?.password ?? "";
  elements.webDavIncludeApiKey.checked = config.webDav?.includeApiKey === true;
  updateWebDavFormState();
  selectThemeChoice(config.theme ?? "system", false);
  selectColorPreset(config.colorPreset ?? "graphite", false);

  const target = normalizeTargetLanguage(config.targetLanguage);
  if (target?.type === "preset") {
    elements.targetLanguage.value = target.code;
    elements.customTargetLanguage.value = "";
    elements.customTargetLanguage.disabled = true;
  } else {
    elements.targetLanguage.value = "custom";
    elements.customTargetLanguage.value = target?.label ?? "";
    elements.customTargetLanguage.disabled = false;
  }
}

function handleProviderChange() {
  const provider = PROVIDERS[elements.provider.value];
  if (!provider) return;

  elements.baseUrl.value = provider.baseUrl;
  elements.model.value = provider.model;
  elements.apiKey.value = "";
  state.models = [];
  elements.modelOptions.replaceChildren();
  elements.modelPickerList.replaceChildren();
  closeModelPicker();
  updateModelPickerState();
  updateBaseUrlWarning();
}

function toggleApiKeyVisibility() {
  const isPassword = elements.apiKey.type === "password";
  elements.apiKey.type = isPassword ? "text" : "password";
  elements.toggleApiKey.textContent = isPassword ? "隐藏" : "显示";
}

function toggleWebDavPasswordVisibility() {
  const isPassword = elements.webDavPassword.type === "password";
  elements.webDavPassword.type = isPassword ? "text" : "password";
  elements.toggleWebDavPassword.textContent = isPassword ? "隐藏" : "显示";
}

function readWebDavForm() {
  return {
    enabled: elements.webDavEnabled.checked,
    url: normalizeWebDavUrl(elements.webDavUrl.value),
    username: elements.webDavUsername.value.trim().slice(0, 200),
    password: elements.webDavPassword.value.slice(0, 500),
    includeApiKey: elements.webDavIncludeApiKey.checked,
  };
}

function readSettingsForm() {
  const provider = elements.provider.value;
  const baseUrl = normalizeBaseUrl(elements.baseUrl.value);
  const apiKey = elements.apiKey.value.trim();
  const model = elements.model.value.trim().slice(0, 160);
  const theme = THEME_ORDER.includes(elements.theme.value) ? elements.theme.value : "system";
  const colorPreset = COLOR_PRESET_ORDER.includes(elements.colorPreset.value)
    ? elements.colorPreset.value
    : "graphite";
  const targetLanguage = elements.targetLanguage.value === "custom"
    ? normalizeTargetLanguage({ type: "custom", label: elements.customTargetLanguage.value })
    : LANGUAGE_OPTIONS.find((item) => item.code === elements.targetLanguage.value);
  const webDav = readWebDavForm();

  return {
    version: 4,
    provider,
    baseUrl,
    apiKey,
    model,
    sourceLanguage: normalizeSourceLanguage(state.config?.sourceLanguage),
    targetLanguage,
    autoTranslate: elements.settingsAutoTranslate.checked,
    theme,
    colorPreset,
    modifiedAt: state.config?.modifiedAt ?? Date.now(),
    webDav,
  };
}

function validateSettings(config, options = {}) {
  const requireModel = options.requireModel !== false;
  const requireTargetLanguage = options.requireTargetLanguage !== false;
  if (!config.baseUrl) {
    return "Base URL 无效：公网地址必须使用 HTTPS，且不能包含账号、查询参数或 hash。";
  }
  if (requireModel && !config.model) return "请填写模型名。";
  if (requireTargetLanguage && !config.targetLanguage) {
    return `目标语言不能为空，且最多 ${MAX_CUSTOM_LANGUAGE_LENGTH} 个字符。`;
  }
  if (PROVIDERS[config.provider]?.requiresApiKey && !config.apiKey) {
    return "当前服务商需要 API Key。";
  }
  if (config.webDav.enabled && !config.webDav.url) {
    return "WebDAV 服务地址无效：公网地址必须使用 HTTPS，且不能包含账号、查询参数或 hash。";
  }
  return "";
}

async function saveSettings(event) {
  event.preventDefault();
  const config = readSettingsForm();
  const validationError = validateSettings(config);
  if (validationError) {
    updateStatus(validationError, true);
    return;
  }

  if (!isBuiltInBaseUrl(config.baseUrl)) {
    const granted = await requestPermission(config.baseUrl);
    if (!granted) {
      updateStatus("需要授权该地址后才能保存。", true);
      return;
    }
  }
  if (config.webDav.enabled && !(await authorizeWebDav(config.webDav))) return;

  state.config = config;
  await saveConfig(config);
  if (state.mode === "options") {
    showSettings();
  } else {
    showTranslator();
  }
  populateQuickLanguageSelectors(config.sourceLanguage, config.targetLanguage);
  updateAutoModeHint();
  updateStatus(usesPlainHttp(config.baseUrl)
    ? "设置已保存。注意：该地址通过 HTTP 明文传输。"
    : "设置已保存。");
}

async function requestPermission(baseUrl) {
  if (!globalThis.chrome?.permissions?.request) return false;
  try {
    return await chrome.permissions.request({
      origins: [permissionPattern(baseUrl)],
    });
  } catch {
    return false;
  }
}

async function authorizeWebDav(settings) {
  if (!settings.enabled || !settings.url) {
    updateStatus("请先启用 WebDAV 并填写有效的服务地址。", true);
    return false;
  }
  const granted = await requestPermission(settings.url);
  if (!granted) updateStatus("需要授权 WebDAV 地址后才能连接。", true);
  return granted;
}

async function saveConfig(config, options = {}) {
  if (options.touch !== false) config.modifiedAt = Date.now();
  await chrome.storage.local.set({ config });
}

function updateWebDavFormState() {
  if (!elements.webDavEnabled.checked) cancelSyncConfirmation?.();
  const disabled = !elements.webDavEnabled.checked || state.settingsBusy;
  revealElement(document.getElementById("syncFields"), elements.webDavEnabled.checked, true);
  elements.webDavUrl.disabled = disabled;
  elements.webDavUsername.disabled = disabled;
  elements.webDavPassword.disabled = disabled;
  elements.toggleWebDavPassword.disabled = disabled;
  elements.webDavIncludeApiKey.disabled = disabled;
  elements.testWebDavButton.disabled = disabled;
  elements.uploadWebDavButton.disabled = disabled;
  elements.downloadWebDavButton.disabled = disabled;
}

async function testWebDav() {
  if (state.settingsBusy) return;
  const settings = readWebDavForm();
  if (!(await authorizeWebDav(settings))) return;

  state.settingsRequestId += 1;
  setSettingsBusy(true);
  updateStatus("正在测试 WebDAV 连接...");
  postToWorker({
    type: "webdav-test",
    sessionId: state.sessionId,
    requestId: state.settingsRequestId,
    settings,
  });
}

async function prepareWebDavTransfer() {
  if (!state.config || state.settingsBusy) return null;
  const settings = readWebDavForm();
  if (!settings.enabled || !settings.url) {
    updateStatus("请先启用 WebDAV 并填写有效的服务地址。", true);
    return null;
  }
  if (!(await authorizeWebDav(settings))) return null;

  state.config = { ...state.config, webDav: settings };
  await saveConfig(state.config, { touch: false });
  state.settingsRequestId += 1;
  setSettingsBusy(true);
  return settings;
}

async function uploadWebDav() {
  if (!(await confirmSyncTransfer("upload"))) return;
  const settings = await prepareWebDavTransfer();
  if (!settings) return;
  updateStatus("正在上传本机配置...");
  postToWorker({
    type: "webdav-upload",
    sessionId: state.sessionId,
    requestId: state.settingsRequestId,
    settings,
    config: state.config,
    modifiedAt: state.config.modifiedAt,
    includeApiKey: settings.includeApiKey,
  });
}

async function downloadWebDav() {
  if (!(await confirmSyncTransfer("download"))) return;
  const settings = await prepareWebDavTransfer();
  if (!settings) return;
  updateStatus("正在下载远端配置...");
  postToWorker({
    type: "webdav-download",
    sessionId: state.sessionId,
    requestId: state.settingsRequestId,
    settings,
  });
}

function prepareSettingsConfig(options = {}) {
  const config = readSettingsForm();
  const validationError = validateSettings(config, options);
  if (validationError) {
    updateStatus(validationError, true);
    return null;
  }
  return config;
}

async function authorizeSettingsConfig(config) {
  if (isBuiltInBaseUrl(config.baseUrl)) return true;
  const granted = await requestPermission(config.baseUrl);
  if (!granted) updateStatus("需要授权该地址后才能测试。", true);
  return granted;
}

async function loadModels() {
  const config = prepareSettingsConfig({
    requireModel: false,
    requireTargetLanguage: false,
  });
  if (!config || !(await authorizeSettingsConfig(config))) return;

  state.settingsRequestId += 1;
  setSettingsBusy(true);
  updateStatus("正在获取模型列表...");
  postToWorker({
    type: "models",
    sessionId: state.sessionId,
    requestId: state.settingsRequestId,
    config,
  });
}

function updateModelPickerState() {
  if (!elements.modelPickerButton) return;
  const count = state.models.length;
  elements.modelPickerButton.disabled = state.settingsBusy || count === 0;
  elements.modelPickerButton.setAttribute(
    "aria-label",
    count ? `打开模型下拉列表，共 ${count} 个候选` : "请先获取模型列表",
  );
  if (elements.modelPickerButton.disabled) closeModelPicker();
}

function openModelPicker() {
  if (!state.models.length) return;
  const willOpen = elements.modelPickerButton.getAttribute("aria-expanded") !== "true";
  if (!willOpen) {
    closeModelPicker();
    elements.model.focus();
    return;
  }
  for (const option of elements.modelPickerList.querySelectorAll("[data-model-id]")) {
    option.setAttribute("aria-selected", String(option.dataset.modelId === elements.model.value));
  }
  revealElement(elements.modelPickerList, true);
  elements.modelPickerButton.setAttribute("aria-expanded", "true");
  const selectedOption = elements.modelPickerList.querySelector("[aria-selected='true']")
    ?? elements.modelPickerList.querySelector("[data-model-id]");
  selectedOption?.focus();
}

function closeModelPicker() {
  if (!elements.modelPickerList) return;
  revealElement(elements.modelPickerList, false);
  elements.modelPickerButton?.setAttribute("aria-expanded", "false");
}

function selectModelOption(modelId) {
  elements.model.value = modelId;
  elements.model.dispatchEvent(new Event("input", { bubbles: true }));
  elements.model.dispatchEvent(new Event("change", { bubbles: true }));
  closeModelPicker();
  elements.model.focus();
}

function handleModelInputKeydown(event) {
  if (event.key === "Escape") {
    closeModelPicker();
    return;
  }
  if (event.key === "ArrowDown" && event.altKey && state.models.length) {
    event.preventDefault();
    openModelPicker();
  }
}

function handleModelOptionKeydown(event) {
  if (!["ArrowUp", "ArrowDown", "Home", "End", "Escape"].includes(event.key)) return;
  event.preventDefault();
  if (event.key === "Escape") {
    closeModelPicker();
    elements.model.focus();
    return;
  }
  const options = [...elements.modelPickerList.querySelectorAll("[data-model-id]")];
  const currentIndex = options.indexOf(event.currentTarget);
  const nextIndex = event.key === "Home"
    ? 0
    : event.key === "End"
      ? options.length - 1
      : (currentIndex + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length;
  options[nextIndex]?.focus();
}

async function testTranslation() {
  const config = prepareSettingsConfig();
  if (!config || !(await authorizeSettingsConfig(config))) return;

  state.settingsRequestId += 1;
  setSettingsBusy(true);
  updateStatus("正在发送最小翻译测试...");
  postToWorker({
    type: "test",
    sessionId: state.sessionId,
    requestId: state.settingsRequestId,
    config,
  });
}

function setSettingsBusy(busy) {
  state.settingsBusy = busy;
  document.body.classList.toggle("settings-busy", busy);
  elements.loadModelButton.disabled = busy;
  elements.testTranslationButton.disabled = busy;
  elements.saveSettingsButton.disabled = busy;
  updateWebDavFormState();
  updateModelPickerState();
}

function connectWorker() {
  const port = chrome.runtime.connect({ name: "xianggu-translate" });
  state.port = port;
  port.onMessage.addListener(handleWorkerMessage);
  port.onDisconnect.addListener(() => {
    if (state.port === port) state.port = null;
  });
}

function postToWorker(message) {
  if (!state.port) connectWorker();
  try {
    state.port.postMessage(message);
  } catch {
    connectWorker();
    state.port.postMessage(message);
  }
}

function handleWorkerMessage(message) {
  if ([
    "models",
    "models-error",
    "test",
    "test-error",
    "webdav-test",
    "webdav-test-error",
    "webdav-upload",
    "webdav-upload-error",
    "webdav-download",
    "webdav-download-error",
  ].includes(message.type)) {
    if (message.requestId !== state.settingsRequestId) return;
    setSettingsBusy(false);
    void handleSettingsMessage(message);
    return;
  }

  if (message.requestId !== state.activeRequestId) return;

  if (message.type === "source") {
    state.lastSourceLanguage = message.sourceLanguage;
    updateDetectedLanguage();
    updateSwapState();
    scheduleSessionSave();
    return;
  }

  if (message.type === "delta") {
    setOutput(message.translation);
    return;
  }

  if (message.type === "done") {
    state.running = false;
    setRunningState();
    setOutput(message.translation);
    animateLabel(elements.primaryButtonLabel, "翻译完成");
    clearTimeout(state.completeTimer);
    state.completeTimer = setTimeout(() => {
      if (!state.running) animateLabel(elements.primaryButtonLabel, "翻译");
    }, 1600);
    state.lastSourceLanguage = message.sourceLanguage;
    updateDetectedLanguage();
    updateSwapState();
    updateStatus(message.truncated
      ? "翻译完成，但服务商提示输出可能被截断。"
      : "翻译完成。");
    return;
  }

  if (message.type === "stopped") {
    state.running = false;
    setRunningState();
    updateStatus("已停止，可复制当前译文。");
    return;
  }

  if (message.type === "error") {
    state.running = false;
    setRunningState();
    updateStatus(message.message, true);
  }
}

async function handleSettingsMessage(message) {
  if ([
    "models-error",
    "test-error",
    "webdav-test-error",
    "webdav-upload-error",
    "webdav-download-error",
  ].includes(message.type)) {
    if (message.type === "models-error") {
      state.models = [];
      elements.modelOptions.replaceChildren();
      elements.modelPickerList.replaceChildren();
      updateModelPickerState();
    }
    updateStatus(message.message, true);
    return;
  }

  if (message.type === "models") {
    state.models = message.models ?? [];
    elements.modelOptions.replaceChildren();
    elements.modelPickerList.replaceChildren();
    for (const model of state.models) {
      const option = document.createElement("option");
      option.value = model.id;
      elements.modelOptions.append(option);

      const pickerOption = document.createElement("button");
      pickerOption.type = "button";
      pickerOption.className = "model-picker-option";
      pickerOption.dataset.modelId = model.id;
      pickerOption.setAttribute("role", "option");
      pickerOption.setAttribute("aria-selected", String(elements.model.value === model.id));
      pickerOption.textContent = model.id;
      pickerOption.addEventListener("click", () => selectModelOption(model.id));
      pickerOption.addEventListener("keydown", handleModelOptionKeydown);
      elements.modelPickerList.append(pickerOption);
    }
    updateModelPickerState();

    if (!state.models.length) {
      updateStatus("模型列表为空或不可用，请手动填写模型名。", true);
      return;
    }
    updateStatus(`已获取 ${state.models.length} 个疑似 Chat 模型。`);
    return;
  }

  if (message.type === "test") {
    const source = formatSourceLanguage(message.result.sourceLanguage);
    updateStatus(`测试翻译成功（${source}）：${message.result.translation}`);
    return;
  }

  if (message.type === "webdav-test") {
    updateStatus("WebDAV 连接成功，可以读取该地址。");
    return;
  }

  if (message.type === "webdav-upload") {
    updateStatus("已将本机配置上传到 WebDAV。");
    return;
  }

  if (message.type === "webdav-download") {
    const { document } = message;
    const providerChanged = document.config.provider !== state.config.provider ||
      normalizeBaseUrl(document.config.baseUrl) !== state.config.baseUrl;
    const hasSyncedApiKey = state.config.webDav.includeApiKey &&
      typeof document.config.apiKey === "string";
    state.config = normalizeConfig({
      ...state.config,
      ...document.config,
      apiKey: hasSyncedApiKey
        ? document.config.apiKey
        : providerChanged ? "" : state.config.apiKey,
      modifiedAt: document.modifiedAt,
      webDav: state.config.webDav,
    });
    await saveConfig(state.config, { touch: false });
    await renderConfig({ preserveSettings: true });
    updateStatus(providerChanged && !hasSyncedApiKey
      ? "已下载远端配置；服务商已变化，请重新填写 API Key。"
      : "已下载远端配置并覆盖本机配置。");
  }
}

function startTranslation(options = {}) {
  clearTimeout(state.debounceTimer);
  elements.autoModeHint?.classList.remove("is-waiting");
  if (state.running) return;

  const text = options.retry ? state.lastRequestText : elements.input.value;
  if (!text.trim()) {
    updateStatus(options.retry ? "暂无可重译的原文。" : "请输入要翻译的文本。", true);
    return;
  }
  if (!isConfigComplete(state.config)) {
    showSettings();
    updateStatus("配置不完整，请先完成设置。", true);
    return;
  }
  if (countCodePoints(text) > MAX_INPUT_LENGTH) {
    updateStatus(`文本超过 ${MAX_INPUT_LENGTH} 个字符。`, true);
    return;
  }

  clearTimeout(state.completeTimer);
  state.requestId += 1;
  state.activeRequestId = state.requestId;
  state.running = true;
  state.lastRequestText = text;
  state.lastSourceLanguage = "";
  setRunningState();
  setOutput("");
  updateDetectedLanguage();
  updateStatus("正在翻译...");

  postToWorker({
    type: "translate",
    sessionId: state.sessionId,
    requestId: state.activeRequestId,
    config: state.config,
    text,
  });
}

function stopActiveRequest(statusMessage) {
  if (!state.running) return;

  state.activeRequestId += 1;
  postToWorker({
    type: "stop",
    sessionId: state.sessionId,
    requestId: state.activeRequestId,
  });
  state.running = false;
  setRunningState();
  updateStatus(statusMessage);
}

function setRunningState() {
  animateLabel(elements.primaryButtonLabel, state.running ? "停止" : "翻译");
  elements.output.setAttribute("aria-busy", String(state.running));
  elements.primaryButton.setAttribute("aria-label", state.running ? "停止翻译" : "开始翻译");
  elements.retryButton.disabled = state.running || !state.lastRequestText;
  elements.copyButton.disabled = !elements.output.textContent;
  document.body.classList.toggle("request-running", state.running);
  updateAutoModeHint();
  updateSwapState();
}

function handleInput() {
  updateCharCount();
  if (state.composing) return;

  if (state.running) {
    stopActiveRequest("已取消进行中的请求。");
  }
  scheduleAutoTranslate();
}

function scheduleAutoTranslate() {
  if (state.debounceTimer) clearTimeout(state.debounceTimer);
  elements.autoModeHint?.classList.remove("is-waiting");
  if (!state.config?.autoTranslate) return;

  const text = elements.input.value;
  if (!text.trim() || countCodePoints(text) > MAX_INPUT_LENGTH) return;
  if (!isConfigComplete(state.config)) {
    updateStatus("配置不完整，请先完成设置。", true);
    return;
  }

  elements.autoModeHint?.classList.add("is-waiting");
  state.debounceTimer = setTimeout(() => {
    elements.autoModeHint?.classList.remove("is-waiting");
    if (!state.running) startTranslation();
  }, 1000);
}

function updateCharCount() {
  const length = countCodePoints(elements.input.value);
  const overLimit = length > MAX_INPUT_LENGTH;
  elements.charCount.textContent = overLimit
    ? `超出 ${length - MAX_INPUT_LENGTH} 字，请删减`
    : `${length} / ${MAX_INPUT_LENGTH}`;
  elements.input.setAttribute("aria-invalid", String(overLimit));
  elements.charCount.classList.toggle("near-limit", length >= 4500 && length <= MAX_INPUT_LENGTH);
  elements.charCount.classList.toggle("over-limit", length > MAX_INPUT_LENGTH);
  elements.clearInputButton.hidden = length === 0;
  document.body.classList.toggle("has-input", length > 0);
  elements.primaryButton.disabled = length > MAX_INPUT_LENGTH;
}

function setOutput(value) {
  elements.output.textContent = value;
  elements.copyButton.disabled = !value;
  document.body.classList.toggle("has-output", Boolean(value));
  updateSwapState();
  scheduleSessionSave();
}

async function copyOutput() {
  const text = elements.output.textContent;
  if (!text) {
    updateStatus("暂无可复制的译文。", true);
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    elements.copyButtonLabel.textContent = "已复制";
    elements.copyButton.classList.add("is-copied");
    clearTimeout(state.copyTimer);
    state.copyTimer = setTimeout(() => {
      elements.copyButtonLabel.textContent = "复制";
      elements.copyButton.classList.remove("is-copied");
    }, 1500);
    updateStatus("已复制译文。");
  } catch {
    updateStatus("复制失败，请手动选择译文复制。", true);
  }
}

async function ensureClipboardPermission() {
  if (!globalThis.chrome?.permissions?.request) return true;
  try {
    const has = await chrome.permissions.contains({ permissions: ["clipboardRead"] });
    if (has) return true;
    return await chrome.permissions.request({ permissions: ["clipboardRead"] });
  } catch {
    return false;
  }
}

async function pasteInput() {
  elements.input.focus();
  const pasteKey = /mac/i.test(navigator.platform || navigator.userAgent) ? "⌘+V" : "Ctrl+V";
  try {
    const hasPermission = await ensureClipboardPermission();
    if (!hasPermission) {
      updateStatus(`需要剪贴板授权，或直接按 ${pasteKey} 粘贴。`, true);
      return;
    }
    const text = await navigator.clipboard.readText();
    if (!text) {
      updateStatus("剪贴板中没有可粘贴的文本。");
      return;
    }
    elements.input.value = text;
    handleInput();
    scheduleSessionSave();
    elements.input.focus();
    updateStatus("已从剪贴板粘贴。");
  } catch {
    elements.input.focus();
    updateStatus(`无法直接读取剪贴板，请按 ${pasteKey} 粘贴。`, true);
  }
}

function selectThemeChoice(value, preview, event) {
  const choice = THEME_ORDER.includes(value) ? value : "system";
  elements.theme.value = choice;
  elements.themeControl.style.setProperty("--selected-index", THEME_ORDER.indexOf(choice));
  for (const button of elements.themeControl.querySelectorAll("[data-theme-choice]")) {
    const selected = button.dataset.themeChoice === choice;
    button.setAttribute("aria-checked", String(selected));
    button.tabIndex = selected ? 0 : -1;
  }
  if (preview) {
    if (state.config) {
      state.config.theme = choice;
      void saveConfig(state.config);
    }
    const trigger = event ?? elements.themeControl.querySelector(`[data-theme-choice="${choice}"]`);
    transitionTheme(choice, trigger);
  }
}

function handleThemeChoiceKeydown(event) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const buttons = [...elements.themeControl.querySelectorAll("[data-theme-choice]")];
  const currentIndex = buttons.indexOf(event.currentTarget);
  const nextIndex = event.key === "Home"
    ? 0
    : event.key === "End"
      ? buttons.length - 1
      : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length;
  buttons[nextIndex].focus();
  buttons[nextIndex].click();
}

function selectColorPreset(value, preview) {
  const choice = COLOR_PRESET_ORDER.includes(value) ? value : "graphite";
  elements.colorPreset.value = choice;
  for (const button of elements.colorPresetControl.querySelectorAll("[data-color-preset]")) {
    const selected = button.dataset.colorPreset === choice;
    button.setAttribute("aria-checked", String(selected));
    button.tabIndex = selected ? 0 : -1;
  }
  if (preview) {
    if (state.config) {
      state.config.colorPreset = choice;
      void saveConfig(state.config);
    }
    applyColorPreset(choice);
  }
}

function handleColorPresetKeydown(event) {
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const buttons = [...elements.colorPresetControl.querySelectorAll("[data-color-preset]")];
  const currentIndex = buttons.indexOf(event.currentTarget);
  const nextIndex = event.key === "Home"
    ? 0
    : event.key === "End"
      ? buttons.length - 1
      : (currentIndex + (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1) + buttons.length) % buttons.length;
  buttons[nextIndex].focus();
  buttons[nextIndex].click();
}

function applyColorPreset(value) {
  document.body.dataset.colorPreset = COLOR_PRESET_ORDER.includes(value) ? value : "graphite";
}

async function toggleQuickTheme(event) {
  if (!state.config) return;
  const currentTheme = requestedTheme ?? document.body.dataset.theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  state.config.theme = nextTheme;
  selectThemeChoice(nextTheme, false);
  const pending = transitionTheme(nextTheme, event ?? elements.themeToggleButton);
  const revision = themeRevision;
  await pending;
  if (revision === themeRevision) await saveConfig(state.config);
}

let themeSnapshot;
let themeAnimation;
let themeRevision = 0;
let requestedTheme;
async function transitionTheme(targetChoice, trigger) {
  const revision = ++themeRevision;
  requestedTheme = targetChoice;
  workspaceGhost?.remove();
  themeAnimation?.cancel();
  themeSnapshot?.remove();
  if (reducedMotion()) {
    await applyTheme(targetChoice);
    requestedTheme = null;
    return;
  }
  const origin = trigger instanceof HTMLElement ? trigger : trigger?.currentTarget ?? elements.themeToggleButton;
  const rect = origin.getBoundingClientRect();
  const x = trigger?.clientX > 0 ? trigger.clientX : rect.left + rect.width / 2;
  const y = trigger?.clientY > 0 ? trigger.clientY : rect.top + rect.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  // 冻结旧画面的视觉样式；真实页面持续接收触屏、鼠标和键盘操作。
  const shell = document.querySelector(".app-shell");
  const snapshot = shell.cloneNode(true);
  const originals = [shell, ...shell.querySelectorAll("*")];
  const copies = [snapshot, ...snapshot.querySelectorAll("*")];
  const properties = ["display", "position", "box-sizing", "width", "height", "min-width", "min-height", "max-width", "max-height", "padding", "margin", "gap", "flex", "flex-direction", "align-items", "justify-content", "grid-template-columns", "grid-column", "overflow", "color", "background", "border", "border-radius", "box-shadow", "font", "line-height", "letter-spacing", "text-align", "white-space", "fill", "stroke", "opacity", "top", "right", "bottom", "left"];
  originals.forEach((node, index) => {
    const style = getComputedStyle(node);
    properties.forEach(property => copies[index].style.setProperty(property, style.getPropertyValue(property)));
    copies[index].style.setProperty("transition", "none", "important");
    copies[index].style.setProperty("animation", "none", "important");
    copies[index].removeAttribute("id");
    for (const attribute of [...copies[index].attributes]) {
      if (attribute.name.startsWith("data-")) copies[index].removeAttribute(attribute.name);
    }
    if ("value" in node) copies[index].value = node.value;
  });
  const bodyStyle = getComputedStyle(document.body);
  for (const property of bodyStyle) {
    if (property.startsWith("--")) snapshot.style.setProperty(property, bodyStyle.getPropertyValue(property));
  }
  const bounds = shell.getBoundingClientRect();
  Object.assign(snapshot.style, { position: "fixed", left: `${bounds.left}px`, top: `${bounds.top}px`, width: `${bounds.width}px`, height: `${bounds.height}px`, margin: "0", zIndex: "1000", pointerEvents: "none", background: bodyStyle.getPropertyValue("--app-bg") });
  snapshot.classList.add("theme-snapshot");
  snapshot.inert = true;
  snapshot.setAttribute("aria-hidden", "true");
  document.body.append(snapshot);
  originals.forEach((node,index) => { copies[index].scrollTop=node.scrollTop; copies[index].scrollLeft=node.scrollLeft; });
  themeSnapshot = snapshot;
  await applyTheme(targetChoice);
  const cx=x-bounds.left, cy=y-bounds.top;
  const mask = r => `path(evenodd, "M -10000 -10000 H 10000 V 10000 H -10000 Z M ${cx-r} ${cy} a ${r} ${r} 0 1 0 ${2*r} 0 a ${r} ${r} 0 1 0 ${-2*r} 0 Z")`;
  try {
    themeAnimation = snapshot.animate({ clipPath: [mask(.1), mask(radius)] }, { duration: 320, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" });
    await themeAnimation.finished;
  } catch {
    // 连续切换时取消旧动画，由最后一次选择继续显示。
  } finally {
    snapshot.remove();
    if (revision === themeRevision) {
      themeSnapshot = null;
      themeAnimation = null;
      requestedTheme = null;
    }
  }
}

async function applyTheme(previewPreference) {
  const preference = previewPreference ?? state.config?.theme ?? "system";
  const resolved = preference === "system"
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : preference;
  document.body.dataset.theme = resolved;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.classList.toggle("wa-dark", resolved === "dark");
  document.documentElement.classList.toggle("wa-light", resolved !== "dark");
  if (elements.themeToggleButton) {
    elements.themeToggleButton.setAttribute(
      "aria-label",
      resolved === "dark" ? "切换浅色主题" : "切换深色主题",
    );
  }
}

function updateBaseUrlWarning() {
  const value = normalizeBaseUrl(elements.baseUrl.value);
  elements.baseUrlWarning.hidden = !usesPlainHttp(value);
}

function toggleSettings() {
  cancelSyncConfirmation?.();
  const willShowSettings = elements.settings.hidden;
  if (willShowSettings) {
    showSettings();
    elements.provider.focus({ preventScroll: true });
  } else {
    showTranslator();
    elements.input.focus();
  }
}

function showSettings() {
  const firstTime = !isConfigComplete(state.config);
  document.body.classList.add("settings-open");
  switchWorkspace(elements.settings, elements.translator, 1);
  elements.settingsTitle.textContent = firstTime ? "开始连接" : "设置";
  elements.settingsIntro.textContent = firstTime
    ? "连接你自己的模型服务，不创建新账号。"
    : "返回时保留未保存的输入；保存后应用设置。";
  elements.saveSettingsButton.textContent = firstTime ? "保存并开始翻译" : "保存设置";
  if (state.mode !== "options") {
    elements.settingsButton.hidden = firstTime;
    elements.settingsButton.classList.add("is-back");
    elements.settingsButton.setAttribute("aria-label", "返回翻译");
    elements.settingsTooltip.textContent = "返回翻译";
  }
}

function showTranslator() {
  cancelSyncConfirmation?.();
  document.body.classList.remove("settings-open");
  switchWorkspace(elements.translator, elements.settings, -1);
  updateModelShortcut();
  elements.settingsButton.hidden = state.mode === "options";
  elements.settingsButton.classList.remove("is-back");
  elements.settingsButton.setAttribute("aria-label", "打开设置");
  elements.settingsTooltip.textContent = "打开设置";
}

function updateModelShortcut() {
  if (!elements.modelShortcutLabel) return;
  const model = state.config?.model?.trim();
  elements.modelShortcutLabel.textContent = model || "选择模型";
}

function openModelSettings() {
  showSettings();
  elements.model.focus();
}

function selectedQuickSourceLanguage() {
  return normalizeSourceLanguage(elements.quickSourceLanguage.value);
}

function selectedQuickTargetLanguage() {
  if (elements.quickTargetLanguage.value === "custom") {
    return normalizeTargetLanguage(state.config?.targetLanguage) ?? { ...DEFAULT_TARGET_LANGUAGE };
  }
  return LANGUAGE_OPTIONS.find((item) => item.code === elements.quickTargetLanguage.value) ?? { ...DEFAULT_TARGET_LANGUAGE };
}

async function updateQuickLanguages() {
  if (!state.config) return;
  if (state.running) stopActiveRequest("已切换语言，上一条请求已停止。");
  clearTimeout(state.debounceTimer);

  state.config.sourceLanguage = selectedQuickSourceLanguage();
  state.config.targetLanguage = selectedQuickTargetLanguage();
  state.lastSourceLanguage = "";
  setOutput("");
  updateDetectedLanguage();
  updateSwapState();
  await saveConfig(state.config);

  if (!elements.input.value.trim()) {
    updateStatus("语言已更新。");
    return;
  }
  if (state.config.autoTranslate) {
    scheduleAutoTranslate();
  } else {
    updateStatus("语言已更新，点击“翻译”查看结果。");
  }
}

async function swapLanguages() {
  const source = normalizeSourceLanguage(state.config?.sourceLanguage);
  const target = normalizeTargetLanguage(state.config?.targetLanguage);
  if (state.running || source.type !== "preset" || target?.type !== "preset") return;

  state.swapRotation = (state.swapRotation || 0) + 180;
  elements.swapLanguagesButton.style.setProperty("--swap-rotation", `${state.swapRotation}deg`);
  elements.swapLanguagesButton.classList.add("animating");
  setTimeout(() => {
    elements.swapLanguagesButton.classList.remove("animating");
  }, 380);
  const translatedText = elements.output.textContent.trim();
  state.config.sourceLanguage = { ...target };
  state.config.targetLanguage = { ...source };
  state.lastSourceLanguage = "";
  if (translatedText) elements.input.value = translatedText;
  setOutput("");
  updateCharCount();
  updateDetectedLanguage();
  populateQuickLanguageSelectors(state.config.sourceLanguage, state.config.targetLanguage);
  await saveConfig(state.config);

  if (!elements.input.value.trim()) {
    updateStatus("已交换输入和输出语言。");
    return;
  }
  if (state.config.autoTranslate) {
    startTranslation();
  } else {
    updateStatus("已交换语言，点击“翻译”查看结果。");
  }
}

function clearTranslation() {
  clearTimeout(state.debounceTimer);
  elements.autoModeHint?.classList.remove("is-waiting");
  if (state.running) stopActiveRequest("");
  elements.input.value = "";
  state.lastRequestText = "";
  state.lastSourceLanguage = "";
  setOutput("");
  updateCharCount();
  updateDetectedLanguage();
  setRunningState();
  updateStatus("");
  scheduleSessionSave();
  elements.input.focus();
}

function updateAutoModeHint() {
  if (!elements.autoModeHint || !state.config) return;
  elements.autoModeHint.textContent = state.running
    ? "正在翻译…"
    : state.config.autoTranslate
      ? "输入后自动翻译"
      : "自动翻译已关闭";
}

function updateDetectedLanguage() {
  const source = normalizeSourceLanguage(state.config?.sourceLanguage);
  const showDetected = source.type === "auto" && Boolean(state.lastSourceLanguage);
  elements.detectedLanguageBadge.hidden = !showDetected;
  elements.detectedLanguageBadge.textContent = showDetected
    ? `检测到：${formatSourceLanguage(state.lastSourceLanguage)}`
    : "";
}

function updateSwapState() {
  if (!state.config) return;
  const source = normalizeSourceLanguage(state.config.sourceLanguage);
  const target = normalizeTargetLanguage(state.config.targetLanguage);
  elements.swapLanguagesButton.disabled = Boolean(
    state.running ||
    source.type !== "preset" ||
    target?.type !== "preset" ||
    source.code === target.code
  );
}

function updateStatus(message, isError = false) {
  clearTimeout(state.statusTimer);
  elements.status.textContent = message;
  elements.status.classList.toggle("error", isError);
  if (message && !isError && !message.includes("正在")) {
    state.statusTimer = setTimeout(() => {
      if (elements.status.textContent !== message) return;
      elements.status.textContent = "";
      elements.status.classList.remove("error");
      scheduleSessionSave();
    }, isError ? 5000 : 1600);
  }
  scheduleSessionSave();
}

function restoreSessionState() {
  if (!globalThis.chrome?.storage?.session) return Promise.resolve();
  return chrome.storage.session.get(`panel:${state.mode}`).then((result) => {
    const saved = result?.[`panel:${state.mode}`];
    if (!saved) return;

    elements.input.value = typeof saved.input === "string" ? saved.input : "";
    setOutput(typeof saved.output === "string" ? saved.output : "");
    state.lastSourceLanguage = typeof saved.sourceLanguage === "string" ? saved.sourceLanguage : "";
    updateDetectedLanguage();
    state.lastRequestText = typeof saved.lastRequestText === "string" ? saved.lastRequestText : "";
    updateStatus(saved.status || "", Boolean(saved.isError));
    updateCharCount();
    setRunningState();
  }).catch(() => {
    // 会话存储不可用时面板仍可直接使用。
  });
}

function scheduleSessionSave() {
  if (!state.ready || !globalThis.chrome?.storage?.session) return;
  clearTimeout(state.sessionSaveTimer);
  state.sessionSaveTimer = setTimeout(() => {
    chrome.storage.session.set({
      [`panel:${state.mode}`]: {
        sessionId: state.sessionId,
        input: elements.input.value,
        output: elements.output.textContent,
        sourceLanguage: state.lastSourceLanguage,
        status: elements.status.textContent,
        isError: elements.status.classList.contains("error"),
        lastRequestText: state.lastRequestText,
      },
    }).catch((error) => console.error("会话状态保存失败", error));
  }, 150);
}

function updateModeControls() {
  if (state.mode !== "popup") {
    elements.sidePanelButton.hidden = true;
  }
  if (state.mode === "options") {
    elements.settingsButton.hidden = true;
    elements.openOptionsButton.hidden = true;
    document.title = "香菇翻译设置";
  }
  if (state.mode === "popup" && !globalThis.chrome?.sidePanel?.open) {
    elements.sidePanelButton.disabled = true;
    elements.sidePanelTooltip.textContent = "当前浏览器不支持侧边栏";
  }
}

async function openSidePanel() {
  if (!globalThis.chrome?.sidePanel?.open) {
    updateStatus("当前浏览器不支持侧边栏。", true);
    return;
  }

  try {
    const currentWindow = await chrome.windows.getCurrent();
    await chrome.sidePanel.open({ windowId: currentWindow.id });
  } catch {
    updateStatus("打开侧边栏失败。", true);
  }
}

async function openOptionsPage() {
  try {
    await chrome.runtime.openOptionsPage();
  } catch {
    updateStatus("打开页面设置失败。", true);
  }
}

// 同一元素只保留一个动画，重复操作从当前画面继续。
const motionJobs = new WeakMap();
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateLabel(element, text) {
  if (element.textContent === text) return;
  motionJobs.get(element)?.cancel();
  element.textContent = text;
  if (!state.ready || reducedMotion()) return;
  motionJobs.set(element, element.animate([
    { opacity: 0.35, transform: "translateY(5px)" },
    { opacity: 1, transform: "translateY(0)" },
  ], { duration: 180, easing: "ease-out" }));
}

function revealElement(element, visible, expand = false) {
  if (!element) return;
  if (element.dataset.visible === String(visible)) return;
  element.dataset.visible = String(visible);
  const style = getComputedStyle(element);
  const fromOpacity = element.hidden ? 0 : Number(style.opacity);
  const fromHeight = element.hidden ? 0 : element.getBoundingClientRect().height;
  const fromTransform = element.hidden ? "translateY(-6px)" : style.transform;
  motionJobs.get(element)?.cancel();
  element.hidden = false;
  element.inert = !visible;
  if (!state.ready || reducedMotion()) {
    element.hidden = !visible;
    return;
  }
  const frames = expand
    ? [{ height: `${fromHeight}px`, opacity: fromOpacity }, { height: visible ? `${element.scrollHeight}px` : "0px", opacity: visible ? 1 : 0 }]
    : [{ opacity: fromOpacity, transform: fromTransform }, { opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(-6px)" }];
  const animation = element.animate(frames, { duration: expand ? 280 : 220, easing: "cubic-bezier(.2,.8,.2,1)" });
  motionJobs.set(element, animation);
  animation.onfinish = () => {
    if (motionJobs.get(element) !== animation) return;
    element.hidden = !visible;
    motionJobs.delete(element);
  };
}

let workspaceGhost;
function switchWorkspace(incoming, outgoing, direction) {
  if (!incoming.hidden) return;
  themeSnapshot?.remove();
  themeAnimation?.cancel();
  const previousGhostStyle = workspaceGhost?.isConnected && workspaceGhost.dataset.workspace === incoming.id
    ? getComputedStyle(workspaceGhost) : null;
  const incomingStart = previousGhostStyle
    ? { opacity: previousGhostStyle.opacity, transform: previousGhostStyle.transform }
    : { opacity: 0, transform: `translateX(${direction * 14}px)` };
  const outgoingStyle = getComputedStyle(outgoing);
  const outgoingStart = { opacity: outgoingStyle.opacity, transform: outgoingStyle.transform };
  workspaceGhost?.remove();
  motionJobs.get(incoming)?.cancel();
  if (state.ready && !reducedMotion() && !outgoing.hidden) {
    const rect = outgoing.getBoundingClientRect();
    workspaceGhost = outgoing.cloneNode(true);
    workspaceGhost.dataset.workspace = outgoing.id;
    workspaceGhost.removeAttribute("id");
    workspaceGhost.querySelectorAll("[id]").forEach(node => node.removeAttribute("id"));
    workspaceGhost.inert = true;
    workspaceGhost.setAttribute("aria-hidden", "true");
    workspaceGhost.classList.add("workspace-ghost");
    Object.assign(workspaceGhost.style, { position: "fixed", left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`, margin: "0", zIndex: "5", pointerEvents: "none", overflow: "hidden" });
    document.body.append(workspaceGhost);
    workspaceGhost.scrollTop = outgoing.scrollTop;
    const ghost = workspaceGhost;
    ghost.animate([outgoingStart, { opacity: 0, transform: `translateX(${-direction * 14}px)` }], { duration: 220, easing: "ease-out" }).onfinish = () => ghost.remove();
  }
  outgoing.dataset.scrollTop = outgoing.scrollTop;
  outgoing.hidden = true;
  incoming.hidden = false;
  incoming.scrollTop = Number(incoming.dataset.scrollTop || 0);
  if (state.ready && !reducedMotion()) {
    motionJobs.set(incoming, incoming.animate([incomingStart, { opacity: 1, transform: "translateX(0)" }], { duration: 240, easing: "cubic-bezier(.2,.8,.2,1)" }));
  }
}

function initializeMotion() {
  window.addEventListener("offline", () => updateStatus("网络已断开。原文已保留，连接恢复后可重新翻译。", true));
  window.addEventListener("online", () => updateStatus("网络已恢复，可重新翻译。"));
  if (!navigator.onLine) updateStatus("网络已断开，连接恢复后可翻译。", true);
}

let cancelSyncConfirmation;
function confirmSyncTransfer(direction) {
  if (state.settingsBusy) return Promise.resolve(false);
  cancelSyncConfirmation?.();
  const panel = document.getElementById("syncConfirmation");
  const confirm = document.getElementById("confirmSyncButton");
  const cancel = document.getElementById("cancelSyncButton");
  const trigger = direction === "upload" ? elements.uploadWebDavButton : elements.downloadWebDavButton;
  document.getElementById("syncConfirmationText").textContent = direction === "upload"
    ? "将用本机已保存的设置覆盖远端文件。此操作无法撤销。"
    : "将用远端设置替换本机设置和当前设置草稿。此操作无法撤销。";
  confirm.textContent = direction === "upload" ? "确认上传覆盖" : "确认下载替换";
  revealElement(panel, true, true);
  cancel.focus({ preventScroll: true });
  panel.scrollIntoView({ block: "nearest" });
  return new Promise(resolve => {
    const finish = accepted => {
      confirm.removeEventListener("click", accept);
      cancel.removeEventListener("click", reject);
      panel.removeEventListener("keydown", escape);
      cancelSyncConfirmation = null;
      revealElement(panel, false, true);
      trigger.focus({ preventScroll: true });
      resolve(accepted);
    };
    const accept = () => finish(true);
    const reject = () => finish(false);
    const escape = event => { if (event.key === "Escape") { event.preventDefault(); reject(); } };
    cancelSyncConfirmation = reject;
    confirm.addEventListener("click", accept);
    cancel.addEventListener("click", reject);
    panel.addEventListener("keydown", escape);
  });
}
