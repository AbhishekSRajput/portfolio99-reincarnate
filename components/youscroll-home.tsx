import Image from "next/image";
import { ProductLink } from "./product-link";
import { YouScrollPreview } from "./youscroll-preview";
import { youScrollMarketing as marketing } from "@/lib/youscroll-marketing";

function InstallLink({ children = "Add to Chrome — free", secondary = false }: { children?: React.ReactNode; secondary?: boolean }) {
  return <a className={`ys-button${secondary ? " ys-button-light" : ""}`} href={marketing.installUrl} target="_blank" rel="noreferrer">{children}<span aria-hidden="true">↗</span></a>;
}

const faq = [
  { question: "What can I use right now?", answer: marketing.release.socialAvailable ? "Social is available in the current release. Host free YouTube parties, join friends and explore the optional Pro trial inside the extension. Check the pricing page for paid-plan availability." : "The published Chrome extension includes YouTube Comments and Up Next, Picture-in-Picture and solo Play tools. Watch parties, voice and the Pro plan are coming soon." },
  { question: "Do my friends need Pro?", answer: `No. ${marketing.release.socialAvailable ? "Free accounts can" : "When watch parties launch, Free accounts will be able to"} join a Pro-hosted party and use the features enabled by its host, including voice. Everyone signs in. Free hosts can create YouTube parties for up to ${marketing.capacity.free} people, including themselves.` },
  { question: "Does YouScroll include Netflix or other subscriptions?", answer: "No. Each person needs their own access to the streaming service and the content being watched. YouScroll brings people together around their own playback." },
  { question: "What stays on my device?", answer: "Imported GIFs stay on your device and are not shared with your party. Files that fit the local library can be saved for later. Face effects are for solo YouTube use. Social features use an account and network services; the privacy policy explains how they work." },
];

