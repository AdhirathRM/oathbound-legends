import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import SpriteBox from "../components/SpriteBox";
import PixelStars from "../components/PixelStars";
import { useTheme } from "../hooks/useTheme";
import { trials } from "../data/trials";
import { characters } from "../data/characters";

const seraphim = characters.find((c) => c.id === "seraphim");
const previewTrials = trials.slice(0, 3);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const heroRoster = [
  { id: "seraphim", label: "Knight", color: "#DC143C", icon: "/sword.png" },
  { id: "elementalist", label: "Mage", color: "#00C957", icon: "/staff.png" },
  { id: "sharpshooter", label: "Archer", color: "#FFD700", icon: "/bow.png" },
  { id: "brawler", label: "Brawler", color: "#E0FFFF", icon: "/claws.png" },
  { id: "ronin", label: "Samurai", color: "#8B0000", icon: "/katana.png" },
];

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "void";

  return (
    <PageTransition>
      {/* ── Hero Section ─────────────────────────────────── */}
      <section
        className={`relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 ${isDark ? "bg-void-bg" : "bg-scroll-bg"
          }`}
      >
        {isDark ? (
          <>
            {/* Throne room background image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/throne-room.png')" }}
            />
            {/* Dark overlay so text stays readable */}
            <div className="absolute inset-0 bg-black/65" />
            {/* Your original color overlays on top */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,0,0,0.35)_0%,transparent_70%)]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-900/15 rounded-full blur-3xl" />
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(139,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,0,0,0.5) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,129,58,0.08)_0%,transparent_60%)]" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(201,169,110,0.08) 40px, rgba(201,169,110,0.08) 41px)",
              }}
            />
          </>
        )}

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span
              className={`font-pixel text-xs px-4 py-2 border inline-block ${isDark
                ? "border-red-800 text-red-400 bg-red-900/10"
                : "border-scroll-accent text-scroll-accent bg-scroll-accent/10"
                }`}
              style={{ fontSize: "9px" }}
            >
              ✦ OATHBOUND LEGENDS — FAN WIKI ✦
            </span>
          </motion.div>

          {/* Title with Hover Animation */}
          <motion.h1
            variants={itemVariants}
            className="mb-4 cursor-default group inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span
              className={`block font-serif font-black tracking-tight leading-none transition-all duration-300 ${isDark ? "text-void-text glow-text group-hover:text-white group-hover:drop-shadow-[0_0_35px_rgba(168,85,247,0.9)]" : "text-scroll-text group-hover:drop-shadow-[0_0_15px_rgba(139,69,19,0.4)]"
                }`}
              style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
            >
              OATHBOUND
            </span>
            <span
              className={`block font-serif font-semibold tracking-[0.3em] uppercase transition-all duration-300 ${isDark ? "text-red-400 group-hover:text-red-300 group-hover:drop-shadow-[0_0_15px_rgba(248,113,113,0.8)]" : "text-scroll-accent group-hover:text-[#6b3410]"
                }`}
              style={{ fontSize: "clamp(1rem, 3vw, 2rem)" }}
            >
              The Ten Trials
            </span>
          </motion.h1>

          {/* Story Intro Paragraph with Hover Animation & Enhanced Readability */}
          <motion.p
            variants={itemVariants}
            className={`font-body text-base sm:text-lg max-w-2xl mx-auto mb-4 leading-relaxed cursor-default group transition-all duration-300 ${isDark
                ? "text-void-text/90 [text-shadow:0_4px_12px_rgba(0,0,0,0.9)] group-hover:text-white group-hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.9)]"
                : "text-scroll-text/90 group-hover:text-[#4a2e1b] group-hover:drop-shadow-[0_0_15px_rgba(139,69,19,0.5)]"
              }`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            Five heroes bound by oath stand at the precipice of destiny.{" "}
            <span className={`italic transition-colors duration-300 ${isDark ? "text-red-400 group-hover:text-red-300" : "text-scroll-warm group-hover:text-[#8b4513]"}`}>
              Lord Malakor
            </span>
            , the Vampire Lord of Eternal Night, has seized their Squire — and issued a dark
            challenge: survive the Ten Trials, and Leo shall be freed. Fail, and your names shall
            be forgotten, lost to the shadows of eternity.
          </motion.p>

          {/* Subtitle Paragraph with Hover Animation & Enhanced Readability */}
          <motion.p
            variants={itemVariants}
            className={`font-body italic text-sm max-w-xl mx-auto mb-10 cursor-default group transition-all duration-300 ${isDark
                ? "text-void-text/90 [text-shadow:0_4px_12px_rgba(0,0,0,0.9)] group-hover:text-white group-hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.9)]"
                : "text-scroll-text/90 group-hover:text-[#4a2e1b] group-hover:drop-shadow-[0_0_15px_rgba(139,69,19,0.5)]"
              }`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            "The clock is ticking. The trials await."
          </motion.p>

          {/* CTA */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/chronicle"
              className={`font-pixel px-6 py-3 transition-all duration-300 ${isDark
                ? "bg-red-900 text-red-200 hover:bg-red-800 border border-red-700"
                : "bg-scroll-accent text-white hover:bg-scroll-warm"
                }`}
              style={{ fontSize: "9px" }}
            >
              VIEW THE TRIALS
            </Link>
            <Link
              to="/compendium"
              className={`font-pixel px-6 py-3 border transition-all duration-300 ${isDark
                ? "border-void-border text-void-muted hover:border-red-800 hover:text-red-400"
                : "border-scroll-border text-scroll-muted hover:border-scroll-accent hover:text-scroll-accent"
                }`}
              style={{ fontSize: "9px" }}
            >
              COMPENDIUM
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${isDark ? "text-void-muted" : "text-scroll-muted"
            }`}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-pixel" style={{ fontSize: "7px" }}>SCROLL</span>
          <span className="text-lg">↓</span>
        </motion.div>
      </section>

      {/* ── Party Roster Strip ───────────────────────────── */}
      <section className={`py-10 px-4 border-y ${isDark ? "bg-void-surface/80 border-void-border" : "bg-scroll-surface border-scroll-border"}`}>
        <div className="max-w-3xl mx-auto">
          <p className={`font-pixel text-center mb-6 ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
            ◈ THE FIVE OATHBOUND ◈
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {heroRoster.map((hero) => (
              <Link
                key={hero.id}
                to={`/profile/${hero.id}`}
                className={`flex flex-col items-center gap-2 group transition-all duration-200`}
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center border-2 transition-all duration-200 group-hover:scale-105 overflow-hidden ${isDark ? "bg-void-card border-void-border group-hover:border-opacity-100" : "bg-scroll-card border-scroll-border"
                    }`}
                  style={{ borderColor: hero.color + "60" }}
                >
                  <img 
                    src={hero.icon} 
                    alt={hero.label} 
                    className="w-full h-full object-cover" 
                    style={{ imageRendering: "pixelated" }} 
                  />
                </div>
                <span
                  className={`font-pixel ${isDark ? "text-void-muted group-hover:text-void-text" : "text-scroll-muted group-hover:text-scroll-text"}`}
                  style={{ fontSize: "7px" }}
                >
                  {hero.label.toUpperCase()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trial Preview Section ────────────────────────── */}
      <section className={`py-20 px-4 ${isDark ? "bg-void-surface/50" : "bg-scroll-surface/50"}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span
              className={`font-pixel text-xs mb-4 block ${isDark ? "text-red-400" : "text-scroll-warm"}`}
              style={{ fontSize: "9px" }}
            >
              ◈ OATH CHRONICLE ◈
            </span>
            <h2 className={`font-serif font-bold text-3xl sm:text-4xl ${isDark ? "text-void-text" : "text-scroll-text"}`}>
              The First Three Trials
            </h2>
            <p className={`font-body italic mt-3 ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
              Each trial is more deadly than the last. Begin here.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {previewTrials.map((trial, idx) => (
              <motion.div
                key={trial.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 relative group transition-all duration-300 ${isDark ? "bg-void-card pixel-card-void" : "bg-scroll-card pixel-card-scroll"
                  }`}
              >
                <div
                  className={`font-pixel text-xs mb-3 ${isDark ? "text-red-400" : "text-scroll-warm"}`}
                  style={{ fontSize: "9px" }}
                >
                  TRIAL {String(trial.number).padStart(2, "0")}
                </div>
                <h3 className={`font-serif font-bold text-lg mb-1 ${isDark ? "text-void-text" : "text-scroll-text"}`}>
                  {trial.name}
                </h3>
                <p className={`text-sm mb-3 ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                  Enemy: The Sentinel
                </p>
                <PixelStars count={trial.difficulty} />
                <p className={`mt-3 text-sm font-body leading-relaxed line-clamp-3 ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                  {trial.lore}
                </p>
                <span
                  className={`mt-4 inline-block font-pixel px-2 py-1 text-xs ${isDark
                    ? "bg-emerald-900/40 text-emerald-400 border border-emerald-700/40"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    }`}
                  style={{ fontSize: "8px" }}
                >
                  ✓ AVAILABLE
                </span>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/chronicle"
              className={`font-pixel text-xs border px-6 py-3 inline-block transition-all duration-300 ${isDark
                ? "border-void-border text-void-muted hover:border-red-800 hover:text-red-400"
                : "border-scroll-border text-scroll-muted hover:border-scroll-accent hover:text-scroll-accent"
                }`}
              style={{ fontSize: "9px" }}
            >
              VIEW ALL 10 TRIALS →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Seraphim Spotlight ───────────────────────────── */}
      <section className={`py-20 px-4 ${isDark ? "bg-void-bg" : "bg-scroll-bg"}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span
              className={`font-pixel text-xs mb-4 block ${isDark ? "text-red-400" : "text-scroll-warm"}`}
              style={{ fontSize: "9px" }}
            >
              ✦ FEATURED CHARACTER ✦
            </span>
            <h2 className={`font-serif font-bold text-3xl sm:text-4xl ${isDark ? "text-void-text" : "text-scroll-text"}`}>
              Character Spotlight
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-8 ${isDark ? "bg-void-card pixel-card-void" : "bg-scroll-card pixel-card-scroll"
              }`}
          >
            {isDark && (
              <div className="absolute top-0 right-0 w-64 h-64 opacity-10 rounded-full blur-3xl" style={{ background: "#DC143C" }} />
            )}

            {/* Sprite */}
            <div className="flex flex-col items-center justify-center gap-4 relative z-10">
              <SpriteBox type="character" color={seraphim.spriteColor} size="xl" />
              <span
                className={`font-pixel px-3 py-1 border ${isDark
                  ? "border-red-800 text-red-400 bg-red-900/10"
                  : "border-scroll-accent text-scroll-accent bg-scroll-accent/10"
                  }`}
                style={{ fontSize: "8px" }}
              >
                {seraphim.role.toUpperCase()}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center relative z-10">
              <div className={`font-pixel text-xs mb-1 ${isDark ? "text-red-400" : "text-scroll-warm"}`} style={{ fontSize: "8px" }}>
                {seraphim.title.toUpperCase()}
              </div>
              <h3 className={`font-serif font-black text-4xl mb-2 ${isDark ? "text-void-text glow-text" : "text-scroll-text"}`}>
                {seraphim.name}
              </h3>
              <p className={`font-body text-base italic mb-4 ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                {seraphim.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-5">
                <span className={`font-pixel px-2 py-1 border text-xs ${isDark ? "border-void-border text-void-muted" : "border-scroll-border text-scroll-muted"}`} style={{ fontSize: "7px" }}>
                  WEAPON: {seraphim.weapon.toUpperCase()}
                </span>
              </div>

              {/* Stat bars */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                {Object.entries(seraphim.stats).map(([stat, val]) => (
                  <div key={stat} className="text-center">
                    <div className={`font-pixel mb-1 ${isDark ? "text-red-400" : "text-scroll-accent"}`} style={{ fontSize: "14px" }}>
                      {val}
                    </div>
                    <div className={`font-pixel uppercase ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "7px" }}>
                      {stat.slice(0, 3)}
                    </div>
                    <div className={`h-1 mt-1 ${isDark ? "bg-void-border" : "bg-scroll-border"}`}>
                      <div
                        className="h-full transition-all"
                        style={{ width: `${val}%`, background: "#DC143C" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/profile/seraphim"
                className={`font-pixel px-6 py-3 self-start transition-all duration-300 ${isDark
                  ? "bg-red-900 text-red-200 hover:bg-red-800 border border-red-700"
                  : "bg-scroll-accent text-white hover:bg-scroll-warm"
                  }`}
                style={{ fontSize: "9px" }}
              >
                VIEW FULL PROFILE →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Malakor Warning Banner ───────────────────────── */}
      <section
        className={`py-12 px-4 border-t ${isDark ? "bg-red-950/20 border-red-900/30" : "bg-amber-50 border-amber-200"
          }`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p
            className={`font-pixel mb-3 ${isDark ? "text-red-500" : "text-amber-700"}`}
            style={{ fontSize: "9px" }}
          >
            ⚠ LORD MALAKOR — TRIAL X ⚠
          </p>
          <p className={`font-serif text-lg italic ${isDark ? "text-red-300/80" : "text-amber-900"}`}>
            "Survive the Ten Trials, and the Squire shall be freed. Fail, and your names shall be forgotten, lost to the shadows of eternity."
          </p>
          <Link
            to="/profile/lord-malakor"
            className={`mt-6 font-pixel px-5 py-2 border inline-block transition-all duration-300 ${isDark
              ? "border-red-800 text-red-400 hover:bg-red-900/30"
              : "border-amber-600 text-amber-700 hover:bg-amber-100"
              }`}
            style={{ fontSize: "8px" }}
          >
            VIEW THE ANTAGONIST →
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}