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
  type SaveCardResult,
  type WikiCard,
} from "@/lib/wikipedia";
import { getSessionKeepCount, incrementSessionKeepCount } from "@/lib/sessionStats";
import { incrementDailyDrawCount } from "@/lib/dailyDraws";

export default function HomePage() {
  const { t, locale } = useI18n();
  const [currentCard, setCurrentCard] = useState<WikiCard | null>(null);
  const [loading, setLoading] = useState(false);
  const [saveResult, setSaveResult] = useState<SaveCardResult | null>(null);
  const [sessionKeeps, setSessionKeeps] = useState(0);

  useEffect(() => {
    trackView("home");
  }, []);

  useEffect(() => {
    setSessionKeeps(getSessionKeepCount());
  }, []);

  const handleDraw = async () => {
    setLoading(true);
    setSaveResult(null);
    try {
      const card = await fetchRandomCard(locale);
      setCurrentCard(card);
      incrementDailyDrawCount();
      trackCardShown(card.source ?? "wiki", card.title);
    } catch {
      setCurrentCard(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeep = () => {
    if (currentCard) {
      const result = saveCard(currentCard);
      setSaveResult(result);
      if (result === "saved") {
        const next = incrementSessionKeepCount();
        setSessionKeeps(next);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 pt-24 pb-12">
        {!currentCard && !loading && (
          <div className="flex flex-col items-center gap-6">
            <div className="max-w-sm text-center">
              <p className="mb-2 text-sm font-medium text-slate-200">
                {t("intro")}
              </p>
              <p className="text-sm text-zinc-400">{t("introSub")}</p>
            </div>
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
            {saveResult && (
              <p className="text-sm text-slate-300/90">
                {saveResult === "saved"
                  ? t("savedToCollection")
                  : saveResult === "duplicate"
                    ? t("alreadyInCollection")
                    : t("saveFailed")}
              </p>
            )}
            {sessionKeeps > 0 && (
              <p className="text-xs text-slate-400">
                {t("sessionKeepPrefix")}
                {sessionKeeps}
                {t("sessionKeepSuffix")}
              </p>
            )}
            <DrawButton onClick={handleDraw} disabled={loading} isAgain />
          </>
        )}
      </main>
    </>
  );
}
