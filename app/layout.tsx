import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import "./globals.css";
import { BagProvider } from "@/components/BagProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BagDrawer } from "@/components/BagDrawer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SITE_URL, site } from "@/config/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — Men's shirts in Accra`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GH",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0F1E33",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GH" className={`${fraunces.variable} ${interTight.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <BagProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BagDrawer />
          <FloatingWhatsApp />
        </BagProvider>
      </body>
    </html>
  );
}
