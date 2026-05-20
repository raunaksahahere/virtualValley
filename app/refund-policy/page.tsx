import type { Metadata } from "next";

import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund policy for Virtual Valley service engagements.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout title="Refund Policy" lastUpdated="20 May 2026">
      <h2>No refund after work commencement</h2>
      <p>
        Once work has started on a project, campaign, or management engagement, payments already made are generally non-refundable.
      </p>
      <h2>Partial refund conditions</h2>
      <p>
        Partial refunds may be considered only if Virtual Valley has not started execution or if a written agreement specifically allows for it. Approved partial refunds will reflect time already reserved, discovery already completed, and non-recoverable preparation work.
      </p>
      <h2>Dispute process</h2>
      <p>
        To raise a billing dispute, contact our team with your project details, invoice information, and a written explanation of the concern. We will review the matter and respond within a reasonable timeframe.
      </p>
      <h2>Refund contact</h2>
      <p>
        Refund and dispute requests should be sent to contact.virtualvalley@gmail.com.
      </p>
    </LegalPageLayout>
  );
}
