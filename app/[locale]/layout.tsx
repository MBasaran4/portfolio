import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { BackgroundLayers } from "@/components/layout/BackgroundLayers";
import { ScrollProgress } from "@/components/animation/ScrollProgress";
import { JsonLd } from "@/components/seo/JsonLd";
import { personalData } from "@/data/personal";
import { getDictionary, isLocale, defaultLocale, locales } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? locale : defaultLocale;
  const dict = getDictionary(currentLocale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mbasaran.dev";

  const title = `${personalData.name} — ${dict.hero.titleRole}`;
  const description = dict.about.leadBio;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${personalData.name}`,
    },
    description,
    keywords: [
      "Mücahit Başaran",
      "Computer Engineer",
      "Software Developer",
      "Bilgisayar Mühendisi",
      "Yazılım Geliştirici",
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "Artificial Intelligence",
      "Yapay Zeka",
      "Machine Learning",
      "AI Agents",
      "Audio Fault Detection",
      "HesapKitap",
      "AgentVerge",
      "Portfolio",
    ],
    authors: [{ name: personalData.name }],
    creator: personalData.name,
    alternates: {
      canonical: `${siteUrl}/${currentLocale}`,
      languages: {
        tr: `${siteUrl}/tr`,
        en: `${siteUrl}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: currentLocale === "tr" ? "tr_TR" : "en_US",
      url: `${siteUrl}/${currentLocale}`,
      title,
      description,
      siteName: `${personalData.name} Portfolio`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = isLocale(locale) ? locale : defaultLocale;
  const dict = getDictionary(currentLocale);

  return (
    <html
      lang={currentLocale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <JsonLd
          jobTitle={dict.hero.titleRole}
          description={dict.about.leadBio}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#090b10] text-[#f8fafc] selection:bg-[rgba(6,182,212,0.25)] selection:text-[#00f5d4] font-sans relative overflow-x-hidden">
        <SmoothScroll>
          <ScrollProgress />
          <BackgroundLayers />
          <Navbar currentLocale={currentLocale} dict={dict.nav} />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer dict={dict.footer} />
        </SmoothScroll>
      </body>
    </html>
  );
}
