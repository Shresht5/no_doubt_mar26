"use client";

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Tentacle {
    angle: number;
    len: number;
    wave: number;
    ws: number;
}

interface Mote {
    x: number;
    y: number;
    r: number;
    vy: number;
    vx: number;
    alpha: number;
    maxAlpha: number;
    fadeIn: number;
    life: number;
    decay: number;
    hue: number;
    pulse: number;
    ps: number;
}

interface Orb {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    alpha: number;
    maxAlpha: number;
    fadeIn: number;
    life: number;
    decay: number;
    hue: number;
    pulse: number;
    ps: number;
    tentacles: Tentacle[];
}

interface Streak {
    x: number;
    y: number;
    len: number;
    angle: number;
    speed: number;
    alpha: number;
    life: number;
    decay: number;
    hue: number;
}

// ─── Factory helpers ──────────────────────────────────────────────────────────

function rnd(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function makeMote(W: number, H: number, initial = false): Mote {
    const maxAlpha = rnd(0.2, 0.9);
    return {
        x: Math.random() * W,
        y: initial ? Math.random() * H : H + rnd(0, 60),
        r: rnd(0.3, 2.1),
        vy: -rnd(0.1, 0.5),
        vx: rnd(-0.15, 0.15),
        alpha: initial ? Math.random() * maxAlpha : 0,
        maxAlpha,
        fadeIn: rnd(0.003, 0.011),
        life: 1,
        decay: rnd(0.0005, 0.002),
        hue: Math.random() < 0.7 ? 185 : 210,
        pulse: Math.random() * Math.PI * 2,
        ps: rnd(0.01, 0.04),
    };
}

function makeOrb(W: number, H: number): Orb {
    const sz = rnd(25, 80);
    return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: sz,
        vx: rnd(-0.12, 0.12),
        vy: -rnd(0.02, 0.1),
        alpha: 0,
        maxAlpha: rnd(0.04, 0.16),
        fadeIn: rnd(0.001, 0.003),
        life: 1,
        decay: rnd(0.0001, 0.0005),
        hue: Math.random() < 0.6 ? 188 : 215,
        pulse: Math.random() * Math.PI * 2,
        ps: rnd(0.003, 0.011),
        tentacles: Array.from(
            { length: Math.floor(rnd(3, 8)) },
            (): Tentacle => ({
                angle: Math.random() * Math.PI * 2,
                len: rnd(sz * 0.5, sz * 1.7),
                wave: Math.random() * Math.PI * 2,
                ws: rnd(0.02, 0.06),
            })
        ),
    };
}

function makeStreak(W: number, H: number): Streak {
    return {
        x: Math.random() * W,
        y: Math.random() * H,
        len: rnd(15, 55),
        angle: -Math.PI / 2 + rnd(-0.4, 0.4),
        speed: rnd(0.5, 1.7),
        alpha: rnd(0.1, 0.45),
        life: 1,
        decay: rnd(0.008, 0.026),
        hue: 195,
    };
}

// ─── Draw functions ───────────────────────────────────────────────────────────

function drawBackground(ctx: CanvasRenderingContext2D, W: number, H: number): void {
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#00060f");
    bg.addColorStop(0.4, "#000d1a");
    bg.addColorStop(1, "#000508");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Depth haze
    for (const { y, c } of [
        { y: 0.3, c: "rgba(0,30,60,0.18)" },
        { y: 0.65, c: "rgba(0,20,45,0.12)" },
    ]) {
        const gr = ctx.createRadialGradient(W * 0.5, H * y, 0, W * 0.5, H * y, W * 0.6);
        gr.addColorStop(0, c);
        gr.addColorStop(1, "transparent");
        ctx.fillStyle = gr;
        ctx.fillRect(0, 0, W, H);
    }
}

