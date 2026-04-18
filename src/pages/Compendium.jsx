import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import SpriteBox from "../components/SpriteBox";
import { useTheme } from "../hooks/useTheme";
import { characters } from "../data/characters";

const FILTERS = ["All", "Heroes", "Enemy", "Boss", "NPC"];

const typeMap = {
  all: null,
  heroes: "character",
  enemy: "enemy",
  boss: "boss",
  npc: "npc",
};

const typeBadgeStyles = {
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

const typeLabel = {
  character: "HERO",
  enemy: "ENEMY",
  boss: "BOSS",
  npc: "NPC",
};

export default function Compendium() {
  const { theme } = useTheme();
  const isDark = theme === "void";
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    const typeFilter = typeMap[activeFilter.toLowerCase()];
    return characters.filter((c) => {
      const matchesType = !typeFilter || c.type === typeFilter;
      const matchesSearch =
        !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <PageTransition>
      <div className={`min-h-screen py-16 px-4 ${isDark ? "bg-void-bg" : "bg-scroll-bg"}`}>
        <div className="max-w-7xl mx-auto">

          {/* ── Header ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span
              className={`font-pixel text-xs mb-4 block ${isDark ? "text-red-400" : "text-scroll-warm"}`}
              style={{ fontSize: "9px" }}
            >
              ◈ OATHBOUND ARCHIVES ◈
            </span>
            <h1
              className={`font-serif font-black mb-4 ${isDark ? "text-void-text glow-text" : "text-scroll-text"}`}
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              The Compendium
            </h1>
            <p className={`font-body italic text-lg max-w-xl mx-auto ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
              Five heroes. One villain. One squire. Nine levels of Sentinels. One oath that binds them all.
            </p>
          </motion.div>

          {/* ── Search + Filter Bar ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <div className="relative flex-1">
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                ⌕
              </span>
              <input
                type="text"
                placeholder="Search archives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-8 pr-4 py-3 font-body text-sm border outline-none transition-all duration-200 ${
                  isDark
                    ? "bg-void-card border-void-border text-void-text placeholder-void-muted focus:border-red-800"
                    : "bg-scroll-card border-scroll-border text-scroll-text placeholder-scroll-muted focus:border-scroll-accent"
                }`}
              />
            </div>

            <div className={`flex gap-1 p-1 flex-wrap ${isDark ? "bg-void-card border border-void-border" : "bg-scroll-surface border border-scroll-border"}`}>
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`font-pixel px-4 py-2 transition-all duration-200 ${
                    activeFilter === filter
                      ? isDark ? "bg-red-900 text-red-200 border border-red-800" : "bg-scroll-accent text-white"
                      : isDark ? "text-void-muted hover:text-void-text" : "text-scroll-muted hover:text-scroll-text"
                  }`}
                  style={{ fontSize: "8px" }}
                >
                  {filter.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Grid ────────────────────────────────────── */}
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((char, idx) => (
                <motion.div
                  key={char.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className={`group flex flex-col transition-all duration-300 relative overflow-hidden ${
                    isDark ? "bg-void-card pixel-card-void" : "bg-scroll-card pixel-card-scroll"
                  }`}
                >
                  {/* Sprite area */}
                  <div
                    className={`relative z-10 overflow-hidden ${isDark ? "border-b border-void-border" : "border-b border-scroll-border"}`}
                    style={{ borderTop: `2px solid ${char.accentColor || char.spriteColor}40` }}
                  >
                    <SpriteBox
                      name={char.id} 
                      type={char.type}
                      size="lg"
                      className="w-full h-44"
                    />
                    
                    {/* Type badge */}
                    <div className="absolute top-2 right-2">
                      <span
                        className={`font-pixel border px-2 py-0.5 ${
                          typeBadgeStyles[char.type]?.[isDark ? "void" : "scroll"] || ""
                        }`}
                        style={{ fontSize: "7px" }}
                      >
                        {typeLabel[char.type] || char.type.toUpperCase()}
                      </span>
                    </div>

                    {/* Status badge */}
                    {char.status && (
                      <div className="absolute bottom-2 left-2">
                        <span className={`font-pixel px-2 py-0.5 border ${isDark ? "bg-red-900/60 text-red-200 border-red-700" : "bg-red-100 text-red-800 border-red-300"} animate-pulse`} style={{ fontSize: "6px" }}>
                          {char.status.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col flex-1 relative z-10">
                    {char.title && (
                      <p className={`font-pixel mb-1 ${isDark ? "text-red-500/70" : "text-scroll-warm"}`} style={{ fontSize: "7px" }}>
                        {char.title.toUpperCase()}
                      </p>
                    )}
                    <h3 className={`font-serif font-bold text-xl leading-tight mb-1 ${isDark ? "text-void-text" : "text-scroll-text"}`}>
                      {char.name}
                    </h3>
                    <p className={`font-body italic text-sm mb-3 ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                      {char.role}
                    </p>
                    <p className={`font-body text-sm leading-relaxed mb-4 flex-1 line-clamp-2 ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                      {char.description}
                    </p>

                    <Link
                      to={`/profile/${char.id}`}
                      className={`font-pixel text-center py-2 border transition-all duration-300 ${
                        isDark
                          ? "border-void-border text-void-muted hover:border-red-800 hover:text-red-400 bg-void-bg/50"
                          : "border-scroll-accent text-scroll-accent hover:bg-scroll-accent hover:text-white"
                      }`}
                      style={{ fontSize: "8px" }}
                    >
                      VIEW DOSSIER →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}