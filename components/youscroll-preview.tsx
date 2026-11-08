"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";

const previews = [
  { id: "widget", label: "Widget", title: "Two little buttons. A whole lot closer.", text: "The floating Social / Play widget keeps your party and playground close to the video. Drag it to a spot that works for you.", image: "preview-party.webp", alt: "Current YouScroll Social and Play widget above the party panel on an illustrative video page.", tag: "The new floating widget" },
  { id: "party", label: "Watch party", title: "Same moment. Your favorite people.", text: "Watch in sync, chat alongside the video and invite friends into your party. Free hosts can bring four people together; Pro hosts can bring eight, including themselves.", image: "preview-party.webp", alt: "YouScroll party chat with two illustrative participants, a synchronization indicator, invitations and settings.", tag: "Sync · chat · invitations" },
  { id: "voice", label: "Voice", title: "Hear the laugh, not just the reaction.", text: "A Pro or trial host enables voice for everyone in the room, including friends on Free accounts. Join the conversation from your party panel.", image: "preview-voice.webp", alt: "YouScroll voice controls with two illustrative muted participants.", tag: "Voice for the whole room" },
  { id: "doodle", label: "Doodle", title: "That bit. Right there.", text: "Circle a detail, sketch a thought or draw right on the moment. Choose your color and brush size, then undo or clear when you are done.", image: "preview-doodle.webp", alt: "Current Doodle panel with colored drawing tools and a drawing over the video.", tag: "A little creative freedom" },
  { id: "reactions", label: "Reactions", title: "Some moments deserve confetti.", text: "Built-in GIFs, hearts, confetti and playful throws add a little mischief. Supported effects can be shared in parties; imported GIFs stay on your device.", image: "preview-reactions.webp", alt: "Current Throw panel with hearts, confetti and colorful effects over an illustrative video.", tag: "GIFs · throws · reactions" },
] as const;

export function YouScrollPreview({ socialAvailable }: { socialAvailable: boolean }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = previews[selected];

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % previews.length;
    else if (event.key === "ArrowLeft") next = (index + previews.length - 1) % previews.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = previews.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  function onDialogKey(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (first && (event.shiftKey ? document.activeElement === first : document.activeElement === last)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    }
  }

  return (
    <div className="ys-preview">
      <div className="ys-preview-tabs ys-js-control" role="tablist" aria-label="Explore YouScroll features">
        {previews.map((preview, index) => (
          <button key={preview.id} type="button" role="tab" id={`${id}-${preview.id}`} aria-controls={`${id}-panel`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} ref={(node) => { tabs.current[index] = node; }} onClick={() => setSelected(index)} onKeyDown={(event) => onTabKey(event, index)}>
            <span className="ys-tab-number" aria-hidden="true">0{index + 1}</span>{preview.label}
          </button>
        ))}
      </div>
      <div className="ys-preview-body" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${current.id}`} tabIndex={0}>
        <div className="ys-preview-screen">
          <div className="ys-browser-bar" aria-hidden="true"><span><i /><i /><i /></span><span>YouScroll / product preview</span><span>↗</span></div>
          <Image src={`/products/youscroll/${current.image}`} alt={current.alt} width={1280} height={800} unoptimized loading="lazy" />
          <button ref={opener} type="button" className="ys-preview-expand ys-js-control" onClick={() => dialog.current?.showModal()} aria-haspopup="dialog">View full size <span aria-hidden="true">↗</span></button>
        </div>
        <div className="ys-preview-caption">
          <div><p className="ys-eyebrow">{current.tag}</p><h3>{current.title}</h3></div>
          <p>{current.text}</p>
        </div>
      </div>
      <p className="ys-demo-note"><span aria-hidden="true">◉</span> Interactive preview · real UI, illustrative participants. {socialAvailable ? "This preview does not connect to a party or use your microphone." : "Social and voice are coming soon. No live connection or microphone access."}</p>
      <noscript>
        <style>{`.ys-js-control{display:none!important}`}</style>
        <div className="ys-preview-fallback">
          {previews.slice(1).map((preview) => <div key={preview.id}><h3>{preview.label}</h3><p>{preview.text}</p></div>)}
        </div>
      </noscript>
      <dialog ref={dialog} className="ys-lightbox" aria-labelledby={`${id}-dialog-title`} onKeyDown={onDialogKey} onClose={() => opener.current?.focus()} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="ys-lightbox-inner">
          <div className="ys-lightbox-top"><h2 id={`${id}-dialog-title`}>{current.label} · product preview</h2><button type="button" onClick={() => dialog.current?.close()} autoFocus aria-label="Close enlarged preview">Close <span aria-hidden="true">×</span></button></div>
          <Image src={`/products/youscroll/${current.image}`} alt={current.alt} width={1280} height={800} unoptimized />
          <p>{current.text}</p>
        </div>
      </dialog>
    </div>
  );
}
