import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function SearchIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function UserIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-3.6 3.6-6 8-6s8 2.4 8 6" />
    </svg>
  );
}

export function BagIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 7h14l-1 13H6L5 7Z" />
      <path d="M9 7V5.5a3 3 0 0 1 6 0V7" />
    </svg>
  );
}

export function ArrowRightIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function DiamondIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 3h12l3 6-9 12L3 9l3-6Z" />
      <path d="M3 9h18" />
      <path d="m9.5 3-1.5 6 4 12 4-12-1.5-6" />
    </svg>
  );
}

export function GlobeIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.8 4 5.8 4 9s-1.4 6.2-4 9c-2.6-2.8-4-5.8-4-9s1.4-6.2 4-9Z" />
    </svg>
  );
}

export function LockIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="10" width="16" height="11" rx="1.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function RefreshIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20 4v4h-4" />
    </svg>
  );
}

export function MenuIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function TrashIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7h16" />
      <path d="M9 7V5h6v2" />
      <path d="M6 7l1 13h10l1-13" />
    </svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function PinIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function HangerIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 9V7.5a2.2 2.2 0 1 1 2.2 2.2" />
      <path d="M12 9 3.6 15.2A1.3 1.3 0 0 0 4.4 17.6h15.2a1.3 1.3 0 0 0 .8-2.4L12 9Z" />
    </svg>
  );
}

export function HeartIcon({ filled, ...p }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base} {...p} fill={filled ? "currentColor" : "none"}>
      <path d="M12 20s-7.2-4.5-7.2-9.4A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7.2 2.6C19.2 15.5 12 20 12 20Z" />
    </svg>
  );
}

export function InstagramIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const FEATURE_ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  diamond: DiamondIcon,
  globe: GlobeIcon,
  lock: LockIcon,
  refresh: RefreshIcon,
  search: SearchIcon,
  user: UserIcon,
  bag: BagIcon,
  check: CheckIcon,
  pin: PinIcon,
  hanger: HangerIcon,
  heart: HeartIcon,
};

export const FEATURE_ICON_NAMES = Object.keys(FEATURE_ICONS);

export function FeatureIcon({ name, ...p }: IconProps & { name: string }) {
  const Cmp = FEATURE_ICONS[name] ?? DiamondIcon;
  return <Cmp {...p} />;
}
