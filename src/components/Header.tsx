import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { SocialButton } from './SocialButton'

/**
 * サイト共通ナビバー。
 * 左: ロゴ画像 + テキスト
 * 中央: ナビリンク (Top / Works / Members)
 * 右: X / BOOTH ボタン
 * モバイル: ハンバーガーメニューでナビ・ソーシャルを折りたたみ
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-surface border-b border-border">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-7 py-2">
        <Link to="/" className="flex items-center -my-3">
          <img
            src="/images/QuestMaker_Logo_alpha.png"
            alt="QuestMaker"
            className="h-[72px] md:h-[88px]"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6 text-sm text-text-muted">
            <Link
              to="/"
              className="link-hover"
              activeProps={{ className: 'text-text font-medium' }}
              activeOptions={{ exact: true }}
            >
              Top
            </Link>
            <Link
              to="/works"
              className="link-hover"
              activeProps={{ className: 'text-text font-medium' }}
            >
              Works
            </Link>
            <Link
              to="/members"
              className="link-hover"
              activeProps={{ className: 'text-text font-medium' }}
            >
              Members
            </Link>
          </nav>

          <div className="w-px h-4 bg-border" />

          <div className="flex gap-2">
            <SocialButton variant="x" href="https://x.com/QuestMaker_" compact />
            <SocialButton
              variant="booth"
              href="https://questmaker.booth.pm/"
              compact
            />
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-text"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border px-7 py-4 bg-surface">
          <nav className="flex flex-col gap-3 text-sm text-text-muted mb-4">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              activeProps={{ className: 'text-text font-medium' }}
              activeOptions={{ exact: true }}
            >
              Top
            </Link>
            <Link
              to="/works"
              onClick={() => setMenuOpen(false)}
              activeProps={{ className: 'text-text font-medium' }}
            >
              Works
            </Link>
            <Link
              to="/members"
              onClick={() => setMenuOpen(false)}
              activeProps={{ className: 'text-text font-medium' }}
            >
              Members
            </Link>
          </nav>
          <div className="flex gap-2">
            <SocialButton variant="x" href="https://x.com/QuestMaker_" compact />
            <SocialButton
              variant="booth"
              href="https://questmaker.booth.pm/"
              compact
            />
          </div>
        </div>
      )}
    </header>
  )
}
