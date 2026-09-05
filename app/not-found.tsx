import Link from "next/link";
import { Arrow } from "@/components/icons";
export default function NotFound() {
  return (
    <main id="main-content" className="inner-page section-wrap">
      <p className="eyebrow">404 / A LOOSE END</p>
      <h1 className="page-heading">
        Nothing
        <br />
        <span className="serif-accent">at this address.</span>
      </h1>
      <p className="page-intro">
        The page may have moved, or the link might be a little off.
      </p>
      <div className="hero-actions">
        <Link href="/" className="button button-accent">
          Back to the big picture <Arrow />
        </Link>
      </div>
    </main>
  );
}
