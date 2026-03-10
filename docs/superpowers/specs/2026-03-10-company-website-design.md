# QuestMaker チームサイト設計

## 概要

QuestMaker（VRChat クリエイターチーム）の公式サイト。クライアント向けに実績・メンバーを紹介する静的サイト。

## 技術スタック

| レイヤー | 技術 |
|---|---|
| フレームワーク | TanStack Start (v1 RC) |
| UI | React 19 + TailwindCSS v4 |
| ビルド | Vite |
| デプロイ | Cloudflare Workers (Static Assets) |
| Cloudflare連携 | `@cloudflare/vite-plugin` |
| パッケージ管理 | pnpm |
| VCS | jj (Jujutsu) |

### スタック選定理由

- **TanStack Start**: SSG対応、Viteベース、Cloudflare Workers の公式サポートあり。将来 SSR/server function が必要になっても対応可能
- **Cloudflare Workers (Static Assets)**: Cloudflare Pages は Workers への統合が進行中。新規プロジェクトは Workers + Static Assets が推奨
- **TailwindCSS v4**: ユーティリティファーストで高速なスタイリング。デザイントークンの管理に適する

## ページ構成

3ページ構成:

1. **トップページ** (`/`) — ヒーロー画像 + ミッション + 実績プレビュー + メンバープレビュー
2. **実績ページ** (`/works`) — フィルター付き実績一覧
3. **メンバーページ** (`/members`) — メンバーカード一覧

## ディレクトリ構成

```
/
├── src/
│   ├── routes/
│   │   ├── __root.tsx          # ルートレイアウト（Header + Footer）
│   │   ├── index.tsx           # トップページ
│   │   ├── works.tsx           # 実績ページ
│   │   └── members.tsx         # メンバーページ
│   ├── components/
│   │   ├── Header.tsx          # ナビバー（ロゴ + ナビ + X/BOOTHボタン）
│   │   ├── Footer.tsx          # フッター（ロゴ + X/BOOTHボタン + コピーライト）
│   │   ├── HeroSection.tsx     # ヒーロー画像（header.png フルワイド）
│   │   ├── MissionStatement.tsx # ミッション文 + CTAボタン
│   │   ├── WorksPreview.tsx    # トップページ用 Bento グリッド実績プレビュー
│   │   ├── MemberPreview.tsx   # トップページ用 メンバーアバター一覧
│   │   ├── PageHeader.tsx      # サブページ用タイトルヘッダー
│   │   ├── WorkCard.tsx        # 実績カード（画像 + カテゴリ + タイトル + 説明）
│   │   ├── WorkFilter.tsx      # カテゴリフィルター（アンダーラインタブ）
│   │   ├── MemberCard.tsx      # メンバーカード（横並び: アイコン + 名前 + ロール + 説明 + SNS）
│   │   └── SocialButton.tsx    # X / BOOTH ボタン（共通）
│   ├── data/
│   │   ├── members.ts          # メンバーデータ（名前、ロール、説明、SNS、画像パス）
│   │   └── works.ts            # 実績データ（タイトル、カテゴリ、説明、画像パス、リンク）
│   └── styles/
│       └── app.css             # Tailwind エントリポイント + カスタムプロパティ
├── public/
│   └── images/                 # 画像アセット（mockup/images/ から移行）
├── vite.config.ts
├── wrangler.jsonc
└── package.json
```

## デザイン仕様

### テーマ: ライト

ロゴのポップなトーンに合わせた明るいテーマ。

### カラーパレット

| 用途 | カラー | 備考 |
|---|---|---|
| Background | `#fafafa` | オフホワイト |
| Surface (カード) | `#ffffff` | |
| Text | `#222222` | pure black を避ける |
| Text Muted | `#999999` | |
| Text Subtle | `#bbbbbb` | SNSリンク等 |
| Accent Green | `#5bd88a` | ロゴ緑の彩度を落とした版 |
| Accent Blue | `#5bb8e8` | ロゴ青の彩度を落とした版 |
| Footer BG | `#f5f5f5` | |
| Border | `#eeeeee` | 1px ボーダー |
| CTA Primary | `#333333` | ダーク系ボタン |
| BOOTH Red | `#fc4d50` | BOOTH ブランドカラー |

### タイポグラフィ

- フォント: `system-ui, -apple-system, sans-serif`（日本語は Noto Sans JP を検討）
- 見出し（ページタイトル）: 28px, weight 800, letter-spacing -0.03em
- 見出し（セクション）: 20px, weight 700, letter-spacing -0.02em
- 本文: 13px, color #888, line-height 1.8
- ラベル: 10px, letter-spacing 3px, uppercase, weight 600, アクセントカラー
- heading line-height: 1.35-1.45

### レイアウト原則

- **8px グリッドシステム**: spacing は 4/8/12/16/24/28/32/48/64px
- **max-width**: コンテナ 1200px
- **ヒーローセクション**: 中央揃え（ミッション文）
- **サブページタイトル**: 左揃え
- **カード shadow**: `0 1px 3px rgba(0,0,0,0.04)` — 控えめ
- **border-radius**: カード 10px, ボタン 6px, ソーシャルボタン 5px
- **セクション間余白**: 48px padding

### コンポーネント詳細

#### Header
- 白背景、下部に 1px ボーダー
- 左: QuestMaker ロゴ画像 (32px) + テキスト
- 中: ナビリンク（Top / Works / Members）
- 右: X ボタン（黒背景）+ BOOTH ボタン（赤背景）
- モバイルではハンバーガーメニューに折りたたみ

#### トップページ構成
1. **HeroSection**: `header.png` をフルワイドで表示（aspect-ratio: 3/1）
2. **MissionStatement**: ミッション文 + 「実績を見る」CTA + 「お問い合わせ」CTA
3. **WorksPreview**: Bento グリッド（1大 + 2小）+ 「すべて見る →」リンク
4. **MemberPreview**: メンバーアバター6つ + 「メンバーを見る」CTA

#### 実績ページ構成
1. **PageHeader**: 左揃えタイトル「制作実績」
2. **WorkFilter**: アンダーラインタブ（All / Live / Game）
3. **WorkCard[]**: フィーチャーカード（1つ大きく） + 残りを 2カラムグリッド

#### メンバーページ構成
1. **PageHeader**: 左揃えタイトル「メンバー紹介」
2. **MemberCard[]**: 2カラムグリッド、横並びレイアウト（アイコン + 名前/ロール + 説明 + SNS）

### ソーシャルリンク配置

X (`@QuestMaker_`) と BOOTH ショップは以下に配置:
- **ナビバー右端**: 常時表示、ボタンスタイル
- **フッター**: ボタンスタイルで再掲

## ビルド・デプロイ

1. `pnpm build` → Vite が静的アセット + Worker エントリを生成
2. Cloudflare Workers にデプロイ（Git 連携 or `wrangler deploy`）
3. 静的ファイルは Worker を経由せず直接配信（Static Assets）

### 現段階の方針

- SSG / プリレンダリングで静的出力。Worker のサーバーサイド処理は使わない
- コンテンツ（メンバー・実績）は `src/data/` に TypeScript オブジェクトとして管理
- 画像は `public/images/` に配置（mockup/images/ から移行）

## 将来の拡張

- お問い合わせフォーム: TanStack Start の server function で実装可能
- CMS 連携: 必要になれば `src/data/` を CMS API 呼び出しに置き換え
- ダークモード: CSS custom properties ベースで切り替え可能な設計にしておく
