export interface PortfolioData {
  personal: PersonalInfo;
  skills: Skills;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
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
}

export interface CertificationItem {
  name: string;
  issuer: string;
  validity?: string;
  badge?: string;
}
