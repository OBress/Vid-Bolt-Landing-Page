"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "./hooks";
import Image from "next/image";
import dynamic from "next/dynamic";

const AgentNetwork = dynamic(() => import("@/components/AgentNetwork"), { ssr: false });
import {
  Zap,
  ArrowRight,
  Globe,
  Bot,
  Cpu,
  FileText,
  Wand2,
  Film,
  Download,
  ChevronRight,
  Menu,
  X,
  DollarSign,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════════════════ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <nav style={{ maxWidth: "1440px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", position: "relative" }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", position: "relative", zIndex: 1 }}>
          <Image src="/logo_50.png" alt="Vid Bolt logo" width={36} height={36} />
          <span style={{ fontSize: "18px", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
            Vid <span style={{ color: "#f97316" }}>Bolt</span>
          </span>
        </a>

        {/* Desktop nav — absolutely centered */}
        <div className="hidden md:flex" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", alignItems: "center", gap: "32px" }}>
          {[
            { href: "#features", label: "Features" },
            { href: "#how-it-works", label: "How It Works" },
            { href: "#technology", label: "Technology" },
          ].map((l) => (
            <a key={l.href} href={l.href} style={{ fontSize: "14px", fontWeight: 500, color: "#a3a3a3", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#a3a3a3")}>
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href="https://discord.gg/FJGkxFPkKJ"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
            style={{
              alignItems: "center", gap: "6px", padding: "10px 22px",
              background: "transparent",
              color: "#e5e5e5", fontWeight: 700, fontSize: "13px", borderRadius: "9999px", textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.12)",
              transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "#5865F2"; e.currentTarget.style.color = "#5865F2"; e.currentTarget.style.background = "rgba(88,101,242,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#e5e5e5"; e.currentTarget.style.background = "transparent"; }}
          >
            <svg width="16" height="12" viewBox="0 0 71 55" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M60.1 4.9A58.5 58.5 0 0045.4.2a.2.2 0 00-.2.1 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.2 0A37.4 37.4 0 0025.4.3a.2.2 0 00-.2-.1A58.4 58.4 0 0010.5 4.9a.2.2 0 00-.1.1C1.5 18.7-.9 32.2.3 45.5v.2a58.9 58.9 0 0017.7 9a.2.2 0 00.3-.1 42.1 42.1 0 003.6-5.9.2.2 0 00-.1-.3 38.8 38.8 0 01-5.5-2.7.2.2 0 010-.4l1.1-.9a.2.2 0 01.2 0 42 42 0 0035.6 0 .2.2 0 01.2 0l1.1.9a.2.2 0 010 .4 36.4 36.4 0 01-5.5 2.7.2.2 0 00-.1.3 47.3 47.3 0 003.6 5.9.2.2 0 00.3.1A58.7 58.7 0 0070.5 45.7v-.2c1.4-15-2.3-28.4-9.8-40.1a.2.2 0 00-.1-.1h-.5zM23.7 37.3c-3.5 0-6.3-3.2-6.3-7.1s2.8-7.1 6.3-7.1 6.4 3.2 6.3 7.1c0 3.9-2.8 7.1-6.3 7.1zm23.3 0c-3.5 0-6.3-3.2-6.3-7.1s2.8-7.1 6.3-7.1 6.4 3.2 6.3 7.1c0 3.9-2.8 7.1-6.3 7.1z"/></svg>
            Apply to Join
          </a>
          <a
            href="https://studio.vidbolt.app"
            className="hidden sm:inline-flex"
            style={{
              alignItems: "center", gap: "6px", padding: "10px 22px",
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              color: "#fff", fontWeight: 700, fontSize: "13px", borderRadius: "9999px", textDecoration: "none",
              boxShadow: "0 4px 15px rgba(249,115,22,0.25)",
              transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(249,115,22,0.35)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(249,115,22,0.25)"; }}
          >
            Dashboard <ArrowRight size={14} />
          </a>
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", color: "#a3a3a3", cursor: "pointer", padding: "8px" }}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)", padding: "16px 24px" }}>
          {[
            { href: "#features", label: "Features" },
            { href: "#how-it-works", label: "How It Works" },
            { href: "#technology", label: "Technology" },
          ].map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ display: "block", padding: "12px 0", fontSize: "14px", color: "#d4d4d4", textDecoration: "none" }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {/* Full-page agent network background */}
      <AgentNetwork fullPage />

      {/* Gradient orbs */}
      <div style={{ position: "absolute", width: "700px", height: "700px", top: "-200px", right: "-150px", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.12), transparent 70%)", filter: "blur(60px)", animation: "orb-drift-1 25s ease-in-out infinite", pointerEvents: "none", zIndex: 1 }} />
      <div style={{ position: "absolute", width: "500px", height: "500px", bottom: "-100px", left: "-100px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%)", filter: "blur(60px)", animation: "orb-drift-2 30s ease-in-out infinite", pointerEvents: "none", zIndex: 1 }} />

      {/* Headline — no glass card, directly over the network */}
        <h1
          style={{
            position: "relative",
            zIndex: 2,
            fontSize: "clamp(32px, 5.5vw, 64px)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            textAlign: "center",
            textShadow: "0 2px 30px rgba(0,0,0,0.6), 0 0 60px rgba(0,0,0,0.4)",
            animation: "hero-fade-in 1s cubic-bezier(0.22,1,0.36,1) 0.4s both",
          }}
        >
          The World&apos;s First<br />
          <span style={{ background: "linear-gradient(135deg, #fb923c, #f97316, #ea580c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", textShadow: "none", filter: "drop-shadow(0 0 20px rgba(249,115,22,0.4))" }}>
            Fully-Agentic
          </span><br />
          Production Platform.
        </h1>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURE SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

const FEATURES = [
  {
    badge: "Command Center",
    title: "Your AI-powered mission control.",
    desc: "Manage every project from a single, sleek dashboard. Monitor agent activity, track production pipelines, and launch new projects in seconds.",
    bullets: ["Multi-project management", "Real-time agent network monitoring", "Automated activity logging"],
    image: "/devices/feature-command-center.png",
    alt: "Vid Bolt Command Center — project dashboard with agent network and GPU monitoring",
  },
  {
    badge: "Full Customization",
    title: "Every detail, your way.",
    desc: "From AI model selection to export formats, every setting is fully configurable. Fine-tune voice styles, visual themes, pacing, and more to match your brand perfectly.",
    bullets: ["Custom AI model & voice selection", "Brand-matched visual themes", "Granular export & quality controls"],
    image: "/devices/feature-settings.png",
    alt: "Vid Bolt Settings — fully customizable AI and export preferences",
  },
  {
    badge: "Video Creation",
    title: "From idea to video, automatically.",
    desc: "Enter a topic, and our AI agents handle the rest — researching, scripting, sourcing media, and assembling a complete video, all in one streamlined flow.",
    bullets: ["One-click topic-to-video pipeline", "AI-powered research & scripting", "Automated media sourcing & assembly"],
    image: "/devices/feature-creation.png",
    alt: "Vid Bolt Video Creation — AI-driven topic-to-video pipeline wizard",
  },
  {
    badge: "Video Editor",
    title: "A professional editor, built right in.",
    desc: "Fine-tune every detail with our multi-track timeline editor. AI-generated clips, audio, motion graphics — all on a professional editing canvas with one-click export.",
    bullets: ["Multi-track timeline editing", "AI-assisted clip arrangement", "One-click 1080p+ export"],
    image: "/devices/feature-editor.png",
    alt: "Vid Bolt Video Editor — multi-track timeline with AI-assisted editing tools",
  },
];

function FeatureShowcase() {
  return (
    <section id="features" style={{ padding: "clamp(80px, 12vw, 160px) 0" }}>
      {/* Feature rows */}
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 24px" }}>
        {FEATURES.map((f, i) => {
          const reversed = i % 2 === 1;
          return (
            <div key={f.badge} style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(32px, 6vw, 80px)", alignItems: "center", marginBottom: i < FEATURES.length - 1 ? "clamp(80px, 12vw, 140px)" : "0" }} className="lg:!grid-cols-2">
              {/* Text */}
              <div style={{ order: reversed ? 2 : 1 }} className={reversed ? "reveal-right" : "reveal-left"}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "9999px", border: "1px solid rgba(249,115,22,0.2)", background: "rgba(249,115,22,0.06)", marginBottom: "20px" }}>
                  <Cpu size={13} color="#f97316" />
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#fb923c", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-geist-mono), monospace" }}>{f.badge}</span>
                </div>
                <h3 style={{ fontSize: "clamp(24px, 3.5vw, 42px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "16px" }}>{f.title}</h3>
                <p style={{ fontSize: "16px", color: "#737373", lineHeight: 1.7, maxWidth: "460px", marginBottom: "24px" }}>{f.desc}</p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {f.bullets.map((b) => (
                    <li key={b} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", fontSize: "14px", color: "#d4d4d4" }}>
                      <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(249,115,22,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <ChevronRight size={12} color="#f97316" />
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Laptop mockup */}
              <div style={{ order: reversed ? 1 : 2 }} className="reveal-scale">
                <Image
                  src={f.image}
                  alt={f.alt}
                  width={1024}
                  height={1024}
                  style={{
                    width: "100%",
                    height: "auto",
                    filter: "drop-shadow(0 25px 60px rgba(0,0,0,0.4))",
                    animation: "float-slow 7s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}



/* ═══════════════════════════════════════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════════════════════════════════════ */

const STEPS = [
  { icon: FileText, title: "Outline", desc: "Describe your idea and let AI handle the rest — it plans and structures your content automatically." },
  { icon: Wand2, title: "Script", desc: "AI transforms your outline into a complete, production-ready script tailored to your vision." },
  { icon: Cpu, title: "Production", desc: "All media assets are generated in parallel using high-performance cloud infrastructure." },
  { icon: Film, title: "Editor", desc: "Review and refine your video with a built-in professional editing suite." },
  { icon: Download, title: "Export", desc: "Render in high quality and publish or download — ready to share in one click." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: "clamp(80px, 12vw, 160px) 0", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 0%, rgba(249,115,22,0.02) 50%, transparent 100%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#f97316", marginBottom: "14px", fontFamily: "var(--font-geist-mono), monospace" }}>How It Works</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "16px" }}>
            Five steps. <span style={{ color: "#525252" }}>Zero complexity.</span>
          </h2>
        </div>

        <div className="stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} style={{
                background: "rgba(23,23,23,0.5)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "28px 24px",
                transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)", cursor: "default", position: "relative", overflow: "hidden",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Step number */}
                <div style={{ position: "absolute", top: "16px", right: "16px", fontSize: "48px", fontWeight: 900, color: "rgba(249,115,22,0.04)", lineHeight: 1, fontFamily: "var(--font-geist-mono), monospace" }}>{i + 1}</div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.15)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
                    <Icon size={20} color="#f97316" />
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#404040", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-geist-mono), monospace" }}>Step {i + 1}</span>
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "10px", letterSpacing: "-0.02em" }}>{step.title}</h3>
                <p style={{ fontSize: "15px", color: "#737373", lineHeight: 1.7 }}>{step.desc}</p>

                {/* Progress bar */}
                <div style={{ marginTop: "20px", height: "2px", background: "#1a1a1a", borderRadius: "1px", overflow: "hidden" }}>
                  <div style={{ width: `${((i + 1) / STEPS.length) * 100}%`, height: "100%", background: "linear-gradient(90deg, #f97316, #fb923c)", borderRadius: "1px" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   TRUST / TECHNOLOGY
   ═══════════════════════════════════════════════════════════════════════════ */

const TRUST = [
  { icon: Zap, title: "GPU-Accelerated", desc: "Powered by NVIDIA GPUs for blazing-fast media generation and video rendering." },
  { icon: Bot, title: "Multi-Agent AI", desc: "Specialized AI agents for research, scripting, visuals, audio, editing, and assembly." },
  { icon: Globe, title: "Cloud-Native", desc: "Access from any device, auto-save your work, and collaborate seamlessly." },
  { icon: DollarSign, title: "Extreme Efficiency", desc: "Every 60 minutes of video costs roughly $10 — way below industry standard for AI-generated content." },
];

function TrustSection() {
  return (
    <section id="technology" style={{ padding: "clamp(80px, 12vw, 160px) 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div className="reveal-up" style={{ textAlign: "center", marginBottom: "60px" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#f97316", marginBottom: "14px", fontFamily: "var(--font-geist-mono), monospace" }}>Built Different</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em" }}>
            Enterprise-grade. <span style={{ color: "#525252" }}>Creator-friendly.</span>
          </h2>
        </div>

        <div className="stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          {TRUST.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.title} style={{
                background: "rgba(23,23,23,0.5)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "32px 24px", textAlign: "center",
                transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ width: "56px", height: "56px", margin: "0 auto 20px", borderRadius: "16px", background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={24} color="#f97316" />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "10px", letterSpacing: "-0.02em" }}>{t.title}</h3>
                <p style={{ fontSize: "15px", color: "#737373", lineHeight: 1.7 }}>{t.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════════════════════════════════ */

function CTA() {
  return (
    <section style={{ padding: "clamp(80px, 12vw, 160px) 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: "600px", height: "600px", bottom: "-300px", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.12), transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div className="reveal-up" style={{ position: "relative", maxWidth: "720px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "20px" }}>
          Built for{" "}
          <span style={{ background: "linear-gradient(135deg, #fb923c, #f97316, #ea580c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>serious creators.</span>
        </h2>
        <p style={{ fontSize: "18px", color: "#737373", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 32px" }}>
          Vid Bolt is invite-only. We partner with experienced creators and established channels
          who are ready to scale production through AI. Apply to see if you qualify.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px" }}>
          <a
            href="https://discord.gg/FJGkxFPkKJ"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 36px", background: "transparent", color: "#e5e5e5", fontWeight: 700, fontSize: "16px", borderRadius: "9999px", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", transition: "all 0.3s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#5865F2"; e.currentTarget.style.color = "#5865F2"; e.currentTarget.style.background = "rgba(88,101,242,0.06)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#e5e5e5"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <svg width="20" height="15" viewBox="0 0 71 55" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M60.1 4.9A58.5 58.5 0 0045.4.2a.2.2 0 00-.2.1 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.2 0A37.4 37.4 0 0025.4.3a.2.2 0 00-.2-.1A58.4 58.4 0 0010.5 4.9a.2.2 0 00-.1.1C1.5 18.7-.9 32.2.3 45.5v.2a58.9 58.9 0 0017.7 9a.2.2 0 00.3-.1 42.1 42.1 0 003.6-5.9.2.2 0 00-.1-.3 38.8 38.8 0 01-5.5-2.7.2.2 0 010-.4l1.1-.9a.2.2 0 01.2 0 42 42 0 0035.6 0 .2.2 0 01.2 0l1.1.9a.2.2 0 010 .4 36.4 36.4 0 01-5.5 2.7.2.2 0 00-.1.3 47.3 47.3 0 003.6 5.9.2.2 0 00.3.1A58.7 58.7 0 0070.5 45.7v-.2c1.4-15-2.3-28.4-9.8-40.1a.2.2 0 00-.1-.1h-.5zM23.7 37.3c-3.5 0-6.3-3.2-6.3-7.1s2.8-7.1 6.3-7.1 6.4 3.2 6.3 7.1c0 3.9-2.8 7.1-6.3 7.1zm23.3 0c-3.5 0-6.3-3.2-6.3-7.1s2.8-7.1 6.3-7.1 6.4 3.2 6.3 7.1c0 3.9-2.8 7.1-6.3 7.1z"/></svg>
            Apply to Join
          </a>
          <a
            href="https://studio.vidbolt.app"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 36px", background: "linear-gradient(135deg, #f97316, #ea580c)", color: "#fff", fontWeight: 700, fontSize: "16px", borderRadius: "9999px", textDecoration: "none", boxShadow: "0 8px 30px rgba(249,115,22,0.3)", transition: "all 0.3s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(249,115,22,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(249,115,22,0.3)"; }}
          >
            <ArrowRight size={18} /> Dashboard
          </a>
        </div>
        <p style={{ marginTop: "16px", fontSize: "12px", color: "#404040" }}>Invite-only · Business partnerships · Established channels welcome</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.5)" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <p style={{ fontSize: "12px", color: "#404040" }}>&copy; 2026 Vid Bolt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureShowcase />

        <HowItWorks />

        <TrustSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
