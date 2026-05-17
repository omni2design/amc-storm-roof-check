import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMC Storm Roof Check",
  description: "Storm damage intake and triage for All Might Contracting.",
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
    <html lang="en" data-theme="light">
      <body className="min-h-screen antialiased">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
