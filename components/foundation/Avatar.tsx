import { cn } from "@/lib/utils/cn";
import { avatarVariants, type AvatarVariantProps } from "@/lib/variants/avatar";

export type AvatarProps = React.HTMLAttributes<HTMLSpanElement> &
  AvatarVariantProps & {
    name: string;
    src?: string;
    alt?: string;
  };

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
}

/** Figma `Avatar` — image or initials fallback. */
export function Avatar({ className, size, name, src, alt, ...props }: AvatarProps) {
  const initials = initialsFromName(name);
  const label = alt ?? name;

  return (
    <span className={cn(avatarVariants({ size }), className)} role="img" aria-label={label} {...props}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="size-full object-cover" />
      ) : (
        <span aria-hidden>{initials}</span>
      )}
    </span>
  );
}
