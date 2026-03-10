import type { Work } from '~/data/works'

interface WorkCardProps {
  work: Work
  featured?: boolean
}

/**
 * 実績カード。featured=true で大きめの表示、false で 2 カラムグリッド用。
 */
export function WorkCard({ work, featured = false }: WorkCardProps) {
  return (
    <div className="bg-surface rounded-[10px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <img
        src={work.image}
        alt={work.title}
        className={`w-full object-cover ${featured ? 'aspect-[2/1]' : 'aspect-[16/9]'}`}
      />
      <div className={featured ? 'p-6' : 'p-4'}>
        <div className="flex items-center gap-3 mb-2">
          <span className={`text-[13px] font-semibold ${work.category === 'live' ? 'text-accent-green' : 'text-accent-blue'}`}>
            {work.category === 'live' ? 'Live World' : 'Game World'}
          </span>
          <span className="text-[13px] text-text-subtle">{work.year}</span>
        </div>
        <h3 className={`font-bold text-text ${featured ? 'text-xl tracking-tight mb-2' : 'text-base'}`}>
          {work.title}
        </h3>
        {featured && (
          <p className="text-[15px] text-text-muted leading-[1.7] mt-2">
            {work.description}
          </p>
        )}
        {!featured && work.subtitle && (
          <p className="text-sm text-text-muted mt-1">{work.subtitle}</p>
        )}
        {work.externalUrl && (
          <a
            href={work.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-[13px] text-text-subtle"
          >
            VRChatで見る →
          </a>
        )}
      </div>
    </div>
  )
}
