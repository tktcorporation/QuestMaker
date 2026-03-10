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
