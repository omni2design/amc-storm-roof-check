"use client";

import { useRouter } from "next/navigation";
import { StepLayout } from "@/components/flow/StepLayout";
import { StatusBadge } from "@/components/foundation/StatusBadge";
import { TextareaInput } from "@/components/foundation/TextareaInput";
import { getIntakeStepById } from "@/lib/flow/intake-options";
import { useRoofCheckStore } from "@/lib/flow/useRoofCheckStore";

const step = getIntakeStepById("anything-else")!;
const MAX_CHARS = 500;

export default function Step8AnythingElsePage() {
  const router = useRouter();
  const { data, setField } = useRoofCheckStore();
  const value = data.anythingElse ?? "";
  const canContinue = value.trim().length > 0;

  return (
    <StepLayout
      title={step.title}
      subtitle={step.subtitle}
      onNext={() => router.push(step.nextPath)}
      onSkip={() => router.push(step.skipPath!)}
      nextLabel="Continue to Contact Info →"
      nextDisabled={!canContinue}
      skipLabel="Skip this step"
      skipClassName="font-normal text-body text-foreground-secondary hover:bg-transparent hover:text-foreground-primary"
      footerOrder="primary-first"
    >
      <div className="flex w-full flex-col items-start gap-3">
        <StatusBadge status="optional" className="px-3 py-1">
          Optional
        </StatusBadge>
        <TextareaInput
          label="Additional context"
          name="anythingElse"
          placeholder="Example: Leak started after recent storm, water near chimney, issue getting worse over time..."
          helper="Additional details help us prepare for your inspection."
          maxLength={MAX_CHARS}
          value={value}
          onChange={(e) => setField("anythingElse", e.target.value.slice(0, MAX_CHARS))}
          rows={5}
          className="w-full"
        />
      </div>
    </StepLayout>
  );
}
