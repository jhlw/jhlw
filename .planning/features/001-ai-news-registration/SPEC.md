# Feature: ai-news 子项目登记

## Summary

将 ai-news 子项目登记进整仓平台的 FEATURE_REGISTRY，并提供可执行的验证命令（TypeScript 类型检查）。

## User Story

作为 jhlw，我希望 ai-news 有可执行的验证命令，以便后续修改时能确认"真的完成"。

## Expected Behavior

- [x] FEATURE_REGISTRY.json 登记 F001，verify_cmd 为 `cd ai-news && node_modules\.bin\tsc.cmd --noEmit`
- [x] 验证命令实测通过（exit 0）

## Edge Cases

- [x] 类型检查依赖缺失（@types/node）→ 已安装补齐

## Out Of Scope

- 不改 ai-news 的业务逻辑
- 不引入测试框架

## Acceptance Criteria

- [x] verify-cmd 可执行且当前通过
- [x] 注册表 / FEATURE_INDEX / ROADMAP 同步
