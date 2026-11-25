import { portfolio } from "@/data/portfolio";

interface IndexedChunk {
  source: string;
  title: string;
  text: string;
  url?: string;
}

const SYNONYMS: Record<string, string[]> = {
  cost: ["finops", "30%", "opensearch", "bill", "savings", "rightsizing"],
  finops: ["cost", "30%", "savings", "bill", "budget"],
  ai: ["bedrock", "rag", "llm", "pgvector", "chromadb", "agent", "agentcore"],
  rag: ["pgvector", "chromadb", "vector", "bedrock", "sabudh"],
  odoo: ["erp", "glovion", "postgresql", "multi-dc", "private cloud"],
  erp: ["odoo", "glovion", "postgresql"],
  oauth: ["oauth2", "jwks", "redis", "95%", "karnovation"],
  security: ["devsecops", "waf", "sast", "iam", "taint", "backup"],
  cicd: ["github actions", "docker", "50%", "alembic", "pipeline"],
  cert: ["certified", "aws", "saa-c03", "clf-c02", "credly", "community builder"],
};

function buildCorpus(): IndexedChunk[] {
  const chunks: IndexedChunk[] = [];
  const { personal, services, experience, projects, certifications, blogs, skills } = portfolio;

  chunks.push({
    source: "about/bio.txt",
    title: `${personal.name} — Profile`,
    text: `${personal.name}. ${personal.role}. Location: Kathmandu, Nepal (UTC+5:45). ${personal.tagline}. Recognitions: ${personal.aboutCards.map((a) => `${a.title} ${a.subtitle}`).join(", ")}.`,
    url: personal.links.github,
  });

  services.forEach((s) => {
    chunks.push({
      source: `services/${s.id}.yaml`,
      title: `${s.title} (${s.metrics})`,
      text: `${s.title}. ${s.description}. Deliverables: ${s.deliverables.join("; ")}. Tech: ${s.technologies.join(", ")}. Metrics: ${s.metrics}.`,
    });
  });

  experience.forEach((e) => {
    chunks.push({
      source: `experience/${e.company}`,
      title: `${e.role} @ ${e.company} (${e.period})`,
      text: `${e.company} ${e.role} ${e.period} ${e.type}. Tech: ${e.tech.join(", ")}. Impacts: ${e.impacts.join(" ").replace(/\*\*/g, "")}`,
    });
    if (e.caseStudy) {
      chunks.push({
        source: `case-studies/${e.company}`,
        title: e.caseStudy.title,
        text: `${e.caseStudy.overview} Features: ${e.caseStudy.features.map((f) => `${f.title}: ${f.details}`).join(" ")} Results: ${e.caseStudy.results.join(" ").replace(/\*\*/g, "")}`,
      });
    }
  });

  projects.forEach((p) => {
    chunks.push({
      source: `projects/${p.title}`,
      title: `${p.title} (${p.type})`,
      text: `${p.title} ${p.desc} Tech: ${p.tech.join(", ")}. Highlights: ${p.highlights.join(" ")}`,
      url: p.repo,
    });
  });

  certifications.forEach((c) => {
    chunks.push({
      source: `certifications/${c.id}`,
      title: `${c.title} (${c.issuer})`,
      text: `${c.title} issued by ${c.issuer} (${c.date}). ID: ${c.id}.`,
      url: c.link,
    });
  });

  blogs.forEach((b) => {
    chunks.push({
      source: `blogs/${b.platform}`,
      title: b.title,
      text: `${b.title}. ${b.description} Tags: ${b.tags.join(", ")}. Date: ${b.date}.`,
      url: b.url,
    });
  });

  chunks.push({
    source: "skills/stack.json",
    title: "Technical Stack",
    text: `Cloud: ${skills.cloud.join(", ")}. DevOps: ${skills.devops.join(", ")}. Backend: ${skills.backend.join(", ")}. Databases: ${skills.databases.join(", ")}. Concepts: ${skills.concepts.join(", ")}.`,
  });

  return chunks;
}

const CORPUS = buildCorpus();

export function answerPortfolioQuestion(rawQuery: string): string {
  const cleaned = rawQuery.replace(/^["']|["']$/g, "").trim();
  if (!cleaned) {
    return `Usage: ask "<your question>"\nExample: ask "How did Binod cut AWS costs by 30%?"`;
  }

  const baseTerms = cleaned
    .toLowerCase()
    .split(/[^a-z0-9%+-]+/)
    .filter((t) => t.length >= 2);

  const expandedTerms = new Set<string>(baseTerms);
  baseTerms.forEach((term) => {
    (SYNONYMS[term] || []).forEach((syn) => expandedTerms.add(syn));
  });

  const scored = CORPUS.map((chunk) => {
    const hay = `${chunk.title} ${chunk.text}`.toLowerCase();
    let score = 0;
    baseTerms.forEach((t) => {
      if (hay.includes(t)) score += 3;
      if (chunk.title.toLowerCase().includes(t)) score += 2;
    });
    expandedTerms.forEach((t) => {
      if (hay.includes(t)) score += 1;
    });
    return { chunk, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (scored.length === 0) {
    return `No direct match found for "${cleaned}". Try asking about AWS, FinOps, Odoo ERP, CI/CD, OAuth2, Bedrock RAG, or certifications.`;
  }

  const lines = [
    `[AI_RAG_QUERY] "${cleaned}"`,
    `-------------------------------------------------------------------`,
  ];
  scored.forEach(({ chunk }, i) => {
    lines.push(`[${i + 1}] ${chunk.title}  (source: ${chunk.source})`);
    lines.push(`    ${chunk.text.slice(0, 260)}${chunk.text.length > 260 ? "..." : ""}`);
    if (chunk.url) lines.push(`    Link: ${chunk.url}`);
    lines.push("");
  });

  return lines.join("\n").trimEnd();
}

