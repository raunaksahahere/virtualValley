import type { Metadata } from "next";

import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import RecentProjectsPage from "@/components/RecentProjectsPage";

export const metadata: Metadata = {
  title: "Recent Projects | Virtual Valley - Digital Agency Portfolio",
  description:
    "Browse Virtual Valley's portfolio of website development and social media management projects across India.",
  alternates: {
    canonical: "https://thevirtualvalley.com/recentprojects",
  },
};

export default function RecentProjectsRoute() {
  return (
    <main id="top" className="bg-black text-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://thevirtualvalley.com" },
          { name: "Recent Projects", url: "https://thevirtualvalley.com/recentprojects" },
        ]}
      />
      <Navbar />
      <RecentProjectsPage />
      <Footer />
    </main>
  );
}
