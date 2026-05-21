import Link from "next/link";
import { AmcLogo } from "@/components/brand/AmcLogo";
import { buttonVariants } from "@/lib/variants/button";
import { cn } from "@/lib/utils/cn";

/**
 * Contractor Login — placeholder screen.
 * Architecture is intentionally minimal: no auth logic yet.
 * Connect to Contractor Portal screens (Figma: "04.2 High-Fidelity UI Final_Contractor")
 * and real auth once the portal is ready.
 */
export default function ContractorLoginPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background-subtle px-6 py-12">
      <div className="flow-mobile-width mx-auto flex w-full flex-col gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center gap-3">
          <AmcLogo variant="landing-cover" />
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-lg font-semibold text-foreground-primary">ALL MIGHT CONTRACTING</p>
            <p className="text-sm text-foreground-secondary">Contractor Portal</p>
          </div>
        </div>

        {/* Placeholder card */}
        <div className="flex flex-col gap-6 rounded-2xl bg-surface-card px-6 py-8 shadow-card">
          <div className="flex flex-col gap-1">
            <h1 className="text-title text-foreground-primary">Contractor Login</h1>
            <p className="text-sm text-foreground-secondary">
              Portal access for All Might Contracting team members.
            </p>
          </div>

          {/* Placeholder — replace with real auth form */}
          <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border-default bg-background-subtle px-4 py-6 text-center">
            <p className="text-sm font-medium text-foreground-secondary">Login form coming soon</p>
            <p className="text-xs text-foreground-muted">
              Connect to Figma page "04.2 High-Fidelity UI Final_Contractor" for design specs.
            </p>
          </div>

          <Link
            href="/leads"
            className={cn(buttonVariants({ intent: "navy", size: "lg" }), "w-full")}
          >
            Continue to Lead Inbox →
          </Link>
        </div>

        {/* Back to homeowner landing */}
        <div className="text-center">
          <Link
            href="/landing"
            className="text-sm text-foreground-secondary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:rounded-sm"
          >
            ← Back to homeowner landing
          </Link>
        </div>
      </div>
    </main>
  );
}
