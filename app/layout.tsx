import type { Metadata } from "next";
import "./globals.css";
import { siteTitle } from "@/lib/quizData";

export const metadata: Metadata = {
  title: siteTitle.en,
  description: siteTitle.zh,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
