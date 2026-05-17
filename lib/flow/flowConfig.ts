/** Progress metadata for mobile intake (9 steps). */
export const flowSteps = [
  { id: "issue", label: "What happened?", path: "/step-1-issue" },
  { id: "urgency", label: "Urgency check", path: "/step-2-urgency" },
  { id: "roof-age", label: "Roof age", path: "/step-3-roof-age" },
  { id: "prior-repairs", label: "Prior repairs", path: "/step-4-prior-repairs" },
  { id: "insurance", label: "Insurance", path: "/step-5-insurance" },
  { id: "budget", label: "Budget", path: "/step-6-budget" },
  { id: "photos", label: "Photos", path: "/step-7-photos" },
  { id: "anything-else", label: "Anything else", path: "/step-8-anything-else" },
  { id: "contact", label: "Contact", path: "/contact" },
] as const;
