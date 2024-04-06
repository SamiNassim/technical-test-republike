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
        const { content } = body;

        const currentUser = await db.user.findUnique({
            where: {
                email: session?.user.email!,
            }
        })


        const newMessage = await db.message.create({
            data: {
                content: content,
                userId: currentUser?.id as string
            }
        })

        return NextResponse.json({ newMessage, message: "Message posted!" }, { status: 201 });
    } catch (error) {
        console.log("BACKEND", error)
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
    }
}

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized request." }, { status: 401 })
    }

    const allMessages = await db.message.findMany({
        include: {
            user: {
                select: {
                    username: true,
                    firstname: true,
                    lastname: true,
                }
            },
            likedByUsers: {
                select: {
                    id: true,
                    username: true,
                    firstname: true,
                    lastname: true,
                }
            },
            dislikedByUsers: {
                select: {
                    id: true,
                    username: true,
                    firstname: true,
                    lastname: true,
                }
            }
        }
    });

    return NextResponse.json({ allMessages }, { status: 200 });
}