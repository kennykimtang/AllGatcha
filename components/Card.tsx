"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";
import { trackButton } from "@/lib/analytics";
import type { CardCategory, CardRarity, WikiCard } from "@/lib/wikipedia";

// ── Category icons ────────────────────────────────────────────
const CATEGORY_ICONS: Record<CardCategory, string> = {
  knowledge: "📚",
  internet: "🌐",
  culture: "🎭",
  science: "🔬",
  history: "🏛️",
  art: "🎨",
  misc: "✦",
};

// ── Rarity design tokens ──────────────────────────────────────
const RARITY = {
  common: {
    topBar: "from-slate-500 via-slate-600 to-slate-700",
    cardBg: "bg-slate-800/95",
    border: "border border-slate-600/60",
    shadow: "shadow-lg",
    metaBadge: "bg-slate-700/80 text-slate-300",
    label: null,
    labelColor: "",
    backBg: "from-slate-800 to-slate-900",
    backBorder: "border-slate-600/40",
    backSymbol: "?",
    backSymbolColor: "text-slate-400",
    revealDelay: 350,
  },
  rare: {
    topBar: "from-violet-500 via-indigo-500 to-violet-700",
    cardBg: "bg-[#18152e]/95",
    border: "rarity-rare border",
    shadow: "shadow-xl",
    metaBadge: "bg-violet-900/70 text-violet-300 ring-1 ring-violet-400/30",
    label: "✦ RARE",
    labelColor: "text-violet-400",
    backBg: "from-violet-950 to-[#0d0b1e]",
    backBorder: "border-violet-500/40",
    backSymbol: "✦",
    backSymbolColor: "text-violet-400",
    revealDelay: 600,
  },
  legendary: {
    topBar: "from-amber-400 via-yellow-400 to-amber-600",
    cardBg: "bg-[#1a1406]/95",
    border: "rarity-legendary border shimmer-legendary animate-pulse-legendary",
    shadow: "shadow-2xl",
    metaBadge: "bg-amber-900/70 text-amber-300 ring-1 ring-amber-400/40",
    label: "★ LEGENDARY",
    labelColor: "text-amber-400",
    backBg: "from-amber-950 to-[#120e00]",
    backBorder: "border-amber-500/50",
    backSymbol: "★",
    backSymbolColor: "text-amber-400",
    revealDelay: 900,
  },
} as const;

interface CardProps {
  card: WikiCard;
  onKeep: () => void;
  onDrawAgain: () => void;
}

export function Card({ card, onKeep, onDrawAgain }: CardProps) {
  const { t, locale } = useI18n();
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const rarity: CardRarity = card.rarity ?? "common";
  const cfg = RARITY[rarity];
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
  const categoryIcon = card.category ? CATEGORY_ICONS[card.category] : "✦";
  const sourceLabel = card.source === "website" ? t("sourceWebsite") : t("sourceWiki");

  // Brief card-back display, then reveal
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), cfg.revealDelay);
    return () => clearTimeout(timer);
  }, [cfg.revealDelay]);

  const handleKeep = () => {
    trackButton("button_keep", { card_source: card.source ?? "wiki", card_title: card.title });
    onKeep();
  };
  const handleOpenLink = () => {
    trackButton(card.source === "website" ? "button_open_website" : "button_open_article", { url: card.url });
  };
  const handleDrawAgain = () => {
    trackButton("button_draw_again");
    onDrawAgain();
  };
  const handleShare = async () => {
    trackButton("button_share", { card_title: card.title });
    const text =
      locale === "ko"
        ? `"${card.title}" 발견! 🎴 AllGatcha에서 뽑았어요 → ${card.url}`
        : `Just drew "${card.title}" on AllGatcha 🎴 → ${card.url}`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: card.title, text, url: card.url });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // cancelled
    }
  };

  return (
    <div className="relative w-full max-w-lg">

      {/* ── Card Back (overlay, fades out on reveal) ─────────── */}
      <div
        aria-hidden
        className={[
          "absolute inset-0 z-20 rounded-2xl border bg-gradient-to-b",
          cfg.backBg,
          cfg.backBorder,
          "flex flex-col items-center justify-center gap-3",
          "transition-all duration-500 ease-in-out",
          revealed
            ? "opacity-0 scale-[1.04] pointer-events-none"
            : "opacity-100 scale-100",
        ].join(" ")}
      >
        <span
          className={[
            "text-6xl leading-none transition-transform duration-300",
            !revealed && rarity === "legendary" ? "animate-pulse" : "",
            cfg.backSymbolColor,
          ].join(" ")}
        >
          {cfg.backSymbol}
        </span>
        <span className="text-base font-bold tracking-[0.25em] text-white/40 uppercase">
          AllGatcha
        </span>
        {cfg.label && (
          <span className={`text-xs font-bold tracking-widest uppercase ${cfg.labelColor}`}>
            {cfg.label}
          </span>
        )}
      </div>

      {/* ── Card Front ───────────────────────────────────────── */}
      <article
        className={[
          "w-full overflow-hidden rounded-2xl",
          cfg.cardBg,
          cfg.border,
          cfg.shadow,
          "transition-all duration-500 ease-out",
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        ].join(" ")}
        role="article"
      >
        {/* Rarity gradient top bar */}
        <div className={`h-[3px] w-full bg-gradient-to-r ${cfg.topBar}`} />

        {/* Image */}
        {showImage && (
          <figure className="relative aspect-video w-full overflow-hidden bg-slate-700/60">
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

        <div className="p-5">
          {/* Meta row */}
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            {categoryLabel && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/50 px-2.5 py-0.5 text-xs font-medium text-slate-300">
                <span>{categoryIcon}</span>
                <span>{categoryLabel}</span>
              </span>
            )}
            <span
              className={[
                "rounded-full px-2.5 py-0.5 text-xs font-medium",
                cfg.metaBadge,
              ].join(" ")}
            >
              {sourceLabel}
            </span>
            {cfg.label && (
              <span className={`ml-auto text-[11px] font-bold tracking-wider ${cfg.labelColor}`}>
                {cfg.label}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="mb-2 text-xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-2xl">
            {card.title}
          </h2>

          {/* Summary */}
          <p className="mb-5 line-clamp-4 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
            {card.summary}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleKeep}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {t("keep")}
            </button>
            <a
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-teal-500/50 px-4 py-2 text-sm font-semibold text-teal-300 transition hover:border-teal-400 hover:bg-teal-500/10 hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2 focus:ring-offset-slate-900"
              onClick={handleOpenLink}
            >
              {card.source === "website" ? t("openWebsite") : t("openArticle")}
            </a>
            <button
              type="button"
              onClick={handleShare}
              className="rounded-lg border border-slate-500/40 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-400 hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {copied ? t("copied") : t("share")}
            </button>
            <button
              type="button"
              onClick={handleDrawAgain}
              className="rounded-lg border border-slate-600/40 px-4 py-2 text-sm font-semibold text-slate-400 transition hover:border-slate-500 hover:bg-slate-700/40 hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {t("drawAgain")}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
