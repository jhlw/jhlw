# Requirements

## Functional Requirements

- [x] FR-0: 仓库级 harness 可初始化、可验证（genesis-harness verify 通过）
- [x] FR-1: 产品方向已确认：整仓平台化
- [ ] FR-2: 子项目注册表 —— 列出每个子项目（名称、说明、入口目录、verify-cmd）
- [ ] FR-3: 任务跟踪 —— 每个进行中的 feature/bug 在 .planning/features 或 bugs 下有一份任务文件，并在 ROADMAP 登记
- [ ] FR-4: 状态恢复 —— 会话开始时读 STATE.md / SUMMARY.md 即可知道当前进度
- [ ] FR-5: 文档同步门禁 —— docs-gate 拦截文档漂移

## Seeded From User Idea

- 用户指令："初始化" → 已执行 init（Phase 0/1 脚手架）
- 用户指令："产品方向 → 层次一、整仓平台化" → 本文件

## Non-Functional Requirements

- 单人使用，操作简单，无复杂账号体系
- 所有状态可恢复：状态文件 + git 提交
- 验证可重复：每个验证命令有明确退出码
- 中文文档，避免英文模板残留

## User Stories

- 作为 jhlw，我希望开一个新会话就能从 STATE.md 知道下一步，以便不丢上下文。
- 作为 jhlw，我希望每个子项目有 verify-cmd，以便确认"真的完成"而不是看起来完成。
- 作为 jhlw，我希望需求变更写入 SPEC_CHANGELOG，以便追踪影响。

## Acceptance Criteria

- AC-1: check-required-planning-files.sh 退出码 0
- AC-2: genesis-harness verify 全部 25 技能通过
- AC-3: 至少 ai-news 与 产品画像 两个子项目登记注册表且 verify-cmd 可执行
- AC-4: genesis-harness docs 无漂移告警
- AC-5: STATE.md 的 next task 与实际状态一致

## Edge Cases

- 跨子项目任务：先确认主操作目录，避免改错项目（遵循 CLAUDE.md 约定）
- 子项目无测试/无验证命令：登记为"未接入验证"，不假装通过
- 沙箱只读目录（.codex、.agents、.git）：需提权的命令走审批流程
- Windows 环境：bash 脚本经 Git Bash 执行；PowerShell 执行策略禁止 .ps1 时用 node 直调 CLI
- 文档漂移：docs-gate 失败时先同步文档再继续

## Known Unknowns

- 哪些子项目值得正式接入（v1 先接 ai-news + 产品画像，其余按需）
- 未来是否需要远程部署/推送渠道（v1 不做）
- 产品画像是否需要真实数据库（当前为静态 HTML + xlsx）
