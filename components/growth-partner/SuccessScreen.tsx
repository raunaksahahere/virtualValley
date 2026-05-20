import Link from "next/link";

export default function SuccessScreen() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-neutral-950 p-8 text-white">
      <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Registration complete</p>
      <h3 className="mt-4 font-display text-3xl font-semibold">
        Your growth partner application has been submitted.
      </h3>
      <p className="mt-4 text-sm leading-7 text-gray-400">
        The Virtual Valley team has received your details and will review your application shortly.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  );
}
