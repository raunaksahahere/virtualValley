import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");

export interface MdxPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
}

export function getMdxPosts(): MdxPostMeta[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(BLOGS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "2026-01-01",
        excerpt: data.excerpt ?? "",
        category: data.category ?? "General",
        readTime: data.readTime ?? "5 min read",
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getMdxPost(
  slug: string
): Promise<{ meta: MdxPostMeta; content: string } | null> {
  const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "2026-01-01",
      excerpt: data.excerpt ?? "",
      category: data.category ?? "General",
      readTime: data.readTime ?? "5 min read",
    },
    content,
  };
}
