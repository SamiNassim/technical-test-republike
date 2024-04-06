import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized request." }, { status: 401 })
    }

    try {
        const body = await req.json();
        const { messageId } = body;

        const currentUser = await db.user.findUnique({
            where: {
                email: session?.user.email!,
            }
        })

        const selectedMessage = await db.message.findUnique({
            where: {
                id: messageId,
            },
            include: {
                dislikedByUsers: true
            }
        })

        const userDisliked = selectedMessage?.dislikedByUsers.some((u) => u.id === currentUser?.id)

        if (userDisliked) {
            const removeDislike = await db.message.update({
                where: {
                    id: messageId
                },
                data: {
                    dislikedByUsers: {
                        disconnect: {
                            id: currentUser?.id
                        }
                    }
                }
            })

            const likeMessage = await db.message.update({
                where: {
                    id: messageId,
                },
                data: {
                    likedByUsers: {
                        connect: {
                            id: currentUser?.id
                        }
                    }
                }
            })

            return NextResponse.json({ message: "Message liked!" }, { status: 200 });

        }

        const likeMessage = await db.message.update({
            where: {
                id: messageId,
            },
            data: {
                likedByUsers: {
                    connect: {
                        id: currentUser?.id
                    }
                }
            }
        })

        return NextResponse.json({ message: "Message liked!" }, { status: 200 });
    } catch (error) {
        console.log("[LIKE_POST_ERROR]", error)
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}
