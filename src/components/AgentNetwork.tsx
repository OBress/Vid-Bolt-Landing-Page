"use client";

import { useEffect, useRef, useState } from "react";

/* ─── agent definitions ─── */
const AGENTS_SMALL = [
  { id: "researcher",   label: "Researcher",   color: "#3b82f6", x: 0.18, y: 0.22 },
  { id: "scriptwriter", label: "Scriptwriter",  color: "#a855f7", x: 0.82, y: 0.18 },
  { id: "orchestrator", label: "Orchestrator",  color: "#f97316", x: 0.50, y: 0.38, isCenter: true },
  { id: "designer",     label: "Designer",      color: "#ef4444", x: 0.15, y: 0.68 },
  { id: "composer",     label: "Composer",      color: "#3b82f6", x: 0.38, y: 0.82 },
  { id: "assembler",    label: "Assembler",     color: "#eab308", x: 0.62, y: 0.80 },
  { id: "renderer",     label: "Renderer",      color: "#a855f7", x: 0.85, y: 0.65 },
];

const AGENTS_FULL = [
  { id: "researcher",   label: "Researcher",    color: "#3b82f6", x: 0.08, y: 0.12 },
  { id: "scriptwriter", label: "Scriptwriter",   color: "#a855f7", x: 0.92, y: 0.10 },
  { id: "orchestrator", label: "Orchestrator",   color: "#f97316", x: 0.50, y: 0.12, isCenter: true },
  { id: "designer",     label: "Designer",       color: "#ef4444", x: 0.04, y: 0.50 },
  { id: "composer",     label: "Composer",       color: "#3b82f6", x: 0.22, y: 0.85 },
  { id: "assembler",    label: "Assembler",      color: "#eab308", x: 0.60, y: 0.88 },
  { id: "renderer",     label: "Renderer",       color: "#a855f7", x: 0.96, y: 0.52 },
  { id: "voice",        label: "Voice Synth",    color: "#06b6d4", x: 0.78, y: 0.15 },
  { id: "qa",           label: "QA Checker",     color: "#10b981", x: 0.15, y: 0.28 },
  { id: "captioner",    label: "Captioner",      color: "#ec4899", x: 0.08, y: 0.82 },
  { id: "colorist",     label: "Colorist",       color: "#f59e0b", x: 0.90, y: 0.82 },
  { id: "publisher",    label: "Publisher",       color: "#6366f1", x: 0.42, y: 0.92 },
];

const LINKS_SMALL: [string, string][] = [
  ["orchestrator", "researcher"],
  ["orchestrator", "scriptwriter"],
  ["orchestrator", "designer"],
  ["orchestrator", "composer"],
  ["orchestrator", "assembler"],
  ["orchestrator", "renderer"],
  ["researcher", "scriptwriter"],
  ["researcher", "designer"],
  ["scriptwriter", "composer"],
  ["designer", "composer"],
  ["designer", "assembler"],
  ["composer", "assembler"],
  ["assembler", "renderer"],
  ["renderer", "scriptwriter"],
];

const LINKS_FULL: [string, string][] = [
  // orchestrator hub
  ["orchestrator", "researcher"],
  ["orchestrator", "scriptwriter"],
  ["orchestrator", "designer"],
  ["orchestrator", "composer"],
  ["orchestrator", "assembler"],
  ["orchestrator", "renderer"],
  ["orchestrator", "voice"],
  ["orchestrator", "qa"],
  // original cross-links
  ["researcher", "scriptwriter"],
  ["researcher", "designer"],
  ["researcher", "qa"],
  ["scriptwriter", "composer"],
  ["scriptwriter", "voice"],
  ["designer", "composer"],
  ["designer", "assembler"],
  ["designer", "colorist"],
  ["composer", "assembler"],
  ["assembler", "renderer"],
  ["renderer", "scriptwriter"],
  ["renderer", "colorist"],
  // new agent links
  ["voice", "composer"],
  ["qa", "assembler"],
  ["qa", "renderer"],
  ["captioner", "composer"],
  ["captioner", "publisher"],
  ["colorist", "assembler"],
  ["publisher", "renderer"],
  ["publisher", "assembler"],
];

