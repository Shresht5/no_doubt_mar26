'use client'
import { InputState } from '@/types/inputSection';
import { convertVideoToAudio } from '@/utils/MediaProcessing';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'

export default function MainInput() {

    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();

    const [progress, setProgress] = useState(0);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState<InputState>({ URL: "", inputText: "", file: null, });
    function submit() {
        //function
        router.push('/c/8454');
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
                accept="video/*,audio/*"
                onChange={(e) => setValue(prev => ({ ...prev, file: e.target.files?.[0] ?? null }))} />
            {value.file ? (
                value.file.type.startsWith('video/') ? (
                    <div>
                        <video
                            src={URL.createObjectURL(value.file)}
                            controls
                            width={200}
                        />
                        <button onClick={() => { convertVideoToAudio({ file: value.file!, videoRef, setProgress, setAudioUrl, setLoading }) }} disabled={!value.file || loading}>
                            convert {loading ? `Converting... ${progress}%` : 'Extract Audio'}
                        </button>
                        {audioUrl && (
                            <>
                                <audio src={audioUrl} controls />
                                <a href={audioUrl} download="audio.wav">Download</a>
                            </>
                        )}
                    </div>
                ) : (
                    <audio
                        src={URL.createObjectURL(value.file)}
                        controls
                    />
                )
            ) : (
                <p>No video selecteds</p>
            )}
            <button onClick={submit}>submit</button>
        </div>
    )
}
