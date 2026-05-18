"use client";

import { useCallback, useRef, useState } from "react";
import { FlowShell } from "@/components/layout/FlowShell";
import { TopNav } from "@/components/foundation/TopNav";
import { Button } from "@/components/foundation/Button";
import { NextdoorLogo } from "@/components/brand/NextdoorLogo";
import { CallHenrySheet } from "@/components/product/roof-check/CallHenrySheet";
import { Icon } from "@/components/icons/Icon";
import { useRestartRoofCheck } from "@/lib/flow/useRestartRoofCheck";
import { useRoofCheckStore } from "@/lib/flow/useRoofCheckStore";

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex h-12 items-center justify-between border-b border-input-border px-4 py-2 last:border-0">
      <span className="text-sm-leading text-foreground-secondary">{label}</span>
      <span className="text-sm-leading font-semibold text-foreground-primary">{value || "—"}</span>
    </div>
  );
}

export default function ResultPage() {
  const { data } = useRoofCheckStore();
  const restartFlow = useRestartRoofCheck();
  const [callSheetOpen, setCallSheetOpen] = useState(false);
  const callHenryTriggerRef = useRef<HTMLButtonElement>(null);

  const closeCallSheet = useCallback(() => {
    setCallSheetOpen(false);
    requestAnimationFrame(() => callHenryTriggerRef.current?.focus());
  }, []);

  return (
    <FlowShell
      variant="result"
      footer={
        <div className="flex w-full flex-col gap-3">
          <Button
            ref={callHenryTriggerRef}
            type="button"
            intent="emergency"
            size="lg"
            className="w-full"
            iconLeft="contact/phone"
            aria-haspopup="dialog"
            aria-expanded={callSheetOpen}
            onClick={() => setCallSheetOpen(true)}
          >
            Call Henry Now
          </Button>
          <Button
            type="button"
            intent="ghost"
            size="lg"
            className="w-full px-6 py-4 font-normal text-body text-foreground-secondary hover:bg-transparent hover:text-foreground-primary"
            onClick={restartFlow}
          >
            Start a new check
          </Button>
        </div>
      }
    >
      <TopNav variant="default" brandLabel="All Might Contracting" />

      <div className="flow-result-page-body flex flex-1 flex-col gap-8 px-6">
        <header className="flex flex-col items-center gap-2 text-center">
          <Icon name="trust/licensed" mode="success" size="xl" className="size-16" label="Submitted" />
          <h1 className="text-intake-title text-foreground-inverse">Roof Check Submitted!</h1>
          <p className="max-w-[18.1875rem] text-sm-leading text-foreground-inverse">
            Henry will personally review your request and follow up with next steps.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-xl border border-input-border bg-surface-card px-0 py-2">
            <SummaryRow label="Issue type" value={data.issue} />
            <SummaryRow label="Urgency" value={data.urgency} />
            <SummaryRow label="Insurance" value={data.insuranceStatus} />
            <SummaryRow label="Budget" value={data.budget} />
            {data.roofAge ? <SummaryRow label="Roof age" value={data.roofAge} /> : null}
            {data.priorRepairs ? <SummaryRow label="Prior repairs" value={data.priorRepairs} /> : null}
            {data.photos.length > 0 ? (
              <SummaryRow label="Photos" value={`${data.photos.length} attached`} />
            ) : null}
          </div>

          <blockquote className="relative flex flex-col gap-3 overflow-hidden rounded-xl border border-input-border bg-surface-card p-4">
            <p className="text-sm-leading font-semibold text-foreground-primary">
              &ldquo;Honest, hardworking, and easy to work with. Fair pricing and great attention to customer
              satisfaction.&rdquo;
            </p>
            <footer className="flex flex-col items-start">
              <p className="text-overline text-foreground-primary">Karen S.</p>
              <p className="text-2xs-leading tracking-[0.05px] text-foreground-secondary">Roofing Job</p>
              <NextdoorLogo className="mt-3" />
            </footer>
          </blockquote>
        </div>

      </div>

      <CallHenrySheet open={callSheetOpen} onClose={closeCallSheet} />
    </FlowShell>
  );
}
