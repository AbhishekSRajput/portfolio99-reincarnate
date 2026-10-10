"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { clamp, motionAllowed } from "./motion";

type Box = { x: number; y: number; w: number; h: number };
type Target = Box & { name: string; meta: string; color: string | null };

// next/font can emit generated family names such as "__Geist_1a2b3c"; the
// readout shows the family a visitor would recognise.
function familyName(style: CSSStyleDeclaration) {
  return style.fontFamily
    .split(",")[0]
    .replace(/["']/g, "")
    .replace(/^__/, "")
    .replace(/_[0-9a-f]{5,}$/i, "")
    .replace(/_Fallback$/, "")
    .replaceAll("_", " ")
    .trim();
}

function toHex(color: string) {
  const parts = color.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return color;
  return (
    "#" +
    parts
      .slice(0, 3)
      .map((value) => Math.round(Number(value)).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

/**
 * The hero is rendered twice: the readable surface and an inert blueprint copy.
 * A circular clip follows the pointer (or drifts on its own) to reveal the
 * blueprint, whose annotations are measured from the live layout.
 */
export function HeroLens({
  children,
  blueprint,
}: {
  children: ReactNode;
  blueprint: ReactNode;
}) {
  const heroRef = useRef<HTMLElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const blueprintRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const swatchRef = useRef<HTMLElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const xyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const surface = surfaceRef.current;
    const bp = blueprintRef.current;
    const notes = notesRef.current;
    const lens = lensRef.current;
    const ring = ringRef.current;
    const readout = readoutRef.current;
    const roName = nameRef.current;
    const roSwatch = swatchRef.current;
    const roMeta = metaRef.current;
    const roXY = xyRef.current;
    if (
      !hero || !surface || !bp || !notes || !lens || !ring ||
      !readout || !roName || !roSwatch || !roMeta || !roXY
    )
      return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const ctx = document.createElement("canvas").getContext("2d");
    const ink = (el: Element, text: string) => {
      const style = getComputedStyle(el);
      const size = parseFloat(style.fontSize);
      if (!ctx) return { ascent: size * 0.72, descent: size * 0.2 };
      ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const m = ctx.measureText(text);
      return { ascent: m.actualBoundingBoxAscent, descent: m.actualBoundingBoxDescent };
    };

    let width = 0;
    let height = 0;
    let baseR = 120;
    let targets: Target[] = [];
    let columns: (Box & { n: number })[] = [];
    let wrap = { x: 0, w: 0 };
    let columnGap = 0;
    let rest = { x: 0, y: 0 };
    let lastKey: unknown = null;

    function measure() {
      if (!hero || !surface || !bp || !notes) return;
      width = hero.clientWidth;
      height = surface.offsetHeight;
      baseR = clamp(width * 0.085, 66, 148);
      notes.replaceChildren();
      targets = [];
      const base = bp.getBoundingClientRect();
      const rel = (el: Element): Box => {
        const r = el.getBoundingClientRect();
        return { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height };
      };
      const place = (cls: string, box: Partial<Record<"left" | "top" | "width" | "height", number>>) => {
        const el = document.createElement("div");
        el.className = cls;
        for (const [key, value] of Object.entries(box)) el.style.setProperty(key, `${value}px`);
        notes.append(el);
        return el;
      };
      const text = (parent: HTMLElement, cls: string, value: string) => {
        const span = document.createElement("span");
        if (cls) span.className = cls;
        span.textContent = value;
        parent.append(span);
        return span;
      };
      const outline = (box: Box, quiet = false) => {
        const el = place(quiet ? "bp-box is-quiet" : "bp-box", { left: box.x, top: box.y, width: box.w, height: box.h });
        if (!quiet) for (let i = 0; i < 4; i++) el.append(document.createElement("i"));
        return el;
      };
      const tag = (parent: HTMLElement, value: string, position = "", swatch = false) => {
        const span = text(parent, `bp-tag ${position}`.trim(), "");
        if (swatch) span.append(Object.assign(document.createElement("i"), { className: "bp-swatch" }));
        span.append(value);
      };

      const inner = bp.querySelector(".hero-inner");
      if (!inner) return;
      const innerBox = rel(inner);
      wrap = { x: innerBox.x, w: innerBox.w };
      const guide = (y: number, cls: string, label: string) => {
        const el = place(`bp-guide ${cls}`.trim(), { left: innerBox.x, top: y, width: innerBox.w });
        text(el, "", label);
      };

      const surfaceWords = surface.querySelectorAll<HTMLElement>(".hl .w");
      let index = 0;
      let capHeight = 0;
      bp.querySelectorAll(".hl-line").forEach((line, lineIndex) => {
        const probe = line.querySelector(".bl-probe");
        const words = line.querySelectorAll<HTMLElement>(".w");
        if (!probe || !words.length) return;
        const baseline = probe.getBoundingClientRect().top - base.top;
        const cap = ink(words[0], "H").ascent;
        const xHeight = ink(words[0], "x").ascent;
        guide(baseline, "is-base", "BL");
        if (lineIndex === 0) {
          capHeight = cap;
          guide(baseline - cap, "", "CAP");
          guide(baseline - xHeight, "", "X");
        }
        words.forEach((word, wordIndex) => {
          const label = word.firstChild?.textContent?.trim() ?? "";
          const r = rel(word);
          const m = ink(word, label);
          const box = { x: r.x, y: baseline - m.ascent, w: r.w, h: m.ascent + m.descent };
          const style = getComputedStyle(surfaceWords[index] ?? word);
          const color = toHex(style.color);
          const dims = `${Math.round(box.w)} × ${Math.round(box.h)}`;
          const last = wordIndex === words.length - 1;
          const el = outline(box);
          if (lineIndex === 0 && wordIndex === 0) tag(el, dims, "at-top");
          if (lineIndex > 0 && last) {
            const accent = word.classList.contains("accent");
            tag(el, accent ? `${color} · ${dims}` : dims, "at-right", accent);
          }
          if (lineIndex === 0 && last) {
            const measureEl = place("bp-measure v", { left: box.x + box.w + 30, top: baseline - cap, height: cap });
            text(measureEl, "", `CAP ${Math.round(cap)}`);
          }
          targets.push({
            ...box,
            name: `“${label}”`,
            meta: `${familyName(style)} ${style.fontWeight}${style.fontStyle === "italic" ? " Italic" : ""} · ${Math.round(parseFloat(style.fontSize))} px`,
            color,
          });
          index++;
        });
      });

      const secondLine = bp.querySelectorAll(".hl-line")[1]?.querySelector(".bl-probe");
      if (secondLine && innerBox.x > 30) {
        const y = secondLine.getBoundingClientRect().top - base.top - capHeight / 2;
        const el = place("bp-measure h", { left: 0, top: y, width: innerBox.x });
        text(el, "", String(Math.round(innerBox.x)));
      }

      const paragraph = bp.querySelector("[data-inspect='p']");
      const surfaceParagraph = surface.querySelector("[data-inspect='p']");
      if (paragraph && surfaceParagraph) {
        const box = rel(paragraph);
        const style = getComputedStyle(surfaceParagraph);
        const size = Math.round(parseFloat(style.fontSize));
        const leading = Math.round(parseFloat(style.lineHeight));
        tag(outline(box, true), `p · ${size}/${leading} · ${Math.round(box.w)} w`, "at-top");
        targets.push({ ...box, name: "Paragraph", meta: `${familyName(style)} ${style.fontWeight} · ${size}/${leading} px`, color: toHex(style.color) });
      }
      const surfaceButtons = surface.querySelectorAll("[data-inspect='btn']");
      bp.querySelectorAll("[data-inspect='btn']").forEach((button, i) => {
        const box = rel(button);
        const style = getComputedStyle(surfaceButtons[i] ?? button);
        const fill = style.backgroundColor === "rgba(0, 0, 0, 0)" ? style.color : style.backgroundColor;
        outline(box, true);
        targets.push({ ...box, name: "Button", meta: `${Math.round(box.w)} × ${Math.round(box.h)} · radius ${Math.round(box.h / 2)}`, color: toHex(fill) });
      });
      const label = bp.querySelector("[data-inspect='label']");
      const surfaceLabel = surface.querySelector("[data-inspect='label']");
      if (label && surfaceLabel) {
        const style = getComputedStyle(surfaceLabel);
        targets.push({ ...rel(label), name: "Label", meta: `${familyName(style)} · ${Math.round(parseFloat(style.fontSize))} px · uppercase`, color: toHex(style.color) });
      }

      columns = Array.from(bp.querySelectorAll<HTMLElement>(".hero-grid i"))
        .filter((column) => column.offsetParent)
        .map((column, i) => ({ ...rel(column), n: i + 1 }));
      columnGap = columns.length > 1 ? Math.round(columns[1].x - (columns[0].x + columns[0].w)) : 0;
      const little = targets.find((t) => t.name === "“little”") ?? targets[0];
      if (little) rest = { x: little.x + little.w * 0.45, y: little.y + little.h * 0.55 };
      lastKey = null;
    }

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let r = 0;
    let velocity = 0;
    let lastMove = -Infinity;
    let holdUntil = 0;
    let pointerInside = false;
    let opened = false;
    let running = false;
    let previous = 0;
    let frame = 0;
    let lastXY = "";
    let readoutWidth = 200;
    const pad = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, "0");

    function updateReadout(radius: number) {
      if (!readout || !roName || !roSwatch || !roMeta || !roXY) return;
      const hit = targets.find((t) => x >= t.x - 6 && x <= t.x + t.w + 6 && y >= t.y - 6 && y <= t.y + t.h + 6);
      let key: unknown, name: string, meta: string, color: string | null = null;
      if (hit) {
        key = hit; name = hit.name; meta = hit.meta; color = hit.color;
      } else if (x < wrap.x || x > wrap.x + wrap.w) {
        key = "margin"; name = "Margin"; meta = `${Math.round(wrap.x)} px · page edge`;
      } else {
        const column = columns.find((c) => x >= c.x && x <= c.x + c.w);
        key = column ? `col${column.n}` : "gutter";
        name = column ? `Column ${String(column.n).padStart(2, "0")}` : "Gutter";
        meta = column ? `${columns.length}-col grid · ${Math.round(column.w)} px` : `${columnGap} px between columns`;
      }
      if (key !== lastKey) {
        lastKey = key;
        roName.textContent = name;
        roMeta.textContent = meta;
        roSwatch.hidden = !color;
        if (color) roSwatch.style.background = color;
        readoutWidth = readout.offsetWidth;
      }
      const xy = `${color ? color + " · " : ""}X ${pad(x)}  Y ${pad(y)}`;
      if (xy !== lastXY) {
        roXY.textContent = xy;
        lastXY = xy;
      }
      const offset = radius * 0.7071 + 14;
      const readoutHeight = readout.offsetHeight;
      const flipX = x + offset + readoutWidth > width - 12;
      const flipY = y + offset + readoutHeight > height - 12;
      const ox = clamp(x + (flipX ? -offset - readoutWidth : offset), 12, Math.max(12, width - readoutWidth - 12)) - x;
      const oy = clamp(y + (flipY ? -offset - readoutHeight : offset), 12, Math.max(12, height - readoutHeight - 12)) - y;
      readout.style.transform = `translate(${ox.toFixed(1)}px, ${oy.toFixed(1)}px)`;
    }

    function tick(now: number) {
      if (!running || !hero || !bp || !lens || !ring || !readout) return;
      const dt = clamp((now - previous) / 16.667, 0.25, 3);
      previous = now;
      const motion = motionAllowed();
      const idle = !pointerInside && now - lastMove > 2400 && now > holdUntil;
      if (idle) {
        if (motion) {
          const t = now / 1000;
          targetX = rest.x + width * 0.2 * Math.sin(t * 0.29);
          targetY = rest.y + height * 0.11 * Math.sin(t * 0.43 + 0.8);
        } else {
          targetX = rest.x;
          targetY = rest.y;
        }
      }
      const ease = motion ? 1 - Math.pow(1 - (idle ? 0.035 : 0.17), dt) : 1;
      const px = x;
      const py = y;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      const speed = Math.hypot(x - px, y - py) / dt;
      const want = opened ? baseR * (1 + Math.min(speed, 36) / 150) : 0;
      if (motion) {
        velocity = velocity * Math.pow(0.8, dt) + (want - r) * 0.075 * dt;
        r += velocity * dt;
      } else {
        r = want;
        velocity = 0;
      }
      // Scrolling out of the hero widens the lens until the blueprint takes over.
      const heroBox = hero.getBoundingClientRect();
      const progress = clamp(-heroBox.top / (heroBox.height * 0.7), 0, 1);
      const boost = motion ? Math.pow(progress, 1.6) * Math.hypot(width, height) * 1.05 : 0;
      const radius = Math.max(0, r + boost);
      bp.style.clipPath = `circle(${radius.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px)`;
      lens.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      ring.style.width = ring.style.height = `${(2 * radius).toFixed(1)}px`;
      ring.style.transform = `translate(${(-radius).toFixed(1)}px, ${(-radius).toFixed(1)}px)`;
      const expanding = boost > baseR * 0.4;
      ring.style.opacity = expanding ? "0" : "1";
      readout.style.opacity = expanding || radius < baseR * 0.5 ? "0" : "1";
      if (!expanding) updateReadout(radius);
      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (running) return;
      running = true;
      previous = performance.now();
      frame = requestAnimationFrame(tick);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    const pointFrom = (event: PointerEvent | MouseEvent) => {
      const box = hero.getBoundingClientRect();
      targetX = event.clientX - box.left;
      targetY = event.clientY - box.top;
      lastMove = performance.now();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointFrom(event);
      pointerInside = true;
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerInside = false;
      lastMove = performance.now() - 1600;
    };
    // Taps (not scroll gestures) move the lens on touch screens.
    const onClick = (event: MouseEvent) => {
      if (finePointer.matches) return;
      pointFrom(event);
      holdUntil = lastMove + 3800;
    };
    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    hero.addEventListener("click", onClick);

    let measureFrame = 0;
    const scheduleMeasure = () => {
      cancelAnimationFrame(measureFrame);
      measureFrame = requestAnimationFrame(measure);
    };
    const resize = new ResizeObserver(scheduleMeasure);
    resize.observe(hero);
    const theme = new MutationObserver(scheduleMeasure);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) start();
      else stop();
    });
    visibility.observe(hero);
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (hero.getBoundingClientRect().bottom > 0) start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    document.fonts.addEventListener("loadingdone", scheduleMeasure);

    let disposed = false;
    const timers: number[] = [];
    document.fonts.ready.then(() => {
      if (disposed) return;
      measure();
      x = targetX = rest.x;
      y = targetY = rest.y;
      timers.push(
        window.setTimeout(() => {
          opened = true;
          lens.classList.add("is-on");
        }, motionAllowed() ? 1050 : 0),
      );
      start();
    });

    return () => {
      disposed = true;
      stop();
      timers.forEach(clearTimeout);
      cancelAnimationFrame(measureFrame);
      resize.disconnect();
      theme.disconnect();
      visibility.disconnect();
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      hero.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
      document.fonts.removeEventListener("loadingdone", scheduleMeasure);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero-layer" ref={surfaceRef}>
        {children}
      </div>
      <div className="hero-layer is-blueprint" ref={blueprintRef} aria-hidden="true" inert>
        {blueprint}
        <div className="bp-notes" ref={notesRef} />
      </div>
      <div className="lens" ref={lensRef} aria-hidden="true">
        <div className="lens-ring" ref={ringRef} />
        <div className="lens-cross" />
        <div className="lens-readout" ref={readoutRef}>
          <div className="ro-name">
            <i className="ro-swatch" ref={swatchRef} />
            <span ref={nameRef} />
          </div>
          <div className="ro-meta" ref={metaRef} />
          <div className="ro-xy" ref={xyRef} />
        </div>
      </div>
    </section>
  );
}
