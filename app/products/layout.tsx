import "./products.css";
import "./mascot.css";
import "./youscroll.css";

// Product homes and their documentation share one stylesheet, plus the
// PixelGhost mascot's; every rule in them is prefixed with `pp-` because
// loaded page styles persist across routes.
export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
