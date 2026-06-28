import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tanroj Billing — Dashboard",
  description:
    "Tanroj Billing — Cybersecurity & full-stack developer. An Xbox 360 dashboard-inspired portfolio.",
  openGraph: {
    title: "Tanroj Billing — Dashboard",
    description:
      "Cybersecurity & full-stack developer. An Xbox 360 dashboard-inspired portfolio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
