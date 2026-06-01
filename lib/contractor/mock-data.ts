import type { ScheduleJobStatus } from "./schedule-types";
import type {
  BusinessHoursDay,
  CalendarEventVariant,
  LeadIntakeSummary,
  LeadReportedIssueOverlay,
  LeadWorkflowStatus,
  PhotoAiObservation,
  PipelineStageId,
  PhotoAnnotation,
  ProfileQuickAction,
} from "./types";

export type MockLead = {
  id: string;
  name: string;
  issue: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  submittedAt: string;
  submittedLabel: string;
  status: LeadWorkflowStatus;
  statusLabel: string;
  urgencyLabel: string;
  photoCount: number;
  insurance: string;
  budget: string;
  unread?: boolean;
  pipelineStage: PipelineStageId;
  aiInsight: string;
  recommendation: string;
  recommendationRationale: string;
  notes: string;
  photos: MockLeadPhoto[];
  /** Lead detail hero subtitle, e.g. `Submitted 2 days ago · Emergency` */
  detailSubtitle?: string;
  /** Red alert strip message on lead detail */
  alertMessage?: string;
  /** Pill label for insurance on detail */
  insurancePill?: string;
  /** Pill label for budget on detail, e.g. `~$4,200` */
  budgetPill?: string;
  intake?: LeadIntakeSummary;
  aiConfidence?: string;
  aiRecommendedAction?: string;
  /** Photo viewer overlay + shared AI chips (Figma 04.01). */
  photoViewer?: {
    reportedIssue: LeadReportedIssueOverlay;
    /** Lead-wide fallback when a photo has no `aiObservations`. */
    aiObservations?: PhotoAiObservation[];
  };
};

export type MockLeadPhoto = {
  id: string;
  src: string;
  alt: string;
  label: string;
  description: string;
  annotations: PhotoAnnotation[];
  /** Primary hotspot label shown on the main image. */
  primaryAnnotation?: PhotoAnnotation;
  captureLocation?: string;
  captureDate?: string;
  inspector?: string;
  /** Per-photo overlay on the main image (falls back to lead `photoViewer.reportedIssue`). */
  reportedIssue?: LeadReportedIssueOverlay;
  /** Per-photo AI chips in the bottom panel (falls back to lead `photoViewer.aiObservations`). */
  aiObservations?: PhotoAiObservation[];
};

export type MockCalendarEvent = {
  id: string;
  leadId?: string;
  title: string;
  time: string;
  date: string;
  location: string;
  variant: CalendarEventVariant;
};

export const MOCK_PIPELINE_STAGES = [
  { id: "new" as const, label: "New lead" },
  { id: "contacted" as const, label: "Contacted" },
  { id: "inspection" as const, label: "Inspection scheduled" },
  { id: "estimate" as const, label: "Estimate sent" },
  { id: "won" as const, label: "Won" },
  { id: "lost" as const, label: "Lost" },
];

