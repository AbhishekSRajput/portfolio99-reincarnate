import "./products.css";

// Product homes and their documentation share one stylesheet; every rule in
// it is prefixed with `pp-` because loaded page styles persist across routes.
export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
