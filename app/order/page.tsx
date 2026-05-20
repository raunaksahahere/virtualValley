import type { Metadata } from "next";

import OrderPageClient from "@/components/OrderPageClient";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Submit your enquiry for website development or social media management services from Virtual Valley.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://thevirtualvalley.com/order",
  },
};

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{
    selectedPackage?: string;
    isMonthly?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;

  return <OrderPageClient searchParams={resolvedSearchParams} />;
}
