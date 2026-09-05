"use client";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

export function HeroCube() {
  const [exploded, setExploded] = useState(true);
  const stage = useRef<HTMLDivElement>(null);
  function trackPointer(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      document.documentElement.dataset.motion === "paused" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    stage.current?.style.setProperty(
      "--pointer-x",
      `${((event.clientX - rect.left) / rect.width - 0.5) * 14}deg`,
    );
    stage.current?.style.setProperty(
      "--pointer-y",
      `${((event.clientY - rect.top) / rect.height - 0.5) * -10}deg`,
    );
  }
  return (
    <div
      className="cube-art"
      ref={stage}
      onPointerMove={trackPointer}
      onPointerLeave={() => {
        stage.current?.style.setProperty("--pointer-x", "0deg");
        stage.current?.style.setProperty("--pointer-y", "0deg");
      }}
    >
      <div className="art-corner corner-tl" />
      <div className="art-corner corner-tr" />
      <div className="art-corner corner-bl" />
      <div className="art-corner corner-br" />
      <div className="art-index mono">
        <span>FIG. 01</span>
        <span>ANATOMY OF A BUILDER</span>
      </div>
      <div className="cube-floor" aria-hidden="true" />
      <div className="cube-scene" data-exploded={exploded} aria-hidden="true">
        <div className="cube-assembly">
          {[0, 1, 2].map((layer) => (
            <div
              className={`cube-layer layer-${layer}`}
              key={layer}
              style={{ "--layer": layer } as CSSProperties}
            >
              {["front", "back", "right", "left", "top", "bottom"].map(
                (face) => (
                  <div className={`cube-face face-${face}`} key={face}>
                    <div className="face-grid">
                      {Array.from({ length: 9 }, (_, i) => (
                        <span key={i}>
                          {face === "front" && layer === 0 && i === 1 ? (
                            "99"
                          ) : (
                            <i />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="cube-annotation annotation-top mono">
        <span>01 — CURIOSITY</span>
        <i />
      </div>
      <div className="cube-annotation annotation-middle mono">
        <i />
        <span>02 — PRECISION</span>
      </div>
      <div className="cube-annotation annotation-bottom mono">
        <span>03 — FOLLOW-THROUGH</span>
        <i />
      </div>
      <div className="art-bottom">
        <p className="mono">
          MANY LAYERS.
          <br />
          <span>ONE WAY OF THINKING.</span>
        </p>
        <button
          className="cube-control mono"
          type="button"
          aria-pressed={exploded}
          onClick={() => setExploded(!exploded)}
        >
          <span>{exploded ? "−" : "+"}</span>
          {exploded ? "ASSEMBLE" : "EXPLODE"}
        </button>
      </div>
    </div>
  );
}
