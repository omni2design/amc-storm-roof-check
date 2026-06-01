"use client";

import { useRouter, usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ContractorShell } from "@/components/product/contractor/ContractorShell";
import { ContractorCalendarToggle } from "@/components/product/contractor/ContractorCalendarToggle";
import { ScheduleAgendaContent } from "@/components/product/contractor/ScheduleAgendaLayout";
import { ScheduleViewTransition } from "@/components/product/contractor/ScheduleViewTransition";
import {
  getScheduleViewModeFromPath,
  SCHEDULE_VIEW_HREFS,
} from "@/lib/contractor/schedule-views";
import type { CalendarViewMode } from "@/lib/contractor/types";

export default function ContractorScheduleLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const view = getScheduleViewModeFromPath(pathname);

  const handleViewChange = (mode: CalendarViewMode) => {
    if (mode === view) return;
    router.push(SCHEDULE_VIEW_HREFS[mode]);
  };

  return (
    <ContractorShell title="Schedule" activeNav="calendar" showScheduleCta className="bg-[#f9fafb]">
      <ScheduleAgendaContent>
        <div className="flex justify-center">
          <ContractorCalendarToggle value={view} onChange={handleViewChange} />
        </div>
        <ScheduleViewTransition>{children}</ScheduleViewTransition>
      </ScheduleAgendaContent>
    </ContractorShell>
  );
}
