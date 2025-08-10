# ベースイメージ
FROM node:20-bullseye

# 作業ディレクトリ作成
WORKDIR /usr/src/app

# 必要なパッケージインストール（例: git, openssl, nano）
RUN apt-get update && apt-get install -y git openssl nano && rm -rf /var/lib/apt/lists/*

# ホストからpackage.jsonがあればコピー
COPY package*.json ./

# 依存関係インストール
RUN npm install || true

# ポート開放（例: 3000）
EXPOSE 3000

# デフォルトコマンド
CMD ["bash"]
