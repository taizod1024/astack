# 開発方法

## 初期化方法

- wsl2 で ubuntu を開く
  - ターミナルから`git clone https://github.com/taizod1024/astack.git` でリポジトリをクローンする
  - ターミナルから`git checkout develop`で開発ブランチにする
  - ターミナルから`code .` で vscode を開く
  - ubuntu上のvscode ※開発コンテナはまだ開かない
    - ターミナルから `npm install` でライブラリをインストールする
    - ターミナルから `npx prisma generate` で Prisma クライアントを生成する
    - vscodeの左下の「WSL:Ubuntu」をクリックして「コンテナーで再度開く」を選択
  - 開発コンテナ上のvscode
    - ターミナルから`npx prisma migrate dev` を実施 ※prismaが.envを参照しているためコンテナ上で実施する
    - vscodeを閉じて再度開く
  - 開発コンテナ上のvscode
    - http://localhost:3000/admin を開いて起動確認

## デバッグ方法

### wsl2の場合

- デバッグ開始
  - 以下のいずれかの方法でコンテナを起動する
  - `docker compose -f docker-compose.dev.yml up` でコンテナを起動する
  - `npm run dev:up` でコンテナを起動する
  - 「実行とデバッグ」で「Node.js: Attach」を選択する
- デバッグ終了
  - デバッガをデタッチする
  - コンテナを停止する

### 開発コンテナの場合

- デバッグ開始
  - 「実行とデバッグ」で「Node.js: Attach」を選択する
- デバッグ終了
  - デバッガをデタッチする、もしくはvscodeを閉じる

## テーブル変更方法

- `schema.prisma`を変更
- `docker compose up -d`でコンテナを起動
- `npx prisma migrate dev --name <migration_name>` でastack-dbのマイグレーションを実施、ただし、.envファイルの`DATABASE_URL`を使用するため開発コンテナから実行すること
- `npx prisma generate`で astack-dbを元にastack-appのPrisma クライアントを更新する
- `docker compose restart` でコンテナを再起動
