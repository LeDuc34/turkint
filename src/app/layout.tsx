import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turk'Int",
  description: "Application de commande de Kebab en ligne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const CrispWithNoSSR = dynamic(
  // () => import('crisp/page'),)
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
