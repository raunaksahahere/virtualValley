import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import blogPosts from "@/data/blog-posts.json";
import { getMdxPost, getMdxPosts } from "@/lib/mdx";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thevirtualvalley.com";

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      nodes.push(<strong key={`${match.index}-strong`}>{match[2]}</strong>);
    } else if (match[3] && match[4]) {
      nodes.push(
        <Link key={`${match.index}-link`} href={match[4]}>
          {match[3]}
        </Link>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function MarkdownContent({ source }: { source: string }) {
  const lines = source.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(<h3 key={i}>{renderInline(line.slice(4))}</h3>);
      i += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(<h2 key={i}>{renderInline(line.slice(3))}</h2>);
      i += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i += 1;
      }
      blocks.push(
        <ul key={i}>
          {items.map((item, index) => (
            <li key={index}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (
      line.startsWith("|") &&
      lines[i + 1]?.trim().startsWith("|") &&
      lines[i + 1]?.includes("---")
    ) {
      const headers = line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim());
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(
          lines[i]
            .trim()
            .split("|")
            .slice(1, -1)
            .map((cell) => cell.trim())
        );
        i += 1;
      }
      blocks.push(
        <table key={i}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{renderInline(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{renderInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
      continue;
    }

    const paragraph: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("## ") &&
      !lines[i].trim().startsWith("### ") &&
      !lines[i].trim().startsWith("- ") &&
      !lines[i].trim().startsWith("|")
    ) {
      paragraph.push(lines[i].trim());
      i += 1;
    }

    blocks.push(<p key={i}>{renderInline(paragraph.join(" "))}</p>);
  }

  return <>{blocks}</>;
}

export function generateStaticParams() {
  return [
    ...blogPosts.map((post) => ({ slug: post.slug })),
    ...getMdxPosts().map((post) => ({ slug: post.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find((entry) => entry.slug === resolvedParams.slug);
  const mdxPost = post ? null : await getMdxPost(resolvedParams.slug);

  if (!post && !mdxPost) {
    return {
      title: "Blog Post",
    };
  }

  if (mdxPost) {
    return {
      title: `${mdxPost.meta.title} | Virtual Valley Blog`,
      description: mdxPost.meta.excerpt,
      alternates: {
        canonical: `${siteUrl}/blog/${mdxPost.meta.slug}`,
      },
      openGraph: {
        title: mdxPost.meta.title,
        description: mdxPost.meta.excerpt,
        url: `${siteUrl}/blog/${mdxPost.meta.slug}`,
        type: "article",
        images: ["/og-image.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: mdxPost.meta.title,
        description: mdxPost.meta.excerpt,
        images: ["/og-image.png"],
      },
    };
  }

  const jsonPost = post!;

  return {
    title: jsonPost.title,
    description: jsonPost.excerpt,
    alternates: {
      canonical: `${siteUrl}/blog/${jsonPost.slug}`,
    },
    openGraph: {
      title: jsonPost.title,
      description: jsonPost.excerpt,
      url: `${siteUrl}/blog/${jsonPost.slug}`,
      type: "article",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: jsonPost.title,
      description: jsonPost.excerpt,
      images: ["/og-image.png"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = blogPosts.find((entry) => entry.slug === resolvedParams.slug);
  const mdxPost = post ? null : await getMdxPost(resolvedParams.slug);

  if (!post && !mdxPost) {
    notFound();
  }

  if (mdxPost) {
    const { meta, content } = mdxPost;

    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#030108] pt-28 pb-20">
          <article className="mx-auto max-w-3xl px-6">
            <header className="mb-10">
              <p className="text-xs text-[#D4AF37] uppercase tracking-[0.22em] mb-3">
                {meta.category} · {meta.readTime}
              </p>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight mb-4">
                {meta.title}
              </h1>
              <p className="text-white/40 text-sm">
                {new Date(meta.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </header>

            <div
              className="
                prose prose-invert prose-lg max-w-none
                prose-headings:font-display prose-headings:text-white prose-headings:font-semibold
                prose-p:text-white/70 prose-p:leading-relaxed
                prose-a:text-[#D4AF37] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-li:text-white/70
                prose-hr:border-white/10
                prose-table:text-sm
                prose-th:text-white prose-th:border-white/20 prose-th:font-semibold
                prose-td:text-white/70 prose-td:border-white/10
                prose-code:text-[#D4AF37] prose-code:bg-white/5 prose-code:px-1.5 prose-code:rounded
              "
            >
              <MarkdownContent source={content} />
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  const jsonPost = post!;
  const relatedPosts = blogPosts.filter((entry) => entry.slug !== jsonPost.slug).slice(0, 2);

  return (
    <main id="top" className="bg-black text-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://thevirtualvalley.com" },
          { name: "Blog", url: "https://thevirtualvalley.com/blog" },
          { name: jsonPost.title, url: `https://thevirtualvalley.com/blog/${jsonPost.slug}` },
        ]}
      />
      <Navbar />
      <article className="min-h-screen px-4 py-24 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-sm text-gray-500">
            <Link href="/" className="hover:text-white">
              Home
            </Link>{" "}
            <span className="px-2 text-gold">/</span>
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>{" "}
            <span className="px-2 text-gold">/</span>
            <span className="text-white">{jsonPost.title}</span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-gold/30 px-3 py-1 text-xs uppercase tracking-[0.25em] text-gold">
              {jsonPost.category}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(jsonPost.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="text-sm text-gray-500">{jsonPost.readTime}</span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold md:text-6xl">
            {jsonPost.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">{jsonPost.excerpt}</p>

          <div
            className="mt-12 max-w-none space-y-6 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-white [&_p]:leading-8 [&_p]:text-gray-300"
            dangerouslySetInnerHTML={{ __html: jsonPost.content }}
          />

          <section className="mt-20">
            <h2 className="font-display text-3xl font-semibold">Related posts</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
