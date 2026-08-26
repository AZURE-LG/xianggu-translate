import {
  buildSystemPrompt,
  describeHttpError,
  filterChatModels,
  parseMarkedOutput,
} from "./core.js";

export class ProtocolError extends Error {
  constructor(message) {
    super(message);
    this.name = "ProtocolError";
  }
}

export function createSseParser(onEvent) {
  let buffer = "";
  let pendingCarriageReturn = false;

  function normalizeChunk(value, final = false) {
    let text = `${pendingCarriageReturn ? "\r" : ""}${String(value ?? "")}`;
    pendingCarriageReturn = false;
    if (!final && text.endsWith("\r")) {
      pendingCarriageReturn = true;
      text = text.slice(0, -1);
    }
    return text.replace(/\r\n?/g, "\n");
  }

  function dispatch(rawEvent) {
    const dataLines = [];
    for (const line of rawEvent.split("\n")) {
      if (!line || line.startsWith(":")) continue;
      if (line.startsWith("data:")) {
        dataLines.push(line.slice(5).replace(/^ /, ""));
      }
    }

    if (!dataLines.length) return;
    const data = dataLines.join("\n");
    if (data === "[DONE]") return;

    let payload;
    try {
      payload = JSON.parse(data);
    } catch {
      throw new ProtocolError("模型流式返回的 JSON 无效。");
    }

    if (payload?.error) {
      const detail = typeof payload.error === "string"
        ? payload.error
        : payload.error.message ?? "";
      throw new ProtocolError(detail || "服务商在流式响应中返回错误。");
    }

    const choice = payload?.choices?.[0];
    const delta = choice?.delta?.content ??
      choice?.message?.content ??
      choice?.text ??
      "";
    onEvent({
      delta: typeof delta === "string" ? delta : "",
      finishReason: choice?.finish_reason ?? null,
    });
  }

  return {
    push(chunk) {
      buffer += normalizeChunk(chunk);
      let boundary = buffer.match(/\n{2,}/);
      while (boundary) {
        const event = buffer.slice(0, boundary.index);
        buffer = buffer.slice(boundary.index + boundary[0].length);
        dispatch(event);
        boundary = buffer.match(/\n{2,}/);
      }
    },
    end() {
      buffer += normalizeChunk("", true);
      if (buffer.trim()) dispatch(buffer);
      buffer = "";
    },
  };
}

async function readErrorMessage(response) {
  try {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch {
    return null;
  }
}

async function throwHttpError(response) {
  const payload = await readErrorMessage(response);
  const error = new Error(describeHttpError(response.status, payload));
  error.status = response.status;
  throw error;
}

function authHeaders(apiKey) {
  return apiKey ? { Authorization: `Bearer ${apiKey}` } : {};
}

export async function requestModels(config, signal) {
  const endpoint = `${config.baseUrl}/models`;
  const response = await fetch(endpoint, {
    headers: authHeaders(config.apiKey),
    signal,
  });
  if (!response.ok) await throwHttpError(response);

  const payload = await response.json();
  const models = Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload?.models)
      ? payload.models
      : [];
  return filterChatModels(models);
}

function requestBody(config, text, stream) {
  return JSON.stringify({
    model: config.model,
    messages: [
      { role: "system", content: buildSystemPrompt(config.targetLanguage, config.sourceLanguage) },
      { role: "user", content: text },
    ],
    stream,
  });
}

async function parseJsonCompletion(response, onUpdate) {
  const payload = await response.json();
  const choice = payload?.choices?.[0];
  const content = choice?.message?.content ?? choice?.text ?? "";
  if (typeof content !== "string") {
    throw new ProtocolError("模型返回的内容类型无效。");
  }
  onUpdate?.(content);
  return {
    content,
    finishReason: choice?.finish_reason ?? null,
  };
}

async function parseStreamCompletion(response, onUpdate, onFirstByte) {
  const reader = response.body?.getReader();
  if (!reader) throw new ProtocolError("当前服务商不支持流式返回。");

  const decoder = new TextDecoder();
  const parser = createSseParser(({ delta, finishReason }) => {
    if (delta) accumulated += delta;
    if (finishReason) resultFinishReason = finishReason;
    onUpdate?.(accumulated);
  });

  let accumulated = "";
  let resultFinishReason = null;
  let firstByteSeen = false;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (!firstByteSeen) {
      firstByteSeen = true;
      onFirstByte?.();
    }
    parser.push(decoder.decode(value, { stream: true }));
  }

  parser.push(decoder.decode());
  parser.end();
  return { content: accumulated, finishReason: resultFinishReason };
}

export async function requestChatCompletion({
  config,
  text,
  stream,
  signal,
  onUpdate,
  onFirstByte,
}) {
  const endpoint = `${config.baseUrl}/chat/completions`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(config.apiKey),
    },
    body: requestBody(config, text, stream),
    signal,
  });
  if (!response.ok) await throwHttpError(response);

  const contentType = response.headers.get("content-type") ?? "";
  if (stream && contentType.includes("text/event-stream")) {
    return parseStreamCompletion(response, onUpdate, onFirstByte);
  }

  onFirstByte?.();
  return parseJsonCompletion(response, onUpdate);
}

function isUsableResult(result) {
  return Boolean(result.translation) && !result.retryable;
}

export async function requestTranslation({
  config,
  text,
  signal,
  onUpdate,
  onFirstByte,
}) {
  let streamResult = null;
  let streamFailed = false;

  try {
    const completion = await requestChatCompletion({
      config,
      text,
      stream: true,
      signal,
      onUpdate,
      onFirstByte,
    });
    streamResult = parseMarkedOutput(completion.content, true);
    streamResult.truncated = completion.finishReason === "length";
    if (isUsableResult(streamResult)) return streamResult;
    if (streamResult.translation && !streamResult.retryable) return streamResult;
  } catch (error) {
    if (error?.name === "AbortError") throw error;
    if (!(error instanceof ProtocolError)) throw error;
    streamFailed = true;
  }

  if (signal?.aborted) throw new DOMException("请求已停止", "AbortError");

  const completion = await requestChatCompletion({
    config,
    text,
    stream: false,
    signal,
  });
  const result = parseMarkedOutput(completion.content, true);
  result.truncated = completion.finishReason === "length";
  if (!isUsableResult(result)) {
    throw new ProtocolError(streamFailed
      ? "模型流式与非流式响应都无法解析。"
      : "模型没有返回可用译文。");
  }
  return result;
}

export async function requestTestTranslation(config, signal) {
  const completion = await requestChatCompletion({
    config,
    text: "你好，请翻译这一句。",
    stream: false,
    signal,
  });
  const result = parseMarkedOutput(completion.content, true);
  if (!result.translation) {
    throw new ProtocolError("连接成功，但模型没有返回译文。");
  }
  return result;
}
