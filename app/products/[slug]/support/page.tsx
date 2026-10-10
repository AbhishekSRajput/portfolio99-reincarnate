import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { profile, projects, productGuides } from "@/lib/content";
import { Arrow, GithubMark } from "@/components/icons";
import { SectionHead } from "@/components/product-home";
import { ProductIcon } from "@/components/product-icons";
import { ActionLink, DocIntro, Eyebrow, Headline, ProductBar, pad } from "@/components/product-ui";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = projects.find((entry) => entry.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} support`,
    description: `Get help with ${product.name}: search known issues, report a bug or suggest an improvement on GitHub, and see what to include.`,
  };
}

// Sources: pixelghost-publicdocs/ISSUES.md and yourscroll-publicdocs/ISSUES.md.
export default async function SupportPage({ params }: Props) {
  const { slug } = await params;
  const product = projects.find((entry) => entry.slug === slug);
  if (!product) notFound();
  const { support } = productGuides[product.slug];
  const { repo } = support;

  return (
    <>
      <ProductBar slug={product.slug} current="support" />
      <main id="main-content" className={`pp pp-${product.slug}`}>
        <DocIntro
          slug={product.slug}
          id="support-title"
          eyebrow="Support & issues"
          title={[["Let’s sort"], [{ text: "it out.", serif: true, accent: true }]]}
        >
          <div className="pp-support-hero">
            <div className="pp-support-copy">
              <p>
                <strong>{support.intro.strong}</strong> {support.intro.body}
              </p>
              <div className="pp-actions">
                <ActionLink href={repo.issuesUrl} variant="accent">
                  <GithubMark /> Go to GitHub Issues
                </ActionLink>
                <ActionLink href="#before" variant="ghost">
                  Check before you report
                </ActionLink>
              </div>
            </div>
            <a className="pp-gh-card" href={repo.issuesUrl} target="_blank" rel="noreferrer">
              <span className="pp-gh-top">
                <span>Where reports go</span>
                <Arrow diagonal />
              </span>
              <span className="pp-gh-repo">
                <span className="pp-gh-mark" aria-hidden="true">
                  <GithubMark />
                </span>
                <span>
                  <span className="pp-gh-name">
                    {repo.owner} / <b>{repo.name}</b>
                  </span>
                  <span className="pp-gh-url">{repo.issuesUrl.replace("https://", "")}</span>
                </span>
              </span>
              <span className="pp-gh-kinds">
                <span>
                  <b>Report a bug</b>Something broke or behaves oddly.
                </span>
                <span>
                  <b>Get help</b>Not sure how something works.
                </span>
                <span>
                  <b>Suggest</b>An improvement worth making.
                </span>
              </span>
            </a>
          </div>
        </DocIntro>

        <section className="pp-section is-tight" aria-labelledby="how-title">
          <div className="section-wrap pp-ruled">
            <SectionHead
              index="01"
              eyebrow="How reporting works"
              id="how-title"
              title={[["Four steps. ", { text: "One thread.", serif: true }]]}
              lede="Each problem gets a single public issue."
              ledeStrong="Updates, fixes and workarounds are posted there."
            />
            <ol className="pp-steps">
              {support.steps.map((step, index) => (
                <li key={step.title}>
                  <span className="pp-box-idx">{pad(index + 1)}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  {step.link && (
                    <ActionLink href={step.link === "issues" ? repo.issuesUrl : repo.newIssueUrl}>
                      {step.link === "issues" ? "Search issues" : "New issue"}
                    </ActionLink>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="before" className="pp-section is-tight is-flush" aria-labelledby="before-title">
          <div className="section-wrap">
            <SectionHead
              index="02"
              eyebrow="Before opening an issue"
              id="before-title"
              title={support.checks.title}
              lede={support.checks.lede}
              ledeStrong={support.checks.ledeStrong}
            />
            <div className="pp-cards">
              {support.checks.items.map((item) => (
                <div className="pp-box" key={item.title}>
                  <span className="pp-tile">
                    <ProductIcon name={item.icon} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {item.link && <ActionLink href={item.link.href}>{item.link.label}</ActionLink>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pp-section is-tight is-flush" aria-labelledby="include-title">
          <div className="section-wrap pp-ruled pp-split">
            <div className="pp-include">
              <Eyebrow index="03 /">What to include</Eyebrow>
              <h2 id="include-title" className="pp-h2">
                <Headline lines={[["A good report ", { text: "travels fast.", serif: true }]]} />
              </h2>
              <ul className="pp-points is-large">
                {support.include.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <figure className="pp-template">
              <div>
                <p className="pp-template-bar">
                  <span>Issue outline</span>
                  <span>Markdown</span>
                </p>
                <pre>
                  {support.template.map((line, index) => (
                    <span
                      key={index}
                      className={
                        line.startsWith("**") ? "is-field" : line.startsWith("###") ? "is-heading" : undefined
                      }
                    >
                      {line}
                      {"\n"}
                    </span>
                  ))}
                </pre>
              </div>
              <figcaption>Paste this into a new issue and fill it in</figcaption>
            </figure>
          </div>
        </section>

        <section className="pp-paper light-section" aria-labelledby="private-title">
          <div className="section-wrap">
            <SectionHead
              index="04"
              eyebrow="Privacy and security"
              id="private-title"
              title={[["Issues are ", { text: "public.", serif: true }]]}
              lede="Anyone can read a GitHub issue."
              ledeStrong="Crop or redact anything you choose to share."
            />
            <div className="pp-paper-grid">
              <div className="pp-paper-card">
                <p className="pp-eyebrow">Keep out of GitHub</p>
                <p className="pp-statement">{support.privacy.keepOut}</p>
                {support.privacy.note && <p className="pp-fine">{support.privacy.note}</p>}
              </div>
              <div className="pp-paper-card is-ink">
                <p className="pp-eyebrow">Email instead</p>
                <p className="pp-statement">{support.privacy.emailFor}</p>
                <ActionLink
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(`${product.name} support`)}`}
                  variant="accent"
                  arrow="diagonal"
                >
                  {profile.email}
                </ActionLink>
              </div>
            </div>
          </div>
        </section>

        <section className="pp-section" aria-labelledby="faq-title">
          <div className="section-wrap pp-split">
            <div className="pp-faq-intro">
              <Eyebrow index="05 /">Quick answers</Eyebrow>
              <h2 id="faq-title" className="pp-h2 is-small">
                <Headline lines={[["Maybe it’s ", { text: "one of these.", serif: true }]]} />
              </h2>
              <p className="pp-lede">
                Still stuck?{" "}
                <a className="pp-inline-link" href={repo.newIssueUrl} target="_blank" rel="noreferrer">
                  Open an issue on GitHub
                </a>
                .
              </p>
            </div>
            <div className="pp-faq">
              {support.faq.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <nav className="section-wrap pp-doc-links" aria-label={`More ${product.name} help`}>
          {productGuides[product.slug].hasGuide && (
            <ActionLink href={`/products/${product.slug}/guide/`}>Tools guide</ActionLink>
          )}
          <ActionLink href={`/products/${product.slug}/privacy/`}>Privacy policy</ActionLink>
          <ActionLink href={`/products/${product.slug}/`} className="pp-push">
            Back to {product.name}
          </ActionLink>
        </nav>
      </main>
    </>
  );
}
