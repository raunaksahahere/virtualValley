"use client";

import { FormEvent, useState } from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Something went wrong");
      }

      setStatus("success");
      setFeedback("Your message has been sent. We will get back within 24 hours.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error ? error.message : "Unable to send your message right now.",
      );
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 overflow-hidden">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gray-500">
              Contact
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold md:text-5xl">
              Start the conversation.
            </h2>
            <p className="section-copy mt-5">
              Tell us what you are building, repairing, or trying to grow. We will respond with the right next step.
            </p>

            <div className="mt-8 space-y-4 text-sm text-gray-300">
              <p>Email: contact.virtualvalley@gmail.com</p>
              <p>Phone: +91 8017007352</p>
              <p>Hours: Monday - Sunday, 9:00 AM - 10:00 PM</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[2rem] glass-card-premium shadow-glow-white-hover p-6 md:p-8">
            <div className="space-y-8">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.28em] text-gray-500">Name</span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="mt-4 w-full border-b-2 border-neutral-800 bg-transparent pb-3 text-base text-white outline-none focus:border-gold transition-all duration-300 focus:shadow-[0_1px_0_0_#C9A84C]"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.28em] text-gray-500">Email Address</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  className="mt-4 w-full border-b-2 border-neutral-800 bg-transparent pb-3 text-base text-white outline-none focus:border-gold transition-all duration-300 focus:shadow-[0_1px_0_0_#C9A84C]"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.28em] text-gray-500">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  className="mt-4 w-full resize-none border-b-2 border-neutral-800 bg-transparent pb-3 text-base text-white outline-none focus:border-gold transition-all duration-300 focus:shadow-[0_1px_0_0_#C9A84C]"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary mt-10 hover:shadow-[0_0_20px_rgba(201,168,76,0.2)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {feedback ? (
              <p
                className={`mt-5 text-sm ${
                  status === "success" ? "text-white" : "text-red-300"
                }`}
              >
                {feedback}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
