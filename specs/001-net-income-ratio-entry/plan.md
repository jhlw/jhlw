# Implementation Plan: 专户产品净收入比例录入

**Branch**: `001-net-income-ratio-entry` | **Date**: 2026-09-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-net-income-ratio-entry/spec.md`

## Summary

为「专户产品净收入比例录入」交付一个**高保真单文件交互原型**（用户 2026-09-21 定夺），覆盖五个用户故事：新增产品首次确认（P1）、银行部总部份额按月设置（P2）、机构/券商部门内调整（P2）、部门间调整（P3）、操作留痕与配置追溯（P4），并内建「拆分结果实时预览」（FR-016~018）——预览复用拆分系统原型已实现的 R1–R3/R5/R6 规则链 JS 逻辑，保证「所见即所拆」同一口径。技术上延续 `项目/净收入比例录入/prototypes/` 现有约定：单 HTML 文件、内联 CSS/JS、无框架无构建、内存 + localStorage 模拟数据、file:// 直接打开、完全离线。

## Technical Context

**Language/Version**: HTML5 + 原生 JavaScript（ES2020，浏览器直接执行，无构建步骤）

**Primary Dependencies**: 无框架、无 CDN 依赖（离线可用）；延续现有原型的内联 CSS 变量配色（CCB 蓝 `#003399` 体系）与系统字体栈

**Storage**: 内存 JS 对象为唯一运行时数据源；localStorage 仅用于刷新后恢复演示进度（可一键重置）。所有数据为种子化 mock（产品、销量、管理费、净收入均示意数）

**Testing**: 以 [quickstart.md](./quickstart.md) 的人工验证场景为准（每个 User Story 的 Independent Test 落到具体点击路径与期望结果）；可选用 webapp-testing/Playwright 做冒烟截图

**Target Platform**: 现代桌面浏览器（Chrome / Edge），file:// 协议直接打开

**Project Type**: 单文件交互原型（纯前端交付物，无服务端）

**Performance Goals**: 交互即时响应（本地计算 <100ms）；预览试算在编辑比例时实时重算无卡顿

**Constraints**: 单个 HTML 文件（预计 1500~2500 行）；简体中文界面；不得引入外部网络请求；mock 数据须与 R1–R6 例子表口径一致（536392/536744 混合产品、北京/上海/杭州等地区、四家分公司）

**Scale/Scope**: 约 8 个视图（场景入口、四套流程编辑器、审批/确认视图、留痕查询、历史版本对照）；~10 个 mock 产品；5 个用户故事 × 验收场景全数可演示

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**结果：通过（空约束）**。`.specify/memory/constitution.md` 仍是未填写模板，无任何生效原则可校验。按 Spec Kit 规则不构成阻塞；建议后续用 `/speckit-constitution` 把已沉淀的项目约定（例子表活文档、E/C 清单回填、ADR 定稿口径优先、原型单文件离线）固化为宪法。

设计后复查（Phase 1 完成时）：无新增违反项——未引入框架、未引入网络依赖、未偏离 ADR-0001 口径（总部份额人工设置、参考值仅展示、剩余份额纯计算）。

## Project Structure

### Documentation (this feature)

```text
specs/001-net-income-ratio-entry/
├── plan.md              # 本文件
├── research.md          # Phase 0 输出：技术决策与备选
├── data-model.md        # Phase 1 输出：实体模型 + mock 数据契约
├── quickstart.md        # Phase 1 输出：验证指南（按 US 走查）
├── contracts/
│   └── ui-contract.md   # Phase 1 输出：界面契约（视图 × 交互 × 状态）
├── checklists/
│   └── requirements.md  # 已完成（全部勾选）
└── tasks.md             # Phase 2 输出（$speckit-tasks 生成，非本命令）
```

### Source Code (repository root)

```text
项目/净收入比例录入/prototypes/
├── 归属比例配置流程原型.html        # 既有（20260909 定稿版）——保留不动，作交互基线参考
├── 净收入拆分系统原型.html          # 既有——R1–R6 规则链 JS 的移植来源（calcProduct 等）
└── 净收入比例录入原型.html          # ★ 本 feature 唯一新增交付物（单文件，覆盖 US1–US5 + 预览）
```

**Structure Decision**: 交付物为**一个新原型文件**，不修改两份既有定稿原型。理由：① 既有配置流程原型标注「20260909定稿版」，是历史评审基线，改动会破坏留档；② 新 spec 相比旧原型增加了实时拆分预览（FR-016~018）、在途互斥（FR-013）、漏设高亮/截止重算（E-j 默认）、历史版本对照（FR-011）等大量行为，重写比缝补干净；③ 规则链逻辑从拆分原型**移植**（复制后按预览口径裁剪），两原型保持各自独立可打开。

## Complexity Tracking

> 无宪法违反项，本节留空。
