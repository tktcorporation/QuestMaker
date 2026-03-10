export type WorkCategory = "live" | "game";

export interface Work {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: WorkCategory;
  image: string;
  /** VRChat ワールドページ等の外部リンク（任意） */
  externalUrl?: string;
  year: number;
}

export const works: Work[] = [
  {
    id: "sanrio",
    title: "QuestMaker featuring サンリオキャラクターズ",
    subtitle: "サンリオキャラたちのライブステージ",
    description:
      '"みんな仲良く"楽しいライブ！サンリオキャラクターズが歌って、踊って、会場をひとつに。みんな一緒に楽しめる特別なライブ体験をQuestMakerが担当しました。',
    category: "live",
    image: "/images/achievement1.webp",
    year: 2026,
  },
  {
    id: "metamog",
    title: "めたモグ",
    subtitle: "ふしぎな生き物をこぎみゅんと育てるゲームワールド",
    description:
      "不思議な世界で暮らす謎の生き物「モグ」。調査員としてこぎみゅんと一緒にモグのお世話をしながらモグについて調べてみよう！",
    category: "game",
    image: "/images/achievement2.webp",
    externalUrl: "https://vrch.at/hhc79ztx",
    year: 2026,
  },
  {
    id: "show-by-rock",
    title: "SHOW BY ROCK!! WORLD",
    subtitle: "ライブ演出など",
    description:
      "今日もどこかで素敵な音楽が鳴り響くMIDICITY。Mashumairesh!!・DOKONJOFINGERのライブ体験をQuestMakerが担当しました。",
    category: "live",
    image: "/images/achievement3.webp",
    externalUrl: "https://vrch.at/rbxx0bmg",
    year: 2026,
  },
];
