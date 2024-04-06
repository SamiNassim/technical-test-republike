import MessageList from "@/components/ui/message-list";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const HomePage = async () => {

    const session = await getServerSession(authOptions);

    if (!session?.user) { redirect("/login") }

    return (
        <div className="flex justify-center items-center mt-28 mb-6">
            <MessageList session={session} />
        </div>
    )
}

export default HomePage;