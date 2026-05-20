"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type SearchParamsInput = {
  selectedPackage?: string;
  isMonthly?: string;
};

type SelectedPackage = {
  name: string;
  price: string;
  packageType: string;
  serviceType: string;
};

type OrderFormState = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  projectDetails: string;
};

const initialForm: OrderFormState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  projectDetails: "",
};

export default function OrderPageClient({
  searchParams,
}: {
  searchParams: SearchParamsInput;
}) {
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = searchParams.selectedPackage;
        if (!raw) {
          setSelectedPackage(null);
          return;
        }

        const parsed = JSON.parse(raw) as SelectedPackage;
        setSelectedPackage(parsed);
      } catch {
        setSelectedPackage(null);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchParams]);

  const paymentNote =
    selectedPackage?.serviceType === "social"
      ? "Advance payment is required before social media management begins."
      : "Payment structure: 50% before the project starts and 50% on delivery.";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!selectedPackage) {
      setError("No package was selected.");
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const phoneValid = /^[0-9+\-\s]{8,20}$/.test(form.phone);

    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!phoneValid) {
      setError("Please enter a valid phone number.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/order-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          selectedPackage,
          isMonthly: searchParams.isMonthly === "true",
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Could not submit the enquiry.");
      }

      setSuccess(true);
      setForm(initialForm);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Could not submit the enquiry.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <p className="mt-4 text-sm text-gray-400">Loading your selected package...</p>
        </div>
      </main>
    );
  }

  if (!selectedPackage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
        <div className="max-w-lg rounded-[2rem] border border-white/10 bg-neutral-950 p-8 text-center">
          <h1 className="font-display text-3xl font-semibold">Package not found</h1>
          <p className="mt-4 text-sm leading-7 text-gray-400">
            Return to pricing and choose a package again before submitting an enquiry.
          </p>
          <Link href="/#pricing" className="btn-primary mt-8">
            Back to Pricing
          </Link>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-4 py-20 text-white">
        <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-neutral-950 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Enquiry received</p>
          <h1 className="mt-4 font-display text-4xl font-semibold">
            Your enquiry is confirmed.
          </h1>
          <p className="mt-5 text-sm leading-7 text-gray-400">
            We have emailed a confirmation to you and notified the Virtual Valley team. Expect a response within 24 hours.
          </p>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
            <p className="font-display text-2xl font-semibold">{selectedPackage.name}</p>
            <p className="mt-2 text-sm text-gray-400">
              {selectedPackage.serviceType} • {selectedPackage.packageType} • INR {selectedPackage.price}
            </p>
            <p className="mt-4 text-sm leading-7 text-gray-400">{paymentNote}</p>
          </div>
          <Link href="/" className="btn-primary mt-8">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-24 text-white md:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <section className="rounded-[2rem] border border-white/10 bg-neutral-950 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Selected package</p>
          <h1 className="mt-4 font-display text-4xl font-semibold">{selectedPackage.name}</h1>
          <div className="mt-6 space-y-4 text-sm text-gray-300">
            <p>Service Type: {selectedPackage.serviceType}</p>
            <p>Package Type: {selectedPackage.packageType}</p>
            <p>Price: INR {selectedPackage.price}</p>
            <p>{paymentNote}</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-neutral-950 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500">Send enquiry</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <Field
              label="Full Name"
              value={form.fullName}
              onChange={(value) => setForm((current) => ({ ...current, fullName: value }))}
            />
            <Field
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(value) => setForm((current) => ({ ...current, email: value }))}
            />
            <Field
              label="Phone Number"
              value={form.phone}
              onChange={(value) => setForm((current) => ({ ...current, phone: value }))}
            />
            <Field
              label="Company Name"
              value={form.company}
              onChange={(value) => setForm((current) => ({ ...current, company: value }))}
            />
            <label className="block">
              <span className="text-xs uppercase tracking-[0.28em] text-gray-500">Project Details</span>
              <textarea
                required
                rows={5}
                value={form.projectDetails}
                onChange={(event) =>
                  setForm((current) => ({ ...current, projectDetails: event.target.value }))
                }
                className="mt-4 w-full resize-none border-b-2 border-gray-800 bg-transparent pb-3 text-base text-white outline-none focus:border-white"
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Submitting..." : "Submit Enquiry"}
            </button>

            {error ? <p className="text-sm text-red-300">{error}</p> : null}
          </form>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.28em] text-gray-500">{label}</span>
      <input
        type={type}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-4 w-full border-b-2 border-gray-800 bg-transparent pb-3 text-base text-white outline-none focus:border-white"
      />
    </label>
  );
}
