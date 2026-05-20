import Link from "next/link";

type BlogCardProps = {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
  };
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-neutral-950 p-6">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full border border-gold/30 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-gold">
          {post.category}
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
          {post.readTime}
        </span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold text-white">
        {post.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-gray-400">{post.excerpt}</p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {new Date(post.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-white hover:text-gold">
          Read More
        </Link>
      </div>
    </article>
  );
}
