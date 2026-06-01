import { ContractorShell } from "@/components/product/contractor/ContractorShell";
import { ContractorPageContent } from "@/components/product/contractor/ContractorPageLayout";
import { ContractorNewLeadsSummaryCard } from "@/components/product/contractor/ContractorNewLeadsSummaryCard";
import { ContractorLeadCard } from "@/components/product/contractor/ContractorLeadCard";
import { MOCK_LEADS } from "@/lib/contractor/mock-data";
import { CONTRACTOR_ROUTES } from "@/lib/contractor/routes";

/** 05.01 — Pipeline View */
export default function ContractorPipelinePage() {
  const uncontacted = MOCK_LEADS.filter((lead) => ["lead-001", "lead-002", "lead-005"].includes(lead.id));
  const scheduled = MOCK_LEADS.filter((lead) => ["lead-004", "lead-006"].includes(lead.id));

  return (
    <ContractorShell title="Pipeline" activeNav="pipeline" className="bg-[#f9fafb]">
      <ContractorPageContent>
        <ContractorNewLeadsSummaryCard total={3} critical={2} high={1} />

        <div className="flex w-full items-center justify-between">
          <h2 className="text-lg font-semibold leading-relaxed text-foreground-muted">Uncontacted</h2>
          <p className="text-xs leading-tight tracking-[0.03px] text-[#6b7280]">Sort: Newest</p>
        </div>

        <ul className="flex flex-col gap-4">
          {uncontacted.map((lead) => (
            <li key={lead.id}>
              <ContractorLeadCard
                id={lead.id}
                name={lead.name}
                issue={lead.issue}
                submittedAt={lead.submittedAt}
                status={lead.status}
                statusLabel={lead.statusLabel}
                unread={lead.unread}
                href={CONTRACTOR_ROUTES.leadDetail(lead.id)}
                variant="compact"
              />
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold leading-relaxed text-foreground-muted">Scheduled This Week</h2>

        <ul className="flex flex-col gap-4">
          {scheduled.map((lead) => (
            <li key={lead.id}>
              <ContractorLeadCard
                id={lead.id}
                name={lead.name}
                issue={lead.issue}
                submittedAt={lead.submittedAt}
                status={lead.status}
                statusLabel={lead.statusLabel}
                unread={lead.unread}
                href={CONTRACTOR_ROUTES.leadDetail(lead.id)}
                variant="compact"
              />
            </li>
          ))}
        </ul>
      </ContractorPageContent>
    </ContractorShell>
  );
}
