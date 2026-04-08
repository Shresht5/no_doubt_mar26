"use client";
import { useState, useEffect, useRef, RefObject, FC } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Project {
    id: number;
    name: string;
    category: string;
    desc: string;
    tech: string[];
    color: string;
    icon: string;
    year: string;
}

interface TeamMember {
    name: string;
    role: string;
    emoji: string;
    tag: string;
}

interface Step {
    label: string;
    desc: string;
    icon: string;
}

interface StatItem {
    val: number;
    suffix: string;
    label: string;
}

interface CounterProps {
    target: number;
    suffix?: string;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useInView(threshold: number = 0.2): [RefObject<HTMLElement | null>, boolean] {
    const ref = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState<boolean>(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setInView(true);
            },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);

    return [ref, inView];
}

// ─── Counter Component ────────────────────────────────────────────────────────

const Counter: FC<CounterProps> = ({ target, suffix = "" }) => {
    const [count, setCount] = useState<number>(0);
    const [ref, inView] = useInView(0.3);

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 25);
        return () => clearInterval(timer);
    }, [inView, target]);

    return (
        <span ref={ref as RefObject<HTMLSpanElement>}>
            {count}{suffix}
        </span>
    );
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects: Project[] = [
    {
        id: 1,
        name: "NexaBank Dashboard",
        category: "FinTech",
        desc: "Real-time analytics platform processing 2M+ transactions daily with AI-powered fraud detection.",
        tech: ["Next.js", "Python", "TensorFlow"],
        color: "#00f5a0",
        icon: "⬡",
        year: "2024",
    },
    {
        id: 2,
        name: "Vortex eCommerce",
        category: "Retail",
        desc: "Hyper-personalized shopping engine with 3D product previews and one-click checkout flow.",
        tech: ["React", "Three.js", "Node.js"],
        color: "#ff6b35",
        icon: "◈",
        year: "2024",
    },
    {
        id: 3,
        name: "MedSync Portal",
        category: "HealthTech",
        desc: "HIPAA-compliant telemedicine platform connecting 50K+ patients with doctors across 30 states.",
        tech: ["Vue", "AWS", "WebRTC"],
        color: "#a78bfa",
        icon: "◎",
        year: "2023",
    },
    {
        id: 4,
        name: "Orbit SaaS",
        category: "Productivity",
        desc: "End-to-end project OS that eliminated 80% of status meetings for remote-first teams.",
        tech: ["Next.js", "Supabase", "Go"],
        color: "#38bdf8",
        icon: "◉",
        year: "2023",
    },
];

const team: TeamMember[] = [
    { name: "Aryan Mehta", role: "Founder & Lead Engineer", emoji: "🧠", tag: "Architecture" },
    { name: "Priya Sharma", role: "Full-Stack Developer", emoji: "⚡", tag: "React / Node" },
    { name: "Rohan Das", role: "UI/UX Engineer", emoji: "✦", tag: "Design Systems" },
    { name: "Sneha Patel", role: "DevOps & Cloud", emoji: "☁", tag: "AWS / K8s" },
];

const steps: Step[] = [
    { label: "Discovery", desc: "Deep-dive sessions to map your goals, users, and constraints.", icon: "01" },
    { label: "Architecture", desc: "We design a scalable, future-proof system blueprint.", icon: "02" },
    { label: "Build & Iterate", desc: "Agile sprints with weekly demos — you're always in the loop.", icon: "03" },
    { label: "Launch & Evolve", desc: "Deployment, monitoring, and continuous innovation post-launch.", icon: "04" },
];

const stats: StatItem[] = [
    { val: 48, suffix: "+", label: "Client Projects" },
    { val: 6, suffix: " yrs", label: "In Business" },
    { val: 98, suffix: "%", label: "Client Satisfaction" },
    { val: 12, suffix: "", label: "Team Members" },
];

const orbitColors: string[] = ["#00f5a0", "#ff6b35", "#a78bfa"];
const orbitSizes: number[] = [160, 220, 310];

// ─── Page Component ───────────────────────────────────────────────────────────