export const MOCK_LEADS: MockLead[] = [
  {
    id: "lead-001",
    name: "Sarah Mitchell",
    issue: "Leak inside home",
    location: "Dallas, TX",
    address: "4821 Cedar Ridge Dr, Dallas, TX 75209",
    phone: "(214) 555-0198",
    email: "sarah.mitchell@email.com",
    submittedAt: "2 min ago",
    submittedLabel: "Today · 9:14 AM",
    status: "critical",
    statusLabel: "Critical",
    urgencyLabel: "Critical — active leak",
    detailSubtitle: "Submitted 2 days ago · Emergency",
    alertMessage: "Missing 7 shingles — storm damage visible",
    photoCount: 4,
    insurance: "Yes — State Farm",
    insurancePill: "Insurance",
    budget: "$3K – $8K",
    budgetPill: "~$4,200",
    unread: true,
    pipelineStage: "new",
    intake: {
      dateSubmitted: "May 15, 2026",
      damageType: "Hail / Wind",
      priority: "High",
      intakeStatus: "Pending",
    },
    aiInsight:
      "Likely storm-related leak with active interior moisture. Homeowner appears high-intent based on urgency, insurance status, and uploaded photos.",
    aiConfidence: "High Confidence",
    aiRecommendedAction: "Book same-day inspection.",
    recommendation:
      "Schedule follow-up inspection within 48 hours to document additional storm damage before filing claim.",
    recommendationRationale: "Active leak increases interior damage risk during the next rain event.",
    notes: "",
    photoViewer: {
      reportedIssue: {
        eyebrow: "REPORTED ISSUE",
        title: "Leak inside home — Living room ceiling",
        subtitle: "Submitted by Sarah Mitchell",
        severityLabel: "Critical",
      },
    },
    photos: [
      {
        id: "photo-1",
        src: "/images/contractor/leads/lead-001/photo-1.png",
        alt: "Roof ridge with missing shingle tabs and inspection chalk markings",
        label: "Ridge — missing tabs",
        description:
          "Upper ridge shows multiple missing shingle tabs with exposed underlayment. Chalk markings and measurements document the wind-damage area for replacement.",
        captureLocation: "Roof / Ridge",
        captureDate: "May 24, 2026",
        inspector: "J. Martinez",
        reportedIssue: {
          eyebrow: "WIND DAMAGE",
          title: "Missing shingle tabs at main ridge",
          subtitle: "Inspection markings · measurements on site",
          severityLabel: "Critical",
        },
        aiObservations: [
          { id: "obs-1a", label: "Missing shingle tabs", state: "visible" },
          { id: "obs-1b", label: "Exposed underlayment at ridge", state: "visible" },
          { id: "obs-1c", label: "Full ridge replacement likely", state: "needsReview" },
        ],
        annotations: [
          { id: "a1", x: 26, y: 50, label: "Missing tabs" },
          { id: "a2", x: 62, y: 35, label: "Chalk marks" },
        ],
        primaryAnnotation: { id: "a1", x: 26, y: 50, label: "Missing tabs" },
      },
      {
        id: "photo-2",
        src: "/images/contractor/leads/lead-001/photo-2.png",
        alt: "Hand lifting a loose asphalt shingle tab showing failed sealant",
        label: "Lifted shingle tab",
        description:
          "Shingle tab lifts freely from the course below, indicating sealant strip failure. Area is vulnerable to wind uplift and water intrusion until resealed or replaced.",
        captureLocation: "Roof / Sec A",
        captureDate: "May 24, 2026",
        inspector: "J. Martinez",
        reportedIssue: {
          eyebrow: "ROOF INSPECTION",
          title: "Lifted shingle tab — sealant failure",
          subtitle: "Field check · Sec A",
          severityLabel: "Critical",
        },
        aiObservations: [
          { id: "obs-2a", label: "Sealant strip failure visible", state: "visible" },
          { id: "obs-2b", label: "Tab lifts easily by hand", state: "visible" },
          { id: "obs-2c", label: "Wind uplift risk — needs review", state: "needsReview" },
        ],
        annotations: [{ id: "a3", x: 58, y: 38, label: "Lifting Shingles" }],
        primaryAnnotation: { id: "a3", x: 58, y: 38, label: "Lifting Shingles" },
      },
      {
        id: "photo-3",
        src: "/images/contractor/leads/lead-001/photo-3.png",
        alt: "Several asphalt shingles lifted and unsealed along the roof",
        label: "Wind-lifted shingles",
        description:
          "A run of shingles along the upper field is curled and unsealed from wind uplift. Granule loss and weathering are visible across the surrounding area.",
        captureLocation: "Roof / Upper field",
        captureDate: "May 24, 2026",
        inspector: "J. Martinez",
        reportedIssue: {
          eyebrow: "WIND DAMAGE",
          title: "Multiple lifted shingles along ridge line",
          subtitle: "Unsealed courses · granule loss noted",
          severityLabel: "Critical",
        },
        aiObservations: [
          { id: "obs-3a", label: "Multiple shingles lifted", state: "visible" },
          { id: "obs-3b", label: "Granule loss visible", state: "visible" },
          { id: "obs-3c", label: "Possible wind damage — needs review", state: "needsReview" },
        ],
        annotations: [{ id: "a4", x: 48, y: 36, label: "Lifted course" }],
        primaryAnnotation: { id: "a4", x: 48, y: 36, label: "Lifted course" },
      },
      {
        id: "photo-4",
        src: "/images/contractor/leads/lead-001/photo-4.png",
        alt: "Torn and lifted shingle exposing underlayment on the roof",
        label: "Torn shingle",
        description:
          "A single shingle tab is torn and partially detached, with the underlayment exposed beneath. Immediate repair is recommended to prevent water entry at this point.",
        captureLocation: "Roof / Sec A",
        captureDate: "May 24, 2026",
        inspector: "J. Martinez",
        reportedIssue: {
          eyebrow: "ACTIVE DAMAGE",
          title: "Torn shingle — underlayment exposed",
          subtitle: "Field documentation · repair priority",
          severityLabel: "Critical",
        },
        aiObservations: [
          { id: "obs-4a", label: "Torn shingle tab visible", state: "visible" },
          { id: "obs-4b", label: "Underlayment exposed", state: "visible" },
          { id: "obs-4c", label: "Leak path risk — needs review", state: "needsReview" },
        ],
        annotations: [{ id: "a5", x: 44, y: 52, label: "Torn tab" }],
        primaryAnnotation: { id: "a5", x: 44, y: 52, label: "Torn tab" },
      },
    ],
  },
  {
    id: "lead-002",
    name: "James Torres",
    issue: "Storm / weather damage",
    location: "Plano, TX",
    address: "903 Willow Creek Ln, Plano, TX 75024",
    phone: "(972) 555-0142",
    email: "james.torres@email.com",
    submittedAt: "1 hr ago",
    submittedLabel: "Today · 6:02 AM",
    status: "high",
    statusLabel: "High Priority",
    urgencyLabel: "High — storm damage visible",
    photoCount: 6,
    insurance: "Yes — Nationwide",
    budget: "$5K – $12K",
    unread: true,
    pipelineStage: "contacted",
    aiInsight: "Damage appears localized to the southwest slope. No active leak reported.",
    recommendation: "Confirm inspection window and review insurance filing timeline.",
    recommendationRationale: "Homeowner indicated they plan to file a claim this week.",
    notes: "Left voicemail — awaiting callback.",
    photos: [
      {
        id: "photo-1",
        src: "/images/figma/landing/hero-roof-opt.jpg",
        alt: "Missing shingles on southwest slope",
        label: "Missing shingles",
        description: "Several tabs missing along the southwest slope edge.",
        annotations: [{ id: "a1", x: 38, y: 52, label: "Missing tabs" }],
      },
      {
        id: "photo-2",
        src: "/images/figma/landing/hero-roof-opt.jpg",
        alt: "Shingle debris in yard",
        label: "Debris",
        description: "Shingle fragments collected from yard after storm.",
        annotations: [],
      },
    ],
  },
  {
    id: "lead-003",
    name: "Maria Lowe",
    issue: "Missing shingles",
    location: "Frisco, TX",
    address: "1188 Oak Hollow Ct, Frisco, TX 75034",
    phone: "(469) 555-0177",
    email: "maria.lowe@email.com",
    submittedAt: "3 hrs ago",
    submittedLabel: "Yesterday · 4:30 PM",
    status: "needsInspection",
    statusLabel: "Needs Inspection",
    urgencyLabel: "Medium — assessment requested",
    photoCount: 2,
    insurance: "No",
    budget: "$1K – $3K",
    unread: true,
    pipelineStage: "inspection",
    aiInsight: "Granule bruising visible on multiple slopes. Inspection already on calendar.",
    recommendation: "Bring hail gauge and document all slopes during tomorrow's visit.",
    recommendationRationale: "Insurance adjuster may request dated photo evidence.",
    notes: "Inspection confirmed for tomorrow at 10:00 AM.",
    photos: [
      {
        id: "photo-1",
        src: "/images/figma/landing/hero-roof-opt.jpg",
        alt: "Hail bruising on shingles",
        label: "Hail bruising",
        description: "Circular impact marks with granule displacement.",
        annotations: [{ id: "a1", x: 50, y: 40, label: "Hail bruise" }],
      },
      {
        id: "photo-2",
        src: "/images/figma/landing/hero-roof-opt.jpg",
        alt: "Roof overview",
        label: "Overview",
        description: "Full roof overview from rear elevation.",
        annotations: [],
      },
      {
        id: "photo-3",
        src: "/images/figma/landing/hero-roof-opt.jpg",
        alt: "Gutter damage",
        label: "Gutter",
        description: "Dented gutter section on east side.",
        annotations: [],
      },
      {
        id: "photo-4",
        src: "/images/figma/landing/hero-roof-opt.jpg",
        alt: "Soft metal damage",
        label: "Soft metal",
        description: "Dented roof vent consistent with hail.",
        annotations: [],
      },
    ],
  },
  {
    id: "lead-004",
    name: "Robert Kim",
    issue: "Tree / branch damage",
    location: "McKinney, TX",
    address: "2201 Preston Rd, McKinney, TX 75070",
    phone: "(214) 555-0133",
    email: "robert.kim@email.com",
    submittedAt: "Yesterday",
    submittedLabel: "May 29 · 11:20 AM",
    status: "scheduled",
    statusLabel: "Scheduled",
    urgencyLabel: "Scheduled inspection",
    photoCount: 5,
    insurance: "Yes — Allstate",
    budget: "$4K – $10K",
    unread: true,
    pipelineStage: "estimate",
    aiInsight: "No urgent damage detected in submitted photos. Good candidate for standard inspection.",
    recommendation: "Send estimate follow-up after completed inspection notes are added.",
    recommendationRationale: "Homeowner requested budget guidance before proceeding.",
    notes: "Estimate draft in progress.",
    photos: [
      {
        id: "photo-1",
        src: "/images/figma/landing/hero-roof-opt.jpg",
        alt: "Roof overview",
        label: "Overview",
        description: "General roof condition photo from street view.",
        annotations: [],
      },
    ],
  },
  {
    id: "lead-005",
    name: "Alex Chen",
    issue: "Roof inspection needed",
    location: "Irving, TX",
    address: "7742 Crestwood Blvd, Irving, TX 75063",
    phone: "(972) 555-0188",
    email: "alex.chen@email.com",
    submittedAt: "Just now",
    submittedLabel: "Today · 9:16 AM",
    status: "needsInspection",
    statusLabel: "Needs Inspection",
    urgencyLabel: "Medium — needs inspection",
    photoCount: 0,
    insurance: "—",
    budget: "—",
    unread: true,
    pipelineStage: "inspection",
    aiInsight: "Inspection required to confirm scope of damage and document slopes.",
    recommendation: "Schedule an inspection and capture photos of all elevations.",
    recommendationRationale: "A full slope photo set helps support any insurance claim paperwork.",
    notes: "",
    photos: [],
  },
  {
    id: "lead-006",
    name: "Linda Park",
    issue: "Storm damage / roof peak",
    location: "Arlington, TX",
    address: "905 Pine Meadow Dr, Arlington, TX 76012",
    phone: "(817) 555-0122",
    email: "linda.park@email.com",
    submittedAt: "Wed May 14 · 2 PM",
    submittedLabel: "May 14 · 2:00 PM",
    status: "scheduled",
    statusLabel: "Scheduled",
    urgencyLabel: "Scheduled inspection",
    photoCount: 0,
    insurance: "—",
    budget: "—",
    unread: true,
    pipelineStage: "inspection",
    aiInsight: "Scheduled appointment is set; confirm access notes day-of.",
    recommendation: "Confirm appointment and bring ladder + chalk for marking hits.",
    recommendationRationale: "Peak damage often requires close-up documentation.",
    notes: "Appointment booked for May 14 at 2 PM.",
    photos: [],
  },
];

