import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LoadingScreen } from "@/components/LoadingScreen";

export const metadata: Metadata = {
  metadataBase: new URL("https://prideofafricajourneys.com"),
  title: {
    default: "Pride of Africa Journeys | Where Africa Becomes an Experience",
    template: "%s | Pride of Africa Journeys"
  },
  description:
    "Luxury-inspired African safaris, airport transfers, beach holidays, hiking adventures, corporate travel, group tours, hotel booking, car hire, and guided journeys from Nairobi, Kenya.",
  keywords: [
    "Kenya safari packages",
    "African travel agency",
    "Nairobi airport transfers",
    "Kenya beach holidays",
    "corporate travel Kenya",
    "Pride of Africa Journeys"
  ],
  openGraph: {
    title: "Pride of Africa Journeys",
    description: "Where Africa Becomes an Experience.",
    url: "https://prideofafricajourneys.com/home",
    siteName: "Pride of Africa Journeys",
    images: [
      {
        url: "/brand/og-card.svg",
        width: 1200,
        height: 630,
        alt: "Pride of Africa Journeys safari sunset"
      }
    ],
    locale: "en_KE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pride of Africa Journeys",
    description: "Luxury-inspired African journeys crafted with authenticity and adventure."
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Pride of Africa Journeys",
  slogan: "Where Africa Becomes an Experience",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE"
  },
  areaServed: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Zanzibar", "East Africa"],
  telephone: "+254700000000",
  sameAs: ["https://wa.me/254700000000"]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SmoothScroll />
        <LoadingScreen />
        <div className="noise" aria-hidden="true" />
        <Navigation />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
