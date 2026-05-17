import type { IconId } from "@/lib/icons/types";
import type { RoofCheckData } from "@/lib/flow/useRoofCheckStore";

export type IntakeWhen = {
  field: keyof RoofCheckData;
  equals?: string | string[];
  notEquals?: string | string[];
};

export type IntakeHelper = {
  content: string;
  variant?: "emergency" | "info";
};

export type IntakeOption = {
  value: string;
  title: string;
  description?: string;
  icon?: IconId;
  warning?: boolean;
};

export type IntakeStepId =
  | "issue"
  | "urgency"
  | "roof-age"
  | "prior-repairs"
  | "insurance"
  | "budget"
  | "photos"
  | "anything-else"
  | "contact";

export type IntakeStepConfig = {
  id: IntakeStepId;
  path: string;
  title: string;
  subtitle?: string;
  field?: keyof RoofCheckData;
  options?: IntakeOption[];
  helper?: IntakeHelper;
  nextPath: string;
  nextLabel?: string;
  /** Step can proceed without a selection */
  optional?: boolean;
  skipPath?: string;
  when?: IntakeWhen[];
};

export type IntakeContactField = {
  field: keyof RoofCheckData;
  label: string;
  placeholder?: string;
  icon?: IconId;
  required?: boolean;
  type?: "text" | "email" | "tel";
  inputMode?: "text" | "email" | "tel";
};

export const whatToExpectSteps = [
  {
    step: "01",
    title: "Describe the issue",
    description: "Quick questions about the problem for planning",
  },
  {
    step: "02",
    title: "Upload photos",
    description: "Add damage photos if available for better pricing",
  },
  {
    step: "03",
    title: "Get support",
    description: "Share contact info for next steps and follow-ups",
  },
] as const;

export const issueOptions: IntakeOption[] = [
  {
    value: "Leak inside home",
    title: "Leak inside home",
    description: "Water coming through ceiling or walls",
    icon: "damage-type/leak-1",
  },
  {
    value: "Missing shingles",
    title: "Missing shingles",
    description: "Shingles blown off or visibly missing",
    icon: "damage-type/missing-shingles",
  },
  {
    value: "Storm / weather damage",
    title: "Storm / weather damage",
    description: "Wind, hail, debris, or roof impact damage",
    icon: "damage-type/hail",
  },
  {
    value: "Tree / branch damage",
    title: "Tree / branch damage",
    description: "Branch fell on or near the roof",
    icon: "damage-type/tree-branch",
  },
  {
    value: "Not sure",
    title: "Not sure",
    description: "Not certain what caused the issue",
    icon: "status/not-sure",
  },
];

export const urgencyOptions: IntakeOption[] = [
  {
    value: "Water is actively leaking",
    title: "Water is actively leaking",
    description: "Needs inspection ASAP",
    icon: "damage-type/leak-2",
  },
  {
    value: "Ceiling stain or moisture",
    title: "Ceiling stain or moisture",
    description: "Monitor and assess damage",
    icon: "damage-type/moisture",
  },
  {
    value: "Visible damage outside",
    title: "Visible damage outside",
    description: "Safe but needs attention",
    icon: "damage-type/damage-visible",
  },
  {
    value: "Not urgent, just checking",
    title: "Not urgent, just checking",
    description: "Routine inspection",
    icon: "status/not-sure",
  },
];

export const roofAgeOptions: IntakeOption[] = [
  {
    value: "Less than 10 years",
    title: "Less than 10 years",
    description: "Generally in good shape",
    icon: "roof-age/under-10-years",
  },
  {
    value: "10–20 years",
    title: "10–20 years",
    description: "Mid-life — worth inspecting",
    icon: "roof-age/10-20-years",
  },
  {
    value: "20+ years",
    title: "20+ years",
    description: "Likely needs closer attention",
    icon: "roof-age/20-plus-years",
  },
  {
    value: "Not sure",
    title: "Not sure",
    description: "We'll evaluate during inspection",
    icon: "status/not-sure",
  },
];

export const priorRepairOptions: IntakeOption[] = [
  {
    value: "Yes",
    title: "Yes",
    description: "Generally in good shape",
    icon: "status/yes",
  },
  {
    value: "No",
    title: "No",
    description: "Mid-life — worth inspecting",
    icon: "status/no",
  },
  {
    value: "Not sure",
    title: "Not sure",
    description: "Likely needs closer attention",
    icon: "status/not-sure",
  },
];

export const insuranceOptions: IntakeOption[] = [
  {
    value: "Already filed a claim",
    title: "Already filed a claim",
    description: "Claim number or adjuster assigned",
    icon: "status/filed",
  },
  {
    value: "Planning to file",
    title: "Planning to file",
    description: "Want to file after inspection",
    icon: "status/planning-file",
  },
  {
    value: "Not sure",
    title: "Not sure",
    description: "Need guidance on the process",
    icon: "status/not-sure",
  },
  {
    value: "No insurance claim",
    title: "No insurance claim",
    description: "Paying out of pocket",
    icon: "status/no-claim",
  },
];

