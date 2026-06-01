import { ContractorCalendarEventCard } from "@/components/product/contractor/ContractorCalendarEventCard";
import { ContractorFreeSlotIndicator } from "@/components/product/contractor/ContractorFreeSlotIndicator";
import {
  ScheduleAgendaDateHeading,
  ScheduleAgendaSectionHeader,
} from "@/components/product/contractor/ScheduleAgendaLayout";
import { CONTRACTOR_ROUTES } from "@/lib/contractor/routes";

/** 07.02 — Tomorrow View (829:8251) */
export default function ContractorScheduleTomorrowPage() {
  return (
    <>
      <ScheduleAgendaDateHeading>Thursday, May 28</ScheduleAgendaDateHeading>

      <ScheduleAgendaSectionHeader label="Morning" jobCount="2 jobs" />

      <ContractorCalendarEventCard
        time="9:00 AM"
        duration="45 min"
        name="Mike Henderson"
        jobType="Emergency Inspection"
        location="Georgetown, DE"
        status="scheduled"
      />

      <ContractorCalendarEventCard
        time="11:30 AM"
        duration="45 min"
        name="Robert Kim"
        jobType="Follow-up Visit"
        location="Millsboro, DE"
        status="high"
        href={CONTRACTOR_ROUTES.leadDetail("lead-004")}
      />

      <ContractorFreeSlotIndicator time="1:30 – 2:30 PM — Free slot" />

      <ScheduleAgendaSectionHeader label="Afternoon" jobCount="1 job" className="pt-2" />

      <ContractorCalendarEventCard
        time="3:00 PM"
        duration="45 min"
        name="Linda Park"
        jobType="Roof Inspection"
        location="Lewes, DE"
        status="scheduled"
        href={CONTRACTOR_ROUTES.leadDetail("lead-006")}
      />
    </>
  );
}
