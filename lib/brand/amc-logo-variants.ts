/** Figma `AMC Logo` (295:4191) — layer insets per size variant */
export type AmcLogoVariant =
  | "sm-default"
  | "sm-no-text-sq"
  | "lg-no-text-sq"
  | "md-landing"
  | "submitting-loading";

export type AmcLogoLayer = {
  src: string;
  inset: string;
};

export type AmcLogoVariantConfig =
  | {
      type: "layers";
      sizePx: number;
      roundedClass: string;
      bgClass: string;
      layers: AmcLogoLayer[];
    }
  | {
      type: "asset";
      sizePx: number;
      src: string;
    }
  | {
      /** Figma AMC Logo xl (295:7794) + system loading ring — submitting screen */
      type: "loading";
      sizePx: number;
      roundedClass: string;
      bgClass: string;
      innerSrc: string;
    };

const defaultLayers = (base: string): AmcLogoLayer[] => [
  { src: `${base}/mascot.svg`, inset: "inset-[14.24%_20%_43.44%_20.05%]" },
  { src: `${base}/house.svg`, inset: "inset-[46.29%_26.57%_36.08%_26.67%]" },
  { src: `${base}/text.svg`, inset: "inset-[65.62%_18.35%_14.17%_18.61%]" },
];

export const amcLogoVariants: Record<AmcLogoVariant, AmcLogoVariantConfig> = {
  "sm-default": {
    type: "layers",
    sizePx: 32,
    roundedClass: "rounded-lg",
    bgClass: "bg-surface-muted",
    layers: defaultLayers("/brand/amc-logo/sm-default"),
  },
  /** Figma Foundation/Brand Logo `no-text-sq` sm (504:6463) — contractor top nav (829:8189) */
  "sm-no-text-sq": {
    type: "asset",
    sizePx: 32,
    src: "/brand/amc-logo/no-text-sq-sm.svg",
  },
  /** Figma Foundation/Brand Logo `no-text-sq` lg — landing hero (829:8105) */
  "lg-no-text-sq": {
    type: "asset",
    sizePx: 64,
    src: "/brand/amc-logo/no-text-sq-lg.svg",
  },
  "md-landing": {
    type: "layers",
    sizePx: 64,
    roundedClass: "rounded-2xl",
    bgClass: "bg-surface-card",
    layers: defaultLayers("/brand/amc-logo/md-landing"),
  },
  "submitting-loading": {
    type: "loading",
    sizePx: 100,
    roundedClass: "rounded-[4rem]",
    bgClass: "bg-surface-muted",
    innerSrc: "/brand/amc-logo/submitting-loading/inner.svg",
  },
};
