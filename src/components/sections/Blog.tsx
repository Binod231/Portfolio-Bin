"use client";

import { useState, useMemo } from "react";
import { Search, ArrowUpRight, Award } from "lucide-react";
import { portfolio } from "@/data/portfolio";

const categories = [
  "All Articles",
  "AWS Architecture",
  "DevOps & IaC",
  "Generative AI & Bedrock",
  "Databases & RAG",
  "DevSecOps & Security",
];

export default function Blog() {
  const { blogs } = portfolio;
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All Articles" ||
        blog.category === selectedCategory ||
        blog.tags.some((t) => t.toLowerCase().includes(selectedCategory.toLowerCase()));

      const matchesSearch =
        searchQuery === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <section id="blogs" className="w-full py-10 md:py-12 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">


        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
          <h2 className="text-2xl sm:text-3xl font-serif italic font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Articles &amp; Publications
          </h2>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            {blogs.length} published essays
          </span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-6 font-normal">
          In-depth architectural breakdowns, failure post-mortems, and engineering essays on AWS, DevOps, and Applied AI.
        </p>

        {/* Filter Categories and Search Input */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer ${selectedCategory === category
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Filter essays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#15191f] text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 font-mono"
            />
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.title}
              className="group border-b border-neutral-100 dark:border-neutral-800/80 pb-6 last:border-b-0"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-1.5">
                <span>{blog.date}</span>
                <span>·</span>
                <span>{blog.platform}</span>
                <span>·</span>
                <span>{blog.readTime}</span>
                {blog.winner && (
                  <>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                      <Award className="w-3 h-3" /> AWS Challenge Winner
                    </span>
                  </>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-serif italic font-bold text-neutral-900 dark:text-neutral-100 mb-2 leading-snug">
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-600 dark:hover:text-neutral-300 hover:underline transition-colors inline-flex items-baseline gap-1"
                >
                  <span>{blog.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              </h3>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal mb-3 text-justify">
                {blog.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}

          {filteredBlogs.length === 0 && (
            <div className="py-12 text-center text-sm font-mono text-neutral-500">
              No articles match the current filter or query.
            </div>
          )}
        </div>

        {/* View on AWS Builder Center Link */}
        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <span className="text-neutral-500 dark:text-neutral-400">
            All 34+ technical articles verified &amp; syndicated across AWS Builder Center.
          </span>
          <a
            href="https://builder.aws.com/community/@binodprasadjoshi?tab=articles"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-900 dark:text-neutral-100 hover:underline inline-flex items-center gap-1 font-medium"
          >
            <span>View all on AWS Builder Center</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
