"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { NavigationNavItem } from "@/components/foundation/NavigationNavItem";
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
  icon: "dashboard" | "pipeline" | "calendar" | "profile";
  href: string;
};

const NAV_ITEMS: NavConfig[] = [
  { id: "leads", label: "Dashboard", icon: "dashboard", href: "/contractor/leads" },
  { id: "pipeline", label: "Pipeline", icon: "pipeline", href: "/contractor/pipeline" },
  { id: "calendar", label: "Calendar", icon: "calendar", href: "/contractor/schedule" },
  { id: "profile", label: "Profile", icon: "profile", href: "/contractor/profile" },
];

/**
 * Figma `Contractor/Bottom Nav` (760:7423)
 * https://www.figma.com/design/DnlD52iTlNrh8rZj1rMY1W/AMC-Storm-Roof-Check?node-id=760-7423
 */
export function ContractorBottomNav({ active, className, onNavigate, hrefs }: ContractorBottomNavProps) {
  return (
    <nav
      aria-label="Contractor portal"
      className={cn(
        "contractor-fixed-bottom flex h-[90px] items-center justify-between border-t border-contractor-nav-border bg-contractor-nav-bg py-5",
        className,
      )}
    >
      <ul className="grid w-full grid-cols-4">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          const href = hrefs?.[item.id] ?? item.href;

          return (
            <li key={item.id} className="min-w-0">
              <Link
                href={href}
                onClick={onNavigate ? () => onNavigate(item.id) : undefined}
                aria-current={isActive ? "page" : undefined}
                className="flex min-w-0 flex-col items-center justify-center focus-visible:focus-ring"
              >
                <NavigationNavItem
                  icon={item.icon}
                  labelText={item.label}
                  label="on"
                  size="md"
                  state="default"
                  style={isActive ? "filled" : "standard"}
                  className="w-full"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
