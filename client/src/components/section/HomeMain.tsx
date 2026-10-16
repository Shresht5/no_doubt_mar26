import MainInput from "@/components/input/MainTextInput";
import Link from "next/link";
import SignupButton from "../button/SignupButton";
import HomeNavBar from "../navbar/NavBar";
import HomeSlideMenuData from "./HomeSlideMenuData";

/* ─── tiny animated grid bg ─────────────────────────────────────── */
function GridBg() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-[#f5f3ee]" />
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #4a4035 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* warm ink blobs */}
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-[#e8d5b0] opacity-40 blur-[90px]" />
      <div className="absolute top-1/2 right-0 w-[380px] h-[380px] rounded-full bg-[#c8dfc8] opacity-30 blur-[80px]" />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-[#d6c4e8] opacity-20 blur-[70px]" />
    </div>
  );
}

/* ─── step pill ──────────────────────────────────────────────────── */
function Step({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-7 h-7 rounded-full bg-[#2e2a22] text-[#f5f3ee] text-xs font-semibold flex items-center justify-center flex-shrink-0 font-mono">
        {n}
      </span>
      <span className="text-[#4a4035] text-sm leading-snug">{label}</span>
    </div>
  );
}

/* ─── file-type badge ────────────────────────────────────────────── */
function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase"
      style={{ background: color + "22", color }}
    >
      {label}
    </span>
  );
}

/* ─── feature card ───────────────────────────────────────────────── */
function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-white/60 border border-[#d6cfbf] rounded-2xl p-5 flex flex-col gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm">
      <span className="text-2xl">{icon}</span>
      <h3 className="text-[#2e2a22] font-semibold text-sm">{title}</h3>
      <p className="text-[#7a7060] text-sm leading-relaxed">{body}</p>
    </div>
  );
}

