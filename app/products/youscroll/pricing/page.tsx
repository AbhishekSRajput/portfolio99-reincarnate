import type { Metadata } from "next";
import { ProductBar } from "@/components/product-ui";
import { YouScrollBillingPrice } from "@/components/youscroll-pricing";
import { productEmail } from "@/lib/content";
import { productMetadata } from "@/lib/seo";
import { youScrollMarketing as marketing } from "@/lib/youscroll-marketing";
import "../../youscroll-pricing.css";

const { release, prices, capacity, trialDays } = marketing;

export const metadata: Metadata = productMetadata(
  "youscroll", "pricing", "Free & Pro plans — YouScroll",
  release.socialAvailable
    ? `Host up to ${capacity.free} people on all ${marketing.platforms.length} supported services for free. Try ${trialDays} days of Pro for rooms of ${capacity.pro} and voice. ${release.paidAvailable ? `Pro: $${prices.monthly}/month or $${prices.yearly}/year.` : "Paid plans are not on sale yet."}`
    : `YouScroll's YouTube tools are free. Explore the coming Free and Pro watch-party plans, with an optional ${trialDays}-day Pro trial.`,
);

const comparisons = [
  { feature: "YouTube tools", detail: "Comments, Up Next, Play and Picture-in-Picture", free: "Included", pro: "Included", social: false },
  { feature: "Host on YouTube", detail: "Room size includes you", free: `${capacity.free} people`, pro: `${capacity.pro} people`, social: true },
  { feature: "Host on streaming services", detail: "Netflix, Prime Video, JioHotstar and Crunchyroll", free: `${capacity.free} people`, pro: `${capacity.pro} people`, social: true },
  { feature: "Playback sync & chat", detail: "Stay together through play, pause and seek", free: "Included in rooms", pro: "Included in rooms", social: true },
  { feature: "Shared effects", detail: "Doodle, built-in GIFs, throws and reactions", free: "Included in rooms", pro: "Included in rooms", social: true },
  { feature: "Voice together", detail: "The Pro host enables voice for the room", free: "Join a Pro host’s call", pro: "Enable for everyone", social: true },
  { feature: "Solo Play", detail: "Drawing, packaged GIFs, throws and reactions", free: "All supported services", pro: "All supported services", social: true },
  { feature: "Join friends’ parties", detail: "A signed-in Free account is all you need", free: "Every supported service", pro: "Every supported service", social: true },
  { feature: "Profile picture", detail: "Seen by friends and party members", free: "Four blob characters", pro: "Plus animated GIFs, cropped to fit", social: true },
] as const;

const faqs = [
  {
    question: "What can I use right now?",
    answer: release.socialAvailable
      ? `The free YouTube tools, solo Play and watch parties are available in YouScroll. Solo Play is free on every supported service. Sign in with Google to host up to ${capacity.free} people on any of them or join friends. Pro adds rooms of ${capacity.pro} and voice; your plan controls show the trial and upgrade options available to your account.`
      : "The Chrome Web Store version has the free YouTube tools: independent Comments and Up Next, local Doodle, GIFs, Throw, Faces and Picture-in-Picture. The watch-party plans shown here are a preview. They are not available in that store version yet.",
  },
  {
    question: "When does my free trial start?",
    answer: `${release.socialAvailable ? "Choose" : "When live Social launches, choose"} Start trial inside YouScroll to activate ${trialDays} days of Pro. It needs no card. Installing, signing in, hosting a Free room on any supported service and joining friends do not start it. Each Google account gets one trial.`,
  },
  {
    question: "Do my friends need Pro too?",
    answer: "No. The room owner’s plan sets its size and voice access. Free and Pro hosts can use every supported service. Friends can join with Free accounts and use the tools the host enables, including voice in a Pro room. Everyone signs in, and everyone needs their own access to the video or streaming service.",
  },
  {
    question: "What happens after the trial?",
    answer: `Without an upgrade, you return to Free: host up to ${capacity.free} people, join friends and use solo Play on every supported service. An existing Pro room and call can continue for the people already connected; new joins and reconnects to that Pro room close. You can end that room and start a fresh Free room on any supported service.`,
  },
  {
    question: "How do I upgrade?",
    answer: release.paidAvailable
      ? "Open the YouScroll popup or the Social panel’s You tab and choose an available monthly or yearly upgrade. YouScroll opens your account’s Dodo Payments checkout. Review the amount and billing schedule there before confirming."
      : "Paid subscriptions are coming soon. When available, choose Upgrade inside the YouScroll popup or the Social panel’s You tab. YouScroll will open the Dodo Payments checkout linked to your account. There is no payment to make on this page.",
  },
  {
    question: "Will the trial charge me automatically?",
    answer: "Starting the in-app trial does not create a subscription or collect a card. If you later choose a paid upgrade, review the charge date and renewal terms at Dodo checkout. An active trial’s remaining time is passed to checkout. Choosing an upgrade without first starting the trial does not automatically add a trial.",
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes. Manage billing inside YouScroll opens Dodo’s customer portal. Cancellation stops future renewals, and paid access continues until the end of your paid period. See the refund policy for refunds and billing mistakes.",
  },
  {
    question: "Does YouScroll include my streaming subscriptions?",
    answer: "No. Each person plays the video through their own access to the service. YouScroll synchronizes playback and adds the shared room. Available titles and playback can vary by service and region.",
  },
] as const;

