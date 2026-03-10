interface SocialButtonProps {
  variant: 'x' | 'booth'
  label?: string
  href: string
  /** ヘッダー用コンパクト表示。アイコンのみまたは短いラベル */
  compact?: boolean
}

/**
 * X (旧Twitter) アイコン。公式ロゴの形状を再現。
 * compact=true のヘッダーではアイコンのみ、フッターではラベル付き。
 */
function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

/**
 * BOOTH 公式アイコン。logo_icon.svg の白いマーク部分のみ抽出。
 * 赤背景は SocialButton 側の bg-booth-red で表現するため、
 * アイコン自体は currentColor で描画。
 */
function BoothIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="140 140 744 744" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M773.828 438.341V389.068L650.744 192H608.227L541.093 353.238L475.077 214.446L438.138 214.382L326.272 478.653V227.833H250.172V250.007H192V327.26H250.172V550.306C250.172 570.098 266.227 586.141 286.004 586.141H324.033V832L401.683 831.946C401.683 831.946 401.695 720.762 401.695 720.644C401.695 658.964 455.026 608.963 520.963 608.563C521.198 608.563 521.445 608.535 521.707 608.535H521.744H521.786H521.875C629.722 608.612 717.139 690.28 717.139 790.983V832H773.828V611.427H832V489.487L773.828 438.341Z" />
    </svg>
  )
}

/**
 * X / BOOTH の外部リンクボタン。
 * ナビバーとフッターで共用。compact=true でヘッダー用のコンパクト表示。
 *
 * ヘッダー: アイコン+短ラベルの小さなピル型
 * フッター: アイコン+テキストのリンク風
 */
export function SocialButton({ variant, label, href, compact }: SocialButtonProps) {
  const icon = variant === 'x' ? <XIcon size={compact ? 13 : 14} /> : <BoothIcon size={compact ? 13 : 14} />

  if (compact) {
    const styles = {
      x: 'bg-cta text-white',
      booth: 'bg-booth-red text-white',
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-1.5 rounded-full text-[13px] font-medium btn-hover ${styles[variant]} ${
          label ? 'px-3 py-1' : 'w-8 h-8'
        }`}
      >
        {icon}
        {label && <span>{label}</span>}
      </a>
    )
  }

  const textColor = variant === 'x' ? 'text-text-muted' : 'text-booth-red'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-[13px] font-medium link-hover ${textColor}`}
    >
      {icon}
      <span>{label}</span>
    </a>
  )
}
