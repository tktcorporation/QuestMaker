import { Link } from '@tanstack/react-router'
import { buttonClass } from '~/components/ui/button'

/**
 * ミッション文 + CTA ボタン。ヒーロー画像直下に配置。
 * モックアップの原文をそのまま使用。
 */
export function MissionStatement() {
  return (
    <section className="px-7 pt-6 pb-16 bg-surface text-center">
      <h1 className="text-[28px] md:text-[32px] font-extrabold leading-[1.4] tracking-[-0.02em] text-text mb-4 max-w-[600px] mx-auto">
        PCとQuestの垣根をなくし、みんなで一緒に楽しめる世界をつくりたい
      </h1>
      <p className="text-[15px] text-text-muted leading-[1.8] mb-8 max-w-[540px] mx-auto">
        そんな思いを胸に集まった仲間たちで結成したVRChatのクリエイターチームです。プラットフォームの壁を越えて「みんなで仲良く」楽しめるコンテンツを制作しています！
      </p>
      <div className="flex gap-3 justify-center">
        <Link to="/works" className={buttonClass('primary', 'lg')}>
          実績を見る
        </Link>
        <Link to="/members" className={buttonClass('secondary', 'lg')}>
          メンバーを見る
        </Link>
      </div>
    </section>
  )
}
