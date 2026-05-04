import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { useTheme } from "../hooks/useTheme";
import { getBlogBySlug } from "../data/blogs";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function BlogPost() {
  const { slug } = useParams();
  const { theme } = useTheme();
  const isDark = theme === "void";

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      // 1. First, check if it's one of the static hardcoded blogs
      const staticBlog = getBlogBySlug(slug);
      if (staticBlog) {
        setBlog(staticBlog);
        setLoading(false);
        return;
      }

      // 2. If not static, fetch from our custom Express API!
      try {
        const response = await fetch(`${API_URL}/api/lore/read/${slug}`);
        
        if (response.ok) {
          const data = await response.json();
          setBlog({
            id: data.id,
            title: data.title,
            author: data.profiles?.username || "Unknown Archivist",
            date: new Date(data.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            tag: data.tag,
            banner: data.banner,
            content: data.content,
            views: data.view_count || 0 // Grab the newly incremented view count
          });
        }
      } catch (error) {
        console.error("Error fetching lore from Express:", error);
      }
      
      setLoading(false);
    };

    fetchBlogData();
  }, [slug]);

  if (loading) {
    return (
      <PageTransition>
        <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-void-bg" : "bg-scroll-bg"}`}>
          <div className={`font-pixel text-xs animate-pulse ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
            UNSEALING ARCHIVE...
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!blog) {
    return (
      <PageTransition>
        <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-void-bg" : "bg-scroll-bg"}`}>
          <div className="text-center">
            <h2 className={`font-serif text-2xl mb-4 ${isDark ? "text-void-text" : "text-scroll-text"}`}>Record Not Found</h2>
            <Link to="/lore" className={`font-pixel px-6 py-3 ${isDark ? "bg-red-900 text-red-200 border border-red-800" : "bg-scroll-accent text-white"}`} style={{ fontSize: "9px" }}>
              ← BACK TO LORE
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className={`min-h-screen py-12 px-4 ${isDark ? "bg-void-bg" : "bg-scroll-bg"}`}>
        <div className="max-w-4xl mx-auto">
          
          {/* Back Button */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <Link
              to="/lore"
              className={`font-pixel text-xs transition-all ${isDark ? "text-void-muted hover:text-red-400" : "text-scroll-muted hover:text-scroll-accent"}`}
              style={{ fontSize: "8px" }}
            >
              ← BACK TO LORE & LOGS
            </Link>
          </motion.div>

          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`border ${isDark ? "bg-void-card pixel-card-void border-void-border" : "bg-scroll-card pixel-card-scroll border-scroll-border"}`}
          >
            {/* Banner */}
            <div 
              className={`h-64 w-full bg-cover bg-center border-b ${isDark ? "border-void-border opacity-50" : "border-scroll-border opacity-90"}`}
              style={{ backgroundImage: `url('${blog.banner}')` }}
            />

            {/* Content Area */}
            <div className="p-8 md:p-12">
              {/* Header Info */}
              <div className="flex items-center gap-3 mb-6 font-pixel text-xs flex-wrap" style={{ fontSize: "8px" }}>
                <span className={`px-2 py-1 border ${isDark ? "bg-red-900/60 text-red-200 border-red-800" : "bg-scroll-accent text-white border-scroll-accent"}`}>
                  {blog.tag}
                </span>
                <span className={isDark ? "text-void-muted" : "text-scroll-muted"}>
                  BY {blog.author}
                </span>
                <span className={isDark ? "text-void-muted/50" : "text-scroll-muted/50"}>
                  | {blog.date}
                </span>
                {/* ◈ Added View Count Display ◈ */}
                {blog.views !== undefined && (
                  <span className={isDark ? "text-amber-500/70" : "text-amber-700/70"}>
                    | 👁 {blog.views} VIEWS
                  </span>
                )}
              </div>

              <h1 className={`font-serif font-black text-3xl md:text-5xl leading-tight mb-8 ${isDark ? "text-void-text glow-text" : "text-scroll-text"}`}>
                {blog.title}
              </h1>

              {/* Text Blocks */}
              <div className={`space-y-6 font-body text-lg leading-relaxed ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
                {blog.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

            </div>
          </motion.article>

        </div>
      </div>
    </PageTransition>
  );
}