import type { Member } from "~/data/members";
import { Badge } from "~/components/ui/badge";
import { XIcon } from "~/components/ui/icons";

/**
 * メンバーカード。2カラムグリッド用の横並びレイアウト。
 *
 * index を受け取り、パネル画像に微回転をかけてステッカー風の遊びを出す。
 * 回転角度はメンバーごとに固定（ランダムではなく決定的）で、
 * -3deg〜3deg の範囲で散らす。整列しすぎない有機的な配置に。
 */

/** メンバーごとの微回転角度。手貼りステッカー風の散らし。 */
const rotations = [-2, 1.5, -1, 2.5, -1.5, 2, -2.5, 1];

export function MemberCard({ member, index = 0 }: { member: Member; index?: number }) {
  const hasDistinctIcon = member.image !== member.panelImage;
  const rotation = rotations[index % rotations.length];

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
            <p className="text-lg font-bold text-text leading-tight">{member.name}</p>
            <Badge colorScheme={member.roleLabel} className="mt-0.5">
              {member.role}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-text-muted leading-[1.7] mt-2">{member.description}</p>
        {/* Xリンク — 右寄せのボタン風 */}
        <div className="flex justify-end mt-3">
          <a
            href={member.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-text-muted bg-bg rounded-full border border-border transition-colors duration-150 hover:bg-surface hover:text-text"
          >
            <XIcon size={13} className="shrink-0" />
            {member.xHandle}
          </a>
        </div>
      </div>
    </div>
  );
}
