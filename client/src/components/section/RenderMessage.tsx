'use client'
import { useState } from "react";

export default function RenderMessage({ content }: { content: string }) {

    const MAX_LENGTH = 300; // adjust

    const [expanded, setExpanded] = useState(false);

    const isLong = content.length > MAX_LENGTH;
    const finalContent = expanded || !isLong
        ? content
        : content.slice(0, MAX_LENGTH) + "...";

    function formatMessage(content: string) {
        return content
            .replace(/\*\*(.*?)\*\*/g, "\n## $1\n")
            .replace(/\* /g, "\n- ")
            .replace(/\n{2,}/g, "\n\n")
            .trim();
    }

    const lines = formatMessage(finalContent).split("\n");

    return (
        <div className="text-sm">
            {lines.map((line, i) => {
                if (line.startsWith("## ")) {
                    return (
                        <div key={i} className="font-semibold mt-3 mb-1">
                            {line.replace("## ", "")}
                        </div>
                    );
                }

                if (line.startsWith("- ")) {
                    return (
                        <div key={i} className="ml-4 flex gap-2">
                            <span>•</span>
                            <span>{line.replace("- ", "")}</span>
                        </div>
                    );
                }

                return <div key={i}>{line}</div>;
            })}

            {/* ✅ Toggle */}
            {isLong && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-green-300 text-xs mt-2 cursor-pointer"
                >
                    {expanded ? "< Show less " : "Show more >"}
                </button>
            )}
        </div>
    );
}