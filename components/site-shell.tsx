"use client";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { ProductLink } from "./product-link";
import { siteHref } from "@/lib/site-urls";
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
// The nav highlight follows hover and keyboard focus, then rests on the
// current route (or hides). Positions are CSS properties, not React state.
function placePill(
  nav: HTMLElement | null,
  link = nav?.querySelector<HTMLElement>("a[aria-current]") ?? null,
) {
  if (!nav) return;
  nav.style.setProperty("--pill-o", link ? "1" : "0");
  if (!link) return;
  nav.style.setProperty("--pill-x", `${link.offsetLeft}px`);
  nav.style.setProperty("--pill-w", `${link.offsetWidth}px`);
}
const pillTarget = (target: EventTarget) =>
  target instanceof Element
    ? target.closest<HTMLElement>("a:not(.mobile-contact)")
    : null;
const readTheme = () => readPreference("cc99-theme", "dark");
const readMotion = () => readPreference("cc99-motion", "full");

export function ThemeToggle({ isHome }: { isHome: boolean }) {
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
  const segment = useSelectedLayoutSegment();
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
  const nav = useRef<HTMLElement>(null);
  useEffect(() => placePill(nav.current), [pathname]);
  const isNotFound = segment === "_not-found";
  const NavigationLink = isNotFound ? ProductLink : Link;
  const href = (id: string) =>
    isNotFound ? siteHref(`/#${id}`) : pathname === "/" ? `#${id}` : `/#${id}`;
  // Product routes carry their own bar (home link, theme, product pages).
  // The baked route tree stays stable when Vercel rewrites a product to `/`.
  const productRoute = segment === "products";
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="reading-progress" aria-hidden="true" />
      {!productRoute && (
        <header className="site-header section-wrap">
          <NavigationLink
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
          </NavigationLink>
          <nav
            ref={nav}
            className={`site-nav ${menuOpen ? "nav-open" : ""}`}
            id="primary-navigation"
            aria-label="Main navigation"
            onPointerOver={(event) => {
              const link = pillTarget(event.target);
              if (link) placePill(event.currentTarget, link);
            }}
            onPointerLeave={(event) => placePill(event.currentTarget)}
            onFocus={(event) =>
              placePill(event.currentTarget, pillTarget(event.target))
            }
            onBlur={(event) => placePill(event.currentTarget)}
          >
            <NavigationLink href={href("work")} onClick={() => setMenuOpen(false)}>
              Work <span>02</span>
            </NavigationLink>
            <NavigationLink href={href("approach")} onClick={() => setMenuOpen(false)}>
              Approach
            </NavigationLink>
            <NavigationLink
              href="/journal"
              aria-current={segment === "journal" ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              Notebook
            </NavigationLink>
            <NavigationLink
              className="mobile-contact"
              href={href("contact")}
              onClick={() => setMenuOpen(false)}
            >
              Let’s talk <Arrow diagonal />
            </NavigationLink>
          </nav>
          <div className="header-actions">
            <ThemeToggle
              key={pathname === "/" ? "home" : "saved"}
              isHome={pathname === "/"}
            />
            <NavigationLink
              href={href("contact")}
              className="header-contact"
              onClick={() => setMenuOpen(false)}
            >
              Let’s talk <Arrow diagonal />
            </NavigationLink>
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
      )}
    </>
  );
}
export function SiteFooter() {
  const segment = useSelectedLayoutSegment();
  const HomeLink =
    segment === "products" || segment === "_not-found" ? ProductLink : Link;
  return (
    <footer className="site-footer section-wrap">
      <HomeLink href="/" className="footer-brand">
        codecube99<span>↗</span>
      </HomeLink>
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
