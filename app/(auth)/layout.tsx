import Image from "next/image";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full min-h-screen">
            <div className="flex w-full min-h-screen">
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
            </div>
        </main>
    )
}