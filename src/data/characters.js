export const characters = [
  {
    id: "seraphim",
    name: "Seraphim",
    title: "The Crimson Commander",
    type: "character",
    role: "Knight — Party Leader",
    description:
      "Strikingly handsome with sharp, noble features and a determined jawline. His blood-red hair, tied in a loose half-ponytail, whips realistically when he moves. He leads with the fury of conviction and the calm of someone who has already decided to win.",
    lore:
      "Seraphim wears burnished steel plate armor with a mirror-like finish, bearing a decorative gold lion crest on the breastplate. His heavy royal navy blue cape — gold-tasseled at the pauldrons — billows with every leap. His Zweihänder greatsword, hilt wrapped in blue to match his cape, carries a faint silver shimmer that runs from guard to tip. He speaks little about fear, because fear has never followed him anywhere.",
    weapon: "Zweihänder (Greatsword)",
    visualStyle: "Noble and powerful. Cape billows with weight on landing. Blade shimmers every few seconds.",
    stats: { strength: 95, agility: 68, intelligence: 60, defense: 90, speed: 72 },
    spriteColor: "#DC143C",
    accentColor: "#000080",
    colors: { hair: "#DC143C", armor: "#B0C4DE", cape: "#000080" },
    animationStates: ["Idle", "Attack", "Death"],
  },
  {
    id: "elementalist",
    name: "The Elementalist",
    title: "Mage of the Eternal Weave",
    type: "character",
    role: "Mage — Ranged Support",
    description:
      "Regal and calm, with vibrant emerald-green hair tied into a high ponytail that flows with every movement. She hovers slightly off the ground, leaving a trail of magical dust in her wake — as if the earth itself is not worthy of her footsteps.",
    lore:
      "She wears flowing white and violet robes with high slits that allow fluid movement. A large sapphire pendant rests at her chest, glowing with ethereal cyan light when she casts. Her mahogany staff, topped with a crystal orb, floats alongside her as an extension of will rather than hand. She has never missed. She has simply chosen not to hit, until she does.",
    weapon: "Floating Mahogany Staff (Crystal Orb)",
    visualStyle: "Ethereal. Hovers off the ground. Leaves magical particle trail. Orb glows on cast.",
    stats: { strength: 40, agility: 80, intelligence: 98, defense: 52, speed: 88 },
    spriteColor: "#00C957",
    accentColor: "#BF40BF",
    colors: { hair: "#00C957", robes: "#BF40BF", magic: "#00F5FF" },
    animationStates: ["Idle", "Attack", "Death"],
  },
  {
    id: "sharpshooter",
    name: "The Sharpshooter",
    title: "Archer of the Weirwood",
    type: "character",
    role: "Archer — Ranged DPS",
    description:
      "Lean and agile with pointed ears and shimmering golden hair that falls straight to his shoulders. His sprite is slightly shorter than the Knight's, emphasizing speed over stature. His arrows leave bright streak effects through the air.",
    lore:
      "He wears a forest green leather tunic and brown leggings, with a quiver strapped to his lower back for easy access mid-dash. His longbow is carved from white weirwood, lightweight and near-silent. He does not aim — he anticipates. By the time the arrow leaves the string, he has already moved.",
    weapon: "Weirwood Longbow",
    visualStyle: "Swift. Arrow attacks leave bright streak effects. Slightly shorter build emphasizing speed.",
    stats: { strength: 55, agility: 97, intelligence: 70, defense: 48, speed: 99 },
    spriteColor: "#FFD700",
    accentColor: "#228B22",
    colors: { hair: "#FFD700", leathers: "#228B22" },
    animationStates: ["Idle", "Attack", "Death"],
  },
  {
    id: "brawler",
    name: "The Brawler",
    title: "Beastman of the Broken Chain",
    type: "character",
    role: "Beastman — Melee Tank",
    description:
      "A massive, hulking black-furred wolf who stands on his hind legs but leans forward in a predatory crouch. Iron shackles clank at his wrists — remnants of the first lost battle he survived by refusing to die.",
    lore:
      "He wears only tattered leather trousers, his fur doing the work of armor. He fights with glowing cyan claws and fangs, no weapon needed. When he dashes, he drops to all fours and accelerates across the screen with terrifying speed. The shackles are a reminder: every chain that has ever tried to hold him has failed.",
    weapon: "Glowing Cyan Claws & Fangs",
    visualStyle: "Aggressive and feral. Drops to all fours for dash. Cyan claw glow on attack.",
    stats: { strength: 99, agility: 75, intelligence: 35, defense: 85, speed: 80 },
    spriteColor: "#1a1a2e",
    accentColor: "#E0FFFF",
    colors: { fur: "#0A0A0A", claws: "#E0FFFF" },
    animationStates: ["Idle", "Attack", "Death"],
  },
  {
    id: "ronin",
    name: "The Ronin",
    title: "Samurai of Unnamed Disgrace",
    type: "character",
    role: "Samurai — Precision Striker",
    description:
      "A mysterious, fully armored figure. No skin or hair is visible — making them the most enigmatic member of the group. Their idle stance is completely still, betraying nothing. Then they move, and it's already over.",
    lore:
      "Traditional dark lacquered O-yoroi armor with a menacing demon faceplate — the Menpo — conceals whatever face lies beneath. A tattered red scarf wraps around the neck. Their attacks are blink-and-you-miss-it slashes with white-hot motion lines. No one has asked their name twice. No one has needed to.",
    weapon: "Gleaming Katana",
    visualStyle: "Precision. Completely still in idle. Attacks are near-instant slashes with white motion lines.",
    stats: { strength: 78, agility: 99, intelligence: 72, defense: 65, speed: 97 },
    spriteColor: "#1C1C1C",
    accentColor: "#8B0000",
    colors: { armor: "#1C1C1C", scarf: "#8B0000" },
    animationStates: ["Idle", "Attack", "Death"],
  },
  {
    id: "leo",
    name: "Leo",
    title: "The Kidnapped Squire",
    type: "npc",
    role: "NPC — The Reason for the Oath",
    description:
      "A teenager with shaggy sandy-brown hair that constantly falls into his eyes. He carries a bright, hopeful expression that shifted to gritty determination the moment Lord Malakor took him. He is the heart the party fights to reclaim.",
    lore:
      "Leo wore an oversized blue padded gambeson — too large for his frame, boots a size too big. Around his neck, a silver medallion gifted by the party gleams in the dark. In the opening, he was carrying the Knight's whetstone and the Mage's scrolls when the Vampire struck. His torn blue cloak, left on the ground, was the first item the heroes found — and the oath they swore upon it has not broken since.",
    weapon: "None",
    visualStyle: "Non-combatant. Shown in capture state. Signature blue cloak torn and left behind.",
    stats: { strength: 20, agility: 45, intelligence: 60, defense: 15, speed: 50 },
    spriteColor: "#4A90D9",
    accentColor: "#C0A060",
    colors: { hair: "#A0784B", gambeson: "#4A90D9", medallion: "#C0C0C0" },
    animationStates: ["Idle"],
    status: "Captured by Lord Malakor",
  },
  {
    id: "sentinel",
    name: "The Sentinel",
    title: "Fallen Knight of the Void",
    type: "enemy",
    role: "Enemy — Guardian of the Trials",
    description:
      "Found throughout Trials I through IX. Dark armored husks of fallen knights, their eyes and chest cores glowing with eerie white light. When they punch, their hands surge with white energy. When they die, they explode in a burst of white light.",
    lore:
      "Once warriors who swore the Oath and failed, The Sentinels were not destroyed — they were repurposed. Lord Malakor stripped them of name and memory, leaving only function. They do not question. They do not tire. They exist to test whether the living are worthy of proceeding. Most are not.",
    weapon: "Energy Fists (White Glowing Charge Punch)",
    visualStyle: "Eerie glowing eyes and chest core. White energy hands on attack. Explodes in white light on death.",
    stats: { strength: 70, agility: 55, intelligence: 30, defense: 75, speed: 50 },
    spriteColor: "#2a2a4a",
    accentColor: "#E0E8FF",
    colors: { armor: "#1a1a2e", glow: "#FFFFFF", core: "#E0E8FF" },
    animationStates: ["Idle", "Attack", "Death"],
    trials: "I — IX",
  },
  {
    id: "lord-malakor",
    name: "Lord Malakor",
    title: "The Vampire Lord of Eternal Night",
    type: "boss",
    role: "Boss — Final Trial Antagonist",
    description:
      "Pale, porcelain skin. Obsidian-black hair, slicked back. Two glowing crimson pixels for eyes that carry millennia of predatory patience. His floor-length high-collar cape is midnight black outside, blood-red within. He is refined. He is a monster. He is both at once.",
    lore:
      "Lord Malakor issued the challenge: survive the Ten Trials, and the Squire shall be freed. He did not expect anyone to reach him. A Victorian-style charcoal waistcoat with silver buttons, tall polished black boots, and white gloves complete the portrait of a creature who views cruelty as an art form. In Phase 1 he fights with one hand behind his back, summoning bats and shadow projectiles from his cape. In Phase 2 — when cornered — he discards refinement entirely: hair disheveled, claws out, devastating.",
    weapon: "Cape (Phase 1: Bat Swarm / Shadow) · Claws (Phase 2: Melee Devastation)",
    visualStyle: "Cape flows like liquid. Phase 1: aristocratic, one hand behind back. Phase 2: feral, wings flared, claws forward.",
    stats: {
      phase1: { strength: 85, agility: 80, intelligence: 98, defense: 90, speed: 78 },
      phase2: { strength: 99, agility: 92, intelligence: 85, defense: 75, speed: 95 },
    },
    spriteColor: "#1a0a0a",
    accentColor: "#8B0000",
    colors: { skin: "#F5F0F0", hair: "#0A0A0A", cape: "#0A0A0A", lining: "#8B0000", eyes: "#DC143C" },
    animationStates: ["Idle", "Attack", "Death"],
    trial: 10,
    isBoss: true,
  },
];

export const getCharacterById = (id) => characters.find((c) => c.id === id);
export const getCharactersByType = (type) =>
  type === "all" ? characters : characters.filter((c) => c.type === type);
export const heroes = characters.filter((c) => c.type === "character");
