export function CertificateNotFound({ certId }: { certId: string }) {
  return (
    <main className="dark-section min-h-screen bg-[radial-gradient(circle_at_top,_rgb(var(--accent-cyan)_/_0.18),_transparent_34%),linear-gradient(180deg,_rgb(var(--primary))_0%,_rgb(var(--primary))_100%)] px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center">
        <section className="w-full rounded-[20px] border border-border bg-surface px-7 py-8 text-center text-text shadow-[0_28px_80px_rgb(var(--primary)_/_0.3)]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <svg className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-heading">Certificate Not Found</h1>
          <p className="mt-3 text-base leading-7 text-text">
            No certificate was found for ID{" "}
            <span className="font-mono font-semibold text-heading">{certId}</span>.
            The ID may be incorrect or the certificate may no longer be valid.
          </p>

          <div className="mt-5 rounded-2xl border border-border bg-background px-4 py-3 text-left">
            <p className="text-xs uppercase tracking-[0.28em] text-muted">
              Contact
            </p>
            <p className="mt-1 text-sm font-medium text-heading">
              contact@thevirtualvalley.com
            </p>
          </div>

          <div className="mt-5 rounded-2xl bg-primary px-4 py-3 text-xs text-primary-foreground/80">
            Virtual Valley - Digital Solutions. Real Results.
          </div>
        </section>
      </div>
    </main>
  );
}
