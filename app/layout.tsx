import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layouts/navbar";

export const metadata: Metadata = {
  title: "NotSoEasy Hiring Analyst",
  description: "Hiring isn't easy. Choosing candidates shouldn't be.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}