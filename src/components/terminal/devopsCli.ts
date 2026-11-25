import { portfolio } from "@/data/portfolio";
import { calculateFinOpsSavings, WorkloadProfile } from "@/data/finopsCalc";

const ARCH_DIAGRAMS: Record<string, string> = {
  mcqtest: `[ARCHITECTURE: MCQtest — 12-Stack CloudFormation Multi-AZ]
Route 53 -> CloudFront -> AWS WAF (Rate-Limit) -> ALB (Public Subnets)
                              |
                +-------------+-------------+
                | Private Subnets (AZ-1/2)  |
                v                           v
        [ECS Fargate API]           [ECS Fargate Workers]
                |                           |
        +-------+-------+           +-------+-------+
        v               v           v               v
 [RDS Postgres     [ElastiCache   [AWS Config]  [AWS Backup
  Multi-AZ]         Redis AZ]                    Daily Vault]`,

  outfitmirror: `[ARCHITECTURE: Outfitmirror — Serverless AI VTO Pipeline]
Client -> AWS Cognito Hosted UI -> API Gateway -> AWS SAM Lambda
                                                    |
             +--------------------------------------+
             v                                      v
  [S3 Pre-Signed Media]                   [Async Worker Queue]
                                                    |
                                                    v
                                     [Amazon Bedrock Nova Canvas]`,

  zyrona: `[ARCHITECTURE: Zyrona — Cost-Optimized Compute & Search (-30% Spend)]
CloudFront CDN -> ALB -> EC2 Auto Scaling Group (Zero-Downtime Instance Refresh)
                                |
                    +-----------+-----------+
                    v                       v
            [Tuned PostgreSQL]       [Redis Cache]
      (Replaced OpenSearch: -30% AWS Monthly Bill)`,

  glovion: `[ARCHITECTURE: Glovion Consulting — Enterprise ERP & Multi-DC Ops]
Client / Edge -> Nginx Reverse Proxy (TLS + Static Cache)
                      |
         +------------+------------+
         v                         v
 [Odoo ERP Workers]       [Private Cloud Microservices]
         |                         |
         +------------+------------+
                      v
         [Tuned PostgreSQL + Filestore DR]
                      ^
                      |
 [Prometheus + Node Exporter + Grafana (Multi-Data Center)]`,

  karnovation: `[ARCHITECTURE: AWS Pathway (Karnovation) — High-Concurrency EdTech]
AWS Amplify (Next.js) -> Route 53 -> FastAPI (AsyncIO + SQLAlchemy)
                                         |
             +---------------------------+---------------------------+
             v                           v                           v
  [Redis JWKS Cache]             [PostgreSQL + Alembic]      [DynamoDB + S3]
  (-95% OAuth2 Latency)          (39+ Zero-Downtime Mig)     (DocFlow RAG)`,
};

export async function fetchLiveGitHubRepos(): Promise<string> {
  try {
    const res = await fetch("https://api.github.com/users/Binod231/repos?sort=updated&per_page=8");
    if (!res.ok) throw new Error("GitHub API rate limit");
    const repos = (await res.json()) as Array<{
      name: string;
      language: string | null;
      stargazers_count: number;
      updated_at: string;
      html_url: string;
    }>;
    const header = "REPOSITORY                         LANG         STARS  UPDATED     URL";
    const rows = repos.map((r) => {
      const name = r.name.slice(0, 33).padEnd(35);
      const lang = (r.language || "DevOps").slice(0, 11).padEnd(13);
      const stars = String(r.stargazers_count).padEnd(7);
      const date = r.updated_at.slice(0, 10);
      return `${name}${lang}${stars}${date}  ${r.html_url}`;
    });
    return `[LIVE GITHUB API :: Binod231]\n${header}\n${"-".repeat(92)}\n${rows.join("\n")}`;
  } catch {
    const fallback = portfolio.projects
      .map((p) => `${p.title.padEnd(35)} ${p.type.padEnd(18)} ${p.repo}`)
      .join("\n");
    return `[CACHED PORTFOLIO REPOS :: offline fallback]\n${fallback}`;
  }
}

