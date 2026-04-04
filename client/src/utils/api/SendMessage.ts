import { Message } from '@/types/message';

export const SendMessage = async (
    input: string,
    chatId: string,
    messages: Message[],
    setLoading: (val: boolean) => void,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
    if (!input) return;
    const newMessage: Message = { role: "user", content: input };
    const res = await fetch("http://localhost:8000/api/aimessage/", {// create message data on database of user message
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            content: newMessage.content,
            role: 0
        }),
    });

    const data = await res.json();
    console.log(data);
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
        const res = await fetch("http://localhost:8000/api/aimessage/ai", {//llm api
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                messages: updatedMessages,
            }),
        });

        const data = await res.json();
        console.log(data);
        if (data?.error) {
            setMessages(prev => [...prev, { role: "assistant", content: data.error.message }]);
            return;
        }
        // if (data.choices && data.choices.length > 0) {
        const reply = data.choices[0].message;
        setMessages([...messages, newMessage, { role: reply.role, content: reply.content }]);

        const aires = await fetch("http://localhost:8000/api/aimessage/", {// create message data on database of assistant message
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                content: reply.content,
                role: 1
            }),
        });

        const aidata = await aires.json();
        console.log(aidata);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
};