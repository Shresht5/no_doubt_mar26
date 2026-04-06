import { ReactNode } from "react";

export default function HomeSlideMenu({ open, onClose, children }: { open: boolean, onClose: () => void, children: ReactNode }) {
    return (
        <div
            className={`fixed top-0 left-0 w-full h-full z-50 flex overflow-hidden
            ${open ? "visible" : "invisible"}`}
        >

            {/* BACKDROP */}
            <div
                className={`absolute inset-0 bg-[rgba(160,160,160,0.3)] 
                transition-opacity duration-300
                ${open ? "opacity-100" : "opacity-0"}`}
                onClick={onClose}
            />

            {/* SIDEBAR */}
            <div
                className={`relative h-full w-[70%] bg-white text-black flex flex-col p-4
                transform transition-transform duration-300 ease-in-out
                ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                {children}
            </div>
        </div>
    );
}