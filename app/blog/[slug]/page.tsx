import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import blogPosts from "@/data/blog-posts.json";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thevirtualvalley.com";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find((entry) => entry.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: "Blog Post",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/og-image.png"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = blogPosts.find((entry) => entry.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((entry) => entry.slug !== post.slug).slice(0, 2);

  return (
    <main id="top" className="bg-background text-foreground">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://thevirtualvalley.com" },
          { name: "Blog", url: "https://thevirtualvalley.com/blog" },
          { name: post.title, url: `https://thevirtualvalley.com/blog/${post.slug}` },
        ]}
      />
      <Navbar />
      <article className="min-h-screen px-4 py-24 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-sm text-gray-500">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>{" "}
            <span className="px-2 text-accent-cyan">/</span>
            <Link href="/blog" className="hover:text-foreground">
              Blog
            </Link>{" "}
            <span className="px-2 text-accent-cyan">/</span>
            <span className="text-foreground">{post.title}</span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-lime/30 px-3 py-1 text-xs uppercase tracking-[0.25em] text-accent-cyan">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="text-sm text-gray-500">{post.readTime}</span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">{post.excerpt}</p>

          <div
            className="mt-12 max-w-none space-y-6 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:leading-8 [&_p]:text-gray-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
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
