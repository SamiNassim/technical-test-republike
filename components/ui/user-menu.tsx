import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserUI from "./user-ui";

const UserMenu = async () => {

    const session = await getServerSession(authOptions);

    return (
        <div className="fixed left-9 top-28 min-w-56 z-10">
            <UserUI session={session} />
        </div>
    )
}

export default UserMenu;