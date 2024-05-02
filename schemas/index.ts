import { z } from "zod"

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const RegisterSchema = z.object({
    email: z.string().min(1, "Please enter your email.").email("You must enter a valid email."),
    password: z.string()
        .min(1, "Please enter a password.")
        .min(8, "Must have min. 8 characters")
        .regex(passwordValidation, {
            message: 'Your password is not valid',
        }),
    firstname: z.string().min(1, "Please enter your first name."),
    lastname: z.string().min(1, "Please enter your last name."),
    username: z.string().min(1, "Please enter an username.").max(15, "Your username must have max. 15 characters.")
})

export const LoginSchema = z.object({
    email: z.string().email({ message: "You must enter a valid email." }),
    password: z.string()
        .min(1, "Please enter your password.")
        .min(8, "Must have min. 8 characters")
        .regex(passwordValidation, {
            message: 'Your password is not valid',
        }),
})

export const MessageSchema = z.object({
    content: z.string()
        .min(1, "Your message is empty !")
        .max(500, "Your message must have max. 500 characters.")
})
