import type { Metadata } from "next";
import "@fontsource/fragment-mono/400.css";
import "@fontsource-variable/inter";
import "./globals.css";
import { site } from "../../content/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageLoader } from "@/components/motion/PageLoader";

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL in Vercel once the domain is live, so link
  // previews in Instagram/Messenger resolve images correctly.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NZ">
      <body className="bg-paper text-ink antialiased">
        <PageLoader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
