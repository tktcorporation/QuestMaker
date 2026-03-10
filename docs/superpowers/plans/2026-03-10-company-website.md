# QuestMaker チームサイト実装計画

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** QuestMaker の公式サイト（3ページ: トップ/実績/メンバー）を TanStack Start + Cloudflare Workers で構築する

**Architecture:** TanStack Start (v1 RC) のファイルベースルーティングで3ページを構成。TailwindCSS v4 でスタイリング。`@cloudflare/vite-plugin` を使い Cloudflare Workers (Static Assets) にデプロイ。コンテンツデータは `src/data/` に TypeScript オブジェクトとして管理。

**Tech Stack:** TanStack Start, React 19, TailwindCSS v4, Vite, Cloudflare Workers, pnpm

**Spec:** `docs/superpowers/specs/2026-03-10-company-website-design.md`

---

## Chunk 1: プロジェクトセットアップ

### Task 1: プロジェクト初期化

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `wrangler.jsonc`
- Create: `src/router.tsx`
- Create: `src/styles/app.css`

- [ ] **Step 1: パッケージ初期化と依存関係インストール**

```bash
pnpm init
pnpm add @tanstack/react-start @tanstack/react-router react react-dom
pnpm add -D @types/react @types/react-dom typescript vite @vitejs/plugin-react @cloudflare/vite-plugin wrangler @tailwindcss/vite tailwindcss
```

- [ ] **Step 2: tsconfig.json を作成**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "paths": {
      "~/*": ["./src/*"]
    },
    "baseUrl": "."
  },
  "include": ["src/**/*", "vite.config.ts"]
}
```

- [ ] **Step 3: vite.config.ts を作成**

TanStack Start + Cloudflare + TailwindCSS の統合設定。

```typescript
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})
```

注意: `server.host: '0.0.0.0'` は devcontainer 環境でコンテナ外からアクセスするために必要。

- [ ] **Step 4: wrangler.jsonc を作成**

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "questmaker-web",
  "compatibility_date": "2025-09-02",
  "compatibility_flags": ["nodejs_compat"],
  "main": "@tanstack/react-start/server-entry"
}
```

