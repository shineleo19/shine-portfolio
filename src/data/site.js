// ─────────────────────────────────────────────
//  SITE DATA  —  Edit everything here
//  All content lives in this one file
// ─────────────────────────────────────────────

export const SITE = {
  name: "Shine",
  handle: "shineleo19",
  title: "Shine's Garden",
  github: "https://github.com/shineleo19",
  twitter: "https://twitter.com/shineleo19",
  cv: "https://read.cv/shineleo19",

  // Hero paragraph — use ** for bold links, [] for link text, () for href
  heroLines: [
    { text: "Hey there, I'm ", bold: false },
    { text: "Shine", bold: true, href: null },
    { text: " 👋  Welcome to my ", bold: false },
    { text: "digital garden", bold: false, href: "https://maggieappleton.com/garden-history", underline: true },
    { text: " 🌱  I like building ", bold: false },
    { text: "things", bold: false, href: "#projects", underline: true },
    { text: " for the web, and I'm currently working on open-source tools for developers.", bold: false },
  ],
  heroLine2: [
    { text: "In my free time, I enjoy " },
    { text: "gaming", href: "#hobbies", underline: true },
    { text: ", collecting " },
    { text: "books", href: "#reading", underline: true },
    { text: ", and " },
    { text: "hiking", href: "#hobbies", underline: true },
    { text: " trails." },
  ],
  heroLine3: [
    { text: "I do some " },
    { text: "photography", href: "#hobbies", underline: true },
    { text: " and " },
    { text: "writing", href: "#writing", underline: true },
    { text: " as well, albeit not as consistently, but I'm working on being better at that." },
  ],
};

export const PROJECTS = [
  {
    id: "devflow",
    title: "DevFlow",
    projectType: "website",
    label: "Projects · DevFlow",
    description: "A visual GitHub workflow manager. Drag-and-drop PR boards, branch visualizer, and CI status at a glance.",
    href: "https://github.com/shineleo19",
    tags: ["React", "TypeScript", "GitHub API"],
    // Use a gradient bg color when no image is available
    bgGradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
    imageUrl: null,
  },
  {
    id: "snipply",
    title: "Snipply",
    projectType: "website",
    label: "Projects · Snipply",
    description: "A beautiful code snippet manager with syntax highlighting, tags, and instant search. Built for developers, by a developer.",
    href: "https://github.com/yourhandle",
    tags: ["Next.js", "Postgres", "Tailwind"],
    bgGradient: "linear-gradient(135deg, #0a2342 0%, #1b4f72 100%)",
    imageUrl: null,
  },
  {
    id: "formforge",
    title: "FormForge",
    projectType: "website",
    label: "Projects · FormForge",
    description: "Open-source form builder with logic branching, file uploads, and analytics. Drop-in React component.",
    href: "https://github.com/yourhandle",
    tags: ["React", "Node.js", "Open Source"],
    bgGradient: "linear-gradient(135deg, #1c2833 0%, #2e4057 100%)",
    imageUrl: null,
  },
  {
    id: "palettelab",
    title: "PaletteLab",
    projectType: "website",
    label: "Projects · PaletteLab",
    description: "Generate accessible color palettes from any image or keyword. Export to CSS, Figma, and Tailwind config.",
    href: "https://github.com/yourhandle",
    tags: ["SvelteKit", "Canvas API", "WCAG"],
    bgGradient: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
    imageUrl: null,
  },
  {
    id: "tensordeck",
    title: "Tensordeck",
    projectType: "website",
    label: "Projects · Tensordeck",
    description: "Lightweight ML experiment tracker with a minimal CLI and local storage. No cloud required.",
    href: "https://github.com/yourhandle",
    tags: ["Rust", "CLI", "DevTools"],
    bgGradient: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)",
    imageUrl: null,
  },
];

export const HOBBIES = [
  {
    id: "hiking",
    label: "Hobbies · Hiking",
    caption: "Western Ghats, last monsoon season",
    bgGradient: "linear-gradient(160deg, #2d5016, #3a7d44, #2d5016)",
    icon: "🥾",
    imageUrl: null,
  },
];

export const BOOKS = [
  {
    id: "pragmatic",
    title: "The Pragmatic Programmer",
    author: "David Thomas, Andrew Hunt",
    status: "READING",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg",
    href: "https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer",
  },
  {
    id: "philosophy-sw",
    title: "A Philosophy of Software Design",
    author: "John Ousterhout",
    status: "READ",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781732102200-L.jpg",
    href: "https://www.goodreads.com/book/show/39996759",
  },
  {
    id: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "READ",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
    href: "https://www.goodreads.com/book/show/3735293-clean-code",
  },
  {
    id: "sicp",
    title: "Structure and Interpretation of Computer Programs",
    author: "Harold Abelson, Gerald Jay Sussman",
    status: "READING",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780262510875-L.jpg",
    href: "https://www.goodreads.com/book/show/43713",
  },
];

export const SKILLS = [
  { name: "TypeScript",    level: 90, category: "Frontend" },
  { name: "React / Next.js", level: 88, category: "Frontend" },
  { name: "Tailwind CSS",  level: 92, category: "Frontend" },
  { name: "Node.js",       level: 80, category: "Backend" },
  { name: "PostgreSQL",    level: 75, category: "Backend" },
  { name: "Docker / CI",   level: 70, category: "DevOps" },
  { name: "GraphQL",       level: 55, category: "Backend" },
  { name: "Rust",          level: 35, category: "Systems" },
];

export const CONTACT = {
  email: "you@example.com",
  github: "https://github.com/yourhandle",
  twitter: "https://twitter.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourname",
  message: "I'm always open to interesting conversations — whether it's a project collab, a job opportunity, or just to say hi. The best way to reach me is by email.",
};