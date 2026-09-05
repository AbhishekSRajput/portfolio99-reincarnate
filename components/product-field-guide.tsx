import type { FieldGuideChapter } from "@/lib/content";
import { FieldGuideNav } from "./field-guide-nav";

type Props = {
  productName: string;
  title: string;
  introduction: string;
  chapters: readonly FieldGuideChapter[];
};

export function ProductFieldGuide({
  productName,
  title,
  introduction,
  chapters,
}: Props) {
  return (
    <section
      id="how-it-works"
      className="product-toolkit section-wrap"
      aria-labelledby="tools-title"
    >
      <div className="product-toolkit-index">
        <p className="eyebrow">THE FIELD GUIDE</p>
        <h2 id="tools-title">{title}</h2>
        <p>{introduction}</p>
        <FieldGuideNav
          label={`${productName} field guide chapters`}
          chapters={chapters}
        />
      </div>
      <div className="product-tool-list">
        {chapters.map((chapter, index) => (
          <article id={chapter.id} className="product-tool" key={chapter.id}>
            <div className="product-tool-heading">
              <span className="mono">{String(index + 1).padStart(2, "0")}</span>
              <h3>{chapter.name}</h3>
            </div>
            <p className="product-tool-purpose">{chapter.purpose}</p>
            {chapter.steps.length > 0 && (
              <ol>{chapter.steps.map((step) => <li key={step}>{step}</li>)}</ol>
            )}
            {chapter.topics?.map((topic) => (
              <section className="field-guide-topic" key={topic.title}>
                <h4>{topic.title}</h4>
                {topic.description && <p>{topic.description}</p>}
                <dl>
                  {topic.items.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.text}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
            {chapter.shortcutGroups?.map((group) => (
              <section className="field-guide-shortcuts" key={group.title}>
                <h4>{group.title}</h4>
                {group.note && <p>{group.note}</p>}
                <dl>
                  {group.shortcuts.map((shortcut) => (
                    <div key={`${shortcut.action}-${shortcut.keys.join("-")}`}>
                      <dt>
                        {shortcut.keys.map((keys) => <kbd key={keys}>{keys}</kbd>)}
                      </dt>
                      <dd>
                        <strong>{shortcut.action}</strong>
                        {shortcut.detail && <p>{shortcut.detail}</p>}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
            {chapter.note && <p className="product-tool-note">{chapter.note}</p>}
            {(chapter.topics || chapter.shortcutGroups) && (
              <a className="field-guide-back text-link" href="#how-it-works">
                ↑ All guide chapters
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
