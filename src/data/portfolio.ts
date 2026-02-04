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
      resume: "https://drive.google.com/file/d/15AhzmgejGs07HO46QsgK0PlyTGbdHTaJ/view?usp=drive_link",
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
      tech: ["FastAPI", "AWS EC2", "Redis", "Docker", "PostgreSQL", "React", "AWS", "Laravel", "Cloud Architect"],
      impacts: [
        "Improved OAuth2 authentication performance by ~95% using Redis JWKS caching",
        "Built async backend services using FastAPI + Async SQLAlchemy",
        "Achieved ~99.9% service availability",
        "Automated enterprise user provisioning & anonymization (1000+ accounts)",
        "Containerized services with Docker",
        "Architected and managed multi-service AWS infrastructure (EC2, S3, DynamoDB) for production workloads",
        "Implemented secure authentication flows using AWS Cognito and IAM policies",
        "Managed DNS and domain routing strategies using AWS Route 53",
        "Worked with RBAC, secure APIs, multi-role platforms",
      ],
      caseStudy: {
        title: "AWS Pathway: Scalable EdTech Infrastructure",
        overview: "AWS Pathway is a comprehensive exam simulation and learning management system (LMS) engineered to handle high-stakes certification exams for both individual students (B2C) and enterprise organizations (B2B). Unlike simple quiz apps, this platform required stateful session management, strict security constraints, and real-time interactivity.",
        features: [
          {
            title: "Robust Exam Engine",
            details: "Built the core simulation logic for timed exams with complex weighted scoring algorithms (e.g., distinguishing 'Security' vs 'Architecture' domains). Engineered a session system that continually saves progress to Redis/Postgres to prevent data loss."
          },
          {
            title: "Enterprise (B2B) Portal",
            details: "Designed a hierarchical RBAC system for organizations to manage thousands of students. Implemented async bulk-upload endpoints for assigning licenses and vouchers in batches."
          },
          {
            title: "Real-Time Interactions",
            details: "Leveraged WebSockets and Redis Pub/Sub to power live classroom polls and instant notifications. Implemented server-side timers resistant to client-side manipulation."
          },
           {
            title: "'DocFlow' RAG Pipeline",
            details: "Developed a custom PDF processing pipeline to parse study materials, enabling users to highlight text and save notes. This serves as the structured data foundation for future AI tutoring agents."
          },
          {
            title: "Cloud-Native Infrastructure",
            details: "Designed a serverless-first architecture leveraging AWS Amplify for frontend hosting and AWS Cognito for secure identity management. Utilized Route 53 for latency-based routing and DynamoDB for single-digit millisecond data access."
          }
        ],
        challenges: [
          {
            problem: "Handling High Concurrency",
            solution: "Used FastAPI with AsyncIO to handle thousands of concurrent exam sessions without blocking. Implemented Redis caching for question banks, reducing DB load by 60%."
          },
           {
            problem: "Data Integrity & Schema Evolution",
            solution: "Managed 39+ database migrations using Alembic, ensuring zero-downtime schema updates for a rapidly evolving tailored application."
          },
          {
            problem: "Unified Auth for B2B & B2C",
            solution: "Implemented a Dual Authentication System supporting Google OAuth2 and standard JWT, unified under a single user model to serve both enterprise and individual users securely."
          }
        ],
        results: [
          "🏆 **Scalability**: Successfully scales to support enterprise-level traffic via Docker Compose.",
          "⚡ **Performance**: Achieved <100ms API response times for core exam actions.",
          "✅ **Reliability**: Established a comprehensive Pytest suite covering critical business logic."
        ]
      },
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
      tech: ["Python", "LLMs", "RAG", "Vector DB", "Multi-Agent Systems", "LangChain", "LangGraph"],
      impacts: [
        "Developing an intelligent document analysis system with LLMs to automate processing of diverse document formats.",
        "Deployed a vector database supporting semantic search and high-accuracy RAG pipelines.",
        "Designed multi-agent system for summarization and sentiment analysis, significantly reducing manual review workloads.",
      ],
      caseStudy: {
        title: "Intelligent Document Analysis & RAG Pipeline",
        overview: "Transformed manual document review processes into an automated, AI-driven workflow. The system leverages Large Language Models (LLMs) and Vector Databases to perform semantic search, summarization, and sentiment analysis on large volumes of unstructured data.",
        features: [
          {
            title: "Vector Search Engine",
            details: "Implemented a semantic search architecture using vector databases to retrieve highly relevant document contexts, moving beyond simple keyword matching."
          },
          {
            title: "Multi-Agent System",
            details: "Designed a modular system where specialized agents handle distinct tasks like summarization, entity extraction, and sentiment analysis, improving overall accuracy."
          },
          {
            title: "Automated Ingestion Pipeline",
            details: "Built robust pipelines to parse, chunk, and embed diverse document formats (PDF, Docx) for efficient LLM processing."
          }
        ],
        challenges: [
          {
            problem: "LLM Hallucinations",
            solution: "Implemented Retrieval-Augmented Generation (RAG) with strict context windowing to ground answers in source data, significantly reducing fabrication."
          },
          {
            problem: "Unstructured Data Variety",
            solution: "Developed custom pre-processing parsers to standardize input formats before vectorization, ensuring consistent data quality."
          }
        ],
        results: [
          "📉 **Efficiency**: Reduced manual document review time by **~70%**.",
          "🎯 **Accuracy**: Achieved **high precision** in semantic retrieval for complex queries.",
          "🚀 **Scalability**: Successfully deployed a scalable **RAG pipeline** supporting multiple document types."
        ]
      },
    },
    {
      company: "Freelance Backend Developer",
      role: "Backend Developer",
      period: "Freelance",
      type: "Remote",
      tech: ["Flask", "SQLite", "JavaScript", "HTML/CSS"],
      impacts: [
        "Designed and developed a full-featured stock and billing system tailored to a client's bookstore business.",
        "Implemented real-time stock management with automatic inventory deduction during billing.",
        "Developed daily, monthly, and yearly sales reporting for actionable business insights.",
        "Built an interactive dashboard showing top-selling books and frequent buyers.",
        "Integrated secure admin login with role-based access to manage the system.",
      ],
      caseStudy: {
        title: "End-to-End Business Inventory System",
        overview: "A comprehensive, tailored full-stack solution designed to modernize a bookstore's operations. The system replaced manual record-keeping with a digital platform for managing stock, processing billing, and generating actionable business analytics.",
        features: [
          {
            title: "Real-time Inventory Management",
            details: "Engineered automatic stock deduction logic that triggers immediately upon billing, preventing overselling and ensuring accurate inventory counts."
          },
          {
            title: "Analytics Dashboard",
            details: "Built an interactive dashboard providing visualizations for daily, monthly, and yearly sales, helping the owner identify top-selling items and trends."
          },
          {
            title: "Role-Based Access Control",
            details: "Implemented secure admin and staff portals with differentiated permissions to protect sensitive financial data."
          }
        ],
        challenges: [
          {
            problem: "Data Consistency in High Volume",
            solution: "Implemented database transactions to ensure atomic updates for billing and stock adjustments, preventing data corruption during concurrent sales."
          },
          {
            problem: "Complex Reporting Queries",
            solution: "Optimized SQL queries and added database indexing to enable fast generation of detailed sales reports."
          }
        ],
        results: [
          "⏱️ **Efficiency**: Streamlined the billing process, reducing checkout time by **~40%**.",
          "📊 **Insights**: Provided **real-time insights** into business performance and inventory levels.",
          "✅ **Accuracy**: Eliminated manual stock tracking errors and billing discrepancies."
        ]
      },
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
      title: "EDURIDE(Multi-Tenant SaaS Backend)",
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
      link: "https://www.credly.com/badges/4fe1dc98-121e-41ed-a1b1-0d611ef6b6ac/public_url", // Placeholder logic

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
      title: "AWS Cloud Quest: Serverless Developer",
      issuer: "Amazon Web Services",
      date: "Hands-on Labs",
      id: "QUEST-SD",
      theme: "pink",
      border: "hover:border-pink-500/50",
      gradient: "from-pink-500/10 to-transparent",
      link: "https://www.credly.com/badges/fab8bca5-d14d-4327-a2d6-8cff3e8e205a/public_url",
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
      date: "January 8, 2026",
      tags: ["AWS", "EC2", "Tutorial", "DevOps"],
      url: "https://awspathway.com/blog/hands-on-deploying-a-backend-application-on-aws-ec2-beginner-friendly",
      color: "blue"
    },
    {
      title: "AWS re:Invent 2025 Recap: The 5 Biggest Announcements Shaping the Cloud",
      description: "An in-depth analysis of the most impactful announcements from AWS re:Invent 2025 and their implications for cloud engineering.",
      date: "December 15, 2025",
      tags: ["AWS", "re:Invent", "Cloud News"],
      url: "https://awspathway.com/blog/aws-re-invent-2025-recap-the-5-biggest-announcements-shaping-the-cloud",
      color: "orange"
    },
    {
      title: "The Definitive Guide to AWS RDS: Architecting Persistence for Modern Backends",
      description: "In the modern cloud ecosystem, \"stateless\" is the goal for compute, but \"stateful\" is the reality for business logic. Every user session, every transaction, and every inventory update needs a home. While spinning up an EC2 instance or a Lambda function is trivial, architecting a production-ready, highly available, and secure database layer remains one of the most challenging tasks for a Backend Engineer. This is not a quick-start guide. This is an architectural deep dive. We are going to deconstruct the Amazon Relational Database Service (RDS), dissect the networking principles that secure it, and build a robust environment using the \"Least Privilege\" security model. We will move beyond the Management Console and verify our infrastructure using the command line, just as a DevOps engineer would in a real-world scenario.",
      date: "October 18, 2025",
      tags: ["AWS", "RDS", "Database", "Architecture", "Security"],
      url: "https://awspathway.com/blog/build-your-db-server-and-interact-with-your-db-using-an-app",
      color: "amber"
    },
    {
      title: "AWS Amplify Deployment & Security Guide for Next.js (Production-Ready)",
      description: "Deploying a modern web application is not just about pushing code to the cloud; it's about leveraging the cloud's capabilities to deliver a seamless user experience. A production-ready deployment requires a robust DNS strategy and secure edge protection.",
      date: "September 15, 2025",
      tags: ["AWS Amplify", "Next.js", "Security", "Deployment"],
      url: "https://awspathway.com/blog/aws-amplify-deployment-security-guide-for-next-js-production-ready",
      color: "purple"
    },
  ],
};
