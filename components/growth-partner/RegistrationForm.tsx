"use client";

import { FormEvent, useState } from "react";

import SuccessScreen from "@/components/growth-partner/SuccessScreen";

type FormState = {
  name: string;
  email: string;
  phone: string;
  city: string;
  profession: string;
  instagramHandle: string;
  facebookProfile: string;
  youtubeChannel: string;
  linkedinProfile: string;
  audienceSize: string;
  referralExperience: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  city: "",
  profession: "",
  instagramHandle: "",
  facebookProfile: "",
  youtubeChannel: "",
  linkedinProfile: "",
  audienceSize: "",
  referralExperience: "",
  message: "",
};

const requiredFields = new Set<keyof FormState>(["name", "email", "phone", "city"]);

export default function RegistrationForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const website =
        (document.querySelector('input[name="website"]') as HTMLInputElement)?.value ||
        "";

      const response = await fetch("/api/growth-partner/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Could not submit registration.");
      }

      setStatus("success");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error ? error.message : "Could not submit registration.",
      );
    }
  };

  if (status === "success") {
    return <SuccessScreen />;
  }

  return (
    <section id="registration" className="py-16 md:py-24">
      <div className="section-shell">
        <div className="rounded-[2rem] border border-white/10 bg-neutral-950 p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Registration form</p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
            Apply to become a Growth Partner.
          </h2>
          <form onSubmit={handleSubmit} className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Honeypot - hidden from real users, catches bots */}
            <label htmlFor="growth-partner-website" className="sr-only" aria-hidden="true">
              Website
            </label>
            <input
              id="growth-partner-website"
              type="text"
              name="website"
              value=""
              onChange={() => {}}
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                opacity: 0,
                overflow: "hidden",
                pointerEvents: "none",
              }}
            />
            {(
              [
                ["name", "Full Name"],
                ["email", "Email Address"],
                ["phone", "Phone Number"],
                ["city", "City"],
                ["profession", "Profession"],
                ["instagramHandle", "Instagram Handle"],
                ["facebookProfile", "Facebook Profile"],
                ["youtubeChannel", "YouTube Channel"],
                ["linkedinProfile", "LinkedIn Profile"],
                ["audienceSize", "Audience Size"],
                ["referralExperience", "Referral Experience"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} htmlFor={`growth-partner-${key}`} className="block">
                <span className="text-xs uppercase tracking-[0.28em] text-gray-500">{label}</span>
                <input
                  id={`growth-partner-${key}`}
                  name={key}
                  type={key === "email" ? "email" : "text"}
                  required={requiredFields.has(key)}
                  value={form[key]}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, [key]: event.target.value }))
                  }
                  className="mt-4 w-full border-b-2 border-gray-800 bg-transparent pb-3 text-base text-white outline-none focus:border-white"
                />
              </label>
            ))}
            <label htmlFor="growth-partner-message" className="block md:col-span-2">
              <span className="text-xs uppercase tracking-[0.28em] text-gray-500">Message</span>
              <textarea
                id="growth-partner-message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={(event) =>
                  setForm((current) => ({ ...current, message: event.target.value }))
                }
                className="mt-4 w-full resize-none border-b-2 border-gray-800 bg-transparent pb-3 text-base text-white outline-none focus:border-white"
              />
            </label>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "Submitting..." : "Submit Application"}
              </button>
              {feedback ? <p className="mt-4 text-sm text-red-300">{feedback}</p> : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
