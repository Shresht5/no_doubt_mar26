type ConvertVideoToAudioParams = {
    file: File;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    setProgress: (n: number) => void;
    setAudioUrl: (url: string) => void;
    setLoading: (b: boolean) => void;
};
export type ConvertVideoToAudio = (params: ConvertVideoToAudioParams) => Promise<void>;