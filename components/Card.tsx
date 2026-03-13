"use client";

import { useState } from "react";
import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";
import { trackButton } from "@/lib/analytics";
import type { WikiCard } from "@/lib/wikipedia";

interface CardProps {
  card: WikiCard;
  onKeep: () => void;
  onDrawAgain: () => void;
}

export function Card({ card, onKeep, onDrawAgain }: CardProps) {
  const { t } = useI18n();
  const [imageError, setImageError] = useState(false);
  const showImage = card.image && !imageError;
  const handleKeep = () => {
    trackButton("button_keep", {
      card_source: card.source ?? "wiki",
      card_title: card.title,
    });
    onKeep();
  };
  const handleOpenLink = () => {
    if (card.source === "website") {
      trackButton("button_open_website", { url: card.url });
    } else {
      trackButton("button_open_article", { url: card.url });
    }
  };
  const handleDrawAgain = () => {
    trackButton("button_draw_again");
    onDrawAgain();
  };
  const sourceLabel =
    card.source === "website" ? t("sourceWebsite") : t("sourceWiki");

  return (
    <article
      className="animate-card-appear w-full max-w-lg overflow-hidden rounded-2xl border border-slate-600/50 bg-slate-800/90 shadow-lg ring-1 ring-slate-700/30"
      role="article"
    >
      {showImage && (
        <figure className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-slate-700">
          <Image
            src={card.image as string}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 512px) 100vw, 512px"
            onError={() => setImageError(true)}
          />
        </figure>
      )}
      <div className="p-6">
        <span
          className="mb-3 inline-block rounded-md bg-slate-700/80 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-slate-300"
          aria-label={sourceLabel}
        >
          {sourceLabel}
        </span>
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-zinc-100">
          {card.title}
        </h2>
        <p className="mb-6 line-clamp-5 leading-relaxed text-slate-400">
          {card.summary}
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleKeep}
            className="rounded-lg bg-emerald-600 px-4 py-2.5 font-medium text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {t("keep")}
          </button>
          <a
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-teal-500/50 bg-transparent px-4 py-2.5 font-medium text-teal-300 transition hover:border-teal-400 hover:bg-teal-500/10 hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2 focus:ring-offset-slate-900"
            onClick={handleOpenLink}
          >
            {card.source === "website"
              ? t("openWebsite")
              : t("openArticle")}
          </a>
          <button
            type="button"
            onClick={handleDrawAgain}
            className="rounded-lg border border-slate-600 bg-transparent px-4 py-2.5 font-medium text-slate-300 transition hover:border-slate-500 hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {t("drawAgain")}
          </button>
        </div>
      </div>
    </article>
  );
}
