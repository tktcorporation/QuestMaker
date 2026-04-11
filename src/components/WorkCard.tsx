import type { Work } from "~/data/works";
import { Globe } from "lucide-react";
import { Badge } from "~/components/ui/badge";

interface WorkCardProps {
  work: Work;
  featured?: boolean;
}

/**
 * 実績カード。featured=true で大きめの表示、false で 2 カラムグリッド用。
 * カテゴリ表示に Badge コンポーネントを使用。
 */
export function WorkCard({ work, featured = false }: WorkCardProps) {
  const categoryLabel = work.category === "live" ? "Live World" : "Game World";
  const badgeColor = work.category === "live" ? "green" : "blue";

  return (
    <div>
      <img src={work.image} alt={work.title} className="w-full rounded-xl" />
      <div className={featured ? "pt-4" : "pt-3"}>
        <div className="flex items-center gap-3 mb-2">
          <Badge colorScheme={badgeColor}>{categoryLabel}</Badge>
          <span className="text-[13px] text-text-subtle">{work.year}</span>
        </div>
        <h3
          className={`font-bold text-text ${featured ? "text-xl tracking-tight mb-2" : "text-base"}`}
        >
          {work.title}
        </h3>
        {featured && (
          <p className="text-[15px] text-text-muted leading-[1.7] mt-2">{work.description}</p>
        )}
        {!featured && work.subtitle && (
          <p className="text-sm text-text-muted mt-1">{work.subtitle}</p>
        )}
        {work.externalUrl && (
          <a
            href={work.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 mt-3 px-3.5 py-1.5 text-[13px] font-medium text-text-muted bg-bg rounded-full border border-border transition-colors duration-150 hover:bg-surface hover:text-text"
          >
            <Globe size={14} aria-hidden="true" />
            VRChatで見る
          </a>
        )}
      </div>
    </div>
  );
}
