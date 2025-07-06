import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Use Inter instead of Geist (which isn't available by default)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sage - Personalized Cannabis Recommendations",
  description: "Find your perfect cannabis strain match based on your unique needs and scientific research",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}