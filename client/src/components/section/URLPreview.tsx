import React from 'react'
type Props = {
    value: { URL: string };
};

export default function URLPreview({ value }: Props) {

    const getYouTubeId = (url: string) => {
        const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    };
    const getInstagramEmbedUrl = (url: string) => {
        const match = url.match(/instagram\.com\/(reel|p|tv)\/([^/?]+)/);
        if (!match) return null;

        return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
    };

    return (<>
        {(() => {
            const videoId = getYouTubeId(value.URL);

            if (videoId) {
                return (
                    <iframe
                        width="400"
                        height="250"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="Video preview"
                        allowFullScreen
                    />
                );
            }

            return null;
        })()}

        {(() => {
            const instaEmbed = getInstagramEmbedUrl(value.URL);

            if (instaEmbed) {
                return (
                    <iframe
                        src={instaEmbed}
                        width="400"
                        height="500"
                        allow="autoplay; encrypted-media"
                    />
                );
            }

            return null;
        })()}
    </>
    )
}
