# Mission Grey site design system: component guide

For builders of sibling pages (`/platform`, `/solutions`, `/use-cases`,
`/guild`, `/partners-guild`, `/api`, `/insights`, `/about`, `/contact`,
legal).
The homepage (`site/index.html`) is the reference implementation; this file
tells you how to stay on register. Read all of it before writing markup.

## Files and wiring

- `site/styles.css` is the whole design system. Link it with
  `<link rel="stylesheet" href="styles.css">` (relative; sibling pages that
  live in subfolders adjust the relative path accordingly, or sit flat in
  `site/`). Do not add page-local `<style>` blocks except for tiny
  page-specific layout that genuinely belongs nowhere else.
- Fonts live at `../fonts/*.woff2` relative to `site/` and are declared in
  `styles.css`. Never reference any external host for anything: no CDN, no
  analytics, no remote images. Assets come from `../assets/` on the ROOT page
(site/index.html) and `../../assets/` from sub-pages (`site/<page>/index.html`);
article-depth pages (`site/insights/<slug>/`) use `../../../assets/` and link
`../../styles.css`. Depth decides the prefix, always.
- Internal links are root-relative WITHOUT any base prefix and with a
  trailing slash: `href="/platform/"`. A base-path rewrite happens at
  deploy time; never write `/new/` into markup.
- Log in goes to `https://app.missiongrey.com/`. Request access goes to
  `/contact/`. See it on your decision (the session button, labelled Book a
  demo until round eight) goes to `https://calendly.com/lauri-missiongrey/30min`.
- Every page: `<a class="skip">`, one `<h1>`, semantic landmarks
  (`header/main/footer/nav/section`), the shared header and footer copied
  from `index.html` verbatim (only the current-page nav item may change
  state if you add one).

## Palette tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F1F3F5` | page ground: light gray, never white. There is one theme; no dark mode. |
| `--bg-1` | `#FAFBFC` | raised surfaces, alternate bands (`.sec-alt`) |
| `--bg-2` | `#E5E8EC` | chrome bars, recessed and hover surfaces |
| `--line` / `--line-2` | ink at 10% / 18% | hairlines / emphasized hairlines, corner ticks, edges around photographs |
| `--ink` | `#171A20` | headings, primary emphasis |
| `--ink-body` | `#3A414B` | body copy |
| `--ink-mute` | `#545C67` | secondary copy |
| `--ink-dim` | `#626B77` | labels and metadata; do not go dimmer than this for text |
| `--accent` | accent block | THE accent, as INK: links in running copy, the eyebrow tick, checker bullets, stage numbers, sector codes, quote rules, focus ring. |
| `--accent-hi` | accent block | the same ink under pressure. On a light ground "more" means DARKER, so hover always deepens, never brightens. |
| `--accent-fill` / `--accent-fill-hi` / `--accent-on` | accent block | the accent as a BLOCK plus the ink that sits on it: the primary button and the ground behind selected text (`::selection`), nothing else. |
| `--accent-mark` | accent block | small non-text marks that must stay legible at 6px: status dots, map pins, globe chokepoints. |
| `--accent-soft` | accent block | the accent as a wash behind a hovered hairline control. |
| `--signal` / `--signal-hi` | aliases | the old accent names, aliased to `--accent` / `--accent-hi`. Existing page-local CSS uses them; new work should use the accent names. |
| `--paper*` | warm paper set | ONLY inside `.sheet` artifacts (see below). Paper never leaks onto the page chassis; the chassis never leaks into the sheet. |

**The accent lives in ONE block** at the top of `styles.css` section 02.
Nothing else in the stylesheet, and nothing at all in any page, declares an
accent value: the whole site's accent is a single-block swap, and that is a
property to preserve. If you need an accent, use a token. Never use the
accent for decoration or for body text, and one accent per component is the
ceiling. A component may still print that one accent as several MARKS:
round eleven's gloss, under "Amber is the sequence" in the first
engagement's subsection below, is that three marks of one sequence role
are one accent and not three, so a flow may tick every station in amber
while a second, unrelated amber anywhere in the same component is still
over the ceiling.

### Building on a light ground

Three habits change from the earlier dark chassis, and they are the ones
that go wrong first:

- **Separation is a shadow, not a glow.** A raised object earns its lift
  from `--bg-1` plus a tight ink shadow. Nothing on the page glows.
- **Photographs need an edge.** On a dark ground an image separated itself
  by being brighter; on light gray a headshot or a document cover is often
  lighter than the ground, so every photograph carries a `--line-2`
  hairline. `--line` is for structure, `--line-2` is for image edges.
- **Hover deepens.** Every interactive state moves toward more ink, never
  toward white. `--accent-hi` is always darker than `--accent`.

Type scale tokens: `--fs-hero`, `--fs-h2`, `--fs-h3`, `--fs-lede`,
`--fs-body`, `--fs-small`, `--fs-label`. Spacing: `--sec-pad` (section
padding), `--head-gap`, `--max` (1200px content), `--max-nav` (1360px
header), `--pad` (24px gutters).

## Type system and voice

- `--sans` (Inter): headings, body, UI. Headings weight 600, tight
  tracking (inherited from base styles; do not override).
- `--mono` (JetBrains Mono): the instrument voice. All eyebrows, labels,
  buttons, captions, nav links, metadata. Mono text is small (10 to 13px),
  uppercase, letter-spaced. Mono is never used for paragraphs.
- `--serif` (Source Serif 4): the document voice. ONLY inside paper
  artifacts (`.sheet`) and long-form editorial content (insight articles).
  Never for UI on the page chassis.

Copy register: senior, concrete, calm. Sentences state facts and stop.
No hype adjectives, no "revolutionary", no "cutting-edge". Style law
(binding): **no em dashes, no en dashes, no exclamation marks** anywhere
in user-facing text. Use commas, colons, periods, or the middot entity
`&middot;` for label separators. American English. Headings are
sentence case and usually end with a period ("The instrument set.").
Non-breaking hyphen `&#8209;` in compound words that must not break
("decision&#8209;ready").

## Honesty labeling (binding convention)

Three tiers of imagery, three chromes. Never mix them.

1. **Real product screenshot** → `.window`. Only actual, unretouched
   screenshots of the shipping product may sit inside a `.window`; the
   product address in the bar is the claim "this is the product", and
   putting anything else in it is a false claim. Since round nine the
   window prints as a PLATE (`.window.win-plate`, section 25): a hairline
   frame and a ruled bar the address hangs from, no traffic lights, no
   lifted shadow, no radius. The address carries the claim; the operating
   system costume never did, and the chairman's counter-prompt names
   browser-window mockups as the thing to avoid. The bare `.window` chrome
   survives only for pages not yet in the visual system.
2. **Illustrative instrument** (drawn SVG maps, charts, diagrams) →
   `.frame` with corner ticks and a `.frame-bar` that carries the label
   `Illustrative view` on the right (`<span class="dim">Illustrative
   view</span>`). Drawn graphics never carry fabricated real-world numbers
   presented as fact.
3. **Illustrative document** (the Morning Brief and any other printed
   artifact) → `.sheet`, which must carry BOTH the
   `<span class="bf-tag">Illustrative edition</span>` tag in its header
   AND a figcaption ending in a sentence equivalent to "Contents shown are
   illustrative, not live intelligence."

No hardcoded dates anywhere on any page. Live datelines and clocks are
JS-written with a dateless static fallback (see Clock below). A copyright
year in the footer is the only permitted literal year.

## Claims law

Every factual claim (numbers, cadence, partners, quotes, ratings,
capabilities) must trace to something already published by Mission Grey:
the previous site, the platform itself, or a signed-off source a
Mission Grey lead can name. You may soften or drop claims;
you may not invent, upgrade, or extrapolate them. No customer names, no
logo walls, no customer counts, no pricing. Testimonials are quoted
verbatim with their exact anonymous attributions.

## Components

### Header (copy verbatim from index.html)

Sticky, blurred, hairline bottom. Desktop nav: Platform, Solutions,
Use cases, Guild, Partners, API, Insights, About + UTC clock + Log in +
Request access button. Mobile (`<=980px`): `details.mnav` burger panel
including Contact. The mobile panel carries the same labels as the desktop
nav; `/partners-guild/` reads "Partners" in both (the route kept its old
name when the Guild moved to `/guild/`). Logo is `../assets/mission-grey-logo-white.png` at `height:24px`.

### Clock

```html
<span class="utc" id="utc" aria-hidden="true"></span>
```
Left empty in markup; `.utc:empty{display:none}` hides it without JS. The
inline script writes `UTC hh:mm:ss` every second. Never prefill a time.

### Footer (copy verbatim from index.html)

