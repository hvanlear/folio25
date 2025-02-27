import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "../../hooks/useTheme";
import { figtree } from "../../styles/font";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "My Portfolio & Blog",
  description = "A showcase of my work and thoughts",
  ogImage = "/images/og-default.jpg",
  canonical,
}) => {
  const { theme } = useTheme();
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com";
  const fullUrl = canonical || `${url}${router.asPath}`;

  return (
    <div
      className={`min-h-screen flex flex-col ${theme} ${figtree.variable} antialiased`}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={fullUrl} />

        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${url}${ogImage}`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${url}${ogImage}`} />
      </Head>

      <Header />

      <main className="flex-grow w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
