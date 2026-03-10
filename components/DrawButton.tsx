"use client";

import { useI18n } from "@/components/I18nProvider";

interface DrawButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function DrawButton({ onClick, disabled }: DrawButtonProps) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-2xl bg-amber-500 px-12 py-5 text-xl font-bold text-zinc-950 shadow-lg transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {disabled ? t("drawing") : t("draw")}
    </button>
  );
}
