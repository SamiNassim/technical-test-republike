import Navbar from "@/components/ui/navbar";
import UserMenu from "@/components/ui/user-menu";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <UserMenu />
            <main>
                {children}
            </main>
        </>

    )
}