const STATUS_MESSAGES = [
  // Researcher
  { text: "Source analysis complete",  agentId: "researcher",   color: "#3b82f6" },
  { text: "Topic research done",      agentId: "researcher",   color: "#3b82f6" },
  { text: "Trend data collected",     agentId: "researcher",   color: "#3b82f6" },
  { text: "15 sources ranked",        agentId: "researcher",   color: "#3b82f6" },
  // Scriptwriter
  { text: "Script v2 finalised",      agentId: "scriptwriter", color: "#a855f7" },
  { text: "Hook rewritten",           agentId: "scriptwriter", color: "#a855f7" },
  { text: "Narrative arc locked",     agentId: "scriptwriter", color: "#a855f7" },
  { text: "Shot list ready",          agentId: "scriptwriter", color: "#a855f7" },
  // Designer
  { text: "Thumbnail generated",      agentId: "designer",     color: "#ef4444" },
  { text: "Storyboard synced",        agentId: "designer",     color: "#ef4444" },
  { text: "Brand kit applied ✓",      agentId: "designer",     color: "#ef4444" },
  { text: "Lower thirds designed",    agentId: "designer",     color: "#ef4444" },
  // Composer
  { text: "Audio mix complete",       agentId: "composer",     color: "#3b82f6" },
  { text: "Beat sync aligned ✓",      agentId: "composer",     color: "#3b82f6" },
  { text: "SFX library matched",      agentId: "composer",     color: "#3b82f6" },
  // Assembler
  { text: "Timeline assembled",       agentId: "assembler",    color: "#eab308" },
  { text: "Captions generated",       agentId: "assembler",    color: "#eab308" },
  { text: "Final QC passed ✓",        agentId: "assembler",    color: "#eab308" },
  { text: "Export queue updated",     agentId: "assembler",    color: "#eab308" },
  // Renderer
  { text: "Rendering batch 8/12",     agentId: "renderer",     color: "#a855f7" },
  { text: "GPU pipeline ready",       agentId: "renderer",     color: "#a855f7" },
  { text: "Resolution: 1080p ✓",      agentId: "renderer",     color: "#a855f7" },
  { text: "Colour grading applied",   agentId: "renderer",     color: "#a855f7" },
  // Voice Synth
  { text: "Voice-over rendered",      agentId: "voice",        color: "#06b6d4" },
  { text: "Tone calibrated",          agentId: "voice",        color: "#06b6d4" },
  // QA Checker
  { text: "QA pass ✓",               agentId: "qa",           color: "#10b981" },
  { text: "Pacing review passed",     agentId: "qa",           color: "#10b981" },
  // Captioner
  { text: "Captions synced",          agentId: "captioner",    color: "#ec4899" },
  { text: "Subtitle timing set",      agentId: "captioner",    color: "#ec4899" },
  // Colorist
  { text: "Color grade applied",      agentId: "colorist",     color: "#f59e0b" },
  { text: "LUT matched",              agentId: "colorist",     color: "#f59e0b" },
  // Publisher
  { text: "Published to CDN",         agentId: "publisher",    color: "#6366f1" },
  { text: "Metadata injected",        agentId: "publisher",    color: "#6366f1" },
];

