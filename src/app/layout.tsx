import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import { Header } from "@/components/layout";

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
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="font-montserrat background cursor-default">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            // next-themes 0.4.5's pre-paint script throws when `value` is unset,
            // so the theme class only lands after hydration (light flash in dark mode)
            value={{ light: "light", dark: "dark" }}
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
