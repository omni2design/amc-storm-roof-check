"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FlowShell } from "@/components/layout/FlowShell";
import { LoadingLogo } from "@/components/brand/LoadingLogo";

export default function SubmittingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => router.replace("/result"), 2800);
    return () => window.clearTimeout(timer);
  }, [router]);

  return (
    <FlowShell maxWidth="mobile" className="bg-background-default">
      <div
        className="flow-page-body flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="shrink-0">
          <LoadingLogo />
        </div>
        <div className="flex max-w-[16.1875rem] flex-col gap-2">
          <h1 className="text-lg-leading font-semibold text-foreground-primary">Submitting your Roof Check…</h1>
          <p className="text-sm-leading text-foreground-secondary">This will only take a moment.</p>
        </div>
        <Image
          src="/brand/loading-progress-dots.svg"
          alt=""
          width={40}
          height={8}
          className="h-2 w-10"
          aria-hidden
        />
      </div>
    </FlowShell>
  );
}
