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
  metadataBase: new URL("https://sameerbagul.me"),
  title: {
    default: "Sameer Bagul | Full Stack & AI Developer",
    template: "%s | Sameer Bagul",
  },
  description: "Senior Full Stack & AI Developer specializing in scalable MERN, Next.js, and AI systems. Smart India Hackathon Winner.",
  keywords: ["Sameer Bagul", "Full Stack Developer", "AI Engineer", "Next.js", "MERN Stack", "Pune", "India"],
  authors: [{ name: "Sameer Bagul", url: "https://sameerbagul.me" }],
  creator: "Sameer Bagul",
  openGraph: {
    title: "Sameer Bagul | Full Stack & AI Developer",
    description: "Senior Full Stack & AI Developer specializing in scalable MERN, Next.js, and AI systems.",
    url: "https://sameerbagul.me",
    siteName: "Sameer Bagul",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sameer Bagul | Full Stack & AI Developer",
    description: "Senior Full Stack & AI Developer specializing in scalable MERN, Next.js, and AI systems.",
    creator: "@sameer_bagul",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sameer Bagul",
  "url": "https://sameerbagul.me",
  "jobTitle": "Full Stack & AI Developer",
  "sameAs": [
    "https://github.com/Sameer-Bagul",
    "https://linkedin.com/in/sameer-bagul",
    "https://twitter.com/sameer_bagul"
  ],
  "alumniOf": "PES Modern College of Engineering, Pune",
  "knowsAbout": ["Full Stack Development", "Artificial Intelligence", "React", "Next.js", "Node.js", "MERN Stack"]
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>



    </html>
  );
}
