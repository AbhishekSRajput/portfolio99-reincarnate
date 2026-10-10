"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { traits as traitList } from "@/lib/content";
import { clamp, motionAllowed } from "./motion";

type Trait = (typeof traitList)[number];
type Piece = {
  i: number;
  j: number;
  k: number;
  accent: boolean;
  dx: number;
  dy: number;
  dz: number;
  rx: number;
  ry: number;
  delay: number;
};

const FACES = ["f", "b", "r", "l", "t", "d"] as const;
const TRAITS_ID = "approach-traits";
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeBack = (t: number) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);

// A seeded scatter keeps the exploded layout identical on every visit.
const PIECES: Piece[] = (() => {
  let seed = 99;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const pieces: Piece[] = [];
  for (let j = 1; j >= -1; j--)
    for (let i = -1; i <= 1; i++)
      for (let k = -1; k <= 1; k++) {
        if (!i && !j && !k) continue;
        const length = Math.hypot(i, j, k);
        const spread = 70 + random() * 110;
        // The top-front-right piece is the orange detail; it lands last.
        const accent = i === 1 && j === -1 && k === 1;
        pieces.push({
          i, j, k, accent,
          dx: (i / length) * spread * 1.4 + (random() - 0.5) * 70,
          dy: (j / length) * spread * 0.6 + (random() - 0.5) * 50 + 30,
          dz: (k / length) * spread * 1.6 + (random() - 0.5) * 160,
          rx: (random() - 0.5) * 300,
          ry: (random() - 0.5) * 300,
          delay: accent ? 0.66 : (1 - j) * 0.17 + random() * 0.14,
        });
      }
  return pieces;
})();

/** A 3×3×3 cube that assembles as the approach principles scroll past. */
export function ApproachCube() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const pieceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const cube = cubeRef.current;
    if (!stage || !cube) return;
    const wide = window.matchMedia("(min-width: 768px)");
    let frame = 0;
    let last = -1;
    const render = (progress: number) => {
      if (Math.abs(progress - last) < 0.0005) return;
      last = progress;
      const size = pieceRefs.current[0]?.offsetWidth ?? 40;
      const pitch = size * 1.07;
      PIECES.forEach((piece, n) => {
        const el = pieceRefs.current[n];
        if (!el) return;
        const local = clamp((progress - piece.delay) / 0.32, 0, 1);
        const e = piece.accent ? clamp(easeBack(local), 0, 1.2) : easeOut(local);
        const away = 1 - e;
        el.style.transform =
          `translate3d(${(piece.i * pitch + piece.dx * away).toFixed(1)}px, ` +
          `${(piece.j * pitch + piece.dy * away).toFixed(1)}px, ` +
          `${(piece.k * pitch + piece.dz * away).toFixed(1)}px) ` +
          `rotateX(${(piece.rx * away).toFixed(1)}deg) rotateY(${(piece.ry * away).toFixed(1)}deg)`;
        el.style.setProperty("--o", (0.3 + 0.7 * clamp(e, 0, 1)).toFixed(3));
      });
      cube.style.transform = `rotateX(-24deg) rotateY(${(-18 - progress * 40).toFixed(2)}deg)`;
      if (shadowRef.current) shadowRef.current.style.opacity = (0.15 + progress * 0.55).toFixed(3);
    };
    const update = () => {
      frame = 0;
      if (!motionAllowed()) return render(1);
      const viewport = window.innerHeight;
      const list = document.getElementById(TRAITS_ID);
      let progress: number;
      if (wide.matches && list) {
        const box = list.getBoundingClientRect();
        if (box.bottom < -200 || box.top > viewport + 200) return;
        progress = clamp((viewport * 0.78 - box.top) / Math.max(1, box.height - viewport * 0.45), 0, 1);
      } else {
        const box = stage.getBoundingClientRect();
        progress = clamp((viewport * 0.95 - box.top) / (viewport * 0.65), 0, 1);
      }
      render(progress);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const remeasure = () => {
      last = -1;
      schedule();
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    wide.addEventListener("change", remeasure);
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      wide.removeEventListener("change", remeasure);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="cube-stage" ref={stageRef} aria-hidden="true">
      <div className="cube-sway">
        <div className="cube" ref={cubeRef}>
          {PIECES.map((piece, n) => (
            <div
              key={`${piece.i}${piece.j}${piece.k}`}
              className={piece.accent ? "cubelet is-accent" : "cubelet"}
              ref={(el) => {
                pieceRefs.current[n] = el;
              }}
              style={{ "--i": piece.i, "--j": piece.j, "--k": piece.k } as CSSProperties}
            >
              {FACES.map((face) => (
                <div key={face} className={`face ${face}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="cube-shadow" ref={shadowRef} />
    </div>
  );
}

/** Highlights the principle nearest the middle of the viewport. */
export function ApproachTraits({ traits }: { traits: readonly Trait[] }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const list = listRef.current;
      if (!list) return;
      const middle = window.innerHeight / 2;
      let best = 0;
      let distance = Infinity;
      Array.from(list.children).forEach((item, index) => {
        const box = item.getBoundingClientRect();
        const d = Math.abs(box.top + box.height / 2 - middle);
        if (d < distance) {
          distance = d;
          best = index;
        }
      });
      setActive(best);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol className="traits" id={TRAITS_ID} ref={listRef}>
      {traits.map((trait, index) => (
        <li key={trait.number} className={index === active ? "trait is-active" : "trait"}>
          <span className="mono trait-num">{trait.number}</span>
          <div>
            <h3>
              {trait.title}
              <span className="trait-sym" aria-hidden="true">
                {trait.symbol}
              </span>
            </h3>
            <p>{trait.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
