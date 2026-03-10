import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '~/styles/app.css?url'
import { Header } from '~/components/Header'
import { Footer } from '~/components/Footer'

/**
 * ルートレイアウト。
 * HTML シェル、meta タグ、グローバル CSS の読み込みを担当する。
 * Header と Footer で全ページ共通のナビゲーションを提供。
 */
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
        <Header />
        <main>{children}</main>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
