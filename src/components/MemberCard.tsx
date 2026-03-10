import type { Member } from '~/data/members'
import { Badge } from '~/components/ui/badge'

/**
 * メンバーカード。2カラムグリッド用の横並びレイアウト。
 *
 * index を受け取り、パネル画像に微回転をかけてステッカー風の遊びを出す。
 * 回転角度はメンバーごとに固定（ランダムではなく決定的）で、
 * -3deg〜3deg の範囲で散らす。整列しすぎない有機的な配置に。
 */

/** メンバーごとの微回転角度。手貼りステッカー風の散らし。 */
const rotations = [-2, 1.5, -1, 2.5, -1.5, 2, -2.5, 1]

export function MemberCard({
  member,
  index = 0,
}: {
  member: Member
  index?: number
}) {
  const hasDistinctIcon = member.image !== member.panelImage
  const rotation = rotations[index % rotations.length]

  return (
    <div className="flex items-center gap-5">
      {/* パネル画像 — 微回転でステッカー風 */}
      <div className="shrink-0 flex items-end justify-center w-[160px] h-[200px]">
        <img
          src={member.panelImage}
          alt={member.name}
          className="max-w-full max-h-full object-contain object-bottom drop-shadow-md transition-transform duration-300"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      </div>

      {/* プロフィール情報 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {hasDistinctIcon && (
            <img
              src={member.image}
              alt=""
              className="w-9 h-9 rounded-full object-cover ring-2 ring-border shrink-0"
            />
          )}
          <div>
            <p className="text-lg font-bold text-text leading-tight">
              {member.name}
            </p>
            <Badge colorScheme={member.roleLabel} className="mt-0.5">
              {member.role}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-text-muted leading-[1.7] mt-2">
          {member.description}
        </p>
        <a
          href={member.xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-2 text-[12px] text-text-muted link-hover"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          {member.xHandle}
        </a>
      </div>
    </div>
  )
}
