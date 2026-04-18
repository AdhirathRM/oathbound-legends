import { useTheme } from "../hooks/useTheme";

export default function PixelStars({ count, max = 5 }) {
  const { theme } = useTheme();
  const isDark = theme === "void";

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`pixel-star text-base transition-all ${
            i < count
              ? isDark
                ? "text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.8)]"
                : "text-amber-600"
              : isDark
              ? "text-void-border"
              : "text-scroll-border"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
