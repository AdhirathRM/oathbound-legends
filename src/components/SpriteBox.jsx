import React from 'react';
import { useTheme } from "../hooks/useTheme";

const spriteMap = {
  seraphim: "/knight.png",
  elementalist: "/mage.png",
  sharpshooter: "/archer.png",
  brawler: "/beastman.png",
  ronin: "/samurai.png",
  sentinel: "/sentinel.png",
  malakor: "/malakor.png",
  leo: "/leo.png",

  knight: "/knight.png",
  mage: "/mage.png",
  archer: "/archer.png",
  beastman: "/beastman.png",
  samurai: "/samurai.png",

  knight_attack: "/knight_attack.png",
  mage_attack: "/mage_attack.png",
  archer_attack: "/archer_attack.png",
  beastman_attack: "/beastman_attack.png",
  samurai_attack: "/samurai_attack.png",
  vampire_attack: "/vampire_attack.png",
  enemy_attack: "/enemy_attack.png",
  leo_attack: "/leo.png",

  knight_walk: "/knight_walk.png",
  mage_walk: "/mage_walk.png",
  archer_walk: "/archer_walk.png",
  beastman_walk: "/beastman_walk.png",
  samurai_walk: "/samurai_walk.png",
  vampire_walk: "/vampire_walk.png",
  enemy_walk: "/enemy_walk.png",
  leo_walk: "/leo.png",

  enemy_death: "/enemy_death.png"
};

export default function SpriteBox({ 
  name = "", 
  type = "character", 
  size = "md", 
  className = "" 
}) {
  const { theme } = useTheme();
  const isDark = theme === "void";

  const getSpritePath = () => {
    const searchString = name?.toLowerCase() || "";
    
    if (spriteMap[searchString]) return spriteMap[searchString];

    const foundKey = Object.keys(spriteMap).find(key => searchString.includes(key));
    if (foundKey) return spriteMap[foundKey];

    if (type === "boss") return spriteMap.malakor;
    if (type === "enemy") return spriteMap.sentinel;
    
    return spriteMap.seraphim;
  };

  const spritePath = getSpritePath();

  let frames = 4;
  if (spritePath.includes("enemy_attack")) {
    frames = 6;
  } else if (spritePath.includes("_attack")) {
    frames = 7;
  } else if (spritePath.includes("_walk") || spritePath.includes("_death")) {
    frames = 6;
  }
  
  const animClass = frames === 7 ? "animate-pixel-7" : frames === 6 ? "animate-pixel-6" : "animate-pixel-4";
  const bgSizeX = frames * 68;

  const containerSizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-40 h-40",
    xl: "w-64 h-64",
  };

  const spriteScales = {
    sm: "scale-[0.7]",
    md: "scale-[1.0]",
    lg: "scale-[1.6]",
    xl: "scale-[2.8]",
  };

  return (
    <div className={`${containerSizes[size]} ${className} flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-void-card/30 border border-void-border/40" : "bg-scroll-surface border border-scroll-border/40"
      }`}>
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "linear-gradient(rgba(124,58,237,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.1) 1px, transparent 1px)"
            : "linear-gradient(rgba(139,69,19,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,69,19,0.1) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />

      <div
        className={`${spriteScales[size]} ${animClass} relative z-10`}
        style={{
          width: "68px",
          height: "68px",
          backgroundImage: `url('${spritePath}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${bgSizeX}px 68px`, 
        }}
      />
    </div>
  );
}