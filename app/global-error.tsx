"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#18181b", color: "#fafafa", fontFamily: "system-ui", padding: "2rem" }}>
        <h1>Something went wrong</h1>
        <pre style={{ background: "#27272a", padding: "1rem", borderRadius: "0.5rem", overflow: "auto" }}>
          {error.message}
        </pre>
        <button
          type="button"
          onClick={() => reset()}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
