export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** Decorative motion runs only without a reduced-motion request or the saved pause preference. */
export function motionAllowed() {
  return (
    document.documentElement.dataset.motion !== "paused" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
