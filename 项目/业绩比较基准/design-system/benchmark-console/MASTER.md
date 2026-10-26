# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Benchmark Console（业绩比较基准管理系统）
**Generated:** 2026-10-26 17:30 · **Revised:** 2026-10-26 17:45（合成修订，见「来源与验证」）
**Category:** Enterprise Internal Console（金融后台 / 审批工作流 / 数据密集表格）
**Design Dials:** Variance 3/10（Centered/Minimal）| Motion 2/10（Subtle）| Density 8/10（Dense/Dashboard）

---

## 来源与验证（透明声明）

| 决策 | 来源 |
|------|------|
| 风格 Swiss/Minimalism、Fira 字体、密度/动效档位 | ✅ 数据库命中（style/typography 域） |
| 配色 Banking/Traditional Finance（浅色 trust navy + gold） | ✅ 数据库命中（`--domain color` "Banking/Traditional Finance"） |
| 表格/徽标/提交反馈规则 | ✅ 数据库命中（ux 域） |
| 折线图规则 | ✅ 数据库命中（chart 域） |
| Pattern：`--design-system` 自动返回 "Real-Time/Operations Landing"（深色 IoT 向） | ⚠️ **不匹配已弃用**，改写为下述 Console 模式（fallback，非库命中） |

## Global Rules

### Color Palette（浅色 · Banking 信任蓝）

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary（导航/主按钮/标题强调） | `#0F172A` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary（链接/选中态） | `#1E3A8A` | `--color-secondary` |
| On Secondary | `#FFFFFF` | `--color-on-secondary` |
| Accent（关键动作点缀，克制使用） | `#A16207` | `--color-accent` |
| On Accent | `#FFFFFF` | `--color-on-accent` |
| Background | `#F8FAFC` | `--color-background` |
| Foreground | `#020617` | `--color-foreground` |
| Card/Panel | `#FFFFFF` | `--color-card` |
| Card Foreground | `#020617` | `--color-card-foreground` |
| Muted | `#E8ECF1` | `--color-muted` |
| Muted Foreground | `#475569` | `--color-muted-foreground` |
| Border | `#E2E8F0` | `--color-border` |
| Destructive（删除/退回） | `#DC2626` | `--color-destructive` |
| On Destructive | `#FFFFFF` | `--color-on-destructive` |
| Ring（焦点环） | `#1E3A8A` | `--color-ring` |

**Workflow 状态色（审批流专用 · 色+文字+形状三重编码，禁止仅靠颜色）：**

| 状态 | 前景 | 背景 | 示例 |
|------|------|------|------|
| 有效/通过 | `#059669` | `#ECFDF5` | 版本生效、审核通过 |
| 待审核 | `#B45309` | `#FFFBEB` | 草稿提交后（紧急批次加 ● 前缀） |
| 已退回 | `#DC2626` | `#FEF2F2` | 审核退回 |
| 失效/截断 | `#475569` | `#F1F5F9` | 旧版本区间 |

### Typography

- **Latin/数字：** 标题与正文 Fira Sans；**数据列用 Fira Code**（等宽对位）+ `font-variant-numeric: tabular-nums`
- **CJK 回退栈（必须）：** `'Fira Sans','PingFang SC','Microsoft YaHei','Noto Sans SC',sans-serif`（Fira 无中文字形，缺回退会中英混排断裂）
- **字号（Density 8）：** 表格 12px / 正文 13–14px / 标签 11px / 页标题 15–16px；行高 1.5
- **数字格式：** 千分位（`1,234.56`）；百分比统一 4 位小数展示口径由业务定，UI 右对齐
- Google Fonts：`https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Fira+Sans:wght@400;500;600;700&display=swap`（离线内网部署时下载自托管，勿外链 CDN）

