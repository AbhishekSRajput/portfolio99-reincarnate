// The PixelGhost mascot, drawn from the supplied store artwork (the white ghost
// with mitten hands, glossy eyes and pink cheeks) as SVG. Three scenes share it:
// the home hero (happy, assembling from pixels), the uninstall page (sad,
// dissolving into them) and the tools guide's tour. Motion and moods live in
// app/products/mascot.css; these components only draw. Each scene prefixes its
// gradient ids, so two scenes could share a page without colliding.

const BODY =
  "M180 52 C238 52 274 98 275 158 C276 206 281 244 293 272 C298 290 280 300 266 290 C254 282 244 288 238 300 C228 318 208 316 200 302 C192 290 176 292 168 306 C158 322 136 318 130 300 C124 286 108 286 98 296 C84 308 70 294 76 274 C84 244 86 206 86 158 C86 98 122 52 180 52 Z";

/** The ghost's gradients and outline, under `p`-prefixed ids. */
function GhostDefs({ p }: { p: string }) {
  return (
    <>
      <radialGradient id={`${p}-body`} cx="38%" cy="26%" r="80%">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset=".5" stopColor="#f1ecff" />
        <stop offset=".85" stopColor="#cdbbff" />
        <stop offset="1" stopColor="#b49cff" />
      </radialGradient>
      <linearGradient id={`${p}-hem`} x1="0" y1="0" x2="0" y2="1">
        <stop offset=".55" stopColor="#b393ff" stopOpacity="0" />
        <stop offset="1" stopColor="#d86bff" stopOpacity=".55" />
      </linearGradient>
      <linearGradient id={`${p}-rim`} x1="0" y1="0" x2="1" y2="0">
        <stop offset=".55" stopColor="#ff8fd1" stopOpacity="0" />
        <stop offset="1" stopColor="#ff8fd1" stopOpacity=".9" />
      </linearGradient>
      <radialGradient id={`${p}-arm`} cx="45%" cy="25%" r="85%">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset=".55" stopColor="#e6ddff" />
        <stop offset="1" stopColor="#b59dff" />
      </radialGradient>
      <radialGradient id={`${p}-eye`} cx="40%" cy="30%" r="80%">
        <stop offset="0" stopColor="#3a3354" />
        <stop offset="1" stopColor="#0f0d16" />
      </radialGradient>
      <path id={`${p}-outline`} d={BODY} />
    </>
  );
}

