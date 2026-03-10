/**
 * トップページのヒーロー画像。header.png をフルワイドで表示。
 * aspect-ratio: 3/1 でモックアップと同じ比率を維持。
 */
export function HeroSection() {
  return (
    <section
      className="w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/header.png')",
        aspectRatio: '3 / 1',
      }}
      role="img"
      aria-label="QuestMaker ヒーロー画像"
    />
  )
}
