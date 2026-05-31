import { cn } from "@/lib/utils/cn";
import { cardShellVariants, type CardShellVariantProps } from "@/lib/variants/card-shell";

export type CardShellProps = React.HTMLAttributes<HTMLElement> &
  CardShellVariantProps & {
    as?: "article" | "section" | "div";
  };

/** Figma shared card container — composable shell for product cards. */
export function CardShell({
  className,
  variant,
  padding,
  as: Tag = "article",
  children,
  ...props
}: CardShellProps) {
  return (
    <Tag className={cn(cardShellVariants({ variant, padding }), className)} {...props}>
      {children}
    </Tag>
  );
}
