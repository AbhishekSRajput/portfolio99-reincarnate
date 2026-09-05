import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { Arrow } from "@/components/icons";
import { PixelGhostDemo, YouScrollDemo } from "@/components/product-demos";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = projects.find((p) => p.slug === slug);
  return product ? { title: product.name, description: product.detail } : {};
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = projects.find((p) => p.slug === slug);
  if (!product) notFound();
  return (
    <main id="main-content" className="inner-page product-page section-wrap">
      <Link href="/#work" className="breadcrumb">
        ← Back to selected work
      </Link>
      <div className="product-hero">
        <div>
          <p className="eyebrow">
            {product.name.toUpperCase()} <span> / {product.year}</span>
          </p>
          <h1 className="page-heading">{product.tagline}</h1>
          <p className="page-intro">{product.detail}</p>
          <div className="hero-actions">
            <a
              className="button button-accent"
              href={product.storeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Add to Chrome — free <Arrow diagonal />
            </a>
            {product.sourceUrl && (
              <a
                className="text-link"
                href={product.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                View source <Arrow diagonal />
              </a>
            )}
          </div>
        </div>
        <div className={`project-stage project-${product.slug}`}>
          <div className="project-stage-label mono">
            <span>{product.category}</span>
            <span>{product.year}</span>
          </div>
          {product.slug === "pixelghost" ? (
            <PixelGhostDemo />
          ) : (
            <YouScrollDemo />
          )}
          <div className="project-stage-caption mono">
            {product.visualCaption}
          </div>
        </div>
      </div>
      <p className="eyebrow">
        <span>01 /</span> A SMALL TOOL, THOUGHT ALL THE WAY THROUGH
      </p>
      <div className="feature-grid">
        {product.features.map((feature, index) => (
          <section className="feature-item" key={feature.title}>
            <span className="mono">0{index + 1}</span>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </section>
        ))}
      </div>
      {product.slug === "pixelghost" && (
        <section className="prose">
          <h2>Precision, without the friction.</h2>
          <p>
            Bring in reference images from files, folders, your clipboard, or an
            HTTPS image URL. Work with multiple layers, adjust their position
            and scale, lock them in place, or use blend modes to make
            differences stand out.
          </p>
          <p>
            The toolkit also includes five inspection tools in beta: a color
            picker, page ruler, inspector, element selector, and screenshot
            capture. Save projects and revisit your workspace as your
            implementation evolves.
          </p>
          <p>
            Available in English, German, Spanish, French, Brazilian Portuguese,
            Russian, Japanese, and Simplified Chinese.
          </p>
        </section>
      )}
      <div className="product-links">
        {product.slug === "pixelghost" && (
          <>
            <Link className="text-link" href="/products/pixelghost/privacy">
              Privacy <Arrow diagonal />
            </Link>
            <Link className="text-link" href="/products/pixelghost/support">
              Support & FAQ <Arrow diagonal />
            </Link>
          </>
        )}
        <a
          className="text-link"
          href={`mailto:codecube99@gmail.com?subject=${encodeURIComponent(product.name)}`}
        >
          Get in touch <Arrow diagonal />
        </a>
        <Link
          className="text-link"
          href={`/products/${product.slug === "pixelghost" ? "youscroll" : "pixelghost"}`}
        >
          Next product <Arrow />
        </Link>
      </div>
    </main>
  );
}
