# デバッグ

## astack-app

### デバッグ方法

- 準備
  - wsl2 の ubuntu 上を開く
  - `code .` で vscode を開く
  - git clone する
- デバッグ開始
  - 以下のいずれかの方法でコンテナを起動する
  - `docker compose -f docker-compose.dev.yml up` でコンテナを起動する
  - `npm run dev:up` でコンテナを起動する
  - 「実行とデバッグ」で「Node.js: Attach」を選択する
- デバッグ終了
  - デバッガをでタッチする
  - コンテナを停止する

### 開発コンテナ

- 実行中のコンテナの内部状況を確認する場合にのみ使用する
- 動作には他のコンテナが起動している必要があるため単独で実行する場合がない
- git が入っていない、user.name, user.email が設定されていないのでコミットできない
