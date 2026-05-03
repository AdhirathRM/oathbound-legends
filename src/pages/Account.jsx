import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { useTheme } from "../hooks/useTheme";
import { supabase } from "../lib/supabase";

export default function Account() {
  const { theme } = useTheme();
  const isDark = theme === "void";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    oathStatus: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      // 1. Get the current active user session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        // If no one is logged in, send them back to the login page
        navigate("/");
        return;
      }

      // 2. Fetch the custom profile data we created with our SQL trigger
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("username, oath_status")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setUserData({
          email: session.user.email,
          username: profile.username,
          oathStatus: profile.oath_status,
        });
      }

      setLoading(false);
    }

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <PageTransition>
      <div className={`min-h-screen py-16 px-4 ${isDark ? "bg-void-bg" : "bg-scroll-bg"}`}>
        <div className="max-w-2xl mx-auto">
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
              ◈ ARCHIVIST PROFILE ◈
            </span>
            <h1
              className={`font-serif font-black mb-4 ${isDark ? "text-void-text glow-text" : "text-scroll-text"}`}
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Your Account
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`p-8 ${isDark ? "bg-void-card pixel-card-void" : "bg-scroll-card pixel-card-scroll"}`}
          >
            {loading ? (
              <div className={`text-center font-pixel text-xs py-10 ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                READING ARCHIVES...
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className={`font-pixel text-xs mb-2 ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
                    ARCHIVE ALIAS
                  </h3>
                  <p className={`font-body text-lg ${isDark ? "text-void-text" : "text-scroll-text"}`}>
                    {userData.username}
                  </p>
                </div>
                
                <div>
                  <h3 className={`font-pixel text-xs mb-2 ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
                    EMAIL ADDRESS
                  </h3>
                  <p className={`font-body text-lg ${isDark ? "text-void-text" : "text-scroll-text"}`}>
                    {userData.email}
                  </p>
                </div>

                <div>
                  <h3 className={`font-pixel text-xs mb-2 ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
                    OATH STATUS
                  </h3>
                  <span className={`font-pixel px-3 py-1 inline-block ${
                    isDark ? "bg-emerald-900/40 text-emerald-400 border border-emerald-700/40" : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  }`} style={{ fontSize: "8px" }}>
                    ✓ {userData.oathStatus}
                  </span>
                </div>

                <div className={`pt-6 mt-6 border-t ${isDark ? "border-void-border" : "border-scroll-border"}`}>
                  <button
                    onClick={handleLogout}
                    className={`font-pixel w-full block text-center py-4 transition-all duration-300 ${
                      isDark
                        ? "bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-800/50"
                        : "bg-scroll-surface text-red-700 hover:bg-red-50 border border-red-200"
                    }`}
                    style={{ fontSize: "9px" }}
                  >
                    LOG OUT
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}