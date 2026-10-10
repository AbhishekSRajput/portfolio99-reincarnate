import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ApproachCube, ApproachTraits } from "@/components/approach";
import { ContactLens, CopyEmail } from "@/components/contact";
import { HeroLens } from "@/components/hero-lens";
import { Arrow, GithubMark } from "@/components/icons";
import { PixelGhostDemo, YouScrollDemo } from "@/components/product-demos";
import { WorkStack } from "@/components/work-stack";
import { notes, productGuides, profile, projects, traits } from "@/lib/content";
import "./home.css";

const vars = (values: Record<string, number>) => values as CSSProperties;
const pad = (n: number) => String(n).padStart(2, "0");

/** Two stacked arrows; hover slides one out and the next one in. */
function SwapArrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span className={diagonal ? "ar" : "ar ar-right"} aria-hidden="true">
      <Arrow diagonal={diagonal} />
      <Arrow diagonal={diagonal} />
    </span>
  );
}

/**
 * The hero content, rendered twice: once as the readable page and once as the
 * inert blueprint the lens reveals. The blueprint copy has no heading or links.
 */
function HeroContent({ blueprint = false }: { blueprint?: boolean }) {
  const Heading = blueprint ? "div" : "h1";
  const probe = blueprint ? <span className="bl-probe" /> : null;
  return (
    <>
      <div className="hero-grid section-wrap" aria-hidden="true">
        {Array.from({ length: 12 }, (_, n) => (
          <i key={n} style={vars({ "--n": n })} />
        ))}
      </div>
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-inner section-wrap">
        <div className="hero-meta">
          <p className="eyebrow" data-inspect="label">
            The independent practice of {profile.brand}
          </p>
          <p className="eyebrow hero-hint" aria-hidden="true">
            <span className="hint-icon" />
            <span className="hint-fine">Move to inspect</span>
            <span className="hint-touch">Tap to inspect</span>
          </p>
        </div>
        <div className="hero-stage">
          <Heading className="hl" id={blueprint ? undefined : "hero-title"}>
            <span className="hl-line">
              <span className="hl-in" style={vars({ "--d": 0 })}>
                <span className="w">Big</span> <span className="w">picture.</span>
                {probe}
              </span>
            </span>
            <span className="hl-line">
              <span className="hl-in" style={vars({ "--d": 1 })}>
                <span className="w">Every</span> <span className="w serif">little</span>
                {probe}
              </span>
            </span>
            <span className="hl-line">
              <span className="hl-in" style={vars({ "--d": 2 })}>
                <span className="w accent">
                  detail.
                  <svg className="swoosh" viewBox="0 0 390 20" preserveAspectRatio="none" aria-hidden="true">
                    <path pathLength={1} vectorEffect="non-scaling-stroke" d="M3 14Q166 -7 386 11" />
                  </svg>
                </span>
                {probe}
              </span>
            </span>
          </Heading>
          <div className="hero-aside">
            <p data-inspect="p">
              <strong>I take things apart. Figure out what matters.</strong> Then
              build software that feels right, all the way down.
            </p>
            <div className="hero-ctas">
              {blueprint ? (
                <>
                  <span className="pill pill-accent" data-inspect="btn">
                    Explore my work <SwapArrow />
                  </span>
                  <span className="pill pill-ghost" data-inspect="btn">
                    <GithubMark /> GitHub <SwapArrow diagonal />
                  </span>
                </>
              ) : (
                <>
                  <a className="pill pill-accent" href="#work" data-inspect="btn">
                    Explore my work <SwapArrow />
                  </a>
                  <a className="pill pill-ghost" href={profile.github} target="_blank" rel="noreferrer" data-inspect="btn">
                    <GithubMark /> GitHub <SwapArrow diagonal />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bar section-wrap">
        <p className="mono">
          <span className="plus">+</span>Curious mind. Exacting standards.
        </p>
        {blueprint ? (
          <span className="scroll-cue mono">
            <span className="cue-track" />
            Scroll
          </span>
        ) : (
          <a className="scroll-cue mono" href="#work">
            <span className="cue-track" aria-hidden="true">
              <i />
            </span>
            Scroll
          </a>
        )}
        <p className="mono">Design ↔ Code ↔ Ship</p>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <main id="main-content" className="home">
      <HeroLens blueprint={<HeroContent blueprint />}>
        <HeroContent />
      </HeroLens>

      <section id="work" className="work" aria-labelledby="work-title">
        <div className="section-wrap">
          <header className="sec-head">
            <div>
              <p className="eyebrow">
                <span className="idx">01 /</span> Selected work
              </p>
              <h2 className="h2" id="work-title">
                <span className="ln">
                  <span>Small tools.</span>
                </span>
                <span className="ln">
                  <span>
                    <span className="serif-accent">Considered</span> to the core.
                  </span>
                </span>
              </h2>
            </div>
            <p className="lede reveal">
              Made to solve real frustrations. Designed, built, and shipped by me.{" "}
              <span>Two extensions. Free to use.</span>
            </p>
          </header>

          <WorkStack>
            {projects.map((project, index) => (
              <article
                className="card"
                key={project.slug}
                style={vars({ "--i": index })}
                aria-labelledby={`${project.slug}-name`}
              >
                <div className="card-info">
                  <div className="card-main">
                    <div className="card-top">
                      <Image className="card-logo" src={productGuides[project.slug].logo} alt="" width={44} height={44} unoptimized />
                      <p className="mono">
                        {project.category} · {project.year}
                      </p>
                      <p className="mono card-count">
                        {pad(index + 1)} / {pad(projects.length)}
                      </p>
                    </div>
                    <h3 className="card-name" id={`${project.slug}-name`}>
                      {project.name}
                    </h3>
                    <p className="card-tagline">{project.tagline}</p>
                    <p className="card-desc">{project.description}</p>
                    <ul className="card-features">
                      {project.features.map((feature) => (
                        <li key={feature.title}>{feature.title}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="card-foot">
                    <p className="mono card-tags">Chrome extension · {project.tags.join(" / ")}</p>
                    <div className="card-actions">
                      <Link className="pill pill-accent" href={`/products/${project.slug}`}>
                        Explore {project.name} <SwapArrow diagonal />
                      </Link>
                      <a className="tlink" href={project.storeUrl} target="_blank" rel="noreferrer">
                        Chrome Web Store <SwapArrow diagonal />
                      </a>
                    </div>
                  </div>
                </div>
                <div className={`card-visual card-visual-${project.slug}`}>
                  {project.slug === "pixelghost" ? <PixelGhostDemo /> : <YouScrollDemo />}
                </div>
                <span className="card-dim" aria-hidden="true" />
              </article>
            ))}
          </WorkStack>

          <a className="tlink work-more" href={profile.github} target="_blank" rel="noreferrer">
            <GithubMark /> More experiments live on GitHub <SwapArrow diagonal />
          </a>
        </div>
      </section>

      <section id="approach" className="approach" aria-labelledby="approach-title">
        <div className="section-wrap approach-grid">
          <div className="approach-intro">
            <p className="eyebrow">
              <span className="idx">02 /</span> The way I work
            </p>
            <h2 className="h2" id="approach-title">
              <span className="ln">
                <span>The whole picture.</span>
              </span>
              <span className="ln">
                <span className="dim">Nothing left loose.</span>
              </span>
            </h2>
            <p className="lede">
              I work across the stack because real problems don’t respect its
              boundaries. From the first question to the final pixel, I like
              knowing how every piece fits.
            </p>
            <ApproachCube />
            <p className="mono cube-caption">
              Many layers. <span>One way of thinking.</span>
            </p>
          </div>
          <ApproachTraits traits={traits} />
        </div>
        <div className="section-wrap process mono">
          <p>From question to release</p>
          <ol>
            {["Interface", "Systems", "Release", "Upkeep"].map((stage) => (
              <li key={stage}>{stage}</li>
            ))}
          </ol>
        </div>
      </section>

      <section id="journal" className="notebook" aria-labelledby="journal-title">
        <div className="section-wrap">
          <header className="sec-head sec-head-row">
            <div>
              <p className="eyebrow">
                <span className="idx">03 /</span> The notebook
              </p>
              <h2 className="h2" id="journal-title">
                <span className="ln">
                  <span>
                    Thinking <span className="serif-accent">out loud.</span>
                  </span>
                </span>
              </h2>
            </div>
            <Link className="tlink" href="/journal">
              Open the notebook <SwapArrow diagonal />
            </Link>
          </header>
          <ul className="notes">
            {notes.slice(0, 3).map((note) => (
              <li key={note.slug} className="reveal">
                <Link className="note" href={`/journal/${note.slug}`}>
                  <span className="mono note-when">{note.date}</span>
                  <span className="note-main">
                    <span className="mono note-cat">
                      {note.category} · <b>Note in progress</b>
                    </span>
                    <span className="note-title">{note.title}</span>
                    <span className="note-excerpt">{note.excerpt}</span>
                  </span>
                  <span className="note-go" aria-hidden="true">
                    <SwapArrow diagonal />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="contact" aria-label="Contact">
        <div className="section-wrap">
          <div className="contact-top">
            <p className="eyebrow">
              <span className="idx">04 /</span> Let’s make it work
            </p>
            <p className="mono">Good work starts with a conversation.</p>
          </div>
          <ContactLens href={`mailto:${profile.email}`}>
            Something
            <br />
            on your <span className="serif-accent">mind?</span>
          </ContactLens>
          <div className="contact-bottom">
            <p>
              A tricky problem. A small idea. A thing that could be better.{" "}
              <span>Send it my way.</span>
            </p>
            <div className="email-row">
              <a className="email" id="contact-email" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <CopyEmail email={profile.email} targetId="contact-email" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
