export function getUrgencyScore(data: { urgency?: string }) {
  if (data.urgency === "Water is actively leaking") return "high";
  if (data.urgency === "Ceiling stain or moisture") return "medium";
  return "low";
}

