import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chronicle from "./pages/Chronicle";
import Compendium from "./pages/Compendium";
import Profile from "./pages/Profile";
import { useTheme } from "./hooks/useTheme";
import Lore from "./pages/Lore";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Admin from "./pages/Admin";

export default function App() {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${theme === "void"
          ? "bg-void-bg text-void-text scanline-overlay"
          : "bg-scroll-bg text-scroll-text parchment-texture"
        }`}
    >
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chronicle" element={<Chronicle />} />
          <Route path="/compendium" element={<Compendium />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/lore" element={<Lore />} />
          <Route path="/lore/:slug" element={<BlogPost />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin-forbidden-archives" element={<Admin />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}