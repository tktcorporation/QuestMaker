import { Link } from "@tanstack/react-router";
import { members } from "~/data/members";
import { buttonClass } from "~/components/ui/button";
import { SectionHeader } from "~/components/ui/section-header";

/**
 * トップページ用メンバープレビュー。
 * パネル画像（ステッカー風キャラアート）を使い、
 * VRChatチームらしい個性的な見た目にする。
 *
 * 各メンバーのアバターアートを横並びに表示し、名前を添える。
 */
export function MemberPreview() {
  return (
    <section className="px-7 py-16 bg-surface">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-10">
          <SectionHeader
            label="MEMBERS"
            labelColor="green"
            title="QuestMakerのメンバー"
            subtitle="個性豊かなクリエイターたちが集まって、楽しいコンテンツを作っています！"
            align="center"
          />
        </div>

        <div className="flex gap-2 md:gap-4 justify-center flex-wrap">
          {members.map((member) => (
            <div key={member.id} className="text-center w-[80px] md:w-[110px]">
              <div className="h-[80px] md:h-[110px] flex items-end justify-center mb-1.5">
                <img
                  src={member.panelImage}
                  alt={member.name}
                  className="h-full w-auto object-contain object-bottom"
                />
              </div>
              <p className="text-[13px] font-semibold text-text leading-tight">{member.name}</p>
              <p className="text-[11px] text-text-muted mt-0.5">{member.role}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/members" className={buttonClass("primary", "lg")}>
            メンバーを見る
          </Link>
        </div>
      </div>
    </section>
  );
}
