import { redirect } from "next/navigation";
import { CONTRACTOR_ROUTES } from "@/lib/contractor/routes";

export default function ContractorLoginPage() {
  redirect(CONTRACTOR_ROUTES.demo);
}
