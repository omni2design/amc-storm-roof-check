import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import { searchBarVariants, type SearchBarVariantProps } from "@/lib/variants/search-bar";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M9 16A7 7 0 1 0 9 2a7 7 0 0 0 0 14Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 17l-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type SearchBarProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
  SearchBarVariantProps & {
    onClear?: () => void;
    wrapperClassName?: string;
  };

/** Figma `Search Bar` — compact search input with leading icon. */
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      wrapperClassName,
      state,
      placeholder = "Search…",
      disabled,
      value,
      onClear,
      ...inputProps
    },
    ref,
  ) => {
    const resolvedState = disabled ? "disabled" : state;
    const showClear = Boolean(onClear && value && String(value).length > 0);

    return (
      <div className={cn(searchBarVariants({ state: resolvedState }), wrapperClassName)}>
        <SearchIcon className="size-5 shrink-0 text-icon-subtle" />
        <input
          ref={ref}
          type="search"
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          className={cn(
            "min-w-0 flex-1 border-0 bg-transparent p-0 text-sm-leading text-input-text placeholder:text-contractor-search-placeholder focus:outline-none focus:ring-0 disabled:cursor-not-allowed",
            className,
          )}
          {...inputProps}
        />
        {showClear ? (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 rounded-pill px-1.5 py-0.5 text-caption text-foreground-muted hover:bg-surface-muted focus-visible:focus-ring"
            aria-label="Clear search"
          >
            Clear
          </button>
        ) : null}
      </div>
    );
  },
);

SearchBar.displayName = "SearchBar";
