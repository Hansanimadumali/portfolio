import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Space_Grotesk, JetBrains_Mono, Caveat } from "next/font/google";
import { MotionConfig } from "motion/react";

const sans = Inter({ subsets: ["latin"], display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", weight: ["400", "500"] });
const hand = Caveat({ subsets: ["latin"], display: "swap", weight: ["500", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Font variables live on :root so portals (dialogs) inherit them too. */}
      <style jsx global>{`
        :root {
          --font-sans: ${sans.style.fontFamily};
          --font-display: ${display.style.fontFamily};
          --font-mono: ${mono.style.fontFamily};
          --font-hand: ${hand.style.fontFamily};
        }
      `}</style>
      <MotionConfig reducedMotion="user">
        <Component {...pageProps} />
      </MotionConfig>
    </>
  );
}
