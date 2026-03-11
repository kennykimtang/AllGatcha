"use client";

import { useI18n } from "@/components/I18nProvider";
import { trackButton } from "@/lib/analytics";

interface DrawButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isAgain?: boolean;
}

export function DrawButton({
  onClick,
  disabled,
  isAgain = false,
}: DrawButtonProps) {
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
      className="flex items-center justify-center gap-3 rounded-2xl bg-amber-500 px-14 py-5 text-xl font-bold tracking-tight text-zinc-950 shadow-[0_4px_24px_rgba(250,204,21,0.35)] transition hover:bg-amber-400 hover:shadow-[0_6px_28px_rgba(250,204,21,0.4)] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:shadow-[0_4px_24px_rgba(250,204,21,0.35)]"
    >
      {disabled && (
        <span
          className="h-5 w-5 shrink-0 rounded-full border-2 border-zinc-950/30 border-t-zinc-950 animate-spin-slow"
          aria-hidden
        />
      )}
      {disabled ? t("drawing") : t("draw")}
    </button>
  );
}
