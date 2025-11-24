import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./main.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "FinanceNinja - Portfolio Demo",
  description: "Interactive finance tracking demo showcasing modern web development with Next.js, React, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
