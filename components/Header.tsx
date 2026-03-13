"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";
import { trackButton } from "@/lib/analytics";

export function Header() {
  const pathname = usePathname();
  const { t } = useI18n();
  const isCollection = pathname?.startsWith("/collection") ?? false;

  return (
    <header className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-slate-700/40 bg-slate-900/70 px-6 py-4 backdrop-blur-md">
      <Link
        href="/"
        className="text-lg font-bold tracking-tight text-zinc-100 transition hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-slate-900"
        onClick={() => trackButton("button_nav_home")}
      >
        AllGatcha
      </Link>
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
