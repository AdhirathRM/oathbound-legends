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
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    username: "",
    oathStatus: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        navigate("/");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, username, oath_status")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setUserData({
          id: profile.id,
          email: session.user.email,
          username: profile.username,
          oathStatus: profile.oath_status,
        });
        setNewUsername(profile.username);
      }

      setLoading(false);
    }

    fetchProfile();
  }, [navigate]);

  const handleUpdateUsername = async () => {
    if (!newUsername.trim() || newUsername === userData.username) {
      setIsEditing(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ username: newUsername.trim() })
      .eq("id", userData.id);

    if (!error) {
      setUserData({ ...userData, username: newUsername.trim() });
      setIsEditing(false);
    } else {
      alert("Error updating alias. It might already be taken.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "WARNING: This will strike your name from the archives forever. All progress and lore entries will be lost. Proceed?"
    );

    if (confirmed) {
      setLoading(true);
      // Delete profile data first
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", userData.id);

      if (!profileError) {
        await supabase.auth.signOut();
        navigate("/");
      } else {
        setLoading(false);
        alert("Failed to delete records from the archive.");
      }
    }
  };

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
                {/* Username Section */}
                <div>
                  <h3 className={`font-pixel text-xs mb-2 ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
                    ARCHIVE ALIAS
                  </h3>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className={`flex-1 px-3 py-1 font-body text-lg outline-none border ${
                          isDark 
                            ? "bg-void-bg border-red-900 text-void-text" 
                            : "bg-white border-scroll-accent text-scroll-text"
                        }`}
                      />
                      <button 
                        onClick={handleUpdateUsername}
                        className="font-pixel px-3 text-emerald-500 hover:text-emerald-400"
                        style={{ fontSize: "10px" }}
                      >
                        [SAVE]
                      </button>
                      <button 
                        onClick={() => { setIsEditing(false); setNewUsername(userData.username); }}
                        className="font-pixel px-3 text-red-500 hover:text-red-400"
                        style={{ fontSize: "10px" }}
                      >
                        [X]
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className={`font-body text-lg ${isDark ? "text-void-text" : "text-scroll-text"}`}>
                        {userData.username}
                      </p>
                      <button 
                        onClick={() => setIsEditing(true)}
                        className={`font-pixel text-[8px] hover:underline ${isDark ? "text-red-400" : "text-scroll-accent"}`}
                      >
                        EDIT ALIAS
                      </button>
                    </div>
                  )}
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

                {/* Action Buttons */}
                <div className={`pt-6 mt-6 border-t flex flex-col gap-3 ${isDark ? "border-void-border" : "border-scroll-border"}`}>
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

                  <button
                    onClick={handleDeleteAccount}
                    className={`font-pixel w-full block text-center py-2 transition-all duration-300 ${
                      isDark
                        ? "text-red-900 hover:text-red-600"
                        : "text-red-300 hover:text-red-700"
                    }`}
                    style={{ fontSize: "7px" }}
                  >
                    FORSAKE OATH & DELETE ACCOUNT
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