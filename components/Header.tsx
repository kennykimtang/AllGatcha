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
    <header className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-white/6 bg-[#080808]/80 px-6 py-3.5 backdrop-blur-md">
      <Link
        href="/"
        className="text-sm font-semibold tracking-[0.12em] uppercase text-white/80 transition hover:text-white focus:outline-none focus:ring-1 focus:ring-white/20"
        onClick={() => trackButton("button_nav_home")}
      >
        AllGatcha
      </Link>

      <div className="flex items-center gap-3">
        {streak > 1 && (
          <span className="animate-badge-pop inline-flex items-center rounded-sm border border-white/12 bg-white/5 px-2.5 py-1 text-[11px] font-medium tracking-wider text-white/50">
            {streakLabel}
          </span>
        )}
        {dailyDraws > 0 && (
          <span className="hidden sm:inline-flex items-center rounded-sm border border-white/8 bg-white/3 px-2.5 py-1 text-[11px] font-medium text-white/30">
            {drawsLabel}
          </span>
        )}
      </div>

      <nav className="flex items-center gap-4">
        <a
          href="https://ko-fi.com/kennytang"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-white/25 transition hover:text-white/55 focus:outline-none"
          onClick={() => trackButton("button_support")}
        >
          {locale === "ko" ? "후원" : "Support"}
        </a>
        {isCollection ? (
          <Link
            href="/"
            className="text-sm font-medium text-white/40 transition hover:text-white/70 focus:outline-none focus:ring-1 focus:ring-white/20"
            onClick={() => trackButton("button_nav_home")}
          >
            {t("home")}
          </Link>
        ) : (
          <Link
            href="/collection"
            className="text-sm font-medium text-white/40 transition hover:text-white/70 focus:outline-none focus:ring-1 focus:ring-white/20"
            onClick={() => trackButton("button_nav_collection")}
          >
            {t("collection")}
          </Link>
        )}
      </nav>
    </header>
  );
}
