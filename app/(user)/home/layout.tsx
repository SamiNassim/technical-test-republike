import Navbar from "@/components/ui/navbar";
import UserMenu from "@/components/ui/user-menu";
import Image from "next/image";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col w-full min-h-screen">
            <Navbar />
            <UserMenu />
            <main className="w-full min-h-screen">
                {children}
            </main>
        </div>
    )
}