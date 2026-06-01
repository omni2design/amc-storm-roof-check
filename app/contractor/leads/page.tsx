"use client";

import { useMemo, useState } from "react";
import { ContractorShell } from "@/components/product/contractor/ContractorShell";
import { ContractorPageContent } from "@/components/product/contractor/ContractorPageLayout";
import { ContractorLeadCard } from "@/components/product/contractor/ContractorLeadCard";
import { ContractorFilterChip } from "@/components/product/contractor/ContractorFilterChip";
import { SearchBar } from "@/components/foundation/SearchBar";
import { MOCK_LEADS, type MockLead } from "@/lib/contractor/mock-data";
import { mapLeadStatusToContractorBadge } from "@/lib/contractor/map-status-badge";
import { CONTRACTOR_ROUTES } from "@/lib/contractor/routes";

type FilterId = "all" | "new" | "urgent" | "scheduled" | "completed";

const FILTERS: {
  id: FilterId;
  label: string;
  icon: "all" | "new" | "urgent" | "scheduled" | "completed";
}[] = [
  { id: "all", label: "All", icon: "all" },
  { id: "new", label: "New", icon: "new" },
  { id: "urgent", label: "Urgent", icon: "urgent" },
  { id: "scheduled", label: "Scheduled", icon: "scheduled" },
  { id: "completed", label: "Completed", icon: "completed" },
];

function leadMatchesFilter(lead: MockLead, filter: FilterId): boolean {
  switch (filter) {
    case "all":
      return true;
    case "new":
      return mapLeadStatusToContractorBadge(lead.status) === "new";
    case "urgent":
      return lead.status === "critical" || lead.status === "high";
    case "scheduled":
      return lead.status === "scheduled";
    case "completed":
      return lead.status === "completed" || lead.status === "confirmed";
    default:
      return true;
  }
}

/**
 * Figma `02.01 – Contractor Leads` (829:8065)
 * https://www.figma.com/design/DnlD52iTlNrh8rZj1rMY1W/AMC-Storm-Roof-Check?node-id=829-8065
 */
export default function ContractorLeadsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");

  const leads = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return MOCK_LEADS.filter((lead) => {
      const matchesFilter = leadMatchesFilter(lead, filter);
      const matchesQuery =
        !normalized ||
        lead.name.toLowerCase().includes(normalized) ||
        lead.issue.toLowerCase().includes(normalized) ||
        lead.location.toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const activeCount = MOCK_LEADS.length;

  return (
    <ContractorShell title="Leads" activeNav="leads" className="bg-[#f9fafb]">
      <ContractorPageContent>
        <SearchBar
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onClear={() => setQuery("")}
          placeholder="Search leads…"
          wrapperClassName="h-11 gap-2 rounded-[10px] border-[#e5e7eb] bg-white px-4 py-0 shadow-none"
        />

        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {FILTERS.map((item) => (
            <ContractorFilterChip
              key={item.id}
              label={item.label}
              icon={item.icon}
              active={filter === item.id}
              onClick={() => setFilter(item.id)}
            />
          ))}
        </div>

        <div className="flex w-full items-center justify-between">
          <h2 className="text-lg font-semibold leading-relaxed text-foreground-muted">Active Leads</h2>
          <p className="text-xs leading-tight tracking-[0.03px] text-[#6b7280]">
            {activeCount} lead{activeCount === 1 ? "" : "s"}
          </p>
        </div>

        <ul className="flex flex-col gap-4">
          {leads.map((lead) => (
            <li key={lead.id}>
              <ContractorLeadCard
                id={lead.id}
                name={lead.name}
                issue={lead.issue}
                submittedAt={lead.submittedAt}
                status={lead.status}
                statusLabel={lead.statusLabel}
                photoCount={lead.photoCount}
                insurance={lead.insurance}
                budget={lead.budget}
                unread={lead.unread}
                href={CONTRACTOR_ROUTES.leadDetail(lead.id)}
              />
            </li>
          ))}
        </ul>

        {leads.length === 0 ? (
          <p className="py-8 text-center text-sm-leading text-foreground-muted">
            No leads match your filters.
          </p>
        ) : null}
      </ContractorPageContent>
    </ContractorShell>
  );
}
