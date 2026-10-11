import type { Metadata } from "next";
import Image from "next/image";
import { ProductLink } from "@/components/product-link";
import { productMetadata, productStructuredData } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import { notFound } from "next/navigation";
import { profile, projects, productGuides } from "@/lib/content";
import { Arrow } from "@/components/icons";
import {
  Chapters,
  Closer,
  Docs,
  Overview,
  PaperBand,
  ProductHero,
} from "@/components/product-home";
import { ActionLink, Eyebrow, Headline, ProductBar } from "@/components/product-ui";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = projects.find((entry) => entry.slug === slug);
  if (!product) return {};
  return productMetadata(product.slug, "", `${product.name} — ${product.tagline}`, product.description);
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = projects.find((entry) => entry.slug === slug);
  if (!product) notFound();
  const guide = productGuides[product.slug];
  const nextProduct = projects.find((entry) => entry.slug !== product.slug)!;
  const next = productGuides[nextProduct.slug];

  return (
    <>
      <StructuredData data={productStructuredData(product)} />
      <ProductBar slug={product.slug} current="overview" />
      <main id="main-content" className={`pp pp-${product.slug}`}>
        <ProductHero name={product.name} storeUrl={product.storeUrl} hero={guide.hero} />
        <Overview overview={guide.overview} />
        <Chapters chapters={guide.chapters} />
        <PaperBand paper={guide.paper} />
        <Closer closer={guide.closer} />
        <Docs name={product.name} docs={guide.docs} />

        <section className="pp-cta" aria-labelledby="cta-title">
          <div className="section-wrap pp-cta-inner">
            <div className="pp-cta-top">
              <Eyebrow index="06 /">{guide.cta.eyebrow}</Eyebrow>
              <p className="pp-eyebrow">Free on the Chrome Web Store</p>
            </div>
            <h2 id="cta-title" className="pp-cta-title">
              <Headline lines={guide.cta.title} />
            </h2>
            <div className="pp-cta-foot">
              <p>
                {guide.cta.text} Questions, privacy requests and support:{" "}
                <a className="pp-inline-link" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </p>
              <div className="pp-actions">
                <ActionLink href={product.storeUrl} variant="accent">
                  Add to Chrome
                </ActionLink>
                {guide.cta.secondary && (
                  <ActionLink href={guide.cta.secondary.href} variant="ghost">
                    {guide.cta.secondary.label}
                  </ActionLink>
                )}
              </div>
            </div>
            <ProductLink className="pp-next" href={`/products/${nextProduct.slug}/`}>
              <Image src={next.logo} alt="" width={52} height={52} unoptimized />
              <span className="pp-next-text">
                <span className="pp-eyebrow">Next product · {nextProduct.category}</span>
                <span className="pp-next-title">
                  {nextProduct.name} — <span className="pp-serif pp-accent">{next.nextLine}</span>
                </span>
              </span>
              <Arrow />
            </ProductLink>
          </div>
        </section>
      </main>
    </>
  );
}
