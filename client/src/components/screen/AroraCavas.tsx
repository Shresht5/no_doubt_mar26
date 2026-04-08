"use client";

import { FC, ReactNode, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Ribbon {
    yBase: number;   // 0–1 fraction of screen height
    amp: number;     // wave amplitude as fraction of H
    freq: number;    // horizontal frequency multiplier
    speed: number;   // animation speed
    phase: number;   // phase offset
    colors: [string, string, string, string]; // gradient stops
    width: number;   // ribbon band height as fraction of H
}

interface Point {
    x: number;
    y: number;
}

// ─── Ribbon definitions ───────────────────────────────────────────────────────

const RIBBONS: Ribbon[] = [
    {
        yBase: 0.25, amp: 0.10, freq: 0.6, speed: 0.18, phase: 0,
        colors: ["rgba(16,185,129,0)", "rgba(52,211,153,0.55)", "rgba(16,185,129,0.30)", "rgba(16,185,129,0)"],
        width: 0.22,
    },
    {
        yBase: 0.40, amp: 0.08, freq: 0.8, speed: 0.24, phase: 2.1,
        colors: ["rgba(34,211,238,0)", "rgba(103,232,249,0.45)", "rgba(34,211,238,0.25)", "rgba(34,211,238,0)"],
        width: 0.18,
    },
    {
        yBase: 0.18, amp: 0.12, freq: 0.5, speed: 0.14, phase: 1.0,
        colors: ["rgba(74,222,128,0)", "rgba(134,239,172,0.50)", "rgba(74,222,128,0.20)", "rgba(74,222,128,0)"],
        width: 0.28,
    },
    {
        yBase: 0.55, amp: 0.07, freq: 1.0, speed: 0.30, phase: 3.5,
        colors: ["rgba(129,140,248,0)", "rgba(165,180,252,0.40)", "rgba(129,140,248,0.20)", "rgba(129,140,248,0)"],
        width: 0.15,
    },
    {
        yBase: 0.32, amp: 0.09, freq: 0.7, speed: 0.20, phase: 4.2,
        colors: ["rgba(52,211,153,0)", "rgba(110,231,183,0.38)", "rgba(52,211,153,0.18)", "rgba(52,211,153,0)"],
        width: 0.20,
    },
    {
        yBase: 0.62, amp: 0.06, freq: 0.9, speed: 0.26, phase: 0.7,
        colors: ["rgba(34,211,238,0)", "rgba(6,182,212,0.35)", "rgba(34,211,238,0.15)", "rgba(34,211,238,0)"],
        width: 0.14,
    },
    {
        yBase: 0.12, amp: 0.08, freq: 0.55, speed: 0.16, phase: 5.1,
        colors: ["rgba(167,243,208,0)", "rgba(167,243,208,0.42)", "rgba(167,243,208,0.18)", "rgba(167,243,208,0)"],
        width: 0.16,
    },
];

// ─── Canvas helpers ───────────────────────────────────────────────────────────

function drawRibbon(
    ctx: CanvasRenderingContext2D,
    rb: Ribbon,
    t: number,
    W: number,
    H: number
): void {
    const STEPS = 100;
    const pts: Point[] = [];

    for (let i = 0; i <= STEPS; i++) {
        const x = (i / STEPS) * W;
        const wave =
            Math.sin(x * rb.freq * 0.003 + t * rb.speed + rb.phase) +
            0.4 * Math.sin(x * rb.freq * 0.007 + t * rb.speed * 1.3 + rb.phase + 1) +
            0.2 * Math.sin(x * rb.freq * 0.013 + t * rb.speed * 0.7 + rb.phase + 2);
        pts.push({ x, y: rb.yBase * H + wave * rb.amp * H });
    }

    const bandH = rb.width * H;

    for (let i = 0; i < STEPS; i++) {
        const { x: x0, y: y0 } = pts[i];
        const { x: x1, y: y1 } = pts[i + 1];
        const mx = (x0 + x1) * 0.5;
        const my = (y0 + y1) * 0.5;

        const grad = ctx.createLinearGradient(mx, my - bandH * 0.5, mx, my + bandH * 0.5);
        grad.addColorStop(0, rb.colors[0]);
        grad.addColorStop(0.3, rb.colors[1]);
        grad.addColorStop(0.6, rb.colors[2]);
        grad.addColorStop(1, rb.colors[3]);

        ctx.beginPath();
        ctx.moveTo(x0, y0 - bandH * 0.5);
        ctx.lineTo(x1, y1 - bandH * 0.5);
        ctx.lineTo(x1, y1 + bandH * 0.5);
        ctx.lineTo(x0, y0 + bandH * 0.5);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
    }
}

function drawStars(ctx: CanvasRenderingContext2D, W: number, H: number, t: number): void {
    let seed = 42;
    ctx.fillStyle = "rgba(255,255,255,0.55)";

    for (let i = 0; i < 220; i++) {
        seed = (seed * 16807) % 2147483647;
        const sx = seed % W;
        seed = (seed * 16807) % 2147483647;
        const sy = seed % H;
        seed = (seed * 16807) % 2147483647;
        const sr = 0.3 + (seed % 10) * 0.12;
        const flicker = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.4 + i * 0.7));

        ctx.globalAlpha = flicker * 0.6;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

function drawBackground(ctx: CanvasRenderingContext2D, W: number, H: number): void {
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#010b14");
    sky.addColorStop(0.5, "#021520");
    sky.addColorStop(1, "#010b14");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AuroraBorealisBackground({ children }: { children: ReactNode }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let W = 0;
        let H = 0;
        let t = 0;
        let animId: number;

        function resize(): void {
            W = canvas!.width = window.innerWidth;
            H = canvas!.height = window.innerHeight;
        }

        function frame(): void {
            t += 0.012;

            drawBackground(ctx!, W, H);
            drawStars(ctx!, W, H, t);

            // Ground glow
            const gnd = ctx!.createLinearGradient(0, H * 0.82, 0, H);
            gnd.addColorStop(0, "transparent");
            gnd.addColorStop(1, "rgba(16,185,129,0.07)");
            ctx!.fillStyle = gnd;
            ctx!.fillRect(0, 0, W, H);

            // Ribbons use "screen" blend for that additive glow effect
            ctx!.globalCompositeOperation = "screen";
            RIBBONS.forEach((rb) => drawRibbon(ctx!, rb, t, W, H));
            ctx!.globalCompositeOperation = "source-over";

            animId = requestAnimationFrame(frame);
        }

        resize();
        window.addEventListener("resize", resize);
        animId = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className="relative w-full min-h-screen overflow-hidden" style={{ background: "#010b14" }}>
            {/* Full-viewport canvas */}
            <canvas ref={canvasRef} className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none" />
            {children}
        </div>
    );
}