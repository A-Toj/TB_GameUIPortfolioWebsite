import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import { profile, projects, education, skills } from "@/lib/data";

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

const SITE_URL = "https://tanrojbilling.com";
const TITLE = "Tanroj Billing // Cybersecurity & Full-Stack Developer";
const DESCRIPTION =
  "Portfolio of Tanroj Billing, a cybersecurity and full-stack developer in Turlock, CA. " +
  "B.S. Computer Science (Cybersecurity concentration, CSU Stanislaus). Projects in secure " +
  "web development, relational databases, Python, and computer vision. Styled as an Xbox 360 dashboard.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Only send the origin (never the full URL) to external sites, and nothing
  // when navigating from HTTPS to HTTP.
  referrer: "strict-origin-when-cross-origin",
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Tanroj Billing",
    "cybersecurity",
    "full-stack developer",
    "web developer",
    "portfolio",
    "Turlock CA",
    "CSU Stanislaus",
    "computer science",
  ],
  authors: [{ name: "Tanroj Billing", url: SITE_URL }],
  creator: "Tanroj Billing",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Tanroj Billing // Dashboard",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tanroj Billing, cybersecurity and full-stack developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
};

// Structured data for search engines. Because the dashboard channels render
// client-side (crawlers never click blades), this JSON-LD carries the full
// profile: identity, education, skills, and projects.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.gamertag,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  jobTitle: "Cybersecurity & Full-Stack Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Turlock",
    addressRegion: "CA",
    addressCountry: "US",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.school,
  },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    ...skills.languages,
    ...skills.frameworks,
    ...skills.tools,
    ...skills.concepts,
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Full-Stack Developer",
    occupationLocation: { "@type": "City", name: "Turlock, California" },
    skills: skills.languages.join(", "),
  },
  mainEntityOfPage: {
    "@type": "WebSite",
    "@id": SITE_URL,
    name: "Tanroj Billing // Dashboard",
    description: DESCRIPTION,
  },
  subjectOf: projects.map((p) => ({
    "@type": "CreativeWork",
    name: p.title,
    description: p.blurb,
    keywords: p.stack.join(", "),
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
