# Bug Report

## Symptom

Codex 启动时提示：

`MCP client for pencil failed to start: MCP startup failed: 系统找不到指定的路径。 (os error 3)`

## Impact

`pencil` MCP 无法启动，Codex 内不可用；其余 MCP 启动不受影响。

## Environment

- Windows
- Codex CLI 0.153.4
- Config: `C:\Users\jhlw\.codex\config.toml`
- Expected server: Pencil VS Code extension bundled MCP binary
