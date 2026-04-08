'use client'

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Page() {
    const params = useSearchParams();
    const router = useRouter();


    useEffect(() => {
        const userParam = params.get("user");
        const tokenParam = params.get("token");
        if (userParam && tokenParam) {
            const user = JSON.parse(decodeURIComponent(userParam));
            const token = decodeURIComponent(tokenParam);
            (async () => {
                localStorage.setItem("token", JSON.stringify(token));
                localStorage.setItem("user", JSON.stringify(user));
                console.log("User:", user);
                console.log("Token:", token);
                router.replace("/");
            })();
        }
    }, []);

    return <div>Login Successful</div>
}