"use client";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { Arrow } from "./icons";
import { motionAllowed } from "./motion";

/** The contact headline; a second lens fills it with the accent under the pointer. */
export function ContactLens({ href, children }: { href: string; children: ReactNode }) {
  const fillRef = useRef<HTMLSpanElement>(null);
  const lens = useRef({ x: 0, y: 0, tx: 0, ty: 0, r: 0, tr: 0, frame: 0 });

  useEffect(() => {
    const state = lens.current;
    return () => cancelAnimationFrame(state.frame);
  }, []);

  function step() {
    const s = lens.current;
    const fill = fillRef.current;
    if (!fill) return;
    const ease = motionAllowed() ? 0.16 : 1;
    s.x += (s.tx - s.x) * ease;
    s.y += (s.ty - s.y) * ease;
    s.r += (s.tr - s.r) * (motionAllowed() ? 0.12 : 1);
    if (s.tr === 0 && s.r < 0.5) {
      s.frame = 0;
      fill.style.clipPath = "";
      return;
    }
    fill.style.clipPath = `circle(${s.r.toFixed(1)}px at ${s.x.toFixed(1)}px ${s.y.toFixed(1)}px)`;
    s.frame = requestAnimationFrame(step);
  }

  function onPointerMove(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse") return;
    const s = lens.current;
    const box = event.currentTarget.getBoundingClientRect();
    s.tx = event.clientX - box.left;
    s.ty = event.clientY - box.top;
    s.tr = box.height * 0.42;
    if (!s.frame) {
      s.x = s.tx;
      s.y = s.ty;
      s.frame = requestAnimationFrame(step);
    }
  }

  function onPointerLeave() {
    const s = lens.current;
    s.tr = 0;
    if (!s.frame) s.frame = requestAnimationFrame(step);
  }

  const go = (
    <span className="cb-go" aria-hidden="true">
      <Arrow diagonal />
    </span>
  );
  return (
    <a className="contact-big" href={href} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <span>
        {children}
        {go}
      </span>
      <span className="cb-fill" ref={fillRef} aria-hidden="true">
        {children}
        {go}
      </span>
    </a>
  );
}

/** Copies the address; falls back to selecting it when the clipboard is unavailable. */
export function CopyEmail({ email, targetId }: { email: string; targetId: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "selected">("idle");
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      const target = document.getElementById(targetId);
      const selection = window.getSelection();
      if (target && selection) {
        const range = document.createRange();
        range.selectNodeContents(target);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setStatus("selected");
    }
    timer.current = window.setTimeout(() => setStatus("idle"), 2400);
  }

  return (
    <>
      <button type="button" className="pill pill-ghost copy-email" onClick={copy}>
        {status === "copied" ? "Copied" : "Copy email"}
      </button>
      <span className="sr-only" role="status">
        {status === "copied"
          ? "Email address copied."
          : status === "selected"
            ? "Email address selected. Press Control or Command plus C to copy."
            : ""}
      </span>
    </>
  );
}
