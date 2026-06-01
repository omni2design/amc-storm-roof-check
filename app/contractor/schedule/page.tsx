import { ContractorCalendarEventCard } from "@/components/product/contractor/ContractorCalendarEventCard";
import { ContractorFreeSlotIndicator } from "@/components/product/contractor/ContractorFreeSlotIndicator";
import {
  ScheduleAgendaDateHeading,
  ScheduleAgendaSectionHeader,
} from "@/components/product/contractor/ScheduleAgendaLayout";
import { CONTRACTOR_ROUTES } from "@/lib/contractor/routes";

/** 06.01 — Calendar View (Schedule) — Today */
export default function ContractorSchedulePage() {
  return (
    <>
      <ScheduleAgendaDateHeading>Wednesday, May 27</ScheduleAgendaDateHeading>

      <ScheduleAgendaSectionHeader label="Morning" jobCount="2 jobs" />

      <ContractorCalendarEventCard
        time="10:00 AM"
        duration="45 min"
        name="Sarah Mitchell"
        jobType="Roof Inspection"
        location="Lewes, DE"
        status="critical"
        href={CONTRACTOR_ROUTES.leadDetail("lead-001")}
      />

      <ScheduleAgendaSectionHeader label="Afternoon" jobCount="1 job" className="pt-2" />

      <ContractorFreeSlotIndicator time="12:00 – 1:00 PM — Free slot" />

      <ContractorCalendarEventCard
        time="1:00 PM"
        duration="45 min"
        name="James Torres"
        jobType="Storm Assessment"
        location="Rehoboth Beach, DE"
        status="high"
        href={CONTRACTOR_ROUTES.leadDetail("lead-002")}
      />

      <ContractorFreeSlotIndicator time="3:00 – 4:00 PM — Free slot" />

      <ContractorCalendarEventCard
        time="4:00 PM"
        duration="45 min"
        name="Robert Kim"
        jobType="Follow-up Inspection"
        location="Millsboro, DE"
        status="scheduled"
        href={CONTRACTOR_ROUTES.leadDetail("lead-004")}
      />

      <ScheduleAgendaSectionHeader label="Upcoming" jobCount="3 jobs" className="pt-2" />

      <ContractorCalendarEventCard
        time="9:00 AM"
        name="Mike Henderson"
        jobType="Emergency Inspection"
        status="confirmed"
      />
    </>
  );
}
