"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { useI18n } from "@/components/I18nProvider";
import { trackButton, trackView } from "@/lib/analytics";
import { getSavedCards, type WikiCard } from "@/lib/wikipedia";

function CardThumbnail({ card }: { card: WikiCard }) {
  const [imageError, setImageError] = useState(false);
  const showImage = card.image && !imageError;
  if (!showImage) {
    return <div className="h-40 w-full bg-slate-700" />;
  }
  return (
    <div className="relative h-40 w-full">
      <Image
        src={card.image as string}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 384px) 100vw, 384px"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export default function CollectionPage() {
  const { t } = useI18n();
  const [cards, setCards] = useState<WikiCard[]>([]);
  const [sourceFilter, setSourceFilter] = useState<"all" | "wiki" | "website">(
    "all"
  );
  const [sortKey, setSortKey] = useState<"recent" | "oldest" | "title">(
    "recent"
  );

  useEffect(() => {
    setCards(getSavedCards());
  }, []);

  useEffect(() => {
    trackView("collection");
  }, []);

  const visibleCards = useMemo(() => {
    const filtered =
      sourceFilter === "all"
        ? cards
        : cards.filter((c) => (c.source ?? "wiki") === sourceFilter);

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      if (sortKey === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortKey === "oldest") {
        return a.timestamp - b.timestamp;
      }
      return b.timestamp - a.timestamp;
    });
    return sorted;
  }, [cards, sourceFilter, sortKey]);

  return (
    <>
      <Header />
      <main className="min-h-screen px-6 pt-24 pb-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          {t("collection")}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex overflow-hidden rounded-lg border border-slate-600/50 bg-slate-800/70">
              <button
                type="button"
                onClick={() => setSourceFilter("all")}
                className={[
                  "px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-slate-900",
                  sourceFilter === "all"
                    ? "bg-slate-700/60 text-zinc-100"
                    : "text-slate-300 hover:bg-slate-700/40 hover:text-zinc-100",
                ].join(" ")}
              >
                {t("filterAll")}
              </button>
              <button
                type="button"
                onClick={() => setSourceFilter("wiki")}
                className={[
                  "px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-slate-900",
                  sourceFilter === "wiki"
                    ? "bg-slate-700/60 text-zinc-100"
                    : "text-slate-300 hover:bg-slate-700/40 hover:text-zinc-100",
                ].join(" ")}
              >
                {t("sourceWiki")}
              </button>
              <button
                type="button"
                onClick={() => setSourceFilter("website")}
                className={[
                  "px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-slate-900",
                  sourceFilter === "website"
                    ? "bg-slate-700/60 text-zinc-100"
                    : "text-slate-300 hover:bg-slate-700/40 hover:text-zinc-100",
                ].join(" ")}
              >
                {t("sourceWebsite")}
              </button>
            </div>

            <select
              value={sortKey}
              onChange={(e) =>
                setSortKey(e.target.value as "recent" | "oldest" | "title")
              }
              className="h-10 rounded-lg border border-slate-600/50 bg-slate-800/70 px-3 text-sm text-slate-200 outline-none transition focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Sort"
            >
              <option value="recent">{t("sortRecent")}</option>
              <option value="oldest">{t("sortOldest")}</option>
              <option value="title">{t("sortTitle")}</option>
            </select>
          </div>
        </div>

      {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 py-16">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-700/70 text-slate-400"
            aria-hidden
          >
            <svg
              className="h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <p className="max-w-sm text-center text-slate-400">
            {t("noCardsSaved")}
          </p>
          <Link
            href="/"
            className="rounded-xl bg-amber-500 px-6 py-3 font-medium text-zinc-950 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            onClick={() => trackButton("button_nav_home")}
          >
            {t("goDraw")}
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCards.map((card) => (
            <li key={`${card.url}-${card.timestamp}`}>
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer overflow-hidden rounded-xl border border-slate-600/50 bg-slate-800/90 shadow-md ring-1 ring-slate-700/30 transition hover:-translate-y-1 hover:border-slate-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-slate-900"
                onClick={() =>
                  trackButton("button_open_card", {
                    source: card.source ?? "wiki",
                    card_title: card.title,
                  })
                }
              >
                <div className="overflow-hidden rounded-t-xl">
                  <CardThumbnail card={card} />
                </div>
                <p className="p-4 font-medium leading-snug text-slate-200 line-clamp-2">
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
