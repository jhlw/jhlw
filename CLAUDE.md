# CLAUDE.md — jhlw 工作区

个人多项目工作区（git 仓库：jhlw/jhlw）。

## 项目概述

本仓库是多个独立子项目的集合，并非单一技术项目。工作时先确认操作目标是哪个子项目，避免跨项目干扰。

## 目录结构

| 目录 | 说明 |
|------|------|
| `Study/` | 学习资料 |
| `ai-news/` | AI 新闻聚合 |
| `docs/` | 文档 |
| `point/` | 汇率小工具 |
| `recruitment/` | 招聘相关 |
| `remotion/` | Remotion 视频项目（Node.js/TypeScript） |
| `tech/` | 技术内容 |
| `专户开放期/` | 专户开放期相关内容 |
| `产品画像/` | 产品画像 |

## 工作区约定

- 子项目内自带配置（如 `remotion/` 为独立 npm 项目）时，进入对应目录操作
- 根目录文件（`harness.toml`、`hooks/`、`.claude-plugin/`）为 Harness 插件管理，勿手改
- 修改 `harness.toml` 后运行 `harness sync` 重新生成插件文件

## 提交规范

遵循 Conventional Commits：`feat:` / `fix:` / `docs:` / `refactor:` / `test:` / `chore:` / `✨` / `🐛` / `🔧`

## 语言

会话与注释默认使用简体中文。
