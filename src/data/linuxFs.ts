import { portfolio } from "@/data/portfolio";

export type FsNode =
  | {
      type: "dir";
      name: string;
      children: Record<string, FsNode>;
      guiSection?: string;
    }
  | {
      type: "file";
      name: string;
      content: string;
      imageSrc?: string;
      isDotMatrix?: boolean;
      redirectUrl?: string;
      guiSection?: string;
    };

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 36);
}

export function createInitialFs(): FsNode {
  const { personal, services, skills, experience, projects, certifications, blogs } = portfolio;

  const experienceChildren: Record<string, FsNode> = {};
  const caseStudiesChildren: Record<string, FsNode> = {};

  experience.forEach((exp) => {
    const slug = slugify(exp.company);
    const lines = [
      `# ${exp.company}`,
      `Role     : ${exp.role}`,
      `Period   : ${exp.period}`,
      `Type     : ${exp.type}`,
      `Tech     : ${exp.tech.join(", ")}`,
      ``,
      `## Key Impacts`,
      ...exp.impacts.map((imp) => `- ${imp.replace(/\*\*/g, "")}`),
    ];
    experienceChildren[`${slug}.md`] = {
      type: "file",
      name: `${slug}.md`,
      content: lines.join("\n"),
      guiSection: "/#experience",
    };

    if (exp.caseStudy) {
      const csLines = [
        `# CASE STUDY: ${exp.caseStudy.title}`,
        `Company  : ${exp.company} (${exp.period})`,
        ``,
        `## Overview`,
        exp.caseStudy.overview,
        ``,
        `## Architecture & Features`,
        ...exp.caseStudy.features.map((f) => `- ${f.title}: ${f.details}`),
        ``,
        `## Challenges & Solutions`,
        ...exp.caseStudy.challenges.map((c) => `- Problem: ${c.problem}\n  Solution: ${c.solution}`),
        ``,
        `## Results`,
        ...exp.caseStudy.results.map((r) => `- ${r.replace(/\*\*/g, "")}`),
      ];
      caseStudiesChildren[`${slug}-case-study.md`] = {
        type: "file",
        name: `${slug}-case-study.md`,
        content: csLines.join("\n"),
        guiSection: "/#case-studies",
      };
    }
  });

  const projectsChildren: Record<string, FsNode> = {};
  projects.forEach((proj) => {
    const slug = slugify(proj.title);
    const lines = [
      `# ${proj.title}`,
      `Category : ${proj.type}`,
      `Tech     : ${proj.tech.join(", ")}`,
      `Repo URL : ${proj.repo}`,
      ``,
      `## Summary`,
      proj.desc,
      ``,
      `## Highlights`,
      ...proj.highlights.map((h) => `- ${h}`),
    ];
    projectsChildren[`${slug}.md`] = {
      type: "file",
      name: `${slug}.md`,
      content: lines.join("\n"),
      redirectUrl: proj.repo,
      guiSection: "/#projects",
    };
  });

  const servicesChildren: Record<string, FsNode> = {};
  services.forEach((svc) => {
    const lines = [
      `service: ${svc.title}`,
      `metrics: ${svc.metrics}`,
      `summary: ${svc.shortDesc}`,
      `description: ${svc.description}`,
      `technologies: [${svc.technologies.join(", ")}]`,
      `deliverables:`,
      ...svc.deliverables.map((d) => `  - ${d}`),
    ];
    servicesChildren[`${svc.id}.yaml`] = {
      type: "file",
      name: `${svc.id}.yaml`,
      content: lines.join("\n"),
      guiSection: "/#services",
    };
  });

  const blogsChildren: Record<string, FsNode> = {
    "featured-articles.md": {
      type: "file",
      name: "featured-articles.md",
      content: [
        `# AWS Builder Center & Technical Publications (${blogs.length} Total)`,
        `Profile : https://builder.aws.com/community/@binodprasadjoshi?tab=articles`,
        ``,
        ...blogs.slice(0, 10).map(
          (b, i) =>
            `[${String(i + 1).padStart(2, "0")}] (${b.date} | ${b.platform}) ${b.title}\n     ${b.description}\n     Read: ${b.url}`
        ),
        ``,
        `Tip: Run 'cat all-blogs.txt' to read all ${blogs.length} articles.`,
      ].join("\n"),
      redirectUrl: "https://builder.aws.com/community/@binodprasadjoshi?tab=articles",
      guiSection: "/#blogs",
    },
    "all-blogs.txt": {
      type: "file",
      name: "all-blogs.txt",
      content: blogs
        .map(
          (b, i) =>
            `[${String(i + 1).padStart(2, "0")}] ${b.title}\n     Platform: ${b.platform} | Date: ${b.date} | Tags: ${b.tags.join(", ")}\n     URL: ${b.url}`
        )
        .join("\n\n"),
      redirectUrl: "https://builder.aws.com/community/@binodprasadjoshi?tab=articles",
      guiSection: "/#blogs",
    },
  };

  const certsChildren: Record<string, FsNode> = {
    "credentials.txt": {
      type: "file",
      name: "credentials.txt",
      content: certifications
        .map(
          (c) =>
            `[PASS] ${c.title}\n       Issuer: ${c.issuer} | ${c.date} | ID: ${c.id}\n       Verify: ${c.link}`
        )
        .join("\n\n"),
      redirectUrl: "https://www.credly.com/users/binod-prasad-joshi.69a505f6/badges/credly",
      guiSection: "/#certifications",
    },
  };
  certifications.forEach((cert) => {
    if (cert.image) {
      const slug = slugify(cert.id || cert.title);
      certsChildren[`${slug}.png`] = {
        type: "file",
        name: `${slug}.png`,
        imageSrc: cert.image,
        redirectUrl: cert.link,
        guiSection: "/#certifications",
        content: `Badge Image: ${cert.title} (${cert.issuer})\nVerify URL : ${cert.link}`,
      };
    }
  });

  return {
    type: "dir",
    name: "~",
    guiSection: "/",
    children: {
      "welcome.txt": {
        type: "file",
        name: "welcome.txt",
        content: [
          `Welcome to Binod Linux World (Ubuntu 24.04 LTS // binod-cloud)`,
          `----------------------------------------------------------------`,
          `Operator : ${personal.name}`,
          `Role     : ${personal.role}`,
          `Location : Kathmandu, Nepal (UTC+5:45 | Remote-friendly)`,
          `Tagline  : ${personal.tagline}`,
          ``,
          `Use Linux commands to explore everything in this portfolio:`,
          `  ls, cd <dir>, cat <file>, nano <file>, view <image>, tree, open <link>, help`,
        ].join("\n"),
      },
      about: {
        type: "dir",
        name: "about",
        guiSection: "/#about",
        children: {
          "bio.txt": {
            type: "file",
            name: "bio.txt",
            guiSection: "/#about",
            content: [
              `Name     : ${personal.name}`,
              `Role     : ${personal.role}`,
              `Address  : Kathmandu, Nepal (UTC+5:45)`,
              `Tagline  : ${personal.tagline}`,
              ``,
              `Recognitions:`,
              ...personal.aboutCards.map((a) => `- ${a.title} (${a.subtitle})`),
            ].join("\n"),
          },
          "profile-dotmatrix.img": {
            type: "file",
            name: "profile-dotmatrix.img",
            isDotMatrix: true,
            imageSrc: "/profile-headshot.jpg",
            guiSection: "/#about",
            content: `3D Interactive Dot-Matrix Portrait of ${personal.name} (Kathmandu, Nepal)`,
          },
          "profile-headshot.jpg": {
            type: "file",
            name: "profile-headshot.jpg",
            imageSrc: "/profile-headshot.jpg",
            guiSection: "/#about",
            content: `Studio Portrait: /profile-headshot.jpg`,
          },
          "aws-stage-speaking.jpg": {
            type: "file",
            name: "aws-stage-speaking.jpg",
            imageSrc: "/portfoilo.jpeg",
            guiSection: "/#hero",
            content: `Speaking on AWS Stage: /portfoilo.jpeg`,
          },
        },
      },
      experience: {
        type: "dir",
        name: "experience",
        guiSection: "/#experience",
        children: experienceChildren,
      },
      "case-studies": {
        type: "dir",
        name: "case-studies",
        guiSection: "/#case-studies",
        children: caseStudiesChildren,
      },
      projects: {
        type: "dir",
        name: "projects",
        guiSection: "/#projects",
        children: projectsChildren,
      },
      services: {
        type: "dir",
        name: "services",
        guiSection: "/#services",
        children: servicesChildren,
      },
      blogs: {
        type: "dir",
        name: "blogs",
        guiSection: "/#blogs",
        children: blogsChildren,
      },
      certifications: {
        type: "dir",
        name: "certifications",
        guiSection: "/#certifications",
        children: certsChildren,
      },
      skills: {
        type: "dir",
        name: "skills",
        guiSection: "/#skills",
        children: {
          "stack.json": {
            type: "file",
            name: "stack.json",
            guiSection: "/#skills",
            content: JSON.stringify(skills, null, 2),
          },
        },
      },
      contact: {
        type: "dir",
        name: "contact",
        guiSection: "/#contact",
        children: {
          "links.txt": {
            type: "file",
            name: "links.txt",
            guiSection: "/#contact",
            content: [
              `# Direct Contact & Redirect Links`,
              `Email          : mailto:${personal.email}`,
              `GitHub         : ${personal.links.github}`,
              `LinkedIn       : ${personal.links.linkedin}`,
              `Resume PDF     : ${personal.links.resume}`,
              `AWS Builder    : https://builder.aws.com/community/@binodprasadjoshi?tab=articles`,
              `Credly Badges  : https://www.credly.com/users/binod-prasad-joshi.69a505f6/badges/credly`,
              `LeetCode       : https://leetcode.com/u/Binod124/`,
            ].join("\n"),
          },
        },
      },
    },
  };
}

