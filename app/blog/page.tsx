import type { Metadata } from "next";

import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import blogPosts from "@/data/blog-posts.json";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights from Virtual Valley on websites, branding, pricing, and social media growth for Indian businesses.",
  alternates: {
    canonical: "https://thevirtualvalley.com/blog",
  },
};

export default function BlogPage() {
  return (
    <main id="top" className="bg-background text-foreground">
      <Navbar />
      <section className="min-h-screen px-4 py-24 md:px-6">
        <div className="section-shell">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Journal</p>
            <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
              Blog
            </h1>
            <p className="section-copy mt-5">
              Practical guidance on website development, digital presence, and social media strategy for Indian brands.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
