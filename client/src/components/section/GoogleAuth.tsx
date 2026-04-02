import React from 'react'

export default function GoogleAuth() {

    async function submit() {
        window.location.href = "http://localhost:8000/api/google/login";
        // const res = await fetch("http://localhost:8000/api/login/googleauth")
        // const data = res.json();
        // console.log(data);
    }

    return (
        <button onClick={submit}>GoogleAuth</button>
    )
}
