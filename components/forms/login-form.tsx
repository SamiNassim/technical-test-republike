"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    useFormField,
} from "@/components/ui/form"
import Link from "next/link"
import { Eye } from "lucide-react"
import { Input } from "@nextui-org/react"
import { useState } from "react"

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const formSchema = z.object({
    email: z.string().email({ message: "You must enter a valid email." }),
    password: z.string()
        .min(1, "Please enter a password.")
        .min(8, "Must have min. 8 characters")
        .regex(passwordValidation, {
            message: 'Your password is not valid',
        }),
})

const LoginForm = () => {

    const [passwordInputType, setPasswordInputType] = useState<string>("password");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    const showPassword = () => {
        passwordInputType === "password" ? setPasswordInputType("text") : setPasswordInputType("password");
    }

    const inputStyles = {
        inputWrapper: [
            "border rounded"
        ],
        label: [
            "font-semibold"
        ]
    }

    return (
        <div className="flex flex-col p-8 rounded-lg shadow min-w-[472px]">
            <h1 className="font-bold text-xl">Sign In</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => {
                            const { error } = useFormField();
                            return (
                                <Input
                                    label="Email"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    type="email"
                                    defaultValue=""
                                    radius="sm"
                                    variant="bordered"
                                    classNames={{
                                        ...inputStyles,
                                        mainWrapper: [
                                            "mt-8"
                                        ]
                                    }}
                                    errorMessage={error?.message}
                                    isInvalid={!!error?.message}
                                    {...field}
                                />
                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => {
                            const { error } = useFormField();
                            return (
                                <>
                                    <Input
                                        label="Password"
                                        labelPlacement="outside"
                                        placeholder=" "
                                        type={passwordInputType}
                                        defaultValue=""
                                        radius="sm"
                                        variant="bordered"
                                        endContent={<Eye onClick={() => showPassword()} opacity={0.6} strokeWidth={1.2} />}
                                        classNames={{
                                            ...inputStyles,
                                            mainWrapper: [
                                                "mt-10 mb-4"
                                            ]
                                        }}
                                        errorMessage={error?.message}
                                        isInvalid={!!error?.message}
                                        {...field} />
                                </>
                            )
                        }}
                    />
                    <Button type="submit" className="w-full">Create profile</Button>
                </form>
            </Form>
            <div className="flex flex-row text-sm mt-5 gap-1">
                <p className="font-normal text-[#9D9D9D]">Don’t have an account?</p>
                <Link href="/register">
                    <p className="font-semibold">Sign up</p>
                </Link>
            </div>
        </div>
    )
}

export default LoginForm;