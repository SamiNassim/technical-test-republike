"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
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
    firstname: z.string().min(1, "Please enter your first name."),
    lastname: z.string().min(1, "Please enter your last name."),
    username: z.string().min(1, "Please enter an username").max(15, "Your username must have max. 15 characters")
})

const RegisterForm = () => {

    const [passwordInputType, setPasswordInputType] = useState<string>("password");

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
            <h1 className="font-bold text-xl mb-6">Create your account</h1>
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
                                    classNames={inputStyles}
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
                                        description="Must have min. 8 characters, 1 number, uppercase and special character"
                                        type={passwordInputType}
                                        defaultValue=""
                                        radius="sm"
                                        variant="bordered"
                                        endContent={<Eye onClick={() => showPassword()} opacity={0.6} strokeWidth={1.2} />}
                                        classNames={inputStyles}
                                        errorMessage={error?.message}
                                        isInvalid={!!error?.message}
                                        {...field} />
                                </>
                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => {
                            const { error } = useFormField();
                            return (
                                <Input
                                    label="First name"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    defaultValue=""
                                    radius="sm"
                                    variant="bordered"
                                    classNames={inputStyles}
                                    errorMessage={error?.message}
                                    isInvalid={!!error?.message}
                                    {...field}
                                />
                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => {
                            const { error } = useFormField();
                            return (
                                <Input
                                    label="Last name"
                                    labelPlacement="outside"
                                    placeholder=" "
                                    defaultValue=""
                                    radius="sm"
                                    variant="bordered"
                                    classNames={inputStyles}
                                    errorMessage={error?.message}
                                    isInvalid={!!error?.message}
                                    {...field}
                                />
                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => {
                            const { error } = useFormField();
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
                                    errorMessage={error?.message}
                                    isInvalid={!!error?.message}
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