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
      <body className="min-h-screen bg-gradient-diagonal bg-noise text-zinc-100 antialiased font-sans">
        <svg aria-hidden="true" className="absolute size-0 overflow-hidden" focusable="false">
          <defs>
            <filter id="noiseFilter" x="0" y="0">
              <feTurbulence baseFrequency="0.8" numOctaves="4" type="fractalNoise" result="noise" />
              <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
              <feBlend in="SourceGraphic" in2="mono" mode="overlay" />
            </filter>
          </defs>
        </svg>
        <div className="relative z-10 min-h-screen">
          <MixpanelProvider>
            <I18nProvider>{children}</I18nProvider>
          </MixpanelProvider>
        </div>
      </body>
    </html>
  );
}
