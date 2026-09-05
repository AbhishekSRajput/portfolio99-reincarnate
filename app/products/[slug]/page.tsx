import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile, projects, productGuides } from "@/lib/content";
import { Arrow } from "@/components/icons";
import { ProductFieldGuide } from "@/components/product-field-guide";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = projects.find((entry) => entry.slug === slug);
  return product ? { title: product.name, description: product.detail } : {};
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = projects.find((entry) => entry.slug === slug);
  if (!product) notFound();
  const guide = productGuides[product.slug];
  const nextProduct = projects.find((entry) => entry.slug !== product.slug)!;

  return (
    <main id="main-content" className={`product-landing landing-${product.slug}`}>
      <div className="product-subnav section-wrap">
        <Link href="/#work" className="breadcrumb">← Selected work</Link>
        <nav aria-label={`${product.name} navigation`}>
          <a href="#how-it-works">How it works</a>
          <Link href={`/products/${product.slug}/privacy/`}>Privacy</Link>
          <a href="#product-help">Help</a>
        </nav>
      </div>

      <section className="product-masthead section-wrap" aria-labelledby="product-title">
        <div className="product-masthead-copy">
          <div className="product-identity">
            <Image src={guide.logo} alt="" width={48} height={48} unoptimized />
            <div><p>{product.name}</p><span className="mono">{guide.label}</span></div>
          </div>
          <h1 id="product-title">{product.tagline}</h1>
          <p className="page-intro">{product.detail}</p>
          <div className="hero-actions">
            <a className="button button-accent" href={product.storeUrl} target="_blank" rel="noreferrer">
              Add to Chrome <Arrow diagonal />
            </a>
            <a className="text-link" href="#how-it-works">Explore the tools <Arrow /></a>
          </div>
          <ul className="product-facts" aria-label="Product highlights">
            {guide.quickFacts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
        </div>
        <figure className="product-hero-visual">
          <div className="product-image-frame">
            <div className="product-image-top mono"><span>{product.name}</span><span>IN THE BROWSER ↗</span></div>
            <Image src={guide.heroImage} alt={guide.heroAlt} width={1280} height={800} preload unoptimized />
          </div>
          <figcaption><span className="mono">{guide.heroCaption}</span><span>Supplied product preview</span></figcaption>
        </figure>
      </section>

      <section className="product-start light-section" aria-labelledby="start-title">
        <div className="section-wrap">
          <div className="product-section-heading">
            <p className="eyebrow">MEET {product.name.toUpperCase()}</p>
            <h2 id="start-title">{guide.promise}</h2>
            <p>{guide.summary}</p>
          </div>
          <ol className="product-steps">
            {guide.setup.map((step, index) => (
              <li key={step.title}><span className="mono">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <ProductFieldGuide
        productName={product.name}
        title={guide.guideTitle}
        introduction={guide.guideIntro}
        chapters={guide.tools}
      />

      <section className="product-privacy-band section-wrap" aria-labelledby="privacy-title">
        <div><p className="eyebrow">PRIVACY, CONSIDERED</p><h2 id="privacy-title">{guide.privacyTitle}</h2></div>
        <div><p>{guide.privacySummary}</p><Link className="text-link" href={`/products/${product.slug}/privacy/`}>Read the full privacy policy <Arrow diagonal /></Link></div>
      </section>

      <section id="product-help" className="product-help section-wrap" aria-labelledby="help-title">
        <div><p className="eyebrow">A FEW USEFUL ANSWERS</p><h2 id="help-title">Keep things moving.</h2><a className="text-link" href={guide.issuesUrl} target="_blank" rel="noreferrer">Get support on GitHub <Arrow diagonal /></a></div>
        <div className="faq-list">
          {guide.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
        </div>
      </section>

      <div className="product-links section-wrap">
        <Link className="text-link" href={`/products/${product.slug}/privacy/`}>Privacy policy <Arrow diagonal /></Link>
        {product.slug === "pixelghost" && <Link className="text-link" href="/products/pixelghost/support/">Support & FAQ <Arrow diagonal /></Link>}
        <a className="text-link" href={`mailto:${profile.email}?subject=${encodeURIComponent(product.name)}`}>Get in touch <Arrow diagonal /></a>
        <Link className="text-link next-product" href={`/products/${nextProduct.slug}/`}>Meet {nextProduct.name} <Arrow /></Link>
      </div>
    </main>
  );
}
