"use client";
import { useEffect, useState } from "react";

type Props = {
  label: string;
  chapters: readonly { id: string; name: string }[];
};

/* The sticky index highlights the chapter you are reading. The two-column
   layout below 768px is not sticky, so the highlight is skipped there. */
export function FieldGuideNav({ label, chapters }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const ids = chapters.map((chapter) => chapter.id).join(" ");

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const chapterIds = ids.split(" ");
    let observer: IntersectionObserver | null = null;

    /* A chapter is current once its top passes a line a quarter down the
       viewport, so the last chapter above that line wins. */
    function sync() {
      const line = window.innerHeight * 0.25;
      let current: string | null = null;
      for (const id of chapterIds) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) current = id;
      }
      setActiveId(current);
    }

    function watch() {
      if (!wide.matches) {
        observer?.disconnect();
        observer = null;
        setActiveId(null);
        return;
      }
      if (observer) return sync();
      /* The observer only schedules the work: it fires as a chapter edge
         crosses the line, which is exactly when the highlight moves. */
      observer = new IntersectionObserver(sync, {
        rootMargin: "-25% 0px -75% 0px",
      });
      for (const id of chapterIds) {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      }
      sync();
    }

    watch();
    wide.addEventListener("change", watch);
    window.addEventListener("resize", watch, { passive: true });
    return () => {
      observer?.disconnect();
      wide.removeEventListener("change", watch);
      window.removeEventListener("resize", watch);
    };
  }, [ids]);

  return (
    <nav aria-label={label}>
      {chapters.map((chapter) => (
        <a
          href={`#${chapter.id}`}
          key={chapter.id}
          aria-current={chapter.id === activeId ? "true" : undefined}
        >
          {chapter.name}<span aria-hidden="true">↗</span>
        </a>
      ))}
    </nav>
  );
}