export function YouScrollHome() {
  const { release, capacity, prices } = marketing;
  return (
    <main id="main-content" className="ys-page ys-home">
      <section className="ys-hero" aria-labelledby="ys-title">
        <div className="ys-wrap ys-hero-grid">
          <div className="ys-hero-copy">
            <p className="ys-eyebrow"><span className="ys-dot" /> A little closer, even from here</p>
            <h1 id="ys-title">Your people.<br />Your <span>watch<br className="ys-desktop-break" /> party.</span></h1>
            <p className="ys-hero-lede">Press play. Share the laugh. Make a little mischief. Your next watch party belongs right beside the video.</p>
            <div className="ys-actions"><InstallLink /><a href="#features" className="ys-text-link">Explore the preview <span aria-hidden="true">↓</span></a></div>
            <p className="ys-install-note">{release.socialAvailable ? "Install YouScroll, then open the popup to sign in for Social." : "Installs the current YouTube extension. Parties and voice are coming soon."}</p>
          </div>
          <div className="ys-hero-art">
            <div className="ys-art-orbit" aria-hidden="true" />
            <p className="ys-handwritten" aria-hidden="true">Better with your people <span>↘</span></p>
            <Image className="ys-pals" src="/products/youscroll/play-pals-1000.webp" alt="The Play Pals: smiling coral and purple speech bubbles sharing a glowing play button." width={1000} height={636} unoptimized preload sizes="(max-width: 767px) 100vw, 52vw" />
            <div className="ys-widget-card"><span className="ys-mini-label">Meet your new widget</span><Image src="/products/youscroll/widget.webp" alt="The current floating Social and Play widget" width={245} height={62} unoptimized /><span className="ys-widget-caption">Watch. Chat. Play.</span></div>
            <div className="ys-hero-stamp" aria-hidden="true"><span>Good company.</span><strong>Great<br />watch.</strong><span>✦ YouScroll ✦</span></div>
          </div>
        </div>
        <div className="ys-wrap ys-release-strip"><span className="ys-status-pill">{release.badge}</span><p>{release.notice}</p><ProductLink href={marketing.links.pricing}>{release.socialAvailable ? "Compare Free and Pro" : "See the launch plans"} <span aria-hidden="true">↗</span></ProductLink></div>
      </section>

      <section id="features" className="ys-section ys-demo-section" aria-labelledby="ys-demo-title">
        <div className="ys-wrap">
          <div className="ys-section-heading"><div><p className="ys-eyebrow">01 / Take a look around</p><h2 id="ys-demo-title">A small widget.<br /><span>A whole new way to watch.</span></h2></div><p>Your people and your playground,<br />right where the moment happens.<br /><span className="ys-muted">Pick a feature to explore.</span></p></div>
          <YouScrollPreview socialAvailable={release.socialAvailable} />
        </div>
      </section>

      <section className="ys-section ys-paper" aria-labelledby="ys-party-title">
        <div className="ys-wrap ys-party-grid">
          <div className="ys-party-copy"><p className="ys-eyebrow">02 / Your kind of company</p><h2 id="ys-party-title">Different sofas.<br /><span>Same moment.</span></h2><p className="ys-lede">The pause, the plot twist, the “wait, did you see that?” Bring it all into the same party.</p><div className="ys-feature-lines"><div><span aria-hidden="true">↔</span><p><strong>Stay in sync.</strong> Shared play, pause and seek keep everyone in the moment.</p></div><div><span aria-hidden="true">♡</span><p><strong>Keep the conversation close.</strong> Chat and invitations live alongside the video.</p></div><div><span aria-hidden="true">♫</span><p><strong>Talk as you watch.</strong> A Pro or trial host enables voice for the room.</p></div></div><p className="ys-availability">{release.socialAvailable ? "Available in the Social release." : "Watch parties and voice are coming soon."}</p></div>
          <div className="ys-party-visual"><div className="ys-party-capture"><Image src="/products/youscroll/preview-party.webp" alt="YouScroll watch-party chat with two illustrative friends and synchronized playback" width={1280} height={800} unoptimized loading="lazy" /></div><div className="ys-room-sizes"><div><span>Free on YouTube</span><strong>{capacity.free}<small> people</small></strong></div><span className="ys-room-divider" aria-hidden="true">→</span><div><span>With a Pro host</span><strong>{capacity.pro}<small> people</small></strong></div></div><p className="ys-fine">Including the host. Friends join with Free accounts.</p></div>
        </div>
        <div className="ys-wrap ys-platforms"><p>{release.socialAvailable ? "Watch together on" : "When watch parties launch, watch together on"}</p><div>{marketing.platforms.map((platform) => <span key={platform.id}>{platform.name}</span>)}</div><p className="ys-fine">Free hosting on YouTube. Pro hosting on every supported service.<br />Everyone needs their own access to the content. Streaming subscriptions are separate.</p></div>
      </section>

      <section className="ys-section ys-play-section" aria-labelledby="ys-play-title">
        <div className="ys-wrap">
          <div className="ys-section-heading"><div><p className="ys-eyebrow">03 / A little mischief</p><h2 id="ys-play-title">Don’t just watch it.<br /><span>Make it a moment.</span></h2></div><p>Circle it. Celebrate it. Throw a heart at it.<br />There’s more than one way to react.</p></div>
          <div className="ys-play-grid"><article className="ys-play-card ys-play-card-doodle"><div className="ys-play-card-copy"><span className="ys-feature-tag">Doodle</span><h3>Draw right on<br />the moment.</h3><p>Colors, brush sizes and an undo<br />for your latest masterpiece.</p></div><Image src="/products/youscroll/preview-doodle.webp" alt="Doodle drawing and controls in the current YouScroll interface" width={1280} height={800} unoptimized loading="lazy" /></article><article className="ys-play-card ys-play-card-react"><div className="ys-play-card-copy"><span className="ys-feature-tag">GIFs & throws</span><h3>Big feelings.<br />Bigger reactions.</h3><p>Built-in GIFs, hearts and confetti.<br />A little chaos, just for fun.</p></div><Image src="/products/youscroll/preview-reactions.webp" alt="YouScroll throws and playful effects over a video" width={1280} height={800} unoptimized loading="lazy" /></article></div>
          <p className="ys-feature-footnote">YouTube solo Play is available now. {release.socialAvailable ? "Shared party effects are available in rooms." : "Shared party effects are coming with watch parties."} Imported GIFs stay local; face effects are for solo YouTube use.</p>
        </div>
      </section>

      <section className="ys-section ys-scroll-section" aria-labelledby="ys-scroll-title"><div className="ys-wrap ys-scroll-grid"><div className="ys-scroll-visual"><Image src="/products/youscroll/preview-comments.webp" alt="A video remaining in view while YouScroll places Comments and Up Next in their own scrollable panel" width={1280} height={800} unoptimized loading="lazy" /><span className="ys-available-tag">Available now</span></div><div><p className="ys-eyebrow">Still the YouScroll you love</p><h2 id="ys-scroll-title">Keep scrolling.<br /><span>Keep watching.</span></h2><p className="ys-lede">Read the comments without losing the video. Comments and Up Next have their own space to scroll. Need to move around? Pop the video out with Picture-in-Picture.</p><InstallLink secondary /></div></div></section>

      <section id="how-it-works" className="ys-section ys-how-section" aria-labelledby="ys-how-title"><div className="ys-wrap"><div className="ys-section-heading"><div><p className="ys-eyebrow">04 / Save a seat</p><h2 id="ys-how-title">From “you watching?”<br /><span>to watching together.</span></h2></div><p>{release.socialAvailable ? "Get started in your extension." : "Here’s how the watch-party experience will work."}</p></div><ol className="ys-steps"><li><span>01</span><h3>Make yourself at home.</h3><p>Add YouScroll to Chrome and open the extension popup. The current solo YouTube tools are ready to use.</p></li><li><span>02</span><h3>Bring your people.</h3><p>{release.socialAvailable ? "Sign in for Social" : "When watch parties launch, sign in for Social"}, then create a party or join a friend. Everyone uses their own account.</p></li><li><span>03</span><h3>Press play. Be together.</h3><p>Start free on YouTube. Choose the optional {marketing.trialDays}-day Pro trial in the extension when you want to try more.</p></li></ol><p className="ys-fine">Installing, signing in or joining a party does not start your Pro trial. Starting the trial does not require a card.</p></div></section>

      <section className="ys-section ys-home-pricing" aria-labelledby="ys-plans-title"><div className="ys-wrap"><div className="ys-section-heading"><div><p className="ys-eyebrow">05 / More moments, your way</p><h2 id="ys-plans-title">Start free.<br /><span>Bring a bigger party.</span></h2></div><ProductLink className="ys-text-link" href={marketing.links.pricing}>Compare the plans <span aria-hidden="true">↗</span></ProductLink></div><div className="ys-plan-teasers"><article><span className="ys-eyebrow">YouScroll Free</span><h3>$0</h3><p>Your everyday YouTube tools, {release.socialAvailable ? `plus YouTube parties for ${capacity.free} people.` : `with YouTube parties for ${capacity.free} people coming soon.`}</p><InstallLink secondary /></article><article><div className="ys-teaser-top"><span className="ys-eyebrow">YouScroll Pro</span><span className="ys-status-pill">{release.paidAvailable ? "For your whole room" : release.socialAvailable ? "Try Pro free" : "Coming soon"}</span></div><h3>${prices.yearly}<small> / year</small></h3><p>{release.paidAvailable ? `Or $${prices.monthly}/month.` : `Planned subscription price. Monthly option: $${prices.monthly}.`} Host {capacity.pro} people, watch on more services and enable voice for everyone.</p><ProductLink className="ys-button ys-button-light" href={marketing.links.pricing}>Explore Pro <span aria-hidden="true">↗</span></ProductLink></article></div><p className="ys-fine">USD. Participant counts include the host. Applicable taxes are calculated at checkout. Payments and trials start inside YouScroll when available.</p></div></section>

      <section className="ys-section ys-faq-section" aria-labelledby="ys-faq-title"><div className="ys-wrap ys-faq-grid"><div><p className="ys-eyebrow">A few good questions</p><h2 id="ys-faq-title">Before you<br /><span>press play.</span></h2><ProductLink href={marketing.links.support} className="ys-text-link">Visit support <span aria-hidden="true">↗</span></ProductLink></div><div className="ys-faq">{faq.map((item, index) => <details key={item.question} open={index === 0}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></div></section>

      <section className="ys-final" aria-labelledby="ys-final-title"><div className="ys-wrap ys-final-inner"><div><p className="ys-eyebrow">Your next favorite moment</p><h2 id="ys-final-title">Better with<br /><span>your people.</span></h2><div className="ys-actions"><InstallLink /><ProductLink href={marketing.links.pricing} className="ys-text-link">Find your plan <span aria-hidden="true">↗</span></ProductLink></div><p className="ys-install-note">{release.socialAvailable ? "Open the extension to start your next watch party." : "Enjoy the YouTube tools now. Watch parties and voice are coming soon."}</p></div><Image src="/products/youscroll/play-pals-600.webp" alt="" width={600} height={381} unoptimized loading="lazy" /></div></section>
    </main>
  );
}