function updateOrb(
    ctx: CanvasRenderingContext2D,
    o: Orb,
    W: number,
    H: number
): boolean {
    o.pulse += o.ps;
    o.x += o.vx;
    o.y += o.vy;

    if (o.life > 0.5) {
        o.alpha = Math.min(o.alpha + o.fadeIn, o.maxAlpha * (0.7 + 0.3 * Math.sin(o.pulse)));
    } else {
        o.alpha = Math.max(0, o.alpha - o.fadeIn * 0.5);
    }
    o.life -= o.decay;

    const pr = o.r * (1 + 0.08 * Math.sin(o.pulse));
    const og = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, pr * 2.5);
    og.addColorStop(0, `hsla(${o.hue},95%,75%,${o.alpha})`);
    og.addColorStop(0.35, `hsla(${o.hue},90%,55%,${o.alpha * 0.5})`);
    og.addColorStop(1, "transparent");
    ctx.fillStyle = og;
    ctx.beginPath();
    ctx.arc(o.x, o.y, pr * 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Tentacles
    for (const tn of o.tentacles) {
        tn.wave += tn.ws;
        ctx.strokeStyle = `hsla(${o.hue},90%,70%,${o.alpha * 0.6})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(o.x, o.y + pr * 0.6);
        for (let s = 0; s < 8; s++) {
            const frac = (s + 1) / 8;
            ctx.lineTo(
                o.x + Math.sin(tn.wave + s * 0.5) * pr * 0.4 * frac,
                o.y + pr * 0.6 + frac * tn.len
            );
        }
        ctx.stroke();
    }

    return o.life <= 0 || o.x < -120 || o.x > W + 120 || o.y < -220;
}

function updateMote(ctx: CanvasRenderingContext2D, m: Mote): boolean {
    m.pulse += m.ps;
    m.y += m.vy;
    m.x += m.vx;

    if (m.life > 0.3) {
        m.alpha = Math.min(m.alpha + m.fadeIn, m.maxAlpha * (0.6 + 0.4 * Math.sin(m.pulse)));
    } else {
        m.alpha = Math.max(0, m.alpha - m.fadeIn);
    }
    m.life -= m.decay;

    const mg = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 4);
    mg.addColorStop(0, `hsla(${m.hue},100%,80%,${m.alpha})`);
    mg.addColorStop(1, "transparent");
    ctx.fillStyle = mg;
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.r * 4, 0, Math.PI * 2);
    ctx.fill();

    return m.life <= 0 || m.y < -20;
}

function updateStreak(ctx: CanvasRenderingContext2D, s: Streak): boolean {
    s.life -= s.decay;
    const ex = s.x + Math.cos(s.angle) * s.len;
    const ey = s.y + Math.sin(s.angle) * s.len;

    const sg = ctx.createLinearGradient(s.x, s.y, ex, ey);
    sg.addColorStop(0, "transparent");
    sg.addColorStop(1, `hsla(${s.hue},100%,70%,${s.alpha * s.life})`);
    ctx.strokeStyle = sg;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(ex, ey);
    ctx.stroke();

    s.x += Math.cos(s.angle) * 0.4;
    s.y += Math.sin(s.angle) * 0.4;
    return s.life <= 0;
}

function drawVignette(ctx: CanvasRenderingContext2D, W: number, H: number): void {
    const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.85);
    vig.addColorStop(0, "transparent");
    vig.addColorStop(1, "rgba(0,4,10,0.72)");
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);
}

// ─── Component ────────────────────────────────────────────────────────────────

const STATS: { value: string; label: string; color: string }[] = [
    { value: "2°C", label: "Water temp", color: "#22d3ee" },
    { value: "380 atm", label: "Pressure", color: "#38bdf8" },
    { value: "0 lux", label: "Ambient light", color: "#7dd3fc" },
];

export default function BioluminescenceBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let W = 0;
        let H = 0;
        let motes: Mote[] = [];
        let orbs: Orb[] = [];
        let streaks: Streak[] = [];
        let animId: number;

        function init(): void {
            const moteCount = Math.floor((W * H) / 2800);
            motes = Array.from({ length: moteCount }, () => makeMote(W, H, true));
            orbs = Array.from({ length: 8 }, () => makeOrb(W, H));
            streaks = Array.from({ length: 15 }, (): Streak => {
                const s = makeStreak(W, H);
                s.life = Math.random();
                return s;
            });
        }

        function resize(): void {
            W = canvas!.width = window.innerWidth;
            H = canvas!.height = window.innerHeight;
            init();
        }

        function frame(): void {
            drawBackground(ctx!, W, H);

            ctx!.globalCompositeOperation = "screen";

            // Orbs
            orbs = orbs.map((o) => {
                const dead = updateOrb(ctx!, o, W, H);
                return dead ? makeOrb(W, H) : o;
            });

            // Motes
            motes = motes.map((m) => {
                const dead = updateMote(ctx!, m);
                return dead ? makeMote(W, H) : m;
            });

            // Streaks
            streaks = streaks.map((s) => {
                const dead = updateStreak(ctx!, s);
                return dead ? makeStreak(W, H) : s;
            });

            ctx!.globalCompositeOperation = "source-over";
            drawVignette(ctx!, W, H);

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
        <div className="relative w-full min-h-screen overflow-hidden" style={{ background: "#00060f" }}>
            {/* Canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 0,
                }}
            />

            {/* Hero */}
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    fontFamily: "'Didot','Bodoni MT','Playfair Display',Georgia,serif",
                }}
                className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
            >
                {/* Depth label */}
                <p
                    className="mb-7 text-[10px] tracking-[0.5em] uppercase"
                    style={{ color: "rgba(103,232,249,0.5)" }}
                >
                    — 3,800 m below the surface —
                </p>

                {/* Heading */}
                <h1
                    className="leading-tight mb-5 font-normal"
                    style={{ fontSize: "clamp(2.6rem,8.5vw,7rem)", letterSpacing: "-0.01em" }}
                >
                    <span style={{ color: "rgba(224,242,254,0.92)" }}>the</span>
                    <br />
                    <em
                        style={{
                            fontStyle: "italic",
                            background: "linear-gradient(135deg,#06b6d4,#0ea5e9,#38bdf8,#7dd3fc)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        abyss
                    </em>
                    <br />
                    <span
                        style={{
                            color: "rgba(186,230,253,0.75)",
                            fontSize: "0.65em",
                            letterSpacing: "0.08em",
                        }}
                    >
                        glows
                    </span>
                </h1>

                {/* Subtitle */}
                <p
                    className="max-w-xs text-[0.95rem] leading-[1.9] mb-11 font-light"
                    style={{ color: "rgba(147,210,232,0.55)", fontStyle: "italic" }}
                >
                    In the darkest places on Earth, life invents its own light — cold fire, speaking in pulses.
                </p>

                {/* CTA */}
                <div className="flex flex-wrap gap-3 justify-center">
                    {[
                        { label: "The science", color: "#22d3ee", border: "rgba(6,182,212,0.35)", bg: "rgba(6,182,212,0.1)" },
                        { label: "Creatures", color: "#7dd3fc", border: "rgba(14,165,233,0.25)", bg: "rgba(14,165,233,0.08)" },
                    ].map((btn) => (
                        <button
                            key={btn.label}
                            className="text-[11px] uppercase tracking-[0.25em] px-6 py-[10px] rounded-sm cursor-pointer transition-transform hover:scale-105"
                            style={{
                                background: btn.bg,
                                color: btn.color,
                                border: `1px solid ${btn.border}`,
                                backdropFilter: "blur(12px)",
                                fontFamily: "inherit",
                            }}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div
                    className="absolute bottom-8 flex gap-14"
                    style={{ left: "50%", transform: "translateX(-50%)" }}
                >
                    {STATS.map((s) => (
                        <div key={s.label} className="text-center">
                            <div
                                className="text-[1.3rem] font-light tracking-[0.05em]"
                                style={{ color: s.color }}
                            >
                                {s.value}
                            </div>
                            <div
                                className="text-[9px] uppercase tracking-[0.25em] mt-1"
                                style={{ color: "rgba(103,232,249,0.4)" }}
                            >
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}