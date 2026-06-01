import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { ContractorStatusBadge } from "@/components/product/contractor/ContractorStatusBadge";
import { mapLeadStatusToContractorBadge } from "@/lib/contractor/map-status-badge";
import { CardShell } from "@/components/foundation/CardShell";
import type { LeadWorkflowStatus } from "@/lib/contractor/types";

export type LeadPanelSection = {
  id: string;
  title: string;
  children: ReactNode;
};

export type LeadPanelProps = {
  title: string;
  subtitle?: string;
  status?: LeadWorkflowStatus;
  statusLabel?: string;
  sections: LeadPanelSection[];
  actions?: ReactNode;
  className?: string;
};

/**
 * Contractor lead workspace shell — anticipates summary, pipeline, observations, notes.
 * Composes slots; does not hard-code placeholder boxes.
 */
export function LeadPanel({
  title,
  subtitle,
  status,
  statusLabel,
  sections,
  actions,
  className,
}: LeadPanelProps) {
  return (
    <article className={cn("flex flex-col gap-6", className)}>
      <header className="flex flex-col gap-2 border-b border-border-subtle pb-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-title text-foreground-primary">{title}</h1>
          {status && statusLabel ? (
            <ContractorStatusBadge status={mapLeadStatusToContractorBadge(status)}>
              {statusLabel}
            </ContractorStatusBadge>
          ) : null}
        </div>
        {subtitle ? <p className="text-body text-foreground-secondary">{subtitle}</p> : null}
        {actions ? <div className="flex flex-wrap gap-2 pt-1">{actions}</div> : null}
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-6">
          {sections
            .filter((s) => s.id !== "sidebar")
            .map((section) => (
              <CardShell key={section.id} as="section" padding="lg">
                <h2 className="text-heading text-foreground-primary">{section.title}</h2>
                <div className="mt-4">{section.children}</div>
              </CardShell>
            ))}
        </div>

        {sections.find((s) => s.id === "sidebar") ? (
          <aside className="flex flex-col gap-4">
            {sections
              .filter((s) => s.id === "sidebar")
              .map((section) => (
                <CardShell key={section.id} as="section" padding="lg">
                  <h2 className="text-heading text-foreground-primary">{section.title}</h2>
                  <div className="mt-4">{section.children}</div>
                </CardShell>
              ))}
          </aside>
        ) : null}
      </div>
    </article>
  );
}
