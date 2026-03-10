/**
 * セクション間の波形ディバイダー。
 * セクションの境目を直線ではなく有機的なカーブでつなぐ。
 *
 * from: 上セクションの背景色（ラッパーの背景になる）
 * to: 下セクションの背景色（波形の塗りになる）
 *
 * 仕組み: ラッパー背景=from、SVG波形パス塗り=to。
 * 波形パスの上が透明（=from が見える）、下が to で塗られる。
 */
export function SectionDivider({
  from = "var(--color-surface)",
  to = "var(--color-bg)",
  className = "",
}: {
  from?: string;
  to?: string;
  className?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${className}`}
      style={{ backgroundColor: from }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="block w-full h-[30px] md:h-[48px]"
      >
        <path d="M0 30 Q300 60 600 30 T1200 30 V60 H0 Z" fill={to} />
      </svg>
    </div>
  );
}
