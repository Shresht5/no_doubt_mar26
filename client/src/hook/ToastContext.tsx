'use client'
import { createContext, useContext, useState } from "react";
type Toast = { id: number; message: string, colour: 'green' | 'red' | 'blue' };
const ToastContext = createContext<any>(null);

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (message: string, colour: 'green' | 'red' | 'blue') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, colour }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed top-5 right-5 flex flex-col-reverse gap-2 z-50">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`${t.colour == 'green' ? "bg-green-300 text-green-800" : t.colour == "red" ? "bg-red-300 text-red-800" : "bg-blue-300 text-blue-800"} px-4 py-2 rounded shadow-md animate-slide-in`}
                    >
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}