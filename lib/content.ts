export const profile = {
  brand: "codecube99",
  email: "codecube99@gmail.com",
  github: "https://github.com/AbhishekSRajput",
} as const;

export const projects = [
  {
    slug: "pixelghost",
    name: "PixelGhost",
    year: "2026",
    category: "DESIGN ENGINEERING",
    description:
      "The gap between your design and your build? Make it visible. A precision overlay and inspection toolkit for any webpage.",
    tagline: "Every pixel. Accounted for.",
    detail:
      "Drop a design mockup over your live page and see exactly where spacing, type, alignment, and color drift. Inspect and adjust without breaking your flow.",
    tags: ["Visual QA", "Design tools"],
    visualCaption: "THE DETAILS MAKE THE DIFFERENCE.",
    storeUrl:
      "https://chromewebstore.google.com/detail/mepnnfhnajemjfmokolghpdmljeakkfg?utm_source=portfolio",
    sourceUrl: "https://github.com/AbhishekSRajput/pixelghost",
    features: [
      {
        title: "See the difference",
        description:
          "Place your mockup directly over the page. Adjust its opacity and position to compare the intended design with the implementation.",
      },
      {
        title: "Inspect in context",
        description:
          "Check spacing, typography, and color without leaving the page you’re working on.",
      },
      {
        title: "Stay in control",
        description:
          "Use the extension without an account or a paid tier. The complete toolkit is free.",
      },
    ],
  },
  {
    slug: "youscroll",
    name: "You’Scroll",
    year: "2025",
    category: "EVERYDAY UTILITY",
    description:
      "Watch the video. Wander through the comments. Independent scrolling that makes YouTube feel a little more like an app.",
    tagline: "Keep watching. Keep exploring.",
    detail:
      "Scroll YouTube comments and Up Next independently beside the video, without moving the whole page. A small change that makes the everyday experience feel better.",
    tags: ["YouTube", "Better browsing"],
    visualCaption: "ONE SMALL CHANGE. A BETTER FLOW.",
    storeUrl:
      "https://chromewebstore.google.com/detail/ajdjgkbpinaphnaonpamebhalgohphma?utm_source=portfolio",
    sourceUrl: null,
    features: [
      {
        title: "Keep the video in view",
        description:
          "Explore the surrounding conversation without scrolling the video off the screen.",
      },
      {
        title: "Give comments their own space",
        description:
          "Read the discussion in an independent scroll region while the rest of the page stays put.",
      },
      {
        title: "Browse what’s next",
        description:
          "Move through Up Next independently. Find the next video without losing your place.",
      },
    ],
  },
] as const;

// The reference contains titles/excerpts but no completed article bodies.
// These remain explicitly labelled drafts until the author provides full text.
export const notes = [
  {
    slug: "the-case-for-being-a-generalist",
    title: "The case for being a generalist in a specialist market",
    date: "AUG 2026",
    category: "GENERALIST / CAREER",
    tags: ["Generalist", "Career"],
    excerpt:
      "Depth is what gets rewarded on paper. Range is what actually ships a product when the team is one person.",
  },
  {
    slug: "reading-an-unfamiliar-codebase",
    title: "Reading a codebase you’ve never seen in an afternoon",
    date: "JUL 2026",
    category: "CODEBASES",
    tags: ["Codebases"],
    excerpt:
      "A repeatable path from cold repository to first meaningful change, without reading every file.",
  },
  {
    slug: "what-pixelghost-taught-me-about-scope",
    title: "What building PixelGhost taught me about scope",
    date: "JUN 2026",
    category: "PRODUCTS / EXTENSIONS",
    tags: ["Products", "Extensions"],
    excerpt:
      "Every feature I cut made the product easier to explain, and easier to finish.",
  },
  {
    slug: "small-tools-beat-big-frameworks",
    title: "Small tools beat big frameworks",
    date: "MAY 2026",
    category: "TOOLS",
    tags: ["Tools"],
    excerpt:
      "Notes on staying close to the platform and shipping faster because of it.",
  },
] as const;

export const traits = [
  {
    number: "01",
    title: "Stay curious.",
    symbol: "↗",
    description:
      "Read the source. Ask the next question. Understand the problem before reaching for a familiar solution.",
  },
  {
    number: "02",
    title: "Care a little too much.",
    symbol: "✳",
    description:
      "The edge case. The awkward breakpoint. The almost-right interaction. That’s where the real work happens.",
  },
  {
    number: "03",
    title: "Say it straight.",
    symbol: "↔",
    description:
      "Clear thinking, honest trade-offs, and plain language. Good collaboration doesn’t need a layer of jargon.",
  },
  {
    number: "04",
    title: "Make less, better.",
    symbol: "−",
    description:
      "Find the smallest thing that solves the problem. Ship it, learn from it, and keep making it better.",
  },
] as const;
