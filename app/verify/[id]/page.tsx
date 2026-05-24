import type { Metadata } from "next";

import { CertificateNotFound } from "@/components/verify/CertificateNotFound";
import { VerificationCard } from "@/components/verify/VerificationCard";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Verify Certificate ${id} — Virtual Valley`,
    description: "Verify the authenticity of a Virtual Valley internship certificate.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function VerifyPage({ params }: Props) {
  const { id } = await params;

  const { data: certificate, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("cert_id", id)
    .maybeSingle();

  if (error || !certificate) {
    return <CertificateNotFound certId={id} />;
  }

  return <VerificationCard certificate={certificate} />;
}
