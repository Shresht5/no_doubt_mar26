
export const FetchSystemMessages = async (chatId: string, setSystemMessages: React.Dispatch<React.SetStateAction<string>>) => {
    try {
        const res = await fetch(`http://localhost:8000/api/chat/${chatId}`);
        const data = await res.json();

        setSystemMessages(`${data.system_message}`)

    } catch (err) {
        console.error("Failed to fetch messages:", err);
    }
};