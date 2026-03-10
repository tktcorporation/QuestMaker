import { createFileRoute } from '@tanstack/react-router'

/**
 * 実績一覧ページ。
 * Task 6 で実装予定。現時点ではプレースホルダー。
 */
export const Route = createFileRoute('/works')({
  component: WorksPage,
})

function WorksPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-7 py-16">
      <h1 className="text-2xl font-bold">Works</h1>
    </div>
  )
}
