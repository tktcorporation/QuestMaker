/**
 * カテゴリバッジ。Work カテゴリ（Live World / Game World）や
 * メンバーロールの表示に使用。
 *
 * colorScheme でアクセントカラーを切り替え。
 * デザインスペックの accent-green / accent-blue に対応。
 */

const colorSchemes = {
  green: "text-accent-green bg-accent-green/8",
  blue: "text-accent-blue bg-accent-blue/8",
} as const;

export type BadgeColorScheme = keyof typeof colorSchemes;

export function Badge({
  children,
  colorScheme = "green",
  className = "",
}: {
  children: React.ReactNode;
  colorScheme?: BadgeColorScheme;
  className?: string;
}) {
  return (
    <span
      className={`inline-block text-[13px] font-semibold px-2 py-0.5 rounded ${colorSchemes[colorScheme]} ${className}`}
    >
      {children}
    </span>
  );
}
