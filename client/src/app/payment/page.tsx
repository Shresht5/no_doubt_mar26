"use client";

import { useState } from "react";

/* ─── Types ──────────────────────────────────────────────────────────────────── */
interface OrderResponse {
    order_id: string;
    amount: number;
    currency: string;
    key_id: string;
}

interface VerifyResponse {
    status: string;
    message: string;
    payment_id: string;
    order_id: string;
}

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Razorpay: any;
    }
}

/* ─── Config ─────────────────────────────────────────────────────────────────── */
const API_BASE = "http://localhost:8000";

const PRODUCTS = [
    { id: 1, name: "Starter Plan", price: 499, paise: 49900, tag: "Popular" },
    { id: 2, name: "Pro Plan", price: 999, paise: 99900, tag: "Best Value" },
    { id: 3, name: "Enterprise", price: 4999, paise: 499900, tag: "Custom" },
];

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
function loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
        if (document.getElementById("razorpay-script")) return resolve(true);
        const script = document.createElement("script");
        script.id = "razorpay-script";
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

/* ─── Component ──────────────────────────────────────────────────────────────── */
export default function PaymentPage() {
    const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<VerifyResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    /* ── 1. Create order on backend ──────────────────────────────────────────── */
    async function handlePayment() {
        setLoading(true);
        setError(null);
        setResult(null);

        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            setError("Failed to load Razorpay SDK. Check your connection.");
            setLoading(false);
            return;
        }

        try {
            const orderRes = await fetch(`${API_BASE}/api/payment/create-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: selectedProduct.paise,
                    receipt: `receipt_${Date.now()}`,
                }),
            });

            if (!orderRes.ok) throw new Error(await orderRes.text());
            const order: OrderResponse = await orderRes.json();

            /* ── 2. Open Razorpay checkout modal ──────────────────────────────────── */
            const options = {
                key: order.key_id,
                amount: order.amount,
                currency: order.currency,
                name: "Acme Corp",
                description: selectedProduct.name,
                image: "https://i.imgur.com/n5tjHFD.png",    // your logo
                order_id: order.order_id,

                /* ── 3. On success → verify signature with backend ────────────────── */
                handler: async (response: {
                    razorpay_payment_id: string;
                    razorpay_order_id: string;
                    razorpay_signature: string;
                }) => {
                    try {
                        const verifyRes = await fetch(`${API_BASE}/api/payment/verify-payment`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });
                        if (!verifyRes.ok) throw new Error(await verifyRes.text());
                        const verified: VerifyResponse = await verifyRes.json();
                        setResult(verified);
                    } catch (err) {
                        setError(`Verification failed: ${err}`);
                    } finally {
                        setLoading(false);
                    }
                },

                prefill: {
                    name: "Test User",
                    email: "test@example.com",
                    contact: "8827856475",
                },

                notes: { product: selectedProduct.name },
                theme: { color: "#6366F1" },

                modal: {
                    ondismiss: () => {
                        setLoading(false);
                        setError("Payment cancelled.");
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            setError(`Order creation failed: ${err}`);
            setLoading(false);
        }
    }

    /* ── Render ──────────────────────────────────────────────────────────────── */
    return (
        <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 py-16 font-sans">
            {/* Header */}
            <div className="mb-12 text-center">
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-indigo-500/20 text-indigo-300 rounded-full mb-4">
                    Razorpay Test Mode
                </span>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Choose your plan</h1>
                <p className="text-gray-400 text-sm">Use test card <span className="font-mono bg-gray-800 px-1 rounded">4111 1111 1111 1111</span> · Expiry any future date · CVV any 3 digits</p>
            </div>

            {/* Product cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl mb-10">
                {PRODUCTS.map((p) => {
                    const active = selectedProduct.id === p.id;
                    return (
                        <button
                            key={p.id}
                            onClick={() => { setSelectedProduct(p); setResult(null); setError(null); }}
                            className={`relative rounded-2xl p-6 text-left border-2 transition-all duration-200 cursor-pointer
                ${active
                                    ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20"
                                    : "border-gray-700 bg-gray-900 hover:border-gray-500"
                                }`}
                        >
                            <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full
                ${active ? "bg-indigo-500 text-white" : "bg-gray-700 text-gray-300"}`}>
                                {p.tag}
                            </span>
                            <div className="text-gray-400 text-sm mb-1">{p.name}</div>
                            <div className="text-3xl font-bold">₹{p.price}<span className="text-base font-normal text-gray-500">/mo</span></div>
                        </button>
                    );
                })}
            </div>

            {/* Pay button */}
            <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full max-w-sm flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-8 py-4 text-lg transition-colors duration-200 shadow-lg shadow-indigo-500/30"
            >
                {loading ? (
                    <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Processing…
                    </>
                ) : (
                    <>Pay ₹{selectedProduct.price}</>
                )}
            </button>

            {/* Success */}
            {result && (
                <div className="mt-8 w-full max-w-sm rounded-2xl bg-emerald-500/10 border border-emerald-500/40 p-5 text-sm">
                    <p className="font-bold text-emerald-400 text-base mb-3">✅ {result.message}</p>
                    <div className="space-y-1 text-gray-300 font-mono text-xs break-all">
                        <p><span className="text-gray-500">Order&nbsp;&nbsp;&nbsp;: </span>{result.order_id}</p>
                        <p><span className="text-gray-500">Payment: </span>{result.payment_id}</p>
                    </div>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="mt-8 w-full max-w-sm rounded-2xl bg-red-500/10 border border-red-500/40 p-5 text-sm text-red-300">
                    ❌ {error}
                </div>
            )}

            {/* Footer note */}
            <p className="mt-12 text-xs text-gray-600 text-center max-w-xs">
                This page is running in <strong className="text-gray-500">Razorpay Test Mode</strong>. No real money is charged.
            </p>
        </main>
    );
}