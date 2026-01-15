export const portfolio = {
  personal: {
    name: "Binod Prasad Joshi",
    role: "2x AWS Certified",
    location: "Nepal / India (Remote-friendly)",
    tagline: "Building scalable, secure, and reliable cloud-native backend systems.",
    email: "joshibinodprasad77@gmail.com", // Placeholder, will need user to confirm or use generic
    links: {
      github: "https://github.com/Binod231", // Placeholder
      linkedin: "https://www.linkedin.com/in/binod-prasad-joshi-549067281", // Placeholder
      resume: "https://drive.google.com/file/d/1WCPjfw0yLgO1gQfOgpPcib6qczGJu0V7/view?usp=drive_link",
    },
    photo: "/portfoilo.jpeg",
  },
  skills: {
    cloud: ["AWS (EC2, S3, RDS, IAM, CloudWatch)"],
    devops: ["Docker", "GitHub Actions (CI/CD)", "Linux", "Redis"],
    backend: ["FastAPI", "Flask", "Django", "Async SQLAlchemy"],
    databases: ["PostgreSQL", "MySQL", "Redis", "Vector Databases"],
    concepts: [
      "OAuth2",
      "REST APIs",
      "Cloud Architecture",
      "Monitoring & Logging",
      "Infrastructure Automation",
      "API Security",
    ],
  },
  experience: [
    {
      company: "Karnovation Inc",
      role: "Junior Backend / Cloud Engineer",
      period: "Jan 2026 – Present",
      type: "Remote",
      impacts: [
        "Improved OAuth2 authentication performance by ~95% using Redis JWKS caching",
        "Built async backend services using FastAPI + Async SQLAlchemy",
        "Achieved ~99.9% service availability",
        "Automated enterprise user provisioning & anonymization (1000+ accounts)",
        "Containerized services with Docker",
        "Assisted CI/CD deployments on AWS EC2",
        "Worked with RBAC, secure APIs, multi-role platforms",
      ],
      history: [
        { role: "Backend Engineer Trainee", period: "Dec 2025 – Jan 2026" },
        { role: "Backend Software Intern", period: "Sep 2025 – Dec 2025" }
      ]
    },
    {
      company: "Sabudh Foundation",
      role: "Data Science Intern",
      period: "Jun 2025 – Dec 2025",
      type: "Remote",
      impacts: [
        "Developing an intelligent document analysis system with LLMs to automate processing of diverse document formats.",
        "Deployed a vector database supporting semantic search and high-accuracy RAG pipelines.",
        "Designed multi-agent system for summarization and sentiment analysis, significantly reducing manual review workloads.",
      ],
    },
    {
      company: "Freelance Backend Developer",
      role: "Backend Developer",
      period: "Freelance",
      type: "Remote",
      impacts: [
        "Designed and developed a full-featured stock and billing system tailored to a client's bookstore business.",
        "Implemented real-time stock management with automatic inventory deduction during billing.",
        "Developed daily, monthly, and yearly sales reporting for actionable business insights.",
        "Built an interactive dashboard showing top-selling books and frequent buyers.",
        "Integrated secure admin login with role-based access to manage the system.",
      ],
    },
  ],
  projects: [
    {
      title: "Build a RAG API with FastAPI",
      type: "AI Engineering",
      desc: "Demonstrating RAG implementation with FastAPI, using Ollama, Chroma, and TinyLlama for local AI model execution.",
      tech: ["Python", "FastAPI", "Ollama", "ChromaDB", "TinyLlama"],
      repo: "https://learn.nextwork.org/nostalgic_pink_clever_cherimoya/docs/ai-devops-api",
      color: "violet",
      highlights: [
        "Integrated Ollama and TinyLlama for local AI model execution",
        "Built a RAG pipeline with ChromaDB for knowledge base embeddings",
        "Developed FastAPI endpoints for querying and dynamic content management",
      ],
    },
    {
      title: "School Bus Management System",
      type: "Cloud SaaS",
      desc: "Multi-tenant backend with real-time GPS ingestion.",
      tech: ["AWS EC2", "Docker", "RBAC", "Multi-tenant", "FastAPI"],
      repo: "https://github.com/Binod231/School_Bus_Management_System.git",
      color: "blue",
      highlights: [
        "Architected multi-tenant backend ensuring tenant-isolated data",
        "Implemented real-time GPS ingestion for bus tracking",
        "Deployed on AWS EC2 with Docker containerization",
      ],
    },
    {
      title: "Stores REST API",
      type: "E-commerce Backend",
      desc: "Robust E-commerce backend with secure authentication.",
      tech: ["JWT", "Redis", "Swagger", "Docker"],
      repo: "https://github.com/Binod231/rest-api-project.git",
      color: "amber",
      highlights: [
        "Implemented secure JWT authentication with Redis token invalidation",
        "Auto-generated API documentation using Swagger",
        "Fully containerized service for easy deployment",
      ],
    },
    {
      title: "Book Stock & Billing Management System",
      type: "Full Stack Application",
      desc: "Comprehensive stock and billing solution tailored for bookstore operations.",
      tech: ["Python", "Flask", "SQLite", "JavaScript", "RBAC"],
      repo: "https://github.com/Binod231/Book-and-Billing-System.git",
      color: "emerald",
      highlights: [
        "Implemented real-time stock management with automatic inventory deduction",
        "Developed daily, monthly, and yearly sales reporting for business insights",
        "Built interactive dashboard showing top-selling books and frequent buyers",
        "Integrated secure admin login with role-based access control",
      ],
    },
    {
      title: "CS50 Birthday Manager",
      type: "Web Application",
      desc: "A web application built as part of Harvard University's CS50x course to manage birthdays.",
      tech: ["Flask", "SQLite", "HTML/CSS", "Jinja2"],
      repo: "https://github.com/Binod231/-CS50x-Birthday-Project.git",
      color: "pink",
      highlights: [
        "Implemented CRUD functionality for birthday records (Add, Edit, Delete)",
        "Designed responsive interface optimized for both mobile and desktop",
        "Utilized helper functions for efficient database management",
      ],
    },
    {
      title: "Hospital Management System",
      type: "Desktop Application",
      desc: "Centralized patient information system streamlining hospital operations.",
      tech: ["Python", "Tkinter", "SQLite", "MySQL"],
      repo: "https://github.com/Binod231/Hospital-Management-System.git",
      color: "cyan",
      highlights: [
        "Engineered Tkinter-based GUI for streamlined navigation",
        "Optimized image processing using PIL, reducing loading time by 50%",
        "Managed 10,000+ records with SQLite, enhancing retrieval speed by 40%",
        "Implemented secure authentication and CRUD operations",
      ],
    },
  ],
  certifications: [
    {
      title: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "Valid until 2029",
      id: "SAA-C03",
      theme: "orange",
      border: "hover:border-orange-500/50",
      gradient: "from-orange-500/10 to-transparent",
      link: "https://cp.certmetrics.com/amazon/en/public/verify/credential/608246a4da294388bcb53230d5012505", // Placeholder logic

    },
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Valid until 2028",
      id: "CLF-C02",
      theme: "blue",
      border: "hover:border-blue-500/50",
      gradient: "from-blue-500/10 to-transparent",
      link: "https://www.credly.com/badges/f31fbcf5-1fdc-4f17-9f1b-41d7a1973d5c/public_url",

    },
    {
      title: "AWS Cloud Quest: Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Hands-on Labs",
      id: "QUEST",
      theme: "green",
      border: "hover:border-green-500/50",
      gradient: "from-green-500/10 to-transparent",
      link: "https://www.credly.com/badges/f3b317af-3010-4168-a35d-57019fab009e/public_url",

    },
    {
      title: "NPTEL Elite + Silver Award",
      issuer: "NPTEL (IIT Madras)",
      date: "Cloud Computing & ML",
      id: "ELITE",
      theme: "yellow",
      border: "hover:border-yellow-500/50",
      gradient: "from-yellow-500/10 to-transparent",
      link: "https://drive.google.com/file/d/1PLmbxr-GYJdqlXvptDIMHc2d7Xa9_DVz/view?usp=drive_link",

    },
    {
      title: "Top SQL 50 Badge",
      issuer: "LeetCode",
      date: "Problem Solving",
      id: "SQL-50",
      theme: "amber",
      border: "hover:border-amber-500/50",
      gradient: "from-amber-500/10 to-transparent",
      link: "https://leetcode.com/u/Binod124/",

    },
    {
      title: "AWS Academy Graduate",
      issuer: "AWS Academy",
      date: "2025",
      id: "FOUNDATION",
      theme: "purple",
      border: "hover:border-purple-500/50",
      gradient: "from-purple-500/10 to-transparent",
      link: "https://www.credly.com/badges/399aee65-8615-4184-8e2e-936079480423/public_url",

    },
  ],
  blogs: [
    {
      title: "Hands-On: Deploying a Backend Application on AWS EC2 (Beginner-Friendly)",
      description: "A step-by-step guide to deploying your first backend application on AWS EC2, covering setup, security groups, and deployment best practices.",
      date: "January 2026",
      tags: ["AWS", "EC2", "Tutorial", "DevOps"],
      url: "https://awspathway.com/blog/hands-on-deploying-a-backend-application-on-aws-ec2-beginner-friendly",
      color: "blue"
    },
    {
      title: "AWS re:Invent 2025 Recap: The 5 Biggest Announcements Shaping the Cloud",
      description: "An in-depth analysis of the most impactful announcements from AWS re:Invent 2025 and their implications for cloud engineering.",
      date: "December 2025",
      tags: ["AWS", "re:Invent", "Cloud News"],
      url: "https://awspathway.com/blog/aws-re-invent-2025-recap-the-5-biggest-announcements-shaping-the-cloud",
      color: "orange"
    },
    {
      title: "AWS Latest Updates 2025",
      description: "A comprehensive roundup of the latest AWS service updates, features, and enhancements announced in 2025.",
      date: "January 2026",
      tags: ["AWS", "Updates", "Cloud"],
      url: "https://awspathway.com/blog/aws-latest-updates-2025",
      color: "emerald"
    },
  ],
};
