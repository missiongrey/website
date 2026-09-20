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

**The fold is set, not drawn.** Title at a 20ch measure across the left
two thirds, then one hairline with the dek hanging from its right half and
a tick at the head of that column. The left half under the rule stays
empty on purpose. A second globe, or any instrument, would make About read
as Home with different words; the page's job at the fold is a masthead.

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

#### Not done, deliberately

The h3 sizes inside registers (above), the compositions themselves (the
page builders own those in sections 30 to 33), and the `.principle`,
`.arc-q` and `.agents-copy h3` clamps, which already sit inside L3's
range. Nothing in sections 01 to 28 was edited.

### Home and Solutions (section 30)

(written by the home and solutions builder)

### Platform (section 31)

(written by the platform builder)

### About and Guild (section 32)

(written by the people builder)

### Real-world texture (section 33)

(one paragraph per page builder, plus the asset register in assets/texture/CREDITS.md)
