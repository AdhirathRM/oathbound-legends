import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from "recharts";
import PageTransition from "../components/PageTransition";
import SpriteBox from "../components/SpriteBox";
import { useTheme } from "../hooks/useTheme";
import { getCharacterById } from "../data/characters";

const mockComments = [
  {
    id: 1,
    author: "OathSeeker_Mira",
    time: "2 days ago",
    text: "For the agility-based build, opening with two quick dodge rolls before the main attack phase made a huge difference. Don't sleep on the Speed stat here.",
  },
  {
    id: 2,
    author: "TrialRunner_IX",
    time: "5 days ago",
    text: "The Intelligence scaling is underrated. If you're running a caster build, the damage multiplier kicks in hard after 80 INT. Stack it.",
  },
  {
    id: 3,
    author: "VoidWalker_99",
    time: "1 week ago",
    text: "Took me 14 attempts. The turning point was learning the tell for the second phase — watch the feet, not the hands. Trust me on this.",
  },
];

function CustomRadarTooltip({ active, payload, isDark }) {
  if (active && payload && payload.length) {
    return (
      <div
        className={`font-pixel px-3 py-2 border text-xs ${
          isDark
            ? "bg-void-card border-red-800 text-red-400"
            : "bg-scroll-card border-scroll-accent text-scroll-accent"
        }`}
        style={{ fontSize: "9px" }}
      >
        {payload[0].payload.stat}: {payload[0].value}
      </div>
    );
  }
  return null;
}

