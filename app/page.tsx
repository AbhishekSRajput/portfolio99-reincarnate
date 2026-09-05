import Link from "next/link";
import { Arrow, CubeMark, GithubMark } from "@/components/icons";
import { HeroCube } from "@/components/hero-cube";
import { PixelGhostDemo, YouScrollDemo } from "@/components/product-demos";
import { projects, notes, traits } from "@/lib/content";

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero section-wrap" aria-labelledby="hero-title">
        <div className="hero-topline mono">
          <span>
            <i className="status-dot" /> SOFTWARE GENERALIST & INDEPENDENT
            BUILDER
          </span>
          <span className="hero-edition">PORTFOLIO / VOL. 026</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">THE INDEPENDENT PRACTICE OF CODECUBE99</p>
            <h1 id="hero-title">
              Big picture.
              <br />
              Every <span className="serif-accent">little</span>
              <br />
              <span className="orange-word">
                detail.
                <svg viewBox="0 0 390 20" aria-hidden="true">
                  <path d="M3 14Q166 -7 386 11" />
                </svg>
              </span>
            </h1>
            <p className="hero-description">
              I take things apart. Figure out what matters.
              <br className="desktop-break" /> Then build software that feels
              right, all the way down.
            </p>
            <div className="hero-actions">
              <a className="button button-accent" href="#work">
                Explore my work <Arrow />
              </a>
              <a
                className="text-link"
                href="https://github.com/AbhishekSRajput"
                target="_blank"
                rel="noreferrer"
              >
                <GithubMark /> GitHub <Arrow diagonal />
              </a>
            </div>
          </div>
          <HeroCube />
        </div>
        <div className="hero-bottom">
          <p>
            <span className="tiny-plus">+</span> CURIOUS MIND. EXACTING
            STANDARDS.
          </p>
          <a href="#work" className="scroll-cue">
            <span>SCROLL TO EXPLORE</span>
            <Arrow down />
          </a>
          <p className="hero-coordinate">DESIGN ↔ CODE ↔ SHIP</p>
        </div>
      </section>
      <section id="work" className="work-section light-section">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span>01 /</span> SELECTED WORK
              </p>
              <h2>
                Small tools.
                <br />
                <span className="serif-accent">Considered</span> to the core.
              </h2>
            </div>
            <p>
              Made to solve real frustrations.
              <br />
              Designed, built, and shipped by me.
              <br />
              <span className="subtle">Two extensions. Free to use.</span>
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card project-${project.slug}`}
                key={project.slug}
              >
                <div className="project-stage">
                  <div className="project-stage-label mono">
                    <span>
                      <i /> {project.category}
                    </span>
                    <span>
                      0{index + 1} / 0{projects.length}
                    </span>
                  </div>
                  {project.slug === "pixelghost" ? (
                    <PixelGhostDemo />
                  ) : (
                    <YouScrollDemo />
                  )}
                  <div className="project-stage-caption mono">
                    {project.visualCaption}
                    <span>↗</span>
                  </div>
                </div>
                <div className="project-info">
                  <div>
                    <p className="eyebrow">
                      CHROME EXTENSION <span>· {project.year}</span>
                    </p>
                    <h3>
                      <Link href={`/products/${project.slug}`}>
                        {project.name}
                        <Arrow diagonal />
                      </Link>
                    </h3>
                    <p>{project.description}</p>
                  </div>
                  <div className="project-bottom">
                    <span>{project.tags.join(" / ")}</span>
                    <Link
                      href={`/products/${project.slug}`}
                      className="text-link"
                    >
                      Explore product <Arrow diagonal />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <a
            className="work-github text-link"
            href="https://github.com/AbhishekSRajput"
            target="_blank"
            rel="noreferrer"
          >
            <GithubMark /> More experiments live on GitHub <Arrow diagonal />
          </a>
        </div>
      </section>
      <section id="approach" className="approach-section section-wrap">
        <div className="approach-intro">
          <p className="eyebrow">
            <span>02 /</span> THE WAY I WORK
          </p>
          <h2>
            The whole picture.
            <br />
            <span className="muted-heading">Nothing left loose.</span>
          </h2>
          <p>
            I work across the stack because real problems don’t respect its
            boundaries. From the first question to the final pixel, I like
            knowing how every piece fits.
          </p>
          <div className="craft-stamp">
            <CubeMark />
            <span>
              THOUGHTFULLY BUILT.
              <br />
              PERSONALLY ACCOUNTABLE.
            </span>
          </div>
        </div>
        <div className="traits">
          {traits.map((trait) => (
            <article key={trait.number} className="trait">
              <span className="trait-number mono">{trait.number}</span>
              <div>
                <h3>
                  {trait.title}
                  <span className="trait-symbol" aria-hidden="true">
                    {trait.symbol}
                  </span>
                </h3>
                <p>{trait.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="capability-strip mono">
          <span>FROM QUESTION TO RELEASE</span>
          <span>
            INTERFACE <i>↗</i>
          </span>
          <span>
            SYSTEMS <i>↗</i>
          </span>
          <span>
            RELEASE <i>↗</i>
          </span>
          <span>
            UPKEEP <i>↗</i>
          </span>
        </div>
      </section>
      <section id="journal" className="journal-section light-section">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span>03 /</span> THE NOTEBOOK
              </p>
              <h2>
                Thinking <span className="serif-accent">out loud.</span>
              </h2>
            </div>
            <Link className="text-link" href="/journal">
              Open the notebook <Arrow diagonal />
            </Link>
          </div>
          <div className="journal-list">
            {notes.slice(0, 3).map((note, index) => (
              <Link
                className="journal-row"
                href={`/journal/${note.slug}`}
                key={note.slug}
              >
                <span className="note-number mono">0{index + 1}</span>
                <div>
                  <p className="eyebrow">
                    {note.category} <span>· NOTE IN PROGRESS</span>
                  </p>
                  <h3>{note.title}</h3>
                </div>
                <span className="note-date mono">{note.date}</span>
                <Arrow diagonal />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="contact-section section-wrap">
        <div className="contact-top">
          <p className="eyebrow">
            <span>04 /</span> LET’S MAKE IT WORK
          </p>
          <span className="mono">GOOD WORK STARTS WITH A CONVERSATION.</span>
        </div>
        <a className="contact-headline" href="mailto:codecube99@gmail.com">
          Something
          <br />
          on your <span className="serif-accent">mind?</span>
          <span className="contact-arrow">
            <Arrow diagonal />
          </span>
        </a>
        <div className="contact-bottom">
          <p>
            A tricky problem. A small idea. A thing that could be better.
            <br />
            <span>Send it my way.</span>
          </p>
          <a className="contact-email" href="mailto:codecube99@gmail.com">
            codecube99@gmail.com <Arrow diagonal />
          </a>
        </div>
      </section>
    </main>
  );
}
