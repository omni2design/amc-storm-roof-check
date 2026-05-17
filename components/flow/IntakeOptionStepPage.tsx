"use client";

import { useRouter } from "next/navigation";
import { StepLayout } from "@/components/flow/StepLayout";
import { IntakeOptionList } from "@/components/flow/IntakeOptionList";
import { IntakeHelper } from "@/components/flow/IntakeHelper";
import type { IntakeStepId } from "@/lib/flow/intake-options";
import { getIntakeStepById } from "@/lib/flow/intake-options";
import { useRoofCheckStore } from "@/lib/flow/useRoofCheckStore";

type IntakeOptionStepPageProps = {
  stepId: IntakeStepId;
};

export function IntakeOptionStepPage({ stepId }: IntakeOptionStepPageProps) {
  const router = useRouter();
  const { data, setField } = useRoofCheckStore();
  const step = getIntakeStepById(stepId);

  if (!step?.field || !step.options) return null;

  const field = step.field;
  const value = data[field] as string | undefined;
  const nextDisabled = !step.optional && !value;

  return (
    <StepLayout
      title={step.title}
      subtitle={step.subtitle}
      onNext={() => router.push(step.nextPath)}
      nextDisabled={nextDisabled}
      nextLabel={step.nextLabel}
      onSkip={
        step.optional && step.skipPath
          ? () => router.push(step.skipPath!)
          : undefined
      }
      skipLabel="Skip for now"
    >
      <IntakeOptionList
        options={step.options}
        value={value}
        onChange={(v) => setField(field, v)}
      />
      {step.helper ? <IntakeHelper helper={step.helper} className="mt-8" /> : null}
    </StepLayout>
  );
}
