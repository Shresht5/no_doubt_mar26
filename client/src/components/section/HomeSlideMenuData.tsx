"use client";
import { useToast } from "@/hook/ToastContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function HomeSlideMenuData() {
  const { addToast } = useToast();
  const [chats, setChat] = useState<any[]>([]);
  async function fetchChat() {
    const user = localStorage.getItem("user");
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

  const deleteChat = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/api/chat/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete chat");

      await res.json();
      setChat((prev) => prev.filter((chat) => chat.id !== id));
    } catch (err) {
      console.error("Failed to delete chat:", err);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <div className="flex flex-col items-start h-full">
      <Link href={"/"}>
        <div>
          <h4>No_Doubt</h4>
        </div>
      </Link>
      {/* <button onClick={() => addToast("Success is everything", 'green')}>toast</button>
            <button onClick={() => addToast("Error", 'red')}>toast</button>
            <button onClick={() => addToast("message", 'blue')}>toast</button> */}
      <div className="w-full flex-1 min-w-0">
        {chats?.map((data) => (
          <div key={data.id} className="flex items-center gap-2">
            <Link href={`/c/${data.id}`} className="flex-1 min-w-0">
              <div className="truncate">{data.system_message}</div>
            </Link>

            <button
              onClick={() => deleteChat(data.id)}
              className="shrink-0 cursor-pointer text-red-700 hover:text-red-500"
            >
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                fill="currentColor"
              >
                <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <Link href={"/aboutus"}>
        <div>
          <h4>About Us</h4>
        </div>
      </Link>
    </div>
  );
}
