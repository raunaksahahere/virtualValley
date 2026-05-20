"use client";

import { useState } from "react";

export default function VideoSection() {
  const [hasVideoError, setHasVideoError] = useState(false);

  return (
    <section className="section-shell py-10 md:py-16">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950 p-3 md:p-5">
        {hasVideoError ? (
          <div className="flex min-h-[240px] items-center justify-center rounded-[1.5rem] border border-dashed border-white/10 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.12),transparent_35%),#050505] text-center">
            <div className="max-w-md px-6">
              <p className="font-display text-2xl font-semibold text-white">
                Signature project reel
              </p>
              <p className="mt-3 text-sm leading-7 text-gray-400">
                Replace `public/kineto.mp4` with the final showcase video to restore the full media section.
              </p>
            </div>
          </div>
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            onError={() => setHasVideoError(true)}
            className="w-full rounded-[1.5rem] border border-white/10 bg-black object-cover"
          >
            <source src="/kineto.mp4" type="video/mp4" />
          </video>
        )}
      </div>
    </section>
  );
}
