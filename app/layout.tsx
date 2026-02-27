import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ConditionalFooter from "@/components/ConditionalFooter";
import CustomCursor from "@/components/ui/CustomCursor";
import GridOverlay from "@/components/GridOverlay";
import Link from 'next/link';
import ThemeToggle from "@/components/ThemeToggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HeaderProvider } from "@/context/HeaderContext";
import { PortfolioProvider } from "@/context/PortfolioContext";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const seona = localFont({
  src: "./fonts/Seona-DEMO.otf",
  variable: "--font-seona",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sameer Bagul | Portfolio",
  description: "Senior Full Stack Engineer specializing in AI and modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${seona.variable} antialiased selection:bg-primary selection:text-primary-foreground overflow-x-hidden w-full`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <HeaderProvider>
              <PortfolioProvider>
                {/* <GridOverlay /> */}
                <CustomCursor />

                <Header />

                <main className="min-h-screen flex flex-col items-center w-full overflow-x-hidden">
                  <div className="w-full max-w-[1400px] overflow-x-hidden">
                    {children}
                  </div>
                </main>
                <ConditionalFooter />
              </PortfolioProvider>
            </HeaderProvider>
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