export async function fetchLiveGitLog(): Promise<string> {
  try {
    const res = await fetch("https://api.github.com/users/Binod231/events/public?per_page=15");
    if (!res.ok) throw new Error("GitHub API rate limit");
    const events = (await res.json()) as Array<{
      type: string;
      created_at: string;
      repo: { name: string };
      payload?: { commits?: Array<{ sha: string; message: string }> };
    }>;
    const pushes = events.filter((e) => e.type === "PushEvent" && e.payload?.commits?.length).slice(0, 8);
    if (pushes.length > 0) {
      const lines = pushes.map((ev) => {
        const c = ev.payload!.commits![0];
        return `${c.sha.slice(0, 7)}  (${ev.created_at.slice(0, 10)}) [${ev.repo.name}] ${c.message.split("\n")[0]}`;
      });
      return `[LIVE GITHUB COMMIT STREAM :: Binod231]\n${lines.join("\n")}`;
    }
  } catch {
    // Fallback below
  }
  return [
    "[PRODUCTION ENGINEERING LOG :: Binod231]",
    "a1b2c3d  feat: Odoo ERP worker optimization & multi-DC Prometheus alerts (Glovion)",
    "b3c4d5e  feat: 12-stack CloudFormation Multi-AZ ECS Fargate + WAF (MCQtest)",
    "c5d6e7f  perf: Redis JWKS caching -> 95% OAuth2 latency drop (Karnovation)",
    "d7e8f9a  finops: Replace OpenSearch with tuned PostgreSQL -> -30% AWS bill (Zyrona)",
    "e9f0a1b  feat: Stateful AST taint analysis SAST scanner + Dockerfile audit",
  ].join("\n");
}

export const MAN_PAGES: Record<string, string> = {
  aws: `NAME
    aws - Read-only AWS CLI simulation tied to Binod's cloud portfolio

SYNOPSIS
    aws sts get-caller-identity
    aws ecs list-services
    aws s3 ls`,
  kubectl: `NAME
    kubectl - Inspect running production & portfolio Kubernetes workloads

SYNOPSIS
    kubectl get pods [-A]
    kubectl get nodes`,
  docker: `NAME
    docker - Inspect containerized portfolio & ERP infrastructure

SYNOPSIS
    docker ps
    docker images`,
  htop: `NAME
    htop - Interactive live system & DevOps SLA process monitor

CONTROLS
    q, Esc - Quit monitor and return to shell`,
  less: `NAME
    less - Scrollable file pager for reading long files

SYNOPSIS
    less <filename>

CONTROLS
    j / Down, k / Up, Space - Scroll
    q, Esc                  - Exit pager`,
  nano: `NAME
    nano - GNU nano 7.2 (Read-Only Viewer)

CONTROLS
    ^W     - Search inside file
    ^X/Esc - Exit viewer`,
  theme: `NAME
    theme - Switch terminal color scheme on the fly

SYNOPSIS
    theme [ubuntu|kali|matrix|amber]`,
  grep: `NAME
    grep - Search across files or piped command output

SYNOPSIS
    grep <keyword>
    cat blogs/all-blogs.txt | grep Bedrock`,
};

const FORTUNES = [
  "It's not DNS. There's no way it's DNS. It was DNS.",
  "99.9% SLA begins with Multi-AZ architecture and automated failover.",
  "Cut ~30% of your cloud bill by measuring before over-provisioning.",
  "Shift-left security catches leaks in CI before they hit production.",
  "Systems don't lie. Logs don't lie. Ship -> Measure -> Optimize -> Automate.",
];

