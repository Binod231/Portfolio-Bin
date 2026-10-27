export const portfolio = {
  personal: {
    name: "Binod Prasad Joshi",
    role: "Cloud & DevOps Consultant | 2x AWS Certified | AWS Community Builder",
    location: "Remote-friendly (UTC+5:45)",
    tagline: "Architecting resilient, cost-optimized cloud infrastructure & automated DevOps pipelines.",
    email: "joshibinodprasad77@gmail.com",
    links: {
      github: "https://github.com/Binod231",
      linkedin: "https://www.linkedin.com/in/binod-prasad-joshi-549067281",
      resume: "https://drive.google.com/file/d/1QdJ0GqlDd9ft0moKAfKePkIh_cKaUklA/view?usp=sharing",
    },
    photo: "/portfoilo.jpeg",
    aboutCards: [
      { title: "AWS Community Builder", subtitle: "Dev Tools (2026)", icon: "award", theme: "orange" },
      { title: "Google Student Ambassador", subtitle: "Google DSC (2026)", icon: "globe", theme: "google" },
    ],
  },
  services: [
    {
      id: "cloud-architecture",
      title: "Cloud Architecture & Modernization",
      shortDesc: "Resilient, scalable AWS foundations tailored for production.",
      description: "Design and implement high-availability cloud infrastructure on AWS. Specializing in Multi-AZ VPC network isolation, ECS Fargate serverless containers, zero-downtime rolling deploys, and automated disaster recovery.",
      icon: "cloud" as const,
      deliverables: [
        "Multi-AZ VPC & Subnet topology design",
        "ECS Fargate & Docker container orchestration",
        "High-Availability RDS PostgreSQL & MySQL clustering",
        "Route 53 DNS, CloudFront CDN & WAF edge protection"
      ],
      technologies: ["AWS VPC", "ECS Fargate", "RDS Multi-AZ", "Route 53", "CloudFormation"],
      metrics: "99.9% Uptime SLA Architecture"
    },
    {
      id: "devops-cicd",
      title: "DevOps & Automated CI/CD Pipelines",
      shortDesc: "Rapid, deterministic deployments with zero-downtime rollouts.",
      description: "Build robust continuous integration and continuous deployment pipelines that eliminate deployment anxiety. Implement multi-stage Docker build caching, automated testing gates, and seamless production rollouts.",
      icon: "terminal" as const,
      deliverables: [
        "GitHub Actions enterprise CI/CD workflows",
        "Multi-stage Docker caching (~50% build time cut)",
        "Zero-downtime rolling updates via ASG instance refresh",
        "Alembic automated database schema migrations"
      ],
      technologies: ["GitHub Actions", "Docker", "Docker Compose", "Alembic", "Linux / Bash"],
      metrics: "~50% Faster Pipeline Execution"
    },
    {
      id: "finops-optimization",
      title: "Cloud FinOps & Cost Optimization",
      shortDesc: "Eliminate overprovisioned spend without sacrificing performance.",
      description: "Conduct thorough cloud infrastructure audits to identify compute waste, idle resources, and inefficient queries. Right-size workloads and architect efficient persistence layers to drastically reduce monthly AWS expenditure.",
      icon: "dollar" as const,
      deliverables: [
        "CloudWatch compute & memory rightsizing audit",
        "High-cost service replacement (e.g. OpenSearch to optimized PostgreSQL)",
        "S3 Intelligent-Tiering & Lifecycle archiving policies",
        "Database query indexing & caching with Redis"
      ],
      technologies: ["AWS Cost Explorer", "CloudWatch", "Redis ElastiCache", "PostgreSQL Indexing"],
      metrics: "~30% Monthly Cloud Bill Reduction"
    },
    {
      id: "devsecops-security",
      title: "DevSecOps & Shift-Left Security",
      shortDesc: "Hardening cloud infrastructure and APIs from the ground up.",
      description: "Embed enterprise security early into development and deployment cycles. Implement granular least-privilege IAM policies, WAF rate-limiting rules against DDoS/scraping, and automated static application security testing.",
      icon: "shield" as const,
      deliverables: [
        "AWS WAF rules, rate-limiting & IP reputation lists",
        "Least-privilege IAM policies & private subnet isolation",
        "Static Application Security Testing (SAST) in CI/CD",
        "Automated backup vaults with AWS Backup & AWS Config"
      ],
      technologies: ["AWS WAF", "IAM", "AWS Config", "Taint Analysis SAST", "OAuth2 / JWT"],
      metrics: "Zero Security Incident Track Record"
    },
    {
      id: "ai-infrastructure",
      title: "Generative AI & RAG Infrastructure",
      shortDesc: "Production-ready architectures for LLMs and Vector Search.",
      description: "Bridge the gap between slow, unpredictable AI models and snappy, responsive web applications. Decouple long-running LLM inference via asynchronous task queues, resilient S3 pre-signed workflows, and grounded vector search.",
      icon: "cpu" as const,
      deliverables: [
        "Asynchronous task queues for slow AI model inference",
        "Amazon Bedrock Nova Canvas & LLM integration",
        "Vector database pipelines (pgvector, ChromaDB)",
        "Grounded RAG to eliminate hallucination in production"
      ],
      technologies: ["Amazon Bedrock", "AWS SAM", "FastAPI Async", "pgvector", "ChromaDB"],
      metrics: "<100ms API Response for Core Workflows"
    }
  ],
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
      company: "Glovion Consulting Private Limited",
      role: "DevOps Consultant",
      period: "Oct 2026 - Present",
      type: "Data Center & On-Premises",
      tech: [
        "Private Data Center Infrastructure",
        "Nepali Server Architecture",
        "Linux Bare-Metal & Virtualization (KVM)",
        "Docker & Container Orchestration",
        "Self-Hosted CI/CD Pipelines",
        "Nginx & HAProxy Load Balancing",
        "Local Network Topologies & Firewalls",
        "PostgreSQL & Storage Clusters",
        "Prometheus & Grafana Observability"
      ],
      impacts: [
        "Managing and modernizing Glovion's dedicated private data center operations and on-premise Nepali server infrastructure for high-security enterprise systems.",
        "Architecting bare-metal and virtualized server environments, implementing containerized deployment pipelines, and ensuring continuous production uptime.",
        "Configuring local network routing, reverse proxy load balancers (Nginx/HAProxy), and strict firewall boundaries to guarantee low domestic latency and data sovereignty.",
        "Engineering automated backup replication, bare-metal provisioning scripts, and 24/7 observability suites using Prometheus and Grafana.",
        "Bridging local on-premise compute with cloud-native workflows, providing reliable technical advisory and incident management to client engineering teams."
      ],
      caseStudy: {
        title: "Private Data Center Operations, Local Sovereign Infrastructure & High-Availability Networking",
        overview: "Engineering resilient infrastructure within Glovion's dedicated private data centers in Nepal. Ensuring low-latency network performance, strict data residency compliance, automated self-hosted deployments, and continuous system reliability on local bare-metal and virtualized servers.",
        features: [
          {
            title: "On-Premise Virtualization & Compute Topology",
            details: "Configured resilient bare-metal clusters and virtualized compute pools to maximize hardware utilization, resource isolation, and system uptime."
          },
          {
            title: "Local Traffic Routing & HAProxy/Nginx Load Balancing",
            details: "Implemented reverse proxy clusters and Layer 4/Layer 7 traffic routing optimized for Nepali domestic ISP networks and edge traffic."
          },
          {
            title: "Self-Hosted Deployment Pipelines & Storage Replication",
            details: "Built automated CI/CD runners and local backup synchronization mechanisms ensuring reliable zero-downtime rollouts without reliance on external SaaS."
          }
        ],
        challenges: [
          {
            problem: "Sovereign Data Compliance & Local Network Latency",
            solution: "Architected isolated on-premise network segments with strict firewall ACLs, keeping all core data residency compliant and ensuring sub-10ms domestic latency."
          }
        ],
        results: [
          " **Data Sovereignty**: 100% compliant local data residency hosted entirely within Nepal's domestic data centers.",
          " **Low Latency**: Achieved minimal internal latency across local ISP peering and enterprise backbones.",
          " **High Availability**: Maintained continuous production uptime across on-premise bare-metal and virtualized compute nodes."
        ]
      }
    },
    {
      company: "One Cloud Utopia",
      role: "DevOps Consultant",
      period: "May 2026 - June 2026",
      type: "Remote",
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
          " **High Availability**: Maintained **~99.9% uptime** across all four production applications.",
          " **CI/CD Speed**: Reduced deployment pipeline duration by **~50%** via multi-stage Docker build cache strategies.",
          " **Cost Optimization**: Achieved a **~30% reduction** in monthly AWS costs by rightsizing compute and replacing OpenSearch with optimized PostgreSQL queries."
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
          " **Scalability**: Successfully scales to support enterprise-level traffic via Docker Compose.",
          " **Performance**: Achieved <100ms API response times for core exam actions.",
          " **Reliability**: Established a comprehensive Pytest suite covering critical business logic."
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
          " **Efficiency**: Reduced manual document review time by **~70%**.",
          " **Accuracy**: Achieved **high precision** in semantic retrieval for complex queries.",
          " **Scalability**: Successfully deployed a scalable **RAG pipeline** supporting multiple document types."
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
      title: "The Agentic AI Era on AWS: What’s Trending in 2026 and How to Build Production-Ready Agents",
      description: "Discover the top AWS agentic AI trends in 2026 and learn how to build production-ready agents with Bedrock AgentCore, deterministic guardrails, and real code.",
      date: "September 2026",
      tags: ["AWS", "Agentic AI", "Bedrock AgentCore", "Generative AI", "DevOps"],
      url: "https://builder.aws.com/content/3JFung63VfYEKbYHIUuaJWred3l/the-agentic-ai-era-on-aws-whats-trending-in-2026-and-how-to-build-production-ready-agents",
      color: "orange",
      platform: "AWS Builder Center",
      readTime: "8 min read",
      category: "Generative AI & Bedrock",
    },
    {
      title: "Your AI Agent Has God-Mode IAM. Here's the Proxy I Built to Take It Away.",
      description: "An AI agent with broad IAM can hallucinate its way into disaster. I built a fail-closed proxy that scopes permissions to the task, live.",
      date: "September 2026",
      tags: ["AWS", "IAM", "DevSecOps", "AI Security", "Least Privilege"],
      url: "https://builder.aws.com/content/3IwFRy6vy2DF9gviMgbX1J3uqrq/your-ai-agent-has-god-mode-iam-heres-the-proxy-i-built-to-take-it-away",
      color: "red",
      platform: "AWS Builder Center",
      readTime: "7 min read",
      category: "DevSecOps & Security",
    },
    {
      title: "The Digital Fast-Pass: Building a Low-Latency Global Application on AWS",
      description: "A hands-on Terraform walkthrough of Route 53, CloudFront, Global Accelerator, ALB/NLB, WAF, Shield, and PrivateLink organized around three distinct traffic patterns, not one blended chain.",
      date: "August 2026",
      tags: ["AWS", "Route 53", "CloudFront", "Global Accelerator", "Terraform", "Networking"],
      url: "https://builder.aws.com/content/3IGUEDK1H3yBfsV4W9XvVsCNZpA/the-digital-fast-pass-building-a-low-latency-global-application-on-aws",
      color: "blue",
      platform: "AWS Builder Center",
      readTime: "9 min read",
      category: "AWS Architecture",
    },
    {
      title: "I Gave AI Its Own AWS Machine: Then Destroyed It",
      description: "Building an isolated, ephemeral AI code-execution sandbox with AWS Lambda MicroVMs and Firecracker to safely execute untrusted generative AI output without host contamination.",
      date: "August 2026",
      tags: ["AWS Lambda", "MicroVM", "Firecracker", "Sandboxing", "Security"],
      url: "https://builder.aws.com/content/3Hth5GJ7ehZ6rJnmRaEiEWegoaO/i-gave-ai-its-own-aws-machine-then-destroyed-it",
      color: "violet",
      platform: "AWS Builder Center",
      readTime: "6 min read",
      category: "Generative AI & Bedrock",
    },
    {
      title: "Petabyte AI Pipelines: Apache Pig Meets Amazon Bedrock",
      description: "AWS pipeline: Apache Pig on EMR (Graviton, Tez) handles ETL; Amazon Bedrock enriches and structures data before model training.",
      date: "August 2026",
      tags: ["AWS EMR", "Apache Pig", "Amazon Bedrock", "Big Data", "ETL", "Graviton"],
      url: "https://builder.aws.com/content/3HXH38b8XDsPBealUK4SfPygwLI/petabyte-ai-pipelines-apache-pig-meets-amazon-bedrock",
      color: "amber",
      platform: "AWS Builder Center",
      readTime: "9 min read",
      category: "Databases & RAG",
    },
    {
      title: "Everyone Wanted Spark. We Kept Apache Pig and Won Anyway.",
      description: "How we kept 15-year-old Apache Pig scripts alive on AWS with EMR, cut costs by a third, and automated deploys with GitHub Actions and OIDC.",
      date: "August 2026",
      tags: ["AWS EMR", "Apache Pig", "Cost Optimization", "GitHub Actions", "OIDC"],
      url: "https://builder.aws.com/content/3HJnLkHKc3wjIuL5kDYLi1mO58p/everyone-wanted-spark-we-kept-apache-pig-and-won-anyway",
      color: "emerald",
      platform: "AWS Builder Center",
      readTime: "8 min read",
      category: "DevOps & IaC",
    },
    {
      title: "Stop Reviewing PRs: Let AWS Bedrock Do It",
      description: "Stop manual code reviews! Build a serverless AI pipeline with AWS Bedrock, CodeBuild & CDK that automatically audits PRs and posts fixes.",
      date: "July 2026",
      tags: ["Amazon Bedrock", "CodeBuild", "AWS CDK", "CI/CD", "Automated Review"],
      url: "https://builder.aws.com/content/3HCa4ZqPprwVZM7mfDRBIdrjRNC/stop-reviewing-prs-let-aws-bedrock-do-it",
      color: "cyan",
      platform: "AWS Builder Center",
      readTime: "7 min read",
      category: "DevOps & IaC",
    },
    {
      title: "Stop Fighting Your CI/CD Pipeline: Build a Blazing-Fast Deployment Workflow with AWS DevTools",
      description: "How to stop treating deployments as a stressful event and turn them into a predictable, automated workflow using AWS Developer Tools.",
      date: "July 2026",
      tags: ["AWS DevTools", "CodePipeline", "CodeBuild", "CI/CD", "DevOps"],
      url: "https://builder.aws.com/content/3H9zgHZTP3rEAAIttUYFDYuGHeS/stop-fighting-your-cicd-pipeline-build-a-blazing-fast-deployment-workflow-with-aws-devtools",
      color: "blue",
      platform: "AWS Builder Center",
      readTime: "7 min read",
      category: "DevOps & IaC",
    },
    {
      title: "Beyond Auto-Healing: Building a Safe, Closed-Loop Cloud Operations Control Plane on AWS",
      description: "Building a Safe, Closed-Loop Cloud Operations Control Plane on AWS to detect anomalies and apply remediations without human intervention.",
      date: "July 2026",
      tags: ["AWS Architecture", "Systems Manager", "EventBridge", "CloudWatch", "Self-Healing"],
      url: "https://builder.aws.com/content/3LBOl3P5XRRvgDjKnrBiGGfu2sM/beyond-auto-healing-building-a-safe-closed-loop-cloud-operations-control-plane-on-aws",
      color: "teal",
      platform: "AWS Builder Center",
      readTime: "8 min read",
      category: "AWS Architecture",
    },
    {
      title: "Engineering Low-Latency, Resilient AWS Architectures: Nitro Enclaves, ENA Express, Aurora Limitless, and Route 53 ARC",
      description: "Deep dive into sub-millisecond networking, confidential compute with Nitro Enclaves, distributed Aurora Limitless shards, and cross-region Application Recovery Controller.",
      date: "July 2026",
      tags: ["Nitro Enclaves", "ENA Express", "Aurora Limitless", "Route 53 ARC", "High Availability"],
      url: "https://builder.aws.com/content/3L7im9sqEG85IrvvdSneUC9KYWM/engineering-low-latency-resilient-aws-architectures-nitro-enclaves-ena-express-aurora-limitless-and-route-53-arc",
      color: "purple",
      platform: "AWS Builder Center",
      readTime: "10 min read",
      category: "AWS Architecture",
    },
    {
      title: "Architecting a Zero-Trust Enterprise RAG Gateway on AWS: Multi-Tenant Vector Retrieval, Cedar Policy Enforcement, and Bedrock with Terraform",
      description: "Architecting a Zero-Trust Enterprise RAG Gateway on AWS enforcing fine-grained Cedar authorization policies, multi-tenant vector isolation, and Amazon Bedrock models with Terraform.",
      date: "July 2026",
      tags: ["Zero-Trust", "Cedar Policy", "Amazon Bedrock", "OpenSearch", "Terraform", "RAG"],
      url: "https://builder.aws.com/content/3KiXkWYt4CtP9CdJalw18h5WBKI/architecting-a-zero-trust-enterprise-rag-gateway-on-aws-multi-tenant-vector-retrieval-cedar-policy-enforcement-and-bedrock-with-terraform",
      color: "emerald",
      platform: "AWS Builder Center",
      readTime: "11 min read",
      category: "Databases & RAG",
    },
    {
      title: "Codebase Welcome Guide: an agent that reads a repository so you don't have to start cold",
      description: "An autonomous developer onboarding agent on AWS that inspects AST trees, parses dependency maps, and generates tailored architectural walk-throughs for new codebases.",
      date: "July 2026",
      tags: ["AI Agents", "Developer Productivity", "Bedrock", "Code Analysis", "Tooling"],
      url: "https://builder.aws.com/content/3KX3wE95u013K9Jp0J0MMjXUZUT/codebase-welcome-guide-an-agent-that-reads-a-repository-so-you-dont-have-to-start-cold",
      color: "sky",
      platform: "AWS Builder Center",
      readTime: "6 min read",
      category: "Generative AI & Bedrock",
    },
    {
      title: "Secure by Design, Cheap by Architecture: Mastering AWS Networking for Security & Cost Wins in 2026",
      description: "Mastering AWS Networking for Security & Cost Wins in 2026: eliminating unnecessary NAT gateway charges and cross-AZ data fees while elevating VPC isolation and PrivateLink.",
      date: "June 2026",
      tags: ["AWS Networking", "NAT Gateway", "VPC Endpoints", "Cost Optimization", "Security"],
      url: "https://builder.aws.com/content/3KGdPSxiNg8wzC9SAtXa9T7TcVX/secure-by-design-cheap-by-architecture-mastering-aws-networking-for-security-and-cost-wins-in-2026",
      color: "green",
      platform: "AWS Builder Center",
      readTime: "9 min read",
      category: "AWS Architecture",
    },
    {
      title: "When the WAF Is the Outage: Diagnosing and Tuning AWS Managed Rules Without Giving Up Protection",
      description: "Diagnosing and tuning AWS Managed Rules to stop false positives from breaking production checkout flows while maintaining defense-in-depth against SQLi and XSS.",
      date: "June 2026",
      tags: ["AWS WAF", "Managed Rules", "False Positives", "CloudWatch Logs", "Security Tuning"],
      url: "https://builder.aws.com/content/3K7bzvJFXWVZarA2UoMJYFiKwWc/when-the-waf-is-the-outage-diagnosing-and-tuning-aws-managed-rules-without-giving-up-protection",
      color: "rose",
      platform: "AWS Builder Center",
      readTime: "8 min read",
      category: "DevSecOps & Security",
    },
    {
      title: "Building a Governed Multi-Account AWS Landing Zone with Organizations, Control Tower, and CDK",
      description: "Building a Governed Multi-Account AWS Landing Zone with Organizations, Control Tower, and CDK for automated account vending, SCP guardrails, and centralized logging.",
      date: "June 2026",
      tags: ["Control Tower", "AWS Organizations", "AWS CDK", "Governance", "Multi-Account"],
      url: "https://builder.aws.com/content/3JzFoT107dZDrCP1Rx8Up3MoNxu/building-a-governed-multi-account-aws-landing-zone-with-organizations-control-tower-and-cdk",
      color: "purple",
      platform: "AWS Builder Center",
      readTime: "10 min read",
      category: "DevOps & IaC",
    },
    {
      title: "The Cloud Reaches Home: What AWS Could Mean for Healthcare in Sudurpaschim",
      description: "What AWS Could Mean for Healthcare in Sudurpaschim: exploring hybrid cloud topologies, edge compute, and satellite backhauls to deliver telemedicine to remote districts in Nepal.",
      date: "June 2026",
      tags: ["Nepal", "Sudurpaschim", "Healthcare", "Edge Computing", "Telemedicine"],
      url: "https://builder.aws.com/content/3H2WcwpJFNK3hdw1hTDtdETHzMA/the-cloud-reaches-home-what-aws-could-mean-for-healthcare-in-sudurpaschim",
      color: "amber",
      platform: "AWS Builder Center",
      readTime: "7 min read",
      category: "AWS Architecture",
    },
    {
      title: "Beyond the IDE: Amazon Quick Desktop as the Planning Layer for AI-Assisted Development",
      description: "Amazon Quick Desktop as the Planning Layer for AI-Assisted Development: structuring AI development workflows with project blueprints before letting agents touch source code.",
      date: "June 2026",
      tags: ["AI Development", "Amazon Quick", "Software Engineering", "Productivity"],
      url: "https://builder.aws.com/content/3GvmjRhwGkqwy5kp0kFvz8dVa3Q/beyond-the-ide-amazon-quick-desktop-as-the-planning-layer-for-ai-assisted-development",
      color: "blue",
      platform: "AWS Builder Center",
      readTime: "6 min read",
      category: "Generative AI & Bedrock",
    },
    {
      title: "The Architecture of an Un-Bribable System: Designing for a World Where Humans Can Be Bought",
      description: "Designing for a World Where Humans Can Be Bought: zero-trust systems leveraging cryptographic provenance, multi-party consensus, and append-only audit ledgers.",
      date: "June 2026",
      tags: ["Zero-Trust", "Cryptographic Proofs", "Immutable Audit", "QLDB", "AWS Security"],
      url: "https://builder.aws.com/content/3Gvhob1eTNHJZDNTnFk3zGcHWUb/the-architecture-of-an-un-bribable-system-designing-for-a-world-where-humans-can-be-bought",
      color: "neutral",
      platform: "AWS Builder Center",
      readTime: "8 min read",
      category: "AWS Architecture",
    },
    {
      title: "Zero-Touch Migration: The Hype vs. What Actually Ships",
      description: "The Hype vs. What Actually Ships: a pragmatic teardown of automated cloud migration tools, real-world database replication gotchas, and cutover strategies.",
      date: "June 2026",
      tags: ["Cloud Migration", "AWS MGN", "DMS", "Enterprise Modernization", "IaC"],
      url: "https://builder.aws.com/content/3Gq3nGXGrOWkQ43u3Cbl69Hdonm/zero-touch-migration-the-hype-vs-what-actually-ships",
      color: "indigo",
      platform: "AWS Builder Center",
      readTime: "7 min read",
      category: "DevOps & IaC",
    },
    {
      title: "Why AWS Kiro Might Quietly Kill Your Team's Cursor Subscription?",
      description: "Why AWS Kiro Might Quietly Kill Your Team's Cursor Subscription: native cloud telemetry integration, AWS API orchestration, and deterministic spec-driven code authoring.",
      date: "June 2026",
      tags: ["AWS Kiro", "AI IDE", "Developer Productivity", "DevOps Tools"],
      url: "https://builder.aws.com/content/3GfizSatLbdg1h9vUQMi7m0quti/why-aws-kiro-might-quietly-kill-your-teams-cursor-subscription",
      color: "emerald",
      platform: "AWS Builder Center",
      readTime: "6 min read",
      category: "DevOps & IaC",
    },
    {
      title: "Why Your Serverless Architecture Becomes Monolithic Without You Noticing",
      description: "Why Your Serverless Architecture Becomes Monolithic Without You Noticing: how shared databases, synchronous Lambda chains, and coupled EventBridge schemas recreate distributed monoliths.",
      date: "June 2026",
      tags: ["Serverless", "Event-Driven", "AWS Lambda", "Distributed Systems", "Microservices"],
      url: "https://builder.aws.com/content/3GZEysm5rWjPLAoinSb0q1lTgSp/why-your-serverless-architecture-becomes-monolithic-without-you-noticing",
      color: "red",
      platform: "AWS Builder Center",
      readTime: "7 min read",
      category: "AWS Architecture",
    },
    {
      title: "Fitintelligence: The Engineering Ecosystem behind AI Biomechanics & Gym Operations",
      description: "The Engineering Ecosystem behind AI Biomechanics & Gym Operations: processing edge video streams, calculating joint angles, and generating adaptive workout corrections.",
      date: "May 2026",
      tags: ["Computer Vision", "Bedrock", "Edge AI", "IoT", "Biomechanics"],
      url: "https://builder.aws.com/content/3GJ3GX7cm9bTNd22Hd5vhk2bc1c/fitelligence-the-engineering-ecosystem-behind-ai-biomechanics-and-gym-operations",
      color: "purple",
      platform: "AWS Builder Center",
      readTime: "8 min read",
      category: "Generative AI & Bedrock",
    },
    {
      title: "The Ghost in Your AWS Account: Why Your AI Agent Is the New Insider Threat",
      description: "Why Your AI Agent Is the New Insider Threat: autonomous agents with write permissions representing unpredictable vectors for privilege escalation, and how to stop them.",
      date: "May 2026",
      tags: ["DevSecOps", "AI Security", "IAM", "Threat Modeling", "Auditability"],
      url: "https://builder.aws.com/content/3GG8aq9RZ76KGVBSIokeEALNfu6/the-ghost-in-your-aws-account-why-your-ai-agent-is-the-new-insider-threat",
      color: "rose",
      platform: "AWS Builder Center",
      readTime: "7 min read",
      category: "DevSecOps & Security",
    },
    {
      title: "I Broke Production With Vector Search. Here's the Autopsy.",
      description: "Our RAG app returned confident, fluent, completely wrong answers, and no error ever fired. Here's the full autopsy: what killed it, why, and how to fix it before it happens to you. Featured in AWS Data 4x4 — recognized alongside AWS Community picks for databases and analytics.",
      date: "May 2026",
      tags: ["AWS", "Vector Search", "RAG", "PostgreSQL", "pgvector", "Databases"],
      url: "https://builder.aws.com/content/3FzaBq9Z6bVE5eGEwV0QdVbPIaI/i-broke-production-with-vector-search-heres-the-autopsy",
      color: "green",
      spotlight: "AWS Data 4x4 · $100 AWS Credits Winner",
      winner: true,
      platform: "AWS Builder Center",
      readTime: "8 min read",
      category: "Databases & RAG",
    },
    {
      title: "Stop Vibe Coding: Build Deterministic AI Infrastructure with AWS Blocks",
      description: "Build Deterministic AI Infrastructure with AWS Blocks: explore why AI-generated Infrastructure as Code needs deterministic composition, type-safe backend capabilities, and policy-aware validation.",
      date: "May 2026",
      tags: ["AWS", "IaC", "Generative AI", "DevOps", "AWS Blocks", "Security"],
      url: "https://builder.aws.com/content/3FlFKUUccesUcVX2E9osFo1rR5r/stop-vibe-coding-build-deterministic-ai-infrastructure-with-aws-blocks",
      color: "purple",
      platform: "AWS Builder Center",
      readTime: "6 min read",
      category: "DevOps & IaC",
    },
    {
      title: "Woke Up to a $10,000 AWS Bill? How to Stop Runaway Amazon Bedrock Agent Loops Before They Drain Your Wallet",
      description: "How to Stop Runaway Amazon Bedrock Agent Loops Before They Drain Your Wallet: how recursive tool calling blows up token budgets overnight, and automated AWS Budgets + Lambda circuit breakers.",
      date: "May 2026",
      tags: ["AWS Cost Optimization", "Amazon Bedrock", "Agent Loops", "Budgets", "FinOps"],
      url: "https://builder.aws.com/content/3FemiD2KFjeKbKBfOuXWze0ILIF/woke-up-to-a-dollar10000-aws-bill-how-to-stop-runaway-amazon-bedrock-agent-loops-before-they-drain-your-wallet",
      color: "orange",
      platform: "AWS Builder Center",
      readTime: "7 min read",
      category: "DevOps & IaC",
    },
    {
      title: "Designing a Global Enterprise Network Fabric: The Kiro Fabric Architecture",
      description: "Designing a Global Enterprise Network Fabric: The Kiro Fabric Architecture. Building a resilient multi-region infrastructure using AWS Direct Connect (BFD-tuned), Transit Gateway, and Global Accelerator.",
      date: "May 2026",
      tags: ["AWS", "Networking", "Security", "Architecture", "Direct Connect"],
      url: "https://builder.aws.com/content/3FWhiwOsUlxYVBu47eGpNBSAp0w/designing-a-global-enterprise-network-fabric-the-kiro-fabric-architecture",
      color: "blue",
      platform: "AWS Builder Center",
      readTime: "11 min read",
      category: "AWS Architecture",
    },
    {
      title: "Part 2: Hands-On with AWS Kiro, AgentCore, and Transform—Building the 2026 Agentic DevOps Stack",
      description: "Part 2: Hands-On with AWS Kiro, AgentCore, and Transform. A practical tutorial breaking down how to write deterministic EARS specifications in AWS Kiro and manage persistent session state.",
      date: "May 2026",
      tags: ["AWS Kiro", "AgentCore", "Transform", "DevOps", "Agentic AI"],
      url: "https://builder.aws.com/content/3F1lruEifPtXhGJK5rbAyfiajhE/part-2-hands-on-with-aws-kiro-agentcore-and-transformbuilding-the-2026-agentic-devops-stack",
      color: "amber",
      platform: "AWS Builder Center",
      readTime: "9 min read",
      category: "DevOps & IaC",
    },
    {
      title: "How AWS Kiro, AgentCore, and Transform Are Reshaping DevOps in 2026",
      description: "How AWS Kiro, AgentCore, and Transform Are Reshaping DevOps in 2026. Replacing unreliable natural language prompting with deterministic engineering guardrails using AWS frameworks.",
      date: "April 2026",
      tags: ["AWS", "DevOps", "Agentic AI", "Serverless"],
      url: "https://builder.aws.com/content/3Eqi77PpIgEVNgU9VJipjNMEPFC/how-aws-kiro-agentcore-and-transform-are-reshaping-devops-in-2026",
      color: "orange",
      platform: "AWS Builder Center",
      readTime: "7 min read",
      category: "DevOps & IaC",
    },
    {
      title: "The Rise of AI Agents on AWS: From Chatbots to Autonomous Systems",
      description: "The Rise of AI Agents on AWS: From Chatbots to Autonomous Systems. Explore how to build production-grade autonomous agent architectures on AWS with Amazon Bedrock.",
      date: "April 2026",
      tags: ["AWS", "Amazon Bedrock", "AI Agents", "Cloud Computing"],
      url: "https://builder.aws.com/content/3DQcxknxGQ5BM9N4akSSXQyra0L/the-rise-of-ai-agents-on-aws-from-chatbots-to-autonomous-systems",
      color: "cyan",
      platform: "AWS Builder Center",
      readTime: "6 min read",
      category: "Generative AI & Bedrock",
    },
    {
      title: "Architecting the Far West: A Roadmap for Sudurpaschim as Nepal’s Regional AWS Cloud Hub",
      description: "Architecting the Far West: A Roadmap for Sudurpaschim as Nepal’s Regional AWS Cloud Hub. A technical blueprint for edge computing, local micro data centers, and regional connectivity in Nepal.",
      date: "March 2026",
      tags: ["AWS", "Nepal", "Sudurpaschim", "Cloud Infrastructure"],
      url: "https://builder.aws.com/content/3AmvfQXYYNw3iO2f3IUKFKeyqdS/architecting-the-far-west-a-roadmap-for-sudurpaschim-as-nepals-regional-aws-cloud-hub",
      color: "orange",
      platform: "AWS Builder Center",
      readTime: "7 min read",
      category: "AWS Architecture",
    },
    {
      title: "7 AWS Developer Tools That Supercharge Backend Engineering (Complete Technical Guide)",
      description: "The contemporary backend engineering landscape is characterized by a fundamental shift away from manual infrastructure management toward automated, code-driven ecosystems.",
      date: "March 2026",
      tags: ["AWS", "Serverless", "DevTools", "Backend"],
      url: "https://dev.to/binod_prasadjoshi_b591ca/7-aws-developer-tools-that-supercharge-backend-engineering-complete-technical-guide-38mo",
      color: "red",
      platform: "Dev.to",
      readTime: "8 min read",
      category: "AWS Architecture",
    },
    {
      title: "The Definitive Guide to AWS RDS: Architecting Persistence for Modern Backends",
      description: "An architectural deep dive into Amazon Relational Database Service (RDS), networking principles, and the Least Privilege security model for mission-critical persistence.",
      date: "October 2025",
      tags: ["AWS", "RDS", "Database", "Architecture", "Security"],
      url: "https://awspathway.com/blog/build-your-db-server-and-interact-with-your-db-using-an-app",
      color: "amber",
      platform: "AWS Pathway",
      readTime: "10 min read",
      category: "Databases & RAG",
    },
    {
      title: "AWS re:Invent 2025 Recap: The 5 Biggest Announcements Shaping the Cloud",
      description: "An in-depth analysis of the most impactful announcements from AWS re:Invent 2025 and their implications for enterprise cloud engineering.",
      date: "December 2025",
      tags: ["AWS", "re:Invent", "Cloud News"],
      url: "https://awspathway.com/blog/aws-re-invent-2025-recap-the-5-biggest-announcements-shaping-the-cloud",
      color: "orange",
      platform: "AWS Pathway",
      readTime: "6 min read",
      category: "AWS Architecture",
    },
    {
      title: "AWS Amplify Deployment & Security Guide for Next.js (Production-Ready)",
      description: "Deploying a modern web application is not just about pushing code to the cloud; it's about leveraging the cloud's capabilities to deliver a seamless user experience with edge security.",
      date: "September 2025",
      tags: ["AWS Amplify", "Next.js", "Security", "Deployment"],
      url: "https://awspathway.com/blog/aws-amplify-deployment-security-guide-for-next-js-production-ready",
      color: "purple",
      platform: "AWS Pathway",
      readTime: "6 min read",
      category: "DevOps & IaC",
    },
  ],
};
