'use client'
import React, { useRef, useState } from 'react'
import ChatInput from '../input/ChatInput';
import { Message } from '@/types/message';

export default function ChatWindow({ chatId }: { chatId: string }) {

    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const [chat, setChat] = useState([
        { id: 1, user: "Person", message: "Hey, what is AI?" },
        { id: 2, user: "AI", message: "AI stands for Artificial Intelligence." },

        { id: 3, user: "Person", message: "Can it replace developers?" },
        { id: 4, user: "AI", message: "It can assist, but not fully replace skilled developers." },

        { id: 5, user: "Person", message: "What is Next.js?" },
        { id: 6, user: "AI", message: "A React framework with routing and server-side features." },

        { id: 7, user: "Person", message: "How to manage state in React?" },
        { id: 8, user: "AI", message: "Using hooks like useState or useReducer." },

        { id: 9, user: "Person", message: "What is API?" },
        { id: 10, user: "AI", message: "API is a way for systems to communicate with each other." }
    ]);

    function addMessage(user: string, message: string) {
        setChat(prev => [...prev, { id: chat.length + 1, user, message }]);
    }

    function messageInput(input: string) {
        sendMessage(input)
    }

    const sendMessage = async (input: string) => {
        if (!input) return;
        const newMessage: Message = { role: "user", content: input };
        const updatedMessages: Message[] = [
            {
                role: "system",
                content:
                    "You are a concise AI assistant. Reply directly and briefly. Add extra points only if necessary. Avoid long explanations.",
            },
            ...messages,
            newMessage,
        ];
        setMessages([...messages, newMessage]);
        console.log(messages);
        setLoading(true);

        try {
            const res = await fetch("http://localhost:8000/aichat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: updatedMessages,
                }),
            });

            const data = await res.json();
            console.log(data);
            if (data?.error) {
                setMessages(prev => [...prev, { role: "assistant", content: data.error.message }]);
                return;
            }
            if (data.choices && data.choices.length > 0) {
                const reply = data.choices[0].message;
                setMessages([...messages, newMessage, { role: reply.role, content: reply.content }]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
                <div>
                    <ChatInput addMessage={messageInput} />
                </div>
            </div>
        </div>

    )
}
