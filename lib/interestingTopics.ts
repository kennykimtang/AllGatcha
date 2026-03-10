import type { Locale } from "./i18n";

function parseTopics(raw: string): readonly string[] {
  return raw
    .trim()
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

let cachedEn: readonly string[] | null = null;
let cachedKo: readonly string[] | null = null;

async function getTopicsEn(): Promise<readonly string[]> {
  if (cachedEn) return cachedEn;
  const { TOPICS_EN_RAW } = await import("./topicsEn");
  cachedEn = parseTopics(TOPICS_EN_RAW);
  return cachedEn;
}

async function getTopicsKo(): Promise<readonly string[]> {
  if (cachedKo) return cachedKo;
  const { TOPICS_KO_RAW } = await import("./topicsKo");
  cachedKo = parseTopics(TOPICS_KO_RAW);
  return cachedKo;
}

export const INTERESTING_TOPICS_EN: readonly string[] = [];
export const INTERESTING_TOPICS_KO: readonly string[] = [];

export async function getRandomInterestingTitle(locale: Locale): Promise<string> {
  const list =
    locale === "ko" ? await getTopicsKo() : await getTopicsEn();
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}