/** The ghost's body: the arms behind it, its shading, the specular and the cheeks. */
function GhostBody({ p, wave = true }: { p: string; wave?: boolean }) {
  return (
    <>
      <ellipse cx="78" cy="232" rx="14" ry="25" transform="rotate(18 78 232)" fill={`url(#${p}-arm)`} />
      <g className={wave ? "pp-g-wave" : undefined}>
        <ellipse cx="292" cy="178" rx="15" ry="27" transform="rotate(38 292 178)" fill={`url(#${p}-arm)`} />
        <ellipse className="pp-g-spec" cx="298" cy="166" rx="5" ry="8" transform="rotate(38 298 166)" style={{ opacity: 0.55, filter: "blur(2px)" }} />
      </g>
      <use href={`#${p}-outline`} fill={`url(#${p}-body)`} />
      <use href={`#${p}-outline`} fill={`url(#${p}-hem)`} />
      <use href={`#${p}-outline`} fill="none" stroke={`url(#${p}-rim)`} strokeWidth="3" />
      <g>
        {[
          [141, 314, 8, "#d2b6ff", 0],
          [151, 321, 5, "#f0a3ff", -0.6],
          [136, 324, 4, "#ec4899", -1.2],
          [212, 311, 7, "#d2b6ff", -0.9],
          [221, 318, 5, "#ec4899", -1.8],
          [80, 300, 7, "#c9a8ff", -0.3],
          [74, 308, 4, "#60a5fa", -1.5],
          [279, 293, 6, "#b79cff", -2.1],
          [287, 300, 4, "#ffd166", -0.7],
        ].map(([x, y, s, fill, delay]) => (
          <rect
            key={`${x}-${y}`}
            className="pp-g-frag"
            x={x}
            y={y}
            width={s}
            height={s}
            rx={Number(s) * 0.23}
            fill={String(fill)}
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </g>
      <ellipse className="pp-g-spec" cx="136" cy="94" rx="28" ry="14" transform="rotate(-32 136 94)" />
      <ellipse className="pp-g-cheek" cx="128" cy="196" rx="16" ry="9" />
      <ellipse className="pp-g-cheek" cx="232" cy="196" rx="16" ry="9" />
    </>
  );
}

/** The backdrop every ghost scene shares: soft pixels out of focus, a halo and a shadow. */
function GhostGround({ p }: { p: string }) {
  return (
    <>
      <rect className="pp-g-bokeh" x="40" y="60" width="16" height="16" rx="4" fill="#ec4899" opacity=".35" />
      <rect className="pp-g-bokeh" x="306" y="54" width="12" height="12" rx="3" fill="#a78bfa" opacity=".45" style={{ animationDelay: "-2s" }} />
      <rect className="pp-g-bokeh" x="322" y="236" width="18" height="18" rx="4.5" fill="#ff794b" opacity=".3" style={{ animationDelay: "-4s" }} />
      <rect className="pp-g-bokeh" x="28" y="250" width="11" height="11" rx="3" fill="#60a5fa" opacity=".4" style={{ animationDelay: "-1s" }} />
      <rect className="pp-g-bokeh" x="250" y="26" width="9" height="9" rx="2.5" fill="#f472b6" opacity=".4" style={{ animationDelay: "-5s" }} />
      <ellipse className="pp-g-halo" cx="180" cy="190" rx="170" ry="160" fill={`url(#${p}-halo)`} />
      <ellipse className="pp-g-shadow" cx="182" cy="352" rx="84" ry="12" fill={`url(#${p}-shadow)`} />
    </>
  );
}

function GroundDefs({ p }: { p: string }) {
  return (
    <>
      <radialGradient id={`${p}-shadow`} cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#0a0710" stopOpacity=".75" />
        <stop offset="1" stopColor="#0a0710" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${p}-halo`} cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#b48cff" stopOpacity=".55" />
        <stop offset="1" stopColor="#b48cff" stopOpacity="0" />
      </radialGradient>
    </>
  );
}

/** Twelve pixels around the hem: they drift off the sad ghost and fly into the happy one. */
const PIXELS: readonly (readonly [number, number, number, string])[] = [
  [94, 290, 15, "#ec4899"],
  [118, 300, 11, "#60a5fa"],
  [134, 306, 12, "#8b5cf6"],
  [150, 300, 9, "#ffd166"],
  [168, 304, 16, "#ff794b"],
  [190, 300, 11, "#ec4899"],
  [206, 306, 14, "#f472b6"],
  [222, 300, 9, "#ff794b"],
  [240, 296, 15, "#a78bfa"],
  [258, 292, 11, "#ffd166"],
  [272, 284, 12, "#60a5fa"],
  [106, 296, 8, "#ffd166"],
];

function Pixels() {
  return (
    <g>
      {PIXELS.map(([x, y, s, fill], index) => (
        <rect key={`${x}-${y}`} className={`pp-g-px pp-g-p${index + 1}`} x={x} y={y} width={s} height={s} rx={s * 0.22} fill={fill} />
      ))}
    </g>
  );
}

function Sparkles() {
  return (
    <>
      <path className="pp-g-sparkle" d="M300 92 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="#ffd166" />
      <path className="pp-g-sparkle" d="M70 120 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" fill="#f472b6" style={{ animationDelay: ".4s" }} />
      <path className="pp-g-sparkle" d="M286 300 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 Z" fill="#a78bfa" style={{ animationDelay: ".8s" }} />
      <path className="pp-g-sparkle" d="M52 300 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#60a5fa" style={{ animationDelay: "1.1s" }} />
    </>
  );
}

/** Closed, smiling eyes and an open grin: the joy every ghost shows for "Add to Chrome". */
function JoyFace() {
  return (
    <g className="pp-g-face pp-g-alt pp-g-happy">
      <path className="pp-g-ink" d="M136 170 Q150 152 164 170" strokeWidth="5" />
      <path className="pp-g-ink" d="M196 170 Q210 152 224 170" strokeWidth="5" />
      <path d="M162 204 Q180 228 198 204 Q180 212 162 204 Z" fill="#17151f" />
      <path d="M170 213 Q180 222 190 213 Q180 216 170 213 Z" fill="#ff6f9c" />
    </g>
  );
}

/**
 * The uninstall page's ghost: sad, waving goodbye, a tear running down its
 * cheek, its hem breaking into pixels. "Tell us why" gives it hope and
 * "Add it back" gives it joy (see the moods in mascot.css).
 */
export function SadGhost() {
  const p = "sad";
  return (
    <svg className="pp-ghost" viewBox="0 0 360 380" role="img" aria-label="The PixelGhost mascot, sad, waving goodbye with a tear on its cheek as its hem breaks into pixels">
      <defs>
        <GhostDefs p={p} />
        <GroundDefs p={p} />
        <radialGradient id={`${p}-tear`} cx="35%" cy="35%" r="70%">
          <stop offset="0" stopColor="#e6f7ff" />
          <stop offset=".5" stopColor="#7fd0ff" />
          <stop offset="1" stopColor="#3b9cff" />
        </radialGradient>
        <clipPath id={`${p}-lid-l`}>
          <path d="M118 163 L178 145 L178 200 L118 200 Z" />
        </clipPath>
        <clipPath id={`${p}-lid-r`}>
          <path d="M182 145 L242 163 L242 200 L182 200 Z" />
        </clipPath>
      </defs>
      <GhostGround p={p} />
      <g className="pp-g-cry">
        <ellipse className="pp-g-splash" cx="135" cy="350" rx="14" ry="3.5" fill="none" stroke="#9fdcff" strokeWidth="2" />
        <circle className="pp-g-drop is-a" cx="133" cy="346" r="2" fill="#9fdcff" />
        <circle className="pp-g-drop is-b" cx="138" cy="346" r="1.6" fill="#c9ecff" />
      </g>
      <Pixels />
      <g className="pp-g-float">
        <g className="pp-g-droop">
          <g className="pp-g-hop">
            <g className="pp-g-sob">
              <GhostBody p={p} />
              <g className="pp-g-face pp-g-rest">
                <g className="pp-g-eyes">
                  <g clipPath={`url(#${p}-lid-l)`}>
                    <ellipse cx="150" cy="166" rx="15.5" ry="20" fill={`url(#${p}-eye)`} />
                    <g className="pp-g-look">
                      <circle className="pp-g-shine" cx="144" cy="162" r="5.5" />
                      <circle className="pp-g-shine" cx="156" cy="174" r="2.4" />
                    </g>
                    <path className="pp-g-welling" d="M136 176 Q150 192 164 176 Q150 184 136 176 Z" />
                  </g>
                  <g clipPath={`url(#${p}-lid-r)`}>
                    <ellipse cx="210" cy="166" rx="15.5" ry="20" fill={`url(#${p}-eye)`} />
                    <g className="pp-g-look">
                      <circle className="pp-g-shine" cx="204" cy="162" r="5.5" />
                      <circle className="pp-g-shine" cx="216" cy="174" r="2.4" />
                    </g>
                    <path className="pp-g-welling" d="M196 176 Q210 192 224 176 Q210 184 196 176 Z" />
                  </g>
                </g>
                <path className="pp-g-ink" d="M131 158 L169 147" />
                <path className="pp-g-ink" d="M229 158 L191 147" />
                <path className="pp-g-ink" d="M134 136 Q150 130 164 122" />
                <path className="pp-g-ink" d="M226 136 Q210 130 196 122" />
                <path className="pp-g-ink pp-g-quiver" d="M166 214 Q173 207 180 210 Q187 207 194 214" />
              </g>
              <g className="pp-g-face pp-g-alt pp-g-hope">
                <ellipse cx="150" cy="166" rx="15.5" ry="20" fill={`url(#${p}-eye)`} />
                <ellipse cx="210" cy="166" rx="15.5" ry="20" fill={`url(#${p}-eye)`} />
                <g className="pp-g-look">
                  <circle className="pp-g-shine" cx="144" cy="159" r="6" />
                  <circle className="pp-g-shine" cx="156" cy="173" r="2.6" />
                  <circle className="pp-g-shine" cx="204" cy="159" r="6" />
                  <circle className="pp-g-shine" cx="216" cy="173" r="2.6" />
                </g>
                <path className="pp-g-ink" d="M136 130 Q150 124 164 128" />
                <path className="pp-g-ink" d="M224 130 Q210 124 196 128" />
                <ellipse cx="180" cy="210" rx="5.5" ry="6.5" fill="#17151f" />
              </g>
              <JoyFace />
              <g className="pp-g-cry">
                <path className="pp-g-trail" d="M138 186 Q133 202 134 220" />
                <g className="pp-g-tear">
                  <path d="M138 182 C142 188 145 192 145 196 A7 7 0 0 1 131 196 C131 192 134 188 138 182 Z" fill={`url(#${p}-tear)`} />
                  <ellipse cx="135.5" cy="194" rx="1.8" ry="2.6" fill="#fff" opacity=".9" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
      <Sparkles />
    </svg>
  );
}

/**
 * The home hero's ghost: happy, waving hello, assembling from the pixels that
 * fly into its hem. "Add to Chrome" makes it hop for joy.
 */
export function HappyGhost() {
  const p = "home";
  return (
    <svg className="pp-ghost is-home" viewBox="0 0 360 380" role="img" aria-label="The PixelGhost mascot, happy, waving hello as colorful pixels fly in to form it">
      <defs>
        <GhostDefs p={p} />
        <GroundDefs p={p} />
      </defs>
      <GhostGround p={p} />
      <Pixels />
      <g className="pp-g-float">
        <g className="pp-g-droop">
          <g className="pp-g-hop">
            <GhostBody p={p} />
            <g className="pp-g-face pp-g-rest">
              <g className="pp-g-eyes">
                <ellipse cx="150" cy="166" rx="16" ry="21" fill={`url(#${p}-eye)`} />
                <ellipse cx="210" cy="166" rx="16" ry="21" fill={`url(#${p}-eye)`} />
                <g className="pp-g-look">
                  <circle className="pp-g-shine" cx="145" cy="160" r="6.5" />
                  <circle className="pp-g-shine" cx="156" cy="174" r="2.8" />
                  <circle className="pp-g-shine" cx="205" cy="160" r="6.5" />
                  <circle className="pp-g-shine" cx="216" cy="174" r="2.8" />
                </g>
              </g>
              <path className="pp-g-ink" d="M136 134 Q150 126 164 131" />
              <path className="pp-g-ink" d="M224 134 Q210 126 196 131" />
              <path className="pp-g-ink" d="M166 206 Q180 220 194 206" />
            </g>
            <JoyFace />
          </g>
        </g>
      </g>
      <Sparkles />
    </svg>
  );
}

/** The tour's tool tags, above the window: colour, width and ink per tool. */
const TOOLS = [
  { label: "Layers", fill: "rgb(236 72 153 / 0.88)", ink: "#fdf2f8", w: 70 },
  { label: "Page Ruler", fill: "rgb(255 209 102 / 0.92)", ink: "#17151f", w: 86 },
  { label: "Color Picker", fill: "rgb(255 121 75 / 0.94)", ink: "#17151f", w: 96 },
  { label: "Screenshot", fill: "rgb(96 165 250 / 0.92)", ink: "#0b1530", w: 88 },
] as const;

/**
 * The tools guide's scene: the ghost peeks over a browser window with a
 * magnifying lens and shows Layers, the Page Ruler, the Color Picker and
 * Screenshot at work, one after another. Hovering the window hands the lens to
 * the pointer (components/mascot-gaze.tsx).
 */
export function GuideTour() {
  const p = "tour";
  return (
    <svg viewBox="0 0 400 320" role="img" aria-label="The PixelGhost mascot peeks over a browser window with a magnifying lens, showing the Layers, Page Ruler, Color Picker and Screenshot tools in turn">
      <defs>
        <GhostDefs p={p} />
        <linearGradient id="tour-win" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#231f3d" />
          <stop offset="1" stopColor="#18162b" />
        </linearGradient>
        <radialGradient id={`${p}-glass`} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".38" />
          <stop offset=".6" stopColor="#c4b5fd" stopOpacity=".16" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity=".3" />
        </radialGradient>
        <linearGradient id={`${p}-lens-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>

      {/* the ghost, behind the window, peeking over its right edge */}
      <g className="pp-tour-cheer pp-tour-fx">
        <g className="pp-tour-bob">
          <g transform="translate(246 18) scale(.5)">
            <ellipse cx="282" cy="200" rx="15" ry="27" transform="rotate(-20 282 200)" fill={`url(#${p}-arm)`} />
            <use href={`#${p}-outline`} fill={`url(#${p}-body)`} />
            <use href={`#${p}-outline`} fill={`url(#${p}-hem)`} />
            <use href={`#${p}-outline`} fill="none" stroke={`url(#${p}-rim)`} strokeWidth="3" />
            <ellipse className="pp-g-spec" cx="136" cy="94" rx="28" ry="14" transform="rotate(-32 136 94)" />
            <ellipse className="pp-g-cheek" cx="128" cy="196" rx="16" ry="9" />
            <ellipse className="pp-g-cheek" cx="232" cy="196" rx="16" ry="9" />
            <g className="pp-tour-eyes">
              <ellipse cx="150" cy="166" rx="16" ry="21" fill={`url(#${p}-eye)`} />
              <ellipse cx="210" cy="166" rx="16" ry="21" fill={`url(#${p}-eye)`} />
              <g className="pp-tour-look pp-tour-fx">
                <circle className="pp-g-shine" cx="146" cy="160" r="6.5" />
                <circle className="pp-g-shine" cx="156" cy="174" r="2.8" />
                <circle className="pp-g-shine" cx="206" cy="160" r="6.5" />
                <circle className="pp-g-shine" cx="216" cy="174" r="2.8" />
              </g>
            </g>
            <path className="pp-g-ink" d="M136 134 Q150 126 164 131" />
            <path className="pp-g-ink" d="M224 134 Q210 126 196 131" />
            <path className="pp-g-ink" d="M168 206 Q180 218 192 206" />
          </g>
        </g>
      </g>

      {/* the browser window and the page in it */}
      <rect className="pp-tour-win" x="34" y="74" width="262" height="206" rx="14" fill="url(#tour-win)" />
      <path d="M34 96 H296" stroke="rgb(255 255 255 / 0.1)" />
      <circle cx="52" cy="85" r="3.5" fill="#ec4899" />
      <circle cx="64" cy="85" r="3.5" fill="#ffd166" />
      <circle cx="76" cy="85" r="3.5" fill="#a78bfa" />
      <rect x="92" y="79" width="150" height="12" rx="6" fill="rgb(255 255 255 / 0.08)" />
      <rect x="50" y="106" width="10" height="10" rx="3" fill="#a78bfa" />
      <rect className="pp-tour-soft" x="216" y="109" width="18" height="4" rx="2" />
      <rect className="pp-tour-soft" x="240" y="109" width="18" height="4" rx="2" />
      <rect className="pp-tour-soft" x="264" y="109" width="18" height="4" rx="2" />
      <rect className="pp-tour-block" x="50" y="126" width="150" height="62" rx="8" />
      <rect className="pp-tour-line" x="62" y="140" width="98" height="9" rx="4.5" />
      <rect className="pp-tour-soft" x="62" y="155" width="74" height="6" rx="3" />
      <rect className="pp-tour-soft" x="62" y="166" width="58" height="6" rx="3" />
      <rect className="pp-tour-block" x="50" y="198" width="96" height="62" rx="8" />
      <rect x="58" y="206" width="80" height="30" rx="5" fill="rgb(96 165 250 / 0.28)" />
      <rect className="pp-tour-soft" x="58" y="244" width="52" height="5" rx="2.5" />
      <rect className="pp-tour-block" x="156" y="198" width="50" height="62" rx="8" />
      <rect x="162" y="206" width="38" height="30" rx="5" fill="rgb(236 72 153 / 0.25)" />
      <rect x="216" y="205" width="62" height="18" rx="9" fill="#ff794b" />
      <rect x="228" y="212" width="38" height="4" rx="2" fill="rgb(17 18 16 / 0.55)" />
      <rect className="pp-tour-soft" x="216" y="232" width="62" height="5" rx="2.5" />
      <rect className="pp-tour-soft" x="216" y="243" width="44" height="5" rx="2.5" />

      {/* Layers: the page's square, and the design layer over it, offset like the logo */}
      <rect x="218" y="130" width="52" height="52" rx="12" fill="#8b5cf6" />
      <rect className="pp-tour-design pp-tour-fx" x="218" y="130" width="52" height="52" rx="12" fill="#ec4899" opacity=".78" />
      <g className="pp-tour-check pp-tour-fx">
        <circle cx="270" cy="130" r="8" fill="#34d399" />
        <path d="M266 130 l3 3 5-6" fill="none" stroke="#062e1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Page Ruler: across the first card */}
      <g className="pp-tour-ticks pp-tour-fx">
        <path className="pp-tour-measure" d="M50 268 v-6 M146 268 v-6" />
      </g>
      <path className="pp-tour-measure pp-tour-ruler pp-tour-fx" d="M50 265 H146" />
      <g className="pp-tour-ruler-tag pp-tour-fx">
        <rect x="80" y="270" width="36" height="15" rx="7.5" fill="#ffd166" />
        <text className="pp-tour-label" x="98" y="280.5" textAnchor="middle">
          96px
        </text>
      </g>

      {/* Color Picker: the button, sampled */}
      <rect className="pp-tour-ring pp-tour-fx" x="212" y="201" width="70" height="26" rx="13" fill="none" stroke="#fff" strokeWidth="1.6" />
      <g className="pp-tour-swatch pp-tour-fx">
        <rect x="232" y="176" width="70" height="20" rx="10" fill="#f2f3ed" />
        <circle cx="243" cy="186" r="6" fill="#ff794b" />
        <text className="pp-tour-label" x="253" y="189.5">
          #FF794B
        </text>
      </g>

      {/* Screenshot: an area round the hero, a flash, a thumbnail */}
      <g className="pp-tour-select pp-tour-fx">
        <rect x="47" y="123" width="156" height="68" rx="9" fill="rgb(255 255 255 / 0.04)" />
        <rect className="pp-tour-ants" x="47" y="123" width="156" height="68" rx="9" />
      </g>
      <rect className="pp-tour-flash pp-tour-fx" x="47" y="123" width="156" height="68" rx="9" fill="#fff" />
      <g className="pp-tour-thumb pp-tour-fx">
        <rect x="150" y="18" width="62" height="46" rx="6" fill="#f2f3ed" />
        <rect x="155" y="23" width="52" height="30" rx="3" fill="#2a2546" />
        <rect x="160" y="30" width="30" height="4" rx="2" fill="rgb(255 255 255 / 0.5)" />
        <rect x="160" y="38" width="22" height="3" rx="1.5" fill="rgb(255 255 255 / 0.3)" />
      </g>

      {/* the mitten on the window's edge, in front of it */}
      <g className="pp-tour-cheer pp-tour-fx">
        <g className="pp-tour-bob">
          <ellipse cx="298" cy="76" rx="10" ry="7" transform="rotate(-18 298 76)" fill={`url(#${p}-arm)`} />
        </g>
      </g>

      {/* the tool being shown */}
      {TOOLS.map((tool, index) => (
        <g key={tool.label} className={`pp-tour-tool is-${index + 1} pp-tour-fx`}>
          <rect x="34" y="50" width={tool.w} height="18" rx="9" fill={tool.fill} />
          <text className="pp-tour-tag" x={34 + tool.w / 2} y="62.5" textAnchor="middle" fill={tool.ink}>
            {tool.label}
          </text>
        </g>
      ))}

      {/* the lens, floating in the ghost's other mitten */}
      <g className="pp-tour-lens">
        <g className="pp-tour-hover">
          <path d="M15 15 L34 34" stroke="#2e1065" strokeWidth="7" strokeLinecap="round" />
          <path d="M15 15 L34 34" stroke="#5b21b6" strokeWidth="4" strokeLinecap="round" />
          <circle r="22" fill={`url(#${p}-glass)`} />
          <circle r="22" fill="none" stroke={`url(#${p}-lens-rim)`} strokeWidth="5" />
          <path d="M-13 -9 A15 15 0 0 1 -4 -16" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity=".85" />
          <ellipse cx="37" cy="37" rx="9" ry="7.5" transform="rotate(45 37 37)" fill={`url(#${p}-arm)`} />
        </g>
      </g>
    </svg>
  );
}
