import { Message } from '@/types/message';

export const FetchMessages = async (chatId: string, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
    try {
        const res = await fetch(`http://localhost:8000/api/aimessage/chat/${chatId}`);
        const data = await res.json();

        // convert role 0/1 back to "user"/"assistant"
        const mapped: Message[] = data.map((m: any) => ({
            role: m.role === 0 ? "user" : "assistant",
            content: m.content
        }));

        setMessages(mapped);
    } catch (err) {
        console.error("Failed to fetch messages:", err);
    }
};