import { FlowPageTransition } from "@/components/layout/FlowPageTransition";
import { FlowTransitionProvider } from "@/components/layout/FlowTransitionProvider";

export default function FlowLayout({ children }: { children: React.ReactNode }) {
  return (
    <FlowTransitionProvider>
      <FlowPageTransition>{children}</FlowPageTransition>
    </FlowTransitionProvider>
  );
}
