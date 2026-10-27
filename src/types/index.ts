export interface PortfolioData {
  personal: PersonalInfo;
  services: ConsultingService[];
  skills: Skills;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  blogs: BlogItem[];
  certifications: CertificationItem[];
}

export interface ConsultingService {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  icon: "cloud" | "terminal" | "shield" | "cpu" | "dollar";
  deliverables: string[];
  technologies: string[];
  metrics: string;
}

export interface AboutCard {
  title: string;
  subtitle: string;
  icon: "shield" | "cloud" | "code" | "database" | "book" | "globe" | "briefcase" | "award";
  theme?: "blue" | "purple" | "emerald" | "amber" | "cyan";
}

export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  tagline: string;
  email: string;
  links: {
    github: string;
    linkedin: string;
    resume: string;
  };
  photo?: string;
  aboutCards?: AboutCard[];
}

export interface Skills {
  cloud: string[];
  devops: string[];
  backend: string[];
  databases: string[];
  concepts: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  type: string;
  tech?: string[];
  impacts: string[];
  history?: { role: string; period: string }[];
  caseStudy?: {
    title: string;
    overview: string;
    features: { title: string; details: string }[];
    challenges: { problem: string; solution: string }[];
    results: string[];
  };
}

export interface ProjectItem {
  title: string;
  type: string;
  desc: string;
  tech: string[];
  highlights: string[];
  repo?: string;
  color?: string;
}

export interface BlogItem {
  title: string;
  description: string;
  date?: string;
  tags: string[];
  url: string;
  color?: string;
  spotlight?: string;
  winner?: boolean;
  platform?: string;
  readTime?: string;
  category?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  id?: string;
  badgeId?: string;
  image?: string;
  theme?: string;
  border?: string;
  gradient?: string;
  link?: string;
}

