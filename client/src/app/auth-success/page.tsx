'use client'

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Page() {
    const params = useSearchParams();
    const router = useRouter();

    async function createUser(user: { name: string, email: string, picture: string }) {
        const res = await fetch("http://localhost:8000/api/user/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                picture: user.picture,
                passw: null
            }),
        });
        const data = await res.json();
        console.log(data);
        return data;
    }
    useEffect(() => {
        const userParam = params.get("user");
        if (userParam) {
            const user = JSON.parse(decodeURIComponent(userParam));
            (async () => {
                const data = await createUser(user);
                // store actual user (not promise)
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("user", JSON.stringify(data.user));
                console.log("User:", data);
                router.replace("/");
            })();
        }
    }, []);

    return <div>Login Successful</div>
}