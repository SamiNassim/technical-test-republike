import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { UIProvider } from "@/providers/nextui-provider";
import { Toaster } from "@/components/ui/toaster";

const myFont = localFont({
  src: 'TTFirsNeue.ttf',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Republike",
  description: "Réseau social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={myFont.className}>
        <main>
          <UIProvider>
            {children}
            <Toaster />
          </UIProvider>
        </main>
      </body>
    </html>
  );
}
