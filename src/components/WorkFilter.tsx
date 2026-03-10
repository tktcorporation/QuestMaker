import type { WorkCategory } from "~/data/works";

interface WorkFilterProps {
  active: "all" | WorkCategory;
  onChange: (filter: "all" | WorkCategory) => void;
}

const filters = [
  { key: "all" as const, label: "All" },
  { key: "live" as const, label: "Live" },
  { key: "game" as const, label: "Game" },
];

/**
 * 実績ページのカテゴリフィルター。アンダーラインタブ形式。
 */
export function WorkFilter({ active, onChange }: WorkFilterProps) {
  return (
    <div className="px-7 pb-6 bg-surface border-b border-border">
      <div className="max-w-[1200px] mx-auto flex gap-5">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            className={`text-sm pb-2.5 transition-all duration-150 cursor-pointer ${
              active === f.key
                ? "text-text font-medium border-b-[1.5px] border-text"
                : "text-text-subtle"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
