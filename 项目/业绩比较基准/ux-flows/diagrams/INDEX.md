# 图表索引（INDEX）— 业绩比较基准管理系统

命名规范：kebab-case；每用例 3 图（flow / states / sequence），统一 classDef（screen/modal/decision/action/error）。时序图端点均为设计示意，以后端接口规格为准。

## 全局

| 图表 | 说明 |
|------|------|
| [screen-map.md](screen-map.md) | 主屏幕地图：三组导航五屏＋弹层挂载 |

## 用例图表

| 用例 | Flowchart | States | Sequence |
|------|-----------|--------|----------|
| UC-001 业绩基准及净值增长率查询 | [flow](uc-001-benchmark-query/flow.md) | [states](uc-001-benchmark-query/states.md) | [sequence](uc-001-benchmark-query/sequence.md) |
| UC-002 指数库维护 | [flow](uc-002-index-library/flow.md) | [states](uc-002-index-library/states.md) | [sequence](uc-002-index-library/sequence.md) |
| UC-003 产品基准配置查询与详情 | [flow](uc-003-config-detail/flow.md) | [states](uc-003-config-detail/states.md) | [sequence](uc-003-config-detail/sequence.md) |
| UC-004 发起基准配置（经办→审核） | [flow](uc-004-config-approval/flow.md) | [states](uc-004-config-approval/states.md) | [sequence](uc-004-config-approval/sequence.md) |
| UC-005 删除基准配置（经办→审核） | [flow](uc-005-config-delete/flow.md) | [states](uc-005-config-delete/states.md) | [sequence](uc-005-config-delete/sequence.md) |
| UC-006 基准行情查询（只读） | [flow](uc-006-quote-query/flow.md) | [states](uc-006-quote-query/states.md) | [sequence](uc-006-quote-query/sequence.md) |
| UC-007 基准行情维护（含批量导入） | [flow](uc-007-quote-maint/flow.md) | [states](uc-007-quote-maint/states.md) | [sequence](uc-007-quote-maint/sequence.md) |

## 跨用例衔接

- UC-002 → UC-004：指数库记录是配置成分基准的选用来源
- UC-007 → UC-001/006：行情入库后经统一计算进入查询与披露
- UC-003 → UC-004/005：详情弹层是变更流程的入口
