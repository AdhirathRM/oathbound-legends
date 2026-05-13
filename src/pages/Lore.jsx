import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { useTheme } from "../hooks/useTheme";
import { blogs as staticBlogs } from "../data/blogs";
import { supabase } from "../lib/supabase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Lore() {
  const { theme } = useTheme();
  const isDark = theme === "void";

  const [session, setSession] = useState(null);
  const [dynamicBlogs, setDynamicBlogs] = useState([]);
  const [popularLore, setPopularLore] = useState([]);
  
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("LORE");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    fetchDynamicLore();
    fetchPopularLore(); // Fetch from our new Express route!

    return () => subscription.unsubscribe();
  }, []);

  const fetchPopularLore = async () => {
    try {
      const res = await fetch(`${API_URL}/api/lore/popular`);
      if (res.ok) {
        const data = await res.json();
        const formatted = data.map(entry => ({
          id: entry.id,
          slug: entry.slug,
          title: entry.title,
          author: entry.profiles?.username || "Unknown Archivist",
          date: new Date(entry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          tag: entry.tag,
          banner: entry.banner,
          excerpt: entry.excerpt,
          views: entry.view_count || 0
        }));
        setPopularLore(formatted);
      }
    } catch (err) {
      console.error("Failed to fetch popular lore", err);
    }
  };

  const fetchDynamicLore = async () => {
    const { data, error } = await supabase
      .from("lore_entries")
      .select("*, profiles(username)")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const formatted = data.map(entry => ({
        id: entry.id,
        user_id: entry.user_id,
        slug: entry.slug,
        title: entry.title,
        author: entry.profiles?.username || "Unknown Archivist",
        date: new Date(entry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        tag: entry.tag,
        banner: entry.banner,
        excerpt: entry.excerpt,
        content: entry.content,
        views: entry.view_count || 0
      }));
      setDynamicBlogs(formatted);
    }
  };

  const handleLoreSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !session) return;

    setIsSubmitting(true);

    const paragraphs = content.split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 0);
    const excerpt = paragraphs[0].length > 100 ? paragraphs[0].substring(0, 100) + "..." : paragraphs[0];
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 10000);

    let bannerUrl = "/lore.png";
    if (tag === "STRATEGY") bannerUrl = "/strategy.png";
    if (tag === "UPDATE") bannerUrl = "/dev.png";

    const { error } = await supabase.from("lore_entries").insert([
      {
        user_id: session.user.id,
        title: title.trim(),
        slug: slug,
        excerpt: excerpt,
        content: paragraphs,
        tag: tag,
        banner: bannerUrl 
      }
    ]);

    if (!error) {
      setTitle("");
      setTag("LORE");
      setContent("");
      fetchDynamicLore(); 
    } else {
      console.error("Error submitting lore:", error);
    }

    setIsSubmitting(false);
  };

  const handleDeleteLore = async (e, id) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    const confirmDelete = window.confirm("Are you sure you want to strike this entry from the archives?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("lore_entries").delete().eq("id", id);
    if (!error) {
      fetchDynamicLore(); 
      fetchPopularLore();
    } else {
      console.error("Error deleting lore:", error);
    }
  };

  const allBlogs = [...dynamicBlogs, ...staticBlogs];

  return (
    <PageTransition>
      <div className={`min-h-screen py-16 px-4 ${isDark ? "bg-void-bg" : "bg-scroll-bg"}`}>
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className={`font-pixel text-xs mb-4 block ${isDark ? "text-red-400" : "text-scroll-warm"}`} style={{ fontSize: "9px" }}>
              ◈ THE CHRONICLES ◈
            </span>
            <h1 className={`font-serif font-black mb-4 ${isDark ? "text-void-text glow-text" : "text-scroll-text"}`} style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Lore & Logs
            </h1>
            <p className={`font-body italic text-lg max-w-xl mx-auto ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
              Tales of the trials, strategies of the fallen, and records of the realm.
            </p>
          </motion.div>

          {/* MOST POPULAR SECTION (EXPRESS DRIVEN) */}
          {popularLore.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <div className={`h-px flex-1 ${isDark ? "bg-void-border" : "bg-scroll-border"}`} />
                <h2 className={`font-pixel text-lg ${isDark ? "text-amber-500" : "text-amber-700"}`}>◈ MOST POPULAR ARCHIVES ◈</h2>
                <div className={`h-px flex-1 ${isDark ? "bg-void-border" : "bg-scroll-border"}`} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularLore.map((blog, idx) => (
                  <motion.div
                    key={`pop-${blog.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`group flex flex-col transition-all duration-300 overflow-hidden cursor-pointer border-2 ${
                      isDark ? "bg-void-card border-amber-900/50 hover:border-amber-500" : "bg-scroll-card border-amber-200 hover:border-amber-500"
                    }`}
                  >
                    <Link to={`/lore/${blog.slug}`} className="flex flex-col h-full p-5">
                      <div className="flex justify-between items-start mb-3">
                        <span className={`font-pixel px-2 py-1 text-xs border ${
                          isDark ? "bg-amber-900/40 text-amber-400 border-amber-800" : "bg-amber-100 text-amber-800 border-amber-300"
                        }`} style={{ fontSize: "8px" }}>
                          {blog.tag}
                        </span>
                        <span className={`font-pixel text-xs ${isDark ? "text-amber-500/70" : "text-amber-700/70"}`} style={{ fontSize: "8px" }}>
                          👁 {blog.views} VIEWS
                        </span>
                      </div>
                      <h3 className={`font-serif font-bold text-xl leading-tight mb-2 ${isDark ? "text-void-text" : "text-scroll-text"}`}>
                        {blog.title}
                      </h3>
                      <p className={`font-pixel text-xs mb-4 ${isDark ? "text-void-muted/60" : "text-scroll-muted/60"}`} style={{ fontSize: "8px" }}>
                        BY {blog.author}
                      </p>
                      <p className={`font-body text-sm leading-relaxed flex-1 line-clamp-2 ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                        {blog.excerpt}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-8">
             <h2 className={`font-pixel text-lg ${isDark ? "text-red-400" : "text-scroll-accent"}`}>◈ ALL RECORDS ◈</h2>
             <div className={`h-px flex-1 ${isDark ? "bg-void-border" : "bg-scroll-border"}`} />
          </div>

          {/* Grid Layout (All Blogs) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {allBlogs.map((blog, idx) => {
              const isAuthor = session?.user?.id === blog.user_id;

              return (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.1, 0.5) }}
                  className={`group flex flex-col transition-all duration-300 overflow-hidden relative ${
                    isDark ? "bg-void-card pixel-card-void" : "bg-scroll-card pixel-card-scroll"
                  }`}
                >
                  {isAuthor && (
                    <button
                      onClick={(e) => handleDeleteLore(e, blog.id)}
                      className="absolute top-3 right-3 z-20 font-pixel text-white bg-red-900/90 hover:bg-red-600 border border-red-700 px-3 py-1.5 transition-colors shadow-lg"
                      style={{ fontSize: "7px" }}
                      title="Delete Entry"
                    >
                      DELETE
                    </button>
                  )}

                  <Link to={`/lore/${blog.slug}`} className="flex flex-col h-full cursor-pointer">
                    <div className={`h-40 overflow-hidden border-b relative ${isDark ? "border-void-border" : "border-scroll-border"}`}>
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${blog.banner}')`, opacity: isDark ? 0.4 : 0.8 }}
                      />
                      {isDark && <div className="absolute inset-0 bg-void-bg/30" />}
                      
                      <div className="absolute top-3 left-3 z-10 flex gap-2">
                        <span className={`font-pixel px-2 py-1 text-xs border ${
                          isDark ? "bg-red-900/60 text-red-200 border-red-800" : "bg-scroll-accent text-white border-scroll-accent"
                        }`} style={{ fontSize: "8px" }}>
                          {blog.tag}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-pixel text-xs ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
                          BY {blog.author}
                        </span>
                        <div className="flex gap-3">
                          {blog.views !== undefined && (
                            <span className={`font-pixel text-xs ${isDark ? "text-amber-500/70" : "text-amber-700/70"}`} style={{ fontSize: "8px" }}>
                              👁 {blog.views}
                            </span>
                          )}
                          <span className={`font-pixel text-xs ${isDark ? "text-void-muted/60" : "text-scroll-muted/60"}`} style={{ fontSize: "8px" }}>
                            {blog.date}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className={`font-serif font-bold text-xl leading-tight mb-3 transition-colors ${
                        isDark ? "text-void-text group-hover:text-red-400" : "text-scroll-text group-hover:text-scroll-accent"
                      }`}>
                        {blog.title}
                      </h3>
                      
                      <p className={`font-body text-sm leading-relaxed mb-6 flex-1 line-clamp-3 ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                        {blog.excerpt}
                      </p>

                      <div className={`font-pixel text-xs pt-4 border-t transition-colors ${
                        isDark ? "border-void-border text-void-muted group-hover:text-void-text" : "border-scroll-border text-scroll-muted group-hover:text-scroll-text"
                      }`} style={{ fontSize: "8px" }}>
                        READ FULL ENTRY →
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Submission Area */}
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="max-w-3xl mx-auto"
          >
            {session ? (
              <div className={`p-8 border ${isDark ? "bg-void-card border-void-border" : "bg-scroll-surface border-scroll-border"}`}>
                <div className="text-center mb-8">
                  <div className={`font-pixel text-xs mb-2 ${isDark ? "text-red-400" : "text-scroll-accent"}`} style={{ fontSize: "9px" }}>
                    ◈ SCRIBE'S DESK ◈
                  </div>
                  <h2 className={`font-serif text-2xl font-bold ${isDark ? "text-void-text" : "text-scroll-text"}`}>
                    Chronicle Your Journey
                  </h2>
                </div>
                
                <form onSubmit={handleLoreSubmit} className="space-y-5">
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-1">
                      <label className={`block font-pixel text-xs mb-2 ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
                        ENTRY TITLE
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full px-4 py-3 font-body text-sm border outline-none transition-all duration-200 ${
                          isDark
                            ? "bg-void-bg border-void-border text-void-text focus:border-red-800"
                            : "bg-white border-scroll-border text-scroll-text focus:border-scroll-accent"
                        }`}
                        placeholder="The Tale of the Broken Shield..."
                      />
                    </div>
                    <div className="w-full sm:w-48">
                      <label className={`block font-pixel text-xs mb-2 ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
                        CATEGORY TAG
                      </label>
                      <select
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        className={`w-full px-4 py-3 font-body text-sm border outline-none transition-all duration-200 cursor-pointer ${
                          isDark
                            ? "bg-void-bg border-void-border text-void-text focus:border-red-800"
                            : "bg-white border-scroll-border text-scroll-text focus:border-scroll-accent"
                        }`}
                      >
                        <option value="LORE">LORE</option>
                        <option value="STRATEGY">STRATEGY</option>
                        <option value="UPDATE">UPDATE</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block font-pixel text-xs mb-2 ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
                      ENTRY CONTENT (Double enter for new paragraphs)
                    </label>
                    <textarea
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={6}
                      className={`w-full px-4 py-3 font-body text-sm border outline-none transition-all duration-200 resize-y ${
                        isDark
                          ? "bg-void-bg border-void-border text-void-text focus:border-red-800"
                          : "bg-white border-scroll-border text-scroll-text focus:border-scroll-accent"
                      }`}
                      placeholder="Record your findings here..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-pixel py-4 transition-all duration-300 ${
                      isDark
                        ? "bg-red-900 text-red-200 hover:bg-red-800 border border-red-700 disabled:opacity-50"
                        : "bg-scroll-accent text-white hover:bg-scroll-warm disabled:opacity-50"
                    }`}
                    style={{ fontSize: "9px" }}
                  >
                    {isSubmitting ? "SEALING ARCHIVE..." : "PUBLISH TO THE REALM →"}
                  </button>
                </form>
              </div>
            ) : (
              <div className={`p-8 border-2 border-dashed text-center ${
                isDark ? "border-void-border bg-void-card/20 text-void-muted" : "border-scroll-border bg-scroll-surface text-scroll-muted"
              }`}>
                <div className="font-pixel mb-3 text-xs" style={{ fontSize: "10px" }}>WANT TO CONTRIBUTE?</div>
                <p className="font-body text-sm italic mb-5">
                  The Archivists require a sworn oath before recording new lore into the Compendium.
                </p>
                <Link
                  to="/"
                  className={`font-pixel px-5 py-3 inline-block transition-all ${
                    isDark ? "bg-void-bg border border-void-border text-void-text hover:text-red-400 hover:border-red-800" : "bg-white border border-scroll-border text-scroll-accent hover:bg-scroll-accent hover:text-white"
                  }`}
                  style={{ fontSize: "8px" }}
                >
                  SIGN IN TO ADD LORE
                </Link>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}