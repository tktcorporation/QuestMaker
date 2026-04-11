# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QuestMaker は VRChat クリエイティブチームの静的ウェブサイト。チームの実績（ワールド作品）とメンバーを紹介する。

- **フレームワーク**: TanStack Start v1 (RC) — SSG + クライアントサイドルーティング
- **UI**: React 19 + Tailwind CSS v4 + Noto Sans JP
- **デプロイ**: Cloudflare Workers (Wrangler)
- **パッケージマネージャ**: pnpm
- **Node**: >= 22

## Commands

```bash
# 開発サーバー (port 3000)
pnpm dev

# ビルド
pnpm build

# テスト
pnpm test                # 全テスト実行 (vitest run)
pnpm test -- <pattern>   # パターンに一致するテストのみ実行

# Lint & Format
pnpm lint                # oxlint (type-aware)
pnpm lint:fix            # oxlint --fix
pnpm fmt                 # oxfmt --write
pnpm fmt:check           # oxfmt --check (CI で使用)
pnpm check               # lint + fmt:check (CI 相当の一括チェック)

# デプロイ
pnpm deploy              # build + wrangler deploy
```

## CI Checks

CI (`.github/workflows/ci.yml`) は push/PR で以下を実行する:
1. `pnpm lint` + `pnpm fmt:check`
2. `pnpm build`
3. `pnpm test`

push 前にこの 3 つをローカルで通すこと。

## Architecture

### ルーティング (TanStack Router)

`src/routes/` 内のファイルがファイルベースルーティングで自動登録される。`src/routeTree.gen.ts` は自動生成ファイル（編集不可）。

- `__root.tsx` — 全ページ共通レイアウト (Header + Footer)
- `index.tsx` — `/` トップページ
- `works.tsx` — `/works` 実績一覧
- `members.tsx` — `/members` メンバー一覧

### データフロー

データベースや API は無い。コンテンツは `src/data/` の TypeScript 定数で管理:
- `members.ts` — メンバー情報 (名前, 役職, SNS, 画像パス)
- `works.ts` — 作品情報 (タイトル, カテゴリ, 説明, 画像パス)

新しいメンバーや作品を追加する場合はこれらのファイルを編集し、画像を `public/images/` に配置する。

### スタイリング

Tailwind CSS v4 を使用。デザイントークン（カラー・フォント）は `src/styles/app.css` の `@theme` ブロックで定義。色名は `bg`, `surface`, `text`, `text-muted`, `accent-green`, `accent-blue`, `cta`, `booth-red` など。

UI プリミティブは `src/components/ui/` に集約。

### ビルド・デプロイパイプライン

Vite が TanStack Start プラグイン + Cloudflare プラグインで SSG ビルドし、Wrangler が Cloudflare Workers にデプロイする。`vite.config.ts` のプラグイン順序に依存関係がある。

### パスエイリアス

- `~/` → `src/` (tsconfig `paths`)
- `#/` → `src/` (package.json `imports`)

### 日本語テキスト処理

`word-break: auto-phrase` (Chrome 119+ BudouX) で自然な文節改行を実現。`text-wrap: pretty` で孤立語を軽減。この設定は `src/styles/app.css` のグローバル HTML スタイルにある。

## Linting & Formatting

- **Linter**: oxlint (TypeScript type-aware, React, jsx-a11y, import プラグイン有効)
- **Formatter**: oxfmt
- 設定: `.oxlintrc.json`, `.oxfmtrc.json`
- `routeTree.gen.ts` は lint/format 対象外 (自動生成)
