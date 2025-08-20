# 開発方法

## 環境構築

### wsl初期化

```
wsl --shutdown
wsl --list
wsl --unregister Ubuntu
wsl --list
```

### ubuntu導入

```
wsl --update
wsl --install Ubuntu
```

### windows 同居設定

sudo vim /etc/wsl.conf

```
[interop]
enabled = true
appendWindowsPath = false

[automount]
options = "metadata,umask=22,fmask=11"
```

### vscode 起動設定

vim ~/.bashrc

```
export PATH=$PATH:"/mnt/c/Program Files/Microsoft VS Code/bin"
```

code .

### docker 導入

※ https://blue3orz.com/setup-wsl2-docker-on-windows/

```
sudo apt update
sudo apt upgrade -y

sudo apt install ca-certificates curl software-properties-common gnupg lsb-release -y

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
 "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
 $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

sudo usermod -aG docker $USER
```

### node.js, npm導入

```
sudo npm install nodejs npm
```

## プロジェクト環境構築

- wsl2 で ubuntu を開く
  - ターミナルから`git clone https://github.com/taizod1024/astack.git` でリポジトリをクローンする
  - ターミナルから`cd astack`でクローンしたディレクトリに入る
  - ターミナルから`git checkout develop`で開発ブランチにする
  - ターミナルから`code .` で vscode を開く
  - ubuntu上のvscode ※開発コンテナはまだ開かない
    - ターミナルから `npm install` でライブラリをインストールする

      ```
      npm WARN deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
      npm WARN deprecated glob@8.1.0: Glob versions prior to v9 are no longer supported
      npm WARN deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
      npm WARN deprecated formidable@1.2.6: Please upgrade to latest, formidable@v2 or formidable@v3! Check these notes: https://bit.ly/2ZEqIau

      added 838 packages, and audited 839 packages in 16s

      135 packages are looking for funding
      run `npm fund` for details

      4 moderate severity vulnerabilities

      To address all issues (including breaking changes), run:
      npm audit fix --force

      Run `npm audit` for details.
      ```

    - ターミナルから `npx prisma generate` で Prisma クライアントを生成する

      ```
      Environment variables loaded from .env
      Prisma schema loaded from prisma/schema.prisma

      ✔ Generated Prisma Client (v6.14.0) to ./node_modules/@prisma/client in 61ms

      Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)

      Tip: Interested in query caching in just a few lines of code? Try Accelerate today! https://pris.ly/tip-3-accelerate
      ```

    ```

    ```

    - vscodeの左下の「WSL:Ubuntu」をクリックして「コンテナーで再度開く」を選択

  - 開発コンテナ上のvscode
    - prismaが.envを参照しているためコンテナ上で実施する
    - 【一括反映の場合】ターミナルから`npx prisma db push`を実施

      ```
      Environment variables loaded from .env
      Prisma schema loaded from prisma/schema.prisma
      Datasource "db": PostgreSQL database "astack_db", schema "public" at "astack-db:5432"

      The database is already in sync with the Prisma schema.

      ✔ Generated Prisma Client (v6.14.0) to ./node_modules/@prisma/client in 62ms
      ```

    - 【差分反映の場合】ターミナルから`npx prisma migrate dev` を実施

      ```
      Environment variables loaded from .env
      Prisma schema loaded from prisma/schema.prisma
      Datasource "db": PostgreSQL database "astack_db", schema "public" at "astack-db:5432"

      Applying migration `20250812061528_init_user`
      Applying migration `20250815063738_table_user_add_column`
      Applying migration `20250815161342_table_user_add_column`
      Applying migration `20250815161848_table_user_delete_column`

      The following migration(s) have been applied:

      migrations/
        └─ 20250812061528_init_user/
            └─ migration.sql
        └─ 20250815063738_table_user_add_column/
            └─ migration.sql
        └─ 20250815161342_table_user_add_column/
            └─ migration.sql
        └─ 20250815161848_table_user_delete_column/
            └─ migration.sql

      Your database is now in sync with your schema.

      ✔ Generated Prisma Client (v6.14.0) to ./node_modules/@prisma/client in 61ms
      ```

    - vscode を閉じる
    - docker ps でプロセスがなくなることを確認
    - vscode で開発コンテナを開く

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

## トラブル時

### 権限関連

```
sudo chown -R taizo:taizo \*
```
