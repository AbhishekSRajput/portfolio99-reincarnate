import Image from "next/image";
import { ProductLink } from "./product-link";
import { isExternalHref } from "@/lib/site-urls";
import type { ReactNode } from "react";
import {
  productGuides,
  projects,
  type Headline as HeadlineLines,
  type KeyNote,
} from "@/lib/content";
import { Arrow, CubeMark } from "./icons";
import { ThemeToggle } from "./site-shell";

// Shared building blocks for product homes and their documentation pages.

export type ProductSlug = (typeof projects)[number]["slug"];
export type ProductPage = "overview" | "guide" | "support" | "privacy" | "notices";

export const pad = (n: number) => String(n).padStart(2, "0");

export function getProduct(slug: string) {
  return projects.find((entry) => entry.slug === slug);
}

/** Renders headline lines with serif, accent, dimmed, and swoosh phrases. */
export function Headline({ lines }: { lines: HeadlineLines }) {
  return lines.map((line, index) => (
    <span className="pp-line" key={index}>
      {line.map((phrase, part) => {
        if (typeof phrase === "string") return <span key={part}>{phrase}</span>;
        const className = [
          phrase.serif && "pp-serif",
          phrase.accent && "pp-accent",
          phrase.dim && "pp-dim",
          phrase.swoosh && "pp-swooshed",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <span className={className} key={part}>
            {phrase.text}
            {phrase.swoosh && (
              <svg
                className="pp-swoosh"
                viewBox="0 0 390 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path pathLength={1} vectorEffect="non-scaling-stroke" d="M3 14Q166 -7 386 11" />
              </svg>
            )}
          </span>
        );
      })}
    </span>
  ));
}

export function Keys({ keys }: { keys: readonly string[] }) {
  return (
    <span className="pp-keys">
      {keys.map((key) => (
        <kbd key={key}>{key}</kbd>
      ))}
    </span>
  );
}

export function KeyLine({ note }: { note: KeyNote }) {
  return (
    <>
      {note.before}
      {note.keys && <Keys keys={note.keys} />}
      {note.after}
    </>
  );
}

type ArrowKind = "diagonal" | "right" | "down";

function ArrowIcon({ kind }: { kind: ArrowKind }) {
  return <Arrow diagonal={kind === "diagonal"} down={kind === "down"} />;
}

/** A link styled as a pill or text link. External destinations open in a
 *  new tab; owned site routes use native document navigation. */
export function ActionLink({
  href,
  children,
  variant = "text",
  arrow,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "accent" | "ghost" | "text";
  arrow?: ArrowKind;
  className?: string;
}) {
  const external = isExternalHref(href);
  const kind: ArrowKind = arrow ?? (external ? "diagonal" : href.startsWith("#") ? "down" : "right");
  const classes = [
    variant === "text" ? "pp-link" : `pp-pill pp-pill-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      {children}
      <ArrowIcon kind={kind} />
    </>
  );
  if (external)
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  if (href.startsWith("#") || href.startsWith("mailto:"))
    return (
      <a className={classes} href={href}>
        {content}
      </a>
    );
  return (
    <ProductLink className={classes} href={href}>
      {content}
    </ProductLink>
  );
}

export function Eyebrow({
  index,
  children,
  as: Tag = "p",
}: {
  index?: string;
  children: ReactNode;
  as?: "p" | "h2" | "h3";
}) {
  return (
    <Tag className="pp-eyebrow">
      {index && <span className="pp-idx">{index}</span>}
      {children}
    </Tag>
  );
}

/** The product's own top bar, which replaces the site header on product
 *  routes: home link, product pages, theme, and installation. */
export function ProductBar({ slug, current }: { slug: ProductSlug; current: ProductPage }) {
  const product = getProduct(slug)!;
  const guide = productGuides[slug];
  const links = [
    { page: "overview", label: "Overview", href: `/products/${slug}/` },
    ...(guide.hasGuide
      ? [{ page: "guide", label: "Tools guide", href: `/products/${slug}/guide/` }]
      : []),
    { page: "support", label: "Support", href: `/products/${slug}/support/` },
    { page: "privacy", label: "Privacy", href: `/products/${slug}/privacy/` },
  ];
  return (
    <header className="pp pp-bar section-wrap">
      <div className="pp-bar-start">
        <ProductLink href="/" className="pp-home" aria-label="CodeCube99 home">
          <CubeMark />
        </ProductLink>
        <span className="pp-pipe" aria-hidden="true" />
        <ProductLink href={`/products/${slug}/`} className="pp-bar-id">
          <Image src={guide.logo} alt="" width={32} height={32} unoptimized />
          <span className="pp-bar-name">{product.name}</span>
          <span className="pp-bar-label">{guide.label}</span>
        </ProductLink>
      </div>
      <nav aria-label={`${product.name} pages`}>
        {links.map((link) => (
          <ProductLink
            key={link.page}
            href={link.href}
            aria-current={current === link.page ? "page" : undefined}
          >
            {link.label}
          </ProductLink>
        ))}
        <span className="pp-bar-actions">
          <ThemeToggle isHome={false} />
          <ActionLink href={product.storeUrl} variant="accent" className="pp-pill-sm">
            Add to Chrome
          </ActionLink>
        </span>
      </nav>
    </header>
  );
}

/** Title block for a product's documentation pages. */
export function DocIntro({
  slug,
  id,
  eyebrow,
  title,
  aside,
  children,
}: {
  slug: ProductSlug;
  id: string;
  eyebrow: string;
  title: HeadlineLines;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  const product = getProduct(slug)!;
  return (
    <section className="pp-doc-intro section-wrap" aria-labelledby={id}>
      <ProductLink href={`/products/${slug}/`} className="pp-back">
        ← {product.name}
      </ProductLink>
      <div className="pp-doc-head">
        <div>
          <Eyebrow index={`${product.name} /`}>{eyebrow}</Eyebrow>
          <h1 id={id} className="pp-display">
            <Headline lines={title} />
          </h1>
        </div>
        {aside && <p className="pp-lede">{aside}</p>}
      </div>
      {children}
    </section>
  );
}

/** A numbered section of a long document, addressable from the Toc. */
export function DocSection({
  id,
  index,
  title,
  className,
  children,
}: {
  id: string;
  index: number;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={className}>
      <h2 id={`${id}-title`}>
        <span className="pp-n">{pad(index)}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Section links for long documents; sticky beside the text on desktop. */
export function Toc({
  label,
  items,
  children,
}: {
  label: string;
  items: readonly { id: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <nav className="pp-toc" aria-label={label}>
      <p className="pp-eyebrow">{label}</p>
      <ol>
        {items.map((item, index) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>
              <span>{pad(index + 1)}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
      {children}
    </nav>
  );
}
