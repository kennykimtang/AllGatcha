export type Locale = "en" | "ko";

export const translations = {
  en: {
    draw: "DRAW",
    drawing: "Drawing…",
    collection: "Collection",
    keep: "KEEP",
    openArticle: "OPEN ARTICLE",
    openWebsite: "OPEN WEBSITE",
    drawAgain: "DRAW AGAIN",
    home: "← Home",
    noCardsSaved: "No cards saved yet.",
    intro: "Press the button to get a random card. Keep the ones you like.",
    goDraw: "Draw a card",
    sourceWiki: "Wikipedia",
    sourceWebsite: "Website",
  },
  ko: {
    draw: "뽑기",
    drawing: "뽑는 중…",
    collection: "컬렉션",
    keep: "보관",
    openArticle: "글 보기",
    openWebsite: "웹사이트 보기",
    drawAgain: "다시 뽑기",
    home: "← 홈",
    noCardsSaved: "저장된 카드가 없습니다.",
    intro: "버튼을 눌러 랜덤 카드를 뽑아보세요. 마음에 드는 건 보관하세요.",
    goDraw: "카드 뽑기",
    sourceWiki: "위키백과",
    sourceWebsite: "웹사이트",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function getLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const lang = navigator.language ?? (navigator as { userLanguage?: string }).userLanguage ?? "";
  return lang.startsWith("ko") ? "ko" : "en";
}
