"use client"

import { useEffect, useState } from "react";
import MessageCard from "./message-card";
import axios from "axios";

const MessageList = ({ session }: any) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [messagesData, setMessagesData] = useState<any>();

    useEffect(() => {
        axios.get("/api/messages")
            .then((response: any) => {
                setMessagesData(response.data.allMessages);
                console.log(response.data);
            })
            .then(() => setIsLoading(false))
            .catch((e) => {
                console.log(e)
            })

    }, [])

    return (
        <>
            {isLoading ?
                <div>Loading...</div> :
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