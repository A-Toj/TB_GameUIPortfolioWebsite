"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillTree } from "@/lib/data";
import { ICONS } from "./skillIcons";

const CENTER = 500;
const RING_R = 150;
const RING_W = 26;
const ROOT_R = 210;
const ROOT_NODE_R = 22;
const NODE_BASE = 40; // active node radius; inactive nodes scale down

const N = skillTree.length;
const SEG = 360 / N;
const GAP_DEG = 7;
const DRAWN = SEG - GAP_DEG;
const CIRC = 2 * Math.PI * RING_R;
const ARC_LEN = (DRAWN / 360) * CIRC;

const GREEN = "#1f9e12";
const GREEN_DEEP = "#107c10";
const GRAY = "#9aa09a";
const GRAY_SOFT = "#bcc2bc";

const SPRING = { type: "spring", stiffness: 200, damping: 20, mass: 0.7 } as const;

function polar(r: number, deg: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [CENTER + r * Math.cos(a), CENTER + r * Math.sin(a)];
}
const baseAngle = (i: number) => -90 + i * SEG;

// Wide invisible wedge per branch — gives each branch a much larger hover/click
// target than the thin ring arc alone.
function sectorPath(i: number, rInner: number, rOuter: number, spanDeg: number): string {
  const a0 = baseAngle(i) - spanDeg / 2;
  const a1 = baseAngle(i) + spanDeg / 2;
  const [x0o, y0o] = polar(rOuter, a0);
  const [x1o, y1o] = polar(rOuter, a1);
  const [x1i, y1i] = polar(rInner, a1);
  const [x0i, y0i] = polar(rInner, a0);
  return `M ${x0o} ${y0o} A ${rOuter} ${rOuter} 0 0 1 ${x1o} ${y1o} L ${x1i} ${y1i} A ${rInner} ${rInner} 0 0 0 ${x0i} ${y0i} Z`;
}

function fanPositions(
  i: number,
  n: number,
  radius: number,
  spreadMax: number,
  step: number
): [number, number][] {
  const a = baseAngle(i);
  const spread = n <= 1 ? 0 : Math.min(spreadMax, (n - 1) * step);
  return Array.from({ length: n }, (_, j) => {
    const ang = n <= 1 ? a : a - spread / 2 + (j * spread) / (n - 1);
    return polar(radius, ang);
  });
}

function Pips({ level }: { level: number }) {
  return (
    <span className="ml-auto flex shrink-0 items-center gap-1">
      {[1, 2, 3].map((p) => (
        <span
          key={p}
          className={`h-1.5 w-1.5 rounded-full ${
            p <= level ? "bg-xbox-deep" : "bg-neutral-300"
          }`}
        />
      ))}
    </span>
  );
}

