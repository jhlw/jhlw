# Lessons Learned

- BUG-002：`os error 3` 指向路径不存在。VS Code 扩展升级会更换带版本号的目录，MCP 命令应指向当前存在的版本或稳定入口，并在修改前先备份配置。
