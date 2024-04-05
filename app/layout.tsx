import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import Image from "next/image";
import { UIProvider } from "@/providers/nextui-provider";

// const inter = Inter({ subsets: ["latin"] });
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
        <main className="flex flex-row w-full min-h-screen">
          <div className="flex w-1/2 justify-center items-center bg-[#7B61FF]">
            <Image
              src="/logo.svg"
              width={120}
              height={120}
              alt="Logo Republik"
            />
          </div>
          <div className="flex w-1/2 justify-center items-center bg-[#FFFFFF]">
            <UIProvider>
              {children}
            </UIProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
