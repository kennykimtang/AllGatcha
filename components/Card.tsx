"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";
import { trackButton } from "@/lib/analytics";
import type { CardCategory, CardRarity, WikiCard } from "@/lib/wikipedia";

const CATEGORY_LABELS: Partial<Record<CardCategory, string>> = {
  knowledge: "Knowledge",
  internet: "Internet",
  culture: "Culture",
  science: "Science",
  history: "History",
  art: "Art",
  misc: "Misc",
  indie: "Indie",
};

const RARITY = {
  common: {
    topBar: "from-white/10 to-transparent",
    cardBg: "bg-[#111111]",
    border: "border border-white/8",
    shadow: "shadow-lg shadow-black/60",
    metaBadge: "bg-white/5 text-white/40 ring-1 ring-white/8",
    label: null as string | null,
    labelStyle: "",
    backBg: "from-[#141414] to-[#080808]",
    backBorder: "border-white/8",
    backSymbol: "?",
    backSymbolStyle: "text-white/20 text-5xl",
    revealDelay: 350,
  },
  rare: {
    topBar: "from-white/30 to-transparent",
    cardBg: "bg-[#111111]",
    border: "rarity-rare border",
    shadow: "shadow-xl shadow-black/70",
    metaBadge: "bg-white/8 text-white/60 ring-1 ring-white/15",
    label: "RARE" as string | null,
    labelStyle: "text-white/50",
    backBg: "from-[#1a1a1a] to-[#080808]",
    backBorder: "border-white/20",
    backSymbol: "R",
    backSymbolStyle: "text-white/40 text-5xl font-thin tracking-widest",
    revealDelay: 600,
  },
  legendary: {
    topBar: "from-white/70 via-white/30 to-transparent",
    cardBg: "bg-[#111111]",
    border: "rarity-legendary border shimmer-legendary animate-pulse-legendary",
    shadow: "shadow-2xl shadow-black/80",
    metaBadge: "bg-white/10 text-white/80 ring-1 ring-white/25",
    label: "LEGENDARY" as string | null,
    labelStyle: "text-white/80",
    backBg: "from-[#222222] to-[#080808]",
    backBorder: "border-white/40",
    backSymbol: "L",
    backSymbolStyle: "text-white/70 text-5xl font-thin tracking-widest",
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
  const [kept, setKept] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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
    indie: t("categoryIndie"),
  };
  const categoryLabel = card.category
    ? (categoryLabels[card.category] ?? CATEGORY_LABELS[card.category] ?? "")
    : "";
  const sourceLabel =
    card.source === "website"
      ? t("sourceWebsite")
      : card.source === "hn"
      ? t("sourceHN")
      : t("sourceWiki");

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), cfg.revealDelay);
    return () => clearTimeout(timer);
  }, [cfg.revealDelay]);

  const handleKeep = () => {
    trackButton("button_keep", { card_source: card.source ?? "wiki", card_title: card.title });
    setKept(true);
    onKeep();
  };
  const handleOpenLink = () => {
    trackButton(
      card.source === "wiki" ? "button_open_article" : "button_open_website",
      { url: card.url }
    );
  };
  const handleDrawAgain = () => {
    trackButton("button_draw_again");
    onDrawAgain();
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!revealed) return;
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -22;
    const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 22;
    setTilt({ x: rotateX, y: rotateY });
  };
  const handleMouseEnter = () => { if (revealed) setIsHovering(true); };
  const handleMouseLeave = () => { setTilt({ x: 0, y: 0 }); setIsHovering(false); };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!revealed || !e.touches[0]) return;
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rotateX = ((e.touches[0].clientY - rect.top) / rect.height - 0.5) * -22;
    const rotateY = ((e.touches[0].clientX - rect.left) / rect.width - 0.5) * 22;
    setTilt({ x: rotateX, y: rotateY });
    setIsHovering(true);
  };
  const handleTouchEnd = () => { setTilt({ x: 0, y: 0 }); setIsHovering(false); };

  const handleShare = async () => {
    trackButton("button_share", { card_title: card.title });
    const text =
      locale === "ko"
        ? `"${card.title}" 발견! AllGatcha에서 뽑았어요 -> ${card.url}`
        : `Just drew "${card.title}" on AllGatcha -> ${card.url}`;
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
    <div
      ref={wrapperRef}
      className="relative w-full max-w-lg"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovering ? 1.02 : 1})`,
        transition: isHovering ? "transform 0.08s linear" : "transform 0.5s ease-out",
        willChange: "transform",
      }}
    >
      {/* Card Back */}
      <div
        aria-hidden
        className={[
          "absolute inset-0 z-20 rounded-2xl border bg-gradient-to-b",
          cfg.backBg,
          cfg.backBorder,
          "flex flex-col items-center justify-center gap-3",
          "transition-all duration-500 ease-in-out",
          revealed
            ? "opacity-0 scale-[1.03] pointer-events-none"
            : "opacity-100 scale-100",
        ].join(" ")}
      >
        <span className={cfg.backSymbolStyle}>{cfg.backSymbol}</span>
        <span className="text-xs font-medium tracking-[0.3em] text-white/25 uppercase">
          AllGatcha
        </span>
        {cfg.label && (
          <span className={`text-[10px] font-semibold tracking-[0.25em] uppercase ${cfg.labelStyle}`}>
            {cfg.label}
          </span>
        )}
      </div>

      {/* Card Front */}
      <article
        className={[
          "relative w-full overflow-hidden rounded-2xl",
          cfg.cardBg,
          cfg.border,
          cfg.shadow,
          "transition-all duration-500 ease-out",
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        ].join(" ")}
        role="article"
      >
        {/* Glare */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            opacity: isHovering ? 1 : 0,
            transition: isHovering ? "none" : "opacity 0.5s ease-out",
            background: `radial-gradient(circle at ${50 + (tilt.y / 22) * 40}% ${50 + (-tilt.x / 22) * 40}%, rgba(255,255,255,0.07) 0%, transparent 60%)`,
          }}
        />

        {/* Rarity top bar */}
        <div className={`h-[2px] w-full bg-gradient-to-r ${cfg.topBar}`} />

        {showImage && (
          <figure className="relative aspect-video w-full overflow-hidden bg-white/3">
            <Image
              src={card.image as string}
              alt=""
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 512px) 100vw, 512px"
              onError={() => setImageError(true)}
            />
          </figure>
        )}

        <div className="p-5">
          {/* Meta */}
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            {categoryLabel && (
              <span className={`rounded-sm px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider ${cfg.metaBadge}`}>
                {categoryLabel}
              </span>
            )}
            <span className={`rounded-sm px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider ${cfg.metaBadge}`}>
              {sourceLabel}
            </span>
            {cfg.label && (
              <span className={`ml-auto text-[10px] font-semibold tracking-[0.2em] uppercase ${cfg.labelStyle}`}>
                {cfg.label}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="mb-2.5 text-xl font-semibold leading-tight tracking-tight text-white/90 sm:text-2xl">
            {card.title}
          </h2>

          {/* Summary */}
          <p className="mb-5 line-clamp-4 text-sm leading-relaxed text-white/40 sm:text-[15px]">
            {card.summary}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleKeep}
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#111]"
            >
              {t("keep")}
            </button>
            <a
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-white/40 hover:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#111]"
              onClick={handleOpenLink}
            >
              {card.source === "wiki" ? t("openArticle") : t("openWebsite")}
            </a>
            <button
              type="button"
              onClick={handleShare}
              className="rounded-md border border-white/12 px-4 py-2 text-sm font-semibold text-white/50 transition hover:border-white/25 hover:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/15 focus:ring-offset-2 focus:ring-offset-[#111]"
            >
              {copied ? t("copied") : t("share")}
            </button>
            <button
              type="button"
              onClick={handleDrawAgain}
              className="rounded-md border border-white/8 px-4 py-2 text-sm font-semibold text-white/35 transition hover:border-white/20 hover:text-white/55 focus:outline-none focus:ring-2 focus:ring-white/10 focus:ring-offset-2 focus:ring-offset-[#111]"
            >
              {t("drawAgain")}
            </button>
          </div>

          {kept && (
            <div className="mt-4 flex items-center justify-between rounded-md border border-white/10 bg-white/3 px-3.5 py-2.5">
              <p className="text-xs text-white/40">{t("supportDev")}</p>
              <a
                href="https://ko-fi.com/kennytang"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 shrink-0 rounded-sm border border-white/20 bg-white/8 px-2.5 py-1 text-[11px] font-medium text-white/65 transition hover:border-white/40 hover:bg-white/15 hover:text-white/90"
                onClick={() => trackButton("button_support")}
              >
                {t("supportLabel")}
              </a>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
