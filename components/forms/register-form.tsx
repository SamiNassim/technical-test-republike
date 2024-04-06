"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
} from "@/components/ui/form"
import Link from "next/link"
import { Eye } from "lucide-react"
import { Input } from "@nextui-org/react"
import { useState } from "react"
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation"
import { toast } from "../ui/use-toast"

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const formSchema = z.object({
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

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [passwordInputType, setPasswordInputType] = useState<string>("password");

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            username: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            await axios.post("/api/user", values);
            router.push("/login")
            toast({
                title: "Notification",
                description: "Account created ! You can now login.",
            })
        } catch (e) {
            setIsLoading(false);
            const error = e as AxiosError;
            console.log(error);
        }
    }

    const showPassword = () => {
        passwordInputType === "password" ? setPasswordInputType("text") : setPasswordInputType("password");
    }

    const inputStyles = {
        inputWrapper: [
            "border rounded"
        ],
        mainWrapper: [
            "mt-10"
        ],
        helperWrapper: [
            "font-extralight"
        ],
        label: [
            "font-semibold"
        ]
    }

    return (
        <div className="p-8 rounded-lg shadow min-w-[472px]">
            <h1 className="font-bold text-xl mb-2">Create your account</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => {
                            return (
                                <Input
                                    label="Email"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    type="email"
                                    defaultValue=""
                                    radius="sm"
                                    variant="bordered"
                                    classNames={inputStyles}
                                    errorMessage={fieldState.error?.message}
                                    isInvalid={!!fieldState.error?.message}
                                    {...field}
                                />
                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field, fieldState }) => {
                            return (
                                <>
                                    <Input
                                        label="Password"
                                        labelPlacement="outside"
                                        placeholder=" "
                                        description="Must have min. 8 characters, 1 number, uppercase and special character"
                                        type={passwordInputType}
                                        defaultValue=""
                                        radius="sm"
                                        variant="bordered"
                                        endContent={<Eye onClick={() => showPassword()} opacity={0.6} strokeWidth={1.2} />}
                                        classNames={inputStyles}
                                        errorMessage={fieldState.error?.message}
                                        isInvalid={!!fieldState.error?.message}
                                        {...field} />
                                </>
                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field, fieldState }) => {
                            return (
                                <Input
                                    label="First name"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    defaultValue=""
                                    radius="sm"
                                    variant="bordered"
                                    classNames={inputStyles}
                                    errorMessage={fieldState.error?.message}
                                    isInvalid={!!fieldState.error?.message}
                                    {...field}
                                />
                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field, fieldState }) => {
                            return (
                                <Input
                                    label="Last name"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    defaultValue=""
                                    radius="sm"
                                    variant="bordered"
                                    classNames={inputStyles}
                                    errorMessage={fieldState.error?.message}
                                    isInvalid={!!fieldState.error?.message}
                                    {...field}
                                />
                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field, fieldState }) => {
                            return (
                                <Input
                                    label="Username"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    defaultValue=""
                                    radius="sm"
                                    variant="bordered"
                                    classNames={{
                                        ...inputStyles,
                                        mainWrapper: [
                                            "mt-10 mb-4"
                                        ]
                                    }}
                                    errorMessage={fieldState.error?.message}
                                    isInvalid={!!fieldState.error?.message}
                                    {...field}
                                />
                            )
                        }}
                    />
                    <Button type="submit" className="w-full">Create profile</Button>
                </form>
            </Form>
            <div className="flex flex-row text-sm mt-5 gap-1">
                <p className="font-normal text-[#9D9D9D]">Already have an account? </p>
                <Link href="/login">
                    <p className="font-semibold">Sign in</p>
                </Link>
            </div>
        </div>
    )
}


export default RegisterForm;