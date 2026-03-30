import { ConvertVideoToAudio } from "@/types/Params";


export const convertVideoToAudio: ConvertVideoToAudio = async ({ file, videoRef, setProgress, setAudioUrl, setLoading, }) => {

    if (!file) return;
    setLoading(true);
    setProgress(0);

    // Step 1 — read file as ArrayBuffer (entire file in memory)
    const arrayBuffer = await file.arrayBuffer();
    setProgress(20);

    // Step 2 — decode audio from video file
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    setProgress(60);

    // Step 3 — convert AudioBuffer → WAV blob
    const wavBlob = audioBufferToWav(audioBuffer);
    setProgress(90);

    // Step 4 — store as blob URL ✅
    const url = URL.createObjectURL(wavBlob);
    setAudioUrl(url);
    setProgress(100);
    setLoading(false);
};

// WAV encoder — no library needed
function audioBufferToWav(buffer: AudioBuffer): Blob {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const length = buffer.length * numChannels * 2; // 16-bit = 2 bytes
    const arrayBuffer = new ArrayBuffer(44 + length);
    const view = new DataView(arrayBuffer);

    // WAV header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);                        // PCM format
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true);                       // 16-bit
    writeString(view, 36, 'data');
    view.setUint32(40, length, true);

    // interleave channels
    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
        for (let ch = 0; ch < numChannels; ch++) {
            const sample = Math.max(-1, Math.min(1, buffer.getChannelData(ch)[i]));
            view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
            offset += 2;
        }
    }

    return new Blob([arrayBuffer], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
    }
}