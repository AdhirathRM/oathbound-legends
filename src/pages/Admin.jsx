import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import PageTransition from "../components/PageTransition";
import { useTheme } from "../hooks/useTheme";

export default function Admin() {
  const { theme } = useTheme();
  const isDark = theme === "void";
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Data States
  const [profiles, setProfiles] = useState([]);
  const [comments, setComments] = useState([]);
  const [lore, setLore] = useState([]);

  useEffect(() => {
    async function checkAdminAndFetch() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .single();

      if (!profile?.is_admin) {
        navigate("/account"); // Kick non-admins out
        return;
      }

      setIsAdmin(true);
      fetchAdminData();
    }

    checkAdminAndFetch();
  }, [navigate]);

  const fetchAdminData = async () => {
    setLoading(true);
    const [p, c, l] = await Promise.all([
      supabase.from("profiles").select("*"),
      supabase.from("comments").select("*, profiles(username)"),
      supabase.from("lore_entries").select("*, profiles(username)")
    ]);
    
    setProfiles(p.data || []);
    setComments(c.data || []);
    setLore(l.data || []);
    setLoading(false);
  };

  const deleteItem = async (table, id) => {
    if (!window.confirm(`Are you sure you want to banish this ${table} entry forever?`)) return;
    
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (!error) fetchAdminData();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-pixel">ACCESSING FORBIDDEN ARCHIVES...</div>;

  return (
    <PageTransition>
      <div className={`min-h-screen py-16 px-4 ${isDark ? "bg-void-bg text-void-text" : "bg-scroll-bg text-scroll-text"}`}>
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif font-black text-4xl mb-10 text-red-600 uppercase tracking-widest">Administrator Oversight</h1>

          {/* Profiles Section */}
          <section className="mb-12">
            <h2 className="font-pixel text-xs mb-4 text-red-400">◈ ACTIVE ARCHIVISTS</h2>
            <div className="overflow-x-auto">
              <table className={`w-full text-left border ${isDark ? "border-void-border" : "border-scroll-border"}`}>
                <thead className={isDark ? "bg-void-card" : "bg-scroll-surface"}>
                  <tr className="font-pixel text-[8px]">
                    <th className="p-4">USERNAME</th>
                    <th className="p-4">STATUS</th>
                    <th className="p-4">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="font-body text-sm">
                  {profiles.map(p => (
                    <tr key={p.id} className="border-t border-void-border/30">
                      <td className="p-4">{p.username} {p.is_admin && "(DEV)"}</td>
                      <td className="p-4 text-emerald-500">{p.oath_status}</td>
                      <td className="p-4">
                        {!p.is_admin && (
                          <button onClick={() => deleteItem('profiles', p.id)} className="text-red-500 hover:underline">BANISH</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Moderation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Comments Moderation */}
            <section>
              <h2 className="font-pixel text-xs mb-4 text-red-400">◈ STRATEGY MODERATION</h2>
              <div className="space-y-4">
                {comments.map(c => (
                  <div key={c.id} className={`p-4 border ${isDark ? "bg-void-card border-void-border" : "bg-scroll-card border-scroll-border"}`}>
                    <p className="text-xs font-pixel mb-1 text-red-500/70">{c.profiles?.username}</p>
                    <p className="text-sm italic mb-3">"{c.content}"</p>
                    <button onClick={() => deleteItem('comments', c.id)} className="font-pixel text-[8px] text-red-500">DELETE COMMENT</button>
                  </div>
                ))}
              </div>
            </section>

            {/* Lore Moderation */}
            <section>
              <h2 className="font-pixel text-xs mb-4 text-red-400">◈ LORE MODERATION</h2>
              <div className="space-y-4">
                {lore.map(l => (
                  <div key={l.id} className={`p-4 border ${isDark ? "bg-void-card border-void-border" : "bg-scroll-card border-scroll-border"}`}>
                    <p className="text-xs font-pixel mb-1 text-red-500/70">{l.profiles?.username}</p>
                    <p className="font-bold mb-1">{l.title}</p>
                    <button onClick={() => deleteItem('lore_entries', l.id)} className="font-pixel text-[8px] text-red-500">DELETE ENTRY</button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}