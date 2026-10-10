"use client";
import { useEffect, useRef, useState } from "react";
import { clamp, motionAllowed } from "./motion";

type GhostState = {
  opacity: number;
  x: number;
  y: number;
  chips: number;
  status: string;
  matched: boolean;
};

const DRIFT: GhostState = { opacity: 0.6, x: -12, y: 8, chips: 1, status: "Drift · 12 px, 8 px", matched: false };
const HIDDEN: GhostState = { opacity: 0, x: 0, y: 0, chips: 0, status: "Overlay off", matched: false };
const LOOP_MS = 7200;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// One pass of the concept: spot the drift, nudge the layer home, swap layers.
function ghostAt(t: number): GhostState {
  if (t < 1400) return DRIFT;
  if (t < 3000) {
    const e = easeInOut((t - 1400) / 1600);
    return { ...DRIFT, x: -12 * (1 - e), y: 8 * (1 - e), chips: 1 - e, status: "Nudging into place" };
  }
  const matched = { ...DRIFT, x: 0, y: 0, chips: 0, status: "Matched · 0 px drift", matched: true };
  if (t < 5000) return matched;
  if (t < 5600) return { ...matched, opacity: 0.6 * (1 - easeOut((t - 5000) / 600)) };
  if (t < 6400) {
    const e = easeOut(clamp((t - 5600) / 800, 0, 1));
    return { ...DRIFT, opacity: 0.6 * e, chips: e, status: "Next layer" };
  }
  return DRIFT;
}

function MockSite() {
  return (
    <>
      <div className="mock-nav">
        <b>forma®</b>
        <span>Objects</span>
        <span>Studio</span>
        <span>Journal</span>
      </div>
      <div className="mock-body">
        <div className="mock-copy">
          <small>Less, but considered.</small>
          <strong>
            Room
            <br />
            to <em>breathe.</em>
          </strong>
          <span className="mock-link">Explore the collection ↗</span>
        </div>
        <div className="mock-art">
          <span className="ring" />
          <span className="base" />
        </div>
      </div>
    </>
  );
}

export function PixelGhostDemo() {
  const [overlay, setOverlay] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const statusTextRef = useRef<HTMLSpanElement>(null);
  const xRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;
    let visible = false;
    let startedAt = 0;
    const apply = (s: GhostState) => {
      const ghost = ghostRef.current;
      if (ghost) {
        ghost.style.opacity = s.opacity.toFixed(3);
        ghost.style.transform = `translate(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px)`;
      }
      if (chipsRef.current) chipsRef.current.style.opacity = s.chips.toFixed(2);
      const percent = `${Math.round((s.opacity / 0.6) * 60)}%`;
      if (xRef.current) xRef.current.textContent = String(Math.round(s.x));
      if (yRef.current) yRef.current.textContent = String(Math.round(s.y));
      if (valueRef.current) valueRef.current.textContent = percent;
      if (trackRef.current) trackRef.current.style.width = percent;
      if (statusTextRef.current) statusTextRef.current.textContent = s.status;
      statusRef.current?.classList.toggle("is-matched", s.matched);
    };
    const loop = (now: number) => {
      apply(ghostAt((now - startedAt) % LOOP_MS));
      frame = requestAnimationFrame(loop);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (!overlay) return apply(HIDDEN);
      if (!visible || !motionAllowed()) return apply(DRIFT);
      startedAt = performance.now();
      frame = requestAnimationFrame(loop);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    observer.observe(root);
    sync();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [overlay]);

  return (
    <div className="pg" ref={rootRef}>
      <div className="pg-stage">
        <div className="browser" aria-hidden="true">
          <div className="browser-bar">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <span className="url">studio.local/the-details</span>
          </div>
          <div className="pg-canvas">
            <div className="mock">
              <MockSite />
            </div>
            <div
              className="mock mock-ghost"
              ref={ghostRef}
              style={{ opacity: DRIFT.opacity, transform: `translate(${DRIFT.x}px, ${DRIFT.y}px)` }}
            >
              <MockSite />
            </div>
            <div className="pg-chips" ref={chipsRef}>
              <span className="pg-chip">Δx −12 px</span>
              <span className="pg-chip">Δy +8 px</span>
            </div>
            <span className="pg-status" ref={statusRef}>
              <i />
              <span ref={statusTextRef}>{DRIFT.status}</span>
            </span>
          </div>
        </div>
        <div className="pg-widget">
          <div className="pgw-head" aria-hidden="true">
            <span className="pgw-logo">
              <i />
              <i />
            </span>
            <b>Layers</b>
            <span className="pgw-file">hero-v3.png</span>
          </div>
          <div className="pgw-label" aria-hidden="true">
            Origin <span>Reset</span>
          </div>
          <div className="pgw-row" aria-hidden="true">
            <span className="pgw-input" ref={xRef}>
              -12
            </span>
            <span className="pgw-axis">X</span>
          </div>
          <div className="pgw-row" aria-hidden="true">
            <span className="pgw-input" ref={yRef}>
              8
            </span>
            <span className="pgw-axis">Y</span>
          </div>
          <div className="pgw-buttons">
            <button
              type="button"
              className="pgw-show"
              aria-pressed={overlay}
              aria-label="Show overlay"
              onClick={() => setOverlay(!overlay)}
            >
              Show
            </button>
            <span aria-hidden="true">Lock</span>
            <span aria-hidden="true">Normal</span>
          </div>
          <div className="pgw-slider" aria-hidden="true">
            <span className="pgw-track">
              <i ref={trackRef} />
            </span>
            <span className="pgw-value" ref={valueRef}>
              60%
            </span>
          </div>
        </div>
      </div>
      <p className="demo-hint">Interactive concept · Toggle Show</p>
    </div>
  );
}

const comments = [
  "This is exactly what I needed today.",
  "The details make all the difference.",
  "Could watch this for hours.",
  "Less noise. More of this.",
  "A small reminder to slow down.",
  "Love how considered this feels.",
];

export function YouScrollDemo() {
  return (
    <div className="ys">
      <div className="browser">
        <div className="browser-bar" aria-hidden="true">
          <span className="dots">
            <i />
            <i />
            <i />
          </span>
          <span className="url">youtube.com/watch</span>
        </div>
        <div className="ys-body">
          <div className="ys-main" aria-hidden="true">
            <div className="ys-player">
              <span className="ys-kicker">The art of paying attention</span>
              <span className="ys-video-title">
                Find your <em>flow state.</em>
              </span>
              <span className="ys-progress">
                <i />
              </span>
            </div>
            <strong className="ys-name">A little space to think.</strong>
            <span className="ys-channel">Studio Notes · Creative practice</span>
            <span className="ys-tag">● Player stays put</span>
          </div>
          <div className="ys-side">
            <p className="ys-comments-head" aria-hidden="true">
              Comments <span>{comments.length}</span>
            </p>
            <div
              className="ys-scroller"
              tabIndex={0}
              role="region"
              aria-label="Demo comments; scroll independently"
            >
              {comments.map((comment, i) => (
                <div className="ys-comment" key={comment}>
                  <i>{["S", "J", "M", "K", "R", "A"][i]}</i>
                  <div>
                    <span>@viewer_{i + 1}</span>
                    <p>{comment}</p>
                    <span>
                      ♡ {12 + i * 7} · Reply
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <span className="ys-tag ys-tag-scroll" aria-hidden="true">
              ↕ Your scroll. Your space.
            </span>
          </div>
        </div>
      </div>
      <p className="demo-hint">Interactive concept · Scroll the comments</p>
    </div>
  );
}
