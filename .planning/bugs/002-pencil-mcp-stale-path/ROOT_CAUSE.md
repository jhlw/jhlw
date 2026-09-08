# Root Cause

`C:\Users\jhlw\.codex\config.toml` 中的 `mcp_servers.pencil.command` 硬编码为：

`C:\Users\jhlw\.vscode\extensions\highagency.pencildev-0.6.68\out\mcp-server-windows-x64.exe`

VS Code 扩展已经升级并移除 `0.6.68` 目录，本机当前安装的是 `highagency.pencildev-0.6.70`。因此 Codex 启动子进程时找不到旧版本可执行文件，Windows 返回 `os error 3`。

这不是 Codex 的引号解析问题；`Test-Path` 与直接执行旧路径均确认旧文件不存在，新版本二进制能完成 MCP initialize 握手。
