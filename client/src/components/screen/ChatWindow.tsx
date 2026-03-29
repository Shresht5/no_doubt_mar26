'use client'
import React, { useRef, useState } from 'react'
import ChatInput from '../input/ChatInput';

export default function ChatWindow({ chatId }: { chatId: string }) {

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
                {!chat ? "no chat found" : chat.map((data) => (
                    <div key={data.id} className={`flex ${data.user === "AI" ? "justify-start" : "justify-end"} m-2 `}>
                        <div
                            className={`px-4 py-2 rounded-lg max-w-[60%] ${data.user === "AI"
                                ? "bg-gray-200 text-black"
                                : "bg-blue-500 text-white"
                                }`}
                        >
                            {data.message}
                        </div>
                    </div>
                ))}
                <div>
                    <ChatInput addMessage={addMessage} />
                </div>
            </div>
        </div>

    )
}
