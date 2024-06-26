"use client"

import { useEffect, useState } from "react";
import MessageCard from "./message-card";
import axios, { AxiosError } from "axios";
import { Button, CircularProgress, Modal, ModalBody, ModalContent, ModalFooter, Textarea, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "./use-toast";
import UserCard from "./user-card";
import { Form, FormField } from "./form";
import { signOut } from "next-auth/react";
import { Home } from "lucide-react";
import { MessageSchema } from "@/schemas";

const MessageList = ({ session }: any) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [messagesData, setMessagesData] = useState<any>();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

    const form = useForm<z.infer<typeof MessageSchema>>({
        resolver: zodResolver(MessageSchema),
        defaultValues: {
            content: "",
        },
    })

    async function onSubmit(values: z.infer<typeof MessageSchema>) {
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

    useEffect(() => {
        axios.get("/api/messages")
            .then((response: any) => {
                setMessagesData(response.data.allMessages);
            })
            .then(() => setIsLoading(false))
            .catch((e) => {
                console.log(e)
            })

    }, [form.getFieldState("content").isDirty, onOpenChange])

    return (
        <>
            <div className="fixed left-9 top-28 min-w-56 z-10">
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
                                            <ModalBody className="flex h-full rounded-t-lg">
                                                <FormField
                                                    control={form.control}
                                                    name="content"
                                                    render={({ field, fieldState }) => {
                                                        return (
                                                            <Textarea
                                                                classNames={{ inputWrapper: "bg-[#f8f7ff] shadow-none p-0 data-[hover=true]:bg-[#f8f7ff] group-data-[focus=true]:bg-[#f8f7ff]", input: "bg-[#f8f7ff] rounded-lg m-4 data-[focus=true]:bg-black" }}
                                                                minRows={20}
                                                                errorMessage={fieldState?.error?.message}
                                                                isInvalid={!!fieldState?.error?.message}
                                                                {...field} />
                                                        )
                                                    }}
                                                />
                                            </ModalBody>
                                            <ModalFooter className="bg-[#f8f7ff] rounded-b-lg">
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
            </div>
            {isLoading ?
                <CircularProgress color="primary" aria-label="Loading..." /> :
                <div className="flex flex-col-reverse w-full items-center gap-8">{messagesData.map((message: any) =>
                (
                    <MessageCard
                        key={message.id}
                        messageId={message.id}
                        username={message.user.username}
                        firstname={message.user.firstname}
                        lastname={message.user.lastname}
                        content={message.content}
                        likes={message.likedByUsers.length}
                        dislikes={message.dislikedByUsers.length}
                        status={message.dislikedByUsers.some((u: any) => u.id === session?.user.id) ? "disliked" : message.likedByUsers.some((u: any) => u.id === session?.user.id) ? "liked" : "unset"}
                    />
                ))}
                </div>

            }
        </>
    )
}

export default MessageList;