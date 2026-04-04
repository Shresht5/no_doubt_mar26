'use client'
import React, { useEffect, useState } from 'react'
import ChatInput from '../input/ChatInput';
import { Message } from '@/types/message';
import { SendMessage } from '@/utils/api/SendMessage';
import { FetchMessages } from '@/utils/api/FetchMessages';

export default function ChatWindow({ chatId }: { chatId: string }) {

    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    function messageInput(input: string) {
        SendMessage(input, chatId, messages, setLoading, setMessages)
    }

    useEffect(() => {
        if (chatId) {
            FetchMessages(chatId, setMessages);
        }
    }, [chatId]);

    return (
        <div className="w-[100vw] min-h-[100vh] ">
            <div className='flex justify-between'>
                <div>id:{chatId}</div>
                <div>
                    <button>
                        new
                    </button>
                </div>
            </div>
            <div>
                {!messages ? "no chat found" : messages.map((data, id) => (
                    <div key={id} className={`flex ${data.role === "assistant" ? "justify-start" : "justify-end"} m-2 `}>
                        <div
                            className={`px-4 py-2 rounded-lg max-w-[60%] ${data.role === "assistant"
                                ? "bg-gray-200 text-black"
                                : "bg-blue-500 text-white"
                                }`}
                        >
                            {data.content}
                        </div>
                    </div>
                ))}
                {loading && (<div>loading...</div>)}
                <div>
                    <ChatInput addMessage={messageInput} />
                </div>
            </div>
        </div>
    )
}
