import type { Locale } from "./i18n";

const WIKI_SUMMARY_BASE: Record<Locale, string> = {
  en: "https://en.wikipedia.org/api/rest_v1/page/summary",
  ko: "https://ko.wikipedia.org/api/rest_v1/page/summary",
};

export type CardSource = "wiki" | "website" | "hn";

export type CardCategory =
  | "knowledge"
  | "internet"
  | "culture"
  | "science"
  | "history"
  | "art"
  | "misc"
  | "indie";

export type CardRarity = "common" | "rare" | "legendary";

export interface WikiCard {
  title: string;
  summary: string;
  image: string | null;
  url: string;
  timestamp: number;
  source?: CardSource;
  /** Minimal metadata for future use (kept mostly internal for now). */
  category?: CardCategory;
  rarity?: CardRarity;
  language?: Locale;
}

interface WikiSummaryResponse {
  title?: string;
  extract?: string;
  thumbnail?: { source?: string };
  content_urls?: { desktop?: { page?: string } };
}

function assignRarity(): CardRarity {
  const r = Math.random();
  if (r < 0.05) return "legendary";
  if (r < 0.25) return "rare";
  return "common";
}

function parseSummaryResponse(
  data: WikiSummaryResponse,
  wikiBase: string,
  locale: Locale
): WikiCard {
  const baseUrl = wikiBase.replace("/api/rest_v1/page/summary", "");
  return {
    title: data.title ?? "Untitled",
    summary: data.extract ?? "",
    image: data.thumbnail?.source ?? null,
    url:
      data.content_urls?.desktop?.page ??
      `${baseUrl}/wiki/${encodeURIComponent((data.title ?? "").replace(/ /g, "_"))}`,
    timestamp: Date.now(),
    source: "wiki",
    language: locale,
    category: "knowledge",
    rarity: assignRarity(),
  };
}

async function fetchSummaryByTitle(
  title: string,
  locale: Locale
): Promise<WikiCard | null> {
  const base = WIKI_SUMMARY_BASE[locale];
  const encoded = encodeURIComponent(title);
  const res = await fetch(`${base}/${encoded}`);
  if (!res.ok) return null;
  const data: WikiSummaryResponse = await res.json();
  if (!data.extract) return null;
  return parseSummaryResponse(data, base, locale);
}

export async function fetchRandomWikiPage(locale: Locale): Promise<WikiCard> {
  const { getRandomInterestingTitle } = await import(
    "@/lib/interestingTopics"
  );
  const maxTries = 5;
  for (let i = 0; i < maxTries; i++) {
    const title = await getRandomInterestingTitle(locale);
    const card = await fetchSummaryByTitle(title, locale);
    if (card) return card;
  }
  throw new Error("Failed to fetch a Wikipedia page");
}

/** Returns a card from one of three sources: curated sites (34%), live HN Show HN (33%), Wikipedia (33%). */
export async function fetchRandomCard(locale: Locale): Promise<WikiCard> {
  const r = Math.random();
  if (r < 0.34) {
    const { getRandomWebsite } = await import("@/lib/interestingWebsites");
    return getRandomWebsite(locale);
  }
  if (r < 0.67) {
    const { fetchRandomShowHN } = await import("@/lib/hackerNews");
    const card = await fetchRandomShowHN(locale);
    if (card) return card;
  }
  return fetchRandomWikiPage(locale);
}

const SAVED_CARDS_KEY = "saved_cards";

export function getSavedCards(): WikiCard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_CARDS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export type SaveCardResult = "saved" | "duplicate" | "error";

export function saveCard(card: WikiCard): SaveCardResult {
  if (typeof window === "undefined") return "error";
  try {
    const cards = getSavedCards();
    const exists = cards.some((c) => c && typeof c === "object" && "url" in c && (c as WikiCard).url === card.url);
    if (exists) return "duplicate";
    cards.push(card);
    localStorage.setItem(SAVED_CARDS_KEY, JSON.stringify(cards));
    return "saved";
  } catch {
    return "error";
  }
}
