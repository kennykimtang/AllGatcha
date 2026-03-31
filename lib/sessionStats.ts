const SESSION_KEEP_COUNT_KEY = "session_keep_count";

export function getSessionKeepCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEEP_COUNT_KEY);
    if (!raw) return 0;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
}

export function incrementSessionKeepCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const current = getSessionKeepCount();
    const next = current + 1;
    window.sessionStorage.setItem(SESSION_KEEP_COUNT_KEY, String(next));
    return next;
  } catch {
    return 0;
  }
}

