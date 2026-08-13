# ADR-001: Tech Stack

Status: Accepted

## Context

jhlw 工作区为整仓平台化：多个独立子项目（Node/TS、Python、静态 HTML）共用一个根级 harness。需要一个与技术无关、按子项目伸缩的栈策略。

## Decision

- 运行时：Node.js ≥ 18 + Python 3，按子项目选择
- 前端：无统一框架；remotion 用 React 19 + Remotion 4，其余静态 HTML/JS
- 存储：无集中数据库；Git + .planning/ Markdown + .codebase/beads.json
- 测试：根级 harness gates + 子项目独立 verify-cmd
- 部署：本地工作区（v1）

## Alternatives Considered

- [x] 聚焦单一子项目（如 ai-news）作为主产品 —— 用户选择整仓平台化
- [x] 引入集中数据库 —— v1 不需要，状态文件已够用

## Consequences

- 根级文档成为单一事实源，子项目按模块接入
- 新子项目接入成本低（登记 + verify-cmd）

## Risks

- 多语言多运行时导致验证命令碎片化
- 模板文档与真实业务目录可能漂移

## Mitigation

- 每个子项目只要求一条可执行 verify-cmd
- docs-gate / 机械检查脚本强制同步

## Verification Evidence

genesis-harness verify 通过（50/50）；check-required-planning-files.sh 通过（见会话验证记录）。
