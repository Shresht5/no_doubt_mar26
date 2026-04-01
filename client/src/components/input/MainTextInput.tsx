'use client'
import { InputState } from '@/types/inputSection';
import { convertVideoToAudio } from '@/utils/MediaProcessing';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import FilePreview from '../section/FilePreview';

export default function MainInput() {

    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();

    const [progress, setProgress] = useState(0);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState<InputState>({ URL: "", inputText: "", file: null, });
    async function submit() {
        if (!value.file) return;
        const formData = new FormData();
        formData.append("file", value.file);
        const res = await fetch("http://localhost:8000/api/extract/", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        console.log(data);
        //function
        // router.push('/c/8454');
    }

    return (
        <div>
            <video ref={videoRef} style={{ display: 'none' }} />
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
                accept="video/*,audio/*,image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                onChange={(e) => setValue(prev => ({ ...prev, file: e.target.files?.[0] ?? null }))} />
            {value.file ?
                <FilePreview file={value.file} />
                : (<p>No video selecteds</p>)}
            <button onClick={submit}>submit</button>
        </div>
    )
}
