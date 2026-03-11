"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { trackButton, trackView } from "@/lib/analytics";
import { getSavedCards, type WikiCard } from "@/lib/wikipedia";

function CardThumbnail({ card }: { card: WikiCard }) {
  const [imageError, setImageError] = useState(false);
  const showImage = card.image && !imageError;
  if (!showImage) {
    return <div className="h-40 w-full bg-zinc-800" />;
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

  useEffect(() => {
    setCards(getSavedCards());
  }, []);

  useEffect(() => {
    trackView("collection");
  }, []);

  return (
    <main className="min-h-screen p-8">
      <header className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="text-zinc-400 underline-offset-4 hover:text-zinc-200 hover:underline"
          onClick={() => trackButton("button_nav_home")}
        >
          {t("home")}
        </Link>
        <h1 className="text-2xl font-bold text-zinc-100">{t("collection")}</h1>
      </header>
      {cards.length === 0 ? (
        <p className="text-center text-zinc-500">{t("noCardsSaved")}</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <li key={`${card.url}-${card.timestamp}`}>
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 transition hover:border-zinc-600"
                onClick={() =>
                  trackButton("button_open_card", {
                    source: card.source ?? "wiki",
                    card_title: card.title,
                  })
                }
              >
                <CardThumbnail card={card} />
                <p className="p-4 font-medium text-zinc-200 line-clamp-2">
                  {card.title}
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
