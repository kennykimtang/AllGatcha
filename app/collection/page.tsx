"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { useI18n } from "@/components/I18nProvider";
import { trackButton, trackView } from "@/lib/analytics";
import { getSavedCards, type WikiCard } from "@/lib/wikipedia";
import { getSessionKeepCount } from "@/lib/sessionStats";

const RARITY_BORDER: Record<string, string> = {
  legendary: "border-white/30 shadow-[0_0_16px_rgba(255,255,255,0.07)]",
  rare: "border-white/15",
  common: "border-white/8",
};

function CardThumbnail({ card }: { card: WikiCard }) {
  const [imageError, setImageError] = useState(false);
  const showImage = card.image && !imageError;
  if (!showImage) {
    return <div className="h-40 w-full bg-white/4" />;
  }
  return (
    <div className="relative h-40 w-full">
      <Image
        src={card.image as string}
        alt=""
        fill
        className="object-cover opacity-85"
        sizes="(max-width: 384px) 100vw, 384px"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export default function CollectionPage() {
  const { t } = useI18n();
  const [cards, setCards] = useState<WikiCard[]>([]);
  const [sourceFilter, setSourceFilter] = useState<"all" | "wiki" | "website">("all");
  const [sortKey, setSortKey] = useState<"recent" | "oldest" | "title">("recent");
  const [sessionKeeps, setSessionKeeps] = useState(0);

  useEffect(() => { setCards(getSavedCards()); }, []);
  useEffect(() => { trackView("collection"); }, []);
  useEffect(() => { setSessionKeeps(getSessionKeepCount()); }, []);

  const rareCount = cards.filter(c => c.rarity === "rare").length;
  const legendaryCount = cards.filter(c => c.rarity === "legendary").length;

  const visibleCards = useMemo(() => {
    const filtered =
      sourceFilter === "all"
        ? cards
        : cards.filter((c) => (c.source ?? "wiki") === sourceFilter);
    const sorted = [...filtered];
    sorted.sort((a, b) => {
      if (sortKey === "title") return a.title.localeCompare(b.title);
      if (sortKey === "oldest") return a.timestamp - b.timestamp;
      return b.timestamp - a.timestamp;
    });
    return sorted;
  }, [cards, sourceFilter, sortKey]);

  const filterBtn = (active: boolean) =>
    [
      "px-3 py-2 text-xs font-medium uppercase tracking-wider transition focus:outline-none",
      active
        ? "bg-white/10 text-white/80"
        : "text-white/35 hover:bg-white/5 hover:text-white/60",
    ].join(" ");

  return (
    <>
      <Header />
      <main className="min-h-screen px-6 pt-24 pb-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-white/80">
              {t("collection")}
            </h1>
            {cards.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-white/30">{cards.length} cards</span>
                {rareCount > 0 && (
                  <span className="rounded-sm border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/50">
                    {rareCount} {t("collectionRare")}
                  </span>
                )}
                {legendaryCount > 0 && (
                  <span className="rounded-sm border border-white/25 bg-white/8 px-2 py-0.5 text-[11px] font-medium text-white/70">
                    {legendaryCount} {t("collectionLegendary")}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex overflow-hidden rounded-md border border-white/8 bg-white/3">
              <button type="button" onClick={() => setSourceFilter("all")} className={filterBtn(sourceFilter === "all")}>{t("filterAll")}</button>
              <button type="button" onClick={() => setSourceFilter("wiki")} className={filterBtn(sourceFilter === "wiki")}>{t("sourceWiki")}</button>
              <button type="button" onClick={() => setSourceFilter("website")} className={filterBtn(sourceFilter === "website")}>{t("sourceWebsite")}</button>
            </div>

            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as "recent" | "oldest" | "title")}
              className="h-9 rounded-md border border-white/8 bg-[#111] px-3 text-xs font-medium uppercase tracking-wider text-white/40 outline-none transition focus:border-white/20 focus:ring-0"
              aria-label="Sort"
            >
              <option value="recent">{t("sortRecent")}</option>
              <option value="oldest">{t("sortOldest")}</option>
              <option value="title">{t("sortTitle")}</option>
            </select>

            {sessionKeeps > 0 && (
              <p className="text-xs text-white/25">
                {t("sessionKeepPrefix")}{sessionKeeps}{t("sessionKeepSuffix")}
              </p>
            )}
          </div>
        </div>

        {cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-20">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-xl border border-white/8 bg-white/3"
              aria-hidden
            >
              <svg className="h-9 w-9 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-sm text-white/30">{t("noCardsSaved")}</p>
            <Link
              href="/"
              className="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30"
              onClick={() => trackButton("button_nav_home")}
            >
              {t("goDraw")}
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCards.map((card) => (
              <li key={`${card.url}-${card.timestamp}`}>
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    "group block overflow-hidden rounded-xl border bg-[#111111] transition hover:-translate-y-0.5 hover:bg-[#161616] focus:outline-none focus:ring-1 focus:ring-white/20",
                    RARITY_BORDER[card.rarity ?? "common"] ?? RARITY_BORDER.common,
                  ].join(" ")}
                  onClick={() =>
                    trackButton("button_open_card", {
                      source: card.source ?? "wiki",
                      card_title: card.title,
                    })
                  }
                >
                  <div className="overflow-hidden">
                    <CardThumbnail card={card} />
                  </div>
                  <p className="p-3.5 text-sm font-medium leading-snug text-white/65 line-clamp-2 group-hover:text-white/80 transition">
                    {card.title}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
