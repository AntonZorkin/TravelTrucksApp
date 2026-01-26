import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TravelTrucks — Camper Rental",
  description:
    "Platform for renting campers and motorhomes with detailed listings, reviews, and online booking.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "TravelTrucks — Camper Rental",
    description:
      "Platform for renting campers and motorhomes with detailed listings, reviews, and online booking.",
    url: "",

    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
