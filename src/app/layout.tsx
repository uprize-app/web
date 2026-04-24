import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { TopBar } from "@/shared/components/TopBar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono-latin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UPRIZE — Architecture, generated.",
  description:
    "시행사를 위한 건축 스튜디오. 지도에서 필지를 찍으면 용도·층수·스타일에 맞춰 외관을 90초 안에 그려 드립니다.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html
    lang="ko"
    className={`${spaceGrotesk.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
  >
    <body suppressHydrationWarning>
      <QueryProvider>
        <TopBar />
        {children}
      </QueryProvider>
    </body>
  </html>
);

export default RootLayout;
