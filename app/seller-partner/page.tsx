import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

// New Seller Partner Components
import SellerPartnerHeader from "@/components/seller-partner/SellerPartnerHeader";
import NoInterviewBanner from "@/components/seller-partner/NoInterviewBanner";
import InternshipCertificate from "@/components/seller-partner/InternshipCertificate";
import WhyJoinSection from "@/components/seller-partner/WhyJoinSection";
import HowItWorks from "@/components/seller-partner/HowItWorks";
import PartnerEarnings from "@/components/seller-partner/PartnerEarnings";
import ApplicationForm from "@/components/seller-partner/ApplicationForm";
import FinalCTA from "@/components/seller-partner/FinalCTA";

export const metadata: Metadata = {
  title: "Seller Partner Program | Virtual Valley",
  description:
    "Join Virtual Valley as an Intern, Freelancer, or Seller Partner. Gain real-world experience, earn commissions, and get a verified certificate. No interview required.",
  alternates: {
    canonical: "https://thevirtualvalley.com/seller-partner",
  },
};

export default function SellerPartnerPage() {
  return (
    <main id="top" className="bg-black text-white selection:bg-purple-500/30">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://thevirtualvalley.com" },
          { name: "Seller Partner", url: "https://thevirtualvalley.com/seller-partner" },
        ]}
      />
      
      <Navbar />
      
      {/* 1. Hero Section */}
      <SellerPartnerHeader />
      
      {/* 2. No Interview Highlight Banner */}
      <NoInterviewBanner />
      

      {/* 4. Internship Certificate Mockup */}
      <InternshipCertificate />
      
      {/* 5. Why Join Us */}
      <WhyJoinSection />
      
      {/* 6. How It Works Timeline */}
      <HowItWorks />
      
      {/* 7. Partner Earnings (New Commission Structure) */}
      <PartnerEarnings />
      
      {/* 8. Application Form */}
      <ApplicationForm />
      
      {/* 9. Final Large CTA */}
      <FinalCTA />
      
      <Footer />
    </main>
  );
}
