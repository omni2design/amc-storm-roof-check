"use client";

import { useMemo, useState } from "react";
import { ContractorCalendarEventCard } from "@/components/product/contractor/ContractorCalendarEventCard";
import { ContractorCalendarWeekStrip } from "@/components/product/contractor/ContractorCalendarWeekStrip";
import {
  ScheduleAgendaDateHeading,
  ScheduleAgendaSectionHeader,
} from "@/components/product/contractor/ScheduleAgendaLayout";
import {
  MOCK_WEEK_DAY_EVENTS,
  MOCK_WEEK_DAYS,
  MOCK_WEEK_DEFAULT_DAY_ID,
} from "@/lib/contractor/mock-data";
import { CONTRACTOR_ROUTES } from "@/lib/contractor/routes";

/** 08.03 — Week View (829:8271) */
export default function ContractorScheduleWeekPage() {
  const [selectedDayId, setSelectedDayId] = useState(MOCK_WEEK_DEFAULT_DAY_ID);

  const selectedDay = useMemo(
    () => MOCK_WEEK_DAYS.find((day) => day.id === selectedDayId) ?? MOCK_WEEK_DAYS[4],
    [selectedDayId],
  );

  const events = MOCK_WEEK_DAY_EVENTS[selectedDayId] ?? [];
  const jobCountLabel = events.length === 1 ? "1 job" : `${events.length} jobs`;

  return (
    <>
      <ScheduleAgendaDateHeading>
        {selectedDay.dateHeading ?? `Friday, May ${selectedDay.date}`}
      </ScheduleAgendaDateHeading>

      <ContractorCalendarWeekStrip
        days={[...MOCK_WEEK_DAYS]}
        selectedDayId={selectedDayId}
        onDaySelect={(day) => setSelectedDayId(day.id)}
      />

      <ScheduleAgendaSectionHeader label="Upcoming" jobCount={jobCountLabel} />

      {events.length > 0 ? (
        events.map((event) => (
          <ContractorCalendarEventCard
            key={event.id}
            layout="compact"
            time={event.time}
            duration={event.duration}
            name={event.name}
            jobType={event.jobType}
            status={event.status}
            eta=""
            href={event.leadId ? CONTRACTOR_ROUTES.leadDetail(event.leadId) : undefined}
          />
        ))
      ) : (
        <p className="text-center text-sm text-[#9ca3af]">No jobs scheduled for this day.</p>
      )}
    </>
  );
}
