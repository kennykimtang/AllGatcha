"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { DrawButton } from "@/components/DrawButton";
import { useI18n } from "@/components/I18nProvider";
import {
  fetchRandomCard,
  saveCard,
  type WikiCard,
} from "@/lib/wikipedia";

export default function HomePage() {
  const { t, locale } = useI18n();
  const [currentCard, setCurrentCard] = useState<WikiCard | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDraw = async () => {
    setLoading(true);
    try {
      const card = await fetchRandomCard(locale);
      setCurrentCard(card);
    } catch {
      setCurrentCard(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeep = () => {
    if (currentCard) {
      saveCard(currentCard);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <nav className="absolute top-6 right-6">
        <Link
          href="/collection"
          className="text-zinc-400 underline-offset-4 hover:text-zinc-200 hover:underline"
        >
          {t("collection")}
        </Link>
      </nav>
      {!currentCard && !loading && (
        <DrawButton onClick={handleDraw} disabled={loading} />
      )}
      {loading && (
        <DrawButton onClick={() => {}} disabled />
      )}
      {currentCard && !loading && (
        <>
          <Card
            card={currentCard}
            onKeep={handleKeep}
            onDrawAgain={handleDraw}
          />
          <DrawButton onClick={handleDraw} disabled={loading} />
        </>
      )}
    </main>
  );
}
