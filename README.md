# 香菇翻译

香菇翻译是一款 Chrome / Edge 输入式翻译扩展。v0.4 在 Google 翻译式交互上引入本地 Web Awesome 组件体系，使用可访问的下拉菜单、按钮、开关和 Tooltip，并重新设计为中性画布、绿色输入端与紫色译文端。扩展不读取网页、不注入脚本，也不保存持久翻译历史；你输入的文本只会发送到自己配置的 OpenAI-compatible 服务商。

## 项目状态

- 当前版本：`0.4.0`
- 扩展类型：Manifest V3 浏览器扩展
- 支持浏览器：Chrome / Edge 114 及以上
- 翻译协议：OpenAI-compatible Chat Completions，支持流式和非流式响应
- 默认开发入口：`extension/`

本项目没有常驻开发服务器。HTML、CSS 和业务 JavaScript 直接由扩展加载；只有 Web Awesome 组件需要通过 esbuild 生成本地 bundle。因此修改 `tools/` 或 Web Awesome 依赖后，需要重新执行一次 `npm run build`，修改普通页面代码后直接在浏览器扩展页点击“重新加载”即可。

## 环境要求

日常开发和构建只需要：

- Node.js 20 或更高版本
- npm 10 或更高版本
- Chrome / Edge 114 或更高版本（用于加载和调试扩展）

浏览器冒烟测试是可选项，还需要：

- Python 3.10 或更高版本
- Python Playwright
- Playwright 管理的 Chromium 浏览器

## 获取代码并安装依赖

在项目根目录执行：

```powershell
npm install
```

如果仓库提供了 `package-lock.json`，持续集成或需要严格复现依赖时使用：

```powershell
npm ci
```

安装依赖后先构建一次本地 Web Awesome 资源：

```powershell
npm run build
```

## 本地开发与加载

1. 执行 `npm run build`，确认 `extension/vendor/` 下已经生成 `webawesome.js` 和 `webawesome.css`。
2. 打开 Chrome 的 `chrome://extensions/`，或 Edge 的 `edge://extensions/`。
3. 开启“开发者模式 / 开发人员模式”。
4. 点击“加载已解压的扩展程序 / 加载解压缩的扩展”，选择本项目的 `extension/` 目录。
5. 修改代码后，在扩展管理页点击扩展卡片上的“重新加载”，再重新打开 Popup 或 Side Panel。

开发时建议加载 `extension/` 源码目录；`香菇翻译-extension/` 是打包脚本生成的交付副本，适合发送给其他人测试。若修改了 Web Awesome 依赖、`tools/build-ui.mjs` 或 `tools/webawesome-entry.js`，必须重新执行 `npm run build`。

## 直接安装

### Chrome

1. 打开 `chrome://extensions/`。
2. 开启右上角“开发者模式”。
3. 点击“加载已解压的扩展程序”。
4. 选择本项目的 `香菇翻译-extension` 成品目录；开发时也可以选择 `extension`。
5. 点击工具栏中的“香菇翻译”图标开始配置。

### Edge

1. 打开 `edge://extensions/`。
2. 开启“开发人员模式”。
3. 点击“加载解压缩的扩展”。
4. 选择本项目的 `香菇翻译-extension` 成品目录。

`香菇翻译-extension.zip` 用于分发和备份，浏览器不能直接加载 ZIP；请先解压，再选择包含 `manifest.json` 的目录。

## CRX 安装说明

项目同时提供签名文件 `香菇翻译.crx`。可以在 Edge 或支持本地 CRX 的 Chromium 环境中打开扩展管理页、启用开发人员模式后尝试拖入该文件。

需要注意：Chrome 在 Windows 和 macOS 上通常会阻止未通过 Chrome Web Store 或企业策略分发的 CRX，生成 CRX 不能绕过该安全限制。如果拖拽被拒绝，请使用上面的“加载已解压的扩展程序”方式；这是本项目在普通 Windows 电脑上的可靠安装方式。