export const MOCK_PIPELINE_COUNTS: Partial<Record<PipelineStageId, number>> = {
  new: 1,
  contacted: 1,
  inspection: 1,
  estimate: 1,
  won: 0,
  lost: 0,
};

export const MOCK_CALENDAR_EVENTS: MockCalendarEvent[] = [
  {
    id: "evt-1",
    leadId: "lead-003",
    title: "Maria Lowe — Inspection",
    time: "10:00 AM",
    date: "2026-05-31",
    location: "Frisco, TX",
    variant: "inspection",
  },
  {
    id: "evt-2",
    leadId: "lead-001",
    title: "Sarah Mitchell — Emergency inspection",
    time: "2:30 PM",
    date: "2026-05-31",
    location: "Dallas, TX",
    variant: "urgent",
  },
  {
    id: "evt-3",
    leadId: "lead-002",
    title: "James Torres — Follow-up call",
    time: "4:00 PM",
    date: "2026-05-31",
    location: "Plano, TX",
    variant: "default",
  },
  {
    id: "evt-4",
    leadId: "lead-004",
    title: "Robert Kim — Estimate review",
    time: "11:00 AM",
    date: "2026-06-01",
    location: "McKinney, TX",
    variant: "default",
  },
];

/** Week strip days for schedule Week view (Figma 08.03 — Mon 25 – Sun 31). */
export type MockWeekScheduleEvent = {
  id: string;
  leadId?: string;
  time: string;
  duration: string;
  name: string;
  jobType: string;
  status: ScheduleJobStatus;
};

