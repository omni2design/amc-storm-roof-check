import { getScheduleViewIndex } from "@/lib/contractor/contractor-transition";
import { CONTRACTOR_ROUTES } from "@/lib/contractor/routes";
import type { CalendarViewMode } from "@/lib/contractor/types";

export const SCHEDULE_VIEW_HREFS: Record<CalendarViewMode, string> = {
  today: CONTRACTOR_ROUTES.schedule,
  tomorrow: CONTRACTOR_ROUTES.scheduleTomorrow,
  week: CONTRACTOR_ROUTES.scheduleWeek,
};

export function getScheduleViewModeFromPath(pathname: string): CalendarViewMode {
  const index = getScheduleViewIndex(pathname);
  if (index === 1) return "tomorrow";
  if (index === 2) return "week";
  return "today";
}
