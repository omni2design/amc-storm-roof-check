import { redirect } from "next/navigation";
import { CONTRACTOR_ROUTES } from "@/lib/contractor/routes";

export default function LegacyLeadsPage() {
  redirect(CONTRACTOR_ROUTES.leads);
}
