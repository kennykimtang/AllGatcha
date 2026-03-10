import type { Locale } from "./i18n";

const WIKI_SUMMARY_BASE: Record<Locale, string> = {
  en: "https://en.wikipedia.org/api/rest_v1/page/summary",
  ko: "https://ko.wikipedia.org/api/rest_v1/page/summary",
};

export type CardSource = "wiki" | "website";

export interface WikiCard {
  title: string;
  summary: string;
  image: string | null;
  url: string;
  timestamp: number;
  source?: CardSource;
}

interface WikiSummaryResponse {
  title?: string;
  extract?: string;
  thumbnail?: { source?: string };
  content_urls?: { desktop?: { page?: string } };
}

function parseSummaryResponse(
  data: WikiSummaryResponse,
  wikiBase: string
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
  return parseSummaryResponse(data, base);
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

/** Randomly returns either a Wikipedia card or an interesting-website card (50/50). */
export async function fetchRandomCard(locale: Locale): Promise<WikiCard> {
  const useWebsite = Math.random() < 0.5;
  if (useWebsite) {
    const { getRandomWebsite } = await import("@/lib/interestingWebsites");
    return getRandomWebsite(locale);
  }
  const wikiCard = await fetchRandomWikiPage(locale);
  return wikiCard;
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

export function saveCard(card: WikiCard): void {
  if (typeof window === "undefined") return;
  const cards = getSavedCards();
  cards.push(card);
  localStorage.setItem(SAVED_CARDS_KEY, JSON.stringify(cards));
}
