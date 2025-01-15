import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mark's Portfolio",
  description: "Portfolio for Mark Bassily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head />
    <body>{children}</body>
    </html>
  );
}
