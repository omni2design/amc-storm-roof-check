import { notFound } from "next/navigation";
import { ContractorLeadDetailView } from "@/components/product/contractor/ContractorLeadDetailView";
import { getLeadById } from "@/lib/contractor/mock-data";

type LeadDetailPageProps = {
  params: Promise<{ leadId: string }>;
};

/** 03.01 — Lead Detail */
export default async function ContractorLeadDetailPage({ params }: LeadDetailPageProps) {
  const { leadId } = await params;
  const lead = getLeadById(leadId);
  if (!lead) notFound();

  return <ContractorLeadDetailView lead={lead} />;
}
