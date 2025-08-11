# デバッグ

## astack-app

### デバッグ方法

- wsl2 の ubuntu 上を開く
- `code .` で vscode を開く
- git clone する
- `docker compose -f docker-compose.dev.yml up` でコンテナを起動する
- 「実行とデバッグ」で「Node.js: Attach」を選択する

### 開発コンテナ

- 実行中のコンテナの内部状況を確認する場合にしか使用しない
- 動作には他のコンテナが起動している必要があるため単独で実行する場合がない
- git が入っていない、user.name, user.email が設定されていないのでコミットできない
