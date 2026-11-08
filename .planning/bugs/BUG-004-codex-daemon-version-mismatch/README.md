# BUG-004 Codex 后台 daemon 版本不匹配告警

## 现象
- 告警: A background Codex service is running v0.162.1, older than your Codex CLI v0.167.0
- 沙箱命令执行频繁卡住（进程僵死/互相等待）

## 根因
1. app-server-daemon 升级到 local-6382985500（2026-11-07 21:39 部署）后，旧版 daemon（local-7c34e745 / v0.162.1）进程未重启，持续占用服务。
2. `%USERPROFILE%\.codex\.sandbox-bin\` 缺少 0.167.0 版 command-runner，沙箱命令回退到旧版 0.162.1 runner，与新 CLI 协议不兼容导致挂起。

## 修复
1. 从 npm 包 `@openai/codex-win32-x64\vendor\...\codex-resources\codex-command-runner.exe` 手动复制为 `.sandbox-bin\codex-command-runner-0.167.0.exe`（已验证落盘 8,946,992 字节）。
2. 需用户退出当前 Codex 会话并重启，daemon 自动加载新版，告警消失。

## 验证
- `codex --version` => codex-cli 0.167.0
- `.sandbox-bin\codex-command-runner-0.167.0.exe` 存在且大小与 npm 包源一致
- 新 runner 进程待下次会话启动后确认

## 备注
- 旧版二进制（0.158.0 / 0.162.1 runner、旧 daemon releases）保留未删，可后续清理。
