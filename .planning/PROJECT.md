# Project

## What This Project Is

jhlw 个人多项目工作区（整仓平台化）。本仓库是多个独立子项目（ai-news、产品画像、remotion、recruitment、tech/预初、Study 等）的集合，genesis-harness 在根级提供统一的规划、记忆、验证与文档中枢，让每个子项目以"模块/功能"的方式接入同一套工作流。子项目集中于 `项目/` 目录（remotion、tech、docs 保留在根级）。

## Target Users

- 主用户：jhlw（本人），单人使用
- 次要用户：无（v1 不对外）

## Core Value

- 一个入口管理所有子项目的任务、状态、记忆与验证
- 任何会话都能从 `.planning/` 与 `.codebase/` 恢复上下文，降低跨项目丢失
- 每个子项目有可执行的验证命令，避免"看起来完成"

## Product Scope

- [x] 根级 harness 脚手架（.planning/、.codebase/、hooks、skills）
- [x] 发现问答（产品方向、技术栈、QA 负责人）
- [ ] 子项目注册表：为每个子项目登记描述与 verify-cmd
- [ ] 任务跟踪：每个子项目一条 feature/bug 工作流
- [ ] 文档记忆同步（docs-gate、beads）

## Out Of Scope

- 不重构、不改写任何子项目的业务代码
- 不做多用户、权限体系或对外分发
- 不代管密钥、凭证或部署平台账号
- v1 不做远程部署 / CI 服务端

## Constraints

- 仓库根级 harness 文件（harness.toml、hooks/、.claude-plugin/、.codex/）由 harness 管理，勿手改
- 子项目自带独立配置（如 remotion/、项目/ai-news/ 的 package.json）时，进入其目录操作
- 对话与注释默认简体中文
- 提交遵循 Conventional Commits

## Assumptions

- 平台主用户即仓库所有者（jhlw），单人使用
- v1 部署目标为本地工作区，无需服务器
- 验证以"每个子项目一条可执行命令"为最小单位

## Current Milestone

Phase 01 Discovery & QA —— 产品方向已确认（整仓平台化），技术栈与 QA 签署已记录，待规划第一个功能。

## Success Criteria

- [ ] check-required-planning-files.sh 全部通过
- [ ] 至少 ai-news 与 产品画像 两个子项目登记进注册表且验证命令可执行
- [ ] docs-gate 通过，.codebase 与 .planning 无漂移
- [ ] 任何新会话可按 STATE.md 直接恢复下一步
