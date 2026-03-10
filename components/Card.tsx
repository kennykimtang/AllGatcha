"use client";

import { useState } from "react";
import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";
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
  return (
    <article
      className="animate-card-appear w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-xl"
      role="article"
    >
      <div className="p-6">
        <h2 className="mb-4 text-2xl font-bold text-zinc-100">{card.title}</h2>
        {showImage && (
          <figure className="relative mb-4 h-48 overflow-hidden rounded-lg">
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
        <p className="mb-6 line-clamp-5 text-zinc-300">{card.summary}</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onKeep}
            className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            {t("keep")}
          </button>
          <a
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 font-medium text-zinc-200 transition hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            {card.source === "website"
              ? t("openWebsite")
              : t("openArticle")}
          </a>
          <button
            type="button"
            onClick={onDrawAgain}
            className="rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 font-medium text-zinc-200 transition hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            {t("drawAgain")}
          </button>
        </div>
      </div>
    </article>
  );
}