function StatBars({ stats, isDark, accentColor }) {
  return (
    <div className="space-y-2 mb-5">
      {Object.entries(stats).map(([stat, val]) => (
        <div key={stat} className="flex items-center gap-3">
          <span className={`font-pixel w-20 text-right ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
            {stat.toUpperCase().slice(0, 3)}
          </span>
          <div className={`flex-1 h-2 ${isDark ? "bg-void-border" : "bg-scroll-border"}`}>
            <motion.div
              className="h-full"
              style={{ background: accentColor || (isDark ? "#a855f7" : "#8b4513") }}
              initial={{ width: 0 }}
              animate={{ width: `${val}%` }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
          </div>
          <span className={`font-pixel w-8 ${isDark ? "text-void-text" : "text-scroll-text"}`} style={{ fontSize: "9px" }}>
            {val}
          </span>
        </div>
      ))}
    </div>
  );
}

function RadarChartBlock({ stats, name, isDark, accentColor }) {
  const radarData = Object.entries(stats).map(([key, value]) => ({
    stat: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    fullMark: 100,
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData}>
          <PolarGrid stroke={isDark ? "#2a2248" : "#c9a96e"} strokeOpacity={0.6} />
          <PolarAngleAxis
            dataKey="stat"
            tick={{ fill: isDark ? "#7c6fa0" : "#8b7355", fontSize: 10, fontFamily: "'Crimson Text', serif" }}
          />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name={name}
            dataKey="value"
            stroke={accentColor || (isDark ? "#a855f7" : "#8b4513")}
            fill={accentColor || (isDark ? "#7c3aed" : "#8b4513")}
            fillOpacity={0.25}
            strokeWidth={2}
            dot={{ fill: accentColor || (isDark ? "#a855f7" : "#8b4513"), r: 3 }}
            animationBegin={300}
            animationDuration={1000}
          />
          <Tooltip content={<CustomRadarTooltip isDark={isDark} />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

const typeBadge = {
  character: {
    void: "bg-blue-900/40 text-blue-300 border-blue-700/40",
    scroll: "bg-blue-100 text-blue-800 border-blue-300",
  },
  enemy: {
    void: "bg-slate-800/60 text-slate-300 border-slate-600/40",
    scroll: "bg-slate-100 text-slate-700 border-slate-300",
  },
  boss: {
    void: "bg-red-900/50 text-red-300 border-red-700/40",
    scroll: "bg-red-100 text-red-800 border-red-300",
  },
  npc: {
    void: "bg-amber-900/40 text-amber-300 border-amber-700/40",
    scroll: "bg-amber-100 text-amber-800 border-amber-300",
  },
};

const typeDisplayLabel = { character: "HERO", enemy: "ENEMY", boss: "BOSS", npc: "NPC" };

export default function Profile() {
  const { id } = useParams();
  const { theme } = useTheme();
  const isDark = theme === "void";
  const [animState, setAnimState] = useState("Idle");
  const [malakorPhase, setMalakorPhase] = useState(1);

  const character = getCharacterById(id);

  if (!character) {
    return (
      <PageTransition>
        <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-void-bg" : "bg-scroll-bg"}`}>
          <div className="text-center">
            <div className={`font-pixel text-6xl mb-6 ${isDark ? "text-void-border" : "text-scroll-border"}`}>404</div>
            <h2 className={`font-serif text-2xl mb-4 ${isDark ? "text-void-text" : "text-scroll-text"}`}>Entry Not Found</h2>
            <p className={`font-body italic mb-6 ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>The archives hold no record of this soul.</p>
            <Link to="/compendium" className={`font-pixel px-6 py-3 ${isDark ? "bg-red-900 text-red-200 border border-red-800" : "bg-scroll-accent text-white"}`} style={{ fontSize: "9px" }}>
              ← BACK TO COMPENDIUM
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const isMalakor = character.id === "lord-malakor";
  const isLeo = character.id === "leo";
  const isSentinel = character.id === "sentinel";
  const accentColor = isMalakor ? "#8B0000" : character.accentColor || character.spriteColor;

  const activeStats = isMalakor
    ? (malakorPhase === 1 ? character.stats.phase1 : character.stats.phase2)
    : character.stats;

  const availableAnimStates = isSentinel
    ? ["Idle", "Walk", "Attack", "Death"]
    : ["Idle", "Walk", "Attack"];

  const getDynamicSpriteName = () => {
    let baseId = character.id;
    if (baseId === "seraphim") baseId = "knight";
    if (baseId === "elementalist") baseId = "mage";
    if (baseId === "sharpshooter") baseId = "archer";
    if (baseId === "brawler") baseId = "beastman";
    if (baseId === "ronin") baseId = "samurai";
    if (baseId === "lord-malakor") baseId = "malakor";

    if (baseId === "malakor" && animState !== "Idle") baseId = "vampire";
    if (baseId === "sentinel" && animState !== "Idle") baseId = "enemy";

    if (animState === "Attack") return `${baseId}_attack`;
    if (animState === "Walk") return `${baseId}_walk`;
    if (animState === "Death") return `${baseId}_death`;
    return baseId; 
  };

  return (
    <PageTransition>
      <div className={`min-h-screen py-12 px-4 ${isDark ? "bg-void-bg" : "bg-scroll-bg"}`}>
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 flex items-center gap-2">
            <Link
              to="/compendium"
              className={`font-pixel text-xs transition-all ${isDark ? "text-void-muted hover:text-red-400" : "text-scroll-muted hover:text-scroll-accent"}`}
              style={{ fontSize: "8px" }}
            >
              ← COMPENDIUM
            </Link>
            <span className={`font-pixel text-xs ${isDark ? "text-void-border" : "text-scroll-border"}`} style={{ fontSize: "8px" }}>/</span>
            <span className={`font-pixel text-xs ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
              {character.name.toUpperCase()}
            </span>
          </motion.div>

          {/* ── Main Layout ──────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT — Sprite + Controls */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Sprite box */}
              <div
                className={`w-full max-w-sm relative ${
                  isMalakor
                    ? isDark ? "bg-red-950/30 border border-red-900/60" : "bg-red-50 border border-red-300"
                    : isDark ? "bg-void-card pixel-card-void" : "bg-scroll-card pixel-card-scroll"
                }`}
              >
                {isDark && (
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at center, ${accentColor}40, transparent 70%)` }}
                  />
                )}
                <SpriteBox
                  name={getDynamicSpriteName()}
                  type={character.type === "character" || character.type === "npc" ? "character" : character.type === "boss" ? "boss" : "enemy"}
                  color={character.spriteColor}
                  size="xl"
                  animState={animState}
                  className="w-full h-72 relative z-10"
                />
                {/* Leo — captured overlay */}
                {isLeo && (
                  <div className={`absolute bottom-0 left-0 right-0 py-2 text-center ${isDark ? "bg-red-950/80" : "bg-red-100"}`}>
                    <span className={`font-pixel ${isDark ? "text-red-400" : "text-red-700"}`} style={{ fontSize: "7px" }}>
                      ⚠ CAPTURED — AWAITING RESCUE
                    </span>
                  </div>
                )}
              </div>

              {/* CHANGED: Hide Anim state label and buttons for Leo */}
              {!isLeo && (
                <>
                  {/* Anim state label */}
                  <div className={`font-pixel text-xs ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
                    ANIMATION: <span className={isDark ? "text-red-400" : "text-scroll-accent"}>{animState.toUpperCase()}</span>
                  </div>

                  {/* Animation state buttons */}
                  <div className={`flex gap-2 p-1 ${isDark ? "bg-void-card border border-void-border" : "bg-scroll-surface border border-scroll-border"}`}>
                    {availableAnimStates.map((state) => (
                      <button
                        key={state}
                        onClick={() => setAnimState(state)}
                        className={`font-pixel px-4 py-2 transition-all duration-200 ${
                          animState === state
                            ? isDark ? "bg-red-900 text-red-200 border border-red-800" : "bg-scroll-accent text-white"
                            : isDark ? "text-void-muted hover:text-void-text" : "text-scroll-muted hover:text-scroll-text"
                        }`}
                        style={{ fontSize: "8px" }}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Weapon */}
              {character.weapon && !isMalakor && (
                <div className={`w-full max-w-sm p-4 ${isDark ? "bg-void-card border border-void-border" : "bg-scroll-card border border-scroll-border"}`}>
                  <div className={`font-pixel text-xs mb-1 ${isDark ? "text-red-500/70" : "text-scroll-warm"}`} style={{ fontSize: "8px" }}>WEAPON</div>
                  <div className={`font-serif font-bold ${isDark ? "text-void-text" : "text-scroll-text"}`}>{character.weapon}</div>
                </div>
              )}

              {/* Trial info */}
              {character.trials && (
                <div className={`w-full max-w-sm p-4 ${isDark ? "bg-void-card border border-void-border" : "bg-scroll-card border border-scroll-border"}`}>
                  <div className={`font-pixel text-xs mb-1 ${isDark ? "text-red-500/70" : "text-scroll-warm"}`} style={{ fontSize: "8px" }}>ENCOUNTERED IN</div>
                  <div className={`font-serif font-bold ${isDark ? "text-void-text" : "text-scroll-text"}`}>Trials {character.trials}</div>
                </div>
              )}
              {character.trial && (
                <div className={`w-full max-w-sm p-4 ${isDark ? "bg-red-950/30 border border-red-900/40" : "bg-red-50 border border-red-300"}`}>
                  <div className={`font-pixel text-xs mb-1 ${isDark ? "text-red-400" : "text-red-700"}`} style={{ fontSize: "8px" }}>⚔ FINAL ENCOUNTER</div>
                  <div className={`font-serif font-bold ${isDark ? "text-red-200" : "text-red-900"}`}>Trial {String(character.trial).padStart(2, "0")} — The Night Unending</div>
                </div>
              )}

              {/* Leo status */}
              {isLeo && (
                <div className={`w-full max-w-sm p-4 border-2 border-dashed ${isDark ? "border-amber-800/50 bg-amber-950/20" : "border-amber-400 bg-amber-50"}`}>
                  <div className={`font-pixel text-xs mb-1 ${isDark ? "text-amber-400" : "text-amber-700"}`} style={{ fontSize: "8px" }}>STATUS</div>
                  <div className={`font-serif font-bold ${isDark ? "text-amber-300" : "text-amber-900"}`}>{character.status}</div>
                </div>
              )}
            </motion.div>

            {/* RIGHT — Info + Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              {/* Name + Type */}
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span
                    className={`font-pixel border px-3 py-1 ${typeBadge[character.type]?.[isDark ? "void" : "scroll"] || ""}`}
                    style={{ fontSize: "8px" }}
                  >
                    {typeDisplayLabel[character.type] || character.type.toUpperCase()}
                  </span>
                  <span className={`font-pixel text-xs ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
                    {character.role.toUpperCase()}
                  </span>
                </div>
                {character.title && (
                  <p className={`font-pixel mb-1 ${isDark ? "text-red-500/70" : "text-scroll-warm"}`} style={{ fontSize: "8px" }}>
                    {character.title.toUpperCase()}
                  </p>
                )}
                <h1
                  className={`font-serif font-black leading-tight ${isDark ? "text-void-text glow-text" : "text-scroll-text"}`}
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  {character.name}
                </h1>
              </div>

              {/* Description */}
              <div className={`p-5 border-l-4 ${isDark ? "bg-void-card/50" : "bg-scroll-surface"}`} style={{ borderColor: accentColor }}>
                <p className={`font-body italic text-lg leading-relaxed ${isDark ? "text-void-text" : "text-scroll-text"}`}>
                  {character.description}
                </p>
              </div>

              {/* Lore */}
              <div>
                <div className={`font-pixel text-xs mb-3 flex items-center gap-2 ${isDark ? "text-red-400" : "text-scroll-warm"}`} style={{ fontSize: "9px" }}>
                  <span>◈</span> LORE ENTRY
                </div>
                <p className={`font-body leading-relaxed ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                  {character.lore}
                </p>
              </div>

              {/* Visual Style note */}
              {character.visualStyle && (
                <div className={`p-4 border ${isDark ? "border-void-border/40 bg-void-card/30" : "border-scroll-border bg-scroll-surface"}`}>
                  <div className={`font-pixel text-xs mb-2 ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
                    SPRITE NOTES
                  </div>
                  <p className={`font-body text-sm italic ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                    {character.visualStyle}
                  </p>
                </div>
              )}

              {/* Stats — Leo has no combat stats */}
              {!isLeo && (
                <div className={`p-5 ${isDark ? "bg-void-card pixel-card-void" : "bg-scroll-card pixel-card-scroll"}`}>
                  <div className={`font-pixel text-xs mb-4 flex items-center gap-2 ${isDark ? "text-red-400" : "text-scroll-warm"}`} style={{ fontSize: "9px" }}>
                    <span>◈</span> COMBAT STATISTICS
                  </div>

                  {/* Malakor phase toggle */}
                  {isMalakor && (
                    <div className={`flex gap-1 p-1 mb-5 ${isDark ? "bg-void-bg border border-void-border" : "bg-scroll-surface border border-scroll-border"}`}>
                      {[1, 2].map((phase) => (
                        <button
                          key={phase}
                          onClick={() => setMalakorPhase(phase)}
                          className={`font-pixel flex-1 py-2 transition-all duration-200 ${
                            malakorPhase === phase
                              ? isDark ? "bg-red-900 text-red-200 border border-red-800" : "bg-red-700 text-white"
                              : isDark ? "text-void-muted hover:text-void-text" : "text-scroll-muted hover:text-scroll-text"
                          }`}
                          style={{ fontSize: "8px" }}
                        >
                          PHASE {phase}{phase === 1 ? " — REFINED" : " — FERAL"}
                        </button>
                      ))}
                    </div>
                  )}

                  {isMalakor && (
                    <p className={`font-body italic text-sm mb-4 ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                      {malakorPhase === 1
                        ? "Phase 1: One hand behind his back. Cape summons bat swarms and shadow projectiles. Composed and deliberate."
                        : "Phase 2: Refinement discarded. Hair disheveled. Claws fully extended. Devastating melee swipes. Wings flared."}
                    </p>
                  )}

                  <StatBars stats={activeStats} isDark={isDark} accentColor={accentColor} />
                  <RadarChartBlock stats={activeStats} name={character.name} isDark={isDark} accentColor={accentColor} />
                </div>
              )}

              {/* Leo — no combat, show role */}
              {isLeo && (
                <div className={`p-5 border-2 border-dashed text-center ${isDark ? "border-amber-800/40 bg-amber-950/10" : "border-amber-400 bg-amber-50"}`}>
                  <p className={`font-pixel mb-2 ${isDark ? "text-amber-400" : "text-amber-700"}`} style={{ fontSize: "9px" }}>
                    ◈ NON-COMBATANT
                  </p>
                  <p className={`font-serif italic ${isDark ? "text-amber-300/70" : "text-amber-800"}`}>
                    Leo is the Squire — the reason for the oath, not a fighter. His safety is the mission.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* ── Community Strategies ─────────────────────── */}
          {!isLeo && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-14"
            >
              <div className={`font-pixel text-xs mb-6 flex items-center gap-3 ${isDark ? "text-red-400" : "text-scroll-warm"}`} style={{ fontSize: "9px" }}>
                <span>◈</span>
                <span>COMMUNITY STRATEGIES</span>
                <div className={`flex-1 h-px ${isDark ? "bg-void-border" : "bg-scroll-border"}`} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {mockComments.map((comment, idx) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className={`p-5 ${isDark ? "bg-void-card pixel-card-void" : "bg-scroll-card pixel-card-scroll"}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 flex items-center justify-center text-xs font-pixel ${
                            isDark ? "bg-red-900 text-red-200" : "bg-scroll-accent text-white"
                          }`}
                          style={{ fontSize: "8px" }}
                        >
                          {comment.author[0]}
                        </div>
                        <span className={`font-pixel text-xs ${isDark ? "text-red-400" : "text-scroll-accent"}`} style={{ fontSize: "8px" }}>
                          {comment.author}
                        </span>
                      </div>
                      <span className={`font-pixel text-xs ${isDark ? "text-void-muted/60" : "text-scroll-muted/60"}`} style={{ fontSize: "7px" }}>
                        {comment.time}
                      </span>
                    </div>
                    <p className={`font-body text-sm leading-relaxed ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                      {comment.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className={`mt-6 p-5 border-2 border-dashed text-center ${isDark ? "border-void-border text-void-muted" : "border-scroll-border text-scroll-muted"}`}>
                <p className={`font-pixel text-xs ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
                  COMMUNITY SUBMISSIONS OPEN — SIGN IN TO ADD A STRATEGY
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}