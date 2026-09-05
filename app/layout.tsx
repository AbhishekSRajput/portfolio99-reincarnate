import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CodeCube99 — Big picture. Every little detail.",
    template: "%s — CodeCube99",
  },
  description:
    "CodeCube99, software generalist and independent builder. Thoughtful software, useful browser extensions, and an obsessive eye for the details.",
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("cc99-theme"),m=localStorage.getItem("cc99-motion");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;if(m==="paused")document.documentElement.dataset.motion=m}catch(e){}`,
          }}
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
