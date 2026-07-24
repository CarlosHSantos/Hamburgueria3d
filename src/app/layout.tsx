import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brasa Burger | Hamburgueria Artesanal Premium",
  description:
    "Experimente o verdadeiro sabor da carne grelhada na brasa com ingredientes frescos e selecionados. Hamburgueria artesanal premium com blend exclusivo de carne Angus.",
  keywords: [
    "hamburgueria",
    "artesanal",
    "premium",
    "brasa",
    "smash burger",
    "angus",
    "delivery",
  ],
  openGraph: {
    title: "Brasa Burger | Hamburgueria Artesanal Premium",
    description:
      "O verdadeiro sabor da carne grelhada na brasa. Ingredientes frescos, blend exclusivo.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
