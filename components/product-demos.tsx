"use client";
import { useState } from "react";
import Image from "next/image";

export function PixelGhostDemo() {
  const [overlay, setOverlay] = useState(true);
  return (
    <div className="pg-demo">
      <div className="demo-browser-bar">
        <span className="window-dots">
          <i />
          <i />
          <i />
        </span>
        <span>studio.local / the-details</span>
        <span>↗</span>
      </div>
      <div className="pg-canvas">
        <div className="mock-site">
          <div className="mock-site-nav">
            <strong>forma®</strong>
            <span>Objects for everyday.</span>
          </div>
          <div className="mock-site-body">
            <div>
              <p>LESS, BUT CONSIDERED.</p>
              <h4>
                Room
                <br />
                to <em>breathe.</em>
              </h4>
              <span className="mock-site-link">Explore the collection ↗</span>
            </div>
            <div className="sculpture">
              <div className="sculpture-ring" />
              <div className="sculpture-base" />
            </div>
          </div>
          <div
            className={`design-overlay ${overlay ? "overlay-on" : ""}`}
            aria-hidden="true"
          >
            <div className="measure-line measure-top">
              <span>32 px</span>
            </div>
            <div className="measure-line measure-left">
              <span>24 px</span>
            </div>
            <div className="overlay-outline" />
            <span className="measurement-chip">h1 · 48 px / 1.05</span>
          </div>
        </div>
        <div className="pg-toolbar">
          <span className="pg-ghost" aria-hidden="true">
            <Image
              src="/products/pixelghost-mark.png"
              width={19}
              height={19}
              alt=""
              unoptimized
            />
          </span>
          <strong>PixelGhost</strong>
          <span className="toolbar-divider" />
          <button
            type="button"
            aria-pressed={overlay}
            onClick={() => setOverlay(!overlay)}
          >
            {overlay ? "◉" : "○"} Overlay {overlay ? "on" : "off"}
          </button>
          <span className="toolbar-tools" aria-hidden="true">
            ⌖ <span>⌗</span> ⊞
          </span>
        </div>
      </div>
      <p className="demo-hint">INTERACTIVE CONCEPT · TOGGLE THE OVERLAY</p>
    </div>
  );
}
export function YouScrollDemo() {
  return (
    <div className="ys-demo">
      <div className="ys-browser">
        <div className="demo-browser-bar">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
          <span>youtube.com / watch</span>
          <span>↗</span>
        </div>
        <div className="ys-app-nav">
          <span className="youtube-logo">
            <i>▶</i> YouTube
          </span>
          <span className="ys-search">
            Search <span>⌕</span>
          </span>
          <span className="ys-avatar">A</span>
        </div>
        <div className="ys-content">
          <div className="ys-video-column">
            <div className="ys-video">
              <span className="video-kicker">THE ART OF PAYING ATTENTION</span>
              <div className="video-orb" />
              <div className="video-title">
                Find your
                <br />
                <em>flow state.</em>
              </div>
              <div className="video-timeline">
                <span>▶</span>
                <i />
                <span>04:32</span>
              </div>
            </div>
            <div className="ys-video-info">
              <strong>A little space to think.</strong>
              <span>Studio Notes · Creative practice</span>
            </div>
          </div>
          <div
            className="ys-comments"
            tabIndex={0}
            role="region"
            aria-label="Demo comments; scroll independently"
          >
            <div className="comments-header">
              Comments <span>↓</span>
            </div>
            {[
              "This is exactly what I needed today.",
              "The details make all the difference.",
              "Could watch this for hours.",
              "Less noise. More of this.",
              "A small reminder to slow down.",
              "Love how considered this feels.",
            ].map((comment, i) => (
              <div className="demo-comment" key={comment}>
                <i>{["S", "J", "M", "K", "R", "A"][i]}</i>
                <div>
                  <span>@viewer_{i + 1}</span>
                  <p>{comment}</p>
                  <span>
                    ♡ {12 + i * 7} <span>Reply</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ys-floating-tag">
        <span>↕</span> Your scroll. Your space.
      </div>
      <p className="demo-hint">INTERACTIVE CONCEPT · SCROLL THE COMMENTS</p>
    </div>
  );
}
