import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildSystemPrompt,
  countCodePoints,
  describeHttpError,
  filterChatModels,
  formatSourceLanguage,
  normalizeBaseUrl,
  normalizeSourceLanguage,
  normalizeTargetLanguage,
  parseMarkedOutput,
} from "../extension/js/core.js";

test("Base URL 会规范化路径并移除末尾斜杠", () => {
  assert.equal(normalizeBaseUrl("https://api.example.com/v1/"), "https://api.example.com/v1");
});

test("Base URL 拒绝凭据、查询参数、hash 和公网 HTTP", () => {
  assert.equal(normalizeBaseUrl("https://user:pass@api.example.com/v1"), "");
  assert.equal(normalizeBaseUrl("https://api.example.com/v1?key=1"), "");
  assert.equal(normalizeBaseUrl("https://api.example.com/v1#frag"), "");
  assert.equal(normalizeBaseUrl("http://api.example.com/v1"), "");
});

test("Base URL 允许回环和私有网段 HTTP", () => {
  assert.equal(normalizeBaseUrl("http://localhost:11434/v1"), "http://localhost:11434/v1");
  assert.equal(normalizeBaseUrl("http://127.0.0.1:11434/v1"), "http://127.0.0.1:11434/v1");
  assert.equal(normalizeBaseUrl("http://192.168.1.10:8000/v1"), "http://192.168.1.10:8000/v1");
});

test("字符计数使用 Unicode 码点", () => {
  assert.equal(countCodePoints("👍a"), 2);
});

test("旧版字符串目标语言会迁移", () => {
  assert.deepEqual(normalizeTargetLanguage("英语"), { type: "preset", code: "en", label: "英语" });
  assert.deepEqual(normalizeTargetLanguage("商务英语"), { type: "custom", label: "商务英语" });
});

test("源语言支持自动检测和手动选择", () => {
  assert.deepEqual(normalizeSourceLanguage(undefined), { type: "auto", code: "auto", label: "自动检测" });
  assert.deepEqual(normalizeSourceLanguage("ja"), { type: "preset", code: "ja", label: "日语" });
  assert.match(buildSystemPrompt({ type: "preset", code: "zh", label: "中文" }, { type: "preset", code: "en", label: "英语" }), /源语言是英语（en）/);
});

test("标记协议支持 CRLF 并保留内部段落结构", () => {
  const parsed = parseMarkedOutput("SOURCE: zh-CN\r\nTRANSLATION:\r\n第一段\r\n\r\n第二段  ");
  assert.equal(parsed.sourceLanguage, "zh-CN");
  assert.equal(parsed.translation, "第一段\r\n\r\n第二段");
  assert.equal(formatSourceLanguage(parsed.sourceLanguage), "中文");
});

test("完整 Markdown 包裹和非标准纯文本可降级解析", () => {
  const fenced = parseMarkedOutput("```text\nSOURCE: en\nTRANSLATION:\nHello\n```");
  assert.equal(fenced.translation, "Hello");

  const plain = parseMarkedOutput("  Hello world  ");
  assert.equal(plain.fallback, true);
  assert.equal(plain.translation, "Hello world");
});

test("空内容和无效结构化 JSON 标记为可重试", () => {
  assert.equal(parseMarkedOutput("", true).retryable, true);
  assert.equal(parseMarkedOutput("{bad-json}", true).retryable, true);
  assert.equal(parseMarkedOutput("SOURCE: en", true).retryable, true);
});

test("有效 JSON 输出可以解析", () => {
  const parsed = parseMarkedOutput('{"sourceLanguage":"ja","translation":"こんにちは"}');
  assert.equal(parsed.sourceLanguage, "ja");
  assert.equal(parsed.translation, "こんにちは");
});

test("模型列表会过滤疑似非 Chat 模型", () => {
  const models = filterChatModels([
    { id: "gpt-mini" },
    { id: "text-embedding-3" },
    { name: "whisper-large" },
    "rerank-v1",
    { id: "" },
  ]);
  assert.deepEqual(models.map((item) => item.id), ["gpt-mini"]);
});

test("HTTP 错误详情会脱敏", () => {
  const message = describeHttpError(401, {
    error: { message: 'Bearer abcdefghijklm <script>alert(1)</script>' },
  });
  assert.match(message, /鉴权失败/);
  assert.match(message, /<已隐藏>/);
  assert.doesNotMatch(message, /abcdefghijklm|script/);
});
