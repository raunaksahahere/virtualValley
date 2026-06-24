"use client";

export function AnimatedBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-center bg-no-repeat opacity-55"
        style={{
          backgroundImage: "url('/TGS.png')",
          backgroundSize: "min(92vw, 980px)",
          mixBlendMode: "screen",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_43%,rgba(212,175,55,0.045),transparent_34%)]" />
    </div>
  );
}
