type Certificate = {
  cert_id: string;
  intern_name: string;
  duration: string;
  issue_date: string;
  score_targeting_clients: number;
  score_pitching_product: number;
  score_client_handling: number;
  score_closing_deals: number;
  score_professionalism_teamwork: number;
  total_score: number;
};

const scoreRows = [
  "Targeting Clients",
  "Pitching Product",
  "Client Handling",
  "Closing Deals",
  "Professionalism & Teamwork",
];

export function VerificationCard({ certificate }: { certificate: Certificate }) {
  const issueDate = new Date(certificate.issue_date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const scores = [
    certificate.score_targeting_clients,
    certificate.score_pitching_product,
    certificate.score_client_handling,
    certificate.score_closing_deals,
    certificate.score_professionalism_teamwork,
  ];

  return (
    <main className="dark-section min-h-screen bg-[radial-gradient(circle_at_top,_rgb(var(--accent-cyan)_/_0.18),_transparent_34%),linear-gradient(180deg,_rgb(var(--primary))_0%,_rgb(var(--primary))_100%)] px-4 py-10">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-cyan/40 bg-accent-cyan/15 px-4 py-2 text-primary-foreground">
          <span className="h-2 w-2 rounded-full bg-accent-green" />
          <span className="text-sm font-medium tracking-wide">Certificate Verified</span>
        </div>

        <section className="w-full overflow-hidden rounded-[20px] border border-border bg-surface text-text shadow-[0_28px_80px_rgb(var(--primary)_/_0.3)]">
          <header className="bg-primary px-6 py-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary-foreground/70">
              Virtual Valley
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-wide text-foreground sm:text-[21.6px]">
              Internship Certificate
            </h1>
            <p className="mt-1 text-sm text-primary-foreground/70">Digital Solutions. Real Results.</p>
          </header>

          <div className="h-1 bg-gradient-to-r from-accent-cyan via-surface-secondary to-accent-cyan" />

          <div className="px-6 py-7 sm:px-8">
            <div className="text-center">
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-muted">
                This certifies that
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-heading sm:text-4xl">
                {certificate.intern_name}
              </h2>
              <p className="mt-3 text-base leading-7 text-text">
                completed an internship at{" "}
                <span className="font-semibold text-heading">Virtual Valley</span>
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted">
                <span>
                  Duration:{" "}
                  <span className="font-semibold text-heading">{certificate.duration}</span>
                </span>
                <span className="hidden text-border sm:inline">·</span>
                <span>
                  Issued:{" "}
                  <span className="font-semibold text-heading">{issueDate}</span>
                </span>
              </div>
            </div>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="flex items-center justify-between bg-primary px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground">
                  Performance Criteria
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground">
                  Score / 20
                </span>
              </div>

              {scores.map((score, index) => (
                <div
                  key={scoreRows[index]}
                  className={`flex items-center justify-between px-4 py-3 ${
                    index % 2 === 0 ? "bg-background" : "bg-surface"
                  }`}
                >
                  <span className="pr-4 text-sm text-text">
                    {index + 1}. {scoreRows[index]}
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-heading">
                    {score}
                  </span>
                </div>
              ))}

              <div className="flex items-center justify-between bg-primary px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground">
                  Total Score
                </span>
                <span className="text-lg font-bold text-accent-cyan">
                  {certificate.total_score} / 100
                </span>
              </div>
            </div>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-muted">
                  Certificate ID
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-heading">
                  {certificate.cert_id}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 self-start rounded-xl border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-heading">
                <span className="text-base">✓</span>
                Authentic record
              </div>
            </div>
          </div>

          <footer className="flex flex-col gap-2 bg-primary px-6 py-4 text-center text-xs text-primary-foreground/70 sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <span>thevirtualvalley.com</span>
            <span>contact@thevirtualvalley.com</span>
          </footer>
        </section>

        <p className="mt-4 text-center text-xs text-primary-foreground/70">
          This certificate was verified from Virtual Valley&apos;s official records.
        </p>
      </div>
    </main>
  );
}
