import { ContractorPageTransition } from "@/components/layout/ContractorPageTransition";
import { ContractorTransitionProvider } from "@/components/layout/ContractorTransitionProvider";

export default function ContractorLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContractorTransitionProvider>
      <ContractorPageTransition>{children}</ContractorPageTransition>
    </ContractorTransitionProvider>
  );
}