function RoomFriends({ count }: { count: number }) {
  return <div className="ys-price-friends" aria-hidden="true">{Array.from({ length: count }, (_, index) => <span className={`ys-price-friend ys-price-friend-${index % 4}`} key={index}><i /><i /><b /></span>)}</div>;
}

export default function PricingPage() {
  return (
    <>
      <ProductBar slug="youscroll" current="pricing" />
      <main id="main-content" className="ys-page ys-pricing-page">
        <header className="ys-pricing-hero ys-pricing-wrap">
          <p className="ys-pricing-kicker">GOOD TIMES. SMALL PRICE.</p>
          <div className="ys-pricing-title-wrap">
            <span className="ys-pricing-spark" aria-hidden="true">✳</span>
            <h1>More friends.<br /><span>More fun.</span></h1>
            <span className="ys-pricing-heart" aria-hidden="true">♡</span>
          </div>
          <p className="ys-pricing-lead">{release.socialAvailable ? `Host up to ${capacity.free} on every supported service for free.` : "Your everyday YouTube tools stay free."}<br />Bring a bigger crowd and voice with Pro.</p>
          <p className="ys-pricing-release"><span aria-hidden="true" />{release.badge}</p>
          <p className="ys-pricing-availability">{release.notice}</p>
        </header>

        <section className="ys-pricing-wrap ys-pricing-plans" aria-labelledby="ys-plans-title">
          <h2 className="ys-price-sr" id="ys-plans-title">Choose your YouScroll plan</h2>
          <div className="ys-pricing-card-grid">
            <article className="ys-price-card ys-price-card-free" aria-labelledby="ys-free-title">
              <div className="ys-price-card-top"><span className="ys-price-label">THE EVERYDAY ONE</span><span className="ys-price-status">Available now</span></div>
              <h3 id="ys-free-title">Free<span aria-hidden="true">.</span></h3>
              <p className="ys-price-description">Your everyday tools. Your small crew.</p>
              <div className="ys-price-free-cost"><p className="ys-price-amount"><span>$0</span><span className="ys-price-period">/ forever</span></p><p className="ys-price-equivalent">No card needed for Free.</p></div>
              <a className="ys-price-button ys-price-button-free" href={marketing.installUrl} target="_blank" rel="noreferrer">Add to Chrome <span aria-hidden="true">↗</span></a>
              <ul className="ys-price-features"><li>Comments and Up Next on YouTube</li><li>{release.socialAvailable ? "Solo Play on all supported services" : "Local Doodle, GIFs, Throw and Faces"}</li><li>Faces and Picture-in-Picture on YouTube</li></ul>
              <div className="ys-price-social-features">
                <p>{release.socialAvailable ? "Plus, when you sign in" : "Coming with watch parties"}</p>
                <ul className="ys-price-features"><li>Host up to {capacity.free} on all {marketing.platforms.length} supported services</li><li>Playback sync, chat and shared effects</li><li>Join Pro rooms, including their voice calls</li></ul>
              </div>
              <div className="ys-price-card-bottom"><RoomFriends count={capacity.free} /><span>You + {capacity.free - 1} friends</span></div>
            </article>

            <article className="ys-price-card ys-price-card-pro" aria-labelledby="ys-pro-title">
              <span className="ys-price-sticker" aria-hidden="true">PLAY<br />PALS!</span>
              <div className="ys-price-card-top"><span className="ys-price-label">THE WHOLE GANG</span><span className="ys-price-status">{release.paidAvailable ? "Pro" : release.socialAvailable ? "Try it free" : "Coming soon"}</span></div>
              <h3 id="ys-pro-title">Pro<span aria-hidden="true">✦</span></h3>
              <p className="ys-price-description">Bigger rooms. A voice for everyone.</p>
              {/* No price is shown until paid plans are on sale; until then Pro comes only through the trial. */}
              {release.paidAvailable
                ? <YouScrollBillingPrice monthly={prices.monthly} yearly={prices.yearly} savingPercent={prices.annualSavingPercent} />
                : <div className="ys-price-free-cost"><p className="ys-price-amount"><span>Free</span><span className="ys-price-period">/ {trialDays} days</span></p><p className="ys-price-equivalent">Paid plans are not on sale yet.</p></div>}
              <a className="ys-price-button ys-price-button-pro" href="#ys-start">{release.proCtaLabel} <span aria-hidden="true">↗</span></a>
              <p className="ys-price-trial">{trialDays}-day optional trial · no card to start</p>
              <ul className="ys-price-features"><li>Everything in Free</li><li>Host up to {capacity.pro} on all {marketing.platforms.length} supported services</li><li>Enable voice for everyone in your room</li><li>An animated GIF profile picture</li><li>Your friends join with Free accounts</li></ul>
              <div className="ys-price-card-bottom"><RoomFriends count={capacity.pro} /><span>You + {capacity.pro - 1} friends</span></div>
            </article>
          </div>
          <p className="ys-pricing-price-note">{release.paidAvailable ? "Prices in USD. Any applicable sales tax or VAT is shown at Dodo Payments checkout. Room sizes include the host." : "Room sizes include the host. Starting the trial needs no payment details."}</p>
        </section>

        <section className="ys-pricing-platforms ys-pricing-wrap" aria-labelledby="ys-platforms-title">
          <h2 id="ys-platforms-title">Same friends. More places to press play.</h2>
          <ul>{marketing.platforms.map((platform) => <li key={platform.id}>{platform.name}</li>)}</ul>
          <p>{release.socialAvailable ? "Free and Pro both support every service above." : "Streaming support is coming with live watch parties."} Everyone needs their own access to the title.</p>
        </section>

        <section className="ys-pricing-compare ys-pricing-wrap" aria-labelledby="ys-compare-title">
          <div className="ys-pricing-section-heading"><p className="ys-pricing-kicker">THE LITTLE DETAILS</p><h2 id="ys-compare-title">Find your kind of <span>play.</span></h2>{!release.socialAvailable && <p>Watch-party and streaming features below are coming soon.</p>}</div>
          <p className="ys-pricing-table-hint">Scroll across to compare both plans <span aria-hidden="true">→</span></p>
          <div className="ys-pricing-table-wrap" tabIndex={0} role="region" aria-label="Free and Pro feature comparison, scroll horizontally if needed">
            <table className="ys-pricing-table">
              <caption className="ys-price-sr">YouScroll Free and Pro features. Watch-party features require signing in.</caption>
              <thead><tr><th scope="col">What’s included</th><th scope="col">Free</th><th scope="col">Pro <span aria-hidden="true">✦</span></th></tr></thead>
              <tbody>{comparisons.map((row) => <tr key={row.feature}><th scope="row"><span>{row.feature}</span><small>{row.detail}{row.social && !release.socialAvailable ? " · Coming soon" : ""}</small></th><td>{row.free}</td><td>{row.pro}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="ys-pricing-table-note">Hosts choose which shared tools are enabled. Face effects stay solo and on YouTube.</p>
        </section>

        <section id="ys-start" className="ys-pricing-start ys-pricing-wrap" aria-labelledby="ys-start-title">
          <div className="ys-pricing-start-intro">
            <p className="ys-pricing-kicker">IT STARTS WITH A CLICK. YOUR CLICK.</p>
            <h2 id="ys-start-title">{release.socialAvailable ? "Try Pro on your terms." : "A trial worth waiting for."}</h2>
            <p>{release.socialAvailable ? "You choose when your trial begins." : "When live watch parties arrive, you’ll choose when your trial begins."} Installing, hosting a Free room or joining a friend never starts the clock.</p>
            <a className="ys-price-button ys-price-button-free" href={marketing.installUrl} target="_blank" rel="noreferrer">Get YouScroll for Chrome <span aria-hidden="true">↗</span></a>
          </div>
          <ol className="ys-pricing-steps">
            <li><span>01</span><div><h3>Make yourself at home</h3><p>{release.socialAvailable ? "Install YouScroll and enjoy free solo Play on every supported service, plus the YouTube tools." : "Install YouScroll and enjoy the free YouTube tools."}</p></div></li>
            <li><span>02</span><div><h3>{release.socialAvailable ? "Sign in inside YouScroll" : "When parties launch, sign in"}</h3><p>Open the extension popup and choose Continue with Google.</p></div></li>
            <li><span>03</span><div><h3>Start your {trialDays} days</h3><p>Choose Start trial in YouScroll. No card, and no subscription created by starting the trial.</p></div></li>
          </ol>
          <p className="ys-pricing-start-footnote">{release.paidAvailable ? "Ready to upgrade?" : "When paid plans launch,"} choose a plan inside YouScroll to open your account’s Dodo checkout. This page does not start a trial or take payment.</p>
        </section>

        <section className="ys-pricing-faq ys-pricing-wrap" aria-labelledby="ys-faq-title">
          <div className="ys-pricing-section-heading"><p className="ys-pricing-kicker">BEFORE YOU PRESS PLAY</p><h2 id="ys-faq-title">A few good <span>questions.</span></h2></div>
          <div className="ys-pricing-questions">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div>
          <p className="ys-pricing-help">Something else on your mind? <a href={`mailto:${productEmail.youscroll}`}>Let’s talk <span aria-hidden="true">↗</span></a></p>
          <nav className="ys-pricing-policy-links" aria-label="YouScroll plan policies"><a href={marketing.links.terms}>Terms</a><a href={marketing.links.refunds}>Refund policy</a><a href={marketing.links.privacy}>Privacy</a></nav>
        </section>
      </main>
    </>
  );
}
