import type { Metadata } from "next";

import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Virtual Valley website visitors and enquiry forms.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="20 May 2026">
      <h2>Information we collect</h2>
      <p>
        Virtual Valley collects the information you submit through our contact, order, and growth partner forms. This may include your name, email address, phone number, company name, city, and the details you share about your project or enquiry.
      </p>
      <h2>How we use your data</h2>
      <p>
        We use submitted information to respond to enquiries, prepare proposals, process partnership applications, and manage ongoing communication with prospective clients and partners.
      </p>
      <h2>Third-party services</h2>
      <p>
        We use Resend for transactional email delivery, Vercel for website hosting, and Google Analytics or Google Tag Manager for traffic measurement.
      </p>
      <h2>Retention and deletion</h2>
      <p>
        We retain submitted information only for as long as necessary to respond to requests, manage business communication, or meet reasonable internal recordkeeping needs. You may request deletion of your data by contacting us.
      </p>
      <h2>Contact for privacy requests</h2>
      <p>
        For data access, correction, or deletion requests, email contact.virtualvalley@gmail.com or call +91 8017007352.
      </p>
    </LegalPageLayout>
  );
}
