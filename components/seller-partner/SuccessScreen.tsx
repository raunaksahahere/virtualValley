import Link from "next/link";

export default function SuccessScreen() {
  return (
    <div className="rounded-[2rem] border border-border bg-surface p-8 text-text">
      <p className="text-sm uppercase tracking-[0.35em] text-muted">Registration complete</p>
      <h3 className="mt-4 font-display text-3xl font-semibold text-heading">
        Your Sales Intern application has been submitted.
      </h3>
      <p className="mt-4 text-base leading-7 text-text">
        The Virtual Valley team has received your details and will review your application shortly.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  );
}
