interface PageHeaderProps {
  label: string;
  labelColor: "green" | "blue";
  title: string;
  subtitle?: string;
}

/**
 * 実績・メンバーページ共通のページタイトルヘッダー。
 * 左揃え。ラベル（小さな英字）+ 大きなタイトル + 説明文。
 */
export function PageHeader({ label, labelColor, title, subtitle }: PageHeaderProps) {
  return (
    <div className="px-7 pt-12 pb-6 bg-surface">
      <div className="max-w-[1200px] mx-auto">
        <p
          className={`text-[13px] tracking-[3px] mb-2 font-semibold ${labelColor === "green" ? "text-accent-green" : "text-accent-blue"}`}
        >
          {label}
        </p>
        <h1 className="text-[32px] font-extrabold tracking-[-0.03em] text-text">{title}</h1>
        {subtitle && <p className="text-[15px] text-text-muted mt-3">{subtitle}</p>}
      </div>
    </div>
  );
}
