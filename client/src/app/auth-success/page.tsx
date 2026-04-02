'use client'

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function Page() {
    const params = useSearchParams()

    useEffect(() => {
        const userParam = params.get("user")
        if (userParam) {
            const user = JSON.parse(decodeURIComponent(userParam))

            // store in localStorage
            localStorage.setItem("user", JSON.stringify(user))

            console.log("User:", user)
        }
    }, [])

    return <div>Login Successful</div>
}