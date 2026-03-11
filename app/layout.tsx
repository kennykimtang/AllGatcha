import type { Metadata } from "next";
import { I18nProvider } from "@/components/I18nProvider";
import { MixpanelProvider } from "@/components/MixpanelProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Internet Card",
  description: "Draw random Wikipedia pages as collectible cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <MixpanelProvider>
          <I18nProvider>{children}</I18nProvider>
        </MixpanelProvider>
      </body>
    </html>
  );
}
