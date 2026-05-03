export const blogs = [
  {
    id: "1",
    slug: "fall-of-the-first-sentinel",
    title: "The Fall of the First Sentinel",
    author: "Archivist_Lys",
    date: "April 10, 2026",
    tag: "LORE",
    banner: "/lore.png", 
    excerpt: "Before the nine trials, there was only one. Discover the tragic history of the knight who first fell to the void.",
    content: [
      "Long before Lord Malakor claimed the throne and plunged the realm into eternal night, the Sentinels were noble guardians. They were tasked with protecting the borders between the mortal world and the creeping Void.",
      "However, the Void does not conquer by force; it conquers by whispers. It finds the cracks in a warrior's resolve—doubt, fear, ambition. The first to fall was not the weakest among them, but their commander.",
      "Convinced that he could harness the Void's power to protect his people, he wanders the lower trials, a hollow shell of his former glory, testing the resolve of any hero foolish enough to seek the kidnapped squire."
    ]
  },
  {
    id: "2",
    slug: "beastman-combat-guide",
    title: "Optimizing the Brawler: A Combat Guide",
    author: "TrialRunner_IX",
    date: "April 15, 2026",
    tag: "STRATEGY",
    banner: "/strategy.png",
    excerpt: "Struggling with crowd control? Here is why The Brawler should be your frontline tank in Trial 4.",
    content: [
      "The Brawler is often misunderstood by new players. Because his speed stat is relatively low, many bench him in favor of the Ronin or the Sharpshooter. This is a fatal mistake in the mid-game.",
      "When you reach Trial 4, the sheer number of minor void-spawns will overwhelm a precision striker. The Brawler's heavy sweeping attacks, while slow, have a massive hit-box. If you time his attacks to interrupt the enemy's lunge animation, you can effectively stun-lock groups of three or four enemies at once.",
      "Pro tip: Do not use his heavy attack on the Sentinels unless you have already triggered their parry cooldown. Stick to light attacks and use his bulk to absorb the unavoidable chip damage."
    ]
  },
  {
    id: "3",
    slug: "dev-log-animation-updates",
    title: "Dev Log: Refining the Walk Cycles",
    author: "Dev_Adhirath",
    date: "April 18, 2026",
    tag: "UPDATE",
    banner: "/dev.png",
    excerpt: "A look into the recent updates to character sprite animations, frame counts, and attack sheets.",
    content: [
      "This week, we pushed a major update to the visual engine. Previously, all characters shared a standard 4-frame animation loop. While this worked for idle states, it made walking and attacking feel stiff.",
      "We've now introduced variable frame counts. Attack animations utilize a 7-frame sequence to allow for proper wind-up and follow-through, making combat feel much more impactful. Walk cycles are now 6 frames, smoothing out the pacing of exploration.",
      "We also resolved an issue where the Compendium archives were defaulting to the Knight sprite. The visual database is now fully synced with the new dynamic sprite loader!"
    ]
  }
];

export const getBlogBySlug = (slug) => {
  return blogs.find((blog) => blog.slug === slug);
};