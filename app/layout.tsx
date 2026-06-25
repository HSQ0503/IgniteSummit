import type { Metadata } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SparkDefs } from "./components/Brand";
import { GrainOverlay } from "./components/GrainOverlay";

// Display — from BizBuild's brand. Expressive editorial serif.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

// Body — from Empower Teens United's brand. Clean geometric sans.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Labels / timestamps — BizBuild's zine-mono accent.
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Ignite Summit — Where student leaders take the stage",
  description:
    "A live showcase of entrepreneurs and social impact leaders hosted by BizBuild and Empower Teens United at Windermere Preparatory School, Windermere, FL. Register to attend or apply to speak.",
  openGraph: {
    title: "Ignite Summit",
    description:
      "Where student leaders take the stage. A live showcase by BizBuild × Empower Teens United.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-dvh bg-cream font-sans text-ink">
        <SparkDefs />
        {children}
        <GrainOverlay />
      </body>
    </html>
  );
}
