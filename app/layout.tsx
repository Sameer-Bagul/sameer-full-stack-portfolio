import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Instrument_Serif, DM_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ConditionalFooter from "@/components/ConditionalFooter";
import CustomCursor from "@/components/ui/CustomCursor";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HeaderProvider } from "@/context/HeaderContext";
import { PortfolioProvider } from "@/context/PortfolioContext";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/next";
import { getAllPortfolioData } from "@/lib/api";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

// Revalidate every 5 minutes (ISR)
export const revalidate = 300;



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  subsets: ["latin"],
});

const seona = localFont({
  src: "./fonts/Seona-DEMO.otf",
  variable: "--font-seona",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sameer Bagul | Freelancer & Software AI Developer",
    template: `%s | ${SITE_NAME} - Freelancing Services`,
  },
  description: "Freelance Software AI Developer. Expert coding notes, engineering blogs, and high-quality freelancing services for startups and enterprises specializing in MERN and AI.",
  keywords: ["Sameer Bagul", "Freelancer", "Freelancing Services", "Software AI Developer", "Coding Notes", "Engineering Blog", "Technical Research", "JavaScript Notes", "Next.js Expert", "AI Engineer"],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    title: "Sameer Bagul | Full Stack & AI Developer",
    description: "Senior Full Stack & AI Developer specializing in scalable MERN, Next.js, and AI systems.",
    url: SITE_URL,
    siteName: SITE_NAME,
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
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": SITE_NAME,
  "url": SITE_URL,
  "jobTitle": "Full Stack & AI Developer",
  "sameAs": [
    "https://github.com/Sameer-Bagul",
    "https://linkedin.com/in/sameer-bagul",
    "https://twitter.com/sameer_bagul"
  ],
  "image": {
    "@type": "ImageObject",
    "url": absoluteUrl('/hero.jpg'),
    "caption": "Sameer Bagul - Freelance Software AI Developer",
    "width": "1200",
    "height": "1200"
  },
  "priceRange": "$$",
  "knowsAbout": ["Full Stack Development", "Artificial Intelligence", "Technical Writing", "Software Engineering Education"],
  "description": "Expert freelancing services, in-depth coding notes, and engineering blogs by Sameer Bagul. Specializing in advanced technical solutions and software research."
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Sameer Bagul - Freelance Software AI Developer",
  "description": "Expert freelancing services in Full Stack Development and AI Solutions. Specializing in Next.js, MERN, and AI-driven applications.",
  "image": absoluteUrl('/hero.jpg'),
  "url": SITE_URL,
  "telephone": "+91-XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pune",
    "addressRegion": "Maharashtra",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 18.5204,
    "longitude": 73.8567
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "$$"
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch data server-side
  let portfolioData;
  try {
    portfolioData = await getAllPortfolioData();
  } catch (err) {
    console.error("Failed to fetch initial portfolio data:", err);
  }

  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${seona.variable} ${bebasNeue.variable} ${instrumentSerif.variable} ${dmMono.variable} ${inter.variable} antialiased selection:bg-primary selection:text-primary-foreground overflow-x-hidden w-full font-inter`}
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
              <PortfolioProvider initialData={portfolioData}>
                {/* <GridOverlay /> */}
                <CustomCursor />

                <Header />

                <main className="min-h-screen flex flex-col items-center w-full overflow-x-clip">
                  <div className="w-full max-w-350 overflow-x-clip">
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
        />
      </body>



    </html>
  );
}
