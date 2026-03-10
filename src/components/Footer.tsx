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
            <img
              src="/images/QuestMaker_Logo_alpha.png"
              alt="QuestMaker"
              className="h-10 mb-2"
            />
            <p className="text-[13px] text-text-subtle">
              Creative Team for VRChat
            </p>
          </div>
          <div className="flex flex-col gap-2.5 items-end">
            <SocialButton
              variant="x"
              label="@QuestMaker_"
              href="https://x.com/QuestMaker_"
            />
            <SocialButton
              variant="booth"
              label="BOOTH ショップ"
              href="https://questmaker.booth.pm/"
            />
          </div>
        </div>
        <p className="text-center mt-5 text-[13px] text-text-subtle/50">
          &copy; 2026 QuestMaker. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
