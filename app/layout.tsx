import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit"
});

export const metadata: Metadata = {
  title: "AI Study Topic Explainer",
  description: "A student-friendly AI app that explains study topics in simple language."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-accent/30 selection:text-white`}>{children}</body>
    </html>
  );
}
