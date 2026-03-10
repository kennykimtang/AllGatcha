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
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function getLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const lang = navigator.language ?? (navigator as { userLanguage?: string }).userLanguage ?? "";
  return lang.startsWith("ko") ? "ko" : "en";
}