### Spacing Variables（Density 8/10）

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `2px` | 徽标内间距 |
| `--space-sm` | `4px` | 图标间隙 |
| `--space-md` | `8px` | 单元格 padding |
| `--space-lg` | `12px` | 面板 padding |
| `--space-xl` | `16px` | 区块间隙 |
| `--space-2xl` | `24px` | 页边距 |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(15,23,42,0.05)` | 输入框 |
| `--shadow-md` | `0 4px 6px rgba(15,23,42,0.08)` | 下拉/悬浮 |
| `--shadow-lg` | `0 10px 15px rgba(15,23,42,0.12)` | 弹层 modal |
| `--shadow-xl` | — | 禁用（后台无需 hero 级投影） |

---

## Layout Pattern（Console 模式 · fallback 合成）

- **结构：** 左侧栏 208–224px 常驻（三组五屏）→ 顶栏 40–48px 面包屑 → 内容区面板流
- **表格页：** 筛选条（≤1 行）→ 工具条（批量动作左/新增右）→ 表格（粘性表头，`overflow-x` 包裹器，行高 32px，勾选列+操作列固定）→ 分页器（左总数右页码）
- **审批弹层：** 双面板页签（发起⇄审核），宽度 520–900px；`--shadow-lg`；遮罩 `rgba(15,23,42,0.45)`
- **批量操作：** 勾选后浮现动作条（全选/导出/取消），单行动作不重复批量职责

## Component Specs

### Buttons
```css
.btn-primary { background: var(--color-primary); color: #fff; padding: 7px 16px; border-radius: 4px; font-weight: 600; font-size: 13px; transition: background 200ms ease; cursor: pointer; }
.btn-primary:hover { background: #1E293B; }
.btn-secondary { background: #fff; color: var(--color-primary); border: 1px solid var(--color-border); padding: 7px 16px; border-radius: 4px; font-size: 13px; transition: border-color 200ms ease; cursor: pointer; }
.btn-secondary:hover { border-color: var(--color-secondary); }
.btn-danger { background: var(--color-destructive); color: #fff; }
:focus-visible { outline: 2px solid var(--color-ring); outline-offset: 2px; }
```
按钮高度 ≥32px（密集后台可低于 44px，但点击区内边距补足）；同一操作区主按钮仅 1 个。

### Tables（核心组件）
```css
table { border-collapse: collapse; width: 100%; background: #fff; font-size: 12px; }
th { position: sticky; top: 0; background: var(--color-muted); color: var(--color-primary); font-weight: 600; padding: 8px; }
td { padding: 6px 8px; border-bottom: 1px solid var(--color-border); color: #020617; font-variant-numeric: tabular-nums; }
td.num, th.num { text-align: right; font-family: 'Fira Code', monospace; }
tr:hover td { background: #F1F5F9; }
```
必须真 `<table>` 标签（线框阶段踩坑：`<div>` 内的 `<tr>` 被浏览器拍平为纯文本）。

### Status Badge
```css
.badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 500; }
/* 状态色见上表；徽标文字必带状态词（"待审核"），不得只用色点 */
```

### Forms / Inputs
```css
.input { padding: 6px 10px; border: 1px solid var(--color-border); border-radius: 4px; font-size: 13px; background: #fff; transition: border-color 200ms ease; }
.input:focus { border-color: var(--color-secondary); outline: none; box-shadow: 0 0 0 3px rgba(30,58,138,0.15); }
```
标签可见（勿 placeholder-only）；错误就近字段显示（如「权重合计必须等于 100%」置于合计行内）；提交 Loading → 成功/失败状态必须可感知。

### Charts（如 s1 追加趋势视图）
- 时间序列趋势 → **折线图**；多序列用 实线/虚线/点线 + 直接标注，禁止仅靠色相区分
- 数据阈值：<1000 点 SVG；≥1000 点 Canvas+降采样；>10000（基准行情 67 万级）按区间聚合后再画
- 必须提供可见数据表 + 键盘可达（聚焦读值、+/− 缩放）

## Motion（Motion 2/10）

后台**禁用滚动进场动画**（Scroll Reveal 不适用 console）。仅保留：hover/focus 过渡 150–250ms；提交按钮 loading 态；弹层淡入 120ms。全部尊重 `prefers-reduced-motion`。

## Anti-Patterns（Do NOT）

- ❌ 表情符号当图标（用 Lucide/Heroicons SVG）
- ❌ 仅颜色传达状态（缺文字/形状）
- ❌ 数字列左对齐/不等宽（对位失明）
- ❌ 表格溢出视口无 `overflow-x` 包裹
- ❌ 内容被固定栏遮挡（粘性表头需算滚动补偿）
- ❌ 提交后无反馈；错误只在页顶汇总
- ❌ 布局抖动的 hover scale 变换
- ❌ 隐藏焦点环

## Pre-Delivery Checklist

- [ ] 文本对比度 ≥4.5:1（浅色底：#020617/#475569 均达标；状态徽标前景已按此选）
- [ ] 焦点态可见（`:focus-visible` 环）
- [ ] 所有可点元素 `cursor: pointer`
- [ ] hover/提交有过渡与状态反馈（150–300ms）
- [ ] `prefers-reduced-motion` 生效
- [ ] 1440/1280/1024 无横向滚动；宽表用滚动容器
- [ ] 批量动作条与单行动作不重复
- [ ] 图标统一 SVG 集
