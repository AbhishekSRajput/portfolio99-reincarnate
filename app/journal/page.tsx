import type { Metadata } from "next";
import { Notebook } from "@/components/notebook";
import { pageMetadata } from "@/lib/seo";
import { siteHref } from "@/lib/site-urls";
export const metadata: Metadata = pageMetadata({
  title: "The notebook — CodeCube99",
  description:
    "Work-in-progress notes on generalism, codebases, building products, and keeping things small.",
  url: siteHref("/journal/"),
});
export default function JournalPage() {
  return (
    <main id="main-content" className="inner-page notebook-page section-wrap">
      <p className="eyebrow">THE NOTEBOOK / CODECUBE99</p>
      <h1 className="page-heading">
        Thinking
        <br />
        <span className="serif-accent">out loud.</span>
      </h1>
      <p className="page-intro">
        A place for ideas that come out of making things. Notes on the work, the
        decisions, and what I’m figuring out along the way.
      </p>
      <Notebook />
    </main>
  );
}
