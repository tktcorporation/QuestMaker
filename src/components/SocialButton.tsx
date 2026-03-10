interface SocialButtonProps {
  variant: 'x' | 'booth'
  label?: string
  href: string
}

/**
 * X / BOOTH の外部リンクボタン。
 * ナビバーとフッターで共用する。variant で見た目を切り替え。
 */
export function SocialButton({ variant, label, href }: SocialButtonProps) {
  const styles = {
    x: 'bg-cta text-white',
    booth: 'bg-booth-red text-white',
  }

  const defaultLabels = {
    x: '\u{1d54f}',
    booth: 'BOOTH',
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[5px] text-[13px] font-medium ${styles[variant]}`}
    >
      {label ?? defaultLabels[variant]}
    </a>
  )
}
