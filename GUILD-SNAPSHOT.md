# Guild Weak-Signal Snapshot: producing the next month

One folder per edition, named `<year>-<month>`: August 2026 lives in `2026-08/`
and is served at `/guild/snapshot/2026-08/`. `snapshot.css` is shared by every
edition and carries the recurring identity (palette, type scale, section
scaffold, print rules). Editions replace text; they do not restyle.

1. Copy `2026-08/index.html` to `<year>-<month>/index.html`, one level below
   this file, or the asset paths stop resolving.
2. Replace the blocks marked `EDITION`, in the order they appear: masthead
   dates, title (two lines, never joined by a dash), descriptor, evidence line,
   core conclusion, the two evidence panels, the five signals, the six
   monitoring baskets, the design rule, the implication, the methodology note.
   Update the `<title>`, description, canonical URL and the `og:` pair too.
3. Bar widths are inline `--w` values: reach as a share of respondents,
   connections as a share of the strongest pair. Keep the printed count beside
   every bar, and keep respondent reach and answer incidence labelled apart.
4. `CONFIG REPORT_URL` in the footer is a placeholder href: point it at the
   published analysis or leave it inert.
5. Build with `deploy/build.sh`, then print to A4. The sheet is sized to fill
   one page and no more. If an edition runs long or short, retune `--pf` in the
   print block of `snapshot.css`: it scales the whole sheet from one number.
