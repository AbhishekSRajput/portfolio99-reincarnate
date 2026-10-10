import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Headline as HeadlineLines, ProductChapter, ProductGuide } from "@/lib/content";
import { Arrow } from "./icons";
import { ProductIcon } from "./product-icons";
import { ActionLink, Eyebrow, Headline, KeyLine, Keys, pad } from "./product-ui";

// Sections of the shared product home template. Server Components only.

export function SectionHead({
  index,
  eyebrow,
  id,
  title,
  lede,
  ledeStrong,
  action,
}: {
  index: string;
  eyebrow: string;
  id: string;
  title: HeadlineLines;
  lede?: string;
  ledeStrong?: string;
  action?: ReactNode;
}) {
  return (
    <header className="pp-head">
      <div>
        <Eyebrow index={`${index} /`}>{eyebrow}</Eyebrow>
        <h2 id={id} className="pp-h2">
          <Headline lines={title} />
        </h2>
      </div>
      {lede && (
        <p className="pp-lede">
          {lede} {ledeStrong && <span>{ledeStrong}</span>}
        </p>
      )}
      {action}
    </header>
  );
}

export function ProductHero({
  name,
  storeUrl,
  hero,
}: {
  name: string;
  storeUrl: string;
  hero: ProductGuide["hero"];
}) {
  return (
    <section className="pp-hero" aria-labelledby="product-title">
      <div className="pp-grid-lines section-wrap" aria-hidden="true">
        {Array.from({ length: 12 }, (_, n) => (
          <i key={n} />
        ))}
      </div>
      <div className="section-wrap pp-hero-inner">
        <div className="pp-hero-top">
          <Link href="/#work" className="pp-back">
            ← Selected work
          </Link>
          <Eyebrow index={hero.meta.accent}>{hero.meta.text}</Eyebrow>
        </div>
        <div className="pp-hero-main">
          <div className="pp-hero-copy">
            <Eyebrow index={`${name} /`}>{hero.eyebrow}</Eyebrow>
            <h1 id="product-title" className="pp-hero-title">
              <Headline lines={hero.title} />
            </h1>
            <div className="pp-hero-foot">
              <p>
                <strong>{hero.lead}</strong> {hero.body}
              </p>
              <div className="pp-actions">
                <ActionLink href={storeUrl} variant="accent">
                  Add to Chrome — free
                </ActionLink>
                <ActionLink href={hero.secondary.href} variant="ghost">
                  {hero.secondary.label}
                </ActionLink>
              </div>
            </div>
          </div>
          <figure className="pp-hero-art">
            <div
              className="pp-hero-frame"
              style={{ "--art-pos": hero.image.position } as CSSProperties}
            >
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                sizes="(max-width: 1025px) 100vw, 40vw"
                preload
                unoptimized
              />
            </div>
            <figcaption>
              <span>{hero.image.caption}</span>
              <span>{hero.image.credit}</span>
            </figcaption>
          </figure>
        </div>
        <div className="pp-hero-bar">
          <p className="pp-keynote">
            <span className="pp-plus" aria-hidden="true">
              +
            </span>
            <KeyLine note={hero.note} />
          </p>
          <a className="pp-scroll" href="#overview">
            <span className="pp-scroll-track" aria-hidden="true">
              <i />
            </span>
            Scroll
          </a>
          <p>{hero.motto}</p>
        </div>
      </div>
    </section>
  );
}

