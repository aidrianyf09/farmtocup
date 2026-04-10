import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const playfair = Playfair_Display({
  subsets:  ["latin"],
  variable: "--font-display",
  display:  "swap",
});

const dmSans = DM_Sans({
  subsets:  ["latin"],
  variable: "--font-body",
  display:  "swap",
});

export const metadata: Metadata = {
  title: {
    default:  "Farm to Cup Philippines",
    template: "%s | Farm to Cup Philippines",
  },
  description:
    "Specialty coffee from farm to your cup. Green and roasted coffee beans sourced from the highlands of Benguet. EST. PH 2020.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body style={{ backgroundColor: "#FAF0E6", color: "#1E0E06" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}