export const budgetOptions: IntakeOption[] = [
  {
    value: "Under $1,000",
    title: "Under $1,000",
    description: "Minor repair or patch",
    icon: "price-ranges/under-1000",
  },
  {
    value: "$1,000–$5,000",
    title: "$1,000–$5,000",
    description: "Moderate repair work",
    icon: "price-ranges/1000-5000",
  },
  {
    value: "$5,000–$15,000",
    title: "$5,000–$15,000",
    description: "Significant repair or partial replace",
    icon: "price-ranges/5000-15000",
  },
  {
    value: "$15,000+",
    title: "$15,000+",
    description: "Full roof replacement",
    icon: "price-ranges/15000-plus",
  },
  {
    value: "Not sure",
    title: "Not sure",
    description: "We'll assess and advise honestly",
    icon: "status/not-sure",
  },
];

export const contactFields: IntakeContactField[] = [
  {
    field: "name",
    label: "YOUR NAME",
    placeholder: "Jane Smith",
    icon: "contact/person",
    required: true,
  },
  {
    field: "phone",
    label: "PHONE NUMBER",
    placeholder: "(555) 000-0000",
    icon: "contact/phone",
    required: true,
    type: "tel",
    inputMode: "tel",
  },
  {
    field: "address",
    label: "ADDRESS",
    placeholder: "123 Main St, City, ST",
    icon: "contact/location",
    required: true,
  },
  {
    field: "email",
    label: "EMAIL (OPTIONAL)",
    placeholder: "jane@email.com",
    icon: "contact/email",
    type: "email",
    inputMode: "email",
  },
];

export const intakeSteps: IntakeStepConfig[] = [
  {
    id: "issue",
    path: "/step-1-issue",
    title: "What happened?",
    subtitle: "Select the option that best describes your situation.",
    field: "issue",
    options: issueOptions,
    nextPath: "/step-2-urgency",
  },
  {
    id: "urgency",
    path: "/step-2-urgency",
    title: "How urgent is it?",
    subtitle: "This helps us prioritize your request.",
    field: "urgency",
    options: urgencyOptions,
    nextPath: "/step-3-roof-age",
  },
  {
    id: "roof-age",
    path: "/step-3-roof-age",
    title: "How old is your roof?",
    subtitle: "This helps us assess potential wear and storm vulnerability.",
    field: "roofAge",
    options: roofAgeOptions,
    nextPath: "/step-4-prior-repairs",
  },
  {
    id: "prior-repairs",
    path: "/step-4-prior-repairs",
    title: "Prior roof repairs?",
    subtitle: "Has your roof had prior repairs?",
    field: "priorRepairs",
    options: priorRepairOptions,
    nextPath: "/step-5-insurance",
  },
  {
    id: "insurance",
    path: "/step-5-insurance",
    title: "Insurance claim?",
    subtitle: "Have you started your claim yet? We work with all major insurance carriers.",
    field: "insuranceStatus",
    options: insuranceOptions,
    nextPath: "/step-6-budget",
  },
  {
    id: "budget",
    path: "/step-6-budget",
    title: "What's your budget?",
    subtitle: "The range is just an estimate to help us give you an honest quote.",
    field: "budget",
    options: budgetOptions,
    nextPath: "/step-7-photos",
  },
  {
    id: "photos",
    path: "/step-7-photos",
    title: "Upload Roof Photos",
    subtitle: "The range is just an estimate to help us give you an honest quote.",
    nextLabel: "Submit Roof Check →",
    nextPath: "/step-8-anything-else",
    optional: true,
    skipPath: "/step-8-anything-else",
  },
  {
    id: "anything-else",
    path: "/step-8-anything-else",
    title: "Anything else?",
    subtitle: "Optional details that may help us better understand the issue before follow-up.",
    field: "anythingElse",
    nextPath: "/contact",
    optional: true,
    skipPath: "/contact",
  },
  {
    id: "contact",
    path: "/contact",
    title: "How to follow up?",
    subtitle: "Your info is private and will only be used to help us contact you.",
    nextPath: "/submitting",
    nextLabel: "Submit Roof Check →",
    helper: {
      variant: "info",
      content:
        "Your information is private. Henry will only contact you about this Roof Check.",
    },
  },
];

export function getIntakeStepByPath(path: string): IntakeStepConfig | undefined {
  return intakeSteps.find((s) => s.path === path);
}

export function getIntakeStepById(id: IntakeStepId): IntakeStepConfig | undefined {
  return intakeSteps.find((s) => s.id === id);
}
