import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Manrope({
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cheffekhadidiatou.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cheffe Khadidiatou | Cuisine africaine contemporaine",
    template: "%s · Cheffe Khadidiatou",
  },
  description:
    "Maison numérique de Cheffe Khadidiatou — recettes, créations culinaires, journal et collaborations. Une cuisine inspirée des traditions africaines, revisitée avec modernité.",
  keywords: [
    "Cheffe Khadidiatou",
    "cuisine africaine",
    "gastronomie sénégalaise",
    "recettes africaines",
    "cheffe",
    "Dakar",
  ],
  authors: [{ name: "Cheffe Khadidiatou" }],
  openGraph: {
    title: "Cheffe Khadidiatou | Cuisine africaine contemporaine",
    description:
      "L’art de raconter l’Afrique à travers la cuisine — recettes, créations, journal et collaborations.",
    url: siteUrl,
    siteName: "Cheffe Khadidiatou",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheffe Khadidiatou | Cuisine africaine contemporaine",
    description:
      "L’art de raconter l’Afrique à travers la cuisine — recettes, créations, journal et collaborations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4efe7",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[#f4efe7] text-[#111111] selection:bg-[#8b5e3c] selection:text-[#f8f2ec]">
        {children}
      </body>
    </html>
  );
}