import Navbar from "@/components/ui/navbar";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>

    )
}