import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { notes } from "@/lib/content";
import { Arrow } from "@/components/icons";
import { pageMetadata } from "@/lib/seo";
import { siteHref } from "@/lib/site-urls";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return notes.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  return note
    ? pageMetadata({
        title: `${note.title} (draft) — CodeCube99`,
        description: note.excerpt,
        url: siteHref(`/journal/${note.slug}/`),
        index: false,
      })
    : {};
}
export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  if (!note) notFound();
  return (
    <main id="main-content" className="inner-page article-page section-wrap">
      <Link href="/journal" className="breadcrumb">
        ← Back to the notebook
      </Link>
      <article>
        <p className="eyebrow">
          {note.category} <span> / {note.date}</span>
        </p>
        <h1 className="page-heading">{note.title}</h1>
        <p className="page-intro">{note.excerpt}</p>
        <aside className="draft-notice">
          <strong>A thought in progress.</strong>This is the starting point of a
          longer piece. The full essay is still being written.
        </aside>
        <a
          className="text-link"
          href={`mailto:codecube99@gmail.com?subject=${encodeURIComponent(note.title)}`}
        >
          Have a perspective on this? Let’s talk <Arrow diagonal />
        </a>
      </article>
    </main>
  );
}
