import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all standard crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/order", "/verify/"],
      },
      // OpenAI / ChatGPT
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/order", "/verify/"],
      },
      // OpenAI ChatGPT browsing
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
      // Anthropic / Claude
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
      // Perplexity
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
      // Google Gemini / Bard
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
      // Microsoft Copilot / Bing AI
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
      // Common Crawl (used by many AI training datasets)
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
      // Cohere AI
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/api/", "/verify/"],
      },
    ],
    sitemap: "https://thevirtualvalley.com/sitemap.xml",
    host: "https://thevirtualvalley.com",
  };
}
