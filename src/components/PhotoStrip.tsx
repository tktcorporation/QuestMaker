/**
 * VRChat集合写真のスクラップブック風レイアウト。
 * ヒーロー画像の下端と重なるように negative margin で配置。
 * 2枚の写真を少し傾けて重ね、手作り感・楽しさを演出。
 *
 * MissionStatement の上に配置する前提（bg-surface 上）。
 */
export function PhotoStrip() {
  return (
    <div className="relative z-10 -mt-12 md:-mt-20 mb-4 px-7" aria-label="チーム活動の様子">
      <div className="max-w-[700px] mx-auto flex justify-center items-center gap-0">
        <div className="relative -rotate-3 translate-x-4 z-10 shadow-lg rounded-lg overflow-hidden border-[3px] border-white">
          <img
            src="/images/group-photo-1.webp"
            alt="VRChatでの集合写真 - 屋内シーン"
            className="w-[280px] md:w-[340px] aspect-[4/3] object-cover"
          />
        </div>
        <div className="relative rotate-2 -translate-x-4 shadow-lg rounded-lg overflow-hidden border-[3px] border-white">
          <img
            src="/images/group-photo-2.webp"
            alt="VRChatでの集合写真 - 夕暮れシーン"
            className="w-[280px] md:w-[340px] aspect-[4/3] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
