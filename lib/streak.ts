const STREAK_KEY = "visit_streak";
const LAST_DATE_KEY = "last_visit_date";

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Call once on app load. Updates streak and returns current streak count. */
export function updateAndGetStreak(): number {
  if (typeof window === "undefined") return 0;
  try {
    const today = todayStr();
    const last = localStorage.getItem(LAST_DATE_KEY);
    const raw = localStorage.getItem(STREAK_KEY);
    const current = raw ? Number(raw) : 0;

    if (last === today) return current || 1;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    const newStreak = last === yesterdayStr ? (current || 1) + 1 : 1;
    localStorage.setItem(STREAK_KEY, String(newStreak));
    localStorage.setItem(LAST_DATE_KEY, today);
    return newStreak;
  } catch {
    return 0;
  }
}

export function getStreak(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    return raw ? Number(raw) : 0;
  } catch {
    return 0;
  }
}
