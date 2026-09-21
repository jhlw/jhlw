# Phase 1 Data Model: 专户产品净收入比例录入（原型内存模型）

**Date**: 2026-09-21 | **Plan**: [plan.md](./plan.md) | **Research**: [research.md](./research.md)

原型运行时为内存 JS 对象 + localStorage 快照（D6）。本文件定义实体、字段、校验规则、状态迁移与种子 mock 数据口径。术语以 `项目/净收入比例录入/CONTEXT.md` 为准。

## 实体关系总览

```text
Role 1───n User(视角)          Product 1───n ConfigVersion（不可变，按月/按流程）
                                 Product 1───n HqShareSetting（银行部产品 × 月份）
                                 Product 1───n ProcessTicket（在途互斥：同时至多 1 张）
                                 ProcessTicket 1───n TrailEntry（只追加）
                                 Product 1───n TrailEntry（跨流程累积，US5）
MonthlyData（销量/管理费/净收入总）─── 预览试算输入（FR-016，不落配置）
```

## 1. Product（专户产品）

外部产品系统同步、本功能只读引用（A2），原型中为种子数据。

| 字段 | 类型 | 说明 / 校验 |
|---|---|---|
| code | string | 产品代码，主键（如 `536392`） |
| name | string | 产品名称 |
| status | `新增` \| `存量` | FR-003：首次确认生效时自动 `新增→存量`，单向不可逆 |
| leadDept | DeptKey | 牵头市场总部部门；发起时三选一，不做自动判定（A4） |
| ownerDept | DeptKey | 当前归属比例最高的市场总部部门（部门间调整发起资格判定，FR-008）；由现行生效配置派生，不手工维护 |

## 2. ConfigVersion（归属配置 · 产品级版本）

FR-001/011：每产品一套「归属主体 × 比例」；生效后不可变（immutable），按月/按流程形成版本链。

| 字段 | 类型 | 说明 / 校验 |
|---|---|---|
| id | string | `CV-{productCode}-{seq}` |
| productCode | string | 外键 → Product |
| period | string | 生效期间（如 `2026-09` 起） |
| rows | Array<[Subject, ratio]> | 归属主体 × 比例；**校验 FR-002：Σratio = 100%**（4 位小数，尾差计占比最大方，Q14） |
| sourceTicketId | string | 产生该版本的流程单 |
| effectiveAt | datetime | 生效时间 |
| superseded | boolean | 是否已被后续版本取代（历史版本可追溯） |

**Subject（归属主体）** = `{ type: 'dept', key: 'bank'|'org'|'broker' }` 或 `{ type: 'branch', name: '北京分公司'|'上海分公司'|'深圳分公司'|'浙江分公司' }`。限定三家市场总部部门或分公司（FR-001）；主数据撤销主体时存量配置提示走调整流程，不静默删除（Edge Case）。

## 3. HqShareSetting（总部份额 · 银行部产品 × 月份）

FR-006 / ADR-0001：唯一人工参数；参考值仅展示不自动采用。

| 字段 | 类型 | 说明 / 校验 |
|---|---|---|
| productCode | string | 外键 → Product（限银行部产品，E-k：按产品设置） |
| month | string | `YYYY-MM`，每月一条 |
| value | number | 设置值 0~1；**端点允许**：0% 与 100% 均合法，100% 提交时二次确认「分公司份额将全部为 0」（E-l / A3） |
| refValue | number \| null | 参考值 = 柜台管理费 ÷ 总管理费；总管理费为 0 时置 null，界面显示「参考值不可用」（E-g / D3） |
| status | `草稿` \| `审批中` \| `已生效` \| `已退回` | FR-007 经审批后生效 |
| carriedOver | boolean | true = 当月漏设、系统沿用上月值，界面高亮提醒（E-j / A3） |
| setBy / approvedBy | string | 设置人 / 审批人（留痕联动） |

**截止与重算（E-j / A3 / FR-009）**：截止时点 = 当月拆分计算触发前；截止后改值 → 弹确认「将触发当月拆分重算」，确认后生效并留痕（原型中以提示 + 留痕示意，重算本体属下游 A1）。

## 4. ProcessTicket（流程单）

| 字段 | 类型 | 说明 / 校验 |
|---|---|---|
| id | string | `PT-{seq}` |
| productCode | string | 外键 → Product |
| scenario | `first_confirm` \| `bank_hq_share` \| `intra_dept` \| `cross_dept` | 四场景（FR-004/005/008） |
| initiatedBy | RoleKey | 发起人 |
| currentStep | number | 当前环节索引 → 场景步骤表 |
| status | `在途` \| `生效` \| `退回关闭` | **互斥 FR-013：同一 productCode 同时至多一张 `在途`**，违反时阻止发起并提示既有流程信息 |
| draft | object | 编辑中的配置草稿（rows 或 hqValue），提交前可反复修改 |
| confirmParties | RoleKey[] | 部门间调整：涉事部门确认链（逐一同意/退回，任一退回→整体退回发起方，FR-008） |
| approveParty | RoleKey | 审批方：intra_dept→发起部门固定审批角色（A6）；cross_dept→创新发展部归口 |
| rejectReason | string? | 退回意见（退回必填，入留痕） |

