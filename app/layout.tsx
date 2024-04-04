import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
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
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
