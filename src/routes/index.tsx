import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "~/components/HeroSection";
import { MissionStatement } from "~/components/MissionStatement";
import { WorksPreview } from "~/components/WorksPreview";
import { MemberPreview } from "~/components/MemberPreview";
import { SectionDivider } from "~/components/ui/section-divider";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionStatement />
      <SectionDivider from="var(--color-surface)" to="var(--color-bg)" />
      <WorksPreview />
      <SectionDivider from="var(--color-bg)" to="var(--color-surface)" />
      <MemberPreview />
    </>
  );
}
