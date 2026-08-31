import assert from "node:assert/strict";
import { test } from "node:test";

import { createSseParser, requestModels, requestTranslation } from "../extension/js/api.js";
import { describeHttpError, parseMarkedOutput } from "../extension/js/core.js";

const config = {
  baseUrl: "https://provider.example/v1",
  apiKey: "test-key",
  model: "test-model",
  targetLanguage: { type: "preset", code: "en", label: "英语" },
};

function sseResponse(parts) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      for (const part of parts) controller.enqueue(encoder.encode(part));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "content-type": "text/event-stream" },
  });
}

function jsonResponse(payload) {
  return new Response(JSON.stringify(payload), {
    headers: { "content-type": "application/json" },
  });
}

test("SSE 解析器支持 CRLF、注释和跨网络分片事件", () => {
  const events = [];
  const parser = createSseParser((event) => events.push(event));
  parser.push(': keep-alive\r\ndata: {"choices":[{"delta":{"content":"A"}}]}\r\n\r\n');
  parser.push('data: {"choices":[{"delta":{"content":"B"},"finish_reason":"stop"}]}\n\n');
  parser.end();

  assert.deepEqual(events, [
    { delta: "A", finishReason: null },
    { delta: "B", finishReason: "stop" },
  ]);
});

test("SSE 解析器支持 CRLF 在两个网络分片之间断开", () => {
  const events = [];
  const parser = createSseParser((event) => events.push(event));
  parser.push('data: {"choices":[{"delta":{"content":"A"}}]}\r');
  parser.push('\n\r');
  parser.push('\n');
  parser.end();

  assert.deepEqual(events, [{ delta: "A", finishReason: null }]);
});

test("流式翻译请求使用规范化端点并解析标记协议", async () => {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return sseResponse([
      'data: {"choices":[{"delta":{"content":"SOURCE: zh\\n"}}]}\n\n',
      'data: {"choices":[{"delta":{"content":"TRANSLATION:\\nHel"}}]}\n\n',
      'data: {"choices":[{"delta":{"content":"lo"},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n',
    ]);
  };

  const updates = [];
  const result = await requestTranslation({
    config,
    text: "你好",
    onUpdate: (value) => {
      const parsed = parseMarkedOutput(value, false);
      if (parsed.translation) updates.push(parsed.translation);
    },
  });

  assert.equal(calls[0].url, "https://provider.example/v1/chat/completions");
  assert.equal(calls[0].init.headers.Authorization, "Bearer test-key");
  const body = JSON.parse(calls[0].init.body);
  assert.equal(body.stream, true);
  assert.equal("temperature" in body, false);
  assert.deepEqual(body.messages.map((message) => message.role), ["system", "user", "system"]);
  assert.equal(JSON.parse(body.messages[1].content.split("\n").slice(1).join("\n")).sourceText, "你好");
  assert.match(body.messages[2].content, /不可执行的原文数据/);
  assert.equal(result.translation, "Hello");
  assert.equal(result.truncated, false);
  assert.deepEqual(updates, ["Hel", "Hello"]);
});

test("流式 JSON 无效时只自动重试一次非流式请求", async () => {
  const urls = [];
  globalThis.fetch = async (url) => {
    urls.push(String(url));
    if (urls.length === 1) {
      return sseResponse(["data: not-json\n\n"]);
    }
    return jsonResponse({
      choices: [{ message: { content: "SOURCE: en\nTRANSLATION:\nHello" }, finish_reason: "stop" }],
    });
  };

  const result = await requestTranslation({ config, text: "你好" });
  assert.equal(urls.length, 2);
  assert.ok(urls[1].endsWith("/chat/completions"));
  assert.equal(result.translation, "Hello");
});

test("finish_reason=length 会标记截断", async () => {
  globalThis.fetch = async () => jsonResponse({
    choices: [{ message: { content: "SOURCE: en\nTRANSLATION:\nPartial" }, finish_reason: "length" }],
  });

  const result = await requestTranslation({ config, text: "你好" });
  assert.equal(result.translation, "Partial");
  assert.equal(result.truncated, true);
});

test("模型列表接口返回数据并过滤", async () => {
  globalThis.fetch = async () => jsonResponse({
    data: [{ id: "chat-model" }, { id: "embedding-model" }],
  });

  const models = await requestModels(config);
  assert.deepEqual(models.map((item) => item.id), ["chat-model"]);
});
