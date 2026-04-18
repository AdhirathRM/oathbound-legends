import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { useTheme } from "../hooks/useTheme";
import { blogs } from "../data/blogs";

export default function Lore() {
  const { theme } = useTheme();
  const isDark = theme === "void";

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

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group flex flex-col transition-all duration-300 overflow-hidden cursor-pointer ${
                  isDark ? "bg-void-card pixel-card-void" : "bg-scroll-card pixel-card-scroll"
                }`}
              >
                <Link to={`/lore/${blog.slug}`} className="flex flex-col h-full">
                  {/* Banner Image */}
                  <div className={`h-40 overflow-hidden border-b relative ${isDark ? "border-void-border" : "border-scroll-border"}`}>
                    {/* Placeholder image layer */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${blog.banner}')`, opacity: isDark ? 0.4 : 0.8 }}
                    />
                    {/* Dark overlay for void mode */}
                    {isDark && <div className="absolute inset-0 bg-void-bg/30" />}
                    
                    <div className="absolute top-3 left-3">
                      <span className={`font-pixel px-2 py-1 text-xs border ${
                        isDark ? "bg-red-900/60 text-red-200 border-red-800" : "bg-scroll-accent text-white border-scroll-accent"
                      }`} style={{ fontSize: "8px" }}>
                        {blog.tag}
                      </span>
                    </div>
                  </div>

                  {/* Content Box */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`font-pixel text-xs ${isDark ? "text-void-muted" : "text-scroll-muted"}`} style={{ fontSize: "8px" }}>
                        BY {blog.author}
                      </span>
                      <span className={`font-pixel text-xs ${isDark ? "text-void-muted/60" : "text-scroll-muted/60"}`} style={{ fontSize: "8px" }}>
                        {blog.date}
                      </span>
                    </div>
                    
                    <h3 className={`font-serif font-bold text-xl leading-tight mb-3 transition-colors ${
                      isDark ? "text-void-text group-hover:text-red-400" : "text-scroll-text group-hover:text-scroll-accent"
                    }`}>
                      {blog.title}
                    </h3>
                    
                    <p className={`font-body text-sm leading-relaxed mb-6 flex-1 ${isDark ? "text-void-muted" : "text-scroll-muted"}`}>
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
            ))}
          </div>

          {/* Coming Soon Box (For future logins) */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className={`mt-16 p-8 border-2 border-dashed text-center max-w-2xl mx-auto ${
               isDark ? "border-void-border bg-void-card/20 text-void-muted" : "border-scroll-border bg-scroll-surface text-scroll-muted"
             }`}
          >
            <div className="font-pixel mb-2" style={{ fontSize: "10px" }}>WANT TO CONTRIBUTE?</div>
            <p className="font-body text-sm italic">
              The Archivists are preparing the login gates. Soon, proven heroes will be able to submit their own strategies and lore to the compendium.
            </p>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}