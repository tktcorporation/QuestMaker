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
              label={'\u{1d54f} @QuestMaker_'}
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
