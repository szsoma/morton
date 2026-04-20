import type { Metadata } from "next";
import localFont from "next/font/local";
import { getPayload } from "payload";
import config from "@payload-config";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const geist = localFont({
  src: [
    { path: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Regular.woff2", weight: "400" },
    { path: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Medium.woff2", weight: "500" },
    { path: "../../node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.woff2", weight: "600" },
  ],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = localFont({
  src: [
    { path: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.woff2", weight: "400" },
    { path: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Medium.woff2", weight: "500" },
    { path: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-SemiBold.woff2", weight: "600" },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({ slug: "site-settings" });
    return {
      title: settings.siteTitle || "Morton Backpacks",
      description: settings.siteDescription || "",
    };
  } catch {
    return {
      title: "Morton Backpacks",
      description: "Premium bicycle backpacks engineered for cyclists.",
    };
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
