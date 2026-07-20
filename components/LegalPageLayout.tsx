import Link from "next/link";

type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="mx-auto max-w-3xl px-4 text-foreground md:px-6">
        <Link href="/" className="text-sm text-gray-400 hover:text-foreground">
          ← Back to home
        </Link>
        <h1 className="mt-6 font-display text-4xl font-semibold md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-gray-500">Last updated: {lastUpdated}</p>
        <div className="mt-10 max-w-none space-y-6 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:text-gray-300 [&_p]:leading-8 [&_p]:text-gray-300">
          {children}
        </div>
      </div>
    </main>
  );
}
