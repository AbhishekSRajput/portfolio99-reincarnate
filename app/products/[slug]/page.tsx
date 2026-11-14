import type { Metadata } from "next";
import Image from "next/image";
import { ProductLink } from "@/components/product-link";
import { productMetadata, productStructuredData } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import { notFound } from "next/navigation";
import { productEmail, projects, productGuides } from "@/lib/content";
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
import { MascotGaze } from "@/components/mascot-gaze";
import { HappyGhost } from "@/components/pixelghost-mascot";
import { YouScrollHome } from "@/components/youscroll-home";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = projects.find((entry) => entry.slug === slug);
  if (!product) return {};
  const metadata = productMetadata(product.slug, "", `${product.name} — ${product.tagline}`, product.description);
  if (product.slug === "pixelghost" || product.slug === "youscroll") {
    // Both product hosts verify ownership from their static home documents.
    // Keep this public token after Google verification succeeds.
    metadata.verification = {
      google: "sVmyznoXrEYEPZoI7Gx5pbyZhJ99qJJsw-zRDTMmFQI",
    };
  }
  return metadata;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = projects.find((entry) => entry.slug === slug);
  if (!product) notFound();
  const guide = productGuides[product.slug];
  const nextProduct = projects.find((entry) => entry.slug !== product.slug)!;
  const next = productGuides[nextProduct.slug];

  if (product.slug === "youscroll") {
    return <><StructuredData data={productStructuredData(product)} /><ProductBar slug="youscroll" current="overview" /><YouScrollHome /></>;
  }

  return (
    <>
      <StructuredData data={productStructuredData(product)} />
      <ProductBar slug={product.slug} current="overview" />
      <main id="main-content" className={`pp pp-${product.slug}`}>
        <ProductHero
          name={product.name}
          storeUrl={product.storeUrl}
          hero={guide.hero}
          visual={
            // PixelGhost's home shows its mascot, happy, in place of the store artwork.
            product.slug === "pixelghost"
              ? {
                  node: (
                    <MascotGaze className="pp-stage">
                      <HappyGhost />
                    </MascotGaze>
                  ),
                  caption: product.tagline,
                  credit: "The PixelGhost mascot",
                }
              : undefined
          }
        />
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
                <a className="pp-inline-link" href={`mailto:${productEmail[product.slug]}`}>
                  {productEmail[product.slug]}
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
