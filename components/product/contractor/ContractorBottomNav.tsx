"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { ContractorNavItem } from "@/lib/contractor/types";

export type ContractorBottomNavProps = {
  active: ContractorNavItem;
  className?: string;
  onNavigate?: (item: ContractorNavItem) => void;
  /** Override default hrefs when wiring real routes later. */
  hrefs?: Partial<Record<ContractorNavItem, string>>;
};

type NavConfig = {
  id: ContractorNavItem;
  label: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
};

function NavIcon({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <span
      className={cn(
        "flex size-6 items-center justify-center",
        active ? "text-contractor-nav-active" : "text-contractor-nav-inactive",
      )}
    >
      {children}
    </span>
  );
}

const NAV_ITEMS: NavConfig[] = [
  {
    id: "leads",
    label: "Leads",
    href: "/leads",
    icon: (active) => (
      <NavIcon active={active}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 6h16M4 12h16M4 18h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </NavIcon>
    ),
  },
  {
    id: "pipeline",
    label: "Pipeline",
    href: "/pipeline",
    icon: (active) => (
      <NavIcon active={active}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 18V6M10 18V10M16 18V14M22 18V4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </NavIcon>
    ),
  },
  {
    id: "calendar",
    label: "Calendar",
    href: "/calendar",
    icon: (active) => (
      <NavIcon active={active}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </NavIcon>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    href: "/profile",
    icon: (active) => (
      <NavIcon active={active}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M5 20c0-3.314 3.134-6 7-6s7 2.686 7 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </NavIcon>
    ),
  },
];

/** Figma `Contractor Bottom Nav` — primary portal tab bar. */
export function ContractorBottomNav({ active, className, onNavigate, hrefs }: ContractorBottomNavProps) {
  return (
    <nav
      aria-label="Contractor portal"
      className={cn(
        "contractor-fixed-bottom border-t border-contractor-nav-border bg-contractor-nav-bg",
        className,
      )}
    >
      <ul className="grid grid-cols-4 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          const href = hrefs?.[item.id] ?? item.href;

          return (
            <li key={item.id}>
              <Link
                href={href}
                onClick={onNavigate ? () => onNavigate(item.id) : undefined}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-control px-2 py-1.5 text-caption font-medium motion-safe transition-colors focus-visible:focus-ring",
                  isActive ? "text-contractor-nav-active" : "text-contractor-nav-inactive hover:text-foreground-secondary",
                )}
              >
                {item.icon(isActive)}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
