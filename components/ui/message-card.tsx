import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react"
import UserCard from "./user-card";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import axios, { AxiosError } from "axios";
import { useState } from "react";

interface MessageCardProps {
    messageId: string,
    username: string,
    firstname: string,
    lastname: string,
    content: string,
    likes: number,
    dislikes: number,
    status: string,
}

const MessageCard = ({
    messageId,
    username,
    firstname,
    lastname,
    content,
    likes,
    dislikes,
    status
}: MessageCardProps) => {

    const [likesCounter, setLikesCounter] = useState<number>(likes);
    const [dislikesCounter, setDislikesCounter] = useState<number>(dislikes);
    const [likeStatus, setLikeStatus] = useState<string>(status);

    const likeMessage = async (messageId: string) => {
        try {
            if (likeStatus === "liked") { return }
            await axios.post("/api/messages/like", { messageId: messageId });
            setLikesCounter(likesCounter + 1);
            setLikeStatus("liked");
            if (likeStatus === "disliked") {
                setDislikesCounter(dislikesCounter - 1)
            }
        } catch (e) {
            const error = e as AxiosError;
            console.log(error);
        }
    }

    const dislikeMessage = async (messageId: string) => {
        try {
            if (likeStatus === "disliked") { return }
            await axios.post("/api/messages/dislike", { messageId: messageId });
            setDislikesCounter(dislikesCounter + 1)
            setLikeStatus("disliked")
            if (likeStatus === "liked") {
                setLikesCounter(likesCounter - 1)
            }
        } catch (e) {
            const error = e as AxiosError;
            console.log(error);
        }
    }

    return (
        <Card className="min-w-[50%] max-w-[50%] p-6 shadow">
            <CardHeader>
                <UserCard
                    username={username}
                    firstname={firstname}
                    lastname={lastname}
                />
            </CardHeader>
            <CardBody className="font-light">
                {content}
            </CardBody>
            <CardFooter className="gap-6">
                <ThumbsUp onClick={() => likeMessage(messageId)} color="#7B61FF" opacity={likeStatus === "liked" ? 1 : likeStatus === "disliked" ? 0.5 : 1} />
                <ThumbsDown onClick={() => dislikeMessage(messageId)} color="#7B61FF" opacity={likeStatus === "disliked" ? 1 : likeStatus === "liked" ? 0.5 : 1} />
                <div className="flex flex-row gap-1"><p className="text-[#6C727E]">Likes:</p><p className="text-primary">{likesCounter}</p></div>
                <div className="flex flex-row gap-1"><p className="text-[#6C727E]">Dislikes:</p><p className="text-primary">{dislikesCounter}</p></div>
            </CardFooter>
        </Card>
    )
}

export default MessageCard;