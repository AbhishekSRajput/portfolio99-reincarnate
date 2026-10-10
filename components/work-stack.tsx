"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { clamp, motionAllowed } from "./motion";

/** Sticky product cards: as the next card slides over, the one beneath recedes. */
export function WorkStack({ children }: { children: ReactNode }) {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const cards = Array.from(stack.querySelectorAll<HTMLElement>(":scope > .card"));
    const stacked = window.matchMedia("(min-width: 1026px) and (min-height: 700px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const active = stacked.matches && motionAllowed();
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        const dim = card.querySelector<HTMLElement>(".card-dim");
        if (!next || !active) {
          card.style.transform = "";
          if (dim) dim.style.opacity = "";
          return;
        }
        const stickTop = parseFloat(getComputedStyle(next).top) || 0;
        const cover = clamp(
          1 - (next.getBoundingClientRect().top - stickTop) / (viewport - stickTop),
          0,
          1,
        );
        card.style.transform = cover > 0 ? `scale(${(1 - cover * 0.06).toFixed(4)})` : "";
        if (dim) dim.style.opacity = (cover * 0.6).toFixed(3);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    stacked.addEventListener("change", schedule);
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      stacked.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="stack" ref={stackRef}>
      {children}
    </div>
  );
}
