/** Session key — set before navigating into `/contractor/*` from outside the portal. */
export const CONTRACTOR_PORTAL_ENTRY_KEY = "amc-contractor-portal-entry";

export type ContractorPortalEntrySource = "landing" | "demo";

export function markContractorPortalEntry(source: ContractorPortalEntrySource): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CONTRACTOR_PORTAL_ENTRY_KEY, source);
}

export function peekContractorPortalEntry(): ContractorPortalEntrySource | null {
  if (typeof window === "undefined") return null;
  const value = sessionStorage.getItem(CONTRACTOR_PORTAL_ENTRY_KEY);
  if (value === "landing" || value === "demo") return value;
  return null;
}

export function consumeContractorPortalEntry(): ContractorPortalEntrySource | null {
  const value = peekContractorPortalEntry();
  if (value) sessionStorage.removeItem(CONTRACTOR_PORTAL_ENTRY_KEY);
  return value;
}
