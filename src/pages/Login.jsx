import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { useTheme } from "../hooks/useTheme";
import { supabase } from "../lib/supabase";

export default function Login() {
  const { theme } = useTheme();
  const isDark = theme === "void";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      console.log("Login successful:", data);
      navigate("/home");
    }
  };

  return (
    <PageTransition>
      <div className={`min-h-screen flex items-center justify-center py-16 px-4 ${isDark ? "bg-void-bg" : "bg-scroll-bg"}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`w-full max-w-md p-8 sm:p-10 ${
            isDark ? "bg-void-card pixel-card-void" : "bg-scroll-card pixel-card-scroll"
          }`}
        >
          <div className="text-center mb-8">
            <span
              className={`font-pixel text-xs mb-3 block ${isDark ? "text-red-400" : "text-scroll-warm"}`}
              style={{ fontSize: "9px" }}
            >
              ◈ THE GATES OPEN ◈
            </span>
            <h1 className={`font-serif font-black text-3xl ${isDark ? "text-void-text glow-text" : "text-scroll-text"}`}>
              Return to the Oath
            </h1>
          </div>

          {error && (
            <div className={`font-pixel text-xs mb-4 p-3 border ${isDark ? "bg-red-950/50 text-red-400 border-red-800" : "bg-red-100 text-red-800 border-red-300"}`} style={{ fontSize: "8px" }}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block font-pixel text-xs mb-2 ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 font-body text-sm border outline-none transition-all duration-200 ${
                  isDark
                    ? "bg-void-bg border-void-border text-void-text focus:border-red-800"
                    : "bg-scroll-surface border-scroll-border text-scroll-text focus:border-scroll-accent"
                }`}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className={`block font-pixel text-xs mb-2 ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
                PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 font-body text-sm border outline-none transition-all duration-200 ${
                  isDark
                    ? "bg-void-bg border-void-border text-void-text focus:border-red-800"
                    : "bg-scroll-surface border-scroll-border text-scroll-text focus:border-scroll-accent"
                }`}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-pixel py-4 mt-4 transition-all duration-300 ${
                isDark
                  ? "bg-red-900 text-red-200 hover:bg-red-800 border border-red-700 disabled:opacity-50"
                  : "bg-scroll-accent text-white hover:bg-scroll-warm disabled:opacity-50"
              }`}
              style={{ fontSize: "9px" }}
            >
              {loading ? "VERIFYING..." : "ENTER ARCHIVES →"}
            </button>
          </form>

          <div className={`mt-8 text-center font-body text-sm ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
            Have you not sworn the oath?{" "}
            <Link
              to="/signup"
              className={`font-bold transition-colors ${
                isDark ? "text-red-400 hover:text-red-300" : "text-scroll-accent hover:text-scroll-warm"
              }`}
            >
              Sign up here.
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}