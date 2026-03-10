import { XIcon, BoothIcon } from '~/components/ui/icons'

interface SocialButtonProps {
  variant: 'x' | 'booth'
  label?: string
  href: string
  /** ヘッダー用コンパクト表示。アイコンのみまたは短いラベル */
  compact?: boolean
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
