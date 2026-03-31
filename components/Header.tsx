"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";
import { trackButton } from "@/lib/analytics";
import { updateAndGetStreak } from "@/lib/streak";
import { getDailyDrawCount, FREE_DRAWS_PER_DAY } from "@/lib/dailyDraws";

export function Header() {
  const pathname = usePathname();
  const { t, locale } = useI18n();
  const isCollection = pathname?.startsWith("/collection") ?? false;

  const [streak, setStreak] = useState(0);
  const [dailyDraws, setDailyDraws] = useState(0);

  useEffect(() => {
    setStreak(updateAndGetStreak());
    setDailyDraws(getDailyDrawCount());
  }, []);

  // Re-read daily draws when window regains focus (tab switch)
  useEffect(() => {
    const onFocus = () => setDailyDraws(getDailyDrawCount());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const streakLabel =
    locale === "ko" ? `${streak}${t("streakDays")}` : `${streak}${t("streakDays")}`;

  const drawsLabel =
    locale === "ko"
      ? `${dailyDraws}/${FREE_DRAWS_PER_DAY}${t("drawsToday")}`
      : `${dailyDraws}/${FREE_DRAWS_PER_DAY}${t("drawsToday")}`;

  return (
    <header className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-slate-700/40 bg-slate-900/70 px-6 py-3 backdrop-blur-md">
      {/* Left: logo */}
      <Link
        href="/"
        className="text-lg font-bold tracking-tight text-zinc-100 transition hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-slate-900"
        onClick={() => trackButton("button_nav_home")}
      >
        AllGatcha
      </Link>

      {/* Center: streak + draws */}
      <div className="flex items-center gap-3">
        {streak > 1 && (
          <span className="animate-badge-pop inline-flex items-center gap-1 rounded-full bg-orange-500/15 px-2.5 py-1 text-xs font-semibold text-orange-400 ring-1 ring-orange-400/25">
            🔥 {streakLabel}
          </span>
        )}
        {dailyDraws > 0 && (
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-slate-700/60 px-2.5 py-1 text-xs font-medium text-slate-400">
            {drawsLabel}
          </span>
        )}
      </div>

      {/* Right: nav */}
      <nav>
        {isCollection ? (
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700/50 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            onClick={() => trackButton("button_nav_home")}
          >
            {t("home")}
          </Link>
        ) : (
          <Link
            href="/collection"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-700/50 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            onClick={() => trackButton("button_nav_collection")}
          >
            {t("collection")}
          </Link>
        )}
      </nav>
    </header>
  );
}
