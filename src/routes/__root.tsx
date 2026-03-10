import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "~/styles/app.css?url";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

/**
 * ルートレイアウト。
 * HTML シェル、meta タグ、グローバル CSS の読み込みを担当する。
 * Header と Footer で全ページ共通のナビゲーションを提供。
 */
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "QuestMaker — VRChat Creative Team" },
      {
        name: "description",
        content:
          "PCとQuestの垣根をなくし、みんなで一緒に楽しめる世界をつくるVRChatクリエイターチーム「QuestMaker」の公式サイトです。",
      },
      // OGP
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "QuestMaker" },
      {
        property: "og:title",
        content: "QuestMaker — VRChat Creative Team",
      },
      {
        property: "og:description",
        content:
          "PCとQuestの垣根をなくし、みんなで一緒に楽しめる世界をつくるVRChatクリエイターチーム",
      },
      { property: "og:image", content: "/images/header.png" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "QuestMaker — VRChat Creative Team",
      },
      {
        name: "twitter:description",
        content:
          "PCとQuestの垣根をなくし、みんなで一緒に楽しめる世界をつくるVRChatクリエイターチーム",
      },
      { name: "twitter:image", content: "/images/header.png" },
      // Theme
      { name: "theme-color", content: "#f9f8f7" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/images/QuestMaker_Logo_alpha.png" },
      { rel: "apple-touch-icon", href: "/images/QuestMaker_Logo_alpha.png" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
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
  );
}
