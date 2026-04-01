import type { WikiCard } from "./wikipedia";
import type { Locale } from "./i18n";

interface HNHit {
  title: string;
  url?: string;
  objectID: string;
  points: number;
  num_comments: number;
}

interface AlgoliaResponse {
  hits: HNHit[];
}

function rarityFromPoints(points: number): "common" | "rare" | "legendary" {
  if (points >= 500) return "legendary";
  if (points >= 100) return "rare";
  return "common";
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
    const points = hit.points ?? 0;
    const comments = hit.num_comments ?? 0;

    const summary =
      locale === "ko"
        ? `해커뉴스에서 ${points}포인트, ${comments}개의 댓글을 받은 인디 프로젝트입니다. HN 커뮤니티가 주목한 아이디어.`
        : `Featured on Hacker News with ${points} points and ${comments} comments. A project that caught the indie hacker community's attention.`;

    return {
      title: hit.title.replace(/^Show HN:\s*/i, ""),
      summary,
      image: null,
      url: hit.url ?? hnUrl,
      timestamp: Date.now(),
      source: "hn",
      category: "indie",
      rarity: rarityFromPoints(points),
      language: locale,
    };
  } catch {
    return null;
  }
}
