import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod"

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const userSchema = z.object({
    email: z.string().min(1, "Please enter your email.").email("You must enter a valid email."),
    password: z.string()
        .min(1, "Please enter a password.")
        .min(8, "Must have min. 8 characters")
        .regex(passwordValidation, {
            message: 'Your password is not valid',
        }),
    firstname: z.string().min(1, "Please enter your first name."),
    lastname: z.string().min(1, "Please enter your last name."),
    username: z.string().min(1, "Please enter an username").max(15, "Your username must have max. 15 characters")
})

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, firstname, lastname, username } = userSchema.parse(body);

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