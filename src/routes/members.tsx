import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '~/components/PageHeader'
import { MemberCard } from '~/components/MemberCard'
import { members } from '~/data/members'

export const Route = createFileRoute('/members')({
  head: () => ({
    meta: [{ title: 'メンバー紹介 — QuestMaker' }],
  }),
  component: MembersPage,
})

function MembersPage() {
  return (
    <>
      <PageHeader
        label="MEMBERS"
        labelColor="green"
        title="メンバー紹介"
        subtitle="個性豊かなクリエイターたちが集まって、楽しいワールドを作っています"
      />

      <div className="max-w-[1100px] mx-auto px-7 py-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </>
  )
}
