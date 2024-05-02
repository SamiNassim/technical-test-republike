"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormField
} from "@/components/ui/form"
import Link from "next/link"
import { Eye } from "lucide-react"
import { Button, Input, Spinner } from "@nextui-org/react"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "../ui/use-toast"
import { LoginSchema } from "@/schemas"

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [passwordInputType, setPasswordInputType] = useState<string>("password");
    const router = useRouter();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof LoginSchema>) {
        setIsLoading(true);
        const loginData = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        })

        if (loginData?.error === null) {
            router.refresh();
            router.push("/home");
        } else {
            setIsLoading(false);
            toast({
                title: "Error",
                description: "Something went wrong!",
                variant: "destructive",
            })
        }
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
                                    classNames={{
                                        ...inputStyles,
                                        mainWrapper: [
                                            "mt-8"
                                        ]
                                    }}
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
                                        type={passwordInputType}
                                        defaultValue=""
                                        radius="sm"
                                        variant="bordered"
                                        endContent={<Eye onClick={() => showPassword()} opacity={0.6} strokeWidth={1.2} className="cursor-pointer" />}
                                        classNames={{
                                            ...inputStyles,
                                            mainWrapper: [
                                                "mt-10 mb-4"
                                            ]
                                        }}
                                        errorMessage={fieldState.error?.message}
                                        isInvalid={!!fieldState.error?.message}
                                        {...field} />
                                </>
                            )
                        }}
                    />
                    <Button type="submit" className="w-full" color="primary" radius="sm" isDisabled={isLoading}>{isLoading ? <Spinner color="default" size="sm" /> : "Login"}</Button>
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