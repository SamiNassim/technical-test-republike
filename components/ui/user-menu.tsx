import { authOptions } from "@/lib/auth";
import { Avatar, Button } from "@nextui-org/react"
import { Home } from "lucide-react";
import { getServerSession } from "next-auth";

const UserMenu = async () => {

    const session = await getServerSession(authOptions);

    const fullName = session?.user.firstname + "" + session?.user.lastname;

    return (
        <div className="sticky left-9 top-24 max-w-56">
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col w-full">
                    <div className="flex flex-row items-center gap-4 w-full">
                        <Avatar src="" size="md" name={fullName} classNames={{ base: "bg-[#f8f7ff]", name: "text-primary" }} showFallback />
                        <div className="flex flex-col">
                            <p className="font-semibold">{fullName}</p>
                            <p className="text-primary text-sm">@{session?.user.username}</p>
                        </div>
                    </div>
                </div>
                <Button className="bg-[#f8f7ff]  hover:bg-[#f8f7ff] text-primary w-full justify-start" radius="sm" startContent={<Home />}>Home</Button>
                <Button className="bg-primary text-white w-full" radius="sm">Create new post</Button>
                <Button className="bg-black text-white w-full" radius="sm">Sign out</Button>
            </div>
        </div>
    )
}

export default UserMenu;