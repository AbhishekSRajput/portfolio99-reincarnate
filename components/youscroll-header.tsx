import Image from "next/image";
import { ProductLink } from "./product-link";
import { ThemeToggle } from "./site-shell";
import { youScrollMarketing as marketing } from "@/lib/youscroll-marketing";

export function YouScrollHeader({ current }: { current: string }) {
  return (
    <header className="ys-header">
      <div className="ys-wrap ys-header-inner">
        <ProductLink href={marketing.links.home} className="ys-brand" aria-label="YouScroll home">
          <Image src="/products/youscroll/brand-mark.png" alt="" width={42} height={42} unoptimized />
          <span>YouScroll<span className="ys-brand-dot">.</span></span>
        </ProductLink>
        <nav className="ys-nav" aria-label="YouScroll pages">
          <ProductLink href={`${marketing.links.home}#features`}>Features</ProductLink>
          <ProductLink href={`${marketing.links.home}#how-it-works`}>How it works</ProductLink>
          <ProductLink href={marketing.links.pricing} aria-current={current === "pricing" ? "page" : undefined}>Pricing</ProductLink>
          <ProductLink href={marketing.links.support} aria-current={current === "support" ? "page" : undefined}>Support</ProductLink>
        </nav>
        <div className="ys-header-actions">
          <ThemeToggle isHome={false} />
          <a className="ys-button ys-button-small" href={marketing.installUrl} target="_blank" rel="noreferrer">Add to Chrome <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </header>
  );
}
