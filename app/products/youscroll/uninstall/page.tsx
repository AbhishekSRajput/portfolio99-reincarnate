import type { Metadata } from "next";
import { YouScrollUninstall } from "@/components/youscroll-help";
import { pageMetadata } from "@/lib/seo";
import { productHref } from "@/lib/site-urls";

// A fixed setUninstallURL destination. This static page never reads the URL or
// identifies an installation; feedback opens the visitor's own email app.
export const metadata: Metadata = pageMetadata({
  title: "Thanks for hanging out — YouScroll",
  description: "YouScroll has been removed. Leave optional feedback, get account help, or find your way back to the Chrome Web Store.",
  url: productHref("youscroll", "uninstall"),
  image: "youscroll",
  index: false,
});

export default function UninstallPage() {
  return <YouScrollUninstall />;
}
