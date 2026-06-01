"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { ContractorShell } from "@/components/product/contractor/ContractorShell";
import { ContractorCalendarToggle } from "@/components/product/contractor/ContractorCalendarToggle";
import { ScheduleAgendaContent } from "@/components/product/contractor/ScheduleAgendaLayout";
import { ScheduleViewTransition } from "@/components/product/contractor/ScheduleViewTransition";
import { isScheduleViewSwitch } from "@/lib/contractor/contractor-transition";
import {
  getScheduleViewModeFromPath,
  SCHEDULE_VIEW_HREFS,
} from "@/lib/contractor/schedule-views";
import type { CalendarViewMode } from "@/lib/contractor/types";

export default function ContractorScheduleLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const previousPathRef = useRef(pathname);
  const view = getScheduleViewModeFromPath(pathname);

  const slideSelection = useMemo(
    () => isScheduleViewSwitch(previousPathRef.current, pathname),
    [pathname],
  );

  useEffect(() => {
    previousPathRef.current = pathname;
  }, [pathname]);

  const handleViewChange = (mode: CalendarViewMode) => {
    if (mode === view) return;
    router.push(SCHEDULE_VIEW_HREFS[mode]);
  };

  return (
    <ContractorShell title="Schedule" activeNav="calendar" showScheduleCta className="bg-[#f9fafb]">
      <ScheduleAgendaContent>
        <div className="flex justify-center">
          <ContractorCalendarToggle
            value={view}
            onChange={handleViewChange}
            slideSelection={slideSelection}
          />
        </div>
        <ScheduleViewTransition>{children}</ScheduleViewTransition>
      </ScheduleAgendaContent>
    </ContractorShell>
  );
}
