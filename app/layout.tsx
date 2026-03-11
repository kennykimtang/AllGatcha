import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { I18nProvider } from "@/components/I18nProvider";
import { MixpanelProvider } from "@/components/MixpanelProvider";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

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
    <html lang="en" suppressHydrationWarning className={notoSansKr.variable}>
      <body className="min-h-screen bg-[#09090b] text-zinc-100 antialiased font-sans bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900/80">
        <MixpanelProvider>
          <I18nProvider>{children}</I18nProvider>
        </MixpanelProvider>
      </body>
    </html>
  );
}
