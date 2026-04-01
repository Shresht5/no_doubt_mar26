'use client'
import { InputState } from '@/types/inputSection';
import { convertVideoToAudio } from '@/utils/MediaProcessing';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import FilePreview from '../section/FilePreview';
import URLPreview from '../section/URLPreview';

export default function MainInput() {

    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();

    const [showSubmit, setShowSubmit] = useState(false);
    const [value, setValue] = useState<InputState>({ URL: "", inputText: "", file: null, });
    async function submit() {
        if ((value.URL && value.file) || (!value.URL && !value.file)) {
            return;
        }
        if (value.file) {
            const formData = new FormData();
            formData.append("file", value.file);
            const res = await fetch("http://localhost:8000/api/extract/", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            console.log(data);
        }
        if (value.URL) {
            const res = await fetch(`http://localhost:8000/api/urldow/audiototext?url=${value.URL}`, {
                method: "GET"
            });
            const data = await res.json();
            console.log(data);
        }
        // router.push('/c/8454');
    }


    useEffect(() => {
        if ((value.URL && value.file) || (!value.URL && !value.file)) {
            setShowSubmit(false);
        } else {
            setShowSubmit(true);
        }

    }, [value])

    return (
        <div>
            <video ref={videoRef} style={{ display: 'none' }} />
            <h2>No_Doubt</h2>

            <input type="text"
                placeholder="URL..."
                value={value.URL}
                onChange={(e) => setValue(prev => ({ ...prev, URL: e.target.value }))} />
            <p>{value.URL}</p>

            <URLPreview value={value} />

            {/*file video*/}
            <input
                type="file"
                accept="video/*,audio/*,image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                onChange={(e) => setValue(prev => ({ ...prev, file: e.target.files?.[0] ?? null }))} />
            {value.file ?
                <FilePreview file={value.file} />
                : (<p>No video selecteds</p>)}


            {/*inputText*/}
            <input type="text"
                placeholder="Enter message..."
                value={value.inputText}
                onChange={(e) => setValue(prev => ({ ...prev, inputText: e.target.value }))} />
            <p>{value.inputText}</p>
            {
                showSubmit ? (<button onClick={submit}>submit</button>) : ""
            }
        </div>
    )
}
