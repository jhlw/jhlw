# Fix Plan

1. 备份原始文件到 `models.json.bak-20260823-1126`。
2. 关闭 `deepseek-v4-pro` 的 `supported_reasoning_levels` 数组。
3. 将两个 GLM 模型对象移动到顶层 `models` 数组。
4. 在 GLM 模型块与后续 DeepSeek 模型之间补齐逗号。
5. 验证 JSON 结构与 Codex 配置加载。
