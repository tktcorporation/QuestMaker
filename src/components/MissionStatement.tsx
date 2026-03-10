import { Link } from '@tanstack/react-router'
import { buttonClass } from '~/components/ui/button'

/**
 * ミッション文 + CTA ボタン + グループ写真。
 * 左にVRChat集合写真、右にテキストの横並び。
 * モバイルでは写真→テキストの縦積み。
 */
export function MissionStatement() {
  return (
    <section className="px-7 py-14 bg-surface">
      <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* グループ写真 — ポラロイド風プリント写真 */}
        <div className="shrink-0 w-full md:w-[260px] -rotate-2 bg-white p-2 pb-8 shadow-md">
          <img
            src="/images/group-photo-1.webp"
            alt="VRChatでの集合写真"
            className="w-full aspect-[4/3] object-cover"
          />
        </div>

        {/* テキスト + CTA */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-[26px] md:text-[30px] font-extrabold leading-[1.4] tracking-[-0.02em] text-text mb-4">
            PCとQuestの垣根をなくし、みんなで一緒に楽しめる世界をつくりたい
          </h1>
          <p className="text-[15px] text-text-muted leading-[1.8] mb-8">
            そんな思いを胸に集まった仲間たちで結成したVRChatのクリエイターチームです。プラットフォームの壁を越えて「みんなで仲良く」楽しめるコンテンツを制作しています！
          </p>
          <div className="flex gap-3 justify-center md:justify-start">
            <Link to="/works" className={buttonClass('primary', 'lg')}>
              実績を見る
            </Link>
            <Link to="/members" className={buttonClass('secondary', 'lg')}>
              メンバーを見る
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
