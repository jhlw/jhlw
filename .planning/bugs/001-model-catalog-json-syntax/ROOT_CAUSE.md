# Root Cause

`glm-5.3` 与 `glm-5-turbo` 两个模型对象被插入到 `deepseek-v4-pro` 的 `supported_reasoning_levels` 数组内部：

- 第 113 个 reasoning level 对象后缺少数组关闭 `],`
- 新插入的 GLM 对象前缺少逗号
- 语义上 GLM 模型应位于顶层 `models` 数组，而不是 reasoning level 数组
