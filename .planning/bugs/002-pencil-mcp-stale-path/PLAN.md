# Fix Plan

1. 备份用户级 `config.toml`。
2. 仅将 pencil 命令路径中的 `highagency.pencildev-0.6.68` 替换为当前存在的 `highagency.pencildev-0.6.70`。
3. 验证新路径存在并直接完成 MCP initialize 握手。
4. 用 `codex mcp list` 验证 Codex 读取到新的 pencil 命令。
