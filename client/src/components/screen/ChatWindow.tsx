'use client'
import React, { useEffect, useState } from 'react'
import ChatInput from '../input/ChatInput';
import { Message } from '@/types/message';
import { SendMessage } from '@/utils/api/SendMessage';
import { FetchMessages } from '@/utils/api/FetchMessages';
import { FetchSystemMessages } from '@/utils/api/FetchSystemMessage';
import HomeNavBar from '../navbar/HomeNavBar';
import RenderMessage from '../section/RenderMessage';
import AroraCanvas from "@/components/screen/AroraCavas";

export default function ChatWindow({ chatId }: { chatId: string }) {

    const [messages, setMessages] = useState<Message[]>([]);
    const [systemMessages, setSystemMessages] = useState<string>("");
    const [loading, setLoading] = useState(false);

    function messageInput(input: string) {
        SendMessage(input, chatId, messages, setLoading, setMessages)
    }

    useEffect(() => {
        const runFumction = async () => {
            if (chatId) {
                await FetchMessages(chatId, setMessages);
                await FetchSystemMessages(chatId, setSystemMessages);
            }
        }
        runFumction();
    }, [chatId]);

    useEffect(() => {
        if (messages.length === 0 && systemMessages) {
            SendMessage(
                `${systemMessages} summarize content`,
                chatId,
                messages,
                setLoading,
                setMessages
            );
        }
    }, [messages, systemMessages, chatId]);


    return (
        <AroraCanvas>
            <div className=" relative w-screen min-h-screen pt-[64px] ">
                <HomeNavBar heading={systemMessages} />
                <div className='p-2 sm:p-4'>
                    {!messages ? "no chat found" : messages.map((data, id) => (
                        <div key={id} className={`flex ${data.role === "assistant" ? "justify-start" : "justify-end"} m-2 `}>
                            <div
                                className={`px-4 py-2 rounded-lg max-w-[80%] ${data.role === "assistant"
                                    ? ""
                                    : "bg-gray-700 text-white"
                                    }`}
                            >
                                <RenderMessage content={data.content} />
                            </div>
                        </div>
                    ))}
                    {loading && (<div>loading...</div>)}
                    <div className='h-32' />
                    <div className='fixed w-full bottom-4 left-0'>
                        <ChatInput addMessage={messageInput} />
                    </div>
                </div>
            </div>
        </AroraCanvas>
    )
}
