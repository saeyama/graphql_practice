# graphql_practice

GraphQLの仕組みを学ぶための練習用リポジトリです。[Apollo Server](https://www.apollographql.com/docs/apollo-server/)を使って、最小構成のGraphQL APIを立てています。

## できること

- プログラミング言語とその作者の一覧を取得する(`Query`)
- 新しい言語を追加する(`Mutation`)

データは `data.json` に保存されます。初回起動時に自動生成され、Mutationで追加したデータはサーバーを再起動しても残ります。`data.json` はローカルの実データという位置づけのため `.gitignore` に含めており、GitHubにはコミットされません。

## セットアップ

```bash
pnpm install
```

## 起動方法

```bash
node server.js
```

起動すると `http://localhost:4000/` でサーバーが立ち上がります。ブラウザでアクセスすると Apollo Sandbox (GUIツール) が開き、対話的にクエリを試せます。

## クエリ例

### 一覧を取得(Query)

```graphql
query {
  languages {
    name
    creator
  }
}
```

### 名前だけ取得(Query)

必要なフィールドだけを指定して取得できるのがGraphQLの特徴です。

```graphql
query {
  languages {
    name
  }
}
```

### 新しい言語を追加(Mutation)

```graphql
mutation {
  addLanguage(name: "TypeScript", creator: "アンダース・ヘルスバーグ") {
    name
    creator
  }
}
```

## curlで試す場合

```bash
curl -X POST http://localhost:4000/ \
  -H "Content-Type: application/json" \
  -d '{"query": "{ languages { name creator } }"}'
```

## 技術スタック

- Node.js
- pnpm
- [apollo-server](https://www.npmjs.com/package/apollo-server) (v3)

`apollo-server`(v3)はサポート終了(EOL)パッケージです。学習用にそのまま利用していますが、新規に作る場合は後継の[`@apollo/server`](https://www.npmjs.com/package/@apollo/server)(v4)の利用が推奨されています。
