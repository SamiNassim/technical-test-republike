import { Avatar } from "@nextui-org/react";

interface UserCardProps {
    username: string,
    firstname: string,
    lastname: string
}

const UserCard = ({
    username,
    firstname,
    lastname
}: UserCardProps) => {

    const fullName = firstname + "" + lastname;

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row items-center gap-4 w-full">
                <Avatar src="" size="md" name={fullName} classNames={{ base: "bg-[#f8f7ff]", name: "text-primary" }} showFallback />
                <div className="flex flex-col">
                    <p className="font-semibold">{fullName}</p>
                    <p className="text-primary text-sm">@{username}</p>
                </div>
            </div>
        </div>
    )
}

export default UserCard;