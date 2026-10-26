# 线框索引（INDEX）— 业绩比较基准管理系统

16 页桌面线框（视口 1280px，侧边导航替代移动端 Tab 栏）；自包含内联 CSS、无 JS，`<a>` 导航构成可点击原型。弹层页以半透明遮罩叠加在父屏之上，双面板弹层用页内锚点（#initPanel / #auditPanel）演示发起→审核切换。

## 主屏

| 屏幕 | 文件 | 关联用例 | 关键元素 | 出口链接 |
|------|------|----------|----------|----------|
| s1 业绩基准及净值增长率查询 | [s1-benchmark-query.html](s1-benchmark-query.html) | UC-001 | 筛选条、勾选表格（含折算列）、分页、导出 | 侧边导航 5 屏 |
| s2 产品基准配置管理 | [s2-config-mgmt.html](s2-config-mgmt.html) | UC-003/004/005 | 版本化列表、详情/修改/删除行操作 | modal-config-detail / modal-initiate-config / modal-delete-config |
| s2i 指数库维护 | [s2i-index-library.html](s2i-index-library.html) | UC-002 | 唯一键列表、新增按钮、类型/币种列 | modal-add-index / modal-index-detail / modal-index-delete |
| s3 基准行情查询 | [s3-quote-query.html](s3-quote-query.html) | UC-006 | 三视角 Tab、检索条、大分页（67万+） | 侧边导航 |
| s3m 基准行情维护 | [s3m-quote-maint.html](s3m-quote-maint.html) | UC-007 | 4 入口卡片、待审核批次列表 | modal-maint-close / rate / fx / modal-batch-import |

## 弹层

| 弹层 | 文件 | 父屏 | 关联用例 | 出口 |
|------|------|------|----------|------|
| 新增/编辑指数 | [modal-add-index.html](modal-add-index.html) | s2i | UC-002 | modal-pick-source；保存/取消→s2i |
| 选择数据源指数 | [modal-pick-source.html](modal-pick-source.html) | 新增指数 | UC-002 | 确认/取消→modal-add-index |
| 指数详情 | [modal-index-detail.html](modal-index-detail.html) | s2i | UC-002 | 编辑→modal-add-index；关闭→s2i |
| 删除指数确认 | [modal-index-delete.html](modal-index-delete.html) | s2i | UC-002 | 确认/取消→s2i |
| 配置详情 | [modal-config-detail.html](modal-config-detail.html) | s2 | UC-003 | 修改→modal-initiate-config；删除→modal-delete-config；关闭→s2 |
| 发起基准配置（双面板） | [modal-initiate-config.html](modal-initiate-config.html) | s2 | UC-004 | 锚点 #init/#audit；通过→s2；退回→#init |
| 删除基准配置（双面板） | [modal-delete-config.html](modal-delete-config.html) | s2 | UC-005 | 同上模式 |
| 收盘点位维护（双面板） | [modal-maint-close.html](modal-maint-close.html) | s3m | UC-007 | 批量导入→modal-batch-import；通过→s3m |
| 利率维护（双面板） | [modal-maint-rate.html](modal-maint-rate.html) | s3m | UC-007 | 同上模式 |
| 汇率维护（双面板） | [modal-maint-fx.html](modal-maint-fx.html) | s3m | UC-007 | 同上模式 |
| 批量导入 | [modal-batch-import.html](modal-batch-import.html) | s3m/各维护弹层 | UC-007 | 执行导入→modal-maint-close；取消→s3m |

## 导航完整性

无死端：每页均有侧边导航（5 主屏互链）或明确出口按钮回父屏；双面板弹层内部锚点闭环（发起⇄审核）。
