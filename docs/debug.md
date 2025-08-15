# デバッグ

## astack-app

### wsl2の場合

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
  - デバッガをデタッチする
  - コンテナを停止する

### 開発コンテナの場合

- 準備
  - wsl2 の ubuntu 上を開く
  - `code .` で vscode を開く
  - git clone する
  - 開発コンテナを起動する、vscodeは開発コンテナ側を開く
- デバッグ開始
  - 「実行とデバッグ」で「Node.js: Attach」を選択する
- デバッグ終了
  - デバッガをデタッチする
  - コンテナを停止する
