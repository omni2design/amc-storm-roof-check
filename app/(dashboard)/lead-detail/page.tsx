import { redirect } from "next/navigation";
import { CONTRACTOR_ROUTES } from "@/lib/contractor/routes";

export default function LegacyLeadDetailPage() {
  redirect(CONTRACTOR_ROUTES.leadDetail("lead-001"));
}