export default function SkillTree() {
  const [activeId, setActiveId] = useState(skillTree[0].id);
  const active = skillTree.find((b) => b.id === activeId) ?? skillTree[0];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-600">
        <span>Hover a branch to expand it</span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full border-2 border-xbox-deep" />
          core
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full border-2 border-dashed border-neutral-400" />
          learning
        </span>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
        {/* radial hub — always visible */}
        <div className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:flex-1">
          <svg
            viewBox="0 0 1000 1000"
            className="h-auto w-full select-none"
            role="img"
            aria-label="Radial skill tree"
          >
            <defs>
              <radialGradient id="nodeGloss" cx="50%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#fbfdf7" />
                <stop offset="100%" stopColor="#edf3e4" />
              </radialGradient>
            </defs>

            {/* enlarged invisible hit areas — hovering anywhere in a branch's
                wedge selects it (sits below the visible art, so nodes still get
                their own hover) */}
            {skillTree.map((b, i) => (
              <path
                key={`hit-${b.id}`}
                d={sectorPath(i, 130, 470, SEG - 2)}
                fill="transparent"
                pointerEvents="all"
                style={{ cursor: "pointer" }}
                aria-hidden="true"
                onMouseEnter={() => setActiveId(b.id)}
                onClick={() => setActiveId(b.id)}
              />
            ))}

            {/* ring segments */}
            {skillTree.map((b, i) => {
              const on = b.id === activeId;
              return (
                <circle
                  key={`seg-${b.id}`}
                  cx={CENTER}
                  cy={CENTER}
                  r={RING_R}
                  fill="none"
                  stroke={on ? GREEN : GRAY_SOFT}
                  strokeWidth={on ? RING_W + 6 : RING_W}
                  opacity={on ? 1 : 0.85}
                  strokeDasharray={`${ARC_LEN} ${CIRC - ARC_LEN}`}
                  transform={`rotate(${baseAngle(i) - DRAWN / 2} ${CENTER} ${CENTER})`}
                  style={{
                    cursor: "pointer",
                    transition: "stroke 0.3s ease, stroke-width 0.3s ease, opacity 0.3s ease",
                  }}
                  onMouseEnter={() => setActiveId(b.id)}
                  onClick={() => setActiveId(b.id)}
                />
              );
            })}

            {/* center hub */}
            <circle cx={CENTER} cy={CENTER} r={RING_R - RING_W / 2 - 6} fill="rgba(255,255,255,0.45)" />
            <text
              x={CENTER}
              y={CENTER + 15}
              textAnchor="middle"
              className="font-display"
              fontWeight={700}
              fontSize={46}
              fill="#171717"
              letterSpacing="4"
            >
              SKILLS
            </text>

            {/* branches */}
            {skillTree.map((b, i) => {
              const on = b.id === activeId;
              const a = baseAngle(i);
              const [r0x, r0y] = polar(RING_R + RING_W / 2, a);
              const [rx, ry] = polar(ROOT_R, a);
              const n = b.skills.length;
              const positions = on
                ? fanPositions(i, n, 420, 70, 17.5)
                : fanPositions(i, n, 325, 40, 10);
              const delayFor = (j: number) => (on ? 0.04 + j * 0.05 : (n - 1 - j) * 0.03);

              return (
                <motion.g
                  key={`branch-${b.id}`}
                  animate={{ opacity: on ? 1 : 0.4 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ cursor: "pointer" }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${b.name} skills`}
                  onMouseEnter={() => setActiveId(b.id)}
                  onFocus={() => setActiveId(b.id)}
                  onClick={() => setActiveId(b.id)}
                >
                  {/* skill connectors */}
                  {b.skills.map((s, j) => (
                    <motion.line
                      key={`l-${s.name}`}
                      x1={rx}
                      y1={ry}
                      animate={{ x2: positions[j][0], y2: positions[j][1], stroke: on ? GREEN_DEEP : GRAY }}
                      transition={{ ...SPRING, delay: delayFor(j) }}
                      strokeWidth={on ? 2.5 : 1.5}
                    />
                  ))}

                  {/* skill nodes (ability badge: frame + glossy disc + glyph).
                      Position is applied with a real CSS transform — framer's
                      x/y motion values do not reliably translate SVG <g>. */}
                  {b.skills.map((s, j) => (
                    <g
                      key={`n-${s.name}`}
                      style={{
                        transform: `translate(${positions[j][0]}px, ${positions[j][1]}px)`,
                        transition: "transform 0.45s cubic-bezier(0.2,0.7,0.2,1)",
                      }}
                    >
                      <g
                        style={{
                          transform: `scale(${on ? 1 : 0.62})`,
                          transformBox: "fill-box",
                          transformOrigin: "center",
                          transition: "transform 0.3s ease, color 0.25s ease",
                          color: on ? GREEN_DEEP : GRAY,
                          cursor: "pointer",
                        }}
                      >
                        {/* outer ability frame */}
                        <circle
                          cx={0}
                          cy={0}
                          r={NODE_BASE + 5}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          opacity={0.22}
                        />
                        {/* glossy disc */}
                        <circle
                          cx={0}
                          cy={0}
                          r={NODE_BASE}
                          fill="url(#nodeGloss)"
                          stroke="currentColor"
                          strokeWidth={3}
                          strokeDasharray={s.level >= 2 ? undefined : "5 5"}
                        />
                        {/* top highlight */}
                        <ellipse
                          cx={0}
                          cy={-NODE_BASE * 0.42}
                          rx={NODE_BASE * 0.6}
                          ry={NODE_BASE * 0.28}
                          fill="#ffffff"
                          opacity={0.5}
                        />
                        {/* glyph */}
                        <g
                          transform="translate(-24 -24) scale(2)"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          dangerouslySetInnerHTML={{ __html: ICONS[s.icon] ?? "" }}
                        />
                      </g>
                    </g>
                  ))}

                  {/* ring -> root connector */}
                  <motion.line
                    x1={r0x}
                    y1={r0y}
                    animate={{ x2: rx, y2: ry, stroke: on ? GREEN : GRAY }}
                    transition={{ duration: 0.3 }}
                    strokeWidth={on ? 3 : 2}
                  />
                  {/* root bud */}
                  <motion.circle
                    cx={rx}
                    cy={ry}
                    animate={{ r: ROOT_NODE_R, stroke: on ? GREEN_DEEP : GRAY }}
                    transition={{ duration: 0.3 }}
                    fill="#ffffff"
                    strokeWidth={on ? 3 : 2}
                    whileHover={{ scale: 1.1 }}
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  />
                  <text
                    x={rx}
                    y={ry + 4}
                    textAnchor="middle"
                    className="font-display"
                    fontWeight={700}
                    fontSize={13}
                    fill={on ? GREEN_DEEP : "#737373"}
                    style={{ pointerEvents: "none" }}
                  >
                    {b.monogram}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* info panel — beside the tree, never below it on desktop */}
        <div className="w-full lg:w-[330px] lg:shrink-0">
          <div className="overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-5 shadow-tile">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-xbox-green to-xbox-deep font-display text-[11px] font-bold text-white shadow-glow">
                    {active.monogram}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-tight text-neutral-900">
                      {active.name}
                    </h3>
                    <p className="text-[11px] uppercase tracking-wider text-neutral-500">
                      {active.tagline}
                    </p>
                  </div>
                </div>
                <ul className="mt-4 space-y-0.5">
                  {active.skills.map((s) => (
                    <li key={s.name} className="flex h-11 items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-neutral-300 bg-white text-xbox-deep">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          dangerouslySetInnerHTML={{ __html: ICONS[s.icon] ?? "" }}
                        />
                      </span>
                      <span className="truncate text-sm text-neutral-700">{s.name}</span>
                      {s.note && (
                        <span className="shrink-0 rounded bg-neutral-200 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral-600">
                          {s.note}
                        </span>
                      )}
                      <Pips level={s.level} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
