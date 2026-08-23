# Bug Report

## Symptom

Codex 启动时报错：

`Error loading configuration: failed to parse model_catalog_json path C:\Users\jhlw\.codex\models.json as JSON: expected , or ] at line 114 column 9`

## Impact

Codex 无法加载用户级模型目录配置。

## Environment

- Windows
- Codex CLI 0.149.0
- Config: `C:\Users\jhlw\.codex\models.json`