export const MOCK_WEEK_DAYS = [
  {
    id: "2026-05-25",
    date: 25,
    label: "Mon",
    eventCount: 2,
    dateHeading: "Monday, May 25",
  },
  {
    id: "2026-05-26",
    date: 26,
    label: "Tue",
    eventCount: 3,
    dateHeading: "Tuesday, May 26",
  },
  {
    id: "2026-05-27",
    date: 27,
    label: "Wed",
    isToday: true,
    eventCount: 1,
    dateHeading: "Wednesday, May 27",
  },
  {
    id: "2026-05-28",
    date: 28,
    label: "Thu",
    eventCount: 4,
    dateHeading: "Thursday, May 28",
  },
  {
    id: "2026-05-29",
    date: 29,
    label: "Fri",
    isSelected: true,
    eventCount: 2,
    dateHeading: "Friday, May 29",
  },
  {
    id: "2026-05-30",
    date: 30,
    label: "Sat",
    eventCount: 3,
    dateHeading: "Saturday, May 30",
  },
  {
    id: "2026-05-31",
    date: 31,
    label: "Sun",
    eventCount: 1,
    dateHeading: "Sunday, May 31",
  },
];

export const MOCK_WEEK_DEFAULT_DAY_ID = "2026-05-29";

/** Jobs shown under the selected day on the Week view agenda. */
export const MOCK_WEEK_DAY_EVENTS: Record<string, MockWeekScheduleEvent[]> = {
  "2026-05-29": [
    {
      id: "wk-1",
      time: "10:00 AM",
      duration: "45 min",
      name: "Codey Miller",
      jobType: "Emergency Inspection",
      status: "high",
    },
    {
      id: "wk-2",
      leadId: "lead-002",
      time: "10:00 AM",
      duration: "45 min",
      name: "James Torres",
      jobType: "Storm Assessment",
      status: "scheduled",
    },
    {
      id: "wk-3",
      time: "10:00 AM",
      duration: "45 min",
      name: "Cherry Far",
      jobType: "Interior Inspection",
      status: "scheduled",
    },
  ],
};

