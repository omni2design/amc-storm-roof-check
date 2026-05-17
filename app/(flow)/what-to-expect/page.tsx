"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FlowShell } from "@/components/layout/FlowShell";
import { TopNav } from "@/components/foundation/TopNav";
import { Button } from "@/components/foundation/Button";
import { whatToExpectSteps } from "@/lib/flow/intake-options";

const stepImages = [
  "/images/figma/what-to-expect/step-01.jpg",
  "/images/figma/what-to-expect/step-02.jpg",
  "/images/figma/what-to-expect/step-03.jpg",
] as const;

export default function WhatToExpectPage() {
  const router = useRouter();

  return (
    <FlowShell
      variant="intake"
      footer={
        <Button type="button" intent="emergency" size="lg" className="w-full" onClick={() => router.push("/step-1-issue")}>
          Let&apos;s Start →
        </Button>
      }
    >
      <TopNav variant="progress" onBack={() => router.push("/landing")} />

      <div className="flow-intake-page-body flex min-h-0 flex-1 flex-col gap-8 px-6">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="text-intake-title text-foreground-primary">What to expect?</h1>
          <p className="text-sm-leading text-foreground-secondary">
            We&apos;ll guide you through a quick roof check to help our team understand the issue and follow up
            faster.
          </p>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-3">
          {whatToExpectSteps.map((step, index) => (
            <div key={step.step} className="flex w-full items-center gap-5">
              <div className="relative aspect-square w-[48%] max-w-[12.5rem] shrink-0 overflow-hidden rounded-3xl border border-input-border bg-surface-card shadow-semantic-rest">
                <Image src={stepImages[index]} alt="" fill className="object-cover" sizes="200px" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                <span className="text-intake-title leading-none text-foreground-primary">{step.step}</span>
                <span className="text-base font-semibold leading-normal text-foreground-primary">{step.title}</span>
                <span className="text-2xs-leading tracking-[0.05px] text-foreground-secondary">
                  {step.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FlowShell>
  );
}
