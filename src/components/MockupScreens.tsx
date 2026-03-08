"use client";

/**
 * Static reproductions of VidBolt's real UI screens.
 * These are rendered as actual HTML/CSS inside 3D laptop mockup frames.
 * Based directly on the VidBolt web app source code styling.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Video Editor Reproduction
// ─────────────────────────────────────────────────────────────────────────────
export function VideoEditorMockup() {
  const tracks = [
    { label: "V1", clips: [{ name: "Intro.mp4", color: "#f97316", w: "28%" }, { name: "B-Roll_City.mp4", color: "#f97316", w: "35%" }, { name: "Interview.mp4", color: "#ea580c", w: "22%" }] },
    { label: "V2", clips: [{ name: "Overlay.png", color: "#3b82f6", w: "15%", ml: "20%" }, { name: "Logo_Anim.mp4", color: "#6366f1", w: "12%", ml: "8%" }] },
    { label: "A1", clips: [{ name: "Narration.wav", color: "#22c55e", w: "88%" }], wave: true },
    { label: "A2", clips: [{ name: "BGM_Track.mp3", color: "#10b981", w: "92%" }], wave: true },
    { label: "T1", clips: [{ name: "Title: AI Revolution", color: "#a855f7", w: "30%" }, { name: "Subtitle: Chapter 2", color: "#8b5cf6", w: "25%", ml: "5%" }] },
  ];

  return (
    <div style={{ background: "#000", borderRadius: "6px", overflow: "hidden", fontSize: "10px", fontFamily: "var(--font-geist-mono), monospace", color: "#a3a3a3", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px", background: "#0a0a0a", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ display: "flex", gap: "6px" }}>
          {["Project", "File", "Edit", "View"].map((m) => (
            <span key={m} style={{ color: "#737373", fontSize: "9px" }}>{m}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <span style={{ background: "#f97316", color: "#fff", padding: "2px 8px", borderRadius: "4px", fontSize: "8px", fontWeight: 700 }}>Export</span>
          <span style={{ background: "#262626", color: "#a3a3a3", padding: "2px 8px", borderRadius: "4px", fontSize: "8px" }}>Render</span>
        </div>
      </div>

      {/* Main area */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Media Library */}
        <div style={{ width: "20%", borderRight: "1px solid #1a1a1a", padding: "6px" }}>
          <div style={{ fontSize: "8px", color: "#737373", marginBottom: "6px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Media Library</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ aspectRatio: "16/10", background: `hsl(${i * 40 + 20}, 30%, ${15 + i * 3}%)`, borderRadius: "3px", border: "1px solid #262626" }} />
            ))}
          </div>
        </div>

        {/* Preview */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, background: "linear-gradient(135deg, #0c1220, #0a0f1a, #0d1525)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ width: "70%", aspectRatio: "16/9", background: "linear-gradient(145deg, #1a1a2e, #16213e)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #1e293b" }}>
              <div style={{ width: "0", height: "0", borderLeft: "14px solid #f97316", borderTop: "9px solid transparent", borderBottom: "9px solid transparent", opacity: 0.8 }} />
            </div>
          </div>
          {/* Transport controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "4px 8px", background: "#0a0a0a", borderTop: "1px solid #1a1a1a" }}>
            <span style={{ fontSize: "8px", color: "#525252" }}>00:00:00</span>
            {["⏮", "◀", "▶", "⏸", "⏭"].map((c, i) => (
              <span key={i} style={{ color: i === 2 ? "#f97316" : "#525252", fontSize: "10px", cursor: "pointer" }}>{c}</span>
            ))}
            <span style={{ fontSize: "8px", color: "#525252" }}>00:02:45</span>
          </div>
        </div>

        {/* AI Panel */}
        <div style={{ width: "18%", borderLeft: "1px solid #1a1a1a", padding: "6px" }}>
          <div style={{ fontSize: "8px", color: "#737373", marginBottom: "6px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>AI Tools</div>
          {["Generate Voiceover", "Text to Video", "Style Transfer", "Auto-Cut"].map((tool) => (
            <div key={tool} style={{ padding: "4px 6px", background: "#111", border: "1px solid #1f1f1f", borderRadius: "4px", marginBottom: "3px", fontSize: "8px", color: "#737373" }}>
              {tool}
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ borderTop: "1px solid #262626", background: "#0a0a0a" }}>
        {/* Timecode ruler */}
        <div style={{ display: "flex", alignItems: "center", padding: "2px 8px 2px 40px", borderBottom: "1px solid #1a1a1a" }}>
          {["00:00", "00:30", "01:00", "01:30", "02:00", "02:30"].map((t) => (
            <span key={t} style={{ flex: 1, fontSize: "7px", color: "#404040" }}>{t}</span>
          ))}
          {/* Playhead */}
          <div style={{ position: "absolute", left: "42%", width: "1px", background: "#f97316", height: "100%", zIndex: 5 }}>
            <div style={{ width: "8px", height: "6px", background: "#f97316", position: "absolute", top: 0, left: "-3.5px", borderRadius: "0 0 2px 2px" }} />
          </div>
        </div>
        {/* Tracks */}
        {tracks.map((track) => (
          <div key={track.label} style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #111", height: "22px" }}>
            <div style={{ width: "36px", textAlign: "center", fontSize: "8px", color: "#525252", fontWeight: 600, flexShrink: 0 }}>
              {track.label}
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", position: "relative", height: "100%", padding: "2px 0" }}>
              {track.clips.map((clip, i) => (
                <div key={i} style={{
                  width: clip.w,
                  marginLeft: (clip as { ml?: string }).ml || "2px",
                  height: "16px",
                  background: track.wave
                    ? `linear-gradient(0deg, ${clip.color}22, ${clip.color}44)`
                    : `linear-gradient(135deg, ${clip.color}cc, ${clip.color}99)`,
                  borderRadius: "3px",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 4px",
                  fontSize: "7px",
                  color: track.wave ? clip.color : "#fff",
                  fontWeight: 600,
                  overflow: "hidden",
                  whiteSpace: "nowrap" as const,
                  border: `1px solid ${clip.color}44`,
                  position: "relative" as const,
                }}>
                  {track.wave && (
                    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }} viewBox="0 0 200 20" preserveAspectRatio="none">
                      <path d="M0,10 Q10,2 20,10 Q30,18 40,10 Q50,3 60,10 Q70,17 80,10 Q90,4 100,10 Q110,16 120,10 Q130,5 140,10 Q150,15 160,10 Q170,6 180,10 Q190,14 200,10" fill="none" stroke={clip.color} strokeWidth="1.5" />
                    </svg>
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>{clip.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Command Center Dashboard Reproduction
// ─────────────────────────────────────────────────────────────────────────────
export function CommandCenterMockup() {
  const projects = ["Daily Tech News", "Travel Vlogs", "AI Tutorials", "Product Reviews", "Podcast Clips", "Documentary"];
  const logs = [
    { time: "2m ago", msg: "Script generation completed", color: "#22c55e" },
    { time: "5m ago", msg: "Media assets uploaded (12 files)", color: "#3b82f6" },
    { time: "8m ago", msg: "Pipeline started: GPU rendering", color: "#f97316" },
    { time: "12m ago", msg: "New project created", color: "#a855f7" },
  ];

  return (
    <div style={{ background: "#000", borderRadius: "6px", overflow: "hidden", fontSize: "10px", fontFamily: "var(--font-geist-mono), monospace", color: "#a3a3a3", height: "100%", display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "22%", background: "#171717", borderRight: "1px solid #262626", padding: "10px 8px", display: "flex", flexDirection: "column" }}>
        <div style={{ color: "#f97316", fontWeight: 800, fontSize: "11px", letterSpacing: "0.15em", marginBottom: "4px" }}>VID BOLT</div>
        <div style={{ color: "#525252", fontSize: "8px", marginBottom: "16px" }}>v1.0.0 BETA</div>

        {/* Nav */}
        <div style={{ background: "#f97316", color: "#fff", padding: "6px 8px", borderRadius: "4px", fontSize: "9px", fontWeight: 600, marginBottom: "12px" }}>
          ⬡ COMMAND CENTER
        </div>

        <div style={{ fontSize: "8px", color: "#525252", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "6px" }}>MEDIA PROJECTS</div>
        {projects.slice(0, 3).map((p) => (
          <div key={p} style={{ padding: "4px 8px", fontSize: "9px", color: "#737373", borderLeft: "2px solid #262626", marginLeft: "4px", marginBottom: "2px" }}>{p}</div>
        ))}

        <div style={{ fontSize: "8px", color: "#525252", fontWeight: 700, letterSpacing: "0.15em", marginTop: "12px", marginBottom: "6px" }}>ANALYTICS</div>
        {["Performance", "Audience"].map((a) => (
          <div key={a} style={{ padding: "4px 8px", fontSize: "9px", color: "#737373", borderLeft: "2px solid #262626", marginLeft: "4px", marginBottom: "2px" }}>{a}</div>
        ))}

        <div style={{ marginTop: "auto" }}>
          {["Settings", "Payments"].map((s) => (
            <div key={s} style={{ padding: "5px 8px", fontSize: "9px", color: "#525252", marginBottom: "2px" }}>⚙ {s}</div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* TopBar */}
        <div style={{ padding: "8px 14px", background: "#1a1a1a", borderBottom: "1px solid #262626", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: "10px", color: "#525252" }}>COMMAND CENTER / <span style={{ color: "#f97316" }}>DASHBOARD</span></div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <span style={{ fontSize: "8px", background: "#052e16", color: "#22c55e", padding: "2px 6px", borderRadius: "4px", border: "1px solid #14532d" }}>GPU Online</span>
            <span style={{ fontSize: "8px", color: "#525252" }}>🔔</span>
          </div>
        </div>

        <div style={{ flex: 1, padding: "12px", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Command Center</div>
              <div style={{ fontSize: "9px", color: "#525252" }}>Overview of your media operations</div>
            </div>
            <div style={{ background: "#f97316", color: "#fff", padding: "5px 12px", borderRadius: "4px", fontSize: "9px", fontWeight: 800, letterSpacing: "0.1em" }}>
              + NEW PROJECT
            </div>
          </div>

          {/* Project grid */}
          <div style={{ background: "rgba(23,23,23,0.4)", border: "1px solid #262626", borderRadius: "8px", padding: "10px", marginBottom: "12px" }}>
            <div style={{ fontSize: "8px", color: "#737373", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "8px" }}>📁 RECENT PROJECTS</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
              {projects.map((p) => (
                <div key={p} style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #262626", borderRadius: "6px", padding: "8px" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: "#e5e5e5", marginBottom: "2px" }}>{p}</div>
                  <div style={{ fontSize: "7px", color: "#404040" }}>ID: {Math.random().toString(36).substring(2, 8)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
            {/* Activity Log */}
            <div style={{ background: "rgba(23,23,23,0.4)", border: "1px solid #262626", borderRadius: "8px", padding: "10px" }}>
              <div style={{ fontSize: "8px", color: "#737373", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "8px" }}>ACTIVITY LOG</div>
              {logs.map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px" }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: l.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "8px", color: "#a3a3a3" }}>{l.msg}</div>
                    <div style={{ fontSize: "7px", color: "#404040" }}>{l.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Agent Allocation */}
            <div style={{ background: "rgba(23,23,23,0.4)", border: "1px solid #262626", borderRadius: "8px", padding: "10px" }}>
              <div style={{ fontSize: "8px", color: "#737373", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "8px" }}>AGENT NETWORK</div>
              {["Research Agent", "Script Agent", "Media Agent", "Assembly Agent"].map((a, i) => (
                <div key={a} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontSize: "8px", color: "#a3a3a3" }}>{a}</span>
                  <div style={{ width: "40px", height: "4px", background: "#1a1a1a", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ width: `${[85, 100, 60, 30][i]}%`, height: "100%", background: i === 1 ? "#22c55e" : "#f97316", borderRadius: "2px" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* GPU Status */}
            <div style={{ background: "rgba(23,23,23,0.4)", border: "1px solid #262626", borderRadius: "8px", padding: "10px" }}>
              <div style={{ fontSize: "8px", color: "#737373", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "8px" }}>GPU STATUS</div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e44" }} />
                <span style={{ fontSize: "9px", color: "#22c55e", fontWeight: 600 }}>Online — NVIDIA A100</span>
              </div>
              <div style={{ fontSize: "8px", color: "#525252" }}>Memory: 78.2 / 80 GB</div>
              <div style={{ width: "100%", height: "4px", background: "#1a1a1a", borderRadius: "2px", marginTop: "4px", overflow: "hidden" }}>
                <div style={{ width: "97%", height: "100%", background: "linear-gradient(90deg, #22c55e, #fb923c)", borderRadius: "2px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Production Pipeline / Wizard Reproduction
// ─────────────────────────────────────────────────────────────────────────────
export function PipelineMockup() {
  const steps = [
    { id: 1, label: "Outline", done: true },
    { id: 2, label: "Script", done: true },
    { id: 3, label: "Production", active: true },
    { id: 4, label: "Editor", done: false },
    { id: 5, label: "Export", done: false },
  ];

  const nodes = [
    { label: "Preparing", status: "done", x: 8, y: 45 },
    { label: "Scripting", status: "done", x: 22, y: 45 },
    { label: "Designing", status: "done", x: 38, y: 45 },
    { label: "Creating", status: "running", x: 56, y: 22 },
    { label: "Composing", status: "pending", x: 56, y: 68 },
    { label: "Assembling", status: "pending", x: 74, y: 45 },
    { label: "Finalizing", status: "pending", x: 90, y: 45 },
  ];

  const edges = [
    [0, 1], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5], [5, 6],
  ];

  const statusColor = (s: string) =>
    s === "done" ? "#22c55e" : s === "running" ? "#3b82f6" : "#404040";

  return (
    <div style={{ background: "#000", borderRadius: "6px", overflow: "hidden", fontSize: "10px", fontFamily: "var(--font-geist-mono), monospace", color: "#a3a3a3", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Wizard Progress Bar */}
      <div style={{ padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "0", position: "relative" }}>
        {/* Exit button */}
        <div style={{ position: "absolute", left: "12px", background: "#1a1a1a", border: "1px solid #333", borderRadius: "6px", padding: "4px 10px", fontSize: "9px", color: "#737373" }}>
          ← Exit
        </div>

        {steps.map((step, i) => (
          <div key={step.id} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: step.done ? "#f97316" : step.active ? "#f97316" : "#1a1a1a",
                color: step.done || step.active ? "#fff" : "#525252",
                border: step.active ? "none" : step.done ? "none" : "2px solid #333",
                fontSize: "11px", fontWeight: 700,
                boxShadow: step.active ? "0 0 15px rgba(249,115,22,0.4), 0 0 4px rgba(249,115,22,0.6)" : "none",
                transform: step.active ? "scale(1.15)" : "scale(1)",
              }}>
                {step.done ? "✓" : step.id}
              </div>
              <span style={{ fontSize: "8px", color: step.active ? "#f97316" : step.done ? "#a3a3a3" : "#525252", fontWeight: step.active ? 700 : 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: "40px", height: "2px", background: step.done ? "linear-gradient(90deg, #f97316, #fb923c)" : "#1a1a1a", margin: "0 4px", marginBottom: "16px", boxShadow: step.done ? "0 0 8px rgba(249,115,22,0.3)" : "none" }} />
            )}
          </div>
        ))}
      </div>

      {/* Pipeline Graph */}
      <div style={{ flex: 1, background: "rgba(23,23,23,0.3)", border: "1px solid #1a1a1a", borderRadius: "10px", margin: "0 14px 14px", padding: "14px", position: "relative" }}>
        <div style={{ fontSize: "9px", color: "#525252", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>Pipeline</div>

        {/* SVG Edges */}
        <svg style={{ position: "absolute", inset: "40px 14px 14px", width: "calc(100% - 28px)", height: "calc(100% - 54px)" }} viewBox="0 0 100 100" preserveAspectRatio="none">
          {edges.map(([from, to], i) => (
            <line key={i} x1={nodes[from].x} y1={nodes[from].y} x2={nodes[to].x} y2={nodes[to].y}
              stroke={nodes[from].status === "done" && nodes[to].status === "done" ? "#22c55e44" : nodes[from].status !== "pending" ? "#3b82f644" : "#1a1a1a"}
              strokeWidth="0.5" strokeDasharray={nodes[to].status === "pending" ? "2 1.5" : "none"} />
          ))}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <div key={node.label} style={{
            position: "absolute",
            left: `calc(${node.x}% - 2px)`,
            top: `calc(${node.y}% + 16px)`,
            transform: "translate(-50%, -50%)",
            display: "flex", alignItems: "center", gap: "5px",
            padding: "5px 9px", borderRadius: "10px",
            background: node.status === "running" ? "rgba(59,130,246,0.1)" : node.status === "done" ? "rgba(34,197,94,0.06)" : "rgba(23,23,23,0.6)",
            border: `1px solid ${node.status === "running" ? "rgba(59,130,246,0.3)" : node.status === "done" ? "rgba(34,197,94,0.2)" : "#262626"}`,
            boxShadow: node.status === "running" ? "0 0 12px rgba(59,130,246,0.15)" : "none",
          }}>
            <div style={{
              width: "18px", height: "18px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center",
              background: `${statusColor(node.status)}22`, color: statusColor(node.status), fontSize: "10px",
            }}>
              {node.status === "done" ? "✓" : node.status === "running" ? "◉" : "○"}
            </div>
            <span style={{ fontSize: "9px", fontWeight: 600, color: statusColor(node.status), whiteSpace: "nowrap" }}>{node.label}</span>
          </div>
        ))}

        {/* Status indicator */}
        <div style={{ position: "absolute", bottom: "8px", left: "14px", display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#3b82f6", animation: "glow-pulse 2s ease-in-out infinite" }} />
          <span style={{ fontSize: "8px", color: "#404040" }}>Connected to pipeline</span>
        </div>
      </div>
    </div>
  );
}
