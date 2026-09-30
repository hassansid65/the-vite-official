import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { readStore } from "@/lib/db";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await readStore();
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    metadataBase: new URL(site),
    title: {
      default: `${settings.brandName} — ${settings.tagline}`,
      template: `%s — ${settings.brandName}`,
    },
    description: settings.footer.about,
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-fg">{children}</body>
    </html>
  );
}
