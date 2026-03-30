import { getFileType } from '@/utils/helper/FileType';
import { convertVideoToAudio } from '@/utils/MediaProcessing';
import React, { useRef, useState } from 'react'

export default function FilePreview({ file }: { file: File }) {

    const videoRef = useRef<HTMLVideoElement>(null);
    const [progress, setProgress] = useState(0);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fileType = getFileType(file);

    switch (fileType) {
        case 'video':
            return (
                <div>
                    <video ref={videoRef} style={{ display: 'none' }} />
                    <video src={URL.createObjectURL(file)} controls width={200} />
                    <button
                        onClick={() => convertVideoToAudio({ file, videoRef, setProgress, setAudioUrl, setLoading })}
                        disabled={loading}
                    >
                        {loading ? `Converting... ${progress}%` : 'Extract Audio'}
                    </button>
                    {audioUrl && (
                        <>
                            <audio src={audioUrl} controls />
                            <a href={audioUrl} download="audio.wav">Download</a>
                        </>
                    )}
                </div>
            )

        case 'audio':
            return <audio src={URL.createObjectURL(file)} controls />

        case 'image':
            return (
                <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={200}
                />
            )

        case 'document':
            return (
                <div>
                    <p>📄 {file.name}</p>
                    <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
            )

        default:
            return <p>Unsupported file type: {file.type}</p>
    }
}