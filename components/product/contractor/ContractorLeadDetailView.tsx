"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ContractorShell } from "@/components/product/contractor/ContractorShell";
import { ContractorLeadDetailSummary } from "@/components/product/contractor/ContractorLeadDetailSummary";
import { ContractorQuickActionBar } from "@/components/product/contractor/ContractorQuickActionBar";
import { ContractorIntakeSummaryCard } from "@/components/product/contractor/ContractorIntakeSummaryCard";
import { ContractorPhotoGalleryCard } from "@/components/product/contractor/ContractorPhotoGalleryCard";
import { ContractorAIAssessmentCard } from "@/components/product/contractor/ContractorAIAssessmentCard";
import { ContractorRecommendationCard } from "@/components/product/contractor/ContractorRecommendationCard";
import { ContractorNotesInputCard } from "@/components/product/contractor/ContractorNotesInputCard";
import {
  LeadDetailPageContent,
  LeadDetailSectionHeading,
} from "@/components/product/contractor/LeadDetailPageLayout";
import type { MockLead } from "@/lib/contractor/mock-data";
import { CONTRACTOR_ROUTES } from "@/lib/contractor/routes";

export type ContractorLeadDetailViewProps = {
  lead: MockLead;
};

export function ContractorLeadDetailView({ lead }: ContractorLeadDetailViewProps) {
  const router = useRouter();
  const [notes, setNotes] = useState(lead.notes);

  const detailSubtitle =
    lead.detailSubtitle ?? `${lead.submittedLabel}${lead.urgencyLabel ? ` · ${lead.urgencyLabel.split("—")[0]?.trim() ?? lead.urgencyLabel}` : ""}`;

  const alertMessage = lead.alertMessage ?? lead.issue;

  const quickActions = [
    { id: "call", label: "Call", icon: "call" as const, onClick: () => window.open(`tel:${lead.phone}`) },
    { id: "message", label: "Message", icon: "message" as const },
    { id: "schedule", label: "Schedule", icon: "schedule" as const },
    { id: "contact", label: "Contact", icon: "contact" as const },
  ];

  return (
    <ContractorShell
      title="Lead Detail"
      backHref={CONTRACTOR_ROUTES.leads}
      showBottomNav={false}
      quickActionBar={<ContractorQuickActionBar actions={quickActions} />}
      className="bg-[#f9fafb]"
    >
      <LeadDetailPageContent>
        <ContractorLeadDetailSummary
          name={lead.name}
          status={lead.status}
          statusLabel={lead.statusLabel}
          detailSubtitle={detailSubtitle}
          alertMessage={alertMessage}
          photoCount={lead.photoCount}
          insurancePill={lead.insurancePill ?? (lead.insurance ? "Insurance" : undefined)}
          budgetPill={lead.budgetPill ?? lead.budget}
        />

        <LeadDetailSectionHeading>Project Details</LeadDetailSectionHeading>

        <ContractorIntakeSummaryCard
          intake={
            lead.intake ?? {
              dateSubmitted: lead.submittedLabel,
              damageType: lead.issue,
              priority: lead.statusLabel,
              intakeStatus: "Pending",
            }
          }
        />

        <ContractorPhotoGalleryCard
          photos={lead.photos.map((photo, index) => ({
            id: photo.id,
            src: photo.src,
            alt: photo.alt,
            label: photo.label ?? `Photo ${index + 1}`,
          }))}
          onPhotoClick={(photo) => router.push(CONTRACTOR_ROUTES.photoViewer(lead.id, photo.id))}
        />

        <LeadDetailSectionHeading>AI Insights</LeadDetailSectionHeading>

        <ContractorAIAssessmentCard
          insight={lead.aiInsight}
          recommendedAction={lead.aiRecommendedAction ?? lead.recommendation}
          confidence={lead.aiConfidence}
        />

        <ContractorRecommendationCard recommendation={lead.recommendation} />

        <LeadDetailSectionHeading>Work Notes</LeadDetailSectionHeading>

        <ContractorNotesInputCard value={notes} onChange={setNotes} />
      </LeadDetailPageContent>
    </ContractorShell>
  );
}
