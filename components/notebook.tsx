"use client";
import { useState } from "react";
import Link from "next/link";
import { notes } from "@/lib/content";
import { Arrow } from "./icons";

const filters = [
  "All notes",
  ...new Set(notes.flatMap((note) => [...note.tags])),
];
export function Notebook() {
  const [filter, setFilter] = useState("All notes");
  const visible = notes.filter(
    (note) =>
      filter === "All notes" ||
      (note.tags as readonly string[]).includes(filter),
  );
  return (
    <>
      <div
        className="journal-filters"
        role="group"
        aria-label="Filter notes by topic"
      >
        {filters.map((label) => (
          <button
            type="button"
            key={label}
            aria-pressed={label === filter}
            onClick={() => setFilter(label)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="filter-status" role="status">
        {visible.length} {visible.length === 1 ? "note" : "notes"} in progress
      </p>
      <div className="journal-list">
        {visible.map((note) => (
          <Link
            href={`/journal/${note.slug}`}
            className="journal-row"
            key={note.slug}
          >
            <span className="note-number mono">0{notes.indexOf(note) + 1}</span>
            <div>
              <p className="eyebrow">
                {note.category} <span>· IN PROGRESS</span>
              </p>
              <h2
                style={{ fontSize: "1.3rem", fontWeight: 450, lineHeight: 1.4 }}
              >
                {note.title}
              </h2>
            </div>
            <span className="note-date mono">{note.date}</span>
            <Arrow diagonal />
          </Link>
        ))}
      </div>
    </>
  );
}
