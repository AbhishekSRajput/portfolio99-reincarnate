import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { CubeMark } from "@/components/icons";
import { productGuides, profile, projects } from "@/lib/content";
import { PORTFOLIO_ORIGIN, productHref } from "@/lib/site-urls";

type SocialImageKind = "portfolio" | "pixelghost" | "youscroll";

const colors = {
  graphite: "#111210",
  cream: "#f1f2ed",
  orange: "#ff794b",
  muted: "#aaaba3",
  line: "#353630",
};

/** Build-time artwork: uses the supplied logos and the renderer's bundled font. */
export async function createSocialImage(kind: SocialImageKind) {
  // Break the portfolio tagline after its first sentence and before its last word.
  const [firstSentence, ...remainingSentences] = profile.tagline.split(". ");
  const remainingWords = remainingSentences.join(". ").split(" ");
  const lastWord = remainingWords.pop();
  const product = projects.find(({ slug }) => slug === kind);
  const guide = kind === "portfolio" ? undefined : productGuides[kind];
  const logo = guide
    ? `data:image/png;base64,${(
        await readFile(join(process.cwd(), "public", guide.logo.slice(1)))
      ).toString("base64")}`
    : undefined;
  const address = (product ? productHref(product.slug) : PORTFOLIO_ORIGIN)
    .replace(/^https:\/\//, "")
    .replace(/\/$/, "");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          background: colors.graphite,
          color: colors.cream,
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {[56, 419, 782, 1144].map((left) => (
          <div
            key={left}
            style={{
              display: "flex",
              position: "absolute",
              left,
              top: 0,
              width: 1,
              height: "100%",
              background: "#24251f",
            }}
          />
        ))}

        <div
          style={{
            display: "flex",
            position: "absolute",
            left: 56,
            top: 44,
            right: 56,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <CubeMark width={27} height={31} stroke={colors.orange} />
            <span style={{ fontSize: 27, fontWeight: 700, letterSpacing: -1 }}>
              {profile.brand}
            </span>
          </div>
          <span style={{ fontSize: 17, letterSpacing: 3, color: colors.muted }}>
            {product ? "CHROME EXTENSION" : "INDEPENDENT PRACTICE"}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 136,
            left: 56,
            width: 718,
            flexDirection: "column",
          }}
        >
          {product && guide ? (
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <div style={{ display: "flex", fontSize: 91, fontWeight: 700, letterSpacing: -5 }}>
                {product.name}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 24,
                  fontSize: 44,
                  lineHeight: 1.14,
                  letterSpacing: -1.6,
                  color: colors.orange,
                }}
              >
                {product.tagline.match(/[^.]+\./g)?.map((line) => (
                  <span key={line}>{line.trim()}</span>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  width: 670,
                  marginTop: 26,
                  fontSize: 26,
                  lineHeight: 1.4,
                  color: colors.muted,
                }}
              >
                {guide.hero.eyebrow}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: 91,
                  lineHeight: 1.04,
                  fontWeight: 700,
                  letterSpacing: -5,
                }}
              >
                <span>{firstSentence}.</span>
                <span>{remainingWords.join(" ")}</span>
                <span style={{ color: colors.orange }}>{lastWord}</span>
              </div>
              <div style={{ display: "flex", marginTop: 24, fontSize: 26, color: colors.muted }}>
                {profile.shareDescription}
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 149,
            right: 56,
            width: 304,
            height: 318,
            alignItems: "center",
            justifyContent: "center",
            background: colors.cream,
          }}
        >
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: 18,
              bottom: 18,
              left: 18,
              right: 18,
              border: "1px solid #cdd0c5",
            }}
          />
          {logo ? (
            // ImageResponse embeds the source bytes; next/image requires a browser.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} width={246} height={246} alt="" />
          ) : (
            <CubeMark width={191} height={217} stroke="#20221d" strokeWidth={0.55} />
          )}
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: -8,
              top: -8,
              width: 17,
              height: 17,
              background: colors.orange,
            }}
          />
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: -8,
              bottom: -8,
              width: 17,
              height: 17,
              background: colors.orange,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 0,
            left: 56,
            right: 56,
            height: 98,
            borderTop: `1px solid ${colors.line}`,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 25, letterSpacing: -0.5 }}>{address}</span>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={colors.orange} strokeWidth="1.5">
            <path d="M5 19 19 5M5 5h14v14" />
          </svg>
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { "Content-Type": "image/png" } },
  );
}
