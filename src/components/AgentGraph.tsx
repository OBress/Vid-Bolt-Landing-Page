"use client";

import { useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   AGENT & EDGE DEFINITIONS
   ═══════════════════════════════════════════════════════════════════════════ */

interface AgentNode {
  id: string;
  label: string;
  shortLabel: string;
  /** Normalised position 0-1 (will be scaled to canvas) */
  nx: number;
  ny: number;
  color: string;
  glowColor: string;
}

interface Edge {
  from: string;
  to: string;
}

const AGENTS: AgentNode[] = [
  { id: "orchestrator", label: "Orchestrator", shortLabel: "ORCH", nx: 0.50, ny: 0.42, color: "#f97316", glowColor: "rgba(249,115,22,0.35)" },
  { id: "researcher",   label: "Researcher",   shortLabel: "RES",  nx: 0.18, ny: 0.22, color: "#3b82f6", glowColor: "rgba(59,130,246,0.30)" },
  { id: "scriptwriter", label: "Scriptwriter", shortLabel: "SCR",  nx: 0.82, ny: 0.22, color: "#8b5cf6", glowColor: "rgba(139,92,246,0.30)" },
  { id: "designer",     label: "Designer",     shortLabel: "DES",  nx: 0.15, ny: 0.62, color: "#ec4899", glowColor: "rgba(236,72,153,0.30)" },
  { id: "renderer",     label: "Renderer",     shortLabel: "RND",  nx: 0.85, ny: 0.62, color: "#10b981", glowColor: "rgba(16,185,129,0.30)" },
  { id: "composer",     label: "Composer",     shortLabel: "CMP",  nx: 0.35, ny: 0.82, color: "#06b6d4", glowColor: "rgba(6,182,212,0.30)" },
  { id: "assembler",    label: "Assembler",    shortLabel: "ASM",  nx: 0.65, ny: 0.82, color: "#f59e0b", glowColor: "rgba(245,158,11,0.30)" },
];

const EDGES: Edge[] = [
  { from: "orchestrator", to: "researcher" },
  { from: "orchestrator", to: "scriptwriter" },
  { from: "orchestrator", to: "designer" },
  { from: "orchestrator", to: "renderer" },
  { from: "orchestrator", to: "composer" },
  { from: "orchestrator", to: "assembler" },
  { from: "researcher",   to: "scriptwriter" },
  { from: "scriptwriter", to: "designer" },
  { from: "designer",     to: "renderer" },
  { from: "renderer",     to: "assembler" },
  { from: "composer",     to: "assembler" },
  { from: "designer",     to: "composer" },
  { from: "researcher",   to: "designer" },
  { from: "scriptwriter", to: "renderer" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   CONTEXTUAL MESSAGE POOLS — per-agent and per-edge AI-style log lines
   ═══════════════════════════════════════════════════════════════════════════ */

/** Messages relevant to each agent's role (shown when data arrives at that agent) */
const AGENT_MESSAGES: Record<string, string[]> = {
  orchestrator: [
    "Pipeline status: nominal",
    "Agent sync complete",
    "Task queue updated",
    "Priority re-balanced",
    "Workflow checkpoint ✓",
    "Resource allocation done",
    "Dependency graph resolved",
    "Spawning sub-tasks",
    "Load balancer adjusted",
    "Pipeline stage advanced",
    "Agent heartbeat OK",
    "Scheduling next batch",
    "Bottleneck detected → re-route",
    "Parallel tasks merged",
  ],
  researcher: [
    "Source analysis complete",
    "Topic research done",
    "Trend data collected",
    "Competitor audit finished",
    "Keyword analysis ready",
    "Audience insights pulled",
    "Fact-check passed ✓",
    "Reference clips tagged",
    "SEO brief compiled",
    "Niche data scraped",
    "15 sources ranked",
    "Hook angles identified",
    "Content gap found",
    "Engagement data parsed",
  ],
  scriptwriter: [
    "Script v2 approved",
    "Hook rewritten",
    "Narrative arc locked",
    "Dialogue pass complete",
    "CTA placement optimised",
    "Word count: 1,847",
    "Tone check passed ✓",
    "Pacing review passed",
    "Scene breakdown ready",
    "A/B intro drafted",
    "Script polish done",
    "Voiceover cues added",
    "Shot list finalised",
    "Emotional beats mapped",
  ],
  designer: [
    "Thumbnail generated",
    "Storyboard synced",
    "Visual style locked",
    "Brand kit applied ✓",
    "Lower thirds designed",
    "Colour palette set",
    "Overlay assets ready",
    "Title card rendered",
    "Layout grid finalised",
    "Icon set generated",
    "Typography matched",
    "Mood board approved",
    "Visual hierarchy set",
    "Intro animation drafted",
  ],
  renderer: [
    "Rendering batch 4/12",
    "GPU pipeline ready",
    "Frame batch encoded",
    "Resolution: 1080p ✓",
    "Motion GFX queued",
    "Colour grading applied",
    "Transition fx ready",
    "Scene 7 composited",
    "Key-frames extracted",
    "Render farm allocated",
    "Anti-alias pass done",
    "Bitrate optimised",
    "Preview render ready",
    "Effects layer merged",
  ],
  composer: [
    "Audio mix complete",
    "Voice-over encoded",
    "SFX library matched",
    "Background track set",
    "Audio levels normalised",
    "Beat sync aligned ✓",
    "Ducking applied",
    "Silence trimmed",
    "Audio peaks smoothed",
    "Stereo mix balanced",
    "Music cue placed",
    "Crossfade applied",
    "Noise reduction done",
    "Audio timeline synced",
  ],
  assembler: [
    "Timeline assembled",
    "Captions generated",
    "B-roll matched",
    "Assets compressed",
    "Export queue updated",
    "Clip trim complete",
    "Final QC passed ✓",
    "Watermark applied",
    "Chapters marked",
    "Metadata injected",
    "File size: 248 MB",
    "Format: MP4/H.265",
    "Upload ready",
    "Delivery package sealed",
  ],
};

/** Edge-specific messages for particular from→to pairs (optional overrides) */
const EDGE_MESSAGES: Record<string, string[]> = {
  "orchestrator→researcher":  ["New research task assigned", "Topic brief sent", "Priority: high"],
  "orchestrator→scriptwriter": ["Writing task dispatched", "Brief attached", "Deadline updated"],
  "orchestrator→designer":    ["Design sprint started", "Asset specs sent", "Style guide attached"],
  "orchestrator→renderer":    ["Render job queued", "GPU slots reserved", "Quality: ultra"],
  "orchestrator→composer":    ["Audio task created", "Tempo hint: upbeat", "Mix profile sent"],
  "orchestrator→assembler":   ["Assembly triggered", "All deps ready ✓", "Output spec locked"],
  "researcher→scriptwriter":  ["Research packet delivered", "Key facts highlighted", "Sources cited"],
  "researcher→designer":      ["Visual refs attached", "Brand examples sent", "Audience data shared"],
  "scriptwriter→designer":    ["Scene descriptions sent", "Visual cues noted", "Mood: energetic"],
  "scriptwriter→renderer":    ["Shot list delivered", "Timing cues synced", "Transitions noted"],
  "designer→renderer":        ["Assets uploaded", "Layer files ready", "Render specs attached"],
  "designer→composer":        ["Visual timeline shared", "Beat markers needed", "Mood board synced"],
  "renderer→assembler":       ["Rendered clips ready", "Batch 12/12 done ✓", "Preview approved"],
  "composer→assembler":       ["Audio tracks delivered", "Mix finalised", "Sync markers set"],
};

function pickMessage(fromId: string, toId: string): string {
  const edgeKey = `${fromId}→${toId}`;
  const edgeMsgs = EDGE_MESSAGES[edgeKey];

  // 40% chance to use edge-specific message if available, else use agent pool
  if (edgeMsgs && Math.random() < 0.4) {
    return edgeMsgs[Math.floor(Math.random() * edgeMsgs.length)];
  }

  const agentMsgs = AGENT_MESSAGES[toId];
  if (agentMsgs) {
    return agentMsgs[Math.floor(Math.random() * agentMsgs.length)];
  }
  return "Processing…";
}

/* ═══════════════════════════════════════════════════════════════════════════
   PARTICLE SYSTEM
   ═══════════════════════════════════════════════════════════════════════════ */

interface Particle {
  fromIdx: number;
  toIdx: number;
  progress: number;    // 0→1
  speed: number;
  message: string;
  color: string;
  trail: { x: number; y: number }[];
}

interface MessageBubble {
  nodeId: string;
  x: number;
  y: number;
  text: string;
  opacity: number;
  life: number;
  color: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function AgentGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef({
    particles: [] as Particle[],
    bubbles: [] as MessageBubble[],
    lastSpawn: 0,
    nodePhases: AGENTS.map(() => Math.random() * Math.PI * 2), // breathing phase offsets
    time: 0,
  });

  /* ── helper: get canvas-space coords for an agent ─────────────────────── */
  const agentPos = useCallback(
    (agent: AgentNode, w: number, h: number) => {
      const padX = 70;
      const padY = 50;
      return {
        x: padX + agent.nx * (w - padX * 2),
        y: padY + agent.ny * (h - padY * 2),
      };
    },
    []
  );

  /* ── spawn a new particle ─────────────────────────────────────────────── */
  const spawnParticle = useCallback(() => {
    const edgeIdx = Math.floor(Math.random() * EDGES.length);
    const edge = EDGES[edgeIdx];
    const fromAgentIdx = AGENTS.findIndex((a) => a.id === edge.from);
    const toAgentIdx = AGENTS.findIndex((a) => a.id === edge.to);
    const toAgent = AGENTS[toAgentIdx];

    return {
      fromIdx: fromAgentIdx,
      toIdx: toAgentIdx,
      progress: 0,
      speed: 0.003 + Math.random() * 0.007,
      message: pickMessage(edge.from, edge.to),
      color: toAgent.color,
      trail: [],
    } as Particle;
  }, []);

  /* ── main animation loop ──────────────────────────────────────────────── */
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Resize if needed
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const state = stateRef.current;
    state.time += 1;

    /* ── clear ─────────────────────────────────────────────────────────── */
    ctx.clearRect(0, 0, w, h);

    /* ── draw edges ────────────────────────────────────────────────────── */
    for (const edge of EDGES) {
      const from = AGENTS.find((a) => a.id === edge.from)!;
      const to = AGENTS.find((a) => a.id === edge.to)!;
      const p1 = agentPos(from, w, h);
      const p2 = agentPos(to, w, h);

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);

      // Slight curve
      const mx = (p1.x + p2.x) / 2;
      const my = (p1.y + p2.y) / 2;
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const cx = mx - dy * 0.08;
      const cy = my + dx * 0.08;

      ctx.quadraticCurveTo(cx, cy, p2.x, p2.y);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Animated dashes
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.quadraticCurveTo(cx, cy, p2.x, p2.y);
      ctx.setLineDash([4, 8]);
      ctx.lineDashOffset = -(state.time * 0.3);
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
    }

    /* ── spawn particles (staggered, one at a time) ─────────────────────── */
    if (state.time - state.lastSpawn > 50 + Math.random() * 70) {
      state.particles.push(spawnParticle());
      state.lastSpawn = state.time;
    }

    /* ── update & draw particles ───────────────────────────────────────── */
    const aliveParticles: Particle[] = [];
    for (const p of state.particles) {
      p.progress += p.speed;
      if (p.progress >= 1) {
        // Arrived → create / replace bubble at destination node
        const toAgent = AGENTS[p.toIdx];
        const pos = agentPos(toAgent, w, h);

        // Remove any existing bubble on this node so text doesn't stack
        state.bubbles = state.bubbles.filter(b => b.nodeId !== toAgent.id);

        state.bubbles.push({
          nodeId: toAgent.id,
          x: pos.x,
          y: pos.y - 30,
          text: p.message,
          opacity: 1,
          life: 120,
          color: toAgent.color,
        });
        continue;
      }
      aliveParticles.push(p);

      // Interpolate along curve
      const fromAgent = AGENTS[p.fromIdx];
      const toAgent = AGENTS[p.toIdx];
      const p1 = agentPos(fromAgent, w, h);
      const p2 = agentPos(toAgent, w, h);
      const mx = (p1.x + p2.x) / 2;
      const my = (p1.y + p2.y) / 2;
      const dx2 = p2.x - p1.x;
      const dy2 = p2.y - p1.y;
      const cx = mx - dy2 * 0.08;
      const cy = my + dx2 * 0.08;

      const t = p.progress;
      const it = 1 - t;
      const px = it * it * p1.x + 2 * it * t * cx + t * t * p2.x;
      const py = it * it * p1.y + 2 * it * t * cy + t * t * p2.y;

      // Store trail
      p.trail.push({ x: px, y: py });
      if (p.trail.length > 12) p.trail.shift();

      // Draw trail
      for (let i = 0; i < p.trail.length; i++) {
        const alpha = (i / p.trail.length) * 0.5;
        const radius = 1 + (i / p.trail.length) * 2;
        ctx.beginPath();
        ctx.arc(p.trail[i].x, p.trail[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      }

      // Draw main particle glow
      const grad = ctx.createRadialGradient(px, py, 0, px, py, 8);
      grad.addColorStop(0, p.color + "cc");
      grad.addColorStop(0.5, p.color + "44");
      grad.addColorStop(1, p.color + "00");
      ctx.beginPath();
      ctx.arc(px, py, 8, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
    }
    state.particles = aliveParticles;

    /* ── draw nodes ────────────────────────────────────────────────────── */
    for (let i = 0; i < AGENTS.length; i++) {
      const agent = AGENTS[i];
      const pos = agentPos(agent, w, h);
      const breathe = Math.sin(state.time * 0.025 + state.nodePhases[i]) * 0.1 + 1;
      const baseRadius = agent.id === "orchestrator" ? 28 : 22;
      const r = baseRadius * breathe;

      // Outer glow
      const glowGrad = ctx.createRadialGradient(pos.x, pos.y, r * 0.5, pos.x, pos.y, r * 2.5);
      glowGrad.addColorStop(0, agent.glowColor);
      glowGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Ring
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
      ctx.strokeStyle = agent.color + "66";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Filled circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, r - 2, 0, Math.PI * 2);
      const bgGrad = ctx.createRadialGradient(pos.x, pos.y - r * 0.3, 0, pos.x, pos.y, r);
      bgGrad.addColorStop(0, "rgba(30,30,30,0.9)");
      bgGrad.addColorStop(1, "rgba(15,15,15,0.95)");
      ctx.fillStyle = bgGrad;
      ctx.fill();

      // Inner icon dot
      ctx.beginPath();
      ctx.arc(pos.x, pos.y - 3, 4, 0, Math.PI * 2);
      ctx.fillStyle = agent.color;
      ctx.fill();

      // Short label
      ctx.font = "bold 7px 'Geist Mono', 'SF Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = agent.color;
      ctx.fillText(agent.shortLabel, pos.x, pos.y + 8);

      // Full label below
      ctx.font = "600 10px 'Inter', 'Geist Sans', sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillText(agent.label, pos.x, pos.y + r + 14);

      // Pulsing ring for orchestrator
      if (agent.id === "orchestrator") {
        const pulseR = r + 6 + Math.sin(state.time * 0.04) * 4;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pulseR, 0, Math.PI * 2);
        ctx.strokeStyle = agent.color + "22";
        ctx.lineWidth = 1;
        ctx.stroke();

        const pulseR2 = r + 14 + Math.sin(state.time * 0.03 + 1) * 5;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pulseR2, 0, Math.PI * 2);
        ctx.strokeStyle = agent.color + "11";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    /* ── draw message bubbles ──────────────────────────────────────────── */
    const aliveBubbles: MessageBubble[] = [];
    for (const b of state.bubbles) {
      b.life -= 1;
      b.y -= 0.15;
      if (b.life <= 0) continue;
      b.opacity = Math.min(1, b.life / 30);
      aliveBubbles.push(b);

      const textMetrics = ctx.measureText(b.text);
      ctx.font = "500 9px 'Geist Mono', 'SF Mono', monospace";
      const tw = ctx.measureText(b.text).width;
      const bw = tw + 16;
      const bh = 20;
      const bx = b.x - bw / 2;
      const by = b.y - bh / 2;

      // Background pill
      ctx.globalAlpha = b.opacity * 0.85;
      ctx.beginPath();
      const pillR = 6;
      ctx.moveTo(bx + pillR, by);
      ctx.lineTo(bx + bw - pillR, by);
      ctx.arcTo(bx + bw, by, bx + bw, by + pillR, pillR);
      ctx.lineTo(bx + bw, by + bh - pillR);
      ctx.arcTo(bx + bw, by + bh, bx + bw - pillR, by + bh, pillR);
      ctx.lineTo(bx + pillR, by + bh);
      ctx.arcTo(bx, by + bh, bx, by + bh - pillR, pillR);
      ctx.lineTo(bx, by + pillR);
      ctx.arcTo(bx, by, bx + pillR, by, pillR);
      ctx.closePath();
      ctx.fillStyle = "rgba(20,20,20,0.92)";
      ctx.fill();
      ctx.strokeStyle = b.color + "44";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Text
      ctx.fillStyle = b.color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(b.text, b.x, b.y);
      ctx.globalAlpha = 1;
    }
    state.bubbles = aliveBubbles;

    /* ── HUD scan lines (very subtle) ──────────────────────────────────── */
    const scanY = (state.time * 0.5) % h;
    const scanGrad = ctx.createLinearGradient(0, scanY - 1, 0, scanY + 1);
    scanGrad.addColorStop(0, "rgba(249,115,22,0)");
    scanGrad.addColorStop(0.5, "rgba(249,115,22,0.015)");
    scanGrad.addColorStop(1, "rgba(249,115,22,0)");
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, scanY - 1, w, 2);

    /* ── schedule next frame ───────────────────────────────────────────── */
    animRef.current = requestAnimationFrame(animate);
  }, [agentPos, spawnParticle]);

  /* ── lifecycle ────────────────────────────────────────────────────────── */
  useEffect(() => {
    // Seed initial particles
    const state = stateRef.current;
    for (let i = 0; i < 6; i++) {
      const p = spawnParticle();
      p.progress = Math.random() * 0.8;
      state.particles.push(p);
    }

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate, spawnParticle]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        borderRadius: "16px",
      }}
    />
  );
}
