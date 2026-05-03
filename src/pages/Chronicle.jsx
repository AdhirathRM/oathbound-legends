import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import PixelStars from "../components/PixelStars";
import { useTheme } from "../hooks/useTheme";
import { trials, elementColors } from "../data/trials";
import { supabase } from "../lib/supabase";

export default function Chronicle() {
  const { theme } = useTheme();
  const isDark = theme === "void";

  // Database States
  const [session, setSession] = useState(null);
  const [unlockedTrial, setUnlockedTrial] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // 1. Fetch current progress on mount
    const fetchProgress = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session) {
        const { data } = await supabase
          .from("user_progress")
          .select("unlocked_trial")
          .eq("user_id", session.user.id)
          .single();
          
        if (data) setUnlockedTrial(data.unlocked_trial);
      }
    };
    
    fetchProgress();

    // 2. Listen for login/logout events to instantly update the UI
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        supabase.from("user_progress").select("unlocked_trial").eq("user_id", session.user.id).single().then(({data}) => {
           if(data) setUnlockedTrial(data.unlocked_trial);
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const advanceTrial = async (currentNumber) => {
    if (!session) return;
    setIsUpdating(true);
    
    const nextNumber = currentNumber + 1;
    
    // Update Supabase
    const { error } = await supabase
      .from("user_progress")
      .update({ unlocked_trial: nextNumber, last_updated: new Date().toISOString() })
      .eq("user_id", session.user.id);
    
    if (!error) {
      setUnlockedTrial(nextNumber);
    } else {
      console.error("Failed to update progress:", error);
    }
    
    setIsUpdating(false);
  };

  const resetProgress = async () => {
    if (!session) return;
    setIsUpdating(true);
    
    // Reset to Trial 1 in Supabase
    const { error } = await supabase
      .from("user_progress")
      .update({ unlocked_trial: 1, last_updated: new Date().toISOString() })
      .eq("user_id", session.user.id);
    
    if (!error) {
      setUnlockedTrial(1);
    } else {
      console.error("Failed to reset progress:", error);
    }
    
    setIsUpdating(false);
  };

  return (
    <PageTransition>
      <div className={`min-h-screen py-16 px-4 ${isDark ? "bg-void-bg" : "bg-scroll-bg"}`}>
        <div className="max-w-4xl mx-auto">

          {/* ── Header ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <span
              className={`font-pixel text-xs mb-4 block ${isDark ? "text-red-400" : "text-scroll-warm"}`}
              style={{ fontSize: "9px" }}
            >
              ◈ THE OATH CHRONICLE ◈
            </span>
            <h1
              className={`font-serif font-black mb-4 ${isDark ? "text-void-text glow-text" : "text-scroll-text"}`}
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              The Ten Trials
            </h1>
          </motion.div>

          {/* ── Story Block ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={`mb-14 p-6 border-l-4 ${
              isDark
                ? "border-red-800 bg-red-950/20"
                : "border-scroll-accent bg-scroll-surface"
            }`}
          >
            <p className={`font-body italic text-base leading-relaxed mb-3 ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
              Five heroes bound by oath stand at the precipice of destiny. For years, they have trained, prepared, and honed their skills. But no trial could have prepared them for this moment.
            </p>
            <p className={`font-body italic text-base leading-relaxed mb-3 ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
              <span className={`not-italic font-serif font-bold ${isDark ? "text-red-300" : "text-scroll-text"}`}>Lord Malakor</span>, the Vampire Lord of the Eternal Night, has seized the Squire — their loyal companion, their heart. From his obsidian fortress beyond the mortal veil, he has issued a dark challenge: survive the Ten Trials, and the Squire shall be freed. Fail, and their names shall be forgotten, lost to the shadows of eternity.
            </p>
            <p className={`font-body italic text-sm ${isDark ? "text-void-muted/70" : "text-scroll-muted/70"}`}>
              The clock is ticking. The trials await. Each one is more deadly than the last, designed to break the spirit and shatter the body.
            </p>
          </motion.div>

          {/* ── Guest Prompt Banner ──────────────────────── */}
          {!session && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`mb-10 p-5 border-2 border-dashed flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isDark ? "border-void-border bg-void-card/30" : "border-scroll-border bg-scroll-surface"
              }`}
            >
              <div>
                <p className={`font-pixel text-xs mb-2 ${isDark ? "text-red-400" : "text-scroll-accent"}`} style={{ fontSize: "8px" }}>
                  ◈ GUEST ARCHIVIST ◈
                </p>
                <p className={`font-serif italic ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                  The records are open for study. Sign in to forge your own path and track your progress against the Sentinels.
                </p>
              </div>
              <Link
                to="/"
                className={`font-pixel flex-shrink-0 px-4 py-3 border transition-all ${
                  isDark ? "border-void-border text-void-muted hover:border-red-800 hover:text-red-400" : "border-scroll-border text-scroll-muted hover:border-scroll-accent hover:text-scroll-accent"
                }`}
                style={{ fontSize: "8px" }}
              >
                SIGN IN →
              </Link>
            </motion.div>
          )}

          {/* ── Sentinel Note ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className={`mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 py-3 border ${
              isDark ? "border-void-border/50 bg-void-card/40" : "border-scroll-border bg-scroll-surface"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: "#E0E8FF", boxShadow: "0 0 6px #E0E8FF" }} />
              <p className={`font-body text-sm ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                <span className={`font-serif font-bold not-italic ${isDark ? "text-void-text" : "text-scroll-text"}`}>The Sentinel</span> — fallen knights bound to Malakor's will — guard Trials I through IX.
              </p>
            </div>
            <Link
              to="/profile/sentinel"
              className={`font-pixel flex-shrink-0 px-3 py-1 border transition-all self-start sm:self-auto ${
                isDark ? "border-void-border text-void-muted hover:border-void-accent hover:text-void-glow" : "border-scroll-border text-scroll-muted hover:border-scroll-accent"
              }`}
              style={{ fontSize: "7px" }}
            >
              VIEW SENTINEL →
            </Link>
          </motion.div>

          {/* ── Victory Banner ───────────────────────────── */}
          {session && unlockedTrial > 10 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mb-12 p-6 border-2 text-center relative overflow-hidden ${
                isDark ? "border-emerald-800 bg-emerald-950/20" : "border-emerald-400 bg-emerald-50"
              }`}
            >
              {isDark && <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)] pointer-events-none" />}
              <h2 className={`relative z-10 font-serif font-black text-2xl md:text-3xl mb-3 ${isDark ? "text-emerald-400 glow-text" : "text-emerald-700"}`}>
                THE OATH IS FULFILLED
              </h2>
              <p className={`relative z-10 font-pixel text-xs leading-relaxed ${isDark ? "text-emerald-500/80" : "text-emerald-600"}`} style={{ fontSize: "9px" }}>
                LORD MALAKOR IS DEFEATED. LEO IS FREE. <br className="hidden sm:block"/>
                YOU ARE FOREVER A LEGEND OF THE ARCHIVES.
              </p>
            </motion.div>
          )}

          {/* ── Progress Reset Control ──────────────────── */}
          {session && unlockedTrial > 1 && (
            <div className="flex justify-end mb-6">
              <button
                onClick={resetProgress}
                disabled={isUpdating}
                className={`font-pixel px-4 py-2 border transition-all ${
                  isDark ? "border-red-900/40 text-red-500/70 hover:text-red-400 hover:bg-red-950/30 disabled:opacity-50" : "border-red-200 text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
                }`}
                style={{ fontSize: "7px" }}
              >
                {isUpdating ? "REWEAVING TIME..." : "↺ REWIND THE CHRONICLE (RESET)"}
              </button>
            </div>
          )}

          {/* ── Timeline ────────────────────────────────── */}
          <div className="relative">
            {/* Central line */}
            <div
              className={`absolute left-6 sm:left-1/2 top-0 bottom-0 w-px -translate-x-px ${
                isDark
                  ? "bg-gradient-to-b from-red-800 via-void-border to-transparent"
                  : "bg-gradient-to-b from-scroll-accent via-scroll-border to-transparent"
              }`}
            />

            <div className="space-y-8">
              {trials.map((trial, idx) => {
                const isFinal = trial.isFinal;
                
                // If there's no session, everything is available and unlocked
                const isLocked = session ? trial.number > unlockedTrial : false;
                const isCompleted = session ? trial.number < unlockedTrial : false;
                const isCurrent = session ? trial.number === unlockedTrial : false;
                
                const elColor = elementColors[trial.element] || elementColors.Stone;
                const isRight = idx % 2 === 0;

                return (
                  <motion.div
                    key={trial.id}
                    initial={{ opacity: 0, x: isRight ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className={`relative flex items-start gap-4 sm:gap-0 ${isRight ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-6 sm:left-1/2 w-4 h-4 -translate-x-1/2 mt-6 z-10 transition-colors duration-500 ${
                        isLocked
                          ? isDark ? "bg-void-border border border-void-border" : "bg-scroll-border border border-scroll-border"
                          : isCompleted
                          ? isDark ? "bg-emerald-800 border border-emerald-600 shadow-[0_0_6px_rgba(4,120,87,0.4)]" : "bg-emerald-500 border border-emerald-600"
                          : isFinal
                          ? "bg-red-700 shadow-[0_0_12px_rgba(139,0,0,0.8)]"
                          : isDark
                          ? "bg-red-900 border border-red-700 shadow-[0_0_6px_rgba(185,28,28,0.4)]"
                          : "bg-scroll-accent"
                      }`}
                    />

                    {/* Spacer */}
                    <div className="hidden sm:block sm:w-1/2" />

                    {/* Card */}
                    <div className={`ml-12 sm:ml-0 sm:w-[46%] relative ${isRight ? "sm:mr-auto sm:pr-8" : "sm:ml-auto sm:pl-8"}`}>
                      <div
                        className={`p-6 relative transition-all duration-300 group ${
                          isFinal
                            ? isDark
                              ? "bg-void-card border border-red-900/60 overflow-hidden"
                              : "bg-scroll-card border-2 border-red-700"
                            : isLocked
                            ? isDark
                              ? "bg-void-card/50 border border-void-border/50 opacity-60"
                              : "bg-scroll-card/50 border border-scroll-border/50 opacity-60"
                            : isDark
                            ? "bg-void-card pixel-card-void"
                            : "bg-scroll-card pixel-card-scroll"
                        } ${isFinal ? "sm:p-8" : ""}`}
                        style={
                          isFinal && isDark
                            ? { background: "linear-gradient(135deg, rgba(139,0,0,0.15), rgba(30,0,0,0.3))" }
                            : {}
                        }
                      >
                        {/* Final Trial banner */}
                        {isFinal && (
                          <div
                            className={`font-pixel text-xs mb-4 text-center py-2 border ${
                              isDark
                                ? "border-red-800/60 text-red-400 bg-red-950/40"
                                : "border-red-600/40 text-red-700 bg-red-50"
                            }`}
                            style={{ fontSize: "8px" }}
                          >
                            ★ FINAL TRIAL — LORD MALAKOR AWAITS ★
                          </div>
                        )}

                        {/* Lock icon */}
                        {isLocked && (
                          <div className="absolute top-4 right-4 z-10">
                            <span className={`text-xl ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>🔒</span>
                          </div>
                        )}
                        
                        {/* Completed icon */}
                        {isCompleted && (
                          <div className="absolute top-4 right-4 z-10">
                            <span className={`text-xl ${isDark ? "text-emerald-800/80" : "text-emerald-400/80"}`}>✓</span>
                          </div>
                        )}

                        {/* Trial number + element */}
                        <div
                          className={`font-pixel text-xs mb-2 ${
                            isFinal
                              ? isDark ? "text-red-400" : "text-red-700"
                              : isDark ? "text-red-500/80" : "text-scroll-warm"
                          }`}
                          style={{ fontSize: "9px" }}
                        >
                          TRIAL {String(trial.number).padStart(2, "0")} — {trial.element.toUpperCase()}
                        </div>

                        {/* Trial name */}
                        <h2
                          className={`font-serif font-bold mb-1 ${
                            isFinal
                              ? isDark ? "text-red-200 text-2xl sm:text-3xl" : "text-red-900 text-2xl"
                              : `text-xl ${isDark ? "text-void-text" : "text-scroll-text"}`
                          }`}
                        >
                          {trial.name}
                        </h2>

                        {/* Enemy + difficulty */}
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <Link
                            to={`/profile/${trial.enemyId}`}
                            className={`font-body italic text-sm transition-all ${
                              isDark ? "text-void-muted hover:text-void-glow" : "text-scroll-muted hover:text-scroll-accent"
                            }`}
                          >
                            {isFinal ? "⚔ " : "Enemy: "}{trial.enemy}
                          </Link>
                          <PixelStars count={trial.difficulty} />
                        </div>

                        {/* Region badge */}
                        <div className="mb-3">
                          <span
                            className="font-pixel text-xs px-2 py-0.5 border inline-block"
                            style={{
                              fontSize: "7px",
                              backgroundColor: elColor.bg,
                              borderColor: `${elColor.border}40`,
                              color: isDark ? elColor.text : undefined,
                            }}
                          >
                            {trial.region}
                          </span>
                        </div>

                        {/* Lore */}
                        <p
                          className={`font-body leading-relaxed text-sm mb-4 transition-colors ${
                            isLocked
                              ? isDark ? "text-void-muted/60" : "text-scroll-muted/60"
                              : isDark ? "text-void-muted" : "text-scroll-muted"
                          } ${isFinal ? "text-base" : ""}`}
                        >
                          {isLocked ? trial.lore.slice(0, 80) + "... The oath is not yet fulfilled." : trial.lore}
                        </p>

                        {/* Status + Actions */}
                        <div className="flex items-center gap-3 flex-wrap">
                          <span
                            className={`font-pixel px-3 py-1 inline-block transition-colors ${
                              isLocked
                                ? isDark
                                  ? "bg-void-border/40 text-void-muted border border-void-border/40"
                                  : "bg-scroll-border/30 text-scroll-muted border border-scroll-border"
                                : isCompleted
                                ? isDark
                                  ? "bg-emerald-950/60 text-emerald-500 border border-emerald-800/40"
                                  : "bg-emerald-50 text-emerald-700 border border-emerald-300"
                                : isFinal && !session
                                ? isDark
                                  ? "bg-red-950/60 text-red-400 border border-red-800/40"
                                  : "bg-red-100 text-red-800 border border-red-400"
                                : isDark
                                ? session && isCurrent ? "bg-void-accent/20 text-void-glow border border-void-accent/40" : "bg-emerald-900/40 text-emerald-400 border border-emerald-700/40"
                                : session && isCurrent ? "bg-scroll-accent/10 text-scroll-accent border border-scroll-accent/30" : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            }`}
                            style={{ fontSize: "8px" }}
                          >
                            {isLocked ? "🔒 LOCKED" : isCompleted ? "✓ COMPLETED" : isFinal ? "⚔ FINAL TRIAL" : session && isCurrent ? "⚠ CURRENT TRIAL" : "✓ AVAILABLE"}
                          </span>

                          {!isLocked && (
                            <>
                              <Link
                                to={`/profile/${trial.enemyId}`}
                                className={`font-pixel text-xs transition-all ${
                                  isDark
                                    ? "text-void-muted hover:text-red-400"
                                    : "text-scroll-muted hover:text-scroll-accent"
                                }`}
                                style={{ fontSize: "7px" }}
                              >
                                VIEW ENEMY →
                              </Link>
                              
                              {isCurrent && (
                                <button
                                  onClick={() => advanceTrial(trial.number)}
                                  disabled={isUpdating}
                                  className={`font-pixel px-3 py-1 border transition-all ml-auto sm:ml-0 ${
                                    isDark
                                      ? "border-emerald-700/50 text-emerald-400 hover:bg-emerald-900/40 disabled:opacity-50"
                                      : "border-emerald-400 text-emerald-700 hover:bg-emerald-50 disabled:opacity-50"
                                  }`}
                                  style={{ fontSize: "7px" }}
                                >
                                  {isUpdating ? "FIGHTING..." : isFinal ? "DEFEAT MALAKOR ⚔" : "DEFEAT SENTINEL ⚔"}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Footer CTA ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`mt-16 text-center p-8 border ${
              isDark ? "border-red-900/40 bg-red-950/10" : "border-amber-300 bg-amber-50"
            }`}
          >
            <p className={`font-pixel mb-2 ${isDark ? "text-red-400" : "text-amber-700"}`} style={{ fontSize: "8px" }}>
              ⚠ EVERY TRIAL STANDS BETWEEN YOU AND LEO ⚠
            </p>
            <p className={`font-serif italic mb-5 ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
              The Sentinels do not sleep. Lord Malakor does not wait.
            </p>
            <Link
              to="/compendium"
              className={`font-pixel px-6 py-3 border inline-block transition-all ${
                isDark
                  ? "border-red-800 text-red-400 hover:bg-red-900/30"
                  : "border-scroll-accent text-scroll-accent hover:bg-scroll-accent hover:text-white"
              }`}
              style={{ fontSize: "9px" }}
            >
              STUDY THE COMPENDIUM →
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}