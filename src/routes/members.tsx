import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/PageHeader'
import { MemberCard } from '~/components/MemberCard'
import { members } from '~/data/members'

export const Route = createFileRoute('/members')({
  head: () => ({
    meta: [
      { title: 'メンバー紹介 — QuestMaker' },
      {
        name: 'description',
        content: 'QuestMakerのメンバー紹介。個性豊かなクリエイターたちが集まって、楽しいコンテンツを作っています。',
      },
      { property: 'og:title', content: 'メンバー紹介 — QuestMaker' },
    ],
  }),
  component: MembersPage,
})

/**
 * 2カラムグリッドで右列を少し下にオフセット（md:mt-12）し、
 * ジグザグ配置で整列感を崩す。モバイルでは通常の縦積み。
 */
function MembersPage() {
  return (
    <>
      <PageHeader
        label="MEMBERS"
        labelColor="green"
        title="メンバー紹介"
        subtitle="個性豊かなクリエイターたちが集まって、楽しいコンテンツを作っています"
      />

      <div className="max-w-[1100px] mx-auto px-7 py-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {members.map((member, i) => (
          <div
            key={member.id}
            className={i % 2 === 1 ? 'md:mt-12' : ''}
          >
            <MemberCard member={member} index={i} />
          </div>
        ))}
      </div>
    </>
  )
}
