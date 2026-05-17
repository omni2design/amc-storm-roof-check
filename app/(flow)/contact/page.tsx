"use client";

import { useRouter } from "next/navigation";
import { StepLayout } from "@/components/flow/StepLayout";
import { IntakeHelper } from "@/components/flow/IntakeHelper";
import { TextField } from "@/components/foundation/TextField";
import { contactFields, getIntakeStepById } from "@/lib/flow/intake-options";
import { useRoofCheckStore } from "@/lib/flow/useRoofCheckStore";

const step = getIntakeStepById("contact")!;

export default function ContactPage() {
  const router = useRouter();
  const { data, setField } = useRoofCheckStore();

  const nextDisabled =
    !String(data.name ?? "").trim() ||
    !String(data.phone ?? "").trim() ||
    !String(data.address ?? "").trim();

  return (
    <StepLayout
      title={step.title}
      subtitle={step.subtitle}
      onNext={() => router.push(step.nextPath)}
      nextDisabled={nextDisabled}
      nextLabel={step.nextLabel}
    >
      <div className="flex flex-col gap-3">
        {contactFields.map((field) => (
          <TextField
            key={field.field}
            label={field.label}
            name={field.field}
            icon={field.icon}
            type={field.type}
            inputMode={field.inputMode}
            placeholder={field.placeholder}
            value={String(data[field.field] ?? "")}
            onChange={(e) => setField(field.field, e.target.value)}
            required={field.required}
          />
        ))}
        {step.helper ? <IntakeHelper helper={step.helper} /> : null}
      </div>
    </StepLayout>
  );
}