export default function AboutPage() {
    const [activeProject, setActiveProject] = useState<number>(0);
    const [heroVisible, setHeroVisible] = useState<boolean>(false);

    const [processRef, processInView] = useInView(0.1);
    const [teamRef, teamInView] = useInView(0.1);

    useEffect(() => {
        const t = setTimeout(() => setHeroVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div
            style={{
                background: "#080b12",
                color: "#e8eaf0",
                fontFamily: "'Syne', 'Space Grotesk', sans-serif",
                minHeight: "100vh",
                overflowX: "hidden",
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fade-up.d1 { transition-delay: 0.1s; }
        .fade-up.d2 { transition-delay: 0.2s; }
        .fade-up.d3 { transition-delay: 0.3s; }
        .fade-up.d4 { transition-delay: 0.4s; }

        .tag-pill {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.5);
        }

        .glow-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,245,160,0.5), transparent);
        }

        .project-card {
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 28px;
          cursor: pointer;
          transition: border-color 0.3s ease, transform 0.3s ease, background 0.3s ease;
          background: rgba(255,255,255,0.02);
        }
        .project-card:hover, .project-card.active {
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
          transform: translateY(-3px);
        }

        .step-card {
          border-left: 2px solid rgba(255,255,255,0.1);
          padding-left: 24px;
          transition: border-color 0.3s ease;
        }
        .step-card:hover { border-color: #00f5a0; }

        .team-card {
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 28px 24px;
          background: rgba(255,255,255,0.02);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .team-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.15);
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #00f5a0;
          color: #080b12;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 14px 32px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,245,160,0.35);
        }

        .noise-bg {
          position: fixed;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(0,245,160,0.08);
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .orbit-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00f5a0;
          top: -3px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 10px #00f5a0;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }
        .pulse { animation: pulse-glow 3s ease-in-out infinite; }

        .stat-box {
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 24px 20px;
          text-align: center;
          background: rgba(255,255,255,0.02);
        }

        @media (max-width: 768px) {
          .hero-grid    { grid-template-columns: 1fr !important; }
          .project-grid { grid-template-columns: 1fr !important; }
          .team-grid    { grid-template-columns: 1fr 1fr !important; }
          .stats-grid   { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

            {/* Noise overlay */}
            <div className="noise-bg" />

            {/* ── NAV ────────────────────────────────────────────── */}
            <nav
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                    padding: "20px 48px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    background: "rgba(8,11,18,0.8)", backdropFilter: "blur(12px)",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, background: "#00f5a0", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "#080b12", fontWeight: 800, fontSize: 14 }}>{"<>"}</span>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>devcraft</span>
                </div>

                <div style={{ display: "flex", gap: 32, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                    {(["Work", "Process", "Team", "Contact"] as const).map((item) => (
                        <span
                            key={item}
                            style={{ cursor: "pointer", transition: "color 0.2s" }}
                            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
                            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </nav>

            {/* ── HERO ───────────────────────────────────────────── */}
            <section
                style={{
                    minHeight: "100vh", display: "flex", alignItems: "center",
                    padding: "120px 48px 80px", position: "relative", overflow: "hidden",
                }}
            >
                {/* Orbit graphic */}
                <div style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", width: 400, height: 400 }}>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div
                            className="pulse"
                            style={{
                                width: 80, height: 80, borderRadius: "50%",
                                background: "rgba(0,245,160,0.1)",
                                border: "2px solid rgba(0,245,160,0.3)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 28,
                            }}
                        >
                            ⟨/⟩
                        </div>
                    </div>

                    {orbitSizes.map((size: number, i: number) => (
                        <div
                            key={i}
                            className="orbit-ring"
                            style={{
                                width: size, height: size,
                                top: `calc(50% - ${size / 2}px)`,
                                left: `calc(50% - ${size / 2}px)`,
                                animationDuration: `${12 + i * 6}s`,
                                animationDirection: i % 2 === 0 ? "normal" : "reverse",
                            }}
                        >
                            <div
                                className="orbit-dot"
                                style={{
                                    background: orbitColors[i],
                                    boxShadow: `0 0 8px ${orbitColors[i]}`,
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Gradient blob */}
                <div
                    style={{
                        position: "absolute", top: "20%", left: "-10%",
                        width: 500, height: 500, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(0,245,160,0.05) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }}
                />

                {/* Hero text */}
                <div style={{ maxWidth: 640, position: "relative", zIndex: 1 }}>
                    <div className={`fade-up ${heroVisible ? "visible" : ""}`}>
                        <span className="tag-pill">About Us</span>
                    </div>

                    <h1
                        className={`fade-up d1 ${heroVisible ? "visible" : ""}`}
                        style={{ fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", margin: "24px 0 20px" }}
                    >
                        We build software<br />
                        <span style={{ color: "#00f5a0" }}>that changes</span><br />
                        what&apos;s possible.
                    </h1>

                    <p
                        className={`fade-up d2 ${heroVisible ? "visible" : ""}`}
                        style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", maxWidth: 480, marginBottom: 36 }}
                    >
                        A boutique dev studio crafting client products with precision engineering and relentless innovation.
                        We don&apos;t just ship features — we redesign what your product can become.
                    </p>

                    <div className={`fade-up d3 ${heroVisible ? "visible" : ""}`} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <button className="cta-btn">
                            See Our Work <span>→</span>
                        </button>
                        <button
                            style={{
                                background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                                color: "#e8eaf0", fontFamily: "'Syne', sans-serif", fontWeight: 600,
                                fontSize: 14, padding: "14px 28px", borderRadius: 8, cursor: "pointer",
                                letterSpacing: "0.03em",
                            }}
                        >
                            Meet the Team
                        </button>
                    </div>
                </div>
            </section>

            {/* ── STATS ──────────────────────────────────────────── */}
            <section style={{ padding: "60px 48px", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div
                    className="stats-grid"
                    style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, maxWidth: 900, margin: "0 auto" }}
                >
                    {stats.map((s: StatItem, i: number) => (
                        <div key={i} className="stat-box">
                            <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-0.03em", color: "#00f5a0" }}>
                                <Counter target={s.val} suffix={s.suffix} />
                            </div>
                            <div
                                style={{
                                    fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6,
                                    fontFamily: "'JetBrains Mono', monospace",
                                    textTransform: "uppercase", letterSpacing: "0.1em",
                                }}
                            >
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── PROJECTS ───────────────────────────────────────── */}
            <section style={{ padding: "100px 48px" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ marginBottom: 60 }}>
                        <span className="tag-pill">Client Work</span>
                        <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", marginTop: 16, lineHeight: 1.1 }}>
                            Projects that <span style={{ color: "#00f5a0" }}>redefine</span> industries
                        </h2>
                    </div>

                    <div className="project-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                        {projects.map((p: Project, i: number) => (
                            <div
                                key={p.id}
                                className={`project-card ${activeProject === i ? "active" : ""}`}
                                onClick={() => setActiveProject(i)}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                                    <div style={{ fontSize: 28, color: p.color }}>{p.icon}</div>
                                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                        <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.3)" }}>{p.year}</span>
                                        <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: `${p.color}18`, color: p.color, fontFamily: "'JetBrains Mono', monospace" }}>
                                            {p.category}
                                        </span>
                                    </div>
                                </div>
                                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.02em" }}>{p.name}</h3>
                                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: 20 }}>{p.desc}</p>
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    {p.tech.map((t: string) => (
                                        <span
                                            key={t}
                                            style={{
                                                fontSize: 11, padding: "3px 10px", borderRadius: 4,
                                                background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)",
                                                fontFamily: "'JetBrains Mono', monospace",
                                            }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="glow-line" style={{ margin: "0 48px" }} />

            {/* ── PROCESS ────────────────────────────────────────── */}
            <section style={{ padding: "100px 48px" }} ref={processRef as RefObject<HTMLElement>}>
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                    <div style={{ marginBottom: 60 }}>
                        <span className="tag-pill">How We Work</span>
                        <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", marginTop: 16, lineHeight: 1.1 }}>
                            From idea to <span style={{ color: "#00f5a0" }}>impact</span>
                        </h2>
                    </div>

                    <div style={{ display: "grid", gap: 40 }}>
                        {steps.map((s: Step, i: number) => (
                            <div key={i} className={`step-card fade-up ${processInView ? `visible d${i + 1}` : ""}`}>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
                                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#00f5a0", minWidth: 24, paddingTop: 4 }}>
                                        {s.icon}
                                    </span>
                                    <div>
                                        <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 10 }}>{s.label}</h3>
                                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{s.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="glow-line" style={{ margin: "0 48px" }} />

            {/* ── TEAM ───────────────────────────────────────────── */}
            <section style={{ padding: "100px 48px" }} ref={teamRef as RefObject<HTMLElement>}>
                <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                    <div style={{ marginBottom: 60 }}>
                        <span className="tag-pill">The Team</span>
                        <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", marginTop: 16, lineHeight: 1.1 }}>
                            People who <span style={{ color: "#00f5a0" }}>obsess</span> over craft
                        </h2>
                    </div>

                    <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                        {team.map((m: TeamMember, i: number) => (
                            <div key={i} className={`team-card fade-up ${teamInView ? `visible d${i + 1}` : ""}`}>
                                <div style={{ fontSize: 36, marginBottom: 16 }}>{m.emoji}</div>
                                <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 4 }}>{m.name}</h3>
                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 16, lineHeight: 1.5 }}>{m.role}</p>
                                <span
                                    style={{
                                        fontSize: 10, padding: "3px 10px", borderRadius: 4,
                                        background: "rgba(0,245,160,0.08)", color: "#00f5a0",
                                        fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em",
                                    }}
                                >
                                    {m.tag}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ────────────────────────────────────────────── */}
            <section style={{ padding: "100px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div
                    style={{
                        position: "absolute", inset: 0,
                        background: "radial-gradient(ellipse at center, rgba(0,245,160,0.04) 0%, transparent 65%)",
                        pointerEvents: "none",
                    }}
                />
                <span className="tag-pill">Start a Project</span>
                <h2 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.04em", margin: "24px 0 20px", lineHeight: 1.05 }}>
                    Ready to build<br />
                    <span style={{ color: "#00f5a0" }}>something extraordinary?</span>
                </h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 400, margin: "0 auto 40px" }}>
                    Tell us about your project. We&apos;ll come back with ideas that surprise you.
                </p>
                <button className="cta-btn" style={{ fontSize: 15, padding: "16px 40px" }}>
                    Let&apos;s Talk <span>→</span>
                </button>
            </section>

            {/* ── FOOTER ─────────────────────────────────────────── */}
            <footer
                style={{
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    padding: "32px 48px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    flexWrap: "wrap", gap: 16,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 24, height: 24, background: "#00f5a0", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "#080b12", fontWeight: 800, fontSize: 11 }}>{"<>"}</span>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: "-0.02em" }}>devcraft</span>
                </div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", fontFamily: "'JetBrains Mono', monospace" }}>
                    © 2026 devcraft studio. all rights reserved.
                </p>
            </footer>
        </div>
    );
}