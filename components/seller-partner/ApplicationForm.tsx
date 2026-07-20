"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const questions = [
  { key: "fullName", label: "Full Name", prompt: "What is your full name?", type: "text", placeholder: "e.g. Priya Sharma", required: true },
  { key: "phone", label: "Phone Number", prompt: "What is the best number to reach you on?", type: "tel", placeholder: "e.g. 98765 43210", required: true },
  { key: "email", label: "Email Address", prompt: "What is your email address?", type: "email", placeholder: "you@example.com", required: true },
  { key: "city", label: "City", prompt: "Which city are you based in?", type: "text", placeholder: "e.g. Jaipur", required: true },
  { key: "collegeCompany", label: "College / Company", prompt: "Where do you study or work?", type: "text", placeholder: "Optional", required: false },
] as const;

type FieldKey = (typeof questions)[number]["key"];
type FormValues = Record<FieldKey, string>;

export default function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormValues>({ fullName: "", phone: "", email: "", city: "", collegeCompany: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const question = questions[step];
  const inputClass = "w-full rounded-2xl border border-border bg-background px-5 py-5 text-xl text-heading shadow-sm outline-none transition-colors placeholder:text-muted/60 focus:border-accent-cyan";

  const validateCurrentStep = () => {
    const value = values[question.key].trim();
    if (question.required && !value) return `Please enter your ${question.label.toLowerCase()}.`;
    if (question.key === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
    if (question.key === "phone" && value && !/^[+\d\s\-().]{7,20}$/.test(value)) return "Please enter a valid phone number.";
    return "";
  };

  const next = async () => {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    if (step < questions.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to submit your application.");
      setIsSuccess(true);
      setTimeout(() => { window.location.href = "/seller-partner?submitted=true"; }, 1500);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to submit your application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply" className="relative overflow-hidden border-y border-border bg-surface py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(51,78,172,0.06)_0%,transparent_50%)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[360px] w-[360px] bg-[radial-gradient(circle_at_center,rgba(51,78,172,0.08)_0%,transparent_60%)] blur-3xl" />
      <div className="relative z-10 mx-auto max-w-3xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-heading md:text-5xl">Start Your Journey as a Sales Executive</h2>
          <p className="mx-auto max-w-xl text-lg text-text">Apply now in 60 seconds. No complex interviews required.</p>
        </div>

        <motion.div className="relative overflow-hidden rounded-[2.5rem] border border-white bg-white/70 p-8 shadow-[0_20px_50px_rgba(8,31,92,0.08)] backdrop-blur-2xl md:p-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {isSuccess ? (
            <motion.div className="flex flex-col items-center justify-center py-20 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                <motion.div className="absolute inset-0 rounded-full border-4 border-dashed border-green-400" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="mb-2 text-3xl font-bold text-heading">Application Received!</h3>
              <p className="text-text">Redirecting you to the success page...</p>
            </motion.div>
          ) : (
            <div>
              <div className="mb-10">
                <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-muted">
                  <span>Question {step + 1} of {questions.length}</span><span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-secondary"><motion.div className="h-full rounded-full bg-gradient-to-r from-[#081F5C] to-[#334EAC]" animate={{ width: `${((step + 1) / questions.length) * 100}%` }} transition={{ duration: 0.35 }} /></div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={question.key} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent-cyan">{question.label}{question.required ? " *" : " (Optional)"}</p>
                  <h3 className="mb-8 font-display text-3xl font-bold tracking-tight text-heading md:text-4xl">{question.prompt}</h3>
                  <input autoFocus type={question.type} value={values[question.key]} placeholder={question.placeholder} onChange={(event) => setValues((current) => ({ ...current, [question.key]: event.target.value }))} onKeyDown={(event) => { if (event.key === "Enter") void next(); }} className={inputClass} />
                </motion.div>
              </AnimatePresence>
              {error && <p className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
              <div className="mt-10 flex items-center justify-between gap-4">
                <button type="button" onClick={() => { setError(""); setStep((current) => Math.max(0, current - 1)); }} disabled={step === 0 || isSubmitting} className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 font-semibold text-muted transition-colors hover:text-heading disabled:invisible"><ArrowLeft className="h-5 w-5" /> Back</button>
                <div className="flex items-center gap-3">
                  {!question.required && <button type="button" onClick={() => { setValues((current) => ({ ...current, collegeCompany: "" })); void next(); }} disabled={isSubmitting} className="rounded-2xl px-4 py-3 font-semibold text-muted hover:text-heading">Skip</button>}
                  <button type="button" onClick={() => void next()} disabled={isSubmitting} className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-primary px-7 py-4 font-bold text-primary-foreground transition-all hover:-translate-y-1 hover:bg-accent-cyan disabled:cursor-not-allowed disabled:opacity-70">
                    {isSubmitting ? <>Submitting <Loader2 className="h-5 w-5 animate-spin" /></> : <>{step === questions.length - 1 ? "Submit Application" : "Next"} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></>}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
