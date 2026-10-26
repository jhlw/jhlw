# UX Flows — 业绩比较基准管理系统

> ux-flow-designer 试跑产物。输入：`界面原型/业绩比较基准管理系统-界面原型.html` ＋ 解决方案 v2.5 §5.1/§5.2。
> 桌面系统适配：线框采用 1280px 视口＋侧边导航（替代技能默认移动端 375px＋Tab 栏），方法论四阶段完整执行。

## Master Screen Map

见 [diagrams/screen-map.md](diagrams/screen-map.md)：三组导航（业绩查询／数据与配置／基准行情库）五主屏，弹层就近挂载。

## Screen Inventory

| 屏幕 | 用途 | 线框 | 用例 |
|------|------|------|------|
| s1 业绩基准及净值增长率查询 | 基准自算结果与净值增长率逐日对照，勾选导出 | [wireframes/s1-benchmark-query.html](wireframes/s1-benchmark-query.html) | UC-001 |
| s2 产品基准配置管理 | 版本化配置检索与变更入口 | [wireframes/s2-config-mgmt.html](wireframes/s2-config-mgmt.html) | UC-003/004/005 |
| s2i 指数库维护 | 成分基准主数据（Wind 编码唯一键） | [wireframes/s2i-index-library.html](wireframes/s2i-index-library.html) | UC-002 |
| s3 基准行情查询 | 点位/利率/汇率只读消费 | [wireframes/s3-quote-query.html](wireframes/s3-quote-query.html) | UC-006 |
| s3m 基准行情维护 | 三类行情采集＋批量导入（发起→审核） | [wireframes/s3m-quote-maint.html](wireframes/s3m-quote-maint.html) | UC-007 |
| 11 个弹层 | 见 [wireframes/INDEX.md](wireframes/INDEX.md) | — | — |

## Use Case Diagrams

完整索引见 [diagrams/INDEX.md](diagrams/INDEX.md)。

| 用例 | Flow / States / Sequence |
|------|--------------------------|
| UC-001 业绩基准及净值增长率查询 | [flow](diagrams/uc-001-benchmark-query/flow.md) ｜ [states](diagrams/uc-001-benchmark-query/states.md) ｜ [sequence](diagrams/uc-001-benchmark-query/sequence.md) |
| UC-002 指数库维护 | [flow](diagrams/uc-002-index-library/flow.md) ｜ [states](diagrams/uc-002-index-library/states.md) ｜ [sequence](diagrams/uc-002-index-library/sequence.md) |
| UC-003 配置查询与详情 | [flow](diagrams/uc-003-config-detail/flow.md) ｜ [states](diagrams/uc-003-config-detail/states.md) ｜ [sequence](diagrams/uc-003-config-detail/sequence.md) |
| UC-004 发起基准配置（经办→审核） | [flow](diagrams/uc-004-config-approval/flow.md) ｜ [states](diagrams/uc-004-config-approval/states.md) ｜ [sequence](diagrams/uc-004-config-approval/sequence.md) |
| UC-005 删除基准配置（经办→审核） | [flow](diagrams/uc-005-config-delete/flow.md) ｜ [states](diagrams/uc-005-config-delete/states.md) ｜ [sequence](diagrams/uc-005-config-delete/sequence.md) |
| UC-006 基准行情查询 | [flow](diagrams/uc-006-quote-query/flow.md) ｜ [states](diagrams/uc-006-quote-query/states.md) ｜ [sequence](diagrams/uc-006-quote-query/sequence.md) |
| UC-007 基准行情维护（含批量导入） | [flow](diagrams/uc-007-quote-maint/flow.md) ｜ [states](diagrams/uc-007-quote-maint/states.md) ｜ [sequence](diagrams/uc-007-quote-maint/sequence.md) |

## Clickable Prototype Links（关键跳转）

| From | 元素 | To |
|------|------|------|
| s2-config-mgmt | ＋发起基准配置 / 行内修改 | modal-initiate-config |
| s2-config-mgmt | 行内详情 | modal-config-detail |
| modal-config-detail | 删除（发起） | modal-delete-config |
| s2i-index-library | ＋新增指数 / 行内编辑 | modal-add-index |
| modal-add-index | 选择数据源指数 | modal-pick-source |
| modal-index-detail | 编辑 | modal-add-index |
| s3m-quote-maint | 三类型卡片／批量导入 | modal-maint-close / rate / fx / modal-batch-import |
| modal-maint-* | 批量导入 | modal-batch-import |
| modal-batch-import | 执行导入 | modal-maint-close（并入行） |
| 双面板弹层 | 页内锚点 | #initPanel ⇄ #auditPanel（发起⇄审核） |
| 全部页面 | 侧边导航 | 五主屏互链 |

## Navigation Patterns

- **侧边导航常驻**：三组五屏，弹层页保留父屏侧栏并高亮，保证不迷路
- **弹层＝独立页面**：遮罩＋父屏残影（.wf-ghost），页脚标注归属主屏与用例
- **双面板审批**：同一弹层内 ①发起／②审核 页签锚点切换，纯 HTML 无 JS
- **列表行操作三连**：详情（只读）→ 修改（发起流程）→ 删除（发起流程）

## Open Questions（交 ui-ux-pro-max / 后续迭代）

1. 推送范围与 C1–C6 未决项（见项目记忆 2026-10-22 记录）是否影响 s1 展示列与筛选默认值
2. docx 方案待同步取消「基准点位指标」口径（xlsx/原型已改），线框按已定口径绘制
3. 审核面板是否需要全局「待办审核」聚合页（当前仅嵌入各弹层页签与 s3m 批次列表）
4. 紧急程度的视觉/提醒规格（原型未细化）
5. 时序图端点均为设计示意，待后端接口规格定稿后回填
