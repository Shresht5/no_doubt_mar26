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
    const [loading, setLoading] = useState(false)
    const [showSubmit, setShowSubmit] = useState(false);
    const [value, setValue] = useState<InputState>({ URL: "", file: null, });
    async function submit() {
        if ((value.URL && value.file) || (!value.URL && !value.file)) {
            return;
        }
        let apidata;
        setLoading(true);
        if (value.file) {
            const formData = new FormData();
            formData.append("file", value.file);
            const res = await fetch("http://localhost:8000/api/extract/", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            console.log(data);
            apidata = data;

        }
        if (value.URL) {
            const res = await fetch(`http://localhost:8000/api/urldow/audiototext?url=${value.URL}`, {
                method: "GET"
            });
            const data = await res.json();
            console.log(data);
            apidata = data;
        }
        const user = localStorage.getItem("user")
        let user_id;
        if (user) {
            user_id = JSON.parse(user);
            user_id = user_id.id
        }
        const res = await fetch("http://localhost:8000/api/chat/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id,
                system_message: apidata.text
            }),
        });

        const data = await res.json();
        console.log(data);
        setLoading(false);
        router.push(`/c/${data.id}`);
    }
    useEffect(() => {
        if ((value.URL && value.file) || (!value.URL && !value.file)) {
            setShowSubmit(false);
        } else {
            setShowSubmit(true);
        }
    }, [value])

    return (
        <div className="w-full max-w-xl mx-auto space-y-5">

            {/* Hidden video */}
            <video ref={videoRef} className="hidden" />

            {/* URL input */}
            <div className="space-y-2">
                <input
                    className="w-full p-3 border border-gray-400 rounded-lg bg-white/10 text-white outline-none focus:border-white"
                    type="text"
                    placeholder="Paste your link..."
                    value={value.URL}
                    onChange={(e) => setValue(prev => ({ ...prev, URL: e.target.value }))}
                />
                {value.URL && (
                    <p className="text-sm text-gray-300 truncate">Url: {value.URL}</p>
                )}
                <URLPreview value={value} />
            </div>

            {/* File upload */}
            <div className="space-y-2">
                {!value.file ? (
                    // DROP ZONE
                    <label className="w-full h-50 border border-gray-400 rounded-lg  bg-white/10 flex flex-col justify-center items-center  text-gray-300 cursor-pointer hover:border-white      transition relative overflow-hidden">

                        <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="video/*,audio/*,image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                            onChange={(e) =>
                                setValue(prev => ({ ...prev, file: e.target.files?.[0] ?? null }))
                            }
                        />

                        <div className="text-center pointer-events-none">
                            <p className="text-lg">Drop file</p>
                            <p className="text-sm text-gray-400">or click to upload</p>
                        </div>
                    </label>

                ) : (
                    // FILE SELECTED VIEW
                    <div className="w-full h-50 border border-gray-400 rounded-lg   bg-white/10 flex flex-col justify-between p-4">

                        {/* File Info */}
                        <div className="space-y-1">
                            <p className="text-white truncate">📄 {value.file.name}</p>
                            <p className="text-sm text-gray-400">
                                {(value.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <p className="text-xs text-gray-500">{value.file.type}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setValue(prev => ({ ...prev, file: null }))}
                                className="text-sm px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                            >
                                Remove
                            </button>
                            <div className="text-green-400 text-sm">File selected</div>
                        </div>
                    </div>
                )}

                {/* Preview */}
                {value.file ? (
                    <div className="p-3 ">
                        <FilePreview file={value.file} />
                    </div>
                ) : (
                    <p className="text-sm text-gray-400">No file selected</p>
                )}
            </div>

            {loading && (<h4>loading....</h4>)}
            {/* Submit */}
            {showSubmit && (
                <button
                    onClick={submit}
                    className="w-full py-3 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-900 transition cursor-pointer"
                >
                    Submit
                </button>
            )}
        </div>
    )
}
