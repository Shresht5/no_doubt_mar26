export default function RenderMessage({ content }: { content: string }) {

    function formatMessage(content: string) {
        return content
            // convert **bold** → section title
            .replace(/\*\*(.*?)\*\*/g, "\n## $1\n")

            // convert * bullets → lines
            .replace(/\* /g, "\n- ")

            // spacing cleanup
            .replace(/\n{2,}/g, "\n\n")
            .trim();
    }
    const lines = formatMessage(content).split("\n");

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
        </div>
    );
}