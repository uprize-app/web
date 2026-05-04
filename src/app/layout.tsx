import type { Metadata } from "next";
import { Inter, Instrument_Serif, Noto_Sans_KR } from "next/font/google";

import { Nav } from "@/components/layout/Nav";
import { QueryProvider } from "@/shared/providers/QueryProvider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "Uprize — Build Before You Build",
  description:
    "시행사 대표가 건축사무소 가기 전, AI로 필지 위에 건물을 먼저 올려보는 서비스",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html
    lang="ko"
    className={`${inter.variable} ${instrument.variable} ${noto.variable}`}
  >
    <body className="min-h-dvh animate-page-in">
      <QueryProvider>
        <div className="flex min-h-dvh flex-col">
          <Nav />
          <div className="flex flex-1 flex-col">{children}</div>
        </div>
      </QueryProvider>
    </body>
  </html>
);

export default RootLayout;
