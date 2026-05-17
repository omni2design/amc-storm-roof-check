"use client";

import { useRouter } from "next/navigation";
import { StepLayout } from "@/components/flow/StepLayout";
import { PhotoUploadExperience } from "@/components/flow/PhotoUploadExperience";
import { getIntakeStepById } from "@/lib/flow/intake-options";
import { useRoofCheckStore } from "@/lib/flow/useRoofCheckStore";

const step = getIntakeStepById("photos")!;

export default function Step7PhotosPage() {
  const router = useRouter();
  const { data } = useRoofCheckStore();
  const canSubmit = data.photos.length > 0;

  return (
    <StepLayout
      title={step.title}
      subtitle={step.subtitle}
      onNext={() => router.push(step.nextPath)}
      onSkip={() => router.push(step.skipPath!)}
      nextLabel={step.nextLabel}
      nextDisabled={!canSubmit}
      skipLabel="Skip this step"
      footerOrder="primary-first"
      contentFill
      skipClassName="font-normal text-body text-foreground-secondary hover:bg-transparent hover:text-foreground-primary"
    >
      <PhotoUploadExperience />
    </StepLayout>
  );
}
