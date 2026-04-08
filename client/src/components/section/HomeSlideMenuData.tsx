'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function HomeSlideMenuData() {
    const [chats, setChat] = useState<any[]>([]);
    async function fetchChat() {
        const user = localStorage.getItem("user")
        if (user) {
            const parseuser = JSON.parse(user);
            const id = parseuser.id;
            try {
                const res = await fetch(`http://localhost:8000/api/chat/user/${id}`);
                const data = await res.json();
                setChat(data);
                console.log(data);

            } catch (err) {
                console.error("Failed to fetch messages:", err);
            }
        }
    }
    useEffect(() => {
        fetchChat();
    }, [])

    return (
        <div className='flex flex-col items-start h-full'>
            <Link href={'/'}>
                <div>
                    <h4>No_Doubt</h4>
                </div>
            </Link>
            <div className='w-full flex-1'>
                {chats && chats.map((data, i) => (
                    <Link href={`/c/${data.id}`} key={i}>
                        <div className='truncate max-w-full' >
                            {data.system_message}
                        </div>
                    </Link>
                ))}
            </div>
            <Link href={'/aboutus'}>
                <div>
                    <h4>About Us</h4>
                </div>
            </Link>
        </div>
    )
}
