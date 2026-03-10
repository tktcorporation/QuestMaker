import { Link } from '@tanstack/react-router'
import { works } from '~/data/works'
import { Badge } from '~/components/ui/badge'

/**
 * トップページ用 Bento グリッド実績プレビュー。
 * 最初の実績を大きく、残りを小さく表示。
 *
 * カード感を抑えるため bg-surface/shadow を使わず、
 * 画像に rounded を直接かけ、テキストは画像下に直置き。
 */
export function WorksPreview() {
  const [featured, ...remaining] = works
  const rest = remaining.slice(0, 2)

  return (
    <section className="px-7 py-14 bg-bg">
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
          <Link to="/works" className="text-sm text-text-muted link-hover">
            すべて見る →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-5 md:gap-6">
          {/* Featured */}
          <div className="md:row-span-2">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full aspect-[16/10] object-cover rounded-xl"
            />
            <div className="pt-3">
              <Badge colorScheme={featured.category === 'live' ? 'green' : 'blue'} className="mb-1.5">
                {featured.category === 'live' ? 'Live World' : 'Game World'}
              </Badge>
              <h3 className="text-base font-semibold leading-snug text-text">
                {featured.title}
              </h3>
              <p className="text-sm text-text-muted mt-1">
                {featured.subtitle}
              </p>
            </div>
          </div>

          {/* Small items */}
          {rest.map((work) => (
            <div key={work.id}>
              <img
                src={work.image}
                alt={work.title}
                className="w-full aspect-[16/9] object-cover rounded-xl"
              />
              <div className="pt-2.5">
                <Badge colorScheme={work.category === 'live' ? 'green' : 'blue'} className="mb-1">
                  {work.category === 'live' ? 'Live World' : 'Game World'}
                </Badge>
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
