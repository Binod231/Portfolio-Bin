export interface PortfolioData {
  personal: PersonalInfo;
  skills: Skills;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
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
  impacts: string[];
  history?: { role: string; period: string }[];
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
