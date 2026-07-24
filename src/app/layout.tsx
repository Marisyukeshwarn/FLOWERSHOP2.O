import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { StoreProvider } from "@/lib/store";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mahalakshmibloom.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "MAHALAKSHMI Bloom Studio | Premium Flower Mala & Wedding Garlands",
    template: "%s | MAHALAKSHMI Bloom Studio",
  },
  description:
    "India's premium Flower Mala e-commerce platform. Custom Wedding Malas, Entrance Malas, Reception Garlands, Temple Flowers & more. Order fresh, handcrafted floral designs for every occasion in Coimbatore.",
  keywords: [
    "flower mala",
    "wedding mala",
    "entrance mala",
    "temple garland",
    "fresh flowers",
    "custom mala",
    "reception mala",
    "jasmine mala",
    "rose mala",
    "Coimbatore florist",
    "bridal flowers",
  ],
  authors: [{ name: "MAHALAKSHMI Bloom Studio" }],
  creator: "MAHALAKSHMI Bloom Studio",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://mahalakshmibloom.com",
    siteName: "MAHALAKSHMI Bloom Studio",
    title: "MAHALAKSHMI Bloom Studio | Premium Flower Mala & Wedding Garlands",
    description:
      "India's premium Flower Mala e-commerce platform. Custom Wedding Malas, Entrance Malas, Reception Garlands & Temple Flowers.",
    images: [
      {
        url: "https://mahalakshmibloom.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MAHALAKSHMI Bloom Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAHALAKSHMI Bloom Studio | Premium Flower Mala",
    description: "Custom Wedding Malas, Reception Garlands & Temple Flowers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background">
        <NextAuthProvider>
          <StoreProvider>
            <Navbar />
            <main className="flex-grow pt-20">{children}</main>
            <Footer />
            <FloatingButtons />
          </StoreProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