/* ─── animated data pulse on links ─── */
function DataPulse({ x1, y1, x2, y2, delay, color }: { x1: number; y1: number; x2: number; y2: number; delay: number; color: string }) {
  return (
    <circle r="2.5" fill={color} opacity="0.9">
      <animateMotion
        dur={`${2.5 + Math.random() * 1.5}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
        path={`M${x1},${y1} L${x2},${y2}`}
      />
      <animate attributeName="opacity" values="0;0.9;0.9;0" dur={`${2.5 + Math.random() * 1.5}s`} begin={`${delay}s`} repeatCount="indefinite" />
    </circle>
  );
}

/* ─── floating status pill ─── */
function StatusPill({ text, color, style }: { text: string; color: string; style: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        padding: "4px 10px",
        borderRadius: "6px",
        background: "rgba(0,0,0,0.7)",
        border: `1px solid ${color}40`,
        fontSize: "10px",
        fontWeight: 600,
        color,
        whiteSpace: "nowrap",
        fontFamily: "var(--font-geist-mono), monospace",
        letterSpacing: "0.02em",
        pointerEvents: "none",
        ...style,
      }}
    >
      {text}
    </div>
  );
}

/* ─── main component ─── */
export default function AgentNetwork({ fullPage = false }: { fullPage?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 500 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  // Each slot cycles independently with its own timer
  const [slot0, setSlot0] = useState(0);
  const [slot1, setSlot1] = useState(Math.floor(STATUS_MESSAGES.length / 3));
  const [slot2, setSlot2] = useState(Math.floor((STATUS_MESSAGES.length * 2) / 3));

  const AGENTS = fullPage ? AGENTS_FULL : AGENTS_SMALL;
  const LINKS = fullPage ? LINKS_FULL : LINKS_SMALL;

  /* responsive size */
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDims({ w: rect.width, h: rect.height });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* cycle status messages — each slot has its OWN independent timer */
  useEffect(() => {
    const t0 = setInterval(() => {
      setSlot0((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 2500);
    return () => clearInterval(t0);
  }, []);

  useEffect(() => {
    const t1 = setInterval(() => {
      setSlot1((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 3800);
    return () => clearInterval(t1);
  }, []);

  useEffect(() => {
    const t2 = setInterval(() => {
      setSlot2((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 4500);
    return () => clearInterval(t2);
  }, []);

  const visibleStatuses = [slot0, slot1, slot2];

  const isNarrow = dims.w < 500;
  const pad = fullPage
    ? { x: isNarrow ? 10 : 60, y: isNarrow ? 20 : 60 }
    : { x: isNarrow ? 12 : 40, y: isNarrow ? 16 : 30 };
  const getPos = (a: typeof AGENTS[0]) => ({
    x: pad.x + a.x * (dims.w - pad.x * 2),
    y: pad.y + a.y * (dims.h - pad.y * 2),
  });

  const agentMap = Object.fromEntries(AGENTS.map((a) => [a.id, a]));

  /* ─── full-page mode ─── */
  if (fullPage) {
    return (
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* SVG graph */}
        <svg
          width={dims.w}
          height={dims.h}
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          {/* Links */}
          {LINKS.map(([from, to], i) => {
            const a = getPos(agentMap[from]);
            const b = getPos(agentMap[to]);
            return (
              <g key={`link-${i}`}>
                <line
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="rgba(255,255,255,0.09)"
                  strokeWidth="1"
                />
                <DataPulse
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  delay={i * 0.04}
                  color={agentMap[from].color}
                />
              </g>
            );
          })}

          {/* Agent nodes */}
          {AGENTS.map((agent) => {
            const pos = getPos(agent);
            const r = isNarrow ? (agent.isCenter ? 18 : 14) : (agent.isCenter ? 24 : 18);
            const isHovered = hoveredNode === agent.id;
            return (
              <g
                key={agent.id}
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px) scale(${isHovered ? 1.25 : 1})`,
                  transformOrigin: '0 0',
                  transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                }}
                onMouseEnter={() => setHoveredNode(agent.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Highlight glow on hover */}
                {isHovered && (
                  <circle
                    cx={0} cy={0} r={r + 18}
                    fill={`${agent.color}12`}
                    stroke={agent.color}
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                )}

                {/* Outer glow */}
                <circle
                  cx={0} cy={0} r={r + 8}
                  fill="none"
                  stroke={agent.color}
                  strokeWidth="1"
                  opacity={isHovered ? 0.45 : 0.2}
                >
                  <animate
                    attributeName="r"
                    values={`${r + 6};${r + 14};${r + 6}`}
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values={isHovered ? "0.45;0.25;0.45" : "0.2;0.08;0.2"}
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Bg circle */}
                <circle
                  cx={0} cy={0} r={r}
                  fill={isHovered ? `${agent.color}30` : `${agent.color}10`}
                  stroke={agent.color}
                  strokeWidth={isHovered ? 2.5 : (agent.isCenter ? 2 : 1.5)}
                  opacity={isHovered ? 1 : 0.9}
                />

                {/* Inner icon circle */}
                <circle
                  cx={0} cy={0} r={r * 0.55}
                  fill={isHovered ? `${agent.color}45` : `${agent.color}25`}
                />

                {/* Bot icon */}
                <text
                  x={0} y={1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={agent.isCenter ? 14 : 11}
                  fill={agent.color}
                  fontFamily="var(--font-geist-mono), monospace"
                  fontWeight="bold"
                >
                  {agent.isCenter ? "◉" : "●"}
                </text>

                {/* Status dot */}
                <circle cx={r * 0.7} cy={-r * 0.7} r="3" fill="#22c55e">
                  <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Label */}
                <text
                  x={0}
                  y={r + 14}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="600"
                  fill={isHovered ? '#e5e5e5' : '#737373'}
                  fontFamily="var(--font-geist-mono), monospace"
                  letterSpacing="0.02em"
                >
                  {agent.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Status pills — hidden on very narrow screens to prevent clipping */}
        {!isNarrow && visibleStatuses.map((idx, i) => {
          const msg = STATUS_MESSAGES[idx];
          const agent = agentMap[msg.agentId];
          if (!agent) return null;
          const pos = getPos(agent);
          const offsets = [
            { x: -80, y: -45 },
            { x: 40, y: -35 },
            { x: -20, y: 30 },
          ];
          return (
            <StatusPill
              key={`status-${i}`}
              text={msg.text}
              color={msg.color}
              style={{
                left: `${((pos.x + offsets[i].x) / dims.w) * 100}%`,
                top: `${((pos.y + offsets[i].y) / dims.h) * 100}%`,
                transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
                animation: `hero-fade-in 0.5s cubic-bezier(0.22,1,0.36,1) both`,
              }}
            />
          );
        })}

        {/* Radial vignette overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.15) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }

  /* ─── boxed mode (original) ─── */
  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 10",
        maxHeight: "520px",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(10,10,10,0.8)",
        backdropFilter: "blur(20px)",
        overflow: "hidden",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 20px",
          zIndex: 2,
          fontFamily: "var(--font-geist-mono), monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 8px rgba(34,197,94,0.6)",
              animation: "glow-pulse 2s ease-in-out infinite",
            }}
          />
          <span style={{ fontSize: "10px", fontWeight: 700, color: "#737373", textTransform: "uppercase", letterSpacing: "0.15em" }}>
            Agent Network — Live
          </span>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          {["7 Agents", "14 Links", "DAG"].map((s) => (
            <span key={s} style={{ fontSize: "10px", fontWeight: 700, color: "#404040", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* SVG graph */}
      <svg
        width={dims.w}
        height={dims.h}
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {/* Links */}
        {LINKS.map(([from, to], i) => {
          const a = getPos(agentMap[from]);
          const b = getPos(agentMap[to]);
          return (
            <g key={`link-${i}`}>
              <line
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
              <DataPulse
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                delay={i * 0.4}
                color={agentMap[from].color}
              />
            </g>
          );
        })}

        {/* Agent nodes */}
        {AGENTS.map((agent) => {
          const pos = getPos(agent);
          const r = agent.isCenter ? 28 : 22;
          return (
            <g key={agent.id}>
              {/* Outer glow */}
              <circle
                cx={pos.x} cy={pos.y} r={r + 8}
                fill="none"
                stroke={agent.color}
                strokeWidth="1"
                opacity="0.15"
              >
                <animate
                  attributeName="r"
                  values={`${r + 6};${r + 14};${r + 6}`}
                  dur="3s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.15;0.05;0.15"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Bg circle */}
              <circle
                cx={pos.x} cy={pos.y} r={r}
                fill={`${agent.color}15`}
                stroke={agent.color}
                strokeWidth={agent.isCenter ? 2 : 1.5}
                opacity="0.8"
              />

              {/* Inner icon circle */}
              <circle
                cx={pos.x} cy={pos.y} r={r * 0.55}
                fill={`${agent.color}30`}
              />

              {/* Bot icon (simplified) */}
              <text
                x={pos.x} y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={agent.isCenter ? 16 : 13}
                fill={agent.color}
                fontFamily="var(--font-geist-mono), monospace"
                fontWeight="bold"
              >
                {agent.isCenter ? "◉" : "●"}
              </text>

              {/* Status dot */}
              <circle cx={pos.x + r * 0.7} cy={pos.y - r * 0.7} r="4" fill="#22c55e">
                <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Label */}
                <text
                  x={pos.x}
                  y={pos.y + r + (isNarrow ? 10 : 14)}
                  textAnchor="middle"
                  fontSize={isNarrow ? "9" : "9"}
                  fontWeight="600"
                  fill="#737373"
                  fontFamily="var(--font-geist-mono), monospace"
                  letterSpacing="0.02em"
              >
                {agent.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Status pills */}
      {visibleStatuses.map((idx, i) => {
        const msg = STATUS_MESSAGES[idx];
        const agent = agentMap[msg.agentId];
        const pos = getPos(agent);
        const offsets = [
          { x: -80, y: -45 },
          { x: 40, y: -35 },
          { x: -20, y: 30 },
        ];
        return (
          <StatusPill
            key={`status-${i}`}
            text={msg.text}
            color={msg.color}
            style={{
              left: `${((pos.x + offsets[i].x) / dims.w) * 100}%`,
              top: `${((pos.y + offsets[i].y) / dims.h) * 100}%`,
              transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
              animation: `hero-fade-in 0.5s cubic-bezier(0.22,1,0.36,1) both`,
            }}
          />
        );
      })}
    </div>
  );
}
