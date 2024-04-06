"use client"

import { Home } from "lucide-react";
import { signOut } from "next-auth/react";
import UserCard from "./user-card";
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from "@nextui-org/react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "./use-toast";
import { useRouter } from "next/navigation";
import { Form, FormField } from "./form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
    content: z.string().min(1, "Your message is empty.").max(900, "Your message must have 900 max. characters."),
})

const UserUI = ({ session }: any) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("VALUES", values)
        setIsLoading(true);
        try {
            await axios.post("/api/messages", { content: values.content, userId: session?.user.id });
            router.refresh()
            onOpenChange()
            form.reset()
            toast({
                title: "Notification",
                description: "Message posted!",
            })
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            const error = e as AxiosError;
            console.log(error);
        }
    }

    console.log(form.formState.errors)

    return (
        <div className="flex flex-col gap-6 w-full">
            <UserCard username={session?.user.username} firstname={session?.user.firstname} lastname={session?.user.lastname} />
            <Button className="bg-[#f8f7ff]  hover:bg-[#f8f7ff] text-primary w-full justify-start" radius="sm" startContent={<Home />} href="/home">Home</Button>
            <Button onPress={onOpen} className="bg-primary text-white w-full" radius="sm">Create new post</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="min-w-[50%] min-h-[50%] max-h-[50%] p-4" hideCloseButton classNames={{ body: "bg-[#f8f7ff] p-0" }}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
                        <ModalContent className="bg-white h-full">
                            {(onClose) => (
                                <>
                                    <ModalBody className="flex h-full">
                                        <FormField
                                            control={form.control}
                                            name="content"
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <Textarea
                                                        classNames={{ inputWrapper: "bg-[#f8f7ff] shadow-none p-0", input: "bg-[#f8f7ff]" }}
                                                        minRows={20}
                                                        errorMessage={fieldState?.error?.message}
                                                        isInvalid={!!fieldState?.error?.message}
                                                        {...field} />
                                                )
                                            }}
                                        />
                                    </ModalBody>
                                    <ModalFooter className="bg-[#f8f7ff]">
                                        <Button className="bg-[#f8f7ff] border-1 text-primary border-[#7B61FF]" variant="light" onPress={onClose} radius="sm">
                                            Close
                                        </Button>
                                        <Button color="primary" type="submit" radius="sm">
                                            Post
                                        </Button>
                                    </ModalFooter>

                                </>
                            )}
                        </ModalContent>
                    </form>
                </Form>
            </Modal>
            <Button onClick={() => signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/login`
            })} className="bg-black text-white w-full" radius="sm">Sign out</Button>
        </div>
    )
}

export default UserUI;