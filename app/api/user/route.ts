import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { RegisterSchema } from "@/schemas";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, firstname, lastname, username } = RegisterSchema.parse(body);

        const existingUserByEmail = await db.user.findUnique({
            where: {
                email: email
            }
        });

        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "An user with this email already exists." }, { status: 409 })
        }

        const existingUserByUsername = await db.user.findUnique({
            where: {
                username: username
            }
        });

        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "An user with this username already exists." }, { status: 409 })
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                firstname,
                lastname,
                username
            }
        })

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "User created." }, { status: 201 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Something went wrong !" }, { status: 500 });
    }
}