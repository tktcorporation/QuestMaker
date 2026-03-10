import type { Member } from '~/data/members'

/**
 * メンバーカード。横並びレイアウト: アイコン + 名前/ロール + 説明 + SNS。
 * roleLabel で緑 or 青のアクセントカラーを切り替え。
 */
export function MemberCard({ member }: { member: Member }) {
  return (
    <div className="bg-surface rounded-[10px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3.5 mb-3">
        <img
          src={member.image}
          alt={member.name}
          className="w-14 h-14 rounded-full object-cover shrink-0 border-[1.5px] border-border"
        />
        <div>
          <p className="text-base font-semibold text-text">{member.name}</p>
          <p className={`text-[13px] mt-0.5 font-medium ${member.roleLabel === 'green' ? 'text-accent-green' : 'text-accent-blue'}`}>
            {member.role}
          </p>
        </div>
      </div>
      <p className="text-sm text-text-muted leading-relaxed">
        {member.description}
      </p>
      <a
        href={member.xUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-[13px] text-text-subtle"
      >
        {member.xHandle}
      </a>
    </div>
  )
}