### 状态迁移（按场景）

```text
first_confirm : 发起(编辑rows,Σ=100%校验) → 客户经理确认 ─同意→ 生效(status=生效, Product→存量, 生成ConfigVersion)
                                              └─退回(附意见)→ 回到发起步骤(可改可重提)
bank_hq_share : 发起(设value,展示refValue) → 部门审批 ─通过→ 生效(写HqShareSetting) ─退回→ 发起步骤
intra_dept    : 发起(编辑rows) → 部门审批 ─通过→ 生效(新ConfigVersion,旧版superseded) ─退回→ 发起步骤
cross_dept    : 最高比例部门发起(资格校验FR-008) → 涉事部门逐一确认 ─全部同意→ 创新发展部归口审批 ─通过→ 生效
                     └─任一环节退回→ 整体退回发起方修改,重走确认链
```

生效语义（A7）：生效 = 成为下一次拆分计算触发时的比例来源；在途流程不影响当月已触发的计算（Edge Case）。

## 5. TrailEntry（操作留痕）

FR-010：**只追加**，原型不提供任何修改/删除入口；SC-005 四要素（谁/何时/场景/旧值→新值）1 分钟内可定位。

| 字段 | 类型 | 说明 |
|---|---|---|
| id | number | 自增 |
| at | datetime | 操作时间 |
| actor | RoleKey | 操作人（角色视角，D5） |
| ticketId / productCode | string | 所属流程单 / 产品 |
| action | `录入` \| `提交` \| `确认` \| `退回` \| `审批` \| `生效` \| `沿用上月` \| `重算确认` | 动作枚举 |
| before / after | object? | 变更前后值（rows 快照或 hqValue）；退回时 after 存退回意见 |

## 6. Role（角色与权限矩阵 · FR-012）

| RoleKey | 名称 | 权限 |
|---|---|---|
| bank | 银行业务部 | 发起首次确认（牵头时）；bank_hq_share 设置与提交；本部门 intra_dept 发起；cross_dept 发起（限最高比例时）/确认 |
| org | 机构业务部 | 同上（intra_dept 编辑归属主体及比例，无 hq_share） |
| broker | 证券公司业务部 | 同 org |
| cm | 客户经理 | 仅 first_confirm 的 确认无误 / 退回 |
| innov | 创新发展部 | 仅 cross_dept 归口审批 |
| branch | 分公司 | 只读（本产品相关配置与结果） |
| finance | 计划财务部 | 只读（下游，不操作配置；FR-015 考核确认已挂起） |

## 7. MonthlyData（预览试算输入 · 只读 mock）

FR-016~018 / D2：预览引擎（移植的 R1–R3/R5/R6 链路）的输入，**永不写回配置**。

| 数据集 | 字段 | 口径来源 |
|---|---|---|
| 销量表 | productCode, region, volume | R1 例子表（北京/上海/杭州/南京/成都/武汉等） |
| 管理费表 | productCode, vendor(建信直销柜台\|建设银行××分行), fee | R2/R3 例子表；vendor 名称含地名拆分 |
| 净收入（总） | productCode, month, amount | R5；计划财务部月度上传（A1 上游），**允许缺行**以演示 FR-018 降级 |
| 地区→分公司映射 | region → branch | 主数据⑤，银行业务部维护（A2 只读） |

### 种子数据要求（与例子表一致）

- 混合产品 `536392`（总管理费 100 万 / 柜台 30 万；直销内北京 0.6 上海 0.4；代销内各 0.5 → 北京 0.53 / 上海 0.47）、`536744`（杭州算例 0.4375）——R3 走查数；
- 银行部产品 ≥3（含 1 个总管理费为 0 演示「参考值不可用」、1 个上月有份额本月未设演示 carriedOver 高亮）；
- 机构部/券商部产品各 ≥2（含多分公司归属，演示增删主体后 Σ=100% 拦截）；
- 新增产品 ≥2（status=新增，演示 US1 全流程与 US1-AS5 拒绝）；
- 净收入（总）表对 1 个产品**故意缺行**（演示 FR-018「暂无可预览数据」）。

## 校验规则汇总（提交拦截点）

| # | 规则 | 触发 | 行为 |
|---|---|---|---|
| V1 | Σratio = 100%（4 位小数） | 首次确认/部门内/部门间 提交 | 阻止 + 提示差额（FR-002、US3-AS3） |
| V2 | 在途互斥 | 任何场景发起 | 阻止 + 提示既有流程（FR-013） |
| V3 | 存量产品禁再首次确认 | first_confirm 发起 | 拒绝 + 提示走调整流程（US1-AS5） |
| V4 | 部门间发起资格 = 最高比例部门 | cross_dept 发起 | 拒绝 + 提示（FR-008、US4-AS2） |
| V5 | 100% 份额二次确认 | bank_hq_share 提交 | 确认弹窗后放行（E-l/A3） |
| V6 | 退回必填意见 | 任一退回动作 | 阻止空意见提交（US1-AS3、US5-AS2） |
| V7 | 截止后改值重算确认 | bank_hq_share 截止后修改 | 确认弹窗 + 留痕（FR-009、E-j/A3） |