export function Overview({ overview }: { overview: ProductGuide["overview"] }) {
  return (
    <section id="overview" className="pp-section" aria-labelledby="overview-title">
      <div className="section-wrap">
        <SectionHead
          index="01"
          eyebrow={overview.eyebrow}
          id="overview-title"
          title={overview.title}
          lede={overview.lede}
          ledeStrong={overview.ledeStrong}
        />
        <dl className="pp-facts">
          {overview.facts.map((fact) => (
            <div className={fact.accent ? "pp-fact is-accent" : "pp-fact"} key={fact.label}>
              <dt>{fact.label}</dt>
              <dd className="pp-fact-value">{fact.value}</dd>
              <dd className="pp-fact-detail">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** A drawn summary of the Screenshot tool built from its documented modes,
 *  editor tools and Steps; not a capture of the extension's interface. */
function CaptureDiagram() {
  const modes = [
    { name: "Area", key: "1", shape: "area" },
    { name: "Visible page", key: "2", shape: "visible" },
    { name: "Full page", key: "3", shape: "full" },
  ];
  const tools = [
    ["M", "Marker"],
    ["A", "Arrow"],
    ["R", "Rectangle"],
    ["T", "Text"],
    ["H", "Highlighter"],
    ["B", "Blur"],
    ["C", "Crop"],
  ];
  return (
    <div
      className="pp-capture"
      role="img"
      aria-label="Screenshot tool summary: area, visible page and full page captures on Alt+Shift+1, 2 and 3; marker, arrow, rectangle, text, highlighter, blur and crop in the editor; and Steps that combine several captures into one picture."
    >
      <div className="pp-capture-row">
        <span>Screenshot</span>
        <span>Recent · last 12</span>
      </div>
      <div className="pp-capture-modes">
        {modes.map((mode) => (
          <div className={`pp-capture-mode is-${mode.shape}`} key={mode.name}>
            <div className="pp-capture-shape">
              <i />
              <i />
              <i />
            </div>
            <b>{mode.name}</b>
            <span>Alt · Shift · {mode.key}</span>
          </div>
        ))}
      </div>
      <div className="pp-capture-group">
        <span>Editor</span>
        <div className="pp-capture-tools">
          {tools.map(([key, label]) => (
            <span key={key}>
              <b>{key}</b>
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="pp-capture-group">
        <span>Steps</span>
        <div className="pp-capture-steps">
          <i>1</i>
          <i>2</i>
          <i>3</i>
          <span>→</span>
          <b>One picture</b>
        </div>
      </div>
    </div>
  );
}

function ChapterVisual({ visual }: { visual: NonNullable<ProductChapter["visual"]> }) {
  return (
    <div className="pp-visual">
      {visual.kind === "image" ? (
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          sizes="(max-width: 1025px) 100vw, 60vw"
          unoptimized
        />
      ) : (
        <CaptureDiagram />
      )}
    </div>
  );
}

function ChapterDetails({ chapter }: { chapter: ProductChapter }) {
  return (
    <>
      {chapter.description && <p className="pp-card-desc">{chapter.description}</p>}
      {chapter.points && (
        <ul className="pp-points">
          {chapter.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
      {chapter.terms && (
        <dl className={chapter.termsLayout === "grid" ? "pp-terms is-grid" : "pp-terms"}>
          {chapter.terms.map((term) => (
            <div key={term.term}>
              <dt>{term.term}</dt>
              <dd>{term.text}</dd>
            </div>
          ))}
        </dl>
      )}
    </>
  );
}

function Chapter({
  chapter,
  index,
  total,
}: {
  chapter: ProductChapter;
  index: number;
  total: number;
}) {
  const titleId = `chapter-${chapter.id}`;
  const split = !chapter.visual || chapter.wide;
  const footnote = chapter.footnote && (
    <p className="pp-card-foot pp-keynote">
      <KeyLine note={chapter.footnote} />
    </p>
  );
  const heading = (
    <>
      <div className="pp-card-top">
        <span className="pp-tile">
          <ProductIcon name={chapter.icon} />
        </span>
        <span>{chapter.kicker}</span>
        <span className="pp-count">
          {pad(index + 1)} / {pad(total)}
        </span>
      </div>
      <h3 id={titleId}>{chapter.title}</h3>
      <p className="pp-tagline">{chapter.tagline}</p>
    </>
  );
  return (
    <article
      id={chapter.id}
      className={split ? "pp-card is-split" : "pp-card"}
      aria-labelledby={titleId}
    >
      {split ? (
        <>
          <div className="pp-card-main">{heading}</div>
          <div className="pp-card-aside">
            <ChapterDetails chapter={chapter} />
            {footnote}
          </div>
          {chapter.visual && <ChapterVisual visual={chapter.visual} />}
        </>
      ) : (
        <>
          <div className="pp-card-info">
            <div className="pp-card-main">
              {heading}
              <ChapterDetails chapter={chapter} />
            </div>
            {footnote}
          </div>
          {chapter.visual && <ChapterVisual visual={chapter.visual} />}
        </>
      )}
    </article>
  );
}

export function Chapters({ chapters }: { chapters: ProductGuide["chapters"] }) {
  return (
    <section id="how-it-works" className="pp-section is-flush" aria-labelledby="chapters-title">
      <div className="section-wrap">
        <SectionHead
          index="02"
          eyebrow={chapters.eyebrow}
          id="chapters-title"
          title={chapters.title}
          action={
            chapters.link && (
              <ActionLink href={chapters.link.href}>{chapters.link.label}</ActionLink>
            )
          }
        />
        <div className="pp-chapters">
          {chapters.items.map((chapter, index) => (
            <Chapter
              chapter={chapter}
              index={index}
              total={chapters.items.length}
              key={chapter.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PaperBand({ paper }: { paper: ProductGuide["paper"] }) {
  return (
    <section className="pp-paper light-section" aria-labelledby="paper-title">
      <div className="section-wrap">
        <SectionHead
          index="03"
          eyebrow={paper.eyebrow}
          id="paper-title"
          title={paper.title}
          lede={paper.lede}
          ledeStrong={paper.ledeStrong}
        />
        <div className="pp-paper-grid">
          <div className="pp-paper-card">
            <div className="pp-paper-card-head">
              <span className="pp-tile">
                <ProductIcon name={paper.card.icon} />
              </span>
              <h3>{paper.card.title}</h3>
            </div>
            <p>{paper.card.body}</p>
            <p className="pp-fine">{paper.card.fine}</p>
            <ActionLink href={paper.card.link.href}>{paper.card.link.label}</ActionLink>
          </div>
          <dl className="pp-rows">
            {paper.terms.map((term) => (
              <div key={term.term}>
                <dt>{term.term}</dt>
                <dd>{term.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Closer({ closer }: { closer: ProductGuide["closer"] }) {
  return (
    <section className="pp-section" aria-labelledby="closer-title">
      <div className="section-wrap">
        <SectionHead
          index="04"
          eyebrow={closer.eyebrow}
          id="closer-title"
          title={closer.title}
          lede={closer.lede}
          ledeStrong={closer.kind === "cards" ? closer.ledeStrong : undefined}
        />
        {closer.kind === "keyboard" ? (
          <div className="pp-split">
            <div>
              <div className="pp-table-wrap">
                <table className="pp-table pp-shortcuts">
                  <caption className="pp-sr">Keyboard shortcuts</caption>
                  <thead>
                    <tr>
                      <th scope="col">Keys</th>
                      <th scope="col">Action</th>
                      <th scope="col">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {closer.shortcuts.map((shortcut) => (
                      <tr key={shortcut.action}>
                        <td>
                          {shortcut.hold && <span className="pp-hold">Hold</span>}
                          <Keys keys={shortcut.keys} />
                        </td>
                        <td>{shortcut.action}</td>
                        <td>{shortcut.when}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ActionLink href={closer.link.href} className="pp-after-table">
                {closer.link.label}
              </ActionLink>
            </div>
            <aside className="pp-notes" aria-labelledby="notes-title">
              <h3 id="notes-title" className="pp-eyebrow">
                <span className="pp-idx">+</span>
                {closer.notesTitle}
              </h3>
              <ul>
                {closer.notes.map((note) => (
                  <li key={note.lead}>
                    <span>{note.lead}</span> {note.text}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        ) : (
          <div className="pp-cards">
            {closer.cards.map((card, index) => (
              <div className="pp-box" key={card.title}>
                <span className="pp-box-idx">{pad(index + 1)}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function Docs({ name, docs }: { name: string; docs: ProductGuide["docs"] }) {
  return (
    <section className="pp-section is-flush" aria-labelledby="docs-title">
      <div className="section-wrap pp-ruled">
        <SectionHead
          index="05"
          eyebrow="Documentation"
          id="docs-title"
          title={[["Everything, ", { text: "written down.", serif: true }]]}
          lede={docs.lede}
          ledeStrong={docs.ledeStrong}
        />
        <ul className="pp-docs" aria-label={`${name} documentation`}>
          {docs.items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="pp-doc">
                <span className="pp-doc-label">
                  {item.label}
                  <Arrow />
                </span>
                <span className="pp-doc-body">
                  <span className="pp-doc-title">{item.title}</span>
                  <span className="pp-doc-text">{item.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
