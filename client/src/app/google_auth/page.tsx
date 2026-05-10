'use client'
import React, { useEffect } from 'react'

export default function page() {
    useEffect(() => {
        function googleSignIn() {
            window.location.href = "http://localhost:8000/api/google/login";
        }
        googleSignIn();
    }, [])
    return (
        <div>loading google sign in</div>
    )
}
