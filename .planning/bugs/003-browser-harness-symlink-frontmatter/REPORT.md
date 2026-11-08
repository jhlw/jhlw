# Bug Report

## Symptom

Codex/agent 启动时提示：

`C:\Users\jhlw\.agents\skills\browser-harness\skills\browser-harness\SKILL.md: missing YAML frontmatter delimited by ---`

## Impact

- 用户级 skill 扫描出现告警。
- `browser-harness` 仓库内的两个 `SKILL.md` 在 Windows 上表现为 14 字节纯文本指针 `../../SKILL.md`，无法提供实际 skill 内容。

## Environment

- Windows
- User-level skill checkout: `C:\Users\jhlw\.agents\skills\browser-harness`
- Valid source file: `C:\Users\jhlw\.agents\skills\browser-harness\SKILL.md`