Brand column (logo, one-line description, entity line "Mission Grey, Inc.
&middot; Delaware, United States"), then Platform / Solutions / Company /
Contact columns, offices line, legal row with
"&copy; 2026 Mission Grey. All rights reserved.", Privacy Policy, Terms
of Use, and the tag "Built for enterprise decision&#8209;makers".

### Section scaffold

```html
<section class="sec" id="..." aria-labelledby="x-h">
  <div class="wrap">
    <p class="rule-label">Chapter name</p>
    <div class="sec-head reveal" style="margin-top:44px">
      <p class="eyebrow">Three word framing</p>
      <h2 id="x-h">The section claim, as a sentence.</h2>
      <p>One dek paragraph, optional.</p>
    </div>
    ...
  </div>
</section>
```
`.rule-label` is the full-width chapter divider; use it when a section
starts a new chapter of the page, omit it for continuations. Add class
`sec-alt` for the raised band variant (used at most every other section;
two adjacent `sec-alt` bands are a composition error). A page hero for
sub-pages is the same scaffold with `<h1>` instead of `<h2>` and
`--fs-hero` scale, plus the `.hero-eyebrow` spacing.

### Eyebrow and rule label

`.eyebrow` = mono uppercase with a 14px accent tick. `.rule-label` = mono
uppercase with a trailing hairline. Both already styled; never restyle.

### Buttons

```html
<a class="btn btn-primary" href="/contact/">Request access</a>
<a class="btn btn-ghost" href="...">See it on your decision</a>
```
Primary is the accent block (`--accent-fill` with `--accent-on` type),
ghost is the hairline. It is the only filled surface on the page that is
neither ink nor ground, which is what makes one call to action findable.
Never invent a third variant, never put the accent in a ghost button's
resting state. CTA pairs: primary first.

### Corner-tick frame (instrument chrome)

```html
<div class="frame"><span class="tick"></span>
  <div class="frame-bar">
    <span class="live">Panel title</span>
    <span class="dim">Illustrative view</span>
  </div>
  ...content...
  <div class="frame-legend">
    <span class="li"><span class="sw amber"></span>Meaning</span>
  </div>
</div>
```
The `<span class="tick"></span>` child is required (it draws the bottom
corner ticks). `.sw.amber` is a legend swatch class name inherited from the
first build: it paints `--accent-mark`, whatever the accent is, and is not a
claim about the colour. `.frame-bar .live` gets the blinking `--accent-mark`
dot; use it only
on panels that represent continuous processes. Legend optional.

### Window (real product screenshots only)

```html
<figure class="shotfig">
  <div class="window">
    <div class="chrome" aria-hidden="true"><i></i><i></i><i></i><span class="url">app.missiongrey.com</span></div>
    <div class="win-body"><img src="../assets/product-screenshot-globe.jpg" width="1920" height="1090" loading="lazy" alt="..."></div>
  </div>
  <figcaption class="win-cap">Caption in mono</figcaption>
</figure>
```
Add `class="win-body crop"` to crop tall screenshots to 16:9.6 (top
anchored). Always set `width`/`height` attributes and a real descriptive
`alt`. `loading="lazy"` below the fold.

### Duo cards (paired screenshots with captions)

```html
<div class="duo">
  <figure class="shotfig dcard reveal">
    ...window with crop...
    <figcaption><h4>Claim</h4><p>One supporting sentence.</p></figcaption>
  </figure>
  ...second card...
</div>
```

### Sheet (paper artifact)

```html
<figure class="artifact reveal">
  <div class="sheet" role="img" aria-label="...describe, state contents are illustrative...">
    <div class="bf-head">
      <div class="bf-title">[mark svg] <b>The Morning Brief</b></div>
      <span class="bf-tag">Illustrative edition</span>
    </div>
    <div class="bf-date"><span id="bf-date">Daily edition &middot; 06:00 UTC</span><span>Prepared for: your organization</span></div>
    ...bf-lead / bf-rec / bf-items / bf-foot (see index.html)...
  </div>
  <figcaption><b>Above</b>...ends with the illustrative sentence.</figcaption>
</figure>
```
Serif inside, paper tokens only, both honesty labels mandatory. The
dateline is JS-written; the static fallback stays dateless.

### Cadence band

```html
<div class="cadence" role="list" aria-label="Operating cadence">
  <div role="listitem"><span class="v">4x daily</span><span class="k">News updates</span></div>
  ...
</div>
```
Exactly four cells on the homepage; reuse only with register-backed
numbers.

### Proof strip

```html
<section class="proofstrip" aria-label="...">
  <div class="wrap strip-row">
    <span class="strip-label">Research partnerships</span>
    <span class="inst">University of Cambridge<small>Judge Business School</small></span>
    ...
    <span class="strip-rule" aria-hidden="true"></span>
    <a class="strip-g2" href="...">Rated 5.0&#8201;/&#8201;5 by users on G2</a>
  </div>
</section>
```

### Stages (numbered narrative rows)

`.stage` = 5/7 copy+media grid, `.stage.flip` mirrors it. `.stage-num`
carries `01 &middot; MONITOR` in accent mono. `.stage-io` is the
INPUT/OUTPUT line. Media slot takes a `.shotfig` window.

### Capability cards

`.caps` grid of `.cap` articles: `cap-meta` (index `CAP&#8201;/&#8201;01`
+ 22px stroke icon), `h3`, one sentence. Icons are 1.5 stroke inline SVG,
`stroke:currentColor` inherited, no fills.

### Trust pipe and grid

`.pipe` = node/link chain (`Signal Model Decision Review`); `.trust-grid`
= 4 hairline cells with mono h3 labels.

### Sector index

`.sectors` list of `.sector` rows: mono `code` with an accent 3-letter
prefix, `desc`, `out` with the shared arrow SVG (copy the 14x10 arrow from
index.html). That arrow is `stroke="currentColor"` and takes its accent
from CSS; never write a colour into the markup.

### Quotes

`.quote-main` (accent left rule, large quote, `.attr` mono attribution) +
`.quote-row` cells. Quotes are register-verbatim; attribution format
`Role &middot; Org type &middot; name withheld`.

### Chips

`.chips` > `.chip` for domain tags. Mono, hairline, no interaction.

### Access panel

`.frame.access-panel` with tick span, centered: eyebrow, h2, one line,
CTA pair, `access-mail`. Ends every page that wants a close.

### The mark

Inline SVG checkerboard (fixed brand element, redraw nothing):

```html
<svg viewBox="0 0 36 36" aria-hidden="true">
  <rect width="36" height="36" fill="#181510"/>
  <path fill="#FDFCF8" d="M11 4h7v7h-7zM25 4h7v7h-7zM4 11h7v7H4zM18 11h7v7h-7zM11 18h7v7h-7zM25 18h7v7h-7zM4 25h7v7H4zM18 25h7v7h-7z"/>
</svg>
```
Use the PNG logo for the wordmark; the SVG mark is for paper artifacts and
small brand moments. The wordmark asset is white-on-transparent, drawn for
the earlier dark chassis, and is rendered onto the light ground by a CSS
filter (`.logo img,.foot-brand img`) rather than by editing the asset. A
dark-ink PNG export would retire that line. The `.checker` utility (6px
conic-gradient checkerboard) is the mark at its smallest: a bullet or
caption marker in the accent. Use `.win-cap::before` and `.checker` as
the only list-marker treatments.

### Reveal motion

Add class `reveal` to blocks that should rise in on scroll. The shared
script (copy from index.html) gates it behind `html.js`, so no-JS shows
everything; `prefers-reduced-motion` disables it entirely. Do not invent
other animations. Permitted motion inventory: reveal rise, the blink dot,
the map ping, sheet hover lift, color transitions. Nothing else moves.
WCAG 2.1 SC 2.2.2 (AA pass, 2026-09-01): the blink dot pulses twice and
rests (4.8s, under the five-second bar); the hero globe, the one thing that
moves longer, carries its own Pause control in its caption (`.globe-pause`,
home page only), which freezes the globe and rests the dots on that page.

## Layout and responsive rules

- Content max 1200px (`.wrap`), header 1360px. Breakpoints in use: 1200
  (clock hides), 980 (burger nav, hero stacks), 900 (grids collapse), 700
  (cadence 2x2, map labels hide, url pill hides), 560 (single column,
  full-width buttons).
- Test 1440 and 390. No horizontal scroll anywhere at any width. Wide
  content scrolls inside its own container, never the page.
- Images: always `width`/`height` attributes, `loading="lazy"` below the
  fold, real alt text.
- Accessibility floor: WCAG AA contrast (never set text dimmer than
  `--ink-dim` on `--bg` or smaller than the sizes used here), visible
  focus (`:focus-visible` accent ring is global), aria-labels on icon-only
  controls and every `nav`.
- Weight: keep each page's HTML+CSS+JS under ~400KB before fonts. No
  base64 images. Zero external network requests.


## Integration-round additions (2026-08-22, #80)

- Active nav: mark the current page's nav link with `aria-current="page"`;
  styles.css now carries the state (`.nav-main a[aria-current="page"]`).
- Access panel: the `.access-mail` top-margin fix lives in styles.css; do
  not re-fix locally.
- Sub-page hero convention: `class="hero sec"` on the hero section, one
  `<h1>`, single column (builder-A pattern, adopted site-wide).
- Long-form registers in the wild: legal pages use a sans `.doc-*` layout
  (reference material), articles use the serif `.art-*` layout (editorial).
  Both are page-local for now; promotion into styles.css is a post-preview
  cleanup decision.


## Production round additions (2026-08-22)

### Head block every page carries

Below the existing title / description / canonical / og / twitter set:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" href="../assets/favicon-180.png">
<link rel="apple-touch-icon" href="/assets/favicon-180.png">
<link rel="stylesheet" href="styles.css">
<script src="../assets/consent.js" data-ga="__GA_MEASUREMENT_ID__" defer></script>
```

The two icon links that start with `/` are deliberate: the site is served
from the apex, and `/favicon.ico` is fetched by browsers whether it is
linked or not. Everything else keeps the depth rule. `twitter:card` is
mandatory now; `404.html` carries no canonical and no `og:url` on purpose,
because Pages serves it at every address.

Social images: an article's `og:image` and `twitter:image` are that
article's own cover, so a shared link previews the piece rather than the
brand. Every other page uses `/assets/og-image.jpg`. Write both as
root-relative paths; the build makes them absolute.

Structured data: the home page carries `Organization` + `WebSite`, each
article carries `Article`, as `application/ld+json` in the head. Every value
in them is a fact already printed on the page (h1, byline, `<time>`, cover
image). Do not put anything in JSON-LD that a reader cannot see.

### Consent notice (styles.css section 14)

The one exception to "zero external network requests": Google Analytics 4,
and only after the visitor clicks `Allow`. `assets/consent.js` renders the
notice, stores the answer under `mg-consent`, and injects gtag.js only in
the granted case. While `data-ga` still holds the build token, the script
returns immediately: no banner, no request. So the default state of the
site is still zero external requests.

The notice is the second paper object in the system, alongside `.sheet`. It
reads as a printed slip laid on the desk rather than as UI chrome, which is
why it uses the paper tokens rather than the chassis tokens. It has no motion of any
kind. If the register ruling changes, the whole component is the
`.consent*` block at the end of styles.css.

### Asset formats

Photographic covers are JPEG, flat illustrations and diagrams are PNG. A
photograph saved as PNG costs several megabytes for no gain. Keep every
cover under about 400KB and run `-auto-orient` before stripping metadata,
otherwise a phone photo with an EXIF rotation flag loses it and lands
sideways.


## Newsletter round additions (2026-08-30)

### Newsletter covers

The Guild Newsletter covers in `/insights/#newsletters` are renders of page 1
of the published PDFs: real documents, not drawn artifacts and not product.
They take none of the three honesty chromes. A `.window` would claim they
are the product and a `.sheet` would label a real edition illustrative; both
would be false.

Trim the render before scaling (`magick ... -fuzz 2% -trim +repage`). An
untrimmed A4 render carries the page's white margin, which on the dark
chassis reads as a lit paper slab and takes over the section. The remaining
`var(--line)` hairline sits against the printed edge and does separate the
cover from the card; use that one token for every cover, large or small.

**Inverted hierarchy, binding.** A large cover appears on the latest edition
only, at 300px in the `.frame`. Every other cover is a small mark 120px
tall. The reason is honesty, not taste: these PDFs print their own
cover lines, which are not always the edition title Mission Grey publishes
(May prints "Transforming Alliances, Reshaping Regulations, Reconsidering
Supply Chains" under the published title "The New Geopolitical Economy").
At 120px that printed text is texture and the caption below it is the only
readable title; at archive-card size it would be a second, contradicting
headline.

**One fixed frame for the thumbnails, binding.** Every archive cover renders
in the same 90x120 box with `object-fit:cover`. Never give a thumbnail a
free dimension (`width:auto`, `height:auto` or `object-fit:contain`): the
sources are page renders of different documents and their trimmed aspect
ratios are never uniform, so a free dimension produces three different
widths in one row, under an article grid that is perfectly regular. The
fixed box is what makes the row read as a set. Render the sources at 180x240
(the box at 2x) so the crop is decided once, in the render, and the CSS
`object-fit` only has to hold the line for a source that arrives off-ratio.

Alt text follows from the same split. The latest cover is the section's
anchor image, so its `alt` describes what the picture shows. The archive
thumbnails carry no information the adjacent month and title do not already
give, and describing them would repeat the caption or, worse, restate the
printed cover line, so they take `alt=""`.

### Newsletter section layout

`.nl` is a two-object top row, not a two-column article: the pitch on the
left, the latest edition's cover in its `.frame` on the right. Both are
sized to their own content rather than to a fraction of the grid. The frame
is `width:max-content` and holds nothing but the cover, so it hugs it and
sits `justify-self:end`, on the section's right rail; the pitch keeps a
520px reading measure inside a `1fr` column. Sizing them this way is what
keeps their two ends level (46px apart at 1440, under 50px from 900 up):
the earlier version put the highlights inside the frame, which ran the
frame 500px past the end of the pitch and left half the left column as
empty ground.

Everything the edition itself says then runs the full width below one
divider: `.nl-ed` carries the mono `Latest edition · <Month> <Year>` line,
the edition title as the `h3`, and `.nl-hi` under them. The title heads the
highlights instead of floating beside the cover, which is also what gives it
a top edge to sit on. Each highlight is one hairline row, `h4` left and its
sentence right, the same row grammar as the episode list; below 900px the
row stacks and the frame moves to the left rail, where it still hugs the
cover, so no width ever leaves dead space beside it.

The one label in the pitch, `.nl-what-lbl`, is a mono uppercase label at
label scale like every other label on the site, and carries no colon: a
label is not a sentence with something missing. It keeps the `id` the
checklist points at with `aria-labelledby`.

Two sizing details are load-bearing. The frame needs `max-width:100%` and
its single-column grid needs `minmax(0,1fr)` rather than `1fr`: a bare `1fr`
takes the frame's max-content width as the column floor and pushes the whole
block past the wrap on a phone, instead of letting the frame clamp to the
section grid and the cover shrink with it. That clamp is what puts the
frame's border on the same rails as the hairlines below it and leaves the
cover equal gutters inside.

### Newsletter archive cards

`.nl-cards` is the same hairline-per-card grid as `.ins-cards`, four across,
two at 1000px, one at 640px. Every past edition stays in it (Jouko,
2026-09-06); a growing archive wraps into rows, nothing drops off. Each `.nl-card` carries the thumbnail, a mono
month label, the issue title as an `h4`, and one `.nl-dl` download link to
`/newsletters/<file>.pdf` with the shared 14x10 accent arrow. "Archive" is a
real `h3` wearing `.rule-label`, so the card titles sit under a group
heading rather than directly under the section `h2`.

The thumbnail is wrapped in a second anchor to the same PDF, marked
`aria-hidden="true" tabindex="-1"`: the card lights on hover, so its largest
object must not be a dead click, but assistive technology and the keyboard
should still meet exactly one link per card. Give the visible download link
an `aria-label` naming the edition, since three links with identical text
read alike out of context, and keep the words "Download PDF" intact at the
start of that label so the accessible name still contains the visible one.
Hover states on the card need `:focus-within` counterparts, otherwise the
card stays inert while the link inside it is focused.

The latest edition is shown as the cover in the `.frame` with its edition
line, title and highlights full width below, and is never offered as a
download anywhere on the page: it is requested by mail through the
`/contact/` CTA. One line above the cards
says so ("Editions before the current one are direct downloads."), which is
also what explains the absence of the current month from the archive. The
page carries no email form.


## Content evolution additions (2026-09)

### Example application (honesty tier 2 variant)

A real screenshot of an application BUILT ON the platform but not served
from `app.missiongrey.com` (a customer or country dashboard, a demo) is
neither the product nor a drawn graphic, so it takes neither `.window`
nor the `Illustrative view` label. It sits in a `.frame` whose bar names
the artifact on the left and carries the dim label `Example application`
on the right, wrapped in `figure.appfig` with a figcaption that ends in
`figures illustrative`. Used on the home, Platform and Solutions pages;
`.window` with the url pill is reserved for the core product UI only.

### Instrument components added for the homepage

All in `styles.css` section 15, tokens only, one accent per component:
`.levels`/`.level` (the global-to-local layer table), `.loop-row`/
`.loop-node`/`.loop-back` (the decision engine), `.agents`/`.agent-card`
(Check this, Do this), `.chain-list` (the worked example), `.rx-*` (the
recipe architecture), `.method`/`.principle` (the more-than-AI list),
`.vs` (the small general-purpose AI comparison), `.arch-*` (the shared
layer and team views), `.duo-copy`, `.sec-note`, `.more-link`, `.taglist`,
`.cap-wide` (the thirteenth capability card spans the row). Diagrams live
in `.frame` with `Illustrative view`; the `.live` dot stays off them.


## Round two additions (2026-09)

The editing and reorganization pass. No new visual identity, no new
palette: this round moved content between pages, cut the home page back,
and added the few components that the new arrangement needed. All of it
lives in `styles.css` section 16.

### The page division, binding

Each page answers one question, and content that answers a different one
belongs on the page that owns it:

| Page | Question | Owns |
|---|---|---|
| Home | Why Mission Grey matters | the business problem, urgency, the difference, the shortest version of everything else |
| Platform | How Mission Grey works | global to local in full, the walkthrough and every product screenshot, the decision engine, the full recipe, method, the instrument set, trust, the application layer |
| Solutions | How you start and how it expands | the three levels, the progression, daily use by function, interaction modes |
| Use cases | Where organizations use it | the six decision contexts |

What moved off Home in this round: the four-stage walkthrough with its
eight product screenshots, the Morning Brief `.sheet`, the decision engine
loop and the agent cards, the full recipe stack, the methods list and the
`.vs` comparison, the thirteen-card instrument set, and the sector index.
Home keeps short versions of the global-to-local table and the recipe by
design (the chairman's instruction: keep the idea, move the detail), and
three product visuals in total.

Home carries **at most four major product visuals**. It currently has
three: the monitoring screen and the recommendations screen in `#system`,
and the one real customer application capture in `#apps`. Adding a fourth
is a judgment call; adding a fifth is a regression.

### Promoted out of page-local blocks

- `.ilink` (accent inline link on a hairline) was declared identically in
  the Platform, Solutions and Use cases `<style>` blocks. It is in
  styles.css now and those three copies are gone. No page declares it
  locally any more; `grep -rn '\.ilink{' site/**/*.html` returns nothing.
- `.trust-grid.grid-3` is the hairline cell grid at three across, promoted
  from the same Platform block.

### Modifiers on existing instruments

- `.rx-cols.rx-2` sets the recipe columns to two, which is how the
  inside/outside contrast in `#outside` is built: `.frame` > `.rx-stack` >
  `.rx-cols.rx-2`, with a `.level-out` bar as a direct child of the frame
  so it runs full bleed under the padding.
- `.loop-4` and `.loop-3` run the decision-engine loop at four nodes (the
  Monitor / Analyze / Decide / Act pipeline on Home) and three (the
  adoption path on Solutions). Both collapse to one column at 900.
- `.vs-2` puts the two chains of the comparison box side by side. Without
  it `.vs` stacks, which is right in a narrow column (Platform) and wrong
  in a wide one (the decision-latency block on Home). Any `max-width` rule
  that could reach a `p` inside `.vs` must be scoped to the copy column,
  not the block: `.vs-note` is a `p` and inherits whatever you leave open.

### Hairline grids may not leave an empty track, binding

`.steps`, `.trust-grid`, `.caps`, `.arch-roles`, `.quote-row`, `.rx-cols`
and `.agent-cards` are all built the same way: `gap:1px` over a container
whose background is `var(--line)`, with each cell painting its own
`var(--bg)`. The hairlines are the gaps. That means **an empty grid track
is not empty space, it is a solid block of line colour**, and it reads as
a broken cell rather than as air.

So the count that matters is items modulo columns, **at every breakpoint**,
not only at the narrowest one. Two defects in one round came from checking
only the last breakpoint: five `.step` cells over three columns at 980, and
three `.trust-grid.grid-3` cells over two columns at 900. Span the
remainder (`grid-column:span 2`, or `1/-1` for a single leftover), or drop
to one column. Where a component can carry a variable number of cells, give
it a modifier that states the count: `.quote-row.quote-1` is the two-column
quote row holding a single cell.

Check 1440, 1080, 980, 900, 760, 700, 560 and 485. The breakpoints in use
are not evenly spaced and a grid can be clean at 1440 and at 390 while
being broken through the whole tablet range.

### New components

- `.latency` (+ `.latency-copy`): the copy column beside the two chains.
- `.arch-roles` / `.arch-role`: the role views under `.arch-band`. Each
  cell is the mono function label and the question that function actually
  arrives with. It is not an org chart and it is not long cards: one
  question per cell, nothing else.
- `.steps` / `.step`: five hairline cells, no arrows, no chrome. Used for
  Ask, Monitor, Receive, Share, Act. **It deliberately takes no `.frame`**:
  it is a description of what a day looks like, not a claimed view of
  data, so it may not wear instrument chrome. The same reasoning keeps the
  three-cell upside/adapt/downside triad in a bare `.trust-grid.grid-3`.
- `.funcs` / `.func`: the Solutions index of daily use by function. Three
  columns per row: mono label, the arriving question in ink, the value in
  mute. Collapses to one column at 900.
- `.ladder` / `.ladder-node` / `.ladder-meter`: the Solutions adoption
  path. One device, not two. The three levels **are** the progression, so
  each node carries its own name, sentence and `.pts` bullets, with
  `.loop-arrow` between them. The meter (one, two, three filled bars) is
  drawn in `var(--ink)` rather than the accent, because the checker
  bullets inside the node already hold the component's one accent role.
- `.quote-row.quote-1`: the quote row carrying a single cell.
- `.beta` and `.caps-note`: see below.

### Deleted this round

`.arch-teams` / `.arch-team` (the nine-cell team strip under the shared
layer) lost its only user when the shared-layer diagram became
`.arch-roles`, so the component and its two breakpoint rules are gone.
`.arch-band::after`, the connector stub between band and grid, stays: it is
sized to the 28px margin that `.arch-roles` also uses.

### One diagram, one direction, binding

The intelligence architecture appears on Home in short form and on Platform
in full. **Both flow the same way: inputs at the top, the decision engine
in the middle, decision-worthy intelligence at the bottom, and the same
three pillar names (Data and context / Models and methods / Human
intelligence) on both pages.** Platform extends the shared diagram
downward from the inputs, with the intelligence base and the three added
source classes sitting under the pillars they stock; it does not invert the
flow or rename the pillars. A reader who follows Home's "full recipe" link
has to arrive at the same object, opened up.

The same rule applies to every section that exists on both pages at two
depths. Round two had three of them (`#breadth`, `#recipe`, `#trust`);
since round three `#breadth` is Platform's alone, and the pairs are
`#recipe` and `#trust`. Platform's headings and deks say what the deeper
chapter adds; they are never a verbatim copy of Home's.

### Diagram density

The organizational architecture diagram on Platform is capped at **four
chips per layer**, with the remainder of every layer carried in one prose
line under the frame. Forty-four chips of equal weight is a wall, not a
diagram, and on a phone it became a three-screen ladder. Every layer name
the chairman listed stays; the items that stop being chips stop being
chips, they do not stop existing. The decision layer names its five objects
nowhere on that diagram: they are already drawn in the recipe on the same
page, so the band points at `#engine` instead, which is the section that
names them in prose.

### Beta labels on the instrument set

`.beta` is a one-token mono tag inside a `.cap` heading, with
`.caps-note` under the grid saying what it means. Five of the thirteen
instruments carry it: Forecasting, Scenario simulation, Knowledge Graph,
Expert intelligence and Private data rooms. That list is not a judgment,
it is a reading of the product's own sidebar, which labels Chronos
Forecast, Scenario Simulation, Knowledge Graph, Delfoi Questions and Data
Rooms as BETA (Theme Browser is also labelled but is not one of the
thirteen). The site says what the product says. When a label comes off in
the app, delete the span; nothing else changes.

### Still-live components that left the home page

`.sectors` / `.sector` is no longer on Home or Solutions. It is still used
on the API page, so the CSS stays. The Solutions industry rows were cut as
a duplicate of Use cases, and the `.ind` overrides in the Solutions
page-local block went with them.


## Round three additions (2026-09-11)

The second editing pass, on the same rule as the first: no new visual
identity, no new palette, no new components and no new tokens; three
spacing corrections against existing selectors are listed at the end of
this section. Every section below reuses a component that was already here. The pass answered the
chairman's round-three note, whose object was a home page that gets a
senior reader to "why do we need this, why now, why Mission Grey, is it
easy to use" before it shows product.

### What Home looks like now

In order: hero, proof strip, the business problem (`#outside`), "Don't be
surprised." (`#prepared`), "External intelligence should not depend on who
happens to be looking." (`#shared`), the four-stage pipeline (`#system`),
the short recipe (`#recipe`), daily use (`#daily`), "One outside world.
Different decisions." (`#roles`, which also carries the example
application), trust (`#trust`), access.

What left Home this round: the four-level global-to-local table (Platform
has "The four levels, opened up." and now carries the definition sentence
with it), the worked example chain (**moved** to Platform, where it closes
the walkthrough), the "Built for the grey zone." name band (**moved** to
`/about/`), the decision-latency comparison, one of the two product
screenshots, and the separate Applications section (folded into `#roles`).
Two things came back after review: the five decision objects inside the
recipe's engine band, and the evidence pair in `#trust`, one Guild line
positioned as "Human expertise, built into the intelligence system." and
the Export Agency testimonial, which is published nowhere else on the site.
The order changed as much as the contents: the organizational problem now
sits third, before any product, and the role views left `#shared` to become
their own short section after daily use.

Nothing was deleted outright this round. Two sections moved to the page
that owns their question, which is the same rule the page division states:
the worked example is product proof, so it belongs on Platform, and the
name band is company writing, so it belongs on About.

Home measured 14426px tall at 1440 before the pass and 11396px after it.

### Home's product visuals, binding (supersedes the round-two count)

Home carries **at most two major product visuals**: one real product
screenshot (the recommendations screen in `#system`) and one example
application capture (`#roles`). The hero globe is a drawn instrument and is
not one of the two. Round two allowed four and used three; the chairman's
round-three instruction was to reduce screenshots significantly and move
most of them to Platform, which is where the other eight now are. A third
product visual on Home is a judgment call, a fourth is a regression.

### Diagrams at two depths, restated

Home's short recipe now carries chips rather than sentences under the three
pillars (Data and context, Models and methods, Human intelligence), and the
decision-engine band in the middle carries its five objects as chips, the
same five the full recipe on Platform draws, so the diagram is never a
hollow box on either page. The flow direction, the pillar names and
the order are unchanged, so the "one diagram, one direction" rule still
holds between Home and Platform. `#roles` reuses the `.arch-band` +
`.arch-roles` diagram that round two put inside `#shared`; the CSS comment
in section 16 already called it `#roles`, and now it is.

### Deleted this round

Four components lost their only user with the sections that carried them
and are gone from styles.css, along with their breakpoint rules:
`.duo-copy` (the paired copy block), `.arch-recv` (the delivery-forms row),
`.latency` / `.latency-copy` and `.vs-2` (the decision-latency block), and
`.quote-row.quote-1`. `.vs` itself stays: Platform uses it. `.chain-list`
was deleted and then restored when the worked example moved to Platform
instead of being cut. `.loop-back`, the feedback line under the decision
engine, went when that diagram stopped being drawn a second time; the
pre-existing `.loop-3` has no user either, and is left for whoever next
audits the stylesheet.

The name band (`.name-grid`, `.name-copy`, `.resolve`, `.resolve-cap`) has
a user again: the section moved to `/about/`, between "Why Mission Grey
exists." and the people, which is where the company story sits. It is the
only piece of brand writing on the site and the mark sequence is a brand
object rather than a page device, so it moved rather than went.

### Apostrophes, observed convention

Chassis pages use the straight ASCII apostrophe in display copy and body
copy alike: `customer's environment`, `Mission Grey's Privacy Policy` in a
privacy `h2`, `today's`, `buyer's`, twenty-two of them and no typographic
one. The curly apostrophe appears only in the editorial register, inside
insight articles and the article titles quoted on `/insights/`, where the
text is reproduced as published. "Don't be surprised." on Home therefore
takes the straight apostrophe. If that ruling ever flips it flips for the
whole chassis at once, not for one heading.

### Spacing corrections made against existing selectors

Three, all of them slots where a component had no spacing contract:
`.rx-stack .taglist` (was `.rx-band .taglist`, so chips under a column
label rode 6px high while chips under a band label sat at 14px),
`.stage p+p` (two paragraphs in a stage column collided), and
`.trust-cell .ladder-meter` (the Solutions meter reused as a scale marker
inside a hairline cell, where the cell padding already gives the top gap).

### Solutions: three steps, not three levels

The adoption ladder keeps its component and changes its labels. Each node's
mono index line now carries the progression (`01 / ONE DECISION`,
`02 / CONTINUOUS INTELLIGENCE`, `03 / ORGANIZATIONAL INTELLIGENCE`) and
each heading is the step as an instruction ("Start with a decision.",
"Keep it continuously current.", "Make it part of the organization."). The
seven function rows are named for the functions a buyer recognizes
(Top management, Sales, Operations, Finance / treasury, Risk / compliance,
Strategy / investment, Public affairs / regulation) and the section heading
says what the page adds over Home's six questions rather than repeating
them.


## Round four (2026-09-12)

Editorial pass only: shorter, sharper, more credible copy on Home, Platform
and Solutions, no component, token or imagery change. The "Three levels"
strip was removed from Home's `#daily` (its idea is covered by the Solutions
adoption path; the me / team / organization axis exists nowhere now), so
`.trust-cell .ladder-meter` has no user and joins `.loop-3` on the audit
list. Platform's METHOD section lost the five-row `.method-list` and the
machine-scale `.net` block (the recipe's B and C cards already carry the
ingredients); the pull quote, the `.vs` box and the research-partnerships
line stay, and `.method-list` / `.method` have no user. Platform's
`#methods` roles `dl` and its page-local `.roles` rules went together, and
`#breadth` is titled "External change arrives on four levels." The cadence
band keeps four cells and the same facts in plain words (`4x daily / News
updates`, `Nightly / Country indicators`, `Real time / Maritime tracking`,
`In the loop / Expert review`). Home measured 11364px tall at 1440 before
the pass and 10659px after it.

## Round five (2026-09-12)

Precision and editorial pass only, no component, token or imagery change.
The rule for copy from here on: claims stay accurate and positive. Nothing
on Home, Platform or Solutions says what AI, LLMs or other tools cannot do; the differentiation
is what Mission Grey combines and how it works (Platform `#methods` is the canonical wording: the h2 "AI alone is not
enough." and its dek "Decision intelligence also needs quantitative models,
persistent structure, history, context and expert judgment."). "Same analytical methods" is banned
wording; the site says one consistent process with methods selected for
the question, and "The question determines the data and the method, not
the other way around." stays as the `.principle` under it. Absolutes
(`every`, `all`, `nothing`, `always`, `never`, `usually`) are kept only
where factual; the ACT stage on Platform now says the intelligence can flow
directly into the views, workflows and systems where decisions are made
(the "nothing has to leave the system" wording itself left the site in
round four).

Composition changes: Platform's `.vs` box is reframed on the individual
versus organization axis ("An AI assistant, for one person" / "Mission Grey,
for the organization") and now lays its two chains side by side
(`grid-template-columns:1fr 1fr`, the note spanning both, single column
under 600px) so it reads as a comparison rather than one ten-step chain;
the section's `.principle` beside it carries "AI assistants help
individuals. Mission Grey adds the organizational intelligence layer." in
sans (two sentences in `.vs-note` mono wrapped to three lines at 390, and
mono is never a paragraph), the note reverts to its short label, and the
question-determines-the-method line closes the dek. Home `#roles` is
headed by "One external intelligence layer. Different views for different
responsibilities." with the Solutions pointer as a `.sec-note` under the
diagram, and the `h3.net-lede` over the example application is removed.
Home `#prepared` closes on its three cards; the round-four `.sec-note`
that restated their headings is gone. Rule learned from the
whole-surface pass: a summary line placed after the cards or diagram that
already made the point is duplication, not emphasis; emphasis goes before
or instead, never after. Main-text words: Home 1010
to 964, Platform 2239
to 2148, Solutions 722 to 717.

## Round six (2026-09-13)

The editing, pacing and product-visual pass. Same rule as rounds three to
five: no new palette, no new font, no new motion, nothing decorative
added. Everything below lives in `styles.css` section 17 except the two
deletions, which happened in place.

### The two calls to action always say what they do, binding

`Request access` goes to `/contact/` and `See it on your decision` goes to
a short working session on the visitor's own question (a Calendly slot). Those are two different processes, and a reader
cannot tell which one they want from two mono labels, so **every closing
panel that offers a choice carries `.cta-notes`**: a two-column block under
the button pair with one line per button, the button's own words as the mono
label. Home, Platform, Solutions, Use cases, Guild, About, Partners, API,
Insights and the eleven insight articles all carry it.

**Two deliberate exceptions.** `/contact/` is where `Request access` leads,
so a panel there explaining the button the reader just followed is noise;
its cards already describe the routes. `404.html` is navigation, not an
offer. The header button and the mobile-nav CTA never carry notes either:
the panel is read, the header is scanned.

**The notes share the buttons' axis, binding.** `.access-cta` is a centered
flex row sized to its buttons and `.cta-notes` was a 760px grid, so every
label sat about a hundred pixels left of the button it described. In a panel
that carries notes the button row is now the same two-column grid as the
notes (`.access-panel:has(.cta-notes) .access-cta`): equal 290px columns,
one shared gap, button centered in its column, note centered under it, both
stacking at 560. Panels without notes keep the flex row.

Where a page's pair is not the standard one, the lines follow that page's
buttons (Guild: Join the Guild / Become a partner; Partners: Become a
partner / See it on your decision). Nothing anywhere implies instant or self-service
access, because access is by request and that is the actual process.

`.access-panel .join-note` was page-local on Partners and is promoted, since
the Guild panel now needs it too: it is the one line under the buttons
naming the path the panel itself does not carry (Guild points a buyer at
Solutions; Partners points an expert at the Guild).

### Platform product visuals: four, at content width, binding

The walkthrough carried nine product screenshots, five of them in paired
`.duo` cards about 590px wide. A 1920px product screen inside a 590px card
is decoration: nothing in it can be read, so it proves nothing. The
walkthrough now carries **four screenshots, one per stage, each at full
content width under its own copy** (`.stage.stage-stack`), each with a
one-line `.win-cap` saying what the reader is looking at:

| Stage | Screen | Why it is one of the four |
|---|---|---|
| 01 MONITOR | the globe | the monitoring view, and the stage's own proof |
| 02 ANALYZE | Knowledge Graph | the structure nothing else on the market draws |
| 03 DECIDE | scenario simulation | the forecasting and scenario view |
| 04 ACT | Report Advisor | the sourced report, numbered sources visible |

Dropped with the `.duo` cards: sessions, Industry Analyser, Indexes, Chronos
Forecast, branch analysis, and the recommendations screen (which stays on
Home, so the site still shows it once). Those instruments keep their cards
in the instrument set; they stop being unreadable thumbnails, they do not
stop existing. **A fifth screenshot on Platform is a regression**, and a
paired screenshot card is the shape this round removed: `.duo` / `.dcard`
are deleted from styles.css.

**Each of the four is cropped to the region its caption names.** A 1920px
product screen printed at 350px on a phone is texture, and a caption
promising detail over texture is worse than no caption, so each screenshot
sits in a focus wrapper (`.win-body.focus-globe` / `-graph` / `-sim` /
`-report`): the image is scaled up inside a clipped box and positioned so
the named region fills it. Phones get a 4:3 box and a scale of roughly four
(the tracking-layer panel, the breadcrumb and graph, the Select Action
options, the sources panel), and the caption picks up `&middot; shown as a
detail` under 600px. No new image files; the source assets are untouched.

**The knowledge graph is cropped at every width, not only on phones.** Its
right-hand property panel is a raw field list (`Hq_iso3`, `Wikidata_id`,
`Presseed_source`, a source note in another script) and reads as an admin
view rather than as the product, so the desktop rule shows the left 75% of
the frame. Its caption changed with it: the old one promised "sector,
country, relationships and the record behind them", which is exactly what
the crop removes. **The graph's own nodes carry no text labels** (they are
shaped, colored marks), so the readable evidence in that frame is the
breadcrumb, the entity name and the search field, and the caption claims
nothing more.

`.win-body.crop` has no user after this round and joins the audit list with
`.loop-3`, `.method-list` / `.method` and `.trust-cell .ladder-meter`. It is
a general utility rather than a component instance, so it stays. The six
screenshot and application assets that lost their last reference
(`product-screenshot-analysis`, `-chronos`, `-indexes`,
`-industry-analyser`, `-sessions`, `intelligence-app-space-infrastructure`)
are deleted from `assets/`: 1.3MB the deploy was shipping for nothing.

### Home carries one product screenshot

The dark example-application capture (`intelligence-app-space-infrastructure.jpg`)
is off Home, which now reads light from the hero to the footer. Platform and
Solutions both already carried an example application, so nothing moved and
nothing was lost. Home's product visuals are now **the recommendations
screen in `#system` and nothing else**; the hero globe is a drawn instrument
and is not one of them. This supersedes round three's count of two.

### The mission line

One quiet band on Home between `#prepared` and `#shared` (`.sec.mission` >
`.quote-main`): the democratizing-strategic-intelligence line, attributed
`A former CIA officer`. The attribution is not "Guild member" because the
Guild roster on `/guild/` names no former CIA officer, and an attribution
the site cannot support anywhere is a claim. It sits with space around it,
at the scale of the other quotes, and is never a hero element.

### Pacing

`--sec-pad` and `--head-gap` both moved up a step, `.principle` and
`.net-lede` took a size up, and `.sec-statement` is the modifier for a
section that carries one claim (Home `#shared`): more block padding, a
larger `h2`. Card runs tightened slightly (`.cap`) as the sections around
them gained air, because the contrast between a card run and a statement is
what the pacing is for.

The hero's radial-gradient wash (`.hero::before`) is gone. A glow is the one
lighting effect the light chassis forbids, and it was the only one left.
`.cap` icons, the `.checker` bullet, the monograms and the mark sequence
stay: each of them carries information or is the brand mark, which is the
line between an instrument and filler.

### The instrument index is a list, not thirteen cards

Thirteen icon cards were the longest card run on the site, and the icons
carried nothing the names did not: a stroke circle does not explain signal
monitoring. The set is an index, so it is set as one. `.instr-list` is two
columns of hairline rows, instrument name in heading weight, one line under
it, the `.beta` tag where the product still carries it, one column under
760px. No icons.

`.caps` / `.cap` stay in styles.css: `/contact/` still uses the three-card
grid for its routes. `.cap-wide`, the modifier that let the thirteenth card
span the row, lost its only user and is deleted.

### Step one in practice (Solutions)

The most important commercial change on the site, so it may not wear the
clothes of the card runs around it. `.first-engagement` is a bordered panel
on the raised surface with **one accent rule along its top edge**, a mono
index line tying it to node 01 of the ladder (`Step one &middot; one
decision`), a heading at `--fs-h3` ("What the first engagement looks
like."), and the three groups as columns of running copy: **You bring /
Mission Grey brings / You receive**. The accent rule is the component's one
accent role, which is why the index line is dim ink rather than accent.

`You receive` carries the chairman's own list (situation overview, exposure
and impact analysis, scenarios and recommendations, in a form that can be
used in management discussion) and the three bullets that used to repeat it
inside ladder node 01 are gone: the fact lives once, in the buyer-facing
block. The cost is that node 01 now sits shorter than the two nodes beside
it in a stretch grid. That is the accepted trade.

Timing line (`.fe-timing`, under the three columns): a first version on standard data in about two weeks, proprietary data takes longer, agents and a customer dashboard follow the customer's requirements and systems; the chairman supplied these facts in-thread on 2026-09-13 and the two weeks is the only number

### The role views name the view, the questions live on Solutions

Home's `.arch-roles` printed the six arriving questions word for word and
the Solutions function table printed seven of them again. Home now carries
the role plus a three to five word descriptor of what that function watches
("Top management / Strategy and capital allocation"), the section eyebrow
says what each function watches, and the pointer under the diagram sends a
reader to Solutions for the questions themselves. The protected line above
the diagram is untouched.

### Trust and security, unchanged on purpose

The chairman asked for hosting region, model-training and isolation
specifics "if approved factual information is available". None exists in
writing, so `#trust` on Home and Platform is untouched. Inventing a hosting
region is the one failure the claims law exists to prevent.

### About, Partners, Guild

- About: the roster labels are **Core team** and **Advisors and network**.
  One person whose stated role is "Strategic Advisor" moved into the second
  group; nothing else was regrouped, because a role like Head of Campus or
  Practice & Community Developer is a company role from the outside and
  guessing is inventing. Offices are city plus country or state
  ("Arlington, VA / United States"), with the building and district names
  gone. The closing panel's eyebrow is "Access", not "A new category".
- Partners: the unnamed partners line now says why they are unnamed. The
  work happens inside client mandates, so the relationships are
  confidential. That is a reason a buyer accepts; "not listed on this page"
  alone reads as an empty logo wall.
- Guild: the intro no longer enumerates the four cards under it, and the
  closing panel carries a buyer path as well as the two recruitment CTAs.

### Main-text words

Home 951 to 898, Platform 2156 to 1982, Solutions 714 to 738. Solutions is
the one page that grew: it absorbed the first-engagement block and the CTA
lines, which together are about 100 words of the round's most commercially
important copy, against roughly 75 cut from what was already there. Measured
inside `<main>`, tags and entities stripped.

## Round seven (2026-09-14)

The visual and product-proof round. Rounds three to six were editing
passes on copy that was already right; this one answers the note that the
written positioning had outrun the visual identity. Everything new lives
in `styles.css` **section 18**, plus three additions to the round-six crop
block. Same standing rules: no new palette, no new font file, no new
motion, no gradient, no glow, nothing decorative, tokens only, one accent
role per component.

### The type ladder is three faces, binding

Sans is the structural voice (h1, h2, h3, body, UI), mono is the
instrument voice (labels, captions, annotations, metadata), and **Source
Serif 4 is now the statement voice on the page chassis**: `.net-lede`,
`.principle`, `.quote-main blockquote` and the new `.statement`. This
supersedes the earlier rule that serif appears only inside `.sheet` and
inside insight articles. The reason is that the site's strongest lines
("The cost is often not ignorance. It is delay.", "People can have
different responsibilities and views.") were sans at a middling weight and
read as headings that happened to be a different size, so the page had two
legible registers where it needed three. The font is already self-hosted
and already the editorial face; nothing in `fonts/` changed.

Serif is for a claim set apart, **including when a heading is the claim**.
`.net-lede` is an `h2` or `h3` in every page that uses it, and it is serif
because of what it says, not despite what it is. Body copy, UI and
ordinary section headings stay sans; a heading that is simply naming its
section never becomes serif.

**The statement measures are scoped to the wide layout.** `.net-lede`
carries a 24ch measure inside `@media (min-width:901px)` only. Section 12
releases that measure at 900 because `.net` collapses to one column there,
and a 24ch re-declaration after it at equal specificity turned the lede
into a 300px ribbon in an 850px parent on all three pages. Any measure
added to a statement from here follows the same scoping.

### The four signature devices

**A. `.trail`, the intelligence trail.** SOURCE, SIGNAL, EXPOSURE,
INDICATOR, SCENARIO, TRIGGER, ACTION, set as a measuring rule with a tick
per station and the last station in the accent. It is an annotation, never
a section: **at most one per page**, always under something it annotates,
never with a heading of its own. **Used once, on Platform `#engine`,
under the decision objects.** It was also built on Home under the pipeline
frame and taken out again: Home already runs five mono step-grammars
(pipeline, recipe columns, daily steps, role views, ruled rows) and a
sixth made the page read as one texture rather than as an argument. A
second instance on any page is decoration.

The rule and the ticks belong to the **stations**, not to the container. A
border drawn on the flex container floats away from every row the box
wraps, which at 390px put the second row's ticks under the first row's
words; each span now carries its own top rule and its own tick, and the
separation is padding rather than gap so the rules abut into one line per
row. The element takes `role="img"` with the station list as its label: a
bare `aria-label` on a `p` is prohibited and is dropped by assistive
technology.

**B. `.evi`, the evidence annotation.** The row of small technical markers
an intelligence brief prints beside a figure, as a hairline strip at the
foot of a `.frame`. **Binding: on a drawn diagram these carry labels and
word values only.** A date, a percentage or a confidence number here is
fabricated metadata presented as fact, which is exactly what the honesty
convention exists to prevent; real metadata belongs inside a real
screenshot, where the product wrote it. **Two annotations on one diagram
is the ceiling**, and each one has to name something the figure actually
draws: the first cut of this round shipped three on three figures, one of
which promised an owner ("Owner, named at every step") that the Solutions
chain never shows. An annotation that describes an absent feature is the
same defect as a caption that does, and the same rule catches both.
There are five `.evi` rows on the site, all inside `Illustrative view`
frames, all two clauses.

**C. `.lens`, the macro-to-micro lens.** The four levels of external
context on Platform `#breadth` were four equal rows, which says the levels
are alternatives. They are not: each is read *through* the one above it
and they converge on a single decision. The rows now step inward by
`--d` (0 to 3) times one clamp, and `.lens-core` is the narrowest object
with the accent along its top edge. Below 760px the insets go flat and the
index column carries the depth, because a converging shape drawn 360px
wide is a smudge. `.levels` / `.level` / `.level-grid` lost their only
user and the `.level-k` / `.level-i` rules with them; `.level-out` stays,
because the Solutions adoption frame still uses it.

**D. `.dobj` / `.dobjs` / `.dobj-set`, the decision objects.** Tracker,
Indicator, Scenario, Trigger and Action are the five standing objects of
the product and were drawn as ordinary `.chip`s, indistinguishable from
"Satellite" or "Regulation". They now take one grammar wherever they
appear: a hairline cell with an accent tick on its leading edge, named as
a set (`.dobjs`, in Platform's full recipe and in the system diagram) or
opened up with their one-line definitions (`.dobj-set`, on Platform
`#engine`, where they replaced the same definitions run together in a
single 39-word sentence). **The grammar is Platform's**: Home's short
recipe keeps plain `.chip`s for the same five names, because Home shows
the five once, in passing, and a second accented grammar there competed
with the chips beside it rather than distinguishing anything. `.dobjs` is
the same flex row as `.taglist` and is declared with it, not twice.
In Platform's full recipe the sixth item,
"Feedback loop", stays a plain `.chip`: it is not one of the five, and the
grammar saying so is the point.

### `.rail`, one spine under two rebuilt diagrams

A continuous vertical hairline with a station tick per row, the stage name
in mono to its left and the content to its right. It carries the Platform
system diagram (`#apps`) and the Solutions impact chain (`#practice`), and
it is why neither diagram needed an arrow glyph. `.rail-row.is-end` marks
the terminal station in the accent. Below 760px the spine goes and the
stage label sits above its row. The row titles are `p.rail-h`, not
headings: `.rail-k` already carries the structural label, and an `h4`
under a section `h2` with no `h3` between them is a skipped level.

The Platform system diagram is the chairman's architecture, drawn: the
shared intelligence layer, the customer context added to it, the
customer intelligence application built on both, and the roles it serves.
It replaces the five-band `.rx-stack` that stood in `#apps`.

### `.ruled`, the alternative to a third card grid

Three hairline cells side by side are a card run; the same three facts as
ruled rows with an accent index are a list in a document. Home `#prepared`
took it, which leaves Home one hairline-cell grid fewer.

### Product proof: what is on each page now, binding

| Page | Product visuals |
|---|---|
| Home | Available Reports (`#system`), the space and infrastructure application (`#roles`). Two, as the document asks. The hero globe is a drawn instrument and is not one of them |
| Platform | the globe, the sourced report, the Knowledge Graph, the scenario simulation, the space and infrastructure application. Four walk stages plus one proof between the first and second |
| Solutions | the recommended actions screen, the country-level example application |

This supersedes round six's counts (Home one, Platform four). The fifth
object on Platform is the sourced report, which the document names as an
additional proof between Monitor and Understand rather than as a fifth
stage, and it is composed as one: `.proof-between`, ruled on both edges,
carrying a statement and one screenshot, with no stage number.

**The four walk stages keep the names MONITOR, ANALYZE, DECIDE, ACT.**
The document's four moments are monitor, understand, model,
operationalize, and the section dek now says exactly that, but the stage
labels are the site's shared pipeline vocabulary: Home's `#system` diagram
prints the same four words in its nodes, its eyebrow and its heading.
Renaming them on Platform alone would put two different four-step models
on one site, which is the failure the "one diagram, one direction" rule
exists to prevent.

### Assets

- **new** `product-screenshot-reports.png` (1920x1258): the Available
  Reports list, cropped from a 3192x1846 capture to **the list region
  only**. The product sidebar goes with the account footer and its
  Internal badge: the sidebar is a fifth of the frame, it repeats in every
  other capture on the site, and the document asks for this list to be
  large enough that the rows and dates read. Dropping it makes the rows
  21% larger at the same printed width. The crop ends on a row boundary.
  Quantized to 64 colours: the full-width version was 443KB, this one is
  100KB.
- **replaced** `product-screenshot-report-advisor.png` (1642x1844): the
  Defense and Dual-Use Technology report. The old file was the same view
  (a weekly report in the same instrument) and the newer capture wins.
  **Cropped to the report panel alone**, which is a deliberate call: the
  document asks to keep the sessions list as evidence that the work can be
  reopened, but the sessions column and the chat body are the same
  rectangle, and the chat text may not appear on the site. The report
  header chrome that survives the crop, the `v3 (current)` version control
  and the download control, carries the same evidence.
- **restored** `intelligence-app-space-infrastructure.jpg` (1920x1032),
  from `3d8a5df`, where round six deleted it. Dark UI on a light page,
  ruled acceptable as is.
- `product-screenshot-recommendations.png` left Home and is on Solutions,
  captioned for what it actually contains: the recommended actions from a
  cleanroom operational risk analysis.
- Nothing lost its last reference, so no asset was deleted.

### Two screenshots are cropped at desktop width, not only on a phone

The knowledge graph was the first (round six, to keep a raw property list
off the page). The scenario simulation is the second: its left fifth is
the same product sidebar every other capture carries, and dropping it
prints the app's own content area, where the actor list and the Select
Action options read at content width. **The scenario title bar stays
whole.** The product truncates that title itself with its own ellipsis, so
the frame shows the product's truncation and adds none of its own; a crop
that cut the title mid-phrase would be the site making a mess and blaming
the app. The rule sits inside `@media (min-width:601px)` so the phone crop
in section 17, which aims at the Select Action options alone, still wins
on a phone.

### Deleted and on the audit list

Deleted: `.levels` / `.level` / `.level-grid` / `.level-k` / `.level-i`
with their three breakpoint rules (the lens replaced them), and
`.win-body.focus-report` (its asset changed shape). On the audit list, with
`.loop-3`, `.method-list` / `.method`, `.trust-cell .ladder-meter` and
`.win-body.crop`: `.trust-grid.grid-3`, whose only user was Home
`#prepared` before it became `.ruled`. It is a grid-count modifier rather
than a component instance, so it stays for the next page that needs three
hairline cells.

### Phone crops

Round six's rule stands and grew four rules: a 1920px product screen
printed at 350px is texture, so every screenshot that is not already a
detail carries a focus wrapper under 600px. New: `.focus-reports` (the
list title, the column head and the dated report names), `.focus-sourced`
(the head of the report, in a portrait box because the report is a
portrait document), `.focus-recs` (the heading and the first actions),
and `.appshot.focus-space` / `.focus-country` (the application title and
its first indexes). `.appshot` exists only to be that box: the example
application images were direct children of `.frame` and had nothing to
crop against. `.win-body.focus-report`, whose asset changed shape, is
deleted; `.focus-globe`, `.focus-graph` and `.focus-sim` are unchanged.

**A phone crop that shows a different part of the screen needs a different
caption**, or the caption describes something the reader cannot see. That
is what `.cap-desk` is for: the wide clause and the phone clause sit in
the same `figcaption`, and each width shows one. The sourced report is the
case that needed it. Its wide caption names the report, its version
control and the sources panel; its phone crop is the head of the report at
240%, so the phone caption says title, thesis and the opening of the
executive summary. A 150% crop of a 1642px portrait document was the first
attempt and was the wrong trade: it cut every line mid-word AND hid both
the version control and the sources panel the caption promised.

The caption becomes running text under 600px for every product figure now,
not only inside a stage, so the `&middot; shown as a detail` qualifier
joins the sentence instead of being squeezed into a second flex column.

The application crop takes a 16:10 box rather than 4:3. At 4:3 and the
scale that makes two metric cards readable, the box reached into the
application's second card row and sliced it at the frame edge; 16:10 ends
in the gutter above it. The crop holds the eyebrow, the title and **two
whole cards**. The title's last word runs past the right edge, which is
the accepted trade: the alternative width slices a third card, and a
sliced card at the frame edge is the defect this crop was rebuilt to fix.

### The INPUT/OUTPUT pair belongs to its stage

`.stage-io` was a bare `inline-flex` row of mono words sitting in the gap
between a paragraph and a screenshot, annotating nothing the eye could
attach it to. Inside a stacked stage it now takes the hairline of the copy
column it closes. Watch the measure: `.stage p` sets 52ch, and 52ch of
10.5px mono is 330px, so the rule needs `max-width:none` or it stops a
third of the way across the column.

### Main-text words

Home 888 to 975, Platform 1954 to 2151, Solutions 749 to 925. Measured
inside `<main>`, tags, scripts, inline SVG and entities stripped.

One measurement note for the next round: a `.cap-desk` / `.cap-detail`
caption holds two clauses in the markup and renders one, so a count taken
this way charges both. Two captions carry the pair, which is about 29
words of the totals above that no reader ever reads at one width.

**Home grew by 87 words (74 of them readable at any one width), and that
is the one instruction this round did not hold flat.** The arithmetic: the two product-proof blocks the document
specifies for Home cost about 65 words between them (the "Intelligence
that stays current." statement with the supporting line the document
supplies, the application statement with the section-12 language, and two
captions). The rest is the ruled-row indices and one evidence annotation,
about 15. Coming the other way: ten words from the dek the pipeline no
longer needed, fourteen from the caption of the screenshot that left for
Solutions, and seven more when the trail came off Home.

Nothing was cut to fake parity. Rounds three to six already took the slack
out of that page, and cutting live copy to pay for a required visual
trades the reader's argument for a number. The honest statement of the
position is that the document asks Home for a second product visual and
names the copy that has to sit with it, and those two instructions and
"do not make Home longer" cannot all three be satisfied; the visual and
its copy won. Solutions is the page the document asks to grow, and the
impact chain with its product proof is most of its 176 words.

## Round eight (2026-09-19): the home visual system, section 19

A visual-development pass over three areas of the home page only: the
fold, the external-world figure and the application proof. It lives in
`styles.css` section 19 as a pure append, and every selector in it is
scoped to a class that exists on no other page, so sections 01 to 18 are
untouched and every sibling page renders as it did before. If the
direction is adopted, this is the section the rest of the site extends;
until then, do not reach for these classes on a page other than Home.

One line holds it together: **stations hang from rules, and the grid
becomes visible once per view.** Three of the four devices below are that
sentence applied.

### `.hz`, the longitude scale (Home only, binding)

A hairline across the full viewport at the top of the fold, ticked every
30 degrees from 180W to 180E, with five mono labels and one accent caret.
The caret is not decoration: the hero script writes it from `rot`, the
same rotation state the globe canvas renders from, so the scale and the
sphere under it report the same meridian. The whole strip is
`aria-hidden="true"` (the globe's own alt text says what is watched) and
the caret falls back to `var(--x,67.22%)`, the resting aspect, without JS.

Binding, if this is ever reused: a coordinate scale may only be drawn
against something that actually has that coordinate. A ruler with a caret
that does not track anything is a HUD graphic, which is the one thing the
brief's notation rule exists to stop. Two consequences in the script: the
caret is written from inside the render loop, and the runtime
`prefers-reduced-motion` handler has to re-mark it by hand, because
`setRun()` stops that loop before the next frame can.

Keep it a home-page signature. On every page it becomes wallpaper.

### The ticked-station ledger (`.cadence-v1`, `.ap-sys`)

A list is a rule with stations hanging under it, never a row of boxes.
One continuous hairline, one 1px tick per station at its leading edge,
mono label over its value. It is `.trail` (round seven, device A) promoted
from an annotation to a layout: the cadence band lost its four cells to
it, and the organization register inside the aperture is the same grammar
at label size.

Two rules learned here. **Every station gets the same padding, including
the last**: a `flex:1 0 auto` on `:last-child` makes a wrapped row's rule
run to the container edge while the row above stops at its last word, and
a register whose rule ends in two places is not an even register.
**Reserve the tallest label in the row**: each cell is its own grid, so
a label that wraps drops its own value one line and breaks the row's
baseline. `.cadence-v1 .k{min-height:2em}` under 700px is that reservation.

### `.ap`, the aperture (the macro-to-micro figure)

WORLD, MARKET, PLACE, ORGANIZATION, DECISION as one figure rather than
five cards. Three external registers, each inset further than the one
above (0, 5, 10 percent), then the organization at 15 and the decision at
22, with the walls between them drawn as stretched SVG. The signals sit
on the external registers as stations; the systems sit in the
organization as an even register. The texture difference between a
scattered field and a ruled row is the section's argument, drawn.

Four binding notes:

- **One taper for every width.** The insets are percentages of the same
  measure and the wall SVGs carry those percentages as path coordinates,
  so they register exactly at any width. They must be chosen so the
  narrowest band still holds its words at 390px; that is why the taper
  stops at 22 percent and not at 29.
- **`vector-effect="non-scaling-stroke"` is mandatory** on those paths. A
  `preserveAspectRatio="none"` viewBox scaled eleven times horizontally
  draws an eleven-pixel hairline without it.
- **Markup order is the figure's order.** The registers come before the
  organization band in the DOM because that is the order the figure
  reads; a grid that reorders two labelled blocks delivers the funnel
  inverted to a screen reader (WCAG 2.1 SC 1.3.2).
- **One baseline per register, and a field a reader can see.** Per-signal
  depth offsets with no axis read as misalignment, not as depth. A dot
  field whose pitch change is invisible at 1x is decoration claiming to
  be meaning: the pitch here triples across three registers (8, 16, 28px)
  and the dot carries enough ink to be read. Labels over a field knock it
  out behind themselves with a 4px halo of page ground, the way a place
  name does on a chart.

### The evidence object (`.ev-*`), binding

The third tier of the honesty convention gains a treatment. An
application built on the platform stays in `.frame` with `Example
application` in the frame bar, and is printed as a plate: an exact crop
around the marks it is read for, one leader, editorial whitespace, no
browser chrome. `.ev-fig` holds the figure to three quarters of the
column; the rest is the air the figure is read in.

- **The crop is stated in source pixels and the aspect ratio is derived
  from it.** Here: x 314 to 1113, y 214 to 566 of a 1920x1032 asset, which
  is `aspect-ratio:799/352`, `width:240.300%`, `left:-39.299%`,
  `top:-60.795%`. Keeping the same vertical rect at both breakpoints means
  the phone crop changes only `--ax`, the width and the left offset, and
  the leader keeps its height and its target.
- **Crop to what the figure is about, not to what fits.** The first
  attempt kept the dashboard title and all four indexes; it read as an
  equal four-column card grid with status pills, which is the vocabulary
  the whole pass exists to avoid, and it sliced the tops of the row below.
  Two indexes, whole, clear of the next row, with the title dropped
  because the frame bar already names the application.
- **The alt text describes the crop, not the asset.** A crop is not
  covered by a wording freeze and never was: it is the one attribute that
  has to change when the frame changes, for the same reason
  `.cap-desk` exists.
- **Home no longer uses `.appshot.focus-space`.** Round seven's phone-crop
  note above still lists it for Home; that is now `.ev-crop`, which crops
  at every width rather than only under 600px. The round-seven rules stay
  in section 17 because Platform and Solutions still use
  `.focus-space` and `.focus-country`.
- **At most one or two leadered labels, each landing on a mark the image
  actually draws** (device B's ceiling, round seven). Here: one,
  `Confidence`, on the confidence figure the product prints beside each
  index. The cap reaches the mark and stops short of the glyphs, and the
  stem stands in a clear corridor of the artwork. An annotation that
  strikes through its subject, or that scratches across the picture on the
  way to it, is worse than no annotation. A column of notation labels
  with no values and no leaders is not an annotation at all: it names
  fields the figure does not show, which is the defect device B was
  written to stop.

### Capturing this page, method note

Two traps, both of which produced wrong numbers before they were found.
Headless Chromium clamps the layout viewport to 500px, so
`--window-size=390,844` renders a 500px layout and crops it: every phone
claim has to be captured through a 390px iframe inside a wider window.
And `--virtual-time-budget` screenshots catch `.reveal` blocks mid
transition, so a settled page needs `--force-prefers-reduced-motion`.

## Round nine (2026-09-19): the visual system extended, sections 20 to 24

The second visual-development pass. Home is refined, not redesigned; the
system section 19 proposed is carried to Guild, Platform, Solutions and
About, each page with its own composition and its own stylesheet section.
No wording changed anywhere except the hero indicator that replaced
"Maritime tracking, Real time". Each subsection below is written by the
page's builder and documents the binding decisions for that page.

### Home (section 20, `hv-`)

Home was refined, not redesigned. The longitude scale, the UTC notation,
the globe, the amber signals, the technical labels, the asymmetric hero and
the grey atmosphere all stand as round eight left them; section 20 holds
one selector, and the rest of the round is the hero indicator, the globe's
signal model and one measured correction inside section 19.

**The hero indicator, the one wording change on the site.** The cadence
ledger's third station read `Real time / Maritime tracking`. It now reads
`Global events / Monitored`: maritime tracking is one feed of many and
described the proposition too narrowly, and "real time" is a claim the
cadence cannot make for the whole watch. The station keeps its place, its
grammar and its ledger; only the two words changed. The hero names one
broad category and lists nothing: the breadth is the point, an index of
domains in the fold would be a second argument.

**The globe watches developments, not routes, binding.** The instrument
drew six maritime chokepoints with route arcs between them and a `Route
signal` readout. It now draws **five signal stations at real coordinates,
one per development type**: Panama Canal (infrastructure), Brussels
(regulatory), the Strait of Hormuz (geopolitical), the Bay of Bengal
(climate) and Singapore (market). The arcs are gone with the routes. An arc
between two typed stations says nothing the stations do not, and a globe
strung with lit connections is the generic network image the brief exists
to avoid. What moves instead is the world and one station at a time: a
station facing the reader activates, its mark opens one ring and rests, and
the readout prints the type over the place, six to nine seconds apart. No
new colour, no second accent, no node added: the set got smaller.

**The readout names a TYPE and a PLACE, never an event, binding.** It is a
drawn figure under an `illustrative view` caption, and a drawn figure may
not report a fact it did not measure. `REGULATORY SIGNAL / BRUSSELS` is the
kind of development Mission Grey watches and where such a development is
illustrated; `Brussels adopts X` would be fabricated metadata, which is the
defect the honesty convention and the `.evi` rule already forbid elsewhere.
The station the readout is naming is drawn one step larger while its line
is up and steps back as the line fades, so the words and the place on the
sphere read as one fact.

`.hv-sig` is section 20's only selector: it sets the readout as label over
value, the same grammar as every other list in the fold. Run on one line
the longer strings crossed the sphere's dot grid; stacked they clear the
limb, and the type reads first. The globe's `aria-label` and the no-JS
plate's `alt` follow the drawing, as alt text always does.

**One measured correction in section 19.** The cadence ledger reserved two
lines of label below 700px only. The four-across row wraps its longest
label from about 775px down, so between 701 and 775 one value sat a line
below the other three and the ledger's baseline broke. The reservation now
runs to 860px. Nothing else on the page changed: the walk at 1440 and 390
found no other defect worth a rule.

### Guild and the Home Guild section (section 21, `gd-`)

The Guild page is rebuilt as an expert network and the Home Guild block is
rebuilt as the page's one human moment. No word changed on either surface
(textdiff: Guild 828 words in and out, nothing added or removed; Home two
words added, `28 members`, which is the Guild roster key's own line
repeated as the label of a drawn register). No portrait exists for any
Guild member in this repo, and none was invented.

**`.gd-reg`, the member register, binding.** One rule, one tick per member
of the roster, in the order the roster PRINTS (SUPERSEDED by round ten,
section 26: no member is featured, the register carries no accent marks
and the roster prints in the live site's alphabetical order; the four plate-scale members
first, then the directory), with those four marked in the accent at stations
1 to 4. Binding: the `--n` indices in the markup index the printed list, so
reordering the roster means rewriting them; the first cut carried the four
members' positions from the old alphabetical order and pointed at the wrong
people until a review counted the ticks. It is the page's
signature figure and it appears on both surfaces this section covers, so a
reader who follows `Meet the Guild` arrives at a figure they have already
met. It obeys the section 19 rule that a scale may only be drawn against
something that actually has that measure: twenty-eight members,
twenty-eight ticks, and the divisor in `background-size` and in the accent
tick's `left` is the roster length. **Change the roster length and both
numbers change with it**, on both pages. The label is the roster key's
count line, which is why the key above the directory now carries two items
and not three.

**One list, one markup, binding.** Every member is an `<li>` in one
`<ul class="gd-roster" role="list">` carrying the same `article.gd-p` with
the same fields (plate, name, bio, domains, profile link). A featured
member is that same entry with `gd-m-lead` added, so the editorial choice
is a class and an order and never a different kind of record: a chairman
swaps a featured member by moving the `<li>` and toggling the class.
Nothing in the markup encodes rank. The four currently featured are
Mathieu Boulègue, Kelly Couto, Zsuzsa Anna Ferenczy and Toshihisa Nagai,
read across the register for the widest regional arc and domain mix the
page's own bios and tags carry (their four tag sets cover all seven
domains the roster uses), not for seniority.

**`.gd-plate` is the portrait slot.** It carries the monogram in the
instrument voice on a recessed plate with registration corners, and it is
built to stand as a typographic object on its own: no silhouette, no grey
figure, no word "placeholder" anywhere. When photographs exist, an `<img>`
goes inside the same div (`.gd-plate img` is already positioned and
cropped) and the monogram stands down. **Portraits are the one piece of
material this page is waiting on**; everything else on it is finished
without them.

**`.gd-sys`, human and system in one figure.** The four things Guild
expertise adds were four cells of a hairline grid, which says they are
four separate features. They are four entry points into one process, so
they are drawn as one: a rule carrying the system's continuous work as an
even two-graduation comb, with each station's accent tick rising THROUGH
the rule into the comb and continuing below it. That is the section's own
dek drawn rather than restated, and it is the answer to the brief's
data / signals / models + human domain knowledge + structured expert
input relationship without a three-box diagram and without a new word on
the page. The figure carries no label and no value, so it claims nothing,
and a figure that claims nothing wears no instrument chrome (the same
reading that keeps `.steps` out of a `.frame`). Below 760px the four
columns become four ruled rows under the same comb; the desktop graphic is
never shrunk.

**Geography is only what the page already says.** The roster's regional
range lives inside the bios (Transatlantic, Latin American, EU-China and
Indo-Pacific, ASEAN, East Asia, APAC and the EU, LATAM, Americas, French
and European, Sino-Lusophone) and nowhere else. Printing those as map or
region notation would repeat words the page carries once, and inventing a
country for any member is out of the question, so **the network is drawn
as registers, not as a map**: the member register on the fold, the ten
expertise areas as a ruled register (`.gd-doms`, which also removes ten
pills), and each member's own domains as notation on a rule. If the Guild
ever publishes a location per member, the map is the figure to build next.

**Home (`.gd-home`).** The same three sentences: the claim set apart at
heading scale in the sans voice (it sits one screen above the mission quote,
which holds the page's one serif statement; two adjacent statements in the
same voice halve the weight of both), the network
sentence at reading measure beside it, the consequence hanging from its
own rule under that, and the register ruling the foot with `Meet the
Guild` at its end. It is bounded above by a rule because it is a different
kind of evidence from the trust architecture above it: not a property of
the system, a person. Names do not appear on Home. Twenty-eight names
would be twenty-eight words the home page does not carry, maintained in
two places, and the link is one click.

### Platform (section 22, `pl-`)

Platform is the machinery page, so the round's object was to make it read
as an examined instrument rather than as a scroll of browser windows. It
carried five product plates in one run, each the full width of the column
under its own copy, and the run read as one texture. Everything below is
composition: **no word on the page changed** (textdiff: nothing added,
nothing removed), and every new selector is prefixed `pl-`.

**The four proof moments, and the exhibit pair.** The walk is now four
moments and one exhibit. The four are the document's own logic (monitor,
understand, model, operationalize, which the section dek already names in
that order) and they keep the site's stage words MONITOR, ANALYZE,
DECIDE, ACT: Home's pipeline prints the same four, and a second set of
names on one site is the failure the one-diagram-one-direction rule
exists to stop. **So UNDERSTAND, MODEL and OPERATIONALIZE are used as
composition logic and are not printed as labels**; MONITOR is already
printed, and printing it twice would be notation for its own sake.
`.pl-mom` is the ledger grammar applied to a narrative row: a rule across
the width with the index hanging from it as a station, the claim on the
left rail, the argument in the wide column, the INPUT/OUTPUT pair closing
that column, and the plate at content width below. Nothing shrank: a
1920px product screen printed small is decoration, and round six's ruling
stands.

The sourced report moved from between moments 01 and 02 to after moment
04, where it joins the Morning Brief as `.pl-deliv`, the delivery
exhibits: one statement across the width, then the real screen on the
wide rail and the printed artifact beside it. They answer one question,
how the work leaves the platform, and the fourth moment is the one that
asks it. The two honesty tiers keep their own chrome and labels; nothing
about `.window`, `.frame` or `.sheet` changed. This supersedes round
seven's `.proof-between` placement (that component is now unused on this
page and has no other user).

**Every plate starts at the edge of the product sidebar.** The scenario
simulation already did (round seven). The globe and the knowledge graph
did not, so three quarters of a fifth of each frame was the same repeated
navigation, and it is also the only part of the captures carrying beta
tags and a report count, which is interface state rather than evidence.
Both now crop at the sidebar edge (source x 296 and x 300 of 1920); the
graph keeps round six's right edge, which is what holds its raw property
list off the page, so its frame is the app's own content area between the
two. The phone crops in section 17 are untouched, and no asset changed.

**The example application is cropped to its operating band.** Printed
whole it is the one dark object on a light page and it is a wall: eight
index cards, a signal map and a live feed at one weight. `.pl-evcrop`
takes source y 0 to 566 at the asset's full width, which is the layer
strip the caption names, the application title whole and the first card
row ending in the gutter above the second. On a phone that band would be
356px of texture, so the crop changes rather than scales: x 0 to 712, y
200 to 566, the customer's own intelligence layers beside one whole
index. Both crops end on a gap in the sidebar list and neither cuts a
card or a word. Home's plate on the same asset is a different rect at a
different scale, so the two pages do not print the same picture.
`.appshot.focus-space` (section 17) now has no user.

**The intelligence trail is the page's signature figure, and it is still
an annotation.** It stays under the five decision objects, carries no
heading of its own, and remains the only trail on the page: the round
seven rule holds and the decision here was to grow the figure, not to
promote it into a section. What changed is that it now annotates the
objects EXACTLY. Both rows are drawn on one grid of seven stations, three
narrow and four wide: **Tracker stands over SOURCE, SIGNAL and EXPOSURE,
the evidence it watches, and Indicator, Scenario, Trigger and Action each
stand over the station that bears their name.** A riser under every
station reaches up to the object it belongs to, so the relationship is
drawn rather than asserted, and it costs no words. Three graded ink
registers carry the progression without a second colour (evidence dim,
objects mute, the last station full ink), the ticks change state at the
same boundary, and the accent is the one role in the figure: the station
the trail exists to reach. Equal sevenths were the first cut and left
Tracker as a wide empty cell while Scenario's sentence wrapped to three
lines, which is why the grid is 0.74 and 1.19.

One line is drawn once, left to right, when the figure arrives: `.pl-run`
is a transition on the existing reveal (the observer's own `.in` class is
the trigger), not a loop. It rests where it stops, section 13's
reduced-motion block collapses it, and without JS the line is simply
there. That is the document's "a line progressing through the
intelligence trail", built inside the permitted motion inventory rather
than beside it.

Below 901px the objects are no longer on the trail's grid, so the risers
would point at nothing and they go; below 761px the rule turns vertical
with the stations hanging off it, which is what the rail does at that
width. The station marks turn with it, because the long ticks that
measured height against the object row read as blocks on a vertical
spine.

**The rest of the page, by restraint.** `.lens` (#breadth), the full
recipe, the method comparison, the instrument list and the `.rail` system
diagram (#apps) already follow the system and were left alone, which is
most of the page. Two card runs were replaced: the four trust cells are
now `.pl-rows`, label left and sentence right, a list in a document
rather than four boxes; and the G2 themes are now a ticked register
beside the rating instead of a row of pills under it, with the quotes and
the link under the register. The trust pipeline chain wrapped at 390px
and left an arrow pointing off the right edge, so under 700px it turns
vertical with its arrowhead redrawn downward from the same borders.

**The fold** is the cover sheet of a specification and deliberately
carries no instrument: ruled eyebrow across the width, the h1 on the
left, the dek and the two calls to action in a hairline-ruled right rail
whose last line ends level with the heading. The page's instruments start
one rule below it and run to the footer.

**The knowledge graph is cropped to what can be read** (send-back fix,
after the critic's pass). The content area printed whole was about 1100px
of undifferentiated multi-colour node field: nothing in it can be read at
that size, it is the weakest interface on the site, and a dense coloured
network is the one picture the counter-prompt names outright. The product
draws no text on its nodes, so the readable evidence in the frame is the
record it is open on and the shape of the relations around it. The crop is
cut to exactly that: **source x 300 to 1072, y 0 to 250** of the 1920x1037
asset, ending in the gap before the Level control rather than through it,
and on a phone **x 300 to 636, y 0 to 340** at about 1:1. The field is cut
by the plate, which is what the site does with the globe. `.pl-detail`
stops the plate at 920px: a 772px crop stretched across the column upscales
the product's own type by half again for nothing, and this is the one of
the four moments whose proof is a detail rather than a whole screen, so the
composition says so. Alt text follows the crop.

**On the audit list after this round:** `.proof-between`,
`.appshot.focus-space` and `.trust-grid` at four columns lost their only
users. All three are in sections 17 and 18 and were left in place.

### Solutions (section 23, `so-`)

Solutions belongs to the same brand and may not read as technical as
Platform: the reader is an executive buyer, and the page's job is the
decision journey and what it costs to begin. So the page takes the
system's grammar (stations hanging from rules, one measured lattice per
view, the figure cut by its plate) and none of the other pages'
compositions. No coordinate scale, no aperture, no trail. Nothing new in
the palette, no new font, no new motion.

**The fold (`.so-hero`).** One ruled eyebrow across the top, the claim
hanging on the left, the cost of starting and the two calls to action on
the right with their baselines meeting the claim's. Asymmetric, quiet,
nothing centered, and the two CTAs sit inside the first screen because
this is the commercial page.

**The adoption progression (`.so-grid`, `.so-ext`, `.so-k`), the page's
major visual.** Three bordered nodes with an arrow glyph between them were
the feature-card run this pass exists to delete, and they answered none of
the question a buyer arrives with: how far does this go. The section is now
one figure. Above a continuous station rule each step carries its EXTENT.
`ONE DECISION` is a bounded run of six divisions marked at both ends, the
way a dimension is drawn, because a decision ends. `STANDING WATCH` is a
run that starts at its own station, carries an origin mark only and does
not close. `ORGANIZATIONAL INTELLIGENCE` is that same run carried three
times over, because its growth is reach across the organization rather
than a longer period. Left to right the ink accumulates from one line to
four, which is the page's commercial argument drawn once: start small,
keep it, spread it.

- **The lattice is exact, and that is the whole licence for drawing it.**
  The grid is twelve tracks and the steps span three, four and five of
  them, so the stations fall at 0, 6 and 14 twenty-fourths of the figure
  and every division on every run lands on the same lattice of 24. That is
  why each run states its divisions as a COUNT (6, 18, 10) and never as a
  pixel pitch: a pitch would drift out of phase between runs, and a ruler
  whose marks do not register with the thing it measures is a HUD graphic,
  which is exactly what the notation rule exists to stop. Any change to
  the column spans has to keep the three starts on the lattice.
- **Separation is padding, never gap.** The three heads abut into one
  continuous station rule; a grid gap would break the rule where the gap
  falls. Same reason `.trail` is built that way.
- **One accent, and it is the decision point**: the entry mark at station
  01 and the `01` itself. The two later step numbers are ink. The old
  ladder put the accent on all three, which said the steps were three
  equal grades rather than one entry that grows.
- **The step is one block in the markup** (index, heading, sentence,
  bullets), and only on the wide layout does `display:contents` lift its
  parts into the figure's own grid. A screen reader therefore hears each
  step whole, and the extents can still share one lattice above the
  stations (WCAG 2.1 SC 1.3.2).
- **Mobile simplifies, it does not shrink.** Under 901px the steps stack
  and each one keeps its own extent at its own length (34, 67, 100 percent
  with the third tripled), so the growth still reads in one pass.
- The closing bar (`.level-out`) keeps its words and sets its sentence in
  sans, with only its label in mono. A full sentence in letter-spaced
  uppercase is a label pretending to be a sentence, and this page has to
  stay easy. `.ladder`, `.ladder-node`, `.ladder-meter`, `.idx` and
  `.loop-arrow` lost their last user with this section and join the audit
  list in section 16; nothing was deleted, because section 16 is frozen
  this round.

**The customer-specific application (`.so-app`, `.so-ev-*`).** The proof
that the layer takes the customer's shape, printed as an evidence plate on
the `.ev-*` pattern and composed differently from Home: the reading hangs
on the left of one rule and the plate sits to the right of it, so the
product is read inside Mission Grey's page rather than filling it. It is
not a stage and it is not a screenshot dropped in a column.

- **The crop is stated in source pixels.** Desktop: x 317 to 1107, y 378
  to 679 of the 1920x1039 asset, which is `aspect-ratio:790/301`,
  `width:243.038%`, `left:-40.127%`, `top:-125.581%`. It holds the
  briefing's own opening assessment whole and the two indexes under it
  whole, and it ends on the card boundary at source y 678. Dropped: the
  application title, the product sidebar, the ticker and the two further
  indexes. Four indexes side by side read as an equal card grid with
  status pills, which is the vocabulary this pass removes; the assessment
  is what says the intelligence was shaped around this customer's
  business, which is what the section claims.
- **The phone crop is a different vertical rect, deliberately.** The
  assessment is a paragraph: narrowing the plate would cut every one of
  its lines mid-word at the frame edge, and a sliced paragraph at a frame
  edge is the site making a mess and blaming the app. So under 520px the
  plate drops to the first index alone, whole: x 315 to 711, y 497 to 679,
  `aspect-ratio:396/182`, `width:484.848%`, `left:-79.545%`,
  `top:-273.077%`.
- **The switch is at 520px, not the site's usual 600.** The phone rect is
  396 source pixels wide, so above 520 it is being upscaled past 1.2x
  while the wide crop still prints its assessment at a readable size.
  Under 520 the wide crop is the one that fails. Where a crop's source
  rect is narrow, the breakpoint follows the arithmetic, not the habit.
- **One leader, landing on a mark the image actually draws**: the
  direction mark the product prints beside the figure, labelled `Change`.
  The stem stands in the clear corridor to its right (source x 574, 22px
  clear of the last glyph) and rises from the plate's bottom edge, which
  is the card's own boundary, so the leader crosses no rule of the
  artwork. The artwork here is white, so the leader is drawn in page ink
  rather than in the light the Home plate uses. `Change` is the only word
  added to this page in this round.
- **The alt text describes what both crops show and no more.** An alt that
  names the assessment would be describing something the phone reader
  cannot see.

**The two ruled indexes (`.so-funcs`, `.so-roles`).** Daily use by
function and the three ways of working were already ruled rows rather than
cards, so they keep their layout and take the one thing the system asks of
a list: a station tick at the leading edge of every row. Nothing else in
those two sections changed. The worked chain (`.rail`), the recommended
actions screenshot, the quotes and the access panel are untouched: they
already follow the system, and a page whose job is to stay easy does not
need a fourth device.

### About (section 24, `ab-`)

About is the page about people and places, so it is the one page in this
round that draws no instrument. Its composition is a document: a set
masthead, one ruled ledger, three portrait registers and a geographic
register. Everything it needed already existed in the tree (22 real
portraits, five real places, the mark sequence); nothing was added to
`assets/`.

**The fold is set, not drawn.** Title on the left, the intro on the
right in its own column, opening on one hairline with a tick at the head
of it, both columns sharing a top: the shape the Platform and Solutions
folds already use (32.1 records why the earlier full-width rule with an
empty half under it did not survive review). A second globe, or any
instrument, would make About read as Home with different words; the
page's job at the fold is a masthead.

**Atmospheric imagery is material this round did not have.** The commission
allows About more documentary imagery than any other page (global city
details, infrastructure, travel, international working environments,
restrained nocturnal imagery). No such photograph exists in `assets/` and
the round forbids new image assets, so the atmosphere is carried by the
system's own means instead: real geography as notation, the portraits the
page already has, large controlled whitespace and editorial hierarchy. If
photography is approved later, the two places it belongs are a full-bleed
band between the name band and the people (one nocturnal city detail,
grayscale, no type over a face), and a second, quieter plate beside the
geographic register. Both are additive; nothing in this section has to
move to make room.

**The four disciplines are a ledger, not four cells.** Operators,
Intelligence experts, Risk experts and Research hung from one rule with a
tick per station, mono name over the sentence. The separation is padding
rather than a column gap, so the four rules abut into one continuous line
(the lesson `.cadence-v1` records in section 19). A four-column hairline
card grid is the first item on the brief's counter-prompt, and this
section carried one.

**People, in three registers, binding.** The content already carries three
groups and exactly three were drawn:

| Register | Who | Portrait | Why |
|---|---|---|---|
| `.ab-leads` (SUPERSEDED by round ten, section 26: the two leads print as the register's first two rows at the register's size) | the two roles the page opens with (Chief Executive Officer, Founder and Chairman) | 112px | the page's own reading order, printed at reading order's scale |
| `.ab-reg` | the rest of the core team, 16 people, two columns of ruled rows | 64px | a register, not cards: hairline per row, tick at its leading edge, no box and no fill |
| `.ab-adv` | Advisors and network, four stations on one rule | 80px, over the name | the entries carry no role line, so the rhythm changes with the content |

Nobody was regrouped, no role distinction was invented, and every person
keeps name, title where the content gives one, bio, credentials line and
profile link. **The larger portraits are an editorial device, not a
ranking**, the same rule the Guild page works under.

**Portrait scale is capped by the source files, not by taste.**
`assets/people/` holds 22 grayscale headshots between 112x124 and 221x221;
`MAPPING.json` records larger dimensions for three of them that the files
themselves no longer have. So 112px is the largest a lead portrait can
print and stay sharp on a 2x screen (a 190px source at 224 device pixels is
a mild upscale; the first cut's 152px was 304, a blur on every laptop the
chairman reads on), 64px the register and 96px the phone ceiling. The
hierarchy is therefore carried by type, measure and whitespace, and only
partly by portrait size: a 190px headshot printed at 300px is a blur, and
a blurred face is worse than a small one. Higher-resolution files would
let `.ab-por` grow without any other change. Grayscale and the `--line-2`
edge stay exactly as section 14 sets them: no filter, no crop treatment
and no decoration on a face, ever.

**Where we are, as a west-to-east register.** The three offices were three
boxes in a row, which says the regions are three equal products. They are
places, so they are drawn as places: one rule, one station per office at
its true meridian (Arlington 77W, Puteaux 2E, Singapore 104E on a scale
whose ends are San Francisco 122W and Singapore), the label hanging under
its tick. Other offices and operations hang from a second rule on the same
scale. **The meridians are the only text this page added, and they are
allowed for the same reason the home scale's labels are: a coordinate may
only be printed against something that actually has that coordinate.** UTC
offsets were the first draft and were dropped: half of them are wrong for
half of the year, and this site struck "real time" from the home page for
less. Two rules learned here: two lines of region label are reserved in
every station (`min-height:3em`), because EMEA wraps and the other two do
not and a wrapped label drops its own city one line; and below 1080px the
register stops being a map and becomes a ruled list, because a 226 degree
spread drawn 900px wide puts Puteaux under Singapore. The notation stays
in the list, since the meridian is what the stations were ordered by.
It wears no `.frame`: this is a statement of where the company is, not a
claimed view of data, the same reasoning that keeps `.steps` out of
instrument chrome.

**No amber on this page beyond the chassis.** The eyebrow ticks and the
one primary button are the page's whole accent. Amber means active,
changed, selected or decision point, and nothing About says is any of
those; a highlighted office or a highlighted person would be a signal
about a human being. Restraint here is the accent working, not the accent
missing.

**Page-local CSS is now one line.** The About `<style>` block held the
roster, the monogram fallback, the office grid and a copy of the strip
cross-link. All of it is in section 24 or deleted; the block keeps only
the current-page nav state. `.person-photo` (section 14) is still the
portrait component and is only ever given a new size, never a new
treatment.

### Plates (section 25, `.win-plate`)

Integration-round addition. Six real product screens on Home, Platform and
Solutions carried the macOS-style window chrome on desktop while every
phone crop of the same screens already printed as a plate. `.win-plate` on
the `.window` element drops the traffic lights, the shadow and the radius,
sets a hairline frame, and prints the product address in the bar as a mono
label behind one accent tick. The honesty tier is unchanged: a plate is
still the container for a real screen and nothing else. Unprefixed on
purpose, because it modifies a shared component rather than a page, and
scoped to `.window` so nothing outside a window can take it.

## Round ten (2026-09-19): interaction, people hierarchy, sections 26 to 28

The third visual-development pass, built on round nine from the chairman's
"Visual system v0.3" brief: no wording change, no brand change, no
redesign. Static design stays stable; interaction creates temporary
emphasis; motion means active, changed, selected, connected, progressing
and nothing more. People within a group carry equal static weight,
always. Each subsection below is written by the area's builder and
documents the binding decisions.

### People (section 26, `pi-`): Guild, About, the register

Two pages carried a permanent size difference between colleagues and both
lost it. Nothing was regrouped, no category was invented, no name moved,
and no word changed on any of the three surfaces (textdiff, alt text and
`aria-label` included: Guild 1048 words in and out, About 1337, Home 1377,
nothing added, nothing removed). What the sizes used to do, interaction
does now.

**Equal static weight is the rule, and it is one-directional, binding.**
Guild printed four members at plate scale ahead of twenty-four directory
rows and marked those four in the fold register; About printed two of
eighteen core-team members at 112px ahead of sixteen at 64px. Both choices
were editorial and neither was rank. It does not matter: a PERMANENT size
difference between people in one group is read as rank whatever it was
chosen for, and a register that appears to rank colleagues is a liability
before it is a design. So the levelling always goes one way — everybody
joins the register, nobody is promoted out of it — and order is untouched
on both pages, because re-sorting names is an editorial act nobody asked
for. The two About leads are simply the register's first two rows.

**One portrait size on About, across both groups, at every width.** The hard rule only
asks for equality within a group, and Advisors and network is a real
second group with its own rhythm (four across, portrait over the name, no
role line), so its 80px was legal. It went to 64 anyway: a reader does not
read the rule, they read the page (under 560px both groups drop to 56px
together, the size section 24 already gives the register there), and an advisor's head printed larger
than the chief executive's is exactly the question this round exists to
stop being asked. 64 is also what the sources allow — two core-team files
are 112px wide and cap that register — so one size for the page means that
size. Grouping is carried by the heading, the rhythm and the role line.

**The register replaces the plates as the page's object (Guild).** Losing
the four large plates cost the roster its only large thing, so the
directory became the interest, using only devices the site owns: the
monogram plate goes to 56px for everyone and takes the registration
corners that used to mark a featured member; a hairline runs down the
gutter at 50 percent, so two columns read as one ledger rather than two
lists; and each record's domain notation hangs from its own rule inside
the body column. The plate is still the portrait slot.

**The interaction model, three triggers and one set of values.** Hover
(pointer), `:focus-within` (a keyboard reaching the record's own profile
link) and `.pi-on` (a tap). All three set the same custom properties on
the record, and the consumers are written once, so a fourth trigger would
cost one selector. Active means: the leading station mark grows from 8px
of `--line-3` to 24–26px of `--accent`, the row takes the raised ground,
the plate or portrait gains a `--line-3` edge and scales 4–5 percent from
its left edge, a portrait picks up `contrast(1.08)` on top of its
grayscale, and bio, domains, role, credentials and the profile link each
step up exactly one ink. Nothing is revealed and nothing moves position:
every field of every person is printed at full legibility in the default
state, which is what makes the emphasis honest.

**What recedes is the register's marks, never the words, binding.** The
brief asks for surrounding profiles to reduce emphasis. Dropping opacity
on a row takes `--ink-dim` metadata below the 4.5:1 the body text is set
to clear, so twenty-seven people would be made slightly unreadable to
emphasise one. Instead the quieted records lose their plate (to .55 for a
monogram, .78 for a face — a face recedes less than a piece of typography)
and their station mark drops to `--line`. The delta reads and no
biography is dimmed. A record that is itself active is never quieted,
which is why each selector carries three negations: with one record
tapped and another hovered, both are forward.

**No expanded panel was built, and that is the finding.** A panel would
carry the larger plate, the full role, the expertise, the domain tags and
the profile link — which is the list of fields the row already prints. It
would add a modal, a focus trap and a second copy of every member's words
to maintain, in exchange for the same five fields at a different size. The
brief's own condition (`if a panel adds nothing the row does not already
show, do not build it`) is met, so it was not built. If Guild ever
publishes a field the row cannot hold — a location, a language, a
publication list — that is the moment to build the disclosure, and it
should be a real `aria-expanded` disclosure inside the record, not a
modal.

**Keyboard and touch.** Keyboard needs no new control: every record's own
profile link is the focus stop, and `:focus-within` puts the record
forward when it is reached, so tabbing the roster walks the register.
Touch gets `.pi-on` from a delegated click handler on each register — tap
a record to bring it forward, tap it again, tap the page, or press Escape
to release. The state is deliberately NOT exposed as a control: a button
whose whole effect is that a row gets darker is noise in a screen reader,
and there is nothing behind it to reach. Three records (William Vogt on
Guild, Lauri Byckling and Eva Mikkonen on About) carry no public profile
and therefore no focus stop; they lose nothing, because the state carries
no information. If parity is ever wanted there, the fix is a link for
those three, not a fake control.

**Guard the hover TRIGGER, not only the hover state, binding.** A phone
leaves an emulated hover on the last element tapped. The state block is
inside `@media (hover:hover)` for that reason, but so is the `:has(:hover)`
selector that makes the other records recede — without that second guard,
the second tap releases the record in the DOM while twenty-seven
neighbours stay recessed around a record showing no emphasis. Verified
under real `hover:none` by launching Chromium with
`--blink-settings=primaryHoverType=1,availableHoverTypes=1,primaryPointerType=2,availablePointerTypes=2`;
a Playwright `isMobile` context alone still reports `hover:hover` and will
not catch this. The `:not(:hover)` negations inside those selectors need
no guard: on a touch device the stale hover only ever sits on the record
that was tapped, which `.pi-on` already exempts.

**Amber on a person is allowed only while it is temporary.** Round nine
ruled no amber on About beyond the chassis; that still holds for every
PERMANENT mark, and it is why the four accent marks are gone from the
member register on BOTH Guild and Home — the two registers stay identical,
twenty-eight ticks and `28 members`, and neither singles anyone out. Amber
means selected, and a record the reader is pointing at IS selected: that
is the whole licence, and it expires when the pointer leaves. Home gained
no interaction; it names no member, so there is nobody to bring forward.

**Reduced motion** drops the scale entirely rather than shortening it: the
state is then carried by ink, edge and the accent mark, which is what it
was always for. **Without JS** the registers are complete, every link
works, and hover and focus still do everything except persist.

**On the audit list after this round:** `.gd-m-lead` and its eleven
descendant rules, `.gd-reg-rule i`, `.ab-leads`, `.ab-lead` and `.ab-por`
lost their only users. All are in sections 21 and 24, which are closed, so
nothing was deleted. Also unresolved: the Guild plates still hold
monograms, and portraits are the one piece of material that page is
waiting on — twenty-eight equal plates is the composition that makes
twenty-eight equal photographs a drop-in.



### Platform (section 27, `px-`): the trail and the proof views

Two devices on the machinery page, both progressive enhancements over
round nine: the capability walk becomes one evidence area with four
selectable views, and the intelligence trail becomes readable one station
at a time. **No word on the page changed** (source textdiff: 2301 words
in and out, zero changes; live DOM with JS on: the same 2292 words with
the same counts, in a different reading order, because the four station
lines are lifted onto the rail; ON SCREEN with JS on, the copy of the
three unselected moments is behind a click, by the brief's design). No asset, crop or caption changed. Every
selector is prefixed `px-`; only rules that move a layout are gated on
`html.js`.

**The rail is made of the page's own labels, and that is the whole
licence for it.** The brief's list of views is MONITOR / UNDERSTAND /
MODEL / OPERATIONALIZE; section 22 already ruled that the last three are
composition logic and are not printed, because Home's pipeline and this
page both print MONITOR, ANALYZE, DECIDE, ACT and a second set of stage
words on one site is the failure the one-diagram-one-direction rule
exists to stop. That ruling stands: the script **moves** each moment's
own `p.stage-num` into the rail rather than writing a label, so nothing
is printed twice, nothing is invented, and the rail cannot drift out of
sync with the moments it selects. Add a fifth moment and the rail grows
with it; only `repeat(4,...)` in 27.1 has to follow.

**The rail sits above the evidence area, never beside it.** A left rail
costs the plate a third of the column, and printing a 1920px product
screen small is the decoration round six ruled out and round nine
repeated. So the four stations hang from one rule across the width, the
selected one takes the accent and its own segment of that rule, and the
selected moment prints under it exactly as section 22 composes it. The
three unselected moments collapse to their station.

- **Selection is a click, Enter, Space or an arrow key; hover and focus
  give emphasis only.** Hovering a station lifts its tick and brings its
  label to ink, and that is all: switching a 1200px evidence area under a
  passing cursor is motion without intent, and a reader would lose the
  view they were reading by crossing the rail. This is the one place the
  brief's "selects or hovers" was read as "selects"; if it is ever
  reversed, it belongs behind a dwell delay, not on `mouseenter`.
- **Proper tab semantics.** `role="tablist"` on the rail (named by the
  section's own `h2`, so no interface word was invented), `role="tab"`
  with `aria-selected` and roving `tabindex` on the stations,
  `role="tabpanel"` with `aria-labelledby` on the moments, Left/Right,
  Up/Down, Home and End moving and selecting. A panel with no link of its
  own takes `tabindex="0"`; moment 04 carries two and does not need it.
- **The next plate is fetched before it is asked for.** All four images
  stay `loading="lazy"`; selecting a view promotes it and its two neighbours to
  `eager` (the view itself included: a lazy image inside a hidden panel
  never loads on its own), and the first pointer, focus or touch on the
  rail promotes all four, so a switch never opens on an empty frame while a reader who
  never touches the rail still downloads one screenshot.
- **Under 600px the rail is a vertical ruled list** with the selected
  plate under it: four 12-character station labels cannot sit across a
  390px column, and shrinking the label to make them fit would put the
  page's smallest type on its primary control. Tap selects; there is
  nothing to release, because one view is always shown.
- Three traps worth recording. `[hidden]` does not hide a `.stage`: the
  UA rule loses to `.stage{display:grid}`, so `.px-view[hidden]` has to be
  declared. A collapsed view never intersects, so the reveal observer
  would hand it over at `opacity:0`; the script drops `.reveal` from all
  four as it builds the rail. And every `:hover` rule here is wrapped in
  `@media (hover:hover)`: a phone leaves an emulated hover on the element
  it last tapped, which would hold the emphasis on a station the reader
  has finished with.

**The intelligence trail reads what it already draws.** At rest it is
exactly the figure section 22 shipped, including the one line drawn once
on arrival. Held, it answers the brief's question — what enters a stage,
what happens there, what comes out — using only what is already printed:

| Drawn | Reading |
|---|---|
| the station takes the accent, and the accent runs up its riser | the stage the reader selected |
| the decision object standing over it lights: full-height accent edge, ground one step up, its sentence to reading ink | **what happens there**, in the object's own words (`What we measure.`, `What could happen, and what we would do.`) |
| the station before and the station after hold one register up | what enters, what comes out |
| the accent is drawn over the run between those two | the relationship to the adjacent stages |
| every other station steps back one register, the last one included | while a station is held, amber means that station |

Nothing is revealed that was not already on the page. The stations were
not linked to the walk moments a screen above: a marker that cannot be
seen next to what it marks is notation for its own sake.

- **The stations are controls, not a picture, once the script runs.** The
  figure ships as `role="img"` with a label naming all seven stations,
  which is what it must stay without JS. With JS it becomes
  `role="group"` keeping that same label, and each station takes
  `role="button"`, `tabindex="0"` and `aria-pressed`. The elements stay
  `<span>`: every rule in section 22 addresses `.pl-trail span` and
  `:nth-of-type`, and swapping in `<button>` would have rewritten the
  figure to gain nothing a role does not give.
- **Hover previews, click holds, Escape or a second tap releases.** The
  pointer preview is attached only where `(hover:hover)` matches, so a
  tap is a hold and a second tap releases it rather than leaving a sticky
  hover behind; focus previews exactly as hover does, and releasing with
  the pointer still on the station keeps the preview.
- **Nothing may be appended after the last station, binding.** The figure
  styles its destination with `span:last-child`, so the first cut, which
  appended the run segment to `.pl-trail`, silently took the accent riser
  and the reading ink off ACTION at rest on both layouts — a defect
  invisible in a screenshot and obvious in a computed-style diff against
  the base. The segment is inserted as the FIRST child, beside `.pl-run`,
  and lifted over it with `z-index`. Any future element added to this
  figure goes in front of the stations, not behind them.
- **The run is measured, never guessed.** The stations are grid cells, so
  their own extents are the only honest coordinates for the segment
  between them; the script writes four custom properties from their
  rects and redraws on resize. Below 761px the trail is a vertical spine
  and the same segment is drawn down it.
- **Below 901px the risers are gone** (section 22), so the lit object
  cell is the only link between a station and its object and on a phone
  it can be off screen above. The reading holds locally through the
  neighbours and the run; the alternative was scrolling the page under
  the reader, which this site does not do.

**On the audit list after this round.** The three unselected moments are
in the DOM but `display:none`, so assistive technology reaches them the
way a sighted reader does, by activating their station — acceptable for
four peers behind a visible rail, worth re-examining if a fifth view or a
deep link lands here. `.stage-num` is printed in the accent by section
11, right for moments read in sequence and overridden here for a set read
as one control.



### Solutions (section 28, `sx-`): the adoption path, progressing

The adoption figure was not redesigned and not moved: it is the round-nine
drawing exactly, given a state. Proof rather than claim — the resting
figure at 1440 and at 390 is **pixel-identical** to the base tree
(`ImageChops.difference` bbox `None` on the `.so-path` element at both
widths; the resting clip inset is 14px clear on all four sides, so the
drawn runs carry no left clip after the sweep, a review fix), every station, run, heading and bullet reports the same x, width
and height, and the page's rendered text is 1065 words in and 1065 out
with no word-level difference. Nothing in section 23 was edited; section
28 only adds states and one draw, and where it changes a section 23
colour it does so from a selector one class ahead.

**The station label is the stage's control, binding.** `01 / ONE
DECISION` is now a `<button class="so-k sx-k">` holding exactly the words
it held as a `<p>`. The figure needed one real control for the keyboard
and for the phone, and inventing a tab strip over a drawn diagram would
have been the generic component this pass exists to delete; the station
label is already the stage's name and already the thing a reader points
at. `.sx-k` resets the browser's button costume and nothing else — the
top border is left alone, because it is the station rule and the three
heads still abut into one continuous hairline. `display:contents` on the
wide layout is untouched, and `:hover` and `:focus-within` match through
it, so the whole step is the hover target while the button is the
keyboard and tap target.

**Three sources, one state.** `:hover`, `:focus-within` and `.sx-on` (the
sticky selection the script sets on tap) all produce the same activation;
`.sx-act` on the frame is what puts the other two stages into the quiet
register. Hover and focus are pure CSS, so the figure answers a pointer
and a keyboard with the script absent. Specificity carries the order
rather than source position: every loud selector is exactly one class
ahead of every quiet one, so a hover beats a standing selection and
**exactly one stage is ever live**. The quiet trigger is
`.so-grid:has(.so-step:hover)`, never the grid's own `:hover`: on the wide
layout the step is `display:contents`, so the grid is hovered over its own
padding and margins where no step is, and a container trigger there greys
the whole figure with nothing lit (review, round ten). Section 26 uses the
same guard for the same reason.

**What activation is.** The live stage's station tick takes the mark
station 01 wears at rest (same position, 2px by 12px, amber), its index
goes amber, its extent run lifts to full ink and its marks with it; its
heading, sentence and bullets stay at their resting weight while the
other two step back: heading to `--ink-mute` (6.1:1), sentence to
`--ink-dim` (4.9:1), bullets to `--ink-mute`, checkers to `.38` opacity,
runs to `--line-2`. Nothing moves, nothing resizes, no station or
division changes position: the states are colour, weight and opacity
only, which is why the lattice survives them.

**Amber, and the round-nine rule.** At REST the figure still carries
exactly one accent, the decision point at station 01 — that is unchanged
and visible in the pixel comparison. While a stage is active, amber marks
THAT stage and station 01 stands down if it is not the live one, because
amber means active here as everywhere else on the site. A second
permanent accent would have broken the round-nine ruling; a temporary one
is that ruling working. The accent returns to 01 the moment the reader
lets go.

**The draw: clip, not scale, and once.** The runs arrive drawn rather than
present: `clip-path:inset()` sweeping left to right, 01 (.55s from .12s),
then 02 extending (.80s from .72s), then 03's four lines one after
another (.52s each from 1.60s, .10s apart) — 2.42s end to end, one pass,
no loop, resting in the static state. `transform:scaleX()` was rejected:
it compresses the run's own divisions on the way in, and a lattice that
reads wrong for half a second is the one thing this figure may not do.
The trigger is the existing reveal observer's `.in` class, the seam
`.pl-run` uses on Platform, so with JS off the figure is simply there and
under `prefers-reduced-motion` it is simply there too (`clip-path:none`,
explicitly, not merely a collapsed duration). **The insets are negative on
three sides** (`-14px`): the station marks overhang the run's own box by
up to 12px, and clipping at the box edge cuts them off at rest.

**Touch, and the defect that was found there.** `:hover` is declared only
inside `@media (hover:hover)`. Without that gate the second tap released
the selection in the record (`aria-pressed` back to `false`, `.sx-act`
gone) while the stage stayed lit by the phone's emulated hover — a
release that is true in the DOM and invisible on the screen. Verified by
forcing `availableHoverTypes=1, availablePointerTypes=2` in the browser:
tap selects, second tap returns the figure to rest, tapping another stage
moves the selection, tapping outside the figure releases it. A tap also
FOCUSES the button it lands on, so a pointer release drops the focus with
it; a keyboard release (Escape, or Enter on the selected stage, which
reports `detail === 0`) keeps the focus, because taking the tab position
away from someone using the keyboard is the worse failure. On the phone
the label's hit area is extended into the margins above and below it by a
transparent `::after` (31px of ink, about 57px of target) — it reaches no
word and no line and the layout does not move by a pixel.

**Keyboard.** Each stage's label is in the tab order and carries
`aria-pressed`; focus alone activates the stage, Enter or Space makes it
stick, Escape releases the selection. Escape does not blur, so a focused
stage stays active after its selection is dropped: for a keyboard reader
focus is the pointer, and the state follows it.

**Not done, deliberately.** The brief allows the activation of stage 01 to
reach down into the `first-engagement` block. It is not built: that block
already carries a permanent amber rule along its top edge, so "lighting"
it would mean brightening something already lit, and it would put a
second, distant thing in motion for a hover on a figure above it. The
figure states end at the figure.

**On the audit list:** nothing was deleted and nothing lost its last user
this round. `.sx-k` is the only new class in the page's markup, and the
three `<p class="so-k">` elements that became buttons are the only markup
change on Solutions.


## Round eleven (2026-09-20): refinement, density, scale and real-world texture, sections 29 to 33

The fourth visual-development pass, built on round ten from the chairman's
"Visual system v0.4" brief. Not a redesign: about 90 percent of the visual
language stays. What changes: excessive empty space, oversized headings,
visual rhythm, a few conventional container layouts, the use of real-world
external-intelligence material, and page-to-page differentiation. No
wording, navigation, logo or palette change; the black and white resolving
into grey device stays, used in full on About and in fragments only
sparingly elsewhere. Each subsection is written by the area's builder and
records the binding decisions.

### Scale and rhythm (section 29): the system builder

Section 29 is the round's chassis: one typographic ladder, one vertical
rhythm, one per-page density mechanism, applied site-wide. It is written
as overrides on the selectors sections 01 to 28 already use, because
those sections are frozen this round, and it is the section the four page
builders build on rather than edit. Nothing in it changes a word: the
built tree before and after this pass is word for word identical on all
27 pages, alt text and `aria-label` included (home 1421, platform 2614,
solutions 1220, about 1313, guild 1039, use cases 892).

#### The ladder is six levels, binding

Round seven fixed three FACES. This fixes the second axis, six SIZES,
each with a job, so importance is carried by level and never by adding
points to a heading.

| Level | Token | Value | Printed at 1440 | Where |
|---|---|---|---|---|
| L1 page proposition | `--fs-l1` | `clamp(32px,3.5vw,50px)` | 50px | `.hero h1` on every page, through `--fs-hero` |
| L2 section argument | `--fs-l2` | `clamp(25px,2.3vw,32px)` | 32px | `.sec-head h2`, through `--fs-h2`, plus every closing panel |
| L3 functional heading | `--fs-l3` | `clamp(19px,1.75vw,24px)` | 24px | `.stage h3`, `.first-engagement h3`, `.so-app-copy h3`, through `--fs-h3` |
| TECHNICAL LABEL | `--fs-label` | `11px` | 11px | `.eyebrow`, and every mono uppercase label |
| BODY | `--fs-body` | `16px / 1.6` | 16px | running copy; the dek register is `--fs-dek` 16.5px, the lede `clamp(16px,1.35vw,17.5px)` |
| METADATA | `--fs-meta` | `10.5px` | 10.5px | `.rule-label`, captions, station labels, attributions |

L1 came down from 64px and L2 from 40px. The steps are 1.56 (L1 to L2),
1.33 (L2 to L3) and 1.50 (L3 to body), against 1.60, 1.29 and 1.94
before: the two loud levels are closer to the page and the quiet ones are
further apart, which is what the note that "some headline levels feel too
similar" was asking for.

`--fs-hero`, `--fs-h2` and `--fs-h3` keep their names and now read from
the ladder, so no rule outside section 29 had to change to follow it.
**Anything that needs a display size takes a level. A new clamp on a
heading is a regression**, and the eight that already existed are brought
onto the ladder in 29.2.

#### A label may not inherit a reading size, binding

`.sec-head p` (0,1,1) outranked `.eyebrow` (0,1,0), so every eyebrow
inside a section head printed at **17px mono with .18em tracking**:
measured on /guild/ before this pass, `font-size: 17px,
letter-spacing: 3.06px`. That is the instrument voice set at reading
size, and it is both the "too much technical type" the brief warns about
and the reason the label level was invisible in the ladder. `p.eyebrow`
and `.sec-head p.eyebrow` put it back to 11px everywhere. The lesson is
general: a label class carries its size in a shorthand and loses to any
element-plus-class rule written for the block around it, so a label that
sits inside a styled container has to be re-stated there.

#### Only one thing prints above L2, binding

`.sec-statement .sec-head h2` is the one section per page allowed above
L2, at `clamp(28px,2.9vw,40px)`. It is a modifier of L2 and **never
reaches L1**: 40px against the page's own 50px. Everything else that
carried its own display clamp comes down onto the ladder: the closing
`.access-panel h2` was 48px, one step above the h1 of the page it closes
and over a third of the words, and is now L2. `.name-copy h2` is L2. The
statement voices (`.net-lede`, `.quote-main blockquote`, `.statement`,
`.gd-claim`) are set apart by face and measure rather than by size and
now top out between 27px and 30px. 404's page-local `.access-panel h1`
reads `--fs-l2` too.

**Record names in a register are not L3.** The 17px and 16.5px `h3`
elements inside `.so-step`, `.gd-p`, `.ab-reg` and the ruled rows were
left exactly as they are. They are the name of a row in a register, which
is metadata with heading semantics, and printing them at L3 would turn
every register on the site into a card run of headings. L3 is for a
functional heading that opens a block of reading.

#### Vertical rhythm, and the page-specific density mechanism

The rhythm moves from the tokens first, so one change reaches every page:
`--sec-pad` 136 to 116 at 1440 (15 percent) and `--head-gap` 64 to 52
(19 percent). The clamp MINIMA come down by less (84 to 76, 40 to 34)
because 390px was never the sparse width.

**Each page declares its own register on `<body data-density>`**, and the
rhythm tokens follow the attribute. This is the whole mechanism: one
attribute per page, no page-local spacing, and a page that declares
nothing gets the balanced base.

| Page | `data-density` | `--sec-pad` at 1440 | `--head-gap` at 1440 |
|---|---|---|---|
| Home | `balanced` | 116 | 52 |
| Platform | `dense` | 100 | 44 |
| Solutions | `clean` | 112 | 48 |
| About | `human` | 120 | 56 |
| Guild | `editorial` | 124 | 56 |
| Use cases | `structured` | 104 | 44 |
| Contact | `clean` | 112 | 48 |
| API | `dense` | 100 | 44 |
| Insights | `editorial` | 124 | 56 |

The spread is 100 to 124 against a flat 136 before, so every page is
tighter than it was and no two neighbouring registers read alike. Guild
and About are cut least on purpose: they are the people pages, and their
air is the point.

Six named runs of ground were carrying more air than content and are cut
in 29.3: the hero's own padding (top to `clamp(48px,5.6vw,76px)`, bottom
to `.82` of the page's section padding, because a fold ends into a rule
rather than into another section's head), `.sec-statement` 168 to 130,
`.statement`'s margin 76 to 60, `.access-panel`'s padding 84 to 66,
`.cadence`'s margin 68 to 56, `.site-foot`'s padding 72 to 60, and the
runs above the two people registers (`.ab-reg`, `.ab-rl2`, `.gd-reg`).
Everything else keeps the air it had.

**`--label-gap` names the 44px that lives in 22 inline style attributes**
(`<div class="sec-head" style="margin-top:44px">`). It is the space
between a chapter label and the head under it, it varies with density
(28 to 36), and the rule has to carry `!important` because an inline
style outranks every selector and the markup is frozen for the page
builders working after this pass. When those attributes are removed the
rule holds the same value, so nothing regresses.

#### Mono discipline

Mono stays the instrument voice: labels, numbering, categories,
navigation, timestamps, source and state labels, captions, annotations.
Round nine already ruled that a full sentence in letter-spaced uppercase
is "a label pretending to be a sentence" (`.level-out`). One instance was
left on the site, `.caps-note` under the instrument index on Platform,
and it moves to the sans body register at `--fs-small`. Same words, same
place, same ink. The audit for this was a walk of every leaf element on
every page for mono text of nine words or more: everything else it found
is a caption, a figure attribution or a podcast credit line, all of which
are metadata and stay.

#### Measured, at 1440 and at 390

Page heights before and after, in pixels at 1440:

| Page | Before | After | Change |
|---|---|---|---|
| Home | 12730 | 11514 | -9.6% |
| Platform | 14790 | 13256 | -10.4% |
| Solutions | 8148 | 7440 | -8.7% |
| About | 7158 | 6717 | -6.2% |
| Guild | 6387 | 5895 | -7.7% |
| Use cases | 4966 | 4604 | -7.3% |
| Contact | 4194 | 3647 | -13.0% |
| API | 4172 | 3554 | -14.8% |
| Insights | 7308 | 6951 | -4.9% |

The rhythm itself is 15 to 19 percent tighter; a page drops less than
that because registers, plates and diagrams do not scale with the
rhythm, which is the correct outcome. The gain lands where the brief
asks, in the first screen. Home now shows the cadence ledger under the
fold's figure at 1440 (it began at 925px before and begins at 750px
now). Platform reaches its first section heading, its dek and the top of
the four-levels figure inside 900px; before, the fold ended at the two
calls to action. Solutions opens the adoption figure at 465px rather
than 607px. Guild and About reach their first section argument with the
heading at 32px rather than 40px.

At 390 the pass is deliberately smaller: the ladder's minima (32 / 25 /
19) are BELOW the old ones (38 / 28 / 24), so a title takes less of a
phone screen than before (8 to 16 percent of 844px against 12 to 22),
the section padding gives up 8px and the head gap 6px, and `.sec-head`
gets its internal gap back under 560px because four stacked blocks in a
342px column need it. No page scrolls horizontally at 390 (`scrollWidth`
equals 390 on all ten). Labels are 11px everywhere, which is what they
were specified as and what they now are.

#### Two corrections this section carries for the fix pass

**The header's primary button is a hairline control on a phone (29.6).**
Under 640px `.site-head .btn-primary` printed 161px of accent BLOCK in a
390px bar, directly above a hero whose first control is the same words in
the same amber. Two identical loud verbs in one viewport is one call and
an echo. Below 640px the header instance takes `.btn-ghost`'s register
(hairline, ink text, no fill) at 11px and 9px/13px padding, 133px wide,
so the fill belongs to the hero alone. Not a word and not a link changes,
and the tab order is untouched.

**Use cases gets a two-column fold (29.7).** It was the last hero on the
site printing eyebrow, headline, dek and both buttons in one left column
with the right half of the fold empty for 490px: the "huge headline plus
very little else plus large empty space" the brief names outright. Above
981px the headline takes the left column and the dek and the two controls
take the right, both opening on the same top, which is the shape
Solutions and Platform already use. The markup's reading order is exactly
the order the grid places them in, so no word moves; the stacked layout
under 981px is untouched. The page is selected by
`body[data-density="structured"]`, which belongs to it alone (29.4), so
no markup had to change. Hero height at 1440: 488px to 364px.

**The `!important` count.** This section carries two (29.3 and 29.6) and
section 31.1 carries a third for the same reason: `.pf-ext .sec-head` has
to beat 29.3's own `!important` because the Platform head moved inside a
wrapper and stopped being the `.rule-label +` sibling. Three is the whole
set, and a fourth should have to argue for itself.

#### Not done, deliberately

The h3 sizes inside registers (above), the compositions themselves (the
page builders own those in sections 30 to 33), and the `.principle`,
`.arc-q` and `.agents-copy h3` clamps, which already sit inside L3's
range. Nothing in sections 01 to 28 was edited.

### Home and Solutions (section 30)

Home is balanced, atmospheric and immediate; Solutions is clean and
commercially direct. Both pages keep every word, every section, every
figure and every interaction. The built pages are word for word
identical before and after this pass with one exception, the sanctioned
one: the metadata credit under Home's new documentary plate and that
image's alt text (Home 1144 visible words in, 1154 out, the ten added
words being the credit line; Solutions 1065 in, 1065 out; alt and
`aria-label` entries unchanged on Solutions, one added on Home). Nothing
in section 29 was re-tuned: the ladder and the two rhythm tokens are read
here, never redeclared, and every composition below is a layout on top of
them.

#### The fold ends on evidence, not on ground (Home)

The brief asks for more of the page's argument inside the first screen
without changing what the globe is doing, so nothing about the instrument
moved: the longitude scale, the scope, the crop, the caption, the pause
control and the cadence ledger are exactly as rounds eight and nine left
them. What came out is ground. The fold was carrying three stacked runs
of air in one screen (76px above the scale, 54 between the scale and the
grid, 95 under the whole thing), and they are now 46, 30 and 72. At 1440
the proof strip, which is the research partnerships and the G2 rating,
moved from 904 to 817 and is the last thing inside 900px. **The first
screen is the proposition, the instrument, the operating cadence and the
outside evidence for all three**, which is what this fold was one run of
ground short of.

#### Three bands that were the same band (Home)

The brief's section 19 names the rhythm to break: small technical label,
huge headline, blank area, bordered graphic, repeated. Three bands on
Home were that shape and each one is now an unequal pair, with the
asymmetry coming from the information rather than from an offset:

| Band | Before | After | Height |
|---|---|---|---|
| `#prepared`, "Being ready" | head, lede and three thin rows queueing down a very tall band | the claim in a 36 percent column, the three consequences carrying the density in the 64 | 685 to 520 |
| `.sec.mission`, the quote | one quote in a whole screen under its own label | the label as a left rail, the quote in the wide column beside it, the band at .74 of the page's rhythm | 452 to 353 |
| `#shared`, the statement | a 40px heading and two paragraphs in the left 55 percent, the right half empty | heading left, the reading that supports it right | 729 to 631 |

No row, sentence, rule or accent inside them changed. `#prepared` also
narrows its own label column, because the three row labels are two and
three words and the sentences are what a reader scans.

#### The first engagement is a flow, binding (Solutions)

The page's most commercially important block, and the brief's section 7:
every word stays, the big bordered container goes. It is now three
stations hanging from one continuous rule, read left to right, with the
shared 14x10 arrow on the rule between them. The rule is continuous
because the separation is padding and never gap, which is the lesson the
cadence ledger records in section 19.

**Amber is the sequence, and that is the component's one accent role.**
The block used to spend its accent on a 2px panel edge, which is
decoration wearing a signal colour. It now spends it on three marks, one
at the leading edge of each station, which is position in a sequence and
is what amber means everywhere else on this site. Three marks of one role
are not three roles, and the block carries no other accent.

**Timing is an annotation, not a fourth group.** It sits under the flow
on its own hairline, label left and sentence right, in the mute register
at 15px. It stays LAST in the markup, where a reader meets it after the
three groups it dates; placing it visually beside the heading would have
put it ahead of them in the reading order for no gain (WCAG 2.1 SC
1.3.2). Below 900px the flow stacks, the arrows turn ninety degrees, and
each station keeps its rule and its mark: an arrow still pointing right
between two blocks that sit one above the other is a direction the page
does not have.

#### The adoption path, refined and not redrawn (Solutions)

The brief keeps this figure and asks for proportions, spacing, line
weights and the subtlety of the activation. **The lattice is untouched**:
the twelve tracks, the three spans, the division counts of 6, 18 and 10,
the bounded run, the sustained run, the field of four and the accent at
station 01 are exactly as section 23 drew them, because a ruler that
stops registering with what it measures is the one thing this figure may
not become. What changed is the air inside the frame (the grid's padding,
the gap above the station rule, the two gaps inside a step) and how far
the two quiet stages step back.

**What recedes is the marks, not the words.** The quiet register dropped
a stage's checkers to .38 along with its ink, which reads as the figure
dimming rather than as one stage coming forward. The checkers now hold
.55 and the delta is carried by the station mark, the index, the extent
run and the heading. That is round ten's own rule for the people
registers, applied to a diagram.
This subsection also, in its first form, moved the quiet sentence from
`--ink-dim` to `--ink-mute`, which is the ink the LIVE stage's sentence
already carries: quiet and live printed the same colour and the sentence
stopped saying anything about state. The review measured it (every `.v`
on the figure read rgb(84,92,103) with stage 02 hovered at 1440) and the
fix pass removed the override, so section 28's ink stands: `--ink-dim`
quiet, `--ink-mute` live, measured at rgb(98,107,119) against
rgb(84,92,103).

**A trap worth recording: the hover pair in section 28 is equal
specificity.** `.so-grid:has(.so-step:hover) .so-step .checker` and
`.so-path .so-grid .so-step:hover .checker` are both (0,5,0), and section
28 relies on source order for the loud one to win. Re-declaring the quiet
rule in a later section without re-declaring the loud one after it
silently inverts the figure, so section 30 repeats BOTH, in that order.
The second half of the trap is what the fix pass found: repeating a pair
is only safe while ONE of the two values moves. Section 30 repeated the
ink pair too and landed the quiet value on the loud one, which is a rule
that hides the rule underneath rather than refining it. Repeat for source
order, change one value, and say in the comment which one.
Verified by computed style: at rest every sentence is `--ink-mute`; with
station 02 hovered, step 01's heading is mute while 02's is ink and 03's
checkers are .55; with 03 selected by click, 03 is the only live stage.

#### The two sparse runs the brief names (Solutions)

The ground between the fold and the adoption figure (the hero's bottom
padding, now .56 of the page's section padding) and the ground above "How
each function uses the same layer" (that section's top padding, now .72).
Both are cut against the page's own clean register rather than by a fixed
number, so the page keeps one rhythm. The chapter label above the
adoption figure gained 18px in the same move, because it had been sitting
directly on the frame's top edge with nothing between them.

#### Measured, at 1440 and at 390

| Page | 1440 before | 1440 after | 390 before | 390 after |
|---|---|---|---|---|
| Home | 11514 | 11319 | 13902 | 14076 |
| Solutions | 7440 | 7254 | 10077 | 9945 |

Home is 1.7 percent shorter at 1440 while GAINING a figure it did not
have: the three recomposed bands and the fold give back 449px and the
documentary plate spends 256 of it. At 390 Home is 174px longer for the
same reason, and that is the honest statement of the trade: the brief
asks this page for a real-world moment, a figure has a height, and the
phone hero gives back about 55px of it. Everything else on the phone is
tighter than it was. No page scrolls horizontally at either width
(`scrollWidth` equals the viewport on both, at both widths).

#### Not done, deliberately

The globe and its scope (the brief's own limit), the aperture figure, the
pipeline, the recipe, the daily steps, the role views, the trust section
and the Guild moment on Home; the worked chain, the two ruled indexes,
the example application and the quotes on Solutions. They already follow
the system, and the round-eleven instruction is refinement, not a pass
over everything. The adoption figure's activation was softened but not
re-timed, and the first-engagement block was not given a hover state:
nothing in it is selectable, and motion on a block a reader is reading is
motion without meaning.

### Platform (section 31)

Platform is the analytical page, so this round's object was the two things
the brief names for it: stop the walk reading as a sequence of giant
product screenshots (brief 9), and put one piece of real external material
on the page where it earns its place (briefs 10 and 11). Everything below
is composition and density on top of section 29's ladder and the round-ten
rail in section 27, neither of which was edited. **No word on the page
changed.** Rendered word lists before and after are identical at 1440 and
at 390 except the eight words of the image credit
(`NASA Black Marble, NASA Goddard Space Flight Center`), and the one alt
text that arrived with the image; nothing was removed, reworded or
reordered, and the UTC clock is the only other string that differs between
two captures. The rail still prints MONITOR, ANALYZE, DECIDE, ACT and the
section eyebrow is untouched.

**The evidence area is a crop, and the crop has a ceiling, binding.** Round
ten made the four moments one selectable view; what was left was their
height. At 1440 the globe printed **736px** and the simulation **755px**,
four fifths of a viewport for one screenshot. Both are re-cut, stated in
source pixels the way every crop on this site is stated, and **no plate in
the walk now passes 0.56 of a 900px viewport**:

| Stage | Source rect | At 1440 | Before |
|---|---|---|---|
| 01 MONITOR | x 296 to 1920, y 130 to 840 of 1920x1040 | 503px | 736px |
| 02 ANALYZE | unchanged (22.2c, 772x250) | 297px | 297px |
| 03 DECIDE | x 360 to 1880, y 38 to 624 of 1920x1036 | 443px | 755px |
| 04 ACT | unchanged (22.4, 1920x566) | 339px | 339px |

**The phone rects, corrected in the fix pass (31.2b).** The wide crops
above were re-cut and the 390 ones were not looked at, and two of them
described something the reader could not see. MONITOR at 390 printed
source x 1498 to 1920, y 0 to 316: the far right edge of the screen, a
star field, the projection toggle and a column of unchecked layer boxes,
and not one pixel of the globe, under a caption that reads "tracked
events and infrastructure on one globe". It is now source x 520 to 1420,
y 60 to 735, which is the lit limb against the star field on two sides,
the coastlines and the event marks dense enough to be counted at 342px;
the layer panel goes, because at this width the picture can carry the
globe or the controls and the caption is about the globe. The report
plate printed source x 28 to 712 of a 1642-wide document, so every line
of the executive summary and the thesis ran off the right edge of the
plate mid-word; a vertical cut through a paragraph cuts words on every
line it crosses, so the rect now takes the frame's own full width and
cuts only horizontally, source y 0 to 730. That row falls inside the
blank band the document leaves between the first executive-summary
paragraph and the next (rows 706 to 753, found by scanning the asset for
rows with no dark pixel between x 40 and x 1600), so the crop ends on a
line boundary and no word is sliced. It is exactly what the phone caption
promises: the head of the report, shown as a detail. The cost is scale,
342/1642 against 342/684 before, and at 2x the body still resolves while
a cut word never does. Both are overrides written from section 31 on the
frozen rects in sections 17 and 22. Page height at 390: 19641 to 19380.

The globe opens under the projection toggle, which is a view control
rather than evidence, and ends in the gap under `Naval` and above
`Spaceports`, so no layer row is cut in half; the sphere is cut by the
plate, which is what this site already does with a globe. The simulation
keeps the scenario title bar whole (round seven) and ends in the **15px
gap the product leaves between the primary option and the alternative
one**, which was measured off the asset with a row scan rather than
guessed: the actor list keeps its own bottom rule and no line of reasoning
is sliced. What each caption promises is inside its rect, which is the
condition a crop has to meet before the caption may stay.

**A crop that is already a crop does not get re-cut** to make a rule look
tidy. The knowledge graph and the example application were cut in rounds
nine and ten to 298px and 339px and are untouched.

**The annotations are moved, never written, binding.** The brief asks for
one or two annotations that explain what matters and forbids new wording
for them, so nothing was written: the two annotations each stage already
owns are moved to the foot of the plate they annotate, exactly as round
ten moved the station line onto the rail. The figure's own caption takes
the left of one hairline under the crop and the stage's INPUT/OUTPUT pair
takes the right of the same hairline, with a station tick at its leading
edge. Separation is padding and never a column gap, so the two rules abut
into one line (`capRight` and `ioLeft` both measure 801px at 1440). The
pair moves in the markup, from the copy column into the `<figure>` after
the `figcaption`, which is where it now belongs: it annotates the
evidence, not a paragraph two hundred pixels above it. This supersedes
round seven's placement of `.stage-io` for the four walk moments only;
every other `.stage-io` on the site is untouched.

**Nothing is drawn over the product pixels, binding.** A label sitting on
top of a real screenshot inside a `.window` reads as part of the product's
own interface, which is a claim about the product that the honesty tiers
exist to stop. The leader-onto-a-mark device (section 19.4) stays what it
was: a device for the drawn and example-application registers, where the
site owns the artwork.

**The sourced report could not be cropped, and that is a finding rather
than an omission.** It is the one plate on the page still over 700px
(711px at 1440). Its caption names its version control, which is the top
edge of the asset, and its sources panel, which is the bottom edge, so
**every controlled-height crop of it describes something the reader cannot
see**, and the caption may not be rewritten this round. Cropping the
bottom to drop a sliced source line was checked and rejected too: the row
scan shows source `[3]` is complete in the asset, so the cut would delete
a whole source to save 17px. The available fixes both need a word: either
the wide caption clause loses `and the sources panel under it`, or the
phone clause (which already names the head of the report alone) is
promoted to every width. **That is a chairman's call, not a builder's.**

**Density, and what was deliberately left alone.** The page already
carries `data-density="dense"` from section 29. On top of that: the walk
moment's own padding block (84 to 42 at 1440) and the view's opening gap
(38 to 26), since one moment is read at a time under a rail that already
separates it from the head; the delivery block (80 to 58); the lens, the
worked chain, the instrument index, the agents block and the fold's
eyebrow. **`.rx-stack` was NOT tightened**: Home carries one too, and a
page builder does not reach into another page through a shared component.

**One documentary plate, and the formula it breaks.** See "Platform
texture (33.2)" below for the asset and its chrome. The composition
decision belongs here: `#breadth` opened with the page's fourth
consecutive `label -> eyebrow -> headline -> dek -> blank -> bordered
graphic`, which is the formula brief 19 names, and it is the one place on
the page that talks about the outside world in its own voice. The head
keeps every word and takes the left of the chapter rule; the plate takes
the right of it. Two unequal columns because the information is two kinds,
an argument and a piece of evidence, which is the asymmetry brief 6 asks
for rather than an offset for its own sake. Under 1101px the plate drops
under the head and opens its rect rather than scaling down.

**Measured, at 1440 and at 390.**

| | Before | After |
|---|---|---|
| page height at 1440 | 13256 | **12808** (-3.4%) |
| page height at 390 | 19638 | **19641** (+3px) |
| tallest walk plate at 1440 | 755 | **503** |
| `scrollWidth` at 390 | 390 | 390 |

The page is 448px shorter at 1440 while carrying a new plate, and the
three quarters of that which the two crops contribute are not visible in
the page total, because only the selected view is in the layout: the
simulation's 312px are a height the reader meets on selection. At 390 the
page is flat rather than shorter, and that is the honest statement of it:
the phone gained the documentary plate (about 240px with its credit) and
the density work gave back about the same.

**Above the 900px fold at 1440** the page now reaches the eyebrow, the
h1, the dek, both calls to action, the chapter rule, the section head and
the documentary plate with its credit, and the head of the levels frame.
The trade is visible and deliberate: the fold gives up about one row of
the lens figure and gains the one piece of the real world on the page.

**Not done, deliberately.**

- **No "reveal more UI" affordance.** The brief allows one. A control
  whose whole effect is that the plate gets taller would re-introduce the
  full-height screenshot the crop exists to remove, and round ten already
  ruled that a control with nothing behind it is noise in a screen reader.
  If a reader ever needs the whole screen, the honest form is a link to
  the product, not a disclosure on a picture.
- **The second texture asset** (a fragment of a published export-control
  rule) was available and is not used. One moment per page is the ceiling
  the round sets, the page's one place for a document fragment would be
  beside the worked chain, and that chain is a drawn `Illustrative view`:
  a real document laid against an illustrative figure invites the reader
  to read the figure as real too.
- ~~**The phone crop of the globe** (section 17) is not re-opened.~~
  Overturned by the fix pass: the crop showed no globe at all, not "a
  third of dark sky beside the tracking panel", and a crop that omits
  what its caption names is a defect and not a trade. See "The phone
  rects, corrected" above. The trade it described was real, and the fix
  pays it the other way: the layer panel goes and the globe stays.
- **No new control, no new motion, no new colour.** Reduced motion and
  no-JS were both verified: with JS off all four moments print in full
  with their INPUT/OUTPUT pairs and the texture plate renders at its
  static size; under `prefers-reduced-motion` nothing in 31 or 33.2
  animates at all.

### About and Guild (section 32)

The two people pages. Both were refined on the round-nine compositions
and the round-ten interaction model, neither was redesigned, and **no
word changed on either page**: the rendered text of /guild/ is 807 words
in and 807 out at 1440 and 794 in and out at 390, with no word-level
difference and no change to any `alt` or `aria-label`; /about/ gains
exactly the nine words of one source credit and one new `alt`, which is
the one addition the round sanctions for a documentary image. Section 32
is written as overrides on the selectors sections 21, 24 and 26 already
use, because those sections are frozen; the new classes are `ag-`.

**The About fold is two columns, corrected in the fix pass (32.1).** The
fold was a headline across the top, a full-width hairline, and the intro
hanging in the right half of the row under it. This section's first form
kept that shape and tightened its proportions, which made the empty half
smaller without making it anything: at 1440 the left half of that row was
a 452 by 155 hole beside a paragraph, and a rule that spans a row is a
promise that something sits on both ends of it. The row is now the
composition: the headline takes the left column, the intro takes the
right, and the two share one top, which is the shape the Platform and
Solutions folds already use. The page's own marks survive the move, the
hairline included, but it is now the rule the intro column opens on and
it aligns with the cap line of the headline beside it. Under 981px the
grid collapses and the fold stacks in reading order, unchanged. Hero
height at 1440: 524px to 340px; page height 6690 to 6548.

**Equal static weight is untouched and was measured, not assumed.** Round
ten's rule (section 26) is one-directional and nothing here moves against
it: every one of About's 22 people renders at 64x64 at 1440 and 56x56 at
390, and all 28 Guild plates render at 56x56 at 1440 and 48x48 at 390.
One size per group, per viewport, on both pages. Nothing in this round
touched a portrait, a plate or a name's order.

**The brand device is printed in full, once, on this page, binding.** The
five marks ran at 98px in a column beside a paragraph, which is the
"small strip" the brief names. They now run the full content width at
157px (a grid of five equal cells, so the progression divides the page's
own measure at every width and the gap scales with the viewport instead
of pooling at one end), hanging from the same rule they already hung
from, with the same caption still ending under the grey square, which is
where the sequence resolves. The copy sits above them at its own measure
rather than beside them. Nothing was added: same five marks, same rule,
same words. The band costs 188px and it is the page's brand moment, which
is what the brief asked for; checkerboard motifs stay off every other
page, and this is the one place the device appears in full.

**Density is ground, never size, binding.** Both registers give up
padding and internal field spacing and nothing else: About's row loses
14px of padding and 8px between a person's four fields (register 2251 to
2017, -10.4%), Guild's row goes 162 to 143 (-11.7%) and the roster gutter
comes in by 16px, which the biographies take back as measure. No field
was dropped, no type size changed, no plate moved. A Guild row is still
taller than its plate at every width, which is the floor this register
may not cross.

**Where the documentary plate went, and where it did not.** It sits in
the head of the "Where we are" section, on the right, above the
west-to-east office register. Three placements were considered and two
were rejected: the fold, because an image in the hero is the hero
background the brief rules out and the fold is a masthead; and beside the
geographic
register, which round nine proposed, because that register's stations are
MERIDIANS and a scale drawn narrow stops registering with what it
measures (section 24.5). The section head was three short lines with
nothing beside it, so the plate takes that ground and the register keeps
its full width under it. The relationship is exact rather than
atmospheric: the frame holds two countries, the strait between them and
one of the three offices the register names. Figure chrome is in 33.3.

**The Guild expertise filter was NOT built, and the reason is in the
data.** The brief allows the "Expertise areas" strip to become a
restrained filter. Counted against the roster's own tags, the ten areas
the strip prints are carried by: Geopolitics 20 members, Strategy 10,
Finance 10, Regulation 9, Security 5, Technology 4, Operations 4, and
**Economics 0, Industry 0, Regional and local knowledge 0**. So three of
the ten controls would select nobody and the most likely control would
quiet 8 of 28 people, and the only honest way to explain either is words
this round may not add. A filter whose first defect is a dead control on
a page about people is worse than no filter. If the roster ever carries
every area it advertises, or the areas are ever derived from the roster
rather than listed beside it, this is the one interaction this page is
waiting for; the quieting model it would use already exists in 26.2.

**A defect fixed on the way past (32.7).** Section 21 sets the Guild
record's raised ground on `.gd-m:hover .gd-p` with no `(hover:hover)`
guard, and that selector outranks the custom-property model section 26
built (0,3,0 against 0,2,0). Under a real touch device the second tap
released the record in the DOM and left the raised ground on screen,
which is the stale-hover failure round ten documented twice and guarded
everywhere else. Verified both ways with
`--blink-settings=primaryHoverType=1,availableHoverTypes=1,primaryPointerType=2,availablePointerTypes=2`:
with section 21's rule re-injected the ground stays after the release,
with 32.7 in place tap, second tap, tap-elsewhere, keyboard focus and
pointer all produce one state from one place, and under
`prefers-reduced-motion` the state is ink, edge and the accent mark with
no scale.

**`.ag-about` on About's `<main>`, and why an id is not a page.** Five of
this section's rules address the About sections by id (`#why`,
`#why-grey`, `#team`, `#offices`, `#category`), and `#offices` also
exists on /contact/, so the first cut reached a page outside this area.
Every one of them is now scoped by one class on About's `<main>`. That is
the only markup change on the page besides the figure, it carries no
words, and it makes the rest of the round-eleven work on this page
un-leakable by construction. Proof: all eight other pages render at
exactly the baseline height at 1440 after this section lands (home 11514,
platform 13256, solutions 7440, use cases 4604, contact 3647, api 3554,
insights 6951, partners 3328). **An id is not a page scope on this site;
several ids repeat across pages.**

**One rule that nearly shipped a defect of its own.** `.ab-geo-t{height}`
written bare in section 32 has the same specificity as section 24.6's
`height:auto` at `max-width:1080px` and sits later in the file, so it won
at every width and stacked three absolutely positioned offices on top of
each other at 390. Any value that belongs to the wide layout of a
component whose narrow layout is already written has to be re-stated
inside the same breakpoint. Found in the phone walk; invisible at 1440.

**Measured, at 1440 and at 390.**

| Page | 1440 before | 1440 after | 390 before | 390 after |
|---|---|---|---|---|
| About | 6717 | 6690 | 11831 | 11497 |
| Guild | 5895 | 5595 | 10319 | 9665 |

Guild is 5.1 percent shorter at 1440 and 6.3 at 390, all of it out of the
roster and the figure above it. About is 27px shorter, and that number is
worth reading honestly: the two things the brief asked this page to GROW
cost it 539px (the documentary plate takes the offices head from 61 to
412, the brand band from 466 to 654), and the runs of ground gave back
566px (hero -43, the disciplines gap -54, the team section -358, the
closer -24). The page absorbed a real photograph and a brand moment at
1.6 times the scale and still came out shorter than it started. In the
first screen at 1440 About now reaches the first discipline row rather
than ending on the section dek, and at 390 the first discipline row is
whole above 900px.

**Not done, deliberately.** The Guild filter (above). The portrait
sizes,
which the sources cap and the equal-weight rule freezes. The roster
order, on either page. And no second checkerboard anywhere.

### Real-world texture (section 33)

**One chrome, three pages, one rule.** Home, Platform and About each
carry a single documentary plate; Use cases carries none, so there is no
33.4. The chrome is written once, in subsection 33.0, and the three page
subsections below it hold nothing but placement and the source rect each
width prints. A page may not invent its own credit form: a credit that
reads three ways on three pages is three claims rather than one register.

The rule, binding:

- **A real photograph or published data product takes NONE of the three
  honesty chromes.** `.window` would claim it is the product, an
  `Illustrative view` bar would call a published picture drawn, and
  `.sheet` would call it an illustrative document. It takes what this
  system gives every photograph on a light ground instead: a `--line-2`
  hairline over the plate ground, because an image separates itself here
  with a rule and never with a shadow.
- **Two lines under it and no more.** `.tex-cap` names the SUBJECT in the
  site's figcaption voice, the register `.win-cap` already sets for a
  product plate (mono, uppercase, `--fs-meta`, .14em, `--ink-dim`). It
  states a fact about what the picture shows and carries no checker
  marker, because that marker belongs to figures of Mission Grey's own
  work. `.tex-cred` under it is the SOURCE, quieter by dropping the
  uppercase and most of the tracking rather than by going dimmer than
  `--ink-dim`, which is this system's floor for text. It is not
  uppercased because it is a name and an institution printed as the
  register requires them, and shouting a source is not crediting it.
- **No accent, and no date.** Amber means active, changed, selected or
  decision point on this site, and a credit is none of those. Acquisition
  dates, licences, full credit lines and source URLs live in `CREDITS.md`
  at the repo ROOT, beside `README.md`, which the build does not copy:
  the register is a repo document and never a published page.
- **The file is prepared once, not by CSS**, and geometry is never
  touched: one crop, no compositing, no overlay, nothing added to or
  taken out of the picture. Desaturated and contrast lifted to sit in the
  grey palette, with the white point held just under the page ground so a
  documentary frame never prints brighter than the paper it sits on. Each
  file carries its full credit in its own metadata.
- **The alt text describes the real image, not the subject's
  significance.** A reader who cannot see it gets the picture, not an
  argument about it.
- **The phone gets a different rect, never a smaller plate**, for the
  reason the product plates already do. Every rect is stated in SOURCE
  PIXELS in the stylesheet comment, and the declaration next to it
  computes to exactly those numbers.

Markup, all three:

```html
<figure class="tex-fig hs-tex">
  <div class="hs-tex-plate"><img src="..." alt="..." loading="lazy"></div>
  <figcaption class="tex-cap">Subject line<span class="tex-cred">Source</span></figcaption>
</figure>
```

About's figure has no cropping div because no rect is cut at any width;
the edge goes on its `img` instead. That is the only structural
difference, and 33.0 covers both.

#### Home texture (33.1)

`suez-ship-backlog-landsat.jpg`, about a hundred cargo ships and tankers
at anchor in the Gulf of Suez while the canal was blocked, from Landsat,
public domain. It sits in `#outside` beside "The cost is often not
ignorance. It is delay.", because that is the sentence it is evidence
for: a queue is what delay looks like from orbit. Not a hero background,
not a section break, not a texture behind type. The reading hangs on the
left of the block and the plate runs off the right page edge, using the
same expression the hero's scope uses, so the page's two bleeds register
with each other; a bled plate keeps three edges and drops the fourth,
because the fourth is the page. Its place in the page grid is in 30.9.

**Crop.** The file is one 1800x750 rectangle of the source (x 180 to
1980, y 900 to 1650) at full resolution, grayscale, contrast lifted,
quality 82, 115KB. Under 700px the plate is a window on source x 300 to
1380, y 105 to 645 of that file at the same printed scale, which keeps
the ships and both shores: an 1800px satellite frame printed 366px wide
is texture, and a hundred ships stop being countable.

#### Platform texture (33.2)

`iberian-blackout-black-marble.jpg`, a NASA Black Marble nighttime-lights
map of Andalusia on the night of the Iberian peninsula blackout, in
`#breadth` beside the head "External change arrives on four levels." It
is a **data product rather than a photograph**, which is the honest
texture for a page about what a platform emits, and it is a real,
published, citable artefact, which is what separates it from the
fabricated evidence brief 11 forbids. It is context for the words beside
it and it is never a hero or a wallpaper. Its column is set in 31.1.

**Crop.** The file is the published frame resized 2871x1914 to 1800x1200,
grayscale, sigmoidal contrast (5, 18 percent), quality 80, 104KB, with no
crop into the file at all. The page shows source y 330 to 1080 at the
frame's own full width on the wide layout (`aspect-ratio:12/5`,
`top:-44%`), and source y 188 to 1200 under 1101px
(`aspect-ratio:1800/1012`, `top:-18.577%`), where the plate has the
column to itself. Both declarations compute to exactly those top rows;
the narrow one used to say 188 and compute 182, which is the kind of
drift a stated crop exists to prevent. One caveat, true of every edged
plate on this site and stated once in 33.2: `aspect-ratio` sizes the
BORDER box, so the plate's own 1px hairline takes the outermost source
row or two at each edge (two rows at 1000px, six at 390). A stated rect
is the image geometry; the hairline is chrome sitting on it. The rect
opens up rather than the plate scaling down, for the same reason every
phone crop on this site changes rather than shrinks.

#### About texture (33.3)

`singapore-malacca-night.jpg`, Singapore and southern Johor at night from
the International Space Station, two countries and the strait between
them in one frame. It is the brief's "global city at night" answered
without being literal, since from orbit a city is a lattice rather than a
skyline, and it takes the empty right half of the "Where we are" section
head, above the west-to-east register (32.5 records the placement
argument).

**Crop.** Cropped to 3100x2325 of the 3601x3001 original (black margin
off three sides, geometry untouched), grayscale, contrast lifted
(`-level 0%,40% -gamma 1.12`), resized to 1600x1200 at quality 78, 316KB.
No rect is cut by CSS at any width: this plate prints the whole file
everywhere, which is why its `img` carries the edge. At 1440 it measures
490px. Under 981px it stacks below the heading it belongs to and stops at
560px, because it is only worth printing while the lattice, the strait
and the anchorage can each be told apart; at 390 it prints 342px wide,
which is the narrowest width at which that still holds.

### The fix pass (2026-09-20, after review)

A correction round over the four merged area builds. Nothing here is new
design; each item is a defect the review or the critique measured, and
each one is recorded where the rule it corrects lives.

| Fix | Where | What was wrong |
|---|---|---|
| Subject lines | `.tex-cap` on all three plates | three documentary plates carried a source and no statement of what they show |
| One credit chrome | 33.0 replaces `.hs-tex-cred`, `.pf-cred`, `.ag-cred` | three pages argued three different credit forms for one register |
| Credit register moved | `CREDITS.md` at the repo root | it sat in `assets/texture/`, inside the published tree |
| Solutions quiet ink | 30.6 | the quiet stages' sentence was overridden to `--ink-mute`, the ink the LIVE stage already carries, so the state said nothing. Measured at 1440 hovering stage 02: every `.v` read rgb(84,92,103); it now reads rgb(98,107,119) quiet against rgb(84,92,103) live |
| Platform phone rects | 31.2b | the monitoring crop at 390 showed a star field and a column of empty checkboxes and no globe; the report crop cut every line of the executive summary mid-word |
| Two half-empty folds | 32.1 (About), 29.7 (Use cases) | a full-width rule with an empty half under it, and a hero occupying one column of two |
| Header button on a phone | 29.6 | 161px of amber in a 390px bar, directly above the hero's identical amber button |

Three notes worth carrying forward:

- **A rule that re-declares the value underneath it is not a refinement,
  it is a rule that hides the one beneath.** Solutions 30.6 restated the
  live-stage ink verbatim and moved the quiet ink onto it; the figure kept
  working and stopped meaning anything. Re-declaring a pair for source
  order is legitimate, but then only ONE of the two values may move, and
  the comment has to say which.
- **A stated crop is a claim and gets checked like one.** Two of the
  round's rects described something the reader could not see, and one
  stated numbers its own declaration missed by six rows. State the rect in
  source pixels, then read the computed geometry back off the page.
- **Three marks of one sequence role count as ONE accent.** The gloss
  lives under "Amber is the sequence" in the first engagement's
  subsection, and the accent law near the top of this file now points at
  it, because a reader who meets the ceiling first should not have to
  find the exception five hundred lines later.

## Round twelve (2026-09-20): the commercial extension, sections 34 to 35

### Solutions (section 34, `cl-` and `om-`)

One commercial addition, not a pass over the page. Solutions keeps every
section, every figure, every word and every interaction it had; what is
new is one section between the adoption path and "Daily use", carrying
the process that runs after a recommendation and the operating model and
workshop around it. Nothing in sections 01 to 33 was edited, the ladder
and the rhythm tokens are read from 29 and 30 rather than redeclared,
and the page's `data-density="clean"` register is untouched. Two strings
inside the existing page changed, both named below.

#### One section, not two

The new material is four arguments (the closed loop, organizational
memory, the operating model, the two ways in) and it is ONE `<section>`,
opening on one chapter rule and one `h2`, with the operating model
opening on the section's own second hairline under an `h3`. Two sections
would have read as two chapters and, more practically, would have put a
second tinted band against "Daily use": the page alternates plain and
`sec-alt` bands, `#functions` is the alt band that follows, and two alt
bands in a row are one long band with a 2px seam in it. The section
takes `.8` of the page's section padding at the top, because it opens on
a chapter rule under the closing line of the section before it rather
than on a fold.

#### The loop is horizontal, and the reason is the page it sits on

Seven stations hang from ONE horizontal rule, read left to right, with
the return arm running back underneath. The alternative the brief
offered, a `.rail` spine with the return bracketed back up it, was
rejected on two counts. The page already spends a rail on the worked
impact chain in `#practice`, and a second rail two sections above it
makes the two diagrams one texture rather than two arguments. And a
seven-row spine is 500px of column before the return even starts, which
turns a process a reader should take in at a glance into something they
scroll. The horizontal rule also states the thing the spec cares about
most, that the chain CONTINUES past the decision, in the direction a
reader already reads.

**No arrow glyph, and no connector between stations, binding.** The rule
is continuous because each station's own `border-top` spans its whole
column and the separation is padding, never gap, which is the lesson the
cadence ledger records in section 19 and the first engagement repeats in
30.5. Direction is carried by the index, as on every other figure here.

**The return arm has two different ends, binding.** A bracket whose two
ends are identical is a box drawn under a diagram. The leaving end at
station 07 is a short riser; the rising end at station 01 is taller and
carries a 14px cap turning right into the chain, which is the leader
device section 23 already uses on the example application. That
asymmetry is the whole direction cue: an arrowhead here would be the
flowchart clip art the visual direction rules out by name. The arm spans
the row and stops at `14.286%` from the right, which is the left edge of
the seventh of seven equal columns, so both ends land on the station
marks they belong to rather than near them.

**One accent, and its role in this component is STATE.** At rest the
figure carries exactly one, the entry station, the way the adoption path
carries one at its own station 01. Under a pointer the accent moves to
the station being read and station 01 stands down unless it is the one
being read. Measured at 1440 with hover forced on
(`--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4`,
without which headless Chromium reports `(hover:hover)` false and the
whole block is inert): at rest station 01's mark is `rgb(138,87,16)` at
2 by 12 and station 07's is `rgba(15,23,32,.34)` at 1 by 8; with station
07 hovered those swap and the return arm's borders go to `rgb(23,26,32)`;
with station 01 hovered it keeps the accent and nothing else takes it.
Exactly one station is lit at any time.

**The ownership node at station 05, binding.** Station 05 is the only
station drawn with a node rather than a tick: 6px of solid `--ink-mute`
centred on the rule where the other six carry a 1px hairline. Naming who
responds is the step a process usually leaves implicit, so it is the one
station that is visible before it is read. It is INK and never a second
accent, and it is filled rather than an open square with the page ground
inside it, so the mark does not depend on the band it is printed on. The
`.evi` row states it in words, `Owner · Named at station 05`, which is a
thing this figure actually draws: round nine's rule against annotations
that promise an absent feature is what that line is written against.

**No station is a control, and that is a decision rather than an
omission.** The spec allows an interaction and this figure takes the
smallest honest one: a hover state, declared inside `(hover:hover)` for
the reason section 28 records, that adds emphasis and hides nothing.
Every station, every question and the return arm are legible at rest, so
a reader on a keyboard and a reader who never hovers lose nothing. The
adoption path's station labels are `<button>`s because they SELECT one of
three stages in a figure that reads differently per stage; seven buttons
whose only effect is to light themselves would be seven tab stops with
nothing behind them, which is the noise round ten ruled against when it
refused a disclosure control on a plate. Hovering REVIEW lights the
return arm, which is the one relationship in the chain a reader cannot
infer from the order.

**The hover pair is written one class ahead, not one line later.** The
stand-down rule (`.cl-row:has(.cl-st:hover) .cl-s1 .cl-k::before`) and
the live rule are the same specificity as written, so the live ones are
prefixed `.frame.cl-loop` to put them one class ahead. This is section
28's trap, recorded there and checked here: at equal specificity source
order decides, and a pair that relies on source order breaks the first
time somebody re-declares half of it.

#### Organizational memory is small on purpose

One claim in the statement register (`.net-lede`, the system's own class)
and three sentences beside it, on the hairline that closes the figure, in
the `.so-app` proportion because it is the same kind of object: one claim
and the analytical column that supports it. It is deliberately the
shortest block in the section. The chain above is the argument; this says
what keeping it is worth, and the failure mode the spec names (compliance
software, ticketing, an audit trail) is reached by saying it at four
times the length and calling the record a system of record. The last
sentence, "What it produces is organizational learning rather than an
archive", is the boundary stated once in the page's own voice.

#### The operating model is a register read across, not six cards

Six elements, each a label and the question it answers, as a two-column
ruled register: three rows, the cells sharing one continuous rule per row
because the separation is padding and never gap, each carrying the
station tick the two registers lower down this page already carry. Six
hairline cells in a grid would be a card run, which the spec rules out by
name. Reading order is row major and matches the DOM. Under 901px it is
one column; under 561px the label sits above its question, the same
collapse the `.roles` register on this page already makes.

**The workshop takes the annotation form, not a panel.** Label left, the
offer and its outputs right, on one hairline: the shape `.fe-timing`
already uses above it, because this is information about an engagement
rather than a second product. The seven outputs take the page's checker
list in two columns at 601px and up, with four rows and column flow, so
they read DOWN the first column and then down the second; a two-column
grid in row order prints them 1 4 2 5 3 6 7 down the page, which is a
list a reader has to reassemble.

**The two ways in are two doors on ONE rule, binding.** Not two entry
paths: the same implementation, entered from the side the organization
is standing on, with the convergence stated in one line under them in the
closing-line register this page already uses three times. Door A links to
`#start`, which is the step it names. **Door B carries no link**, because
the workshop it names is the block directly above it and a link that
scrolls a reader 250px back up the page is a control that undoes their
last scroll. If the workshop ever becomes a request of its own, that is
the door's link and it is a chairman's call, not a builder's. Neither
door carries an accent: an alternative is not a sequence and not a state,
which are the only two things amber means here.

#### The two strings that changed inside the existing page

**Stage 03 of the adoption path gains one checker line**, "Decision
ownership, actions and review, kept as organizational memory". The
lattice, the runs, the station rule, the accent and the whole round-ten
interaction are untouched; the stage's list goes from three lines to
four, and the frame grows 55px at 1440 (624 to 679) and about the same at
390. That is the spec's "light reference" and nothing else in the figure
was reopened.

**The page description now names the loop**, in all three places that
carry it (`description`, `og:description`, `twitter:description`): the
clause "make it part of the organization" becomes "make it part of how
the organization decides, acts and reviews". Same sentence, same length
class, and the summary now says what the page's last third is about.

#### Measured, at 1440 and at 390

| | Before | After |
|---|---|---|
| page height at 1440 | 7254 | **9477** (+30.6%) |
| page height at 390 | 9945 | **13372** (+34.5%) |
| the new section at 1440 | n/a | 2168 |
| the new section at 390 | n/a | 3371 |
| the loop figure at 1440 | n/a | 379 |
| the loop figure at 390 | n/a | 935 |
| adoption figure at 1440 | 624 | 679 |
| `scrollWidth` at 390 | 390 | **390** |

The page is a third longer and every pixel of it is new argument: the
section is 2168 of the 2223 added at 1440, and the adoption figure's
extra bullet is the other 55. No page scrolls horizontally at 390, the
figure stacks into seven stations with the return drawn as a bracket up
the outside of the run, and nothing in the section is hidden at any
width. Solutions is still the shortest of the three main pages at 1440,
against Home at 11342 and Platform at 12849 measured in the same pass.

#### A finding, and it is not this section's to fix

**The statement voice is documented as serif and is set in sans.**
"The type ladder is three faces, binding" above says `.net-lede`,
`.principle`, `.quote-main blockquote` and `.statement` take Source Serif
4, and the comment on the rule that sets them says so too, but the rule
itself sets `font-family:var(--sans)` and that is what every page renders:
the memory claim added here prints in Inter 600 like the three statement
blocks already on this page. The class was reused as the system defines
it, so this section inherits whichever face the ruling ends on. The two
available fixes both move something that is marked binding, so it is a
chairman's call, not a builder's.

#### Not done, deliberately

- **No JavaScript, and no new `.reveal` mechanism.** The section uses the
  existing observer through the `.reveal` class and nothing else; the
  page's script block is byte for byte unchanged. With JS off the whole
  section prints, and under `prefers-reduced-motion` the hover state
  arrives instantly rather than not at all, which is section 28's own
  rule for the figure above it.
- **The hero dek, the `.ladder-foot` under `#start` and the Access panel
  are untouched.** Each was checked against the second door and none of
  them needed a clause to carry it: the doors name themselves where they
  stand, and the Access panel's "Tell us the decision in front of you"
  still answers both of them.
- **No pricing, no separate service page, no second figure for the
  operating model.** The six elements are a register because a second
  drawn diagram in one section would have made the loop one of two
  figures rather than the one the section is about.
- **The adoption path was not reopened** beyond its one new line, and the
  first engagement, the worked chain, the two ruled indexes, the example
  application and the quotes are exactly as rounds ten and eleven left
  them.

### Platform and Home (section 35, pl5- and hv5-)

The round's two supporting pages. Solutions carries the commercial story
in full (section 34); Platform gets one small element at the foot of the
capability walk, Home gets one line of copy, and that is the whole of the
addition here. No new section, no new diagram, no new page and no new
device on either. Nothing in sections 01 to 34 was edited, no token was
redeclared, and the round-ten rail in section 27 was not touched.

**What is new, word for word.** Platform gains four labels and one
sentence: `Decide &middot; Act`, `Owner`, `Action`, `Review`, and
"Mission Grey can retain the connection between signal, analysis,
decision, owner, action and follow-up." Home gains one sentence inside a
paragraph it already had: "That layer can keep the chain from external
change to decision, owner, action and review." Nothing else on either
page changed: no word was removed, reworded or reordered, no image, crop,
caption, `alt` or `aria-label` moved, and the four stage texts, plates,
captions and INPUT/OUTPUT pairs of the walk are exactly as section 31
left them.

#### The note that closes the walk, and the shape it is not (35.1)

Two shapes were open: extend the walk itself to MONITOR, ANALYZE,
SCENARIO, DECIDE, ACT, REVIEW as one station line with a return loop, or
keep the four stages and close the section with a compact note for what
the decision hands over. **The note is the one built, for three reasons that
are already law in this file.**

1. **The page prints one set of stage words, and the rail is where they
   live.** With JS the four moments' own station lines are lifted onto one
   rule (sections 22 and 27) precisely so that nothing invents a second
   set. A six-station line under that rail would print MONITOR, ANALYZE,
   DECIDE and ACT twice inside one screen, once as a control and once as a
   picture, which is the failure the one-diagram-one-direction rule
   exists to stop.
2. **The station-run device is already spent on this page.** `.trail`
   (device A) is at most one per page, and Platform's instance is the
   seven-station intelligence trail on `#engine`. A second seven-station
   run two screens above it is decoration.
3. **A return loop here would return to nothing.** REVIEW closes back onto
   monitoring, and on this page monitoring is a tab in the rail above, not
   a station on the same rule. A line drawn back to an element that is not
   printed beside it is notation for its own sake, which is the same
   ruling section 27 made when it declined to link the trail's stations to
   the walk moments a screen above. The loop belongs to the Solutions
   figure; here it is a sentence.

**The note is a note, never a second walk, binding.** It names the two
stages it follows from once, above the rule, as the place it starts from,
and carries three stations that the page has not printed before: Owner,
Action, Review. It adds no stage word to the walk and takes none away.

**The relationship is drawn as a line.** A 1px hairline (`--line-2`, 30px
at 1440) drops from the label and lands on the first station's tick. No
arrow glyph: the rail, the lens, the aperture and both chains on this
page draw every connection the same way.

**Amber is the last station of the run, and that is the component's one
accent role.** Review takes the accent tick (2px by 12px) and reading
ink; Owner and Action take `--line-3` ticks at 1px by 8px and label ink.
That is `.trail`'s own resting grammar, not a new one. The rail above
spends its accent on the SELECTED station and this note spends its accent
on the terminal one: two components, one role each, which is what the
accent ceiling asks for.

**The rule belongs to the stations and ends on Review, binding.** Each
station draws its own top hairline across its own extent, the separation
is padding rather than gap so the three abut into one line, and the last
station drops its trailing padding, so the rule and the word REVIEW end
on the same x. Measured: the rule's right edge and the REVIEW label's
right edge are both 376 at 1440, 287 at 1280, 231 at 1024, 224 at 902 and
210 at 600. The sentence beside the stations takes no rule of its own;
it is the note's reading, not a fourth station. Above 901px the station
run is a `max-content` grid track with the row packed to the start, so
the reading sits beside the run rather than at the far side of the page;
an `auto` track absorbs the leftover space and put 380px between Review
and the sentence that explains it.

**Where it sits, and the rule that placed it.** The note is the last
element of `#walk`, under the worked chain, whose own last stations are
05 Action and 06 Value. **A block's neighbours on this page are the ones
on SCREEN, not the ones in the source**, because the rail collapses the
four moments to one view: with JS on, the block above anything placed
after the fourth moment is whichever moment is selected, which at rest is
the globe captioned "the monitoring screen". A note headed DECIDE
&middot; ACT under a monitoring plate is words contradicting the picture
touching them. Under the chain there is one neighbour in both modes and
it is the right one, so the note reads as what a decision hands over once
the worked example has run.
Verified with JS on: `.px-walk` does not contain `.pl5-hand`, the rail
still builds four tabs with `aria-selected` and a roving `tabindex`,
ArrowRight still moves the selection to view 02, and a scrolling capture
shows the chain frame directly above the note at 1440, 1280, 1024, 902,
760 and 600 and at 390. With JS off all four moments print in full, the
rail does not exist, and the note prints in exactly the same place. It
carries no control, no state and no transition of its own, so
`prefers-reduced-motion` has nothing to switch off in it.

**The two placements that were not taken.** Between the fourth moment and
the delivery exhibits, which is where the note first shipped and which
the rail turns into "under the monitoring plate" (above); and after
`.pl-deliv`, which would separate the note from the chain by the report
and the daily brief, two exhibits about how work leaves the platform.
One placement, and it is the one the reader arrives at with the decision
already made.

#### Home: one line, and no rule to go with it (35.2)

The line joins the second paragraph of `.hs-read` in `#shared`, directly
before "The architectural difference, in full", which is the seam where
the page hands the reader to Platform. It is a clause of the argument
around it rather than a third paragraph, because the paragraph it joins
is already the page's statement of what the layer adds and a one-sentence
paragraph under it would be a coda the section did not ask for.

**It is declarative and it is hedged, on purpose.** The source line reads
"Keep the chain from external change to decision, owner, action and
review." The reading column around it is declarative third person
throughout, and an imperative dropped into it changes voice mid-column;
"That layer can keep" keeps the wording, names its subject and states a
capability rather than an instruction. The modal is the claims law
working as intended: soften, never upgrade.

**`hv5-` is reserved and deliberately unused.** The line needs no class,
no wrapper and no declaration, and a rule written to fill a subsection
number is a rule with nothing to do. 35.2 in the stylesheet is a comment
that says so.

#### Measured, at 1440 and at 390

Measured on the merged tree, after the fix pass below.

| | 1440 before | 1440 after | 390 before | 390 after |
|---|---|---|---|---|
| Platform page | 12849 | **13002** (+1.2%) | 19380 | **19562** (+0.9%) |
| Home page | 11347 | **11374** (+0.2%) | 14132 | **14185** (+0.4%) |
| Home `#shared` | 631 | **657** | 838 | **891** |
| the note itself | n/a | **101** | n/a | **149** |

Platform pays 153px at 1440 for the note and the one run of ground above
it, and the note itself is 101px of that. It closes its section, so it
spends nothing below: the section's own padding is the air under it,
which is why this is cheaper than the first cut at 188px. Home is 27px
longer at 1440 and 53px at 390, which is one line of the reading column
at the wide width and two on the phone. `scrollWidth` equals the viewport
on both pages at 390, measured through a 390px iframe inside a wider
window as the method note above requires.

**The before figures are the same tree with `.pl5-hand` removed from the
DOM and the layout read back**, which is the only way to price a block
against a tree that cannot be reverted. Both readings come from the same
browser build: chromium and chrome-headless-shell do not agree to the
pixel on a page this long (20px at 1440, 134px at 390 on Platform), so a
before and an after captured with different binaries is not a delta.
Stated once here because every number in this subsection depends on it.

#### Not done, deliberately

- **The six-station line and its return loop** (above). It is the
  Solutions figure's job, and repeating the same process on every page is
  the thing the round is told not to do.
- **No state on the three stations.** Nothing in the note is selectable,
  and motion on a block a reader is reading is motion without meaning.
  The page's interactive figures are the rail and the trail, both of which
  answer a question a reader can ask; this note answers one it has just
  been asked.
- **No second line on Home**, and no diagram there. The page already runs
  the pipeline, the aperture, the recipe, the daily steps and the role
  views; the addition is a clause, not a figure.
- **The chain (`.chain-list`) is untouched**, including its six items and
  its ending on Value. It is a worked example and it was already correct.
- **No new chrome, no new colour, no new dependency, no new asset.**

#### The fix pass (2026-09-20, after review)

Two defects, both found by rendering the page and scrolling it rather
than by reading the markup.

| Fix | What was wrong |
|---|---|
| The note moved from after the fourth moment to the foot of `#walk`, under the worked chain | with the rail active the four moments are one view, so the block above the note was the selected moment, and at rest that is the globe captioned "the monitoring screen". `DECIDE &middot; ACT` printed directly under a monitoring plate: source adjacency is not screen adjacency, and the note has to be placed where a reader meets it |
| The hairline moved from the row to the three stations | it ran about 600px past REVIEW at 1440 and ended in air under the sentence. The rule now stops on the last label, and the reading beside it carries no rule |

A third thing came out of the same look: an `auto` grid track absorbs the
leftover space, which had put 380px between Review and the sentence that
explains it once the row stopped being `fit-content`. The track is
`max-content` and the row is packed to the start.

**Not this section's to fix, recorded here because the walk found it.**
Between 981px and about 1080px the page scrolls horizontally by 14px, and
the overflow is `.site-head .head-right` with its primary button, which is
chassis and identical with the note removed (`scrollWidth` 1038 either
way at 1024). It is on every page, not this one.
