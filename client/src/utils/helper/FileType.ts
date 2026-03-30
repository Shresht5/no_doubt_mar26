export function getFileType(file: File): 'video' | 'audio' | 'image' | 'document' | 'unknown' {
    let fileType: string = "";
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    if (file.type.startsWith('image/')) return 'image';
    if (
        file.type === 'application/pdf' ||
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||  // .docx
        file.type === 'application/vnd.ms-excel' ||
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||        // .xlsx
        file.type === 'application/vnd.ms-powerpoint' ||
        file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || // .pptx
        file.type === 'text/plain' ||
        file.type === 'text/csv'
    ) return 'document';
    return 'unknown';
}