import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AMC Storm Roof Check",
  description: "Homeowner Intake → Contractor Portal",
  openGraph: {
    title: "AMC Storm Roof Check",
    description: "Homeowner Intake → Contractor Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMC Storm Roof Check",
    description: "Homeowner Intake → Contractor Portal",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${inter.variable} ${inter.className}`}>
      <body className="min-h-screen antialiased">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
