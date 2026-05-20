import type { Metadata } from "next";

import CommissionStructure from "@/components/growth-partner/CommissionStructure";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import GrowthPartnerHeader from "@/components/growth-partner/GrowthPartnerHeader";
import GrowthPrograms from "@/components/growth-partner/GrowthPrograms";
import HighlightStrip from "@/components/growth-partner/HighlightStrip";
import OpenOpportunity from "@/components/growth-partner/OpenOpportunity";
import RegistrationForm from "@/components/growth-partner/RegistrationForm";
import RulesPolicy from "@/components/growth-partner/RulesPolicy";

export const metadata: Metadata = {
  title: "Growth Partner Program",
  description:
    "Earn commission by referring clients to Virtual Valley. Join our Growth Partner program and earn up to 20% commission on every successful referral.",
  alternates: {
    canonical: "https://thevirtualvalley.com/growth-partner",
  },
};

export default function GrowthPartnerPage() {
  return (
    <main id="top" className="bg-black text-white">
      <Navbar />
      <GrowthPartnerHeader />
      <OpenOpportunity />
      <CommissionStructure />
      <HighlightStrip />
      <RegistrationForm />
      <RulesPolicy />
      <GrowthPrograms />
      <Footer />
    </main>
  );
}
