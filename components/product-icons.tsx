import type { ReactNode } from "react";
import type { IconName } from "@/lib/content";

// Stroke icons for product chapters, guides and support cards.
const paths: Record<IconName, ReactNode> = {
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  ruler: (
    <>
      <rect x="3" y="8" width="18" height="8" rx="1.5" />
      <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
    </>
  ),
  devices: (
    <>
      <rect x="2.5" y="4" width="13" height="10" rx="1.5" />
      <rect x="15" y="9" width="6.5" height="11" rx="1.5" />
      <path d="M5.5 18h7" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20.5 20.5-4.8-4.8M8.5 11h5M11 8.5v5" />
    </>
  ),
  folder: (
    <>
      <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" />
      <path d="M12 10.5V13l1.8 1.2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  browser: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </>
  ),
  keyboard: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
    </>
  ),
  pipette: (
    <>
      <path d="m14.5 5.5 4 4" />
      <path d="M17 3.5a2.1 2.1 0 0 1 3 3L9 17.5l-4.5 1.5L6 14.5z" />
    </>
  ),
  inspect: (
    <>
      <rect x="3" y="3" width="13" height="13" rx="2" />
      <circle cx="15" cy="15" r="4" />
      <path d="m21 21-3.2-3.2M6.5 7h6M6.5 10.5h3" />
    </>
  ),
  selector: (
    <>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M4 16v2.5A1.5 1.5 0 0 0 5.5 20H8" />
      <path d="m12 12 8 3-3.5 1.5L15 20z" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="m21 16-5-5-9 9" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  stack: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12.5 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </>
  ),
  panel: (
    <>
      <rect x="2.5" y="4" width="12" height="9" rx="1.5" />
      <path d="M17.5 4h4M17.5 8h4M17.5 12h4M17.5 16h4M17.5 20h4" />
    </>
  ),
  tabs: (
    <>
      <path d="M3 9V6.5A1.5 1.5 0 0 1 4.5 5h5A1.5 1.5 0 0 1 11 6.5V9" />
      <path d="M3 9h18v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z" />
    </>
  ),
  pip: (
    <>
      <rect x="2.5" y="4" width="19" height="15" rx="2" />
      <rect x="12" y="11" width="7" height="5" rx="1" />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M12.5 15H17" />
    </>
  ),
};

export function ProductIcon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
