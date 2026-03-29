
import ChatInput from "@/components/input/ChatInput";
import ChatWindow from "@/components/screen/ChatWindow";

export default async function page({ params }: { params: { chatId: string } }) {

    const { chatId } = await params;

    return (
        <div className="w-[100vw] min-h-[100vh] ">
            <ChatWindow chatId={chatId} />
        </div>
    )
}
