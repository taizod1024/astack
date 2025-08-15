# タスク

## 今後の TODO

### 基盤構築

#### 優先度高

- [x] Docker 環境構築
- [x] postgresql セットアップ
- [x] 設定値の.env 化
- [x] Node.js/TypeScript 初期化
- [x] Prisma セットアップ
- [x] docker-compose.yml を dev と prod に分ける
- [x] デバッグ実行対応
- [x] Express 実装
- [x] Express 実装テスト
- [x] テストコード作成
- [x] Prisma 設定追加
- [x] Prisma スキーマ設計
- [x] AdminJS ログイン画面実装
- [x] Userテーブル追加
- [x] RestAPI 実装
- [x] 開発コンテナ拡張機能インストール
- [x] 開発中はdocker-compose.ymlを使用
- [ ] コンテナ階層化によるカスタマイズ
  - [x] システム構成案
- [x] DBカラム追加時の挙動確認・対処方法確認
  - PrismaのスキーマがAdminJSに反映されない場合で対応済み
- [ ] ログ管理
- [ ] 運用管理

#### 優先度中

- [ ] トラブル対応
  - [x] 開発コンテナを立ち上げてもhttp://localhost:3000/adminjs にアクセスできない場合
    - `.devcontainer/docker-compose.yml`のcommandがsleep infinityになっていることが原因
  - [x] PrismaのスキーマがAdminJSに反映されない場合
    - AdminJSはnode_modules/@prisma/clientを参照している模様。そのためschema.prismaのoutputを指定してはスキーマの変更を反映できない。
    - 正しい手順は①schema.prismaを修正、②npx prisma migration devを実行、③npx prisma generateを実行、④コンテナを再起動
  - [x] AdminJSが起動しない場合
    - 開発コンテナを立ち上げてもhttp://localhost:3000/adminjs にアクセスできない場合と同じ
  - [ ] 操作しているとroot:rootに代わってしまう。
    - 修正方法は`sudo chown -R taizo:taizo *`
    - 開発コンテナ起動時にrootでnpm installされている可能性あり
  - [x] AdminJSのプロファイルが表示されない場合
    - rootpathを/astrackに変更するとプロファイルボタンが表示されない。/adminにすると表示されるので
    - [ ] /astrackにしてもプロファイルボタンを表示するようにする

#### 優先度低

- [ ] RestAPI 自動生成
- [ ] AdminJS メニュー画面実装
- [ ] AdminJS 文言カスタマイズ
- [ ] Prisma マイグレーション確認
- [ ] Prisma 暗号化
- [ ] Prisma レプリケーション
- [ ] Prisma シード生成
- [ ] Prisma 論理削除

#### 参考

- https://zenn.dev/sonicmoov/articles/86b62b88206e27

### 業務アプリ作成

- [ ] 業務ロジック設計・実装
- [ ] UI/ロジックの継承・参照設計
- [ ] 業務アプリのサンプル作成

### カスタマイズ・SaaS 展開

- [ ] 参照型カスタマイズ機能実装
- [ ] 継承型カスタマイズ機能実装
- [ ] SaaS 提供機能設計・実装

### 業務アプリ作成

- [ ] 業務ロジック設計・実装
- [ ] UI/ロジックの継承・参照設計
- [ ] 業務アプリのサンプル作成

### カスタマイズ・SaaS 展開

- [ ] 参照型カスタマイズ機能実装
- [ ] 継承型カスタマイズ機能実装
- [ ] SaaS 提供機能設計・実装
