import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, productGuides } from "@/lib/content";
import { ActionLink, DocIntro, ProductBar } from "@/components/product-ui";

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
    title: `${product.name} third-party notices`,
    description: `Open-source packages distributed with ${product.name}, their versions, sources and licenses.`,
  };
}

// Sources: pixelghost-publicdocs/ and yourscroll-publicdocs/THIRD_PARTY_NOTICES.md.
export default async function NoticesPage({ params }: Props) {
  const { slug } = await params;
  const product = projects.find((entry) => entry.slug === slug);
  if (!product) notFound();
  const { notices } = productGuides[product.slug];

  return (
    <>
      <ProductBar slug={product.slug} current="notices" />
      <main id="main-content" className={`pp pp-${product.slug}`}>
        <DocIntro
          slug={product.slug}
          id="notices-title"
          eyebrow="Open source"
          title={[["Third-party"], [{ text: "notices.", serif: true, accent: true }]]}
          aside={
            <>
              {notices.intro} <span>{notices.introStrong}</span>
            </>
          }
        />
        <div className="section-wrap pp-split pp-notices">
          <div>
            {notices.note && <p className="pp-callout">{notices.note}</p>}
            <div className="pp-table-wrap">
              <table className="pp-table pp-packages">
                <caption className="pp-sr">Third-party packages distributed with {product.name}</caption>
                <thead>
                  <tr>
                    <th scope="col">Package</th>
                    <th scope="col">Version</th>
                    <th scope="col">License</th>
                    <th scope="col">Source</th>
                  </tr>
                </thead>
                {notices.groups.map((group) => (
                  <tbody key={group.title}>
                    <tr className="pp-group">
                      <th scope="colgroup" colSpan={4}>
                        {group.title}
                      </th>
                    </tr>
                    {group.packages.map((item) => (
                      <tr key={item.name}>
                        <td>
                          {item.name}
                          {item.role && <span className="pp-role">{item.role}</span>}
                        </td>
                        <td className="pp-mono-cell">{item.version}</td>
                        <td className="pp-mono-cell">{item.license}</td>
                        <td>
                          <a className="pp-inline-link" href={item.source} target="_blank" rel="noreferrer">
                            {item.sourceLabel}
                          </a>
                        </td>
                      </tr>
                    ))}
                    {group.note && (
                      <tr className="pp-group-note">
                        <td colSpan={4}>{group.note}</td>
                      </tr>
                    )}
                  </tbody>
                ))}
              </table>
            </div>
          </div>
          <aside className="pp-licenses" aria-labelledby="licenses-title">
            <h2 id="licenses-title" className="pp-eyebrow">
              <span className="pp-idx">+</span>
              License texts
            </h2>
            {notices.licenses.map((license) => (
              <details className="pp-license" key={license.name}>
                <summary>
                  <span>
                    <b>{license.name}</b>
                    <span>{license.appliesTo}</span>
                  </span>
                </summary>
                <div>
                  <p className="pp-copyrights">
                    {license.copyrights.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                  {license.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </details>
            ))}
            <div className="pp-paper-card pp-own">
              <p className="pp-eyebrow">{product.name} itself</p>
              <p>{notices.own}</p>
            </div>
            <ActionLink href={`/products/${product.slug}/`}>Back to {product.name}</ActionLink>
          </aside>
        </div>
      </main>
    </>
  );
}
