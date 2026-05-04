import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Providers } from "@/lib/Providers";
import CartDrawer from "@/components/CartDrawer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "El Chiltepín | Mariscos Estilo Culiacán en Aguascalientes",
  description: "Disfruta de los mejores mariscos estilo Sinaloa en Aguascalientes. Aguachiles, tostadas, ceviches y más con el sabor auténtico de Culiacán.",
  keywords: ["mariscos", "aguascalientes", "culiacan", "sinaloa", "aguachile", "el chiltepin", "restaurante"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable}`}>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Providers>
          {children}
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
