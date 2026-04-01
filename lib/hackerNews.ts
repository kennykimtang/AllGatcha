import type { WikiCard } from "./wikipedia";
import type { Locale } from "./i18n";

interface HNHit {
  title: string;
  url?: string;
  objectID: string;
  points: number;
  num_comments: number;
  story_text?: string;
}

interface AlgoliaResponse {
  hits: HNHit[];
}

function rarityFromPoints(points: number): "common" | "rare" | "legendary" {
  if (points >= 500) return "legendary";
  if (points >= 100) return "rare";
  return "common";
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function buildSummary(hit: HNHit, locale: Locale): string {
  if (hit.story_text) {
    const text = stripHtml(hit.story_text);
    if (text.length > 0) {
      return text.length > 220 ? text.slice(0, 220).replace(/\s\S*$/, "") + "…" : text;
    }
  }
  // Fallback when author left no description
  return locale === "ko"
    ? `해커뉴스에서 ${hit.points}포인트, ${hit.num_comments}개의 댓글을 받은 프로젝트입니다.`
    : `Shared on Hacker News with ${hit.points} points and ${hit.num_comments} comments.`;
}

export async function fetchRandomShowHN(locale: Locale): Promise<WikiCard | null> {
  try {
    const page = Math.floor(Math.random() * 10);
    const res = await fetch(
      `https://hn.algolia.com/api/v1/search?tags=show_hn&hitsPerPage=50&page=${page}&numericFilters=points%3E50`
    );
    if (!res.ok) return null;
    const data = (await res.json()) as AlgoliaResponse;
    if (!data.hits?.length) return null;

    const hit = data.hits[Math.floor(Math.random() * data.hits.length)];
    const hnUrl = `https://news.ycombinator.com/item?id=${hit.objectID}`;

    return {
      title: hit.title.replace(/^Show HN:\s*/i, ""),
      summary: buildSummary(hit, locale),
      image: null,
      url: hit.url ?? hnUrl,
      timestamp: Date.now(),
      source: "hn",
      category: "indie",
      rarity: rarityFromPoints(hit.points ?? 0),
      language: locale,
    };
  } catch {
    return null;
  }
}
