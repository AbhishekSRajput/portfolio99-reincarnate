"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { motionAllowed } from "./motion";

/** The tour's browser window, in its 400 × 320 viewBox: the lens follows the pointer inside it. */
const WINDOW = { left: 34, right: 296, top: 96, bottom: 280 };
/** Where the tour ghost's eyes sit, in the same viewBox. */
const TOUR_EYES = { x: 336, y: 101 };

/**
 * The mascot's stage. Its eyes follow the pointer anywhere on the page, a few
 * units at most, through the --lx/--ly properties mascot.css reads. With
 * `lens`, the pointer over the tour's window takes the lens (--mx/--my and the
 * is-manual class) and the tour waits until it leaves. Both stop under a
 * reduced-motion request or the saved pause preference.
 */
export function MascotGaze({
  children,
  className,
  lens = false,
}: {
  children: ReactNode;
  className?: string;
  lens?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = ref.current;
    if (!stage) return;
    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!last || !motionAllowed()) {
        stage.classList.remove("is-manual");
        return;
      }
      const box = stage.getBoundingClientRect();
      if (lens) {
        const x = ((last.clientX - box.left) / box.width) * 400;
        const y = ((last.clientY - box.top) / box.height) * 320;
        const inside = x >= WINDOW.left && x <= WINDOW.right && y >= WINDOW.top && y <= WINDOW.bottom;
        stage.classList.toggle("is-manual", inside);
        if (!inside) return;
        const dx = x - TOUR_EYES.x;
        const dy = y - TOUR_EYES.y;
        const d = Math.hypot(dx, dy) || 1;
        stage.style.setProperty("--mx", x.toFixed(1));
        stage.style.setProperty("--my", y.toFixed(1));
        stage.style.setProperty("--lx", ((dx / d) * 6).toFixed(2));
        stage.style.setProperty("--ly", ((dy / d) * 5).toFixed(2));
        return;
      }
      const dx = last.clientX - (box.left + box.width / 2);
      const dy = last.clientY - (box.top + box.height * 0.44);
      const d = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, d / 260);
      stage.style.setProperty("--lx", ((dx / d) * 4 * reach).toFixed(2));
      stage.style.setProperty("--ly", ((dy / d) * 3 * reach).toFixed(2));
    };
    const move = (event: PointerEvent) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const leave = () => stage.classList.remove("is-manual");

    window.addEventListener("pointermove", move, { passive: true });
    stage.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  }, [lens]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
