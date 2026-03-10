export interface Member {
  id: string
  name: string
  role: string
  roleLabel: 'green' | 'blue'
  description: string
  /** 丸アイコン用プロフィール画像 */
  image: string
  /** ステッカー風キャラクターアート（透過PNG） */
  panelImage: string
  xUrl: string
  xHandle: string
}

export const members: Member[] = [
  {
    id: 'anoko',
    name: 'あの子',
    role: 'Producer / Director',
    roleLabel: 'green',
    description:
      "代表・ディレクター。『題名のないお茶会』や『劇団あのこ』などQuest対応イベントを主催。",
    image: '/images/veoxxxxxx.png',
    panelImage: '/images/panel_anoko.png',
    xUrl: 'https://x.com/veoxxxxxx',
    xHandle: '@veoxxxxxx',
  },
  {
    id: 'yassan',
    name: 'やっさん',
    role: 'VFX / Particles',
    roleLabel: 'blue',
    description:
      'ギミックやパーティクルなど演出担当。Quest等でもきれいに快適に見られるワールドを制作。',
    image: '/images/yassann357.jpg',
    panelImage: '/images/panel_yassan.png',
    xUrl: 'https://x.com/yassann357',
    xHandle: '@yassann357',
  },
  {
    id: 'gend',
    name: '元怒',
    role: '3D / Animation',
    roleLabel: 'green',
    description:
      'アニメーション・モデリング・パーティクル全般。アバターギミック制作やセットアップ代行も。',
    image: '/images/gend_VR.jpg',
    panelImage: '/images/panel_gend.png',
    xUrl: 'https://x.com/gend_VR',
    xHandle: '@gend_VR',
  },
  {
    id: 'mosco',
    name: 'Mosco',
    role: 'Sound',
    roleLabel: 'blue',
    description:
      'MIX・SE・効果音の音響担当。名曲喫茶｢華麗堂｣主催、チャリティー活動も。',
    image: '/images/Mosco_Japan.jpg',
    panelImage: '/images/panel_mosco.png',
    xUrl: 'https://x.com/Mosco_Japan',
    xHandle: '@Mosco_Japan',
  },
  {
    id: 'taro',
    name: 'たろー',
    role: '2D Design',
    roleLabel: 'green',
    description:
      "バナー・イラスト・テクスチャ等の2Dデザイン。『劇団あのこ』のポスターも。",
    image: '/images/Taro3_taro.jpg',
    panelImage: '/images/panel_taro.png',
    xUrl: 'https://x.com/Taro3_taro',
    xHandle: '@Taro3_taro',
  },
  {
    id: 'tkt',
    name: 'tkt',
    role: 'Assistant Director',

    roleLabel: 'blue',
    description:
      'スケジュール管理・Git等の技術フォロー。個人でWebアプリ開発も。',
    image: '/images/tktcorporation.jpg',
    panelImage: '/images/panel_tkt.png',
    xUrl: 'https://x.com/tktcorporation',
    xHandle: '@tktcorporation',
  },
]
