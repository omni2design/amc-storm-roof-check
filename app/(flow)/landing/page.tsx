import Image from "next/image";
import Link from "next/link";
import { AmcLogo } from "@/components/brand/AmcLogo";
import { TrustSignalCard } from "@/components/product/roof-check/TrustSignalCard";
import { buttonVariants } from "@/lib/variants/button";
import { cn } from "@/lib/utils/cn";

export default function LandingPage() {
  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-background-subtle">
      <div className="flow-mobile-width relative mx-auto min-h-dvh w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          {/* Figma BG_RoofingRepairImage — aspect 4032/3024, top -196.61px, bottom 0, left calc(50% - 20px) */}
          <div className="absolute bottom-0 left-[calc(50%-1.25rem)] top-[-12.29rem] aspect-[4032/3024] min-w-full w-auto -translate-x-1/2">
            <Image
              src="/images/figma/landing/hero-roof-opt.jpg"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(max-width: 460px) 100vw, 460px"
            />
          </div>
          <div className="absolute inset-0 bg-button-navy/50" />
        </div>

        <div className="relative z-10 flex min-h-[50rem] flex-col gap-6 px-6 pb-8 pt-[7.5rem]">
          <div className="flex w-full items-start gap-[11px]">
            <AmcLogo variant="landing-cover" className="shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col items-start justify-center self-stretch">
              <p className="w-full text-lg font-semibold leading-7 text-foreground-inverse drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                ALL MIGHT CONTRACTING
              </p>
              <p className="w-full text-base font-medium leading-normal text-foreground-inverse">
                Roofing • Exteriors • Interiors
              </p>
            </div>
          </div>

          <h1 className="text-hero-headline text-foreground-inverse drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <span className="block">Storm Damage?</span>
            <span className="block">Get a Roof Check</span>
            <span className="block">in 60 Seconds</span>
          </h1>
        </div>

        <section className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-8 rounded-t-[2rem] bg-surface-card px-6 py-8 shadow-[0_-4px_4px_rgba(17,24,39,0.1)]">
          <p className="text-center text-base leading-normal text-foreground-brand">
            Upload photos and get honest guidance from All Might Contracting.
          </p>

          <TrustSignalCard />

          <p className="text-center text-sm-leading text-foreground-secondary">
            No pressure. Honest advice from a local expert.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/what-to-expect"
              className={cn(buttonVariants({ intent: "emergency", size: "lg" }), "w-full")}
            >
              Start Roof Check →
            </Link>
            <p className="text-center text-2xs-leading tracking-[0.05px] text-foreground-muted">
              Free · No signup required · Takes about 60 seconds
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
