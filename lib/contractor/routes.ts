/** Contractor portal route constants — prototype-ready paths. */
export const CONTRACTOR_ROUTES = {
  demo: "/contractor/demo",
  leads: "/contractor/leads",
  leadDetail: (leadId: string) => `/contractor/leads/${leadId}`,
  photoViewer: (leadId: string, photoId: string) => `/contractor/leads/${leadId}/photos/${photoId}`,
  pipeline: "/contractor/pipeline",
  schedule: "/contractor/schedule",
  scheduleTomorrow: "/contractor/schedule/tomorrow",
  scheduleWeek: "/contractor/schedule/week",
  profile: "/contractor/profile",
  login: "/contractor/login",
  landing: "/landing",
} as const;