export function handleDevOpsCommand(cmd: string, args: string[]): string | null {
  const fullSub = args.join(" ").toLowerCase();

  if (cmd === "aws") {
    if (fullSub.includes("sts") && fullSub.includes("get-caller-identity")) {
      return JSON.stringify(
        {
          UserId: "AIDABINOD231DEVOPS",
          Account: "231020260545",
          Arn: "arn:aws:iam::231020260545:user/BinodPrasadJoshi",
          Role: "Cloud & DevOps Consultant",
          Certifications: ["SAA-C03", "CLF-C02"],
          CommunityBuilder: "AWS Dev Tools (2026)",
        },
        null,
        2
      );
    }
    if (fullSub.includes("ecs") && (fullSub.includes("list-services") || fullSub.includes("list-clusters"))) {
      return JSON.stringify(
        {
          clusterArns: [
            "arn:aws:ecs:us-east-1:231020260545:cluster/mcqtest-multi-az-prod",
            "arn:aws:ecs:us-east-1:231020260545:cluster/outfitmirror-bedrock-vto",
            "arn:aws:ecs:ap-south-1:231020260545:cluster/zyrona-cost-optimized",
            "arn:aws:ecs:ap-south-1:231020260545:cluster/princika-traders-monorepo",
          ],
          status: "ACTIVE (99.9% SLA)",
        },
        null,
        2
      );
    }
    if (fullSub.includes("s3") && fullSub.includes("ls")) {
      return [
        "2026-10-12 09:15:00  s3://glovion-odoo-filestore-dr/",
        "2026-06-18 14:22:10  s3://outfitmirror-presigned-vto-media/",
        "2026-06-05 11:04:42  s3://mcqtest-aws-backup-vault/",
        "2026-04-21 16:40:00  s3://karnovation-rag-docflow-assets/",
      ].join("\n");
    }
    return [
      "AWS CLI (Read-Only Simulation) — Try:",
      "  aws sts get-caller-identity",
      "  aws ecs list-services",
      "  aws s3 ls",
    ].join("\n");
  }

  if (cmd === "kubectl") {
    if (fullSub.includes("get nodes")) {
      return [
        "NAME                         STATUS   ROLES           AGE    VERSION",
        "aws-fargate-us-east-1a       Ready    cloud-prod      180d   v1.31.2-eks",
        "aws-fargate-us-east-1b       Ready    cloud-prod      180d   v1.31.2-eks",
        "glovion-dc-kathmandu-01      Ready    private-cloud   54d    v1.31.2",
        "glovion-dc-remote-02         Ready    private-cloud   54d    v1.31.2",
      ].join("\n");
    }
    if (fullSub.includes("get pods")) {
      return [
        "NAMESPACE     NAME                                    READY   STATUS    RESTARTS   AGE",
        "erp-prod      glovion-odoo-erp-worker-7d8c9           1/1     Running   0          54d",
        "edtech-prod   karnovation-fastapi-jwks-5f9b4          1/1     Running   0          120d",
        "ai-prod       outfitmirror-bedrock-sam-2c4a1          1/1     Running   0          150d",
        "exam-prod     mcqtest-fargate-waf-8b1e2               1/1     Running   0          150d",
        "monitoring    prometheus-grafana-multidc-9c3d7        1/1     Running   0          54d",
        "security      api-analyzer-sast-scanner-4a7f0         1/1     Running   0          90d",
      ].join("\n");
    }
    return "Usage: kubectl get pods [-A] | kubectl get nodes";
  }

  if (cmd === "docker") {
    if (fullSub.startsWith("ps")) {
      return [
        "CONTAINER ID   IMAGE                                  STATUS                  NAMES",
        "8a4f21c901d2   binod231/odoo-erp:17-tuned             Up 54 days (healthy)    glovion-odoo-erp",
        "3c9b10e447a1   binod231/fastapi-jwks-redis:2.4        Up 90 days (healthy)    karnovation-api",
        "7f1e88d320b9   postgres:16-pgvector                   Up 90 days (healthy)    rag-vector-db",
        "2d5a77c109f4   prom/prometheus:v2.53                  Up 54 days (healthy)    multi-dc-prom",
        "9e6c31b552e8   nginx:1.27-alpine                      Up 90 days (healthy)    edge-reverse-proxy",
      ].join("\n");
    }
    if (fullSub.startsWith("images")) {
      return [
        "REPOSITORY                    TAG           SIZE     NOTE",
        "binod231/fastapi-jwks-redis   2.4           142MB    Multi-stage cached (~50% faster CI/CD)",
        "binod231/api-analyzer-sast    latest        98MB     Python AST + Dockerfile scanner",
        "binod231/odoo-erp             17-tuned      410MB    Optimized PostgreSQL pool",
      ].join("\n");
    }
    return "Usage: docker ps | docker images";
  }

  if (cmd === "ping") {
    const host = args[0] || "binodprasadjoshi.com.np";
    return [
      `PING ${host} (13.35.142.88): 56 data bytes`,
      `64 bytes from ${host}: icmp_seq=0 ttl=56 time=11.4 ms`,
      `64 bytes from ${host}: icmp_seq=1 ttl=56 time=10.8 ms`,
      `64 bytes from ${host}: icmp_seq=2 ttl=56 time=11.1 ms`,
      `--- ${host} ping statistics ---`,
      `3 packets transmitted, 3 received, 0% packet loss`,
    ].join("\n");
  }

  if (cmd === "curl") {
    const target = args.filter((a) => !a.startsWith("-"))[0] || "https://binodprasadjoshi.com.np";
    const resolved =
      target === "github"
        ? portfolio.personal.links.github
        : target === "linkedin"
        ? portfolio.personal.links.linkedin
        : target === "builder"
        ? "https://builder.aws.com/community/@binodprasadjoshi?tab=articles"
        : target;
    return [
      `HTTP/2 200 OK`,
      `server: CloudFront / Next.js Edge`,
      `x-operator: Binod Prasad Joshi (2x AWS Certified)`,
      `x-location: Kathmandu, Nepal (UTC+5:45)`,
      `x-uptime-sla: 99.9%`,
      `location-url: ${resolved}`,
    ].join("\n");
  }

  if (cmd === "cowsay") {
    const msg = args.join(" ").trim() || "Ship -> Measure -> Optimize -> Automate!";
    const bar = "-".repeat(msg.length + 2);
    return [
      ` ${bar}`,
      `< ${msg} >`,
      ` ${bar}`,
      `        \\   ^__^`,
      `         \\  (oo)\\_______`,
      `            (__)\\       )\\/\\`,
      `                ||----w |`,
      `                ||     ||`,
    ].join("\n");
  }

  if (cmd === "fortune") {
    return FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
  }

  if (cmd === "arch") {
    const target = (args[0] || "").toLowerCase();
    if (!target) {
      return `Available architecture blueprints: ${Object.keys(ARCH_DIAGRAMS).join(", ")}\nExample: arch mcqtest`;
    }
    return ARCH_DIAGRAMS[target] || `Unknown blueprint '${target}'. Available: ${Object.keys(ARCH_DIAGRAMS).join(", ")}`;
  }

  if (cmd === "./finops-calc.sh" || cmd === "finops-calc") {
    let spend = 5000;
    let profile: WorkloadProfile = "multi-az-saas";
    args.forEach((a) => {
      if (a.startsWith("--spend=")) spend = Number(a.split("=")[1]) || 5000;
      if (a.startsWith("--type=")) {
        const t = a.split("=")[1] as WorkloadProfile;
        if (t in { "multi-az-saas": 1, "ecommerce-search": 1, "ai-llm-bedrock": 1, "erp-legacy": 1 }) {
          profile = t;
        }
      }
    });
    const est = calculateFinOpsSavings(spend, profile);
    return [
      `[AWS FINOPS AUDIT ESTIMATOR] Profile: ${est.workloadLabel}`,
      `-------------------------------------------------------------------------`,
      `Current Spend : $${est.monthlySpend.toLocaleString()}/mo`,
      `Est. Savings  : ~${est.totalSavingsPct}% ($${est.monthlySaved.toLocaleString()}/mo | $${est.annualSaved.toLocaleString()}/yr)`,
      `Optimized Bill: $${est.projectedSpend.toLocaleString()}/mo`,
      ``,
      `Optimization Levers:`,
      ...est.breakdown.map(
        (b) => `  - ${b.label.padEnd(32)} -${String(b.pct).padEnd(2)}% ($${b.monthlySaved}/mo) -> ${b.recommendation}`
      ),
      ``,
      `Usage: ./finops-calc.sh --spend=10000 --type=ecommerce-search`,
      `Types: multi-az-saas | ecommerce-search | ai-llm-bedrock | erp-legacy`,
    ].join("\n");
  }

  if (cmd === "man") {
    const topic = (args[0] || "").toLowerCase();
    if (!topic) {
      return `Available manuals: ${Object.keys(MAN_PAGES).join(", ")} (e.g. 'man aws')`;
    }
    return MAN_PAGES[topic] || `No manual entry for ${topic}`;
  }

  return null;
}

