export type WorkloadProfile = "multi-az-saas" | "ecommerce-search" | "ai-llm-bedrock" | "erp-legacy";

export interface FinOpsBreakdown {
  label: string;
  pct: number;
  monthlySaved: number;
  recommendation: string;
}

export interface FinOpsEstimate {
  monthlySpend: number;
  workload: WorkloadProfile;
  workloadLabel: string;
  totalSavingsPct: number;
  monthlySaved: number;
  annualSaved: number;
  projectedSpend: number;
  breakdown: FinOpsBreakdown[];
}

const WORKLOAD_CONFIG: Record<
  WorkloadProfile,
  {
    label: string;
    levers: { label: string; pct: number; recommendation: string }[];
  }
> = {
  "multi-az-saas": {
    label: "Multi-AZ Web / SaaS (ECS + RDS)",
    levers: [
      { label: "ECS Fargate & EC2 Rightsizing", pct: 12, recommendation: "CloudWatch CPU/mem rightsizing + Savings Plans" },
      { label: "Redis JWKS & Query Caching", pct: 9, recommendation: "ElastiCache offloads RDS read spikes (-60% DB load)" },
      { label: "NAT Gateway & VPC Endpoints", pct: 6, recommendation: "Gateway endpoints for S3/DynamoDB to cut cross-AZ fees" },
      { label: "S3 Intelligent-Tiering", pct: 4, recommendation: "Automated lifecycle transition to Glacier Instant" },
    ],
  },
  "ecommerce-search": {
    label: "E-Commerce & Search Infrastructure",
    levers: [
      { label: "OpenSearch -> Tuned PostgreSQL", pct: 15, recommendation: "Replace idle search nodes with indexed Postgres filters" },
      { label: "ASG Instance Refresh & Spot", pct: 9, recommendation: "Zero-downtime Launch Templates with Spot mix" },
      { label: "CloudFront Edge Caching", pct: 5, recommendation: "Offload origin bandwidth & media assets" },
      { label: "S3 Lifecycle Archiving", pct: 3, recommendation: "Expire stale logs & versioned artifacts" },
    ],
  },
  "ai-llm-bedrock": {
    label: "Generative AI / Bedrock & RAG",
    levers: [
      { label: "Async Queue & Prompt Caching", pct: 14, recommendation: "Decouple inference + guardrails against runaway agent loops" },
      { label: "pgvector on RDS vs Managed Vector", pct: 10, recommendation: "Consolidate embeddings into existing tuned PostgreSQL" },
      { label: "Serverless AWS SAM Scaling", pct: 6, recommendation: "Eliminate idle GPU/container instances during off-peak" },
      { label: "S3 Pre-Signed Direct Media", pct: 3, recommendation: "Bypass API proxy memory for media uploads" },
    ],
  },
  "erp-legacy": {
    label: "Enterprise ERP (Odoo) & Multi-DC",
    levers: [
      { label: "Worker Pool & Postgres Tuning", pct: 11, recommendation: "Rightsize cron workers & connection pooling" },
      { label: "Nginx Static Cache & Compression", pct: 8, recommendation: "Reduce origin compute load across legacy hosts" },
      { label: "Deduplicated DR Snapshot Policy", pct: 6, recommendation: "Incremental filestore sync & compressed pg_dump" },
      { label: "Idle Staging Auto-Shutdown", pct: 5, recommendation: "Schedule non-prod nodes off-hours" },
    ],
  },
};

export const WORKLOAD_PROFILES = Object.entries(WORKLOAD_CONFIG).map(([id, cfg]) => ({
  id: id as WorkloadProfile,
  label: cfg.label,
}));

export function calculateFinOpsSavings(monthlySpend: number, workload: WorkloadProfile): FinOpsEstimate {
  const safeSpend = Math.max(100, Math.min(1000000, Number.isFinite(monthlySpend) ? monthlySpend : 3000));
  const cfg = WORKLOAD_CONFIG[workload] || WORKLOAD_CONFIG["multi-az-saas"];

  const breakdown: FinOpsBreakdown[] = cfg.levers.map((lever) => ({
    label: lever.label,
    pct: lever.pct,
    monthlySaved: Math.round((safeSpend * lever.pct) / 100),
    recommendation: lever.recommendation,
  }));

  const totalSavingsPct = breakdown.reduce((acc, b) => acc + b.pct, 0);
  const monthlySaved = breakdown.reduce((acc, b) => acc + b.monthlySaved, 0);

  return {
    monthlySpend: safeSpend,
    workload,
    workloadLabel: cfg.label,
    totalSavingsPct,
    monthlySaved,
    annualSaved: monthlySaved * 12,
    projectedSpend: Math.max(0, safeSpend - monthlySaved),
    breakdown,
  };
}