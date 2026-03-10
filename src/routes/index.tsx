import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '~/components/HeroSection'
import { MissionStatement } from '~/components/MissionStatement'
import { WorksPreview } from '~/components/WorksPreview'
import { MemberPreview } from '~/components/MemberPreview'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionStatement />
      <WorksPreview />
      <MemberPreview />
    </>
  )
}
