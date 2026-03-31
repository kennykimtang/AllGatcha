"use client";

import { useState } from "react";
import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";
import { trackButton } from "@/lib/analytics";
import type { CardCategory, CardRarity, WikiCard } from "@/lib/wikipedia";

interface CardProps {
  card: WikiCard;
  onKeep: () => void;
  onDrawAgain: () => void;
}

// ── Rarity config ────────────────────────────────────────────
const RARITY_CONFIG: Record<
  CardRarity,
  { border: string; badge: string; label: string; icon: string }
> = {
  common: {
    border: "border-slate-600/50",
    badge: "bg-slate-700/80 text-slate-300",
    label: "",
    icon: "",
  },
  rare: {
    border: "rarity-rare border",
    badge: "bg-violet-900/80 text-violet-300 ring-1 ring-violet-400/30",
    label: "RARE",
    icon: "✦",
  },
  legendary: {
    border: "rarity-legendary border",
    badge: "bg-amber-900/80 text-amber-300 ring-1 ring-amber-400/40",
    label: "LEGENDARY",
    icon: "★",
  },
};

export function Card({ card, onKeep, onDrawAgain }: CardProps) {
  const { t, locale } = useI18n();
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  const rarity: CardRarity = card.rarity ?? "common";
  const rarityCfg = RARITY_CONFIG[rarity];

  const showImage = card.image && !imageError;

  const categoryLabels: Partial<Record<CardCategory, string>> = {
    knowledge: t("categoryKnowledge"),
    internet: t("categoryInternet"),
    culture: t("categoryCulture"),
    science: t("categoryScience"),
    history: t("categoryHistory"),
    art: t("categoryArt"),
    misc: t("categoryMisc"),
  };

  const categoryLabel = card.category ? (categoryLabels[card.category] ?? "") : "";
  const sourceLabel = card.source === "website" ? t("sourceWebsite") : t("sourceWiki");

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

  const handleShare = async () => {
    trackButton("button_share", { card_title: card.title });
    const shareText =
      locale === "ko"
        ? `"${card.title}" 발견! 🎴\nAllGatcha에서 뽑았어요 → ${card.url}`
        : `Just drew "${card.title}" on AllGatcha 🎴 → ${card.url}`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: card.title, text: shareText, url: card.url });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // user cancelled share or clipboard denied
    }
  };

  const isLegendary = rarity === "legendary";
  const isRare = rarity === "rare";

  return (
    <article
      className={[
        "animate-card-deal w-full max-w-lg overflow-hidden rounded-2xl bg-slate-800/90 shadow-lg",
        isLegendary
          ? "shimmer-legendary animate-pulse-legendary rarity-legendary border"
          : isRare
          ? "rarity-rare border"
          : "border border-slate-600/50 ring-1 ring-slate-700/30",
      ].join(" ")}
      role="article"
    >
      {/* Rarity header band for rare/legendary */}
      {(isLegendary || isRare) && (
        <div
          className={[
            "flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-widest",
            isLegendary
              ? "bg-amber-400/10 text-amber-300 border-b border-amber-400/20"
              : "bg-violet-400/10 text-violet-300 border-b border-violet-400/20",
          ].join(" ")}
        >
          <span>{rarityCfg.icon}</span>
          <span>{rarityCfg.label}</span>
        </div>
      )}

      {showImage && (
        <figure className="relative aspect-video w-full overflow-hidden bg-slate-700">
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
        {/* Category + source badges */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {categoryLabel && (
            <span className="rounded-md bg-slate-700/60 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-slate-400">
              {categoryLabel}
            </span>
          )}
          <span
            className={[
              "rounded-md px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide",
              rarityCfg.badge,
            ].join(" ")}
            aria-label={sourceLabel}
          >
            {sourceLabel}
          </span>
        </div>

        <h2 className="mb-3 text-2xl font-bold tracking-tight text-zinc-100 leading-tight">
          {card.title}
        </h2>
        <p className="mb-6 line-clamp-5 leading-relaxed text-slate-400">
          {card.summary}
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2.5">
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
            {card.source === "website" ? t("openWebsite") : t("openArticle")}
          </a>
          <button
            type="button"
            onClick={handleShare}
            className="rounded-lg border border-slate-500/50 bg-transparent px-4 py-2.5 font-medium text-slate-300 transition hover:border-slate-400 hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {copied ? t("copied") : t("share")}
          </button>
          <button
            type="button"
            onClick={handleDrawAgain}
            className="rounded-lg border border-slate-600 bg-transparent px-4 py-2.5 font-medium text-slate-400 transition hover:border-slate-500 hover:bg-slate-700/50 hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {t("drawAgain")}
          </button>
        </div>
      </div>
    </article>
  );
}
