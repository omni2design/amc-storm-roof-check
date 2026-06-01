import { ContractorTopNav } from "@/components/product/contractor/ContractorTopNav";
import { ContractorFixedChromePortal } from "@/components/layout/ContractorFixedChromePortal";
import { ContractorPortalEntryLink } from "@/components/product/contractor/ContractorPortalEntryLink";
import { ContractorStatusBadge } from "@/components/product/contractor/ContractorStatusBadge";
import { ContractorDemoWelcomeCard } from "@/components/product/contractor/ContractorDemoWelcomeCard";
import { ContractorMetricCard } from "@/components/product/contractor/ContractorMetricCard";
import { ContractorWorkspaceSummaryCard } from "@/components/product/contractor/ContractorWorkspaceSummaryCard";
import { buttonVariants } from "@/lib/variants/button";
import { CONTRACTOR_ROUTES } from "@/lib/contractor/routes";
import { cn } from "@/lib/utils/cn";

/** 01.01 — Contractor Demo Access */
export default function ContractorDemoPage() {
  return (
    <div className="contractor-mobile-width relative mx-auto min-h-dvh w-full bg-background-subtle">
      <ContractorFixedChromePortal>
        <ContractorTopNav title="Contractor Portal" variant="default" />
      </ContractorFixedChromePortal>

      <main className="contractor-shell-main contractor-shell-main--bottom-nav flex flex-col gap-4">
        <div className="flex justify-center">
          <ContractorStatusBadge status="scheduled">Demo Workspace Active</ContractorStatusBadge>
        </div>

        <ContractorDemoWelcomeCard
          name="Henry"
          role="Owner"
          company="All Might Contracting"
          description="Manage leads, inspections, and customer requests from one place."
        />

        <div className="grid grid-cols-3 gap-2">
          <ContractorMetricCard value={5} label="ACTIVE" tone="active" />
          <ContractorMetricCard value={2} label="URGENT" tone="urgent" />
          <ContractorMetricCard value={1} label="TODAY" tone="today" />
        </div>

        <ContractorWorkspaceSummaryCard
          items={[
            { id: "leads", text: "5 sample leads ready to review", tone: "urgent" },
            { id: "inspections", text: "2 upcoming inspections scheduled", tone: "scheduled" },
            { id: "pipeline", text: "Full pipeline and messaging access", tone: "neutral" },
          ]}
        />
      </main>

      <ContractorFixedChromePortal>
        <div className="contractor-fixed-bottom flex flex-col gap-2 border-t border-border-default bg-surface-card p-6">
          <ContractorPortalEntryLink
            href={CONTRACTOR_ROUTES.leads}
            entrySource="demo"
            className={cn(buttonVariants({ intent: "primary", size: "lg" }), "w-full")}
          >
            Enter Contractor Portal →
          </ContractorPortalEntryLink>
        <p className="text-center text-caption-10 tracking-[0.05px] text-foreground-muted">
          5 active leads · 2 urgent · 1 scheduled today
        </p>
        </div>
      </ContractorFixedChromePortal>
    </div>
  );
}
