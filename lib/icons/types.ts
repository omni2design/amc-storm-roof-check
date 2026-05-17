/** Icon IDs mirror Figma Section D paths: category/name */
export type IconId =
  | "status/yes"
  | "status/not-sure"
  | "status/no"
  | "status/no-claim"
  | "status/filed"
  | "status/planning-file"
  | "damage-type/leak-1"
  | "damage-type/leak-2"
  | "damage-type/missing-shingles"
  | "damage-type/hail"
  | "damage-type/tree-branch"
  | "damage-type/moisture"
  | "damage-type/damage-visible"
  | "roof-age/under-10-years"
  | "roof-age/10-20-years"
  | "roof-age/20-plus-years"
  | "price-ranges/under-1000"
  | "price-ranges/1000-5000"
  | "price-ranges/5000-15000"
  | "price-ranges/15000-plus"
  | "action/take-photo"
  | "action/gallery"
  | "action/download"
  | "contact/location"
  | "contact/phone"
  | "contact/email"
  | "contact/person"
  | "trust/rating"
  | "trust/licensed"
  | "trust/local"
  | "trust/no-rush"
  | "system/loading";

/** Figma icon `Mode` — includes filled trust/rating variants */
export type IconMode =
  | "default"
  | "brand"
  | "brand-fill"
  | "inverse"
  | "subtle"
  | "disabled"
  | "urgent"
  | "success"
  | "loading";

export type IconSize = "sm" | "md" | "lg" | "xl";
