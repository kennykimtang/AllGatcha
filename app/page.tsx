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
          <div className="flex flex-col items-center gap-8">
            {/* Fanned card stack preview */}
            <div className="relative h-36 w-52" aria-hidden>
              {/* Legendary (back) */}
              <div className="absolute left-7 top-5 h-28 w-40 rounded-xl border border-amber-500/30 bg-gradient-to-b from-amber-950/80 to-slate-900/80 shadow-[0_0_18px_rgba(251,191,36,0.18)] rotate-[-8deg]">
                <div className="flex h-full items-center justify-center text-2xl text-amber-400/70">★</div>
              </div>
              {/* Rare (middle) */}
              <div className="absolute left-3 top-2 h-28 w-40 rounded-xl border border-violet-500/30 bg-gradient-to-b from-violet-950/80 to-slate-900/80 shadow-[0_0_12px_rgba(139,92,246,0.15)] rotate-[-3deg]">
                <div className="flex h-full items-center justify-center text-2xl text-violet-400/70">✦</div>
              </div>
              {/* Common (front) */}
              <div className="absolute left-0 top-0 h-28 w-40 rounded-xl border border-slate-600/50 bg-gradient-to-b from-slate-800 to-slate-900 shadow-lg">
                <div className="flex h-full items-center justify-center text-xl font-bold tracking-widest text-slate-500">?</div>
              </div>
            </div>

            <div className="max-w-xs text-center">
              <p className="mb-1.5 text-base font-semibold text-slate-100">
                {t("intro")}
              </p>
              <p className="mb-4 text-sm text-slate-400">{t("introSub")}</p>
              <p className="text-xs text-slate-500">
                {t("rarityOdds")}
              </p>
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
