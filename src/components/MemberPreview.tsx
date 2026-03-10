import { Link } from '@tanstack/react-router'
import { members } from '~/data/members'

/**
 * トップページ用メンバーアバター一覧。
 * 丸アイコン + 名前 + ロールをコンパクトに表示。
 */
export function MemberPreview() {
  return (
    <section className="px-7 py-12 bg-surface">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-7">
          <p className="text-[13px] tracking-[3px] text-accent-green mb-1 font-semibold uppercase">
            MEMBERS
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-text">
            QuestMakerのメンバー
          </h2>
          <p className="text-[15px] text-text-muted mt-2">
            個性豊かなクリエイターたちが集まって、楽しいワールドを作っています！
          </p>
        </div>

        <div className="flex gap-5 justify-center flex-wrap">
          {members.map((member) => (
            <div key={member.id} className="text-center w-[84px]">
              <img
                src={member.image}
                alt={member.name}
                className="w-[60px] h-[60px] rounded-full object-cover mx-auto mb-2 border-[1.5px] border-border"
              />
              <p className="text-sm font-semibold text-text">
                {member.name}
              </p>
              <p className="text-[13px] text-text-muted mt-0.5">
                {member.role}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-7">
          <Link
            to="/members"
            className="inline-block bg-cta text-white px-7 py-3 rounded-md text-sm font-semibold"
          >
            メンバーを見る
          </Link>
        </div>
      </div>
    </section>
  )
}
