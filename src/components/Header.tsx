import { useState } from 'react'
import { Link } from '@tanstack/react-router'
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
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-7 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/QuestMaker_Logo_alpha.png"
            alt="QuestMaker"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-[15px] font-bold tracking-tight text-text">
            QuestMaker
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-5 text-[13px] text-text-muted">
            <Link
              to="/"
              activeProps={{ className: 'text-text font-medium' }}
              activeOptions={{ exact: true }}
            >
              Top
            </Link>
            <Link
              to="/works"
              activeProps={{ className: 'text-text font-medium' }}
            >
              Works
            </Link>
            <Link
              to="/members"
              activeProps={{ className: 'text-text font-medium' }}
            >
              Members
            </Link>
          </nav>

          <div className="w-px h-4 bg-border" />

          <div className="flex gap-2.5">
            <SocialButton variant="x" href="https://x.com/QuestMaker_" />
            <SocialButton
              variant="booth"
              href="https://questmaker.booth.pm/"
            />
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-text"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen ? (
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            ) : (
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border px-7 py-4 bg-surface">
          <nav className="flex flex-col gap-3 text-[13px] text-text-muted mb-4">
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
          <div className="flex gap-2.5">
            <SocialButton variant="x" href="https://x.com/QuestMaker_" />
            <SocialButton
              variant="booth"
              href="https://questmaker.booth.pm/"
            />
          </div>
        </div>
      )}
    </header>
  )
}
