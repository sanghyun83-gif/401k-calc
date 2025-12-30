import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "./site-config";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${SITE.year} ${SITE.name} | Free Retirement Calculator`,
  description: SITE.description,
  keywords: [
    "401k calculator",
    "retirement calculator",
    "401k contribution limits 2025",
    "employer match calculator",
    "roth vs traditional 401k",
    "catch up contribution",
    "401k withdrawal calculator",
  ],
  openGraph: {
    title: `${SITE.year} 401k Calculator | Free Retirement Calculator`,
    description: "Calculate your 401k retirement savings. See contribution limits, employer matching, and projected growth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
