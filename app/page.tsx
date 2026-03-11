"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { DrawButton } from "@/components/DrawButton";
import { Header } from "@/components/Header";
import { useI18n } from "@/components/I18nProvider";
import { trackCardShown, trackView } from "@/lib/analytics";
import {
  fetchRandomCard,
  saveCard,
  type WikiCard,
} from "@/lib/wikipedia";

export default function HomePage() {
  const { t, locale } = useI18n();
  const [currentCard, setCurrentCard] = useState<WikiCard | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    trackView("home");
  }, []);

  const handleDraw = async () => {
    setLoading(true);
    try {
      const card = await fetchRandomCard(locale);
      setCurrentCard(card);
      trackCardShown(card.source ?? "wiki", card.title);
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
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 pt-24 pb-12">
        {!currentCard && !loading && (
          <div className="flex flex-col items-center gap-6">
            <p className="max-w-sm text-center text-zinc-400">
              {t("intro")}
            </p>
            <DrawButton onClick={handleDraw} disabled={loading} isAgain={false} />
          </div>
        )}
        {loading && (
          <DrawButton onClick={() => {}} disabled isAgain={false} />
        )}
        {currentCard && !loading && (
          <>
            <Card
              card={currentCard}
              onKeep={handleKeep}
              onDrawAgain={handleDraw}
            />
            <DrawButton onClick={handleDraw} disabled={loading} isAgain />
          </>
        )}
      </main>
    </>
  );
}
