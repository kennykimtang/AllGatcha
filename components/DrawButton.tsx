"use client";

import { useI18n } from "@/components/I18nProvider";
import { trackButton } from "@/lib/analytics";

interface DrawButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isAgain?: boolean;
}

export function DrawButton({ onClick, disabled, isAgain = false }: DrawButtonProps) {
  const { t } = useI18n();
  const handleClick = () => {
    trackButton("button_draw", { is_again: isAgain });
    onClick();
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-3 rounded-md bg-white px-14 py-4 text-base font-semibold tracking-[0.08em] uppercase text-black shadow-[0_2px_24px_rgba(255,255,255,0.12)] transition hover:bg-white/90 hover:shadow-[0_4px_32px_rgba(255,255,255,0.18)] focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#080808] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {disabled && (
        <span
          className="h-4 w-4 shrink-0 rounded-full border-2 border-black/20 border-t-black animate-spin-slow"
          aria-hidden
        />
      )}
      {disabled ? t("drawing") : t("draw")}
    </button>
  );
}
