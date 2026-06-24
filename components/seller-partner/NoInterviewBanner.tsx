export default function NoInterviewBanner() {
  return (
    <section className="py-12 border-y border-white/10 bg-gradient-to-r from-purple-900/40 via-black to-yellow-900/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
        <div>
          <h2 className="font-display text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight mb-2 uppercase drop-shadow-2xl">
            NO INTERVIEW REQUIRED
          </h2>
          <p className="text-gold text-lg md:text-xl font-bold tracking-widest uppercase">
            Apply and start immediately
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-white/50 text-sm font-semibold uppercase tracking-widest mr-2">Perfect For:</span>
          {["Students", "Freshers", "Freelancers", "Part-time Workers"].map((tag) => (
            <div key={tag} className="px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
