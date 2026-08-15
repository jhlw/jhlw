# Stack

Language: TypeScript（harness/ai-news/remotion 主栈）、Python 3（Study）、HTML/JS（产品画像、recruitment、point）
Framework: React 19 + Remotion 4（remotion 子项目）；其余无统一框架
Runtime: Node.js ≥ 18（npm 包、tsx）、Python 3
Database: 无集中数据库；状态存 Git + .planning/ Markdown + .codebase/beads.json
Package manager: npm（根级 harness 为全局 npm 包；子项目各自独立工作区）
Test framework: 根级 harness gates（verify.sh / run-evals.sh）；子项目按需（Python unittest / Vitest 待定）
Lint/typecheck tools: tsc --noEmit（TS 子项目）；根级 check-no-debug-logs.sh
Deployment target: 本地工作区（v1 无远程部署）
Version constraints: Node ≥ 18；TypeScript ≥ 5；Python ≥ 3.10

## Product Direction Clues
- 整仓平台化：仓库 = 个人多项目工作平台，子项目 = 模块

## Repository Stack Clues
# Detected Stack Clues
- ai-news: TypeScript + tsx + rss-parser + @anthropic-ai/sdk（AI 新闻日报 CLI）
- remotion: React 19 + Remotion 4（视频渲染）
- 产品画像: 静态 HTML/JS + xlsx 数据清单
- tech/预初: Markdown + HTML 课程内容
- root: Node.js harness（genesis-harness CLI）

## Local Development Commands

```sh
# start (ai-news)
cd "项目/ai-news" && npm run start
# test (root gates)
genesis-harness verify-gate
# lint/typecheck (ai-news)
cd "项目/ai-news" && npx tsc --noEmit
# build (remotion)
cd remotion && npm run build
```
