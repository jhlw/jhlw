# 屏幕地图（Master Screen Map）— 业绩比较基准管理系统

导航三组五屏；弹层就近挂载于所属主屏。

```mermaid
graph TD
    E((进入系统)) --> S1
    subgraph G1["业绩查询"]
        S1["s1 业绩基准及净值增长率查询"]
    end
    subgraph G2["数据与配置"]
        S2["s2 产品基准配置管理"]
        S2I["s2i 指数库维护"]
    end
    subgraph G3["基准行情库"]
        S3["s3 基准行情查询"]
        S3M["s3m 基准行情维护"]
    end
    S2 -->|发起/修改| MChange["弹层 发起基准配置(发起→审核)"]
    S2 -->|删除| MDel["弹层 删除基准配置(发起→审核)"]
    S2I --> ZAdd["弹层 新增/编辑指数"]
    ZAdd --> ZSrc["弹层 选择数据源指数"]
    S2I --> ZView["弹层 指数详情"]
    S2I --> ZDel["弹层 删除指数确认"]
    S3M --> MIdx["弹层 收盘点位维护"]
    S3M --> MRate["弹层 利率维护"]
    S3M --> MFx["弹层 汇率维护"]
    S3M --> MImp["弹层 批量导入"]

    classDef screen fill:#e8e8e8,stroke:#999,stroke-width:2px
    classDef modal fill:#e0e7ff,stroke:#6366f1,stroke-width:1px
    class S1,S2,S2I,S3,S3M screen
    class MChange,MDel,ZAdd,ZSrc,ZView,ZDel,MIdx,MRate,MFx,MImp modal
```

| 主屏 | 定位 | 关联用例 |
|------|------|----------|
| s1 业绩基准及净值增长率查询 | 结果消费（只读＋导出） | UC-001 |
| s2 产品基准配置管理 | 配置版本管理入口 | UC-003/004/005 |
| s2i 指数库维护 | 主数据维护（Wind 编码唯一键） | UC-002 |
| s3 基准行情查询 | 行情消费（只读） | UC-006 |
| s3m 基准行情维护 | 行情采集入口（发起→审核） | UC-007 |
