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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(192,200,224,0.18),_transparent_34%),linear-gradient(180deg,_#0D1B4B_0%,_#071029_100%)] px-4 py-10 text-white">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-emerald-200">
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          <span className="text-sm font-medium tracking-wide">Certificate Verified</span>
        </div>

        <section className="w-full overflow-hidden rounded-[28px] border border-[#C0C8E0]/60 bg-white text-slate-900 shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
          <header className="bg-[#1B2A6B] px-6 py-6 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#C0C8E0]">
              Virtual Valley
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-wide text-white sm:text-[30px]">
              Internship Certificate
            </h1>
            <p className="mt-1 text-sm text-[#B2C0EA]">Digital Solutions. Real Results.</p>
          </header>

          <div className="h-1 bg-gradient-to-r from-[#C0C8E0] via-[#F3F5FA] to-[#C0C8E0]" />

          <div className="px-6 py-7 sm:px-8">
            <div className="text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-slate-500">
                This certifies that
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#1B2A6B] sm:text-4xl">
                {certificate.intern_name}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                completed an internship at{" "}
                <span className="font-semibold text-[#1B2A6B]">Virtual Valley</span>
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-500">
                <span>
                  Duration:{" "}
                  <span className="font-semibold text-[#1B2A6B]">{certificate.duration}</span>
                </span>
                <span className="hidden text-[#C0C8E0] sm:inline">·</span>
                <span>
                  Issued:{" "}
                  <span className="font-semibold text-[#1B2A6B]">{issueDate}</span>
                </span>
              </div>
            </div>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#C0C8E0] to-transparent" />

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between bg-[#1B2A6B] px-4 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
                  Performance Criteria
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
                  Score / 20
                </span>
              </div>

              {scores.map((score, index) => (
                <div
                  key={scoreRows[index]}
                  className={`flex items-center justify-between px-4 py-3 ${
                    index % 2 === 0 ? "bg-[#F8F9FC]" : "bg-white"
                  }`}
                >
                  <span className="pr-4 text-sm text-slate-700">
                    {index + 1}. {scoreRows[index]}
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-[#1B2A6B]">
                    {score}
                  </span>
                </div>
              ))}

              <div className="flex items-center justify-between bg-[#1B2A6B] px-4 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white">
                  Total Score
                </span>
                <span className="text-lg font-bold text-[#C9A84C]">
                  {certificate.total_score} / 100
                </span>
              </div>
            </div>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#C0C8E0] to-transparent" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">
                  Certificate ID
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-[#1B2A6B]">
                  {certificate.cert_id}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 self-start rounded-xl border border-[#1B2A6B]/15 bg-[#1B2A6B]/5 px-4 py-2 text-sm font-medium text-[#1B2A6B]">
                <span className="text-base">✓</span>
                Authentic record
              </div>
            </div>
          </div>

          <footer className="flex flex-col gap-2 bg-[#1B2A6B] px-6 py-4 text-center text-xs text-[#9FB0E0] sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <span>thevirtualvalley.com</span>
            <span>contact@thevirtualvalley.com</span>
          </footer>
        </section>

        <p className="mt-4 text-center text-xs text-[#A6B7E6]">
          This certificate was verified from Virtual Valley&apos;s official records.
        </p>
      </div>
    </main>
  );
}
