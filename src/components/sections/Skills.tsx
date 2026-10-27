"use client";

import { portfolio } from "@/data/portfolio";

export default function Skills() {
  const categories = [
    {
      name: "Cloud & AWS Infrastructure",
      description: "Production architectural primitives",
      items: [
        "Amazon ECS Fargate",
        "AWS Multi-AZ VPC",
        "AWS RDS PostgreSQL",
        "AWS S3 & CloudFront",
        "AWS Route 53",
        "Amazon Bedrock Nova Canvas",
        "CloudWatch & X-Ray",
        "AWS WAF & IAM",
      ],
    },
    {
      name: "DevOps & CI/CD Automation",
      description: "Delivery pipelines & containerization",
      items: [
        "GitHub Actions",
        "Docker & Multi-Stage Builds",
        "Docker Compose",
        "ASG Instance Refresh",
        "Alembic Migrations",
        "Nginx Reverse Proxy",
        "Linux / Bash Scripting",
        "Zero-Downtime Rollouts",
      ],
    },
    {
      name: "Backend & Systems",
      description: "High-throughput asynchronous services",
      items: [
        "FastAPI (Async)",
        "Async SQLAlchemy",
        "Python 3.12+",
        "Redis ElastiCache",
        "OAuth2 & JWT Invalidation",
        "REST APIs & Webhooks",
        "Celery / Worker Queues",
        "Vector Databases (pgvector)",
      ],
    },
    {
      name: "DevSecOps & FinOps",
      description: "Cloud optimization & security governance",
      items: [
        "FinOps Compute Rightsizing",
        "OpenSearch to DB Migration",
        "S3 Intelligent-Tiering",
        "Shift-Left SAST Security",
        "Least-Privilege IAM",
        "VPC Private Subnet Isolation",
        "AWS Config & Backup Vaults",
        "DDoS Mitigation with WAF",
      ],
    },
  ];

  return (
    <section id="skills" className="w-full py-10 md:py-12 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">


        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
          <h2 className="text-2xl sm:text-3xl font-serif italic font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Technical Stack &amp; Tooling
          </h2>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            Production Tooling &amp; Paradigms
          </span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-8 font-normal">
          Core engineering toolchains, AWS services, and operational frameworks utilized in production environments.
        </p>

        {/* 4 Clean Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15191f] p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-serif italic font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-4">
                  {cat.description}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                  {cat.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                      <span className="text-neutral-400 dark:text-neutral-600 font-mono text-[10px]">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
