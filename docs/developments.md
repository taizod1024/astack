# 開発方法

## 初期化方法

- wsl2 の ubuntu 上を開く
- git clone する
- `code .` で vscode を開く ※開発コンテナはまだ開かない
- `git checkout develop`して開発ブランチにする
- `npm install`してライブラリをインストールする
- `npx prisma generate`して Prisma クライアントを生成する
- 左下の「WSL:Ubuntu」をクリックして「コンテナーで再度開く」を選択
- `npx prisma migrate dev` を実施
- [コンテナ起動完了](http://localhost:3000/astack)

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
