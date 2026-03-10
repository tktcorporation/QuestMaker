import { createFileRoute } from '@tanstack/react-router'

/**
 * メンバー紹介ページ。
 * Task 7 で実装予定。現時点ではプレースホルダー。
 */
export const Route = createFileRoute('/members')({
  component: MembersPage,
})

function MembersPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-7 py-16">
      <h1 className="text-2xl font-bold">Members</h1>
    </div>
  )
}
