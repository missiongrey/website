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
ceiling.

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

1. **Real product screenshot** → `.window` with browser chrome and the
   `app.missiongrey.com` url pill. Only actual, unretouched screenshots of
   the shipping product may sit inside a `.window`. The chrome is the
   claim "this is the product"; putting anything else in it is a false
   claim.
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

(builder writes here)

### Guild and the Home Guild section (section 21, `gd-`)

(builder writes here)

### Platform (section 22, `pl-`)

(builder writes here)

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

(builder writes here)
