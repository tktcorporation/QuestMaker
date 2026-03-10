import { Link } from '@tanstack/react-router'
import { works } from '~/data/works'

/**
 * トップページ用 Bento グリッド実績プレビュー。
 * 最初の実績を大きく、残りを小さく表示。
 */
export function WorksPreview() {
  const [featured, ...remaining] = works
  const rest = remaining.slice(0, 2)

  return (
    <section className="px-7 py-12 bg-bg">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-baseline mb-6">
          <div>
            <p className="text-[13px] tracking-[3px] text-accent-blue mb-1 font-semibold uppercase">
              WORKS
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-text">
              制作実績
            </h2>
          </div>
          <Link to="/works" className="text-sm text-text-muted">
            すべて見る →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-2.5">
          {/* Featured large card */}
          <div className="md:row-span-2 bg-surface rounded-[10px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full aspect-[16/10] object-cover"
            />
            <div className="p-5">
              <p className="text-[13px] text-accent-green mb-1.5 font-semibold">
                {featured.category === 'live' ? 'Live World' : 'Game World'}
              </p>
              <h3 className="text-base font-semibold leading-snug text-text">
                {featured.title}
              </h3>
              <p className="text-sm text-text-muted mt-1.5">
                {featured.subtitle}
              </p>
            </div>
          </div>

          {/* Small cards */}
          {rest.map((work) => (
            <div
              key={work.id}
              className="bg-surface rounded-[10px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              <img
                src={work.image}
                alt={work.title}
                className="w-full aspect-[16/9] object-cover"
              />
              <div className="p-4">
                <p
                  className={`text-[13px] mb-1 font-semibold ${work.category === 'live' ? 'text-accent-green' : 'text-accent-blue'}`}
                >
                  {work.category === 'live' ? 'Live World' : 'Game World'}
                </p>
                <h3 className="text-sm font-semibold text-text">
                  {work.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