- [ ] **Step 5: package.json の scripts を設定**

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "pnpm build && wrangler deploy",
    "typecheck": "tsc --noEmit"
  }
}
```

- [ ] **Step 6: src/router.tsx を作成**

```typescript
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  return createTanStackRouter({
    routeTree,
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
```

- [ ] **Step 7: src/styles/app.css を作成**

TailwindCSS v4 のエントリポイント + デザイントークン。

```css
@import 'tailwindcss';

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap');

@theme {
  --font-sans: 'Noto Sans JP', system-ui, -apple-system, sans-serif;
  --color-bg: #fafafa;
  --color-surface: #ffffff;
  --color-text: #222222;
  --color-text-muted: #999999;
  --color-text-subtle: #bbbbbb;
  --color-accent-green: #5bd88a;
  --color-accent-blue: #5bb8e8;
  --color-footer-bg: #f5f5f5;
  --color-border: #eeeeee;
  --color-cta: #333333;
  --color-booth-red: #fc4d50;
}
```

- [ ] **Step 8: 画像アセットを移行**

```bash
mkdir -p public/images
cp mockup/images/*.{png,jpg,webp} public/images/
```

- [ ] **Step 9: コミット**

```bash
jj describe -m "feat: initialize TanStack Start project with Cloudflare Workers

TanStack Start + React 19 + TailwindCSS v4 + @cloudflare/vite-plugin の
初期セットアップ。デザイントークン定義、画像アセット配置を含む。"
jj new
```

---

### Task 2: ルートレイアウト (__root.tsx)

**Files:**
- Create: `src/routes/__root.tsx`

- [ ] **Step 1: __root.tsx を作成**

HTML シェル + CSS 読み込み + Outlet。Header/Footer はまだプレースホルダー。

```tsx
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '~/styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'QuestMaker — VRChat Creative Team' },
      {
        name: 'description',
        content:
          'PCとQuestの垣根をなくし、みんなで一緒に楽しめる世界をつくるクリエイターチーム',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/images/QuestMaker_Logo_alpha.png' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg text-text font-sans antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: 最小の index.tsx を作成して動作確認**

```tsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">QuestMaker</h1>
    </div>
  )
}
```

- [ ] **Step 3: dev サーバー起動で動作確認**

```bash
pnpm dev
```

ブラウザで `http://localhost:3000` にアクセスし、「QuestMaker」が表示されることを確認。

- [ ] **Step 4: コミット**

```bash
jj describe -m "feat: add root layout and minimal index page

ルートレイアウト (__root.tsx) にHTML シェル、meta タグ、CSS 読み込みを設定。
最小の index ページで動作確認。"
jj new
```

---

## Chunk 2: データ層 + 共通コンポーネント

### Task 3: コンテンツデータ定義

**Files:**
- Create: `src/data/members.ts`
- Create: `src/data/works.ts`

- [ ] **Step 1: src/data/works.ts を作成**

モックアップの実績データを TypeScript の型付きオブジェクトとして定義。

```typescript
export type WorkCategory = 'live' | 'game'

export interface Work {
  id: string
  title: string
  subtitle: string
  description: string
  category: WorkCategory
  image: string
  /** VRChat ワールドページ等の外部リンク（任意） */
  externalUrl?: string
  year: number
}

export const works: Work[] = [
  {
    id: 'sanrio',
    title: 'QuestMaker featuring サンリオキャラクターズ',
    subtitle: 'サンリオキャラたちのライブステージ',
    description:
      '"みんな仲良く"楽しいライブ！サンリオキャラクターズが歌って、踊って、会場をひとつに。みんな一緒に楽しめる特別なライブ体験をQuestMakerが担当しました。',
    category: 'live',
    image: '/images/achievement1.webp',
    year: 2026,
  },
  {
    id: 'metamog',
    title: 'めたモグ',
    subtitle: 'ふしぎな生き物をこぎみゅんと育てるゲームワールド',
    description:
      '不思議な世界で暮らす謎の生き物「モグ」。調査員としてこぎみゅんと一緒にモグのお世話をしながらモグについて調べてみよう！',
    category: 'game',
    image: '/images/achievement2.webp',
    externalUrl: 'https://vrch.at/hhc79ztx',
    year: 2026,
  },
  {
    id: 'show-by-rock',
    title: 'SHOW BY ROCK!! WORLD',
    subtitle: 'ライブ演出など',
    description:
      '今日もどこかで素敵な音楽が鳴り響くMIDICITY。Mashumairesh!!・DOKONJOFINGERのライブ体験をQuestMakerが担当しました。',
    category: 'live',
    image: '/images/achievement3.webp',
    externalUrl: 'https://vrch.at/rbxx0bmg',
    year: 2026,
  },
]
```

- [ ] **Step 2: src/data/members.ts を作成**

```typescript
export interface Member {
  id: string
  name: string
  role: string
  roleLabel: string
  description: string
  image: string
  xUrl: string
  xHandle: string
}

export const members: Member[] = [
  {
    id: 'anoko',
    name: 'あの子',
    role: 'Director',
    roleLabel: 'green',
    description:
      "代表・ディレクター。『題名のないお茶会』や『劇団あのこ』などQuest対応イベントを主催。",
    image: '/images/veoxxxxxx.png',
    xUrl: 'https://x.com/veoxxxxxx',
    xHandle: '@veoxxxxxx',
  },
  {
    id: 'yassan',
    name: 'やっさん',
    role: 'VFX / Particles',
    roleLabel: 'blue',
    description:
      'ギミックやパーティクルなど演出担当。Quest等でもきれいに快適に見られるワールドを制作。',
    image: '/images/yassann357.jpg',
    xUrl: 'https://x.com/yassann357',
    xHandle: '@yassann357',
  },
  {
    id: 'gend',
    name: '元怒',
    role: '3D / Animation',
    roleLabel: 'green',
    description:
      'アニメーション・モデリング・パーティクル全般。アバターギミック制作やセットアップ代行も。',
    image: '/images/gend_VR.jpg',
    xUrl: 'https://x.com/gend_VR',
    xHandle: '@gend_VR',
  },
  {
    id: 'mosco',
    name: 'Mosco',
    role: 'Sound',
    roleLabel: 'blue',
    description:
      'MIX・SE・効果音の音響担当。名曲喫茶｢華麗堂｣主催、チャリティー活動も。',
    image: '/images/Mosco_Japan.jpg',
    xUrl: 'https://x.com/Mosco_Japan',
    xHandle: '@Mosco_Japan',
  },
  {
    id: 'taro',
    name: 'たろー',
    role: '2D Design',
    roleLabel: 'green',
    description:
      "バナー・イラスト・テクスチャ等の2Dデザイン。『劇団あのこ』のポスターも。",
    image: '/images/Taro3_taro.jpg',
    xUrl: 'https://x.com/Taro3_taro',
    xHandle: '@Taro3_taro',
  },
  {
    id: 'tkt',
    name: 'tkt',
    role: 'Tech Lead',
    roleLabel: 'blue',
    description:
      'スケジュール管理・Git等の技術フォロー。個人でWebアプリ開発も。',
    image: '/images/tktcorporation.jpg',
    xUrl: 'https://x.com/tktcorporation',
    xHandle: '@tktcorporation',
  },
]
```

- [ ] **Step 3: コミット**

```bash
jj describe -m "feat: add content data for works and members

モックアップのコンテンツを型付き TypeScript データとして定義。
works.ts に実績3件、members.ts にメンバー6名のデータを含む。"
jj new
```

---

### Task 4: 共通コンポーネント（Header, Footer, SocialButton）

**Files:**
- Create: `src/components/SocialButton.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/routes/__root.tsx` — Header/Footer を組み込む

- [ ] **Step 1: SocialButton を作成**

X と BOOTH の2種類をサポートするボタンコンポーネント。

```tsx
// src/components/SocialButton.tsx

interface SocialButtonProps {
  variant: 'x' | 'booth'
  label?: string
  href: string
}

/**
 * X / BOOTH の外部リンクボタン。
 * ナビバーとフッターで共用する。variant で見た目を切り替え。
 */
export function SocialButton({ variant, label, href }: SocialButtonProps) {
  const styles = {
    x: 'bg-cta text-white',
    booth: 'bg-booth-red text-white',
  }

  const defaultLabels = {
    x: '𝕏',
    booth: 'BOOTH',
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-[11px] font-medium ${styles[variant]}`}
    >
      {label ?? defaultLabels[variant]}
    </a>
  )
}
```

- [ ] **Step 2: Header を作成**

```tsx
// src/components/Header.tsx
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { SocialButton } from './SocialButton'

/**
 * サイト共通ナビバー。
 * 左: ロゴ画像 + テキスト
 * 中央: ナビリンク (Top / Works / Members)
 * 右: X / BOOTH ボタン
 * モバイル: ハンバーガーメニューでナビ・ソーシャルを折りたたみ
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-surface border-b border-border">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-7 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/QuestMaker_Logo_alpha.png"
            alt="QuestMaker"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-[15px] font-bold tracking-tight text-text">
            QuestMaker
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-5 text-[13px] text-text-muted">
            <Link
              to="/"
              activeProps={{ className: 'text-text font-medium' }}
              activeOptions={{ exact: true }}
            >
              Top
            </Link>
            <Link
              to="/works"
              activeProps={{ className: 'text-text font-medium' }}
            >
              Works
            </Link>
            <Link
              to="/members"
              activeProps={{ className: 'text-text font-medium' }}
            >
              Members
            </Link>
          </nav>

          <div className="w-px h-4 bg-border" />

          <div className="flex gap-2.5">
            <SocialButton variant="x" href="https://x.com/QuestMaker_" />
            <SocialButton
              variant="booth"
              href="https://questmaker.booth.pm/"
            />
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-text"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニューを開く"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen ? (
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" fill="none" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border px-7 py-4 bg-surface">
          <nav className="flex flex-col gap-3 text-[13px] text-text-muted mb-4">
            <Link to="/" onClick={() => setMenuOpen(false)} activeProps={{ className: 'text-text font-medium' }} activeOptions={{ exact: true }}>Top</Link>
            <Link to="/works" onClick={() => setMenuOpen(false)} activeProps={{ className: 'text-text font-medium' }}>Works</Link>
            <Link to="/members" onClick={() => setMenuOpen(false)} activeProps={{ className: 'text-text font-medium' }}>Members</Link>
          </nav>
          <div className="flex gap-2.5">
            <SocialButton variant="x" href="https://x.com/QuestMaker_" />
            <SocialButton variant="booth" href="https://questmaker.booth.pm/" />
          </div>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 3: Footer を作成**

```tsx
// src/components/Footer.tsx
import { SocialButton } from './SocialButton'

/**
 * サイト共通フッター。
 * 左: ロゴ + チーム説明
 * 右: X / BOOTH ボタン
 * 下部: コピーライト
 */
export function Footer() {
  return (
    <footer className="bg-footer-bg border-t border-border">
      <div className="max-w-[1200px] mx-auto px-7 py-8">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <img
              src="/images/QuestMaker_Logo_alpha.png"
              alt=""
              className="w-6 h-6 rounded-full"
            />
            <span className="text-[13px] font-bold text-text">
              QuestMaker
            </span>
          </div>
          <p className="text-[10px] text-text-subtle">
            Creative Team for VRChat
          </p>
        </div>
        <div className="flex flex-col gap-1.5 items-end">
          <SocialButton
            variant="x"
            label="𝕏 @QuestMaker_"
            href="https://x.com/QuestMaker_"
          />
          <SocialButton
            variant="booth"
            label="BOOTH ショップ"
            href="https://questmaker.booth.pm/"
          />
        </div>
      </div>
      <p className="text-center mt-5 text-[10px] text-text-subtle/50">
        &copy; 2026 QuestMaker. All rights reserved.
      </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: __root.tsx に Header/Footer を組み込む**

RootDocument の body 内を更新:

```tsx
<body className="bg-bg text-text font-sans antialiased">
  <Header />
  <main className="max-w-[1200px] mx-auto">{children}</main>
  <Footer />
  <Scripts />
</body>
```

Header, Footer を import に追加。

- [ ] **Step 5: dev サーバーで表示確認**

```bash
pnpm dev
```

ヘッダー（ロゴ + ナビ + X/BOOTH）とフッターが全ページで表示されることを確認。

- [ ] **Step 6: コミット**

```bash
jj describe -m "feat: add Header, Footer, and SocialButton components

共通レイアウトコンポーネントを実装。
Header: ロゴ + ナビリンク + X/BOOTH ボタン。
Footer: ロゴ + ソーシャルリンク + コピーライト。
SocialButton: X/BOOTH の共用ボタン。"
jj new
```

---

## Chunk 3: トップページ

### Task 5: トップページのセクションコンポーネント

**Files:**
- Create: `src/components/HeroSection.tsx`
- Create: `src/components/MissionStatement.tsx`
- Create: `src/components/WorksPreview.tsx`
- Create: `src/components/MemberPreview.tsx`
- Modify: `src/routes/index.tsx`

- [ ] **Step 1: HeroSection を作成**

```tsx
// src/components/HeroSection.tsx

/**
 * トップページのヒーロー画像。header.png をフルワイドで表示。
 * aspect-ratio: 3/1 でモックアップと同じ比率を維持。
 */
export function HeroSection() {
  return (
    <section
      className="w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/header.png')",
        aspectRatio: '3 / 1',
      }}
      role="img"
      aria-label="QuestMaker ヒーロー画像"
    />
  )
}
```

- [ ] **Step 2: MissionStatement を作成**

```tsx
// src/components/MissionStatement.tsx
import { Link } from '@tanstack/react-router'

/**
 * ミッション文 + CTA ボタン。ヒーロー画像直下に配置。
 * モックアップの原文をそのまま使用。
 */
export function MissionStatement() {
  return (
    <section className="px-7 py-12 bg-surface text-center">
      <h1 className="text-2xl font-extrabold leading-[1.45] tracking-tight text-text mb-3.5">
        PCとQuestの垣根をなくし、
        <br />
        みんなで一緒に楽しめる
        <br />
        世界をつくりたい
      </h1>
      <p className="text-[13px] text-text-muted leading-[1.8] mb-7 max-w-[480px] mx-auto">
        そんな思いを胸に集まった仲間たちで結成したVRChatのクリエイターチームです。
        <br />
        プラットフォームの壁を越えて「みんなで仲良く」楽しめるコンテンツを制作しています！
      </p>
      <div className="flex gap-2.5 justify-center">
        <Link
          to="/works"
          className="bg-cta text-white px-6 py-2.5 rounded-md text-[13px] font-semibold"
        >
          実績を見る
        </Link>
        <Link
          to="/members"
          className="border border-border text-text-muted px-6 py-2.5 rounded-md text-[13px]"
        >
          お問い合わせ
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: WorksPreview を作成**

Bento グリッド（1大 + 2小）で実績をプレビュー。

```tsx
// src/components/WorksPreview.tsx
import { Link } from '@tanstack/react-router'
import { works } from '~/data/works'

/**
 * トップページ用 Bento グリッド実績プレビュー。
 * 最初の実績を大きく、残りを小さく表示。
 */
export function WorksPreview() {
  const [featured, ...rest] = works

  return (
    <section className="px-7 py-12 bg-bg">
      <div className="flex justify-between items-baseline mb-6">
        <div>
          <p className="text-[10px] tracking-[3px] text-accent-blue mb-1 font-semibold">
            WORKS
          </p>
          <h2 className="text-xl font-bold tracking-tight text-text">
            制作実績
          </h2>
        </div>
        <Link to="/works" className="text-xs text-text-muted">
          すべて見る →
        </Link>
      </div>

      <div className="grid grid-cols-[3fr_2fr] gap-2.5">
        {/* Featured large card */}
        <div className="row-span-2 bg-surface rounded-[10px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full aspect-[16/10] object-cover"
          />
          <div className="p-4.5">
            <p className="text-[10px] text-accent-green mb-1.5 font-semibold">
              {featured.category === 'live' ? 'Live World' : 'Game World'}
            </p>
            <h3 className="text-sm font-semibold leading-snug text-text">
              {featured.title}
            </h3>
            <p className="text-[11px] text-text-muted mt-1.5">
              {featured.subtitle}
            </p>
          </div>
        </div>

        {/* Small cards */}
        {rest.map((work) => (
          <div
            key={work.id}
            className="bg-surface rounded-[10px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          >
            <img
              src={work.image}
              alt={work.title}
              className="w-full aspect-[16/9] object-cover"
            />
            <div className="p-3.5">
              <p
                className={`text-[10px] mb-1 font-semibold ${work.category === 'live' ? 'text-accent-green' : 'text-accent-blue'}`}
              >
                {work.category === 'live' ? 'Live World' : 'Game World'}
              </p>
              <h3 className="text-[13px] font-semibold text-text">
                {work.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: MemberPreview を作成**

```tsx
// src/components/MemberPreview.tsx
import { Link } from '@tanstack/react-router'
import { members } from '~/data/members'

/**
 * トップページ用メンバーアバター一覧。
 * 丸アイコン + 名前 + ロールをコンパクトに表示。
 */
export function MemberPreview() {
  return (
    <section className="px-7 py-12 bg-surface">
      <div className="text-center mb-7">
        <p className="text-[10px] tracking-[3px] text-accent-green mb-1 font-semibold">
          MEMBERS
        </p>
        <h2 className="text-xl font-bold tracking-tight text-text">
          QuestMakerのメンバー
        </h2>
        <p className="text-[13px] text-text-muted mt-2">
          個性豊かなクリエイターたちが集まって、楽しいワールドを作っています！
        </p>
      </div>

      <div className="flex gap-5 justify-center flex-wrap">
        {members.map((member) => (
          <div key={member.id} className="text-center w-[72px]">
            <img
              src={member.image}
              alt={member.name}
              className="w-[52px] h-[52px] rounded-full object-cover mx-auto mb-2 border-[1.5px] border-border"
            />
            <p className="text-[11px] font-semibold text-text">
              {member.name}
            </p>
            <p className="text-[9px] text-text-muted mt-0.5">{member.role}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-7">
        <Link
          to="/members"
          className="inline-block bg-cta text-white px-6 py-2.5 rounded-md text-[13px] font-semibold"
        >
          メンバーを見る
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: index.tsx を更新してセクションを組み合わせる**

```tsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '~/components/HeroSection'
import { MissionStatement } from '~/components/MissionStatement'
import { WorksPreview } from '~/components/WorksPreview'
import { MemberPreview } from '~/components/MemberPreview'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionStatement />
      <WorksPreview />
      <MemberPreview />
    </>
  )
}
```

- [ ] **Step 6: dev サーバーで表示確認**

```bash
pnpm dev
```

トップページにヒーロー画像 → ミッション文 → 実績プレビュー → メンバープレビューの4セクションが表示されることを確認。

- [ ] **Step 7: コミット**

```bash
jj describe -m "feat: implement top page with all sections

HeroSection, MissionStatement, WorksPreview, MemberPreview を実装。
ヒーロー画像 → ミッション文 → Bento グリッド実績 → メンバー一覧の構成。"
jj new
```

---

## Chunk 4: 実績ページ + メンバーページ

### Task 6: 実績ページ

**Files:**
- Create: `src/components/PageHeader.tsx`
- Create: `src/components/WorkFilter.tsx`
- Create: `src/components/WorkCard.tsx`
- Create: `src/routes/works.tsx`

- [ ] **Step 1: PageHeader を作成**

サブページ共通のタイトルヘッダー。左揃え、ラベル + タイトル + サブテキスト。

```tsx
// src/components/PageHeader.tsx

interface PageHeaderProps {
  label: string
  labelColor: 'green' | 'blue'
  title: string
  subtitle?: string
}

/**
 * 実績・メンバーページ共通のページタイトルヘッダー。
 * 左揃え。ラベル（小さな英字）+ 大きなタイトル + 説明文。
 */
export function PageHeader({
  label,
  labelColor,
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="px-7 pt-12 pb-6 bg-surface">
      <p
        className={`text-[10px] tracking-[3px] mb-2 font-semibold ${labelColor === 'green' ? 'text-accent-green' : 'text-accent-blue'}`}
      >
        {label}
      </p>
      <h1 className="text-[28px] font-extrabold tracking-[-0.03em] text-text">
        {title}
      </h1>
      {subtitle && (
        <p className="text-[13px] text-text-muted mt-2">{subtitle}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: WorkFilter を作成**

```tsx
// src/components/WorkFilter.tsx
import type { WorkCategory } from '~/data/works'

interface WorkFilterProps {
  active: 'all' | WorkCategory
  onChange: (filter: 'all' | WorkCategory) => void
}

const filters = [
  { key: 'all' as const, label: 'All' },
  { key: 'live' as const, label: 'Live' },
  { key: 'game' as const, label: 'Game' },
]

/**
 * 実績ページのカテゴリフィルター。アンダーラインタブ形式。
 */
export function WorkFilter({ active, onChange }: WorkFilterProps) {
  return (
    <div className="flex gap-5 px-7 pb-6 bg-surface border-b border-border">
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          className={`text-xs pb-2.5 transition-colors duration-150 ${
            active === f.key
              ? 'text-text font-medium border-b-[1.5px] border-text'
              : 'text-text-subtle'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: WorkCard を作成**

featured（大）と通常（小）の2パターンをサポート。

```tsx
// src/components/WorkCard.tsx
import type { Work } from '~/data/works'

interface WorkCardProps {
  work: Work
  featured?: boolean
}

/**
 * 実績カード。featured=true で大きめの表示、false で 2 カラムグリッド用。
 */
export function WorkCard({ work, featured = false }: WorkCardProps) {
  return (
    <div className="bg-surface rounded-[10px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <img
        src={work.image}
        alt={work.title}
        className={`w-full object-cover ${featured ? 'aspect-[2/1]' : 'aspect-[16/9]'}`}
      />
      <div className={featured ? 'p-6' : 'p-4'}>
        <div className="flex items-center gap-3 mb-2">
          <span
            className={`text-[10px] font-semibold ${work.category === 'live' ? 'text-accent-green' : 'text-accent-blue'}`}
          >
            {work.category === 'live' ? 'Live World' : 'Game World'}
          </span>
          <span className="text-[10px] text-text-subtle">{work.year}</span>
        </div>
        <h3
          className={`font-bold text-text ${featured ? 'text-lg tracking-tight mb-1.5' : 'text-sm'}`}
        >
          {work.title}
        </h3>
        {featured && (
          <p className="text-xs text-text-muted leading-[1.7] mt-1.5">
            {work.description}
          </p>
        )}
        {!featured && work.subtitle && (
          <p className="text-[11px] text-text-muted mt-1">{work.subtitle}</p>
        )}
        {work.externalUrl && (
          <a
            href={work.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2.5 text-[11px] text-text-subtle"
          >
            VRChatで見る →
          </a>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: works.tsx ルートを作成**

```tsx
// src/routes/works.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { PageHeader } from '~/components/PageHeader'
import { WorkFilter } from '~/components/WorkFilter'
import { WorkCard } from '~/components/WorkCard'
import { works, type WorkCategory } from '~/data/works'

export const Route = createFileRoute('/works')({
  component: WorksPage,
})

function WorksPage() {
  const [filter, setFilter] = useState<'all' | WorkCategory>('all')
  const filtered =
    filter === 'all' ? works : works.filter((w) => w.category === filter)
  const [featured, ...rest] = filtered

  return (
    <>
      <PageHeader
        label="WORKS"
        labelColor="blue"
        title="制作実績"
        subtitle="VRChat上で制作したワールド・コンテンツ"
      />
      <WorkFilter active={filter} onChange={setFilter} />

      <div className="px-7 py-6">
        {featured && <WorkCard work={featured} featured />}
      </div>

      {rest.length > 0 && (
        <div className="px-7 pb-10 grid grid-cols-2 gap-2.5">
          {rest.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 5: dev サーバーで `/works` を確認**

フィルタータブの切り替え、フィーチャーカードと2カラムグリッドが正しく表示されることを確認。

- [ ] **Step 6: コミット**

```bash
jj describe -m "feat: implement works page with filter and cards

PageHeader, WorkFilter, WorkCard コンポーネントを実装。
フィーチャーカード + 2カラムグリッド + カテゴリフィルター付き。"
jj new
```

---

### Task 7: メンバーページ

**Files:**
- Create: `src/components/MemberCard.tsx`
- Create: `src/routes/members.tsx`

- [ ] **Step 1: MemberCard を作成**

```tsx
// src/components/MemberCard.tsx
import type { Member } from '~/data/members'

/**
 * メンバーカード。横並びレイアウト: アイコン + 名前/ロール + 説明 + SNS。
 * roleLabel で緑 or 青のアクセントカラーを切り替え。
 */
export function MemberCard({ member }: { member: Member }) {
  return (
    <div className="bg-surface rounded-[10px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3.5 mb-3">
        <img
          src={member.image}
          alt={member.name}
          className="w-12 h-12 rounded-full object-cover shrink-0 border-[1.5px] border-border"
        />
        <div>
          <p className="text-sm font-semibold text-text">{member.name}</p>
          <p
            className={`text-[10px] mt-0.5 font-medium ${member.roleLabel === 'green' ? 'text-accent-green' : 'text-accent-blue'}`}
          >
            {member.role}
          </p>
        </div>
      </div>
      <p className="text-[11px] text-text-muted leading-relaxed">
        {member.description}
      </p>
      <a
        href={member.xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-[10px] text-text-subtle"
      >
        {member.xHandle}
      </a>
    </div>
  )
}
```

- [ ] **Step 2: members.tsx ルートを作成**

```tsx
// src/routes/members.tsx
import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/PageHeader'
import { MemberCard } from '~/components/MemberCard'
import { members } from '~/data/members'

export const Route = createFileRoute('/members')({
  component: MembersPage,
})

function MembersPage() {
  return (
    <>
      <PageHeader
        label="MEMBERS"
        labelColor="green"
        title="メンバー紹介"
        subtitle="個性豊かなクリエイターたちが集まって、楽しいワールドを作っています"
      />

      <div className="px-7 py-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </>
  )
}
```

- [ ] **Step 3: dev サーバーで `/members` を確認**

6名のメンバーカードが 2 カラムグリッドで表示されること、各カードにアイコン・名前・ロール・説明・SNSリンクがあることを確認。

- [ ] **Step 4: コミット**

```bash
jj describe -m "feat: implement members page with member cards

MemberCard コンポーネントを実装。2カラムグリッドでメンバー6名を表示。
横並びレイアウト（アイコン + 名前/ロール + 説明 + SNS）。"
jj new
```

---

## Chunk 5: ビルド確認 + 仕上げ

### Task 8: ビルド確認と .gitignore 整理

**Files:**
- Create or modify: `.gitignore`

- [ ] **Step 1: ビルドが通ることを確認**

```bash
pnpm build
```

エラーなくビルドが完了すること。`.output/` ディレクトリが生成されること。

- [ ] **Step 2: .gitignore を整理**

```bash
cat >> .gitignore << 'EOF'
node_modules/
.output/
.wrangler/
.superpowers/
EOF
```

- [ ] **Step 3: 全ページの動作確認**

```bash
pnpm preview
```

- `/` — ヒーロー画像、ミッション文、実績プレビュー、メンバープレビューが表示される
- `/works` — フィルターが動作する、カードが正しく表示される
- `/members` — 6名のカードが表示される
- ナビリンクで各ページ間を遷移できる
- X / BOOTH ボタンが外部リンクとして機能する

- [ ] **Step 4: changeset ファイルを作成**

PR の CI (Changeset Check) を通すために必要。

```bash
mkdir -p .changeset
cat > .changeset/add-team-website.md << 'EOF'
---
"cross-recorder": minor
---

QuestMaker チームサイトを TanStack Start + Cloudflare Workers で構築
EOF
```

- [ ] **Step 5: コミット**

```bash
jj describe -m "chore: add .gitignore, changeset, and verify build

.gitignore にビルド出力・node_modules を追加。changeset ファイルを作成。
pnpm build / pnpm preview で全ページの動作確認済み。"
jj new
```

---

## 完了条件

- [ ] 3ページ（トップ/実績/メンバー）が正しく表示される
- [ ] ナビゲーションで各ページ間を遷移できる
- [ ] 実績ページのフィルターが動作する
- [ ] X / BOOTH リンクがナビバーとフッターに表示される
- [ ] `pnpm build` がエラーなく完了する
- [ ] `pnpm preview` で全ページが動作する
