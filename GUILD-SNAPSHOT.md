# Guild Weak-Signal Snapshot: producing the next month

One folder per edition: August 2026 is `site/guild/snapshot/2026-08/index.html`,
served at `/guild/snapshot/2026-08/`. `site/guild/snapshot/snapshot.css` is
shared by every edition and carries the recurring identity (palette, type
scale, section scaffold, print rules). Editions replace text; they do not
restyle.

1. Copy `site/guild/snapshot/2026-08/index.html` to
   `site/guild/snapshot/<year>-<month>/index.html`. Keep that depth: the asset
   and font paths are checked against it by `deploy/build.sh`.
2. Replace the thirteen blocks marked `EDITION` in the page. They appear in
   this order, and the comment above each one names it:
   1. masthead: analysis and publication months
   2. masthead: title, two lines, never joined by a dash
   3. masthead: descriptor
   4. masthead: evidence line
   5. core conclusion
   6. evidence: the two charts and the caption beneath them
   7. five signals
   8. monitoring baskets
   9. design rule
   10. the bigger signal
   11. Guild context (standing copy: it rarely changes, but it is an edition
       block like the rest)
   12. methodology note
   13. footer links
   Update the `<title>`, description, canonical URL and the `og:` pair too.
3. Bar widths are inline `--w` values: reach as a share of respondents,
   connections as a share of the strongest pair. The reach list prints the
   share of respondents as a whole-number percent and nothing else beside
   the bar (Jouko, 2026-09-16: percentages only, no base line); the
   connections list keeps its counts. Keep respondent reach and answer
   incidence labelled apart in the caption.
4. Footer links are block 13. `CONFIG SITE_URL` is live. `CONFIG REPORT_URL`
   is the second link, commented out until the full analysis has a public
   address: put that address in its empty `href` and remove the two comment
   markers. The build rejects an `href` that resolves to nothing, so the
   placeholder is an empty value rather than `#`.
5. Build with `deploy/build.sh` and print the page to A4. The body carries
   `class="two-page"`, so the print export is the two-page sheet described
   below: that is the standard for the series (Jouko, 2026-09-16).

## The one-page ceiling

Without the `two-page` class on `<body>`, the sheet is sized to fill exactly
one A4 page. On this edition the printed
content measures 1043 css px against a 1054 px text box at `--pf:.89`: eleven
pixels of slack, with supporting text at 6.2pt. That is the ceiling, not a
setting with room in it. `--pf:.90` still measures inside the box but already
prints two pages, because the blocks that carry `break-inside:avoid` need
whole-block room, so keep at least ten pixels of measured slack.

`--pf` scales the whole sheet from one number and is there to absorb a
slightly shorter edition, not a longer one. **A longer edition cuts copy.**
Raising `--pf` to reach a comfortable reading size does not fit: the mandated
content of this edition needs about one and a half A4 pages at 8.5pt.

## Two-page sheet (the series standard)

The August 2026 edition ships with `class="two-page"` on `<body>`, so
printing the page as served gives the two-page sheet. To produce the
one-page ceiling sheet instead, remove the class and print:

    sed 's|^<body class="two-page">|<body>|' index.html > one-page.html

The two-page rules are a block at the end of `snapshot.css` inside `@media print`.
It keeps this layout, takes the reading sizes (supporting text 8.5pt,
methodology note 7.9pt), opens the spacing back up and breaks the page before
the indicators section, so page one runs masthead to the five signals and page
two carries the indicators, the design rule, the bigger signal, the Guild and
the note. The one-page print rules stay in the stylesheet for a shorter
edition that fits one sheet.