/** Figma 09.01 — business hours card */
export const MOCK_BUSINESS_HOURS: BusinessHoursDay[] = [
  { day: "Monday", open: "8:00 AM", close: "6:00 PM" },
  { day: "Tuesday", open: "8:00 AM", close: "6:00 PM" },
  { day: "Wednesday", open: "8:00 AM", close: "6:00 PM" },
  { day: "Thursday", open: "8:00 AM", close: "6:00 PM" },
  { day: "Friday", open: "8:00 AM", close: "6:00 PM" },
  { day: "Saturday", open: "9:00 AM", close: "2:00 PM" },
  { day: "Sunday", closed: true, open: "", close: "" },
];

export const MOCK_PROFILE = {
  name: "Henry Smith",
  roleLine: "Owner · All Might Contracting",
  location: "Sussex County, DE",
  stats: [
    { value: 14, label: "Leads", subLabel: "This Week" },
    { value: 8, label: "Completed" },
    { value: "4.9", label: "Avg Rating" },
  ],
} as const;

/** Figma 09.01 — Quick Actions list */
export const MOCK_PROFILE_QUICK_ACTIONS: ProfileQuickAction[] = [
  {
    id: "help",
    icon: "help",
    label: "Help & Support",
    description: "FAQs and contact",
  },
  {
    id: "team",
    icon: "team",
    label: "Team Members",
    description: "Manage your crew",
  },
  {
    id: "business-settings",
    icon: "settings",
    label: "Business Settings",
    description: "Company profile",
  },
  {
    id: "notifications",
    icon: "notifications",
    label: "Notifications",
    description: "Alerts and preferences",
  },
  {
    id: "billing",
    icon: "billing",
    label: "Billing",
    description: "Plans and invoices",
  },
];

export function getLeadById(leadId: string): MockLead | undefined {
  return MOCK_LEADS.find((lead) => lead.id === leadId);
}

export function getLeadPhoto(leadId: string, photoId: string): MockLeadPhoto | undefined {
  return getLeadById(leadId)?.photos.find((photo) => photo.id === photoId);
}

export function getEventsForDate(date: string): MockCalendarEvent[] {
  return MOCK_CALENDAR_EVENTS.filter((event) => event.date === date);
}

export function getTomorrowEvents(): MockCalendarEvent[] {
  return getEventsForDate("2026-06-01");
}

export function getTodayEvents(): MockCalendarEvent[] {
  return getEventsForDate("2026-05-31");
}
