import Image from "next/image";
import { productEmail, productGuides } from "@/lib/content";
import { youScrollMarketing as marketing } from "@/lib/youscroll-marketing";
import { ProductLink } from "./product-link";
import { YouScrollHeader } from "./youscroll-header";
import { ProductIcon } from "./product-icons";
import { GithubMark } from "./icons";

const support = productGuides.youscroll.support;
const email = (subject: string) => `mailto:${productEmail.youscroll}?subject=${encodeURIComponent(subject)}`;

function Pals({ farewell = false }: { farewell?: boolean }) {
  return (
    <div className={`ys-help-art${farewell ? " ys-help-art-farewell" : ""}`}>
      <div className="ys-help-orbit" aria-hidden="true" />
      <span className="ys-help-sticker" aria-hidden="true">{farewell ? "See you around ♡" : "We’re in your corner ♡"}</span>
      <Image src="/products/youscroll/play-pals-600.webp" alt="YouScroll’s coral and violet Play Pals" width={600} height={381} unoptimized preload />
      <div className="ys-help-caption"><span aria-hidden="true">{farewell ? "Ⅱ" : "✦"}</span><p>{farewell ? "A pause. Not a goodbye." : "A little help. Back to the good part."}</p></div>
    </div>
  );
}

export function YouScrollSupport() {
  return (
    <>
      <YouScrollHeader current="support" />
      <main id="main-content" className="ys-page ys-help-page">
        <section className="ys-help-hero" aria-labelledby="support-title">
          <div className="ys-wrap ys-help-hero-grid">
            <div>
              <p className="ys-eyebrow"><span className="ys-dot" /> YouScroll support</p>
              <h1 id="support-title">Let’s get back<br />to the <span>good part.</span></h1>
              <p className="ys-help-lede">A missing panel, a quiet party, a little “wait, what?” Start here. We’ll help you find your next step.</p>
              <div className="ys-actions"><a className="ys-button" href="#quick-checks">Find a quick fix <span aria-hidden="true">↓</span></a><a className="ys-text-link" href={support.repo.issuesUrl} target="_blank" rel="noreferrer">Browse known issues <span aria-hidden="true">↗</span></a></div>
            </div>
            <Pals />
          </div>
          <div className="ys-wrap ys-release-strip"><span className="ys-status-pill">{marketing.release.badge}</span><p>{marketing.release.notice} The Social tips below apply to live builds.</p><ProductLink href={marketing.links.pricing}>Check availability <span aria-hidden="true">↗</span></ProductLink></div>
        </section>

        <section id="quick-checks" className="ys-section" aria-labelledby="quick-title">
          <div className="ys-wrap">
            <div className="ys-section-heading"><div><p className="ys-eyebrow">01 / Start with the small things</p><h2 id="quick-title">What’s getting<br /><span>in the way?</span></h2></div><p>Pick the part that needs a hand.<br />A setting or a page reload may be all it takes.</p></div>
            <div className="ys-help-cards">
              {support.checks.items.map((item, index) => <article className="ys-help-card" key={item.title}><div className="ys-help-card-top"><span className="ys-help-icon"><ProductIcon name={item.icon} /></span><span className="ys-eyebrow">0{index + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="ys-section ys-paper ys-help-report" aria-labelledby="report-title">
          <div className="ys-wrap ys-help-split">
            <div><p className="ys-eyebrow">02 / Something still feels off?</p><h2 id="report-title">One good report.<br /><span>A clearer picture.</span></h2><p className="ys-help-lede">Bug reports, questions and ideas live on GitHub. Search first; if it’s new, tell us what happened so the conversation stays in one place.</p><ul className="ys-help-list">{support.include.map((item) => <li key={item}>{item}</li>)}</ul><a className="ys-button" href={support.repo.newIssueUrl} target="_blank" rel="noreferrer"><GithubMark /> Open an issue <span aria-hidden="true">↗</span></a></div>
            <div className="ys-help-outline"><div className="ys-help-outline-bar"><span className="ys-eyebrow">Your issue outline</span><span aria-hidden="true">↗</span></div><pre>{support.template.join("\n")}</pre><p>Copy this outline into a new issue. You choose what to share.</p></div>
          </div>
        </section>

        <section className="ys-section" aria-labelledby="private-title"><div className="ys-wrap ys-help-private"><div><p className="ys-eyebrow">Keep private things private</p><h2 id="private-title">Some things are<br /><span>better by email.</span></h2><p>{support.privacy.emailFor} Write to <a href={email("YouScroll support")}>{productEmail.youscroll}</a>.</p></div><div><h3>Before you share a screenshot</h3><p>{support.privacy.note}</p><p>GitHub issues are public. Include a video link only when it is needed to reproduce the problem.</p><ProductLink href={marketing.links.privacy} className="ys-text-link">Read the privacy policy <span aria-hidden="true">↗</span></ProductLink></div></div></section>

        <section className="ys-section ys-faq-section" aria-labelledby="answers-title"><div className="ys-wrap ys-faq-grid"><div><p className="ys-eyebrow">03 / A few good answers</p><h2 id="answers-title">You might be<br /><span>wondering.</span></h2><p className="ys-help-faq-intro">From the comments panel to the party.<br />Here’s how the current controls work.</p></div><div className="ys-faq">{support.faq.map((item, index) => <details key={item.question} open={index === 0}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></div></section>
        <section className="ys-help-bottom"><div className="ys-wrap"><p>All sorted? There’s a good moment waiting.</p><ProductLink href={marketing.links.home} className="ys-text-link">Back to YouScroll <span aria-hidden="true">↗</span></ProductLink></div></section>
      </main>
    </>
  );
}

const reasons = ["Something didn’t work", "I didn’t use it enough", "A feature was missing", "I had a privacy concern", "Just taking a break"];

export function YouScrollUninstall() {
  return (
    <>
      <YouScrollHeader current="uninstall" />
      <main id="main-content" className="ys-page ys-help-page ys-uninstall-page">
        <section className="ys-help-hero" aria-labelledby="uninstall-title"><div className="ys-wrap ys-help-hero-grid"><div><p className="ys-eyebrow"><span className="ys-dot" /> YouScroll removed</p><h1 id="uninstall-title">Thanks for<br /><span>hanging out.</span></h1><p className="ys-help-lede">Sorry to see you go. Whether it was a quick visit or a lot of good videos, thanks for making YouScroll part of your watch.</p><div className="ys-actions"><a href="#feedback" className="ys-button">Leave a little feedback <span aria-hidden="true">↓</span></a><ProductLink href={marketing.links.support} className="ys-text-link">Something went wrong? <span aria-hidden="true">↗</span></ProductLink></div><p className="ys-install-note">Your browser opens this page after removal. You don’t need to do anything here.</p></div><Pals farewell /></div></section>

        <section className="ys-section ys-uninstall-details" aria-labelledby="after-title"><div className="ys-wrap"><div className="ys-section-heading"><div><p className="ys-eyebrow">Before you close the tab</p><h2 id="after-title">What happens<br /><span>from here?</span></h2></div><p>The extension and your Social account<br />are separate. Here’s what to know.</p></div><div className="ys-help-cards ys-help-cards-three"><article className="ys-help-card"><span className="ys-help-icon"><ProductIcon name="folder" /></span><h3>Your local GIF library</h3><p>Removing YouScroll clears its local storage in this browser profile, including imported GIFs saved in the extension. Your original files on your device are still yours.</p></article><article className="ys-help-card"><span className="ys-help-icon"><ProductIcon name="browser" /></span><h3>Your Social account</h3><p>If you used Live Social, uninstalling doesn’t delete your account. To request deletion, reinstall, sign in and choose <strong>Delete account</strong> in the extension popup.</p></article><article className="ys-help-card"><span className="ys-help-icon"><ProductIcon name="panel" /></span><h3>An existing subscription</h3><p>Uninstalling doesn’t cancel a paid plan. If you have one, use <strong>Manage billing</strong> in YouScroll’s Account page or popup to open the payment provider’s portal.</p></article></div><p className="ys-help-footnote">Need a hand with your account or billing? <a href={email("YouScroll account after uninstall")}>Email {productEmail.youscroll}</a>. <ProductLink href={marketing.links.privacy}>Read about account deletion and retention.</ProductLink></p></div></section>

        <section id="feedback" className="ys-section ys-paper" aria-labelledby="feedback-title"><div className="ys-wrap ys-uninstall-feedback"><p className="ys-eyebrow">Optional / One line makes a difference</p><h2 id="feedback-title">What made you<br /><span>press pause?</span></h2><p className="ys-help-lede">Choose a reason to open an email draft. Add as much or as little as you like. Nothing is sent until you press Send in your email app.</p><ul className="ys-help-reasons">{reasons.map((reason) => <li key={reason}><a href={email(`YouScroll feedback: ${reason}`)}>{reason}<span aria-hidden="true">↗</span></a></li>)}</ul><p className="ys-help-footnote">Prefer to report a bug? <a href={support.repo.newIssueUrl} target="_blank" rel="noreferrer">Open a GitHub issue</a>. Keep personal details, party links and private chats out of public reports.</p></div></section>

        <section className="ys-section ys-uninstall-return" aria-labelledby="return-title"><div className="ys-wrap"><p className="ys-eyebrow">A seat’s still here</p><h2 id="return-title">Whenever you’re ready,<br /><span>come watch again.</span></h2><p>The free YouTube tools are still in the Chrome Web Store.</p><div className="ys-actions"><a className="ys-button" href={marketing.installUrl} target="_blank" rel="noreferrer">Add YouScroll again <span aria-hidden="true">↗</span></a><ProductLink className="ys-text-link" href={marketing.links.home}>Take another look <span aria-hidden="true">↗</span></ProductLink></div></div></section>
      </main>
    </>
  );
}
