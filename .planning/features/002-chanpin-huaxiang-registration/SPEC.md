# Feature: 产品画像 子项目登记

## Summary

将 产品画像 子项目登记进整仓平台的 FEATURE_REGISTRY，并提供可执行的验证命令（关键文件存在性 + JS 语法解析）。

## User Story

作为 jhlw，我希望 产品画像 有可执行的验证命令，以便后续修改 HTML/JS 时能快速确认基线未坏。

## Expected Behavior

- [x] FEATURE_REGISTRY.json 登记 F002，verify_cmd 为 `node .planning/scripts/verify-chanpin-huaxiang.js`
- [x] 验证脚本实测通过（exit 0）

## Edge Cases

- [x] Windows cmd 中文路径编码问题 → 脚本内使用 Unicode 转义
- [x] 关键文件缺失 → 脚本以非零退出码失败

## Out Of Scope

- 不修改 产品画像 的任何页面/数据
- 不做浏览器级 E2E（v1 不做远程部署）

## Acceptance Criteria

- [x] verify-cmd 可执行且当前通过
- [x] 注册表 / FEATURE_INDEX / ROADMAP 同步
