"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-950 p-6 text-zinc-100">
      <h1 className="text-xl font-bold">Something went wrong</h1>
      <pre className="max-w-full overflow-auto rounded bg-zinc-800 p-4 text-sm text-red-300">
        {error.message}
      </pre>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-amber-500 px-4 py-2 font-medium text-zinc-950"
      >
        Try again
      </button>
    </div>
  );
}
