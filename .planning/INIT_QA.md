# Init Discovery Q&A

Complete this immediately after `/init`.

## Original User Brief

- [x] 用户指令："初始化"（无显式 brief）→ 产品方向由用户确认：整仓平台化

## Product Direction

- [x] 问题：jhlw 个人多项目工作区需要一个统一规划/记忆/验证中枢
- [x] 主用户：jhlw（本人）
- [x] 最小可接受 v1：可复用的工作区入口 —— 任务跟踪 + 文档记忆 + 每子项目验证命令
- [x] 方案：整仓平台化（已确认）优先于聚焦单一子项目（备选：ai-news、产品画像）

## QA Closure

- [x] Happy path：下达任务 → 确认子项目归属 → 计划/测试/实现 → 验证 → 状态与记忆更新
- [x] 失败与边界：跨项目任务先定主目录；无验证命令的子项目登记为"未接入"；沙箱只读目录走提权；Windows 下 bash 走 Git Bash
- [x] 明确范围外：不改业务代码、不做多用户、不代管密钥、v1 无远程部署
- [x] 验收标准可度量：check-required-planning-files.sh / verify-gate / docs 通过；≥2 子项目登记且 verify-cmd 可执行
- [x] QA 签署负责人：jhlw（本人）

## Tech Stack Sign-Off

- [x] 后端/运行时：Node.js ≥ 18 + Python 3（按子项目）
- [x] 前端/客户端：无统一前端；子项目自带（React 19/Remotion 4、静态 HTML）
- [x] 存储：Git + .planning/ Markdown + .codebase/beads.json（无集中数据库）
- [x] 测试策略：根级 harness gates + 子项目独立 verify-cmd
- [x] 部署目标：本地工作区（v1）
- [x] 技术栈负责人：jhlw（本人）

## Required Output To User

已确认：
1. 产品方向：整仓平台化
2. 技术栈：Node/Python 按子项目、无集中数据库、本地部署
3. QA/批准负责人：jhlw（本人）
