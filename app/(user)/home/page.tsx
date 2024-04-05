import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const HomePage = async () => {

    const session = await getServerSession(authOptions);

    console.log(session);

    return (
        <div></div>
    )
}

export default HomePage;