重新生成 CRX：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools\package-crx.ps1
```

首次打包会把签名私钥保存到 `.signing/xianggu-translate.pem`。后续版本必须继续使用这份私钥，才能保持相同扩展 ID；私钥不得随 CRX 或 ZIP 分发。

## 首次配置

1. 选择 OpenAI、DeepSeek、Kimi、智谱、Ollama 或自定义服务商。
2. 填写 API Key；Ollama 和不要求鉴权的自定义服务可留空。
3. 点击“获取模型”，或手动填写模型名。
4. 选择目标语言，点击“测试翻译”确认真实调用可用。
5. 保存设置并开始翻译。

模型列表接口在不同服务商之间并不完全一致。获取失败时可直接手动填写模型名，是否可用以“测试翻译”的结果为准。

## 使用方式

- 在主界面顶部直接选择输入语言和输出语言；输入语言可选“自动检测”。
- 手动选择两端内置语言后可点击中间交换按钮；已有译文时会把译文带回原文区进行反向翻译。
- 原文右上角的清空按钮会同时清除原文、译文和检测状态。
- 停止输入约 1 秒后自动翻译，可关闭“自动翻译”。
- `Ctrl+Enter` 或 macOS 的 `Cmd+Enter` 立即翻译。
- `Shift+Enter` 在输入框中换行。
- 翻译进行中可点击“停止”。
- “重译”会使用上一次实际发出的原文，不会读取随后修改的输入框。
- Popup 中点击“侧边栏”可在支持 Chrome Side Panel 的浏览器中连续使用。

## 隐私与权限

- `storage`：保存本地配置，并在浏览器会话内恢复当前草稿和最近结果。
- `sidePanel`：打开浏览器侧边栏。
- 内置服务商域名拥有固定网络权限；自定义地址只在保存或测试时请求对应 origin 的可选权限。
- API Key 保存在 `chrome.storage.local`，不会同步到插件作者服务器，但仍属于本机浏览器配置中的敏感信息。
- 扩展不申请 `tabs`、`activeTab`、`scripting` 或网页全量读取权限。

## 本地验证

构建本地组件：

```powershell
npm run build
```

运行单元与静态完整性测试：

```powershell
npm test
```

首次运行浏览器冒烟测试前，安装 Python Playwright 及其 Chromium：

```powershell
python -m pip install playwright
python -m playwright install chromium
```

然后运行带本地 Mock 服务的 Chromium 冒烟测试：

```powershell
python tools/browser-smoke.py
```

冒烟测试覆盖首次配置、手动与自动翻译、流式中间态、停止、复制、重译快照、模型列表、测试翻译、会话恢复、目标语言入口、主题、工作区显隐，以及 Popup、Side Panel、Options 多尺寸布局。最新界面截图写入 `artifacts/`。脚本当前使用 Playwright 安装目录中的 Chromium；如果本机安装的浏览器版本目录与脚本中的路径不一致，需要在 `tools/browser-smoke.py` 中更新 `CHROMIUM` 路径，或改用项目约定的 Chromium 版本。

## 打包与发布

### 生成 ZIP 分发包

在项目根目录执行：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools\package.ps1
```

脚本会先执行 `npm run build:ui`，再用 `extension/` 重建 `香菇翻译-extension/`，并生成 `香菇翻译-extension.zip`。ZIP 只能作为分发包，浏览器加载前需要先解压到一个目录，再选择其中包含 `manifest.json` 的目录。

### 生成 CRX

在安装了 Chrome 或 Edge 的 Windows 环境中执行：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools\package-crx.ps1
```

脚本会自动寻找本机 Chrome、Edge 或 Playwright Chromium，先构建 UI，再输出 `香菇翻译.crx`。首次打包会在 `.signing/xianggu-translate.pem` 创建签名私钥；后续版本必须继续使用同一份私钥，才能保持相同扩展 ID。私钥只用于本地签名，禁止提交到仓库或发送给其他人。

Chrome 在 Windows 和 macOS 上通常会阻止未通过 Chrome Web Store 或企业策略分发的 CRX。若拖入 CRX 被拒绝，请使用“加载已解压的扩展程序”，或分发 ZIP 后让使用者自行解压加载。

### 发布前检查

建议按下面顺序执行：

```powershell
npm ci
npm run build
npm test
powershell -NoProfile -ExecutionPolicy Bypass -File tools\package.ps1
```

确认 `extension/manifest.json` 中的版本号、权限和服务商地址符合本次发布内容，再在全新浏览器配置文件中加载 `extension/` 或解压后的交付目录，完成一次首次配置和实际翻译验证。发布 CRX 时还要确认使用的是原有 `.signing/xianggu-translate.pem`。

## 常见问题

### 修改后页面没有变化

先确认是否重新加载了扩展；如果改动涉及 Web Awesome 组件或构建脚本，再执行 `npm run build` 后重新加载。浏览器可能保留旧的 Popup 页面，关闭后重新点击扩展图标即可。

### “获取模型”失败

确认 Base URL 是服务商的 OpenAI-compatible 根地址（通常以 `/v1` 结尾），API Key 和模型名正确，并检查扩展管理页是否允许了对应的可选网络权限。模型列表格式并不统一，获取失败时可以手动填写模型名，再用“测试翻译”验证。

### Ollama 无法连接

确认 Ollama 正在运行，并使用 `http://localhost:11434/v1` 或 `http://127.0.0.1:11434/v1`。如果服务绑定了其他地址，请在设置页填写实际地址并授予该地址的可选权限。

### 冒烟测试找不到 Chromium

先执行 `python -m playwright install chromium`。如果 Playwright 的 Chromium 版本目录不是脚本当前配置的目录，更新 `tools/browser-smoke.py` 顶部的 `CHROMIUM` 常量后再次运行。

### 如何清理构建结果

`npm run build` 只会覆盖 `extension/vendor/` 下的本地组件文件；ZIP、CRX 和交付目录由各自的打包脚本覆盖生成。不要删除 `.signing/`，否则后续 CRX 会得到新的扩展 ID。

## 交付目录

- `extension/`：浏览器可直接加载的成品。
- `香菇翻译-extension/`：由打包脚本重建、适合直接发送给用户的成品目录。
- `香菇翻译-extension.zip`：与 `extension/` 内容一致的分发包。
- `香菇翻译.crx`：使用本地私钥签名的 CRX 包，实际安装能力受浏览器平台和策略限制。
- `香菇翻译-PRD.md`：修订后的产品与验收基线。
- `tests/`：核心逻辑和静态完整性测试。
- `tools/`：图标生成、浏览器冒烟和打包辅助工具。

## 当前边界

v0.4 是输入式翻译工具，不包含整页翻译、划词翻译、网页输入框回填、翻译历史、云同步或 Firefox / Safari 支持。
