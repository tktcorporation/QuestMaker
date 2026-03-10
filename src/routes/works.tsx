import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "~/components/PageHeader";
import { WorkFilter } from "~/components/WorkFilter";
import { WorkCard } from "~/components/WorkCard";
import { works, type WorkCategory } from "~/data/works";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "制作実績 — QuestMaker" },
      {
        name: "description",
        content: "QuestMakerの制作実績。VRChat上で制作したワールド・コンテンツを紹介します。",
      },
      { property: "og:title", content: "制作実績 — QuestMaker" },
    ],
  }),
  component: WorksPage,
});

function WorksPage() {
  const [filter, setFilter] = useState<"all" | WorkCategory>("all");
  const filtered = filter === "all" ? works : works.filter((w) => w.category === filter);
  const [featured, ...rest] = filtered;

  return (
    <>
      <PageHeader
        label="WORKS"
        labelColor="blue"
        title="制作実績"
        subtitle="VRChat上で制作したワールド・コンテンツ"
      />
      <WorkFilter active={filter} onChange={setFilter} />

      <div className="max-w-[1200px] mx-auto px-7 py-6">
        {featured && <WorkCard work={featured} featured />}
      </div>

      {rest.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-7 pb-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {rest.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      )}
    </>
  );
}
