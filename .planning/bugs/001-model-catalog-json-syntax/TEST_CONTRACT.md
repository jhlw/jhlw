# Test Contract

## Required checks

- `models.json` 可被标准 JSON 解析器解析。
- 顶层 `models` 包含 `deepseek-v4-flash`、`deepseek-v4-pro`、`glm-5.3`、`glm-5-turbo`、`deepseek-v4-flash-vision-exp`。
- `deepseek-v4-pro.supported_reasoning_levels` 只包含 `low`、`high`、`max` 三项，且每项只有 `effort` 与 `description`。
- `codex doctor` 在显式 `CODEX_HOME=C:\Users\jhlw\.codex` 时显示 Configuration / config loaded。
