'use client'
import React, { useEffect, useState } from 'react'

export default function HomeSlideMenuData() {
    const [chat, setChat] = useState([]);
    const [userId, setUserId] = useState(0);
    async function fetchChat() {
        const user = localStorage.getItem("user")
        if (user) {
            const parseuser = JSON.parse(user);
            setUserId(parseuser.id)
            try {
                const res = await fetch(`http://localhost:8000/api/chat/user/${userId}`);
                const data = await res.json();
                setChat(data.chats);
            } catch (err) {
                console.error("Failed to fetch messages:", err);
            }
        }
    }
    useEffect(() => {
        fetchChat();
    }, [])

    return (
        <div className='flex flex-col items-start'>
            <div>
                <h4>No_Doubt</h4>
            </div>

            <div>
                <h4>About Us</h4>
            </div>
        </div>
    )
}