/* ─── main page ──────────────────────────────────────────────────── */
export default function Page() {
  return (
    <div
      className="min-h-screen font-sans text-[#2e2a22]"
      style={{ fontFamily: "'DM Sans', 'Lato', sans-serif" }}
    >
      <GridBg />
      <div className="relative z-10">
        <HomeNavBar heading="No doubt" colour="black">
          <HomeSlideMenuData />
        </HomeNavBar>
      </div>
      {/* <nav className="sticky top-0 z-40 flex items-center justify-between px-6 sm:px-10 py-4 bg-[#f5f3ee]/80 backdrop-blur-md border-b border-[#d6cfbf]">
        <div className="flex items-center gap-2">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect width="26" height="26" rx="7" fill="#2e2a22" />
            <path
              d="M7 13h4l2-5 2 10 2-5h2"
              stroke="#f5f3ee"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="text-lg font-bold tracking-tight text-[#2e2a22]"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            No_Doubt
          </span>
          <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold bg-[#4a7c59]/15 text-[#4a7c59] rounded uppercase tracking-wider">
            Beta
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <a
            href="#how"
            className="hidden sm:block text-[#7a7060] hover:text-[#2e2a22] transition-colors"
          >
            How it works
          </a>
          <a
            href="#features"
            className="hidden sm:block text-[#7a7060] hover:text-[#2e2a22] transition-colors"
          >
            Features
          </a>
          <SignupButton />
        </div>
      </nav> */}

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center text-center px-4 pt-20 pb-10">
        {/* eyebrow */}
        <div className="mb-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4a7c59]/10 border border-[#4a7c59]/20 text-[#4a7c59] text-xs font-semibold tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4a7c59] animate-pulse" />
          For students &amp; educators
        </div>

        <h1
          className="text-4xl sm:text-6xl font-bold leading-[1.07] max-w-3xl mb-5 text-[#2e2a22]"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Every lecture, podcast &amp; document —{" "}
          <span className="italic text-[#4a7c59]">understood.</span>
        </h1>

        <p className="text-[#7a7060] text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
          Paste a YouTube link or upload any file. Learna extracts the content,
          transcribes it, and opens an AI chat so you can quiz yourself, get
          summaries, and learn faster.
        </p>

        {/* supported types */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Badge label="YouTube" color="#e52d27" />
          <Badge label="Insta" color="#e52daa" />
          <Badge label="PDF" color="#d14a00" />
          <Badge label="CSV" color="#4a7c59" />
          <Badge label="XLSX" color="#2d7a2d" />
          <Badge label="MP4" color="#6b5ea8" />
          <Badge label="MP3" color="#b8860b" />
          <Badge label="DOCX" color="#1a6fa8" />
          <Badge label="PPT" color="#c84b31" />
          <Badge label="TXT" color="#7a7060" />
        </div>

        {/* ── INPUT CARD ─────────────────────────────────── */}
        <div className="w-full max-w-xl bg-white/70 border border-[#d6cfbf] rounded-2xl p-6 shadow-xl shadow-[#2e2a22]/5 backdrop-blur-md">
          <p className="text-xs font-semibold text-[#7a7060] uppercase tracking-widest mb-4">
            Start learning
          </p>
          <MainInput />
        </div>

        <p className="mt-4 text-xs text-[#b0a898]">
          Free to use · No credit card · Sign in to save your chats
        </p>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section
        id="how"
        className="px-6 sm:px-10 py-16 flex flex-col items-center"
      >
        <h2
          className="text-2xl sm:text-3xl font-bold mb-10 text-[#2e2a22]"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          How it works
        </h2>

        <div className="w-full max-w-lg flex flex-col gap-5">
          <Step
            n={1}
            label="Paste a YouTube / any video URL, or upload a PDF, spreadsheet, audio, or video file."
          />
          <div className="ml-3.5 w-0.5 h-4 bg-[#d6cfbf]" />
          <Step
            n={2}
            label="Learna extracts and transcribes the text content automatically."
          />
          <div className="ml-3.5 w-0.5 h-4 bg-[#d6cfbf]" />
          <Step
            n={3}
            label="An AI chat session opens — ask questions, get summaries, quiz yourself."
          />
          <div className="ml-3.5 w-0.5 h-4 bg-[#d6cfbf]" />
          <Step
            n={4}
            label="Sign in with Google to save all your sessions and revisit them anytime."
          />
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section
        id="features"
        className="px-6 sm:px-10 py-10 pb-20 flex flex-col items-center"
      >
        <h2
          className="text-2xl sm:text-3xl font-bold mb-10 text-[#2e2a22]"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Built for learning
        </h2>

        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            icon="🎓"
            title="Education-first design"
            body="Built for students and educators. Summarise lectures, decode dense papers, and understand spreadsheets — all in one place."
          />
          <FeatureCard
            icon="🔗"
            title="YouTube & URL support"
            body="Paste any YouTube link or direct media URL. Learna downloads the audio, strips silence, and transcribes it in moments."
          />
          <FeatureCard
            icon="📄"
            title="Every file type"
            body="PDF, DOCX, PPTX, XLSX, CSV, MP3, MP4, WAV — if it has content, Learna can read and discuss it with you."
          />
          <FeatureCard
            icon="🤖"
            title="AI agent chat"
            body="Your transcript becomes a live conversation. Ask follow-up questions, request quizzes, or get a bullet-point summary."
          />
          <FeatureCard
            icon="🔐"
            title="Google sign-in"
            body="One click to authenticate with your Google account. All your sessions are saved and accessible from any device."
          />
          <FeatureCard
            icon="⚡"
            title="Fast extraction"
            body="Text extraction and transcription happen server-side in seconds, so you get to learning without waiting."
          />
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────── */}
      <section className="mx-6 sm:mx-10 mb-20 rounded-2xl bg-[#2e2a22] text-[#f5f3ee] px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Ready to learn smarter?
          </h2>
          <p className="text-[#b0a898] text-sm">
            No setup. Just paste a link or drop a file.
          </p>
        </div>
        <Link
          href="/google_auth"
          className="flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#2e2a22] font-semibold text-sm shadow hover:opacity-90 transition flex-shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.5 30.3 0 24 0 14.7 0 6.7 5.4 2.7 13.3l7.9 6.1C12.5 13 17.8 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17z"
            />
            <path
              fill="#FBBC05"
              d="M10.6 28.6A14.6 14.6 0 0 1 9.5 24c0-1.6.3-3.1.8-4.6l-7.9-6.1A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l8-6.1z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.3 0 11.6-2.1 15.5-5.7l-7.5-5.8c-2.1 1.4-4.8 2.2-8 2.2-6.2 0-11.5-4.2-13.4-9.9l-8 6.1C6.7 42.6 14.7 48 24 48z"
            />
          </svg>
          Get started free
        </Link>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="border-t border-[#d6cfbf] px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#b0a898]">
        <span>
          © {new Date().getFullYear()} No_Doubt · For educational use only
        </span>
        <div className="flex gap-5">
          <a href="#" className="hover:text-[#7a7060] transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-[#7a7060] transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-[#7a7060] transition-colors">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
