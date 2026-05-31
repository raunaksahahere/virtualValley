export function CertificateNotFound({ certId }: { certId: string }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(192,200,224,0.18),_transparent_34%),linear-gradient(180deg,_#0D1B4B_0%,_#071029_100%)] px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center">
        <section className="w-full rounded-[28px] border border-[#C0C8E0]/60 bg-white px-7 py-8 text-center text-slate-900 shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
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

          <h1 className="text-2xl font-semibold text-[#1B2A6B]">Certificate Not Found</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            No certificate was found for ID{" "}
            <span className="font-mono font-semibold text-[#1B2A6B]">{certId}</span>.
            The ID may be incorrect or the certificate may no longer be valid.
          </p>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">
              Contact
            </p>
            <p className="mt-1 text-sm font-medium text-[#1B2A6B]">
              contact@thevirtualvalley.com
            </p>
          </div>

          <div className="mt-5 rounded-2xl bg-[#1B2A6B] px-4 py-3 text-xs text-[#9FB0E0]">
            Virtual Valley - Digital Solutions. Real Results.
          </div>
        </section>
      </div>
    </main>
  );
}
