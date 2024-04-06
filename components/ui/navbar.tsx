import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="fixed w-full top-0 h-16 border-b-1 border-[#E8E9EB] bg-white z-30">
            <div className="flex flex-row justify-center items-center w-full h-full">
                <div className="absolute left-10">
                    <Link href="/home">
                        <Image
                            src="/logoblack.svg"
                            width={36}
                            height={36}
                            alt="Logo Republik"
                            color="black"
                        />
                    </Link>
                </div>
                <div>
                    <p className="text-xl font-bold">Home</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;