export default function NoInterviewBanner() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface py-24 md:py-32">
      {/* Premium subtle wave pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 25 50 50 T 100 50 L 100 100 L 0 100 Z' fill='%23081F5C'/%3E%3C/svg%3E")`, backgroundSize: '200px 100px' }}
      />
      
      <div className="max-w-[1008px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
        <div>
          <h2 className="mb-2 font-display text-3xl font-black uppercase tracking-tight text-heading md:text-5xl">
            NO INTERVIEW REQUIRED
          </h2>
          <p className="text-[#334EAC] text-lg md:text-xl font-bold tracking-widest uppercase">
            Apply and start immediately
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <span className="mr-2 text-sm font-semibold uppercase tracking-widest text-muted">Perfect For:</span>
          {["Students", "Freshers", "Freelancers", "Part-time Workers"].map((tag) => (
            <div key={tag} className="rounded-full border border-border bg-background/60 px-5 py-2.5 font-semibold text-heading shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
