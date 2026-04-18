import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isDark = theme === "void";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/chronicle", label: "Chronicle" },
    { to: "/compendium", label: "Compendium" },
    { to: "/lore", label: "Lore" }, // <-- ADDED THIS LINE
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isDark
          ? "bg-void-surface/90 border-void-border backdrop-blur-md"
          : "bg-scroll-surface/95 border-scroll-border backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Oathbound Logo"
              className={`w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110 border-2 p-0.5 rounded-md ${
                isDark ? "border-void-accent bg-void-accent/10" : "border-scroll-accent bg-scroll-accent/10"
              }`}
            />
            <span
              className={`font-pixel leading-tight transition-all ${
                isDark
                  ? "text-void-glow group-hover:glow-text"
                  : "text-scroll-accent"
              }`}
              style={{ fontSize: "clamp(10px, 2vw, 16px)" }}
            >
              OATHBOUND
              <br />
              <span
                className={isDark ? "text-void-muted" : "text-scroll-muted"}
                style={{ fontSize: "clamp(8px, 1.2vw, 12px)" }}
              >
                LEGENDS
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative font-serif text-sm font-semibold tracking-widest uppercase transition-all duration-200 group ${
                  isActive(link.to)
                    ? isDark
                      ? "text-void-glow"
                      : "text-scroll-accent"
                    : isDark
                    ? "text-void-muted hover:text-void-text"
                    : "text-scroll-muted hover:text-scroll-text"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                    isActive(link.to) ? "w-full" : "w-0 group-hover:w-full"
                  } ${isDark ? "bg-void-glow" : "bg-scroll-accent"}`}
                />
              </Link>
            ))}
          </div>

          {/* Theme Toggle + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`relative flex items-center gap-2 px-3 py-1.5 text-xs font-pixel transition-all duration-300 ${
                isDark
                  ? "border border-void-accent text-void-glow hover:bg-void-accent/20 hover:shadow-glow-purple"
                  : "border border-scroll-accent text-scroll-accent hover:bg-scroll-accent/10"
              }`}
              style={{ fontSize: "8px" }}
            >
              <span>{isDark ? "◈" : "✦"}</span>
              <span>{isDark ? "VOID" : "SCROLL"}</span>
            </button>

            {/* Hamburger */}
            <button
              className={`md:hidden p-2 ${
                isDark ? "text-void-text" : "text-scroll-text"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1">
                <span
                  className={`block h-0.5 transition-all duration-300 ${
                    isDark ? "bg-void-text" : "bg-scroll-text"
                  } ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                />
                <span
                  className={`block h-0.5 transition-all duration-300 ${
                    isDark ? "bg-void-text" : "bg-scroll-text"
                  } ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 transition-all duration-300 ${
                    isDark ? "bg-void-text" : "bg-scroll-text"
                  } ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden border-t ${
              isDark
                ? "bg-void-surface border-void-border"
                : "bg-scroll-surface border-scroll-border"
            }`}
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`font-serif text-sm font-semibold tracking-widest uppercase py-2 border-b transition-all ${
                    isActive(link.to)
                      ? isDark
                        ? "text-void-glow border-void-accent/30"
                        : "text-scroll-accent border-scroll-accent/30"
                      : isDark
                      ? "text-void-muted border-void-border hover:text-void-text"
                      : "text-scroll-muted border-scroll-border hover:text-scroll-text"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}