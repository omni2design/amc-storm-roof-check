import { cn } from "@/lib/utils/cn";
import { CardShell } from "@/components/foundation/CardShell";
import { Avatar } from "@/components/foundation/Avatar";
import { MetadataRow } from "@/components/foundation/MetadataRow";
import { Icon } from "@/components/icons/Icon";

export type ContractorProfileSummaryCardProps = {
  name: string;
  role: string;
  company: string;
  phone?: string;
  email?: string;
  avatarSrc?: string;
  className?: string;
};

/** Figma `Contractor Profile Summary Card` — profile hero on settings screen. */
export function ContractorProfileSummaryCard({
  name,
  role,
  company,
  phone,
  email,
  avatarSrc,
  className,
}: ContractorProfileSummaryCardProps) {
  return (
    <CardShell className={cn("flex flex-col gap-4", className)} padding="lg">
      <div className="flex items-center gap-4">
        <Avatar name={name} src={avatarSrc} size="lg" />
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="text-heading text-foreground-primary">{name}</h2>
          <p className="text-sm-leading text-foreground-secondary">{role}</p>
          <p className="text-caption text-foreground-muted">{company}</p>
        </div>
      </div>

      <dl className="grid gap-3 border-t border-contractor-settings-divider pt-4">
        {phone ? (
          <MetadataRow
            label="Phone"
            value={phone}
            icon={<Icon name="contact/phone" mode="subtle" size="sm" />}
          />
        ) : null}
        {email ? (
          <MetadataRow
            label="Email"
            value={email}
            icon={<Icon name="contact/email" mode="subtle" size="sm" />}
          />
        ) : null}
      </dl>
    </CardShell>
  );
}
