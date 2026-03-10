/**
 * セクション見出し。英字ラベル + 日本語タイトル + 説明文の3段構成。
 * トップページの WORKS / MEMBERS セクションで共用。
 *
 * align: 'left' はリスト系セクション、'center' は紹介系セクション向け。
 */

export function SectionHeader({
  label,
  labelColor = "blue",
  title,
  subtitle,
  align = "left",
  children,
}: {
  label: string;
  labelColor?: "green" | "blue";
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  const colorClass = labelColor === "green" ? "text-accent-green" : "text-accent-blue";
  const alignClass = align === "center" ? "text-center" : "";

  return (
    <div className={alignClass}>
      <p className={`text-[13px] tracking-[3px] mb-1 font-semibold uppercase ${colorClass}`}>
        {label}
      </p>
      <h2 className="text-2xl font-bold tracking-tight text-text">{title}</h2>
      {subtitle && <p className="text-[15px] text-text-muted mt-2">{subtitle}</p>}
      {children}
    </div>
  );
}
