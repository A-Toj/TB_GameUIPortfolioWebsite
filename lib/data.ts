import { Channel, Project, Role, SkillBranch } from "./types";

export const profile = {
  gamertag: "Tanroj Billing",
  tagline: "Cybersecurity • Full-Stack Developer",
  location: "Turlock, CA",
  status: "Online",
  gamerscore: 2026, // graduation year, reimagined as a gamerscore
  email: "tanrojb@gmail.com",
  phone: "(209) 216-8047",
  github: "https://github.com/your-handle",
  linkedin: "https://linkedin.com/in/your-handle",
  resume: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resume.pdf`, // drop a PDF into /public to enable
  bio:
    "Computer Science graduate with a Cybersecurity concentration (CSU Stanislaus) and " +
    "hands-on experience in secure web development, relational database design, and IT " +
    "support. Comfortable across the full stack — from planning to deployment. Google IT " +
    "Support certified.",
};

export const channels: Channel[] = [
  { id: "home", label: "home", icon: "⌂" },
  { id: "projects", label: "projects", icon: "▦" },
  { id: "experience", label: "experience", icon: "✦" },
  { id: "skills", label: "skills", icon: "◇" },
  { id: "about", label: "about", icon: "☉" },
  { id: "contact", label: "contact", icon: "✉" },
];

export const projects: Project[] = [
  {
    title: "Car Dealership Database System",
    stack: ["PHP", "MariaDB", "SQL", "JavaScript"],
    blurb:
      "A 16-table MariaDB relational database with a PHP/CSS web interface modeling a full " +
      "car-dealership operation — inventory, customers, sales, appointments, financing, and " +
      "manufacturer data.",
    highlights: [
      "Built a multi-filter vehicle search and a browser-based query console supporting SELECT, INSERT, UPDATE, and DELETE against the live database.",
      "Reduced SQL-injection exposure by replacing free-text inputs with constrained dropdown filters.",
      "Designed subtype tables (gas / hybrid / electric), a ternary sales relationship, and many-to-many feature mappings from an original ER diagram.",
    ],
    link: profileLink("github"),
  },
  {
    title: "Terraria AI Agent",
    stack: ["Python", "OpenCV", "mss"],
    blurb:
      "A modular Python agent that plays Terraria autonomously from on-screen pixels — pairing " +
      "real-time screen capture with OpenCV computer vision across separate vision, control, and " +
      "decision-making subsystems.",
    highlights: [
      "Behavior modules for navigation, combat, mining, building, and inventory management.",
      "Pathfinds to the Ocean Biome and defeats the Eye of Cthulhu using only simulated keyboard and mouse input — no game-file or memory modification.",
    ],
    link: profileLink("github"),
  },
  {
    title: "Text-to-Speech Web App",
    stack: ["HTML", "CSS", "JavaScript"],
    blurb:
      "A responsive web app (co-developed on a six-person team) that reads user-entered text " +
      "aloud through the browser's Web Speech API.",
    highlights: [
      "Selectable language (English / Spanish) and accent (US / UK).",
      "Play, clear, and text-export controls.",
    ],
    link: profileLink("github"),
  },
];

export const experience: Role[] = [
  {
    title: "Co-Founder & Web Developer",
    org: "Moderni Tech (Web Design Studio)",
    location: "Remote",
    period: "June 2026 – Present",
    points: [
      "Co-founded a web design studio building responsive, custom websites for small businesses — owning the full process from client conversation through design, build, and launch.",
      "Launched a custom, responsive marketing site for a temperature-controlled freight carrier (billingtrucking.com).",
      "Currently building an online storefront for a jewelry retailer — the studio's first paying client.",
    ],
  },
  {
    title: "Operations Assistant",
    org: "Billing Trucking Inc.",
    location: "Turlock, CA",
    period: "May 2023 – April 2025",
    points: [
      "Provided IT support and maintained all hardware and software for drivers, in person and remotely.",
      "Managed logistics paperwork — invoices, bills of lading, and maintenance records — keeping documentation audit-ready.",
    ],
  },
];

export const skills = {
  languages: ["Python", "SQL", "Java", "JavaScript", "TypeScript", "PHP", "C++", "HTML/CSS"],
  frameworks: ["React", "Node.js"],
  tools: ["AWS", "Docker", "Linux", "VirtualBox", "Git", "Wireshark"],
  concepts: ["Relational DB design", "Networking", "Server management", "Security"],
};

// Skill tree — each branch is a mini tech-tree. `level` 1-3 drives the pips;
// edit freely to tune your proficiencies.
export const skillTree: SkillBranch[] = [
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    monogram: "SEC",
    tagline: "Defense & analysis",
    skills: [
      { name: "Network Security", level: 2, icon: "shield" },
      { name: "Packet Analysis · Wireshark", level: 2, icon: "search" },
      { name: "SQL-Injection Defense", level: 2, icon: "shield-check" },
      { name: "AWS Security", level: 1, note: "in progress", icon: "lock" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    monogram: "FE",
    tagline: "UI & web",
    skills: [
      { name: "HTML / CSS", level: 3, icon: "code" },
      { name: "JavaScript", level: 2, icon: "js" },
      { name: "TypeScript", level: 2, icon: "ts" },
      { name: "React", level: 2, icon: "atom" },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    monogram: "BE",
    tagline: "APIs & data",
    skills: [
      { name: "Python", level: 3, icon: "python" },
      { name: "SQL / MariaDB", level: 2, icon: "database" },
      { name: "PHP", level: 2, icon: "fileCode" },
      { name: "Node.js", level: 2, icon: "hexagon" },
      { name: "Java / C++", level: 2, icon: "coffee" },
    ],
  },
  {
    id: "fullstack",
    name: "Fullstack",
    monogram: "FS",
    tagline: "End-to-end",
    skills: [
      { name: "Web APIs", level: 2, icon: "plug" },
      { name: "Responsive Web Apps", level: 2, icon: "devices" },
      { name: "DB-Backed Apps", level: 2, icon: "layers" },
      { name: "Ship to Deploy", level: 2, icon: "rocket" },
    ],
  },
  {
    id: "server",
    name: "Server",
    monogram: "SRV",
    tagline: "Infra & systems",
    skills: [
      { name: "Linux", level: 2, icon: "terminal" },
      { name: "Docker", level: 2, icon: "containers" },
      { name: "VirtualBox", level: 2, icon: "cube" },
      { name: "Server Management", level: 2, icon: "server" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud",
    monogram: "CLD",
    tagline: "AWS & containers",
    skills: [
      { name: "AWS (EC2 / Core)", level: 2, icon: "cloud" },
      { name: "Containerized Deploys", level: 2, icon: "box" },
      { name: "Cloud Security", level: 1, note: "in progress", icon: "key" },
    ],
  },
  {
    id: "it",
    name: "IT Support",
    monogram: "IT",
    tagline: "Support & networks",
    skills: [
      { name: "IT Support", level: 3, icon: "headset" },
      { name: "Hardware / Software", level: 3, icon: "cpu" },
      { name: "Networking", level: 2, icon: "network" },
      { name: "Troubleshooting", level: 3, icon: "wrench" },
      { name: "Google IT Support", level: 3, note: "certified", icon: "award" },
    ],
  },
];

export const certifications = [
  { name: "Google IT Support Professional Certificate", year: "2026", status: "Certified" },
  { name: "AWS Certified Security – Specialty", year: "2026", status: "In progress" },
];

export const education = {
  school: "California State University, Stanislaus",
  degree: "B.S. Computer Science — Concentration in Cybersecurity",
  location: "Turlock, CA",
  graduation: "Expected May 2026",
  coursework: ["Database Management Systems", "Computer Networks"],
};

function profileLink(_kind: "github" | "linkedin"): string {
  // Centralized so you can swap in real URLs in one place.
  return "https://github.com/your-handle";
}
