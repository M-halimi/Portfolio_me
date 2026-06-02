export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const typedRoles = [
  "Full-Stack Developer",
  "Laravel Expert",
  "React Developer",
  "Problem Solver",
];

export const buildTicker = [
  "Inventory Manager",
  "Intern Portal",
  "Rotation System",
];

export const terminalInfo = [
  { command: "whoami", output: "Mohammed Halimi" },
  { command: "location", output: "Fès, Morocco" },
  { command: "status", output: "Available for work ✓" },
  { command: "stack", output: "Laravel · React · MySQL · Alpine.js" },
];

export const skillCategories = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools" },
] as const;

export type SkillCategory = "all" | "frontend" | "backend" | "tools";

export interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
  years: string;
  gradient: [string, string];
}

export const skills: Skill[] = [
  { name: "HTML & CSS", level: 90, category: "frontend", years: "3 yrs", gradient: ["#f97316", "#ef4444"] },
  { name: "JavaScript", level: 82, category: "frontend", years: "3 yrs", gradient: ["#eab308", "#f59e0b"] },
  { name: "React", level: 80, category: "frontend", years: "2 yrs", gradient: ["#38bdf8", "#818cf8"] },
  { name: "Alpine.js", level: 75, category: "frontend", years: "2 yrs", gradient: ["#38bdf8", "#0ea5e9"] },
  { name: "Tailwind CSS", level: 85, category: "frontend", years: "2 yrs", gradient: ["#06b6d4", "#0891b2"] },
  { name: "PHP", level: 75, category: "backend", years: "3 yrs", gradient: ["#a855f7", "#7c3aed"] },
  { name: "Laravel", level: 78, category: "backend", years: "3 yrs", gradient: ["#ef4444", "#dc2626"] },
  { name: "MySQL", level: 72, category: "backend", years: "3 yrs", gradient: ["#06b6d4", "#0284c7"] },
  { name: "MongoDB", level: 65, category: "backend", years: "1 yr", gradient: ["#22c55e", "#16a34a"] },
  { name: "Livewire", level: 68, category: "backend", years: "2 yrs", gradient: ["#ec4899", "#db2777"] },
  { name: "Git & GitHub", level: 85, category: "tools", years: "3 yrs", gradient: ["#f97316", "#ea580c"] },
  { name: "Agile", level: 70, category: "tools", years: "2 yrs", gradient: ["#8b5cf6", "#7c3aed"] },
];

export interface Experience {
  period: string;
  title: string;
  role: string;
  description: string;
  techStack: string[];
  duration: string;
}

export const experiences: Experience[] = [
  {
    period: "2022 — 2023",
    title: "Inventory Management System",
    role: "Project Lead / Full-Stack",
    description: "Directed the design, development and deployment of a complete stock management application, overseeing the full lifecycle from requirements gathering to production release.",
    techStack: ["Laravel", "React", "MySQL"],
    duration: "1 year",
  },
  {
    period: "Feb 2024",
    title: "Intern Management System",
    role: "Solo Developer",
    description: "Built and deployed a platform to streamline intern management processes for an organization, handling everything from architecture to implementation.",
    techStack: ["PHP", "Laravel", "Livewire"],
    duration: "1 month",
  },
  {
    period: "Mar 2024",
    title: "Rotation Management System",
    role: "Developer",
    description: "Developed a personnel rotation platform covering position changes, schedule shifts, and cross-team transfers, improving workforce coordination.",
    techStack: ["Laravel", "Alpine.js", "MySQL"],
    duration: "1 month",
  },
];

export interface Project {
  num: string;
  title: string;
  description: string;
  tags: string[];
  gradient: [string, string];
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    num: "01",
    title: "Inventory Manager",
    description: "A complete inventory and stock management application with real-time tracking, reporting, and multi-user roles.",
    tags: ["Laravel", "React", "MySQL"],
    gradient: ["#06b6d4", "#0891b2"],
  },
  {
    num: "02",
    title: "Intern Portal",
    description: "A platform for managing intern applications, assignments, evaluations, and progress tracking across departments.",
    tags: ["PHP", "Laravel", "Livewire"],
    gradient: ["#8b5cf6", "#7c3aed"],
  },
  {
    num: "03",
    title: "Rotation System",
    description: "Personnel rotation management platform handling position changes, shift scheduling, and cross-team transfers.",
    tags: ["Laravel", "Alpine.js", "MySQL"],
    gradient: ["#ec4899", "#db2777"],
  },
];

export interface Education {
  period: string;
  title: string;
  subtitle: string;
  institution: string;
  skillsLearned: string[];
}

export const education: Education[] = [
  {
    period: "2022 — 2024",
    title: "Technicien Spécialisé en Développement Digital",
    subtitle: "Option Full Stack",
    institution: "OFPPT Fmotika, Fès",
    skillsLearned: ["React", "Laravel", "PHP", "MySQL", "Git"],
  },
  {
    period: "2021 — 2022",
    title: "Baccalauréat Sciences de la Vie et de la Terre",
    subtitle: "Option SVT",
    institution: "Lycée Sidi Ibrahim Arrazi, Fès",
    skillsLearned: ["Sciences", "Mathématiques", "Biologie"],
  },
];

export const floatingParticles = [
  "{", "}", "[", "]", "=>", "</", ">", ";",
  "import", "const", "function", "return",
  "async", "await", "PHP", "Laravel", "React",
  "MySQL", "git", "push", "npm", "install",
  "class", "new", "try", "catch",
];
