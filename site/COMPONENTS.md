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
  `/contact/`. Book a demo goes to
  `https://calendly.com/lauri-missiongrey/30min`.
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
<a class="btn btn-ghost" href="...">Book a demo</a>
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
