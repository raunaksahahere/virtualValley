import type { Metadata } from "next";

import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service governing Virtual Valley's digital agency engagements.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="20 May 2026">
      <h2>Services offered</h2>
      <p>
        Virtual Valley provides website development, website repair and maintenance, social media management, and related digital support services.
      </p>
      <h2>Payment terms</h2>
      <p>
        Website projects generally follow a 50% advance payment before work begins and 50% on delivery. Social media management engagements require advance payment before work starts unless stated otherwise in writing.
      </p>
      <h2>Revision policy</h2>
      <p>
        Reasonable revisions are included according to the package or proposal you accept. Excessive revisions or scope changes may require updated pricing and timelines.
      </p>
      <h2>Intellectual property</h2>
      <p>
        Final deliverables transfer to the client only after full payment is completed, unless a separate written agreement states otherwise. Virtual Valley may showcase completed work in its portfolio unless confidentiality has been agreed in writing.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        Virtual Valley is not liable for indirect, incidental, or consequential losses arising from delays, platform changes, third-party outages, or client-provided material.
      </p>
      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India. Jurisdiction for disputes will rest in West Bengal.
      </p>
    </LegalPageLayout>
  );
}
