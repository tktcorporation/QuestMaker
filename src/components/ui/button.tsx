import type { ComponentProps } from "react";

/**
 * 共通ボタン。shadcn/ui 風の variant + size で見た目を一元管理。
 * <a> や <Link> にも適用できるよう、className を返す関数も export。
 *
 * variant:
 *   primary — 黒背景白文字の主要CTA
 *   secondary — ボーダーのみのサブアクション
 *   ghost — 背景なし、テキストのみ（リンク風）
 */

const variants = {
  primary: "bg-cta text-white font-semibold btn-hover",
  secondary: "border border-border text-text-muted link-hover",
  ghost: "text-text-muted link-hover",
} as const;

const sizes = {
  sm: "px-4 py-1.5 text-[13px] rounded-md",
  md: "px-6 py-2.5 text-sm rounded-lg",
  lg: "px-7 py-3 text-sm rounded-lg",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

/** ボタンクラスを生成。<Link> 等の非 button 要素にも使える */
export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  return `inline-flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]}`;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <button className={`${buttonClass(variant, size)} ${className}`} {...props} />;
}
