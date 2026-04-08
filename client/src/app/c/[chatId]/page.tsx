import ChatWindow from "@/components/screen/ChatWindow";

export default async function Page({ params }: { params: { chatId: string } }) {
    const { chatId } = await params;

    return (
        <>
            <div className="">
                <ChatWindow chatId={chatId} />
            </div>
        </>
    )
}
