'use client'
import { InputState } from '@/types/inputSection';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function MainInput() {

    const router = useRouter();
    const [value, setValue] = useState<InputState>({
        URL: "",
        inputText: "",
        file: null,
    });

    function submit() {
        //function
        router.push('/c/8454');
    }

    return (
        <div>
            <h2>No_Doubt</h2>

            {/*URL*/}
            <input type="text"
                placeholder="URL..."
                value={value.URL}
                onChange={(e) => setValue(prev => ({ ...prev, URL: e.target.value }))} />
            <p>{value.URL}</p>

            {/*inputText*/}
            <input type="text"
                placeholder="Text..."
                value={value.inputText}
                onChange={(e) => setValue(prev => ({ ...prev, inputText: e.target.value }))} />
            <p>{value.inputText}</p>

            {/*file video*/}
            <input
                type="file"
                onChange={(e) => setValue(prev => ({ ...prev, file: e.target.files?.[0] ?? null }))} />
            {value.file ? (
                <video
                    src={URL.createObjectURL(value.file)}
                    controls
                    width={300}
                />
            ) : (
                <p>No video selected</p>
            )}
            <button onClick={submit}>submit</button>
        </div>
    )
}
