"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Arrow, CubeMark } from "./icons";

const sessionPreferences = new Map<string, string>();
function subscribePreferences(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === null) sessionPreferences.clear();
    else sessionPreferences.delete(event.key);
    listener();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("cc99-preferences", listener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("cc99-preferences", listener);
  };
}
function readPreference(key: string, fallback: string) {
  if (sessionPreferences.has(key)) return sessionPreferences.get(key)!;
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}
function writePreference(key: string, value: string) {
  sessionPreferences.set(key, value);
  try {
    localStorage.setItem(key, value);
  } catch {
    /* The current tab still works when storage is blocked. */
  }
  window.dispatchEvent(new Event("cc99-preferences"));
}
const readTheme = () => readPreference("cc99-theme", "dark");
const readMotion = () => readPreference("cc99-motion", "full");

function ThemeToggle({ isHome }: { isHome: boolean }) {
  const [homeTheme, setHomeTheme] = useState("dark");
  const savedTheme = useSyncExternalStore(
    subscribePreferences,
    readTheme,
    () => "dark",
  );
  const isLight = (isHome ? homeTheme : savedTheme) === "light";

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = isLight ? "light" : "dark";
  }, [isLight]);

  return (
    <button
      className="icon-button theme-toggle"
      type="button"
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={isLight}
      onClick={() => {
        const next = isLight ? "dark" : "light";
        // Home starts dark on each visit without replacing the saved theme.
        if (isHome) setHomeTheme(next);
        else writePreference("cc99-theme", next);
        document.documentElement.dataset.theme = next;
      }}
    >
      {isLight ? "◐" : "☼"}
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const savedMotion = useSyncExternalStore(
    subscribePreferences,
    readMotion,
    () => "full",
  );
  const isPaused = savedMotion === "paused";
  useEffect(() => {
    document.documentElement.dataset.motion = isPaused ? "paused" : "full";
  }, [isPaused]);
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const update = () => {
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty(
        "--scroll-progress",
        String(max > 0 ? window.scrollY / max : 0),
      );
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  const href = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="reading-progress" aria-hidden="true" />
      <header className="site-header section-wrap">
        <Link
          href="/"
          className="brand"
          aria-label="CodeCube99 home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-icon">
            <CubeMark />
          </span>
          <span>
            codecube<span className="brand-number">99</span>
            <span className="brand-period">.</span>
          </span>
        </Link>
        <nav
          className={`site-nav ${menuOpen ? "nav-open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <Link href={href("work")} onClick={() => setMenuOpen(false)}>
            Work <span>02</span>
          </Link>
          <Link href={href("approach")} onClick={() => setMenuOpen(false)}>
            Approach
          </Link>
          <Link
            href="/journal"
            aria-current={pathname.startsWith("/journal") ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Notebook
          </Link>
          <Link
            className="mobile-contact"
            href={href("contact")}
            onClick={() => setMenuOpen(false)}
          >
            Let’s talk <Arrow diagonal />
          </Link>
        </nav>
        <div className="header-actions">
          <ThemeToggle
            key={pathname === "/" ? "home" : "saved"}
            isHome={pathname === "/"}
          />
          <Link
            href={href("contact")}
            className="header-contact"
            onClick={() => setMenuOpen(false)}
          >
            Let’s talk <Arrow diagonal />
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
    </>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer section-wrap">
      <Link href="/" className="footer-brand">
        codecube99<span>↗</span>
      </Link>
      <p>BUILT WITH INTENTION. © 2026</p>
      <div>
        <a
          href="https://github.com/AbhishekSRajput"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <Arrow diagonal />
        </a>
        <a href="mailto:codecube99@gmail.com">
          Email <Arrow diagonal />
        </a>
        <a href="#main-content" aria-label="Back to top">
          ↑
        </a>
      </div>
    </footer>
  );
}
