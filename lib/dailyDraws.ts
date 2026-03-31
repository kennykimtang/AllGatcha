const DAILY_DRAWS_KEY = "daily_draws_count";
const DAILY_DATE_KEY = "daily_draws_date";

export const FREE_DRAWS_PER_DAY = 20;

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getDailyDrawCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const today = todayStr();
    const date = localStorage.getItem(DAILY_DATE_KEY);
    if (date !== today) return 0;
    const raw = localStorage.getItem(DAILY_DRAWS_KEY);
    return raw ? Number(raw) : 0;
  } catch {
    return 0;
  }
}

export function incrementDailyDrawCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const today = todayStr();
    const date = localStorage.getItem(DAILY_DATE_KEY);
    const current = date === today ? (Number(localStorage.getItem(DAILY_DRAWS_KEY)) || 0) : 0;
    const next = current + 1;
    localStorage.setItem(DAILY_DRAWS_KEY, String(next));
    localStorage.setItem(DAILY_DATE_KEY, today);
    return next;
  } catch {
    return 0;
  }
}
