
"use client";

import { useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Shard {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    color: string;
}

interface Star {
    x: number;
    y: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    pulse: number;
    ps: number;
    ttl: number;
    dying: boolean;
    shards: Shard[];
    dead: boolean;
}

interface ShootingStar {
    x: number;
    y: number;
    ang: number;
    spd: number;
    len: number;
    alpha: number;
    dead: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STAR_COLORS: string[] = ["#fff", "#ffe8d6", "#d6e8ff", "#ffd6f6", "#c8b6ff"];

function rand(a: number, b: number): number {
    return Math.random() * (b - a) + a;
}

function makeStar(W: number, H: number, initial = false): Star {
    return {
        x: rand(0, W),
        y: initial ? rand(0, H) : rand(-10, -2),
        vy: rand(0.015, 0.08),
        size: rand(0.4, 2.2),
        color: STAR_COLORS[Math.floor(rand(0, STAR_COLORS.length))],
        alpha: rand(0.3, 1),
        pulse: rand(0, Math.PI * 2),
        ps: rand(0.004, 0.022),
        ttl: rand(4000, 18000) + performance.now(),
        dying: false,
        shards: [],
        dead: false,
    };
}

function explode(s: Star): void {
    s.dying = true;
    const n = 6 + Math.floor(rand(0, 8));
    for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + rand(-0.3, 0.3);
        const sp = rand(0.5, 2.5);
        s.shards.push({
            x: s.x,
            y: s.y,
            vx: Math.cos(a) * sp,
            vy: Math.sin(a) * sp,
            size: rand(0.4, s.size * 1.3),
            alpha: 1,
            color: s.color,
        });
    }
}

function makeShoot(W: number, H: number): ShootingStar {
    return {
        x: rand(0, W),
        y: rand(0, H),
        ang: rand(0.15, 0.4),
        spd: rand(10, 18),
        len: rand(60, 160),
        alpha: 1,
        dead: false,
    };
}

export default function DestroyedStarsBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let W = 0;
        let H = 0;
        let stars: Star[] = [];
        let shoots: ShootingStar[] = [];
        let shootTimer = 0;
        let animId: number;

        function resize(): void {
            W = canvas!.width = window.innerWidth;
            H = canvas!.height = window.innerHeight;
            const n = Math.floor((W * H) / 3200);
            stars = Array.from({ length: n }, () => makeStar(W, H, true));
        }

        function drawBackground(): void {
            ctx!.fillStyle = "#020008";
            ctx!.fillRect(0, 0, W, H);

            const g = ctx!.createRadialGradient(
                W * 0.5, H * 0.5, 0,
                W * 0.5, H * 0.5, Math.max(W, H) * 0.75
            );
            g.addColorStop(0, "rgba(13,10,46,0.85)");
            g.addColorStop(1, "transparent");
            ctx!.fillStyle = g;
            ctx!.fillRect(0, 0, W, H);
        }

        function updateShootingStars(): void {
            shootTimer -= 16;
            if (shootTimer <= 0) {
                shoots.push(makeShoot(W, H));
                shootTimer = rand(1800, 4500);
            }

            shoots = shoots.filter((s) => !s.dead);

            for (const s of shoots) {
                const tx = s.x - Math.cos(s.ang) * s.len;
                const ty = s.y - Math.sin(s.ang) * s.len;
                const gr = ctx!.createLinearGradient(tx, ty, s.x, s.y);
                gr.addColorStop(0, "transparent");
                gr.addColorStop(1, `rgba(255,255,255,${s.alpha})`);

                ctx!.globalAlpha = s.alpha;
                ctx!.strokeStyle = gr;
                ctx!.lineWidth = 1.5;
                ctx!.beginPath();
                ctx!.moveTo(tx, ty);
                ctx!.lineTo(s.x, s.y);
                ctx!.stroke();
                ctx!.globalAlpha = 1;

                s.x += Math.cos(s.ang) * s.spd;
                s.y += Math.sin(s.ang) * s.spd;
                s.alpha -= 0.022;
                if (s.alpha <= 0) s.dead = true;
            }
        }

        function drawStar(s: Star, now: number): void {
            if (s.dead) return;

            if (!s.dying) {
                s.pulse += s.ps;
                s.alpha = 0.3 + 0.7 * Math.abs(Math.sin(s.pulse));
                s.y += s.vy;

                if (now > s.ttl) explode(s);
                if (s.y > H + 20) Object.assign(s, makeStar(W, H, false));

                ctx!.globalAlpha = s.alpha;
                ctx!.fillStyle = s.color;
                ctx!.shadowColor = s.color;
                ctx!.shadowBlur = s.size * 5;
                ctx!.beginPath();
                ctx!.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx!.fill();
                ctx!.shadowBlur = 0;
                ctx!.globalAlpha = 1;
            } else {
                for (const sh of s.shards) {
                    if (sh.alpha <= 0) continue;

                    ctx!.globalAlpha = sh.alpha;
                    ctx!.fillStyle = sh.color;
                    ctx!.shadowColor = sh.color;
                    ctx!.shadowBlur = sh.size * 6;
                    ctx!.beginPath();
                    ctx!.arc(sh.x, sh.y, sh.size, 0, Math.PI * 2);
                    ctx!.fill();
                    ctx!.shadowBlur = 0;
                    ctx!.globalAlpha = 1;

                    sh.x += sh.vx;
                    sh.y += sh.vy;
                    sh.vx *= 0.96;
                    sh.vy *= 0.96;
                    sh.alpha -= 0.02;
                    sh.size *= 0.98;
                }

                s.shards = s.shards.filter((sh) => sh.alpha > 0);
                if (s.shards.length === 0) s.dead = true;
            }
        }

        function tick(now: number): void {
            drawBackground();
            updateShootingStars();

            for (const s of stars) drawStar(s, now);

            // Respawn dead stars anywhere on screen
            stars = stars.map((s): Star => {
                if (!s.dead) return s;
                const ns = makeStar(W, H, false);
                ns.x = rand(0, W);
                ns.y = rand(0, H);
                return ns;
            });

            animId = requestAnimationFrame(tick);
        }

        resize();
        window.addEventListener("resize", resize);
        animId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-[#020008]">
            {/* Canvas fills entire viewport, fixed so it covers everything */}
            <canvas
                ref={canvasRef}
                style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0 }}
            />

            {/* Vignette */}
            <div
                style={{
                    position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
                    background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)",
                }}
            />

            {/* Hero content */}
            <div
                style={{ position: "relative", zIndex: 2 }}
                className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
            >
                <div
                    className="mb-6 px-4 py-1.5 rounded-full border text-xs tracking-[0.3em] uppercase"
                    style={{ borderColor: "rgba(139,92,246,0.4)", color: "#a78bfa", background: "rgba(139,92,246,0.08)" }}
                >
                    ✦ Stellar Collapse Observatory ✦
                </div>

                <h1
                    className="font-black leading-none mb-6"
                    style={{ fontSize: "clamp(3rem,10vw,8rem)", letterSpacing: "-0.03em", fontFamily: "Georgia, serif" }}
                >
                    <span style={{ background: "linear-gradient(135deg,#e2d9f3,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        dying
                    </span>
                    <br />
                    <span style={{ background: "linear-gradient(135deg,#fde68a,#fb923c,#f43f5e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        stars
                    </span>
                </h1>

                <p
                    className="max-w-md text-base font-light leading-relaxed mb-10"
                    style={{ color: "rgba(196,181,253,0.7)", fontFamily: "Georgia, serif", fontStyle: "italic" }}
                >
                    Watch each star ignite, collapse, and scatter its light across the void in real time.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    <button
                        className="px-8 py-3 rounded-full text-white text-sm font-semibold uppercase tracking-widest transition-transform hover:scale-105"
                        style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", border: "none" }}
                    >
                        Explore cosmos
                    </button>
                    <button
                        className="px-8 py-3 rounded-full text-sm uppercase tracking-widest"
                        style={{ border: "1px solid rgba(167,139,250,0.4)", color: "#c4b5fd", background: "rgba(139,92,246,0.06)" }}
                    >
                        Learn more
                    </button>
                </div>
            </div>
        </div>
    );
}