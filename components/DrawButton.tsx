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
      className="rounded-2xl bg-amber-500 px-12 py-5 text-xl font-bold text-zinc-950 shadow-lg transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {disabled ? t("drawing") : t("draw")}
    </button>
  );
}
