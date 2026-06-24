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
      resume: "https://drive.google.com/file/d/1QdJ0GqlDd9ft0moKAfKePkIh_cKaUklA/view?usp=sharing",
    },
    photo: "/portfoilo.jpeg",
    aboutCards: [
      { title: "AWS Community Builder", subtitle: "Dev Tools (2026)", icon: "award", theme: "orange" },
      { title: "Google Student Ambassador", subtitle: "Google DSC (2026)", icon: "globe", theme: "google" },
    ],
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
      company: "One Cloud Utopia",
      role: "DevOps Consultant",
      period: "May 2026 – Present",
      type: "Remote (Contract)",
      tech: [
        "AWS (ECS Fargate, SAM, RDS, Cognito, Route53, WAF)",
        "Docker & Compose",
        "GitHub Actions",
        "FastAPI",
        "Next.js",
        "PostgreSQL (Alembic)",
        "Redis (ElastiCache)",
        "Nginx",
        "CloudWatch & X-Ray"
      ],
      impacts: [
        "Led DevOps operations and backend optimization for 4 production applications (**Zyrona**, **Outfitmirror**, **Princika Traders**, and **MCQtest**), ensuring high availability, scalability, and operational excellence.",
        "Analyzed system architectures, identified critical performance and security gaps, and implemented improvements across infrastructure and application layers.",
        "Designed and maintained CI/CD pipelines, automated deployment workflows, monitored production environments, resolved complex incidents, and optimized backend services for enhanced performance and reliability.",
        "Collaborated closely with cross-functional teams to streamline development and deployment processes.",
        "Provided mentorship to junior engineers, fostering technical growth through hands-on guidance in DevOps practices, cloud technologies, backend development, troubleshooting, and production support."
      ],
      caseStudy: {
        title: "Multi-App Cloud Modernization, AI Scaling & Automated Infrastructure",
        overview: "Orchestrated infrastructure, security, and automated deployment pipelines for four production products: Zyrona (ASG-backed retail e-commerce), Outfitmirror (AI-powered virtual try-on using Amazon Bedrock), Princika Traders (Next.js/FastAPI inventory monorepo), and MCQtest (concurrency-sensitive, high-availability online testing engine). Bridged development workflows and AWS environments to maximize release speed and system reliability.",
        features: [
          {
            title: "MCQtest: Secure, Multi-AZ ECS Fargate Infrastructure",
            details: "Built a 12-stack CloudFormation architecture featuring public/private VPC subnets, ECS Fargate, Multi-AZ RDS PostgreSQL, Multi-AZ ElastiCache Redis, and AWS WAF rate-limiting to support heavy concurrent test-taking spikes."
          },
          {
            title: "Outfitmirror: Serverless AI Integration with AWS SAM",
            details: "Developed a serverless VTO pipeline using AWS SAM, integrating Bedrock Nova Canvas models for asynchronous image generation, secure AWS Cognito Hosted UI auth pools, and media storage on Amazon S3."
          },
          {
            title: "Zyrona: Cost-Optimized Compute & Search Infrastructure",
            details: "Configured zero-downtime rolling updates via EC2 Launch Templates and ASG instance refreshes. Migrated search functionality from expensive OpenSearch instances to database query filters, achieving a ~30% cost reduction."
          },
          {
            title: "Princika Traders: Monorepo Dockerization & Database Migrations",
            details: "Standardized multi-container workflows with Docker Compose, configured Nginx reverse proxy routes, and integrated Alembic schema migrations into automated GitHub Actions pipelines."
          }
        ],
        challenges: [
          {
            problem: "Slow AI Model Generations & API Timeouts (Outfitmirror)",
            solution: "Decoupled the generation pipeline using asynchronous worker queues and Amazon S3 pre-signed URLs, keeping API response times consistent and cost-effective."
          },
          {
            problem: "Exam Leak Prevention & Security Compliance (MCQtest)",
            solution: "Isolated compute/database layers in private subnets, applied least-privilege security groups, activated AWS Config monitoring, and deployed AWS Backup vaults for daily automated backups."
          }
        ],
        results: [
          "🏆 **High Availability**: Maintained **~99.9% uptime** across all four production applications.",
          "⚡ **CI/CD Speed**: Reduced deployment pipeline duration by **~50%** via multi-stage Docker build cache strategies.",
          "💰 **Cost Optimization**: Achieved a **~30% reduction** in monthly AWS costs by rightsizing compute and replacing OpenSearch with optimized PostgreSQL queries."
        ]
      }
    },
    {
      company: "Karnovation Inc",
      role: "Junior Backend / Cloud Engineer",
      period: "Jan 2026 – may 2026",
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
      title: "API Analyzer: SAST Tool",
      type: "Security Engineering",
      desc: "A lightweight, framework-aware Static Application Security Testing (SAST) tool for Python.",
      tech: ["Python", "AST", "Docker", "Taint Analysis"],
      repo: "https://github.com/Binod231/cloudnative-api-security-analyzer.git",
      color: "red",
      highlights: [
        "Implemented stateful taint analysis to track data flow from sources to dangerous sinks",
        "Developed framework-aware rules for Flask, Django, and FastAPI",
        "Built a multi-threaded scanning engine for high-speed CI/CD integration",
        "Engineered cloud-native support to scan Dockerfiles and container configurations",
      ],
    },
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
      date: "Expires Jan 5, 2029",
      id: "SAA-C03",
      badgeId: "4fe1dc98-121e-41ed-a1b1-0d611ef6b6ac",
      image: "/badges/aws-solutions-architect-associate.png",
      theme: "orange",
      border: "hover:border-orange-500/50",
      gradient: "from-orange-500/10 to-transparent",
      link: "https://www.credly.com/badges/4fe1dc98-121e-41ed-a1b1-0d611ef6b6ac/public_url",
    },
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Expires Oct 13, 2028",
      id: "CLF-C02",
      badgeId: "f31fbcf5-1fdc-4f17-9f1b-41d7a1973d5c",
      image: "/badges/aws-cloud-practitioner.png",
      theme: "blue",
      border: "hover:border-blue-500/50",
      gradient: "from-blue-500/10 to-transparent",
      link: "https://www.credly.com/badges/f31fbcf5-1fdc-4f17-9f1b-41d7a1973d5c/public_url",
    },
    {
      title: "AWS Academy Graduate - Cloud Foundations",
      issuer: "Amazon Web Services",
      date: "Issued Sep 25, 2025",
      id: "FOUNDATION",
      badgeId: "399aee65-8615-4184-8e2e-936079480423",
      image: "/badges/aws-academy-cloud-foundations.png",
      theme: "purple",
      border: "hover:border-purple-500/50",
      gradient: "from-purple-500/10 to-transparent",
      link: "https://www.credly.com/badges/399aee65-8615-4184-8e2e-936079480423/public_url",
    },
    {
      title: "AWS Cloud Quest: Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Issued Sep 28, 2025",
      id: "QUEST",
      badgeId: "f3b317af-3010-4168-a35d-57019fab009e",
      image: "/badges/aws-cloud-quest-cloud-practitioner.png",
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
      badgeId: "fab8bca5-d14d-4327-a2d6-8cff3e8e205a",
      image: "/badges/aws-cloud-quest-serverless-developer.png",
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
  ],
  blogs: [
    {
      title: "How AWS Kiro, AgentCore, and Transform Are Reshaping DevOps in 2026",
      description: "This article explores building secure, production-grade applications by replacing unreliable natural language prompting with deterministic engineering guardrails using the latest AWS agentic framework ecosystem. It details how to implement these frameworks to ensure reliability and security in AI-driven workflows.",
      date: "June 8, 2026",
      tags: ["AWS", "DevOps", "Agentic AI", "Serverless"],
      url: "https://builder.aws.com/content/3Eqi77PpIgEVNgU9VJipjNMEPFC/how-aws-kiro-agentcore-and-transform-are-reshaping-devops-in-2026",
      color: "orange",
      spotlight: "AWS Builder Center"
    },
    {
      title: "Part 2: Hands-On with AWS Kiro, AgentCore, and Transform—Building the 2026 Agentic DevOps Stack",
      description: "A practical, code-first tutorial breaking down how to write deterministic EARS specifications in AWS Kiro, manage persistent session state with Bedrock AgentCore, and execute structural AST code rewrites using ATX blueprints.",
      date: "June 17, 2026",
      tags: ["AWS", "DevOps", "Agentic AI", "Serverless", "Generative AI"],
      url: "https://builder.aws.com/content/3Eqi77PpIgEVNgU9VJipjNMEPFC/part-2-hands-on-with-aws-kiro-agentcore-and-transform-building-the-2026-agentic-devops-stack",
      color: "orange",
      // spotlight: "AWS Builder Center"
    },
    {
      title: "The Rise of AI Agents on AWS: From Chatbots to Autonomous Systems",
      description: "In 2022, the world marveled at ChatGPT’s ability to hold a conversation. By 2024, enterprises were deploying AI systems that could browse the web, write code, execute workflows, and coordinate with other AI agents. Explore how to build production-grade autonomous agent architectures on AWS.",
      date: "April 25, 2026",
      tags: ["AWS", "Amazon Bedrock", "AI Agents", "Cloud Computing"],
      url: "https://medium.com/@joshibinodprasad77/the-rise-of-ai-agents-on-aws-from-chatbots-to-autonomous-systems-cd9ede316bbc",
      color: "cyan"
    },
    {
      title: "7 AWS Developer Tools That Supercharge Backend Engineering (Complete Technical Guide)",
      description: "The contemporary backend engineering landscape is characterized by a fundamental shift away from manual infrastructure management toward automated, code-driven ecosystems. In this post, we explore seven AWS tools that can help you build and deploy backend applications more efficiently.",
      date: "March 12, 2026",
      tags: ["AWS", "Serverless", "Devtools", "Backend"],
      url: "https://dev.to/binod_prasadjoshi_b591ca/7-aws-developer-tools-that-supercharge-backend-engineering-complete-technical-guide-38mo",
      color: "red"
    },
    {
      title: "Architecting the Far West: A Roadmap for Sudurpaschim as Nepal’s Regional AWS Cloud Hub",
      description: "Sudurpaschim, Nepal’s Far West, is a region that has been historically marginalized and underdeveloped. However, with the advent of cloud computing, this region has the potential to become a regional hub for cloud services. In this post, we explore the potential of Sudurpaschim as a regional hub for cloud services and the steps required to make it a reality.",
      tags: ["AWS", "awsbuilder", "Nepal", "Cloud"],
      url: "https://dev.to/binod_prasadjoshi_b591ca/architecting-the-far-west-a-roadmap-for-sudurpaschim-as-nepals-regional-aws-cloud-hub-4lai",
      color: "orange"
    },
    {
      title: "Architecting and Deploying a Scalable Asynchronous Virtual Try-On API on AWS",
      description: "Virtual Try-On (VTO) is rapidly becoming a must-have feature for modern e-commerce platforms. However, integrating Generative AI models like Amazon Bedrock's Nova Canvas poses a unique architectural challenge: AI image generation is slow, while traditional web APIs expect responses in milliseconds. In this post, we explore the event-driven, asynchronous architecture required to solve this problem using AWS Serverless technologies.",
      date: "February 27, 2026",
      tags: ["AWS", "Serverless", "GenAI", "Architecture"],
      url: "https://awspathway.com/blog/architecting-and-deploying-a-scalable-asynchronous-virtual-try-on-api-on-aws",
      color: "violet"
    },
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
