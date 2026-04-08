
export const FetchSystemMessages = async (chatId: string, setSystemMessages: React.Dispatch<React.SetStateAction<string>>, setShow: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const res = await fetch(`http://localhost:8000/api/chat/${chatId}`);
        const data = await res.json();
        const nuser = localStorage.getItem('user')
        if (nuser) {
            const user = JSON.parse(nuser)
            if (data.user_id == user.id) setShow(true);
            else console.log('user not match');
        }
        setSystemMessages(`${data.system_message}`)

    } catch (err) {
        console.error("Failed to fetch messages:", err);
    }
};