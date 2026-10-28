# missiongrey.com

Source for the public Mission Grey website. Hand written static HTML and
one stylesheet, built by a bash script and published by AWS Amplify Hosting
on the apex domain `missiongrey.com`.

There is no framework, no package manager and no build toolchain. If you can
edit HTML you can edit this site.

## Tree

```
site/                  the pages, one directory per URL
  index.html           /
  404.html             served by Pages for any address that does not resolve
  <section>/index.html /platform/, /solutions/, /about/, /privacy/, ...
  insights/<slug>/     one directory per article
  styles.css           the whole design system, tokens included
  COMPONENTS.md        how to build a page that stays on register.
                       Read it before adding markup. It is a build doc and
                       is not published.
assets/                images, favicons, consent.js
fonts/                 self hosted woff2 files, referenced from styles.css
newsletters/           Guild newsletter PDFs, published as /newsletters/*.pdf
deploy/build.sh        production build, writes deploy/prod/
deploy/stage.sh        preview build under the /new/ prefix, writes deploy/stage/
CREDITS.md             sources, licences and credits for the documentary
                       imagery in assets/texture/. A repo doc: it sits here
                       rather than beside the files so the build never
                       publishes it.
```

`deploy/prod/` and `deploy/stage/` are build output. They are ignored by git
and are rebuilt from scratch every time.

### Path convention

Links between pages are root relative with a trailing slash
(`href="/platform/"`). Images, fonts and scripts are referenced relative to
the page, one `../` per directory level: the home page uses `../assets/`, a
section page uses `../../assets/`, an article uses `../../../assets/`. The
build strips one level from each of those so that `assets/` and `fonts/` end
up at the web root. Write the relative form and the build handles the rest.

## Edit and publish

1. Edit under `site/` (or `assets/`).
2. Push to `main`.
3. AWS Amplify (app `website`, the MG AWS account) runs `deploy/build.sh`
   and publishes `deploy/prod/`. It takes about two minutes; progress is in
   the Amplify console.

The build fails, and nothing is published, if any internal link or asset
reference does not resolve, if the page count does not match the sitemap, or
if the consent script is missing from a page. A red build in Amplify means
the site you are looking at is still the previous one.

## Preview locally

```bash
deploy/build.sh
python3 -m http.server 8080 --directory deploy/prod
# then open http://localhost:8080/
```

That serves exactly the tree that gets published. The one difference is the
404 page: `http.server` shows its own error page instead of `404.html`.

## Analytics

The site counts its own visitors. There is no Google Analytics, no tag
manager and no third-party script; nothing is sent to anyone but Mission
Grey's own platform.

- `assets/consent.js`, loaded by every page, sends two small beacons per
  page view to the platform's collector,
  `https://app.missiongrey.com/insights/hit/`: one when the page opens and
  one when it is left or hidden, carrying the time it was visible. The
  figures appear in the platform under Customer Insights, Website
  (`/internal/insights/website/`, staff and internal accounts).
- Every visitor is counted without cookies: the collector forms a visitor
  code that changes every day, and nothing is stored on the device.
- On the first visit a banner asks whether Mission Grey may set its own
  cookie, with equal Accept and Decline buttons. After Accept the script
  keeps a random reader id in the host-only cookie `mg_vid`, so returning
  readers can be told from new ones. The choice itself lives in
  `mg_consent` (`accepted` or `declined`). Both last 13 months and are
  re-written on every page load (Safari keeps a script-written cookie for 7
  days otherwise). "Cookie settings" in the footer's legal row reopens the
  banner on every page.
- The script only sends from `missiongrey.com` and `www.missiongrey.com`.
  On any other host (a local build, a preview) the banner and the cookies
  work, and each beacon is written to the browser console instead of being
  sent.
- `www.missiongrey.com` is counted the cookieless way only, with no banner
  and no cookie: a host-only cookie would give one reader two ids. Once www
  redirects to the apex in the Amplify console that case stops occurring.
- The beacon format is defined by the collector, in the platform
  repository's `insights/collector.py`. Change the two together.
- The privacy policy describes all of this in section 3, Activity Logging
  and Cookies. If the analytics setup changes, that section changes with
  it.

## DNS

Served by AWS Amplify Hosting (CloudFront distribution
`dsj57wmc1tos1.cloudfront.net`). DNS lives at joker.com; the zone is
DNSSEC signed, and joker's ALIAS record type is incompatible with that
signing (it produced malformed signatures and validating resolvers
refused the whole name, 2026-08-23). The apex therefore pins the
distribution's resolved IPs as plain A records:

| Type | Name | Value |
|---|---|---|
| A | `missiongrey.com` | `3.174.113.27` (TTL 300) |
| A | `missiongrey.com` | `3.174.113.19` (TTL 300) |
| A | `missiongrey.com` | `3.174.113.52` (TTL 300) |
| A | `missiongrey.com` | `3.174.113.60` (TTL 300) |
| CNAME | `www` | `dsj57wmc1tos1.cloudfront.net` |
| CNAME | `_5d9bf7...` | ACM certificate validation, do not remove |

If the site stops answering, first check whether CloudFront moved off the
pinned IPs: resolve `dsj57wmc1tos1.cloudfront.net` and update the four A
records to what it returns. The durable fix is moving the zone to a DNS
host with working apex aliases (planned).

## Newsletter PDFs

`newsletters/*.pdf` are copied to the web root as
`https://missiongrey.com/newsletters/<file>.pdf`. Those addresses are handed
out by mail and by the Guild, so the filenames must not change. The archive
cards in `/insights/#newsletters` link the previous editions from the same
addresses. The latest edition is deliberately not linked: it is requested by
mail through the contact page.

The directory also holds the Guild Weak-Signal Snapshot series
(`guild-weak-signal-snapshot-<month>-<year>.pdf`, from August 2026). Those
are not newsletter issues: each one is attached to its own Insights article
and is a direct download there, with the article's cover rendered from the
PDF's page 1 into `assets/articles/`. The newsletter rotation below does not
apply to them.

Each edition also has a cover image under
`assets/newsletters/<file>-cover.jpg`, a render of page 1 of the PDF with the
white page margin trimmed off. There are two sizes, and which one an edition
needs depends on where it sits: the latest edition is the large cover in the
frame (640px wide source, 300px rendered), every archived edition is a small
thumbnail (180x240 source, rendered in a fixed 90x120 box). Both are trimmed
the same way, and the thumbnail is then cropped to the box ratio in the
render rather than left to the browser: the archive row shows three
documents of three different shapes, and only a fixed box makes the row read
as a set. See
`site/COMPONENTS.md`, "Newsletter covers", for why the archive covers stay
small and why the box is fixed.

Adding an edition rotates the latest into the archive. The month that was
latest becomes the first archive card, and every past edition stays on the
page (Jouko, 2026-09-06: all newsletters visible, no cap):

1. Drop the PDF into `newsletters/` as `guild-newsletter-<month>-2026.pdf`.
2. Render the new latest cover, large:

   ```bash
   M=guild-newsletter-<month>-2026
   pdftoppm -f 1 -l 1 -r 200 -png -singlefile "newsletters/$M.pdf" /tmp/cover
   magick /tmp/cover.png -fuzz 2% -trim +repage -auto-orient -colorspace sRGB \
     -resize 640x -strip -interlace Plane -sampling-factor 4:2:0 -quality 82 \
     "assets/newsletters/$M-cover.jpg"
   ```

3. Re-render the outgoing latest edition as a thumbnail, overwriting its
   640px file. The crop to the 3:4 box happens here, and `north` keeps the
   masthead rather than centering on the page:

   ```bash
   M=guild-newsletter-<outgoing-month>-2026
   pdftoppm -f 1 -l 1 -r 200 -png -singlefile "newsletters/$M.pdf" /tmp/cover
   magick /tmp/cover.png -fuzz 2% -trim +repage -auto-orient -colorspace sRGB \
     -resize 180x240^ -gravity north -extent 180x240 \
     -strip -interlace Plane -sampling-factor 4:2:0 -quality 84 \
     "assets/newsletters/$M-cover.jpg"
   ```

   Every thumbnail comes out 180x240. If one does not, fix the render rather
   than the markup: the three cards share one fixed box.
4. In `site/insights/index.html`:
   - put the new edition's cover `img` in the `.nl-latest` frame, with the
     new file's real `width`/`height` and an `alt` that describes what the
     cover art shows. The frame holds the cover and nothing else;
   - update the `Latest edition &middot; <Month> <Year>` line and the `h3`
     title in `.nl-ed`, the full-width block under the divider that also
     carries the highlights. Rewrite the five `.nl-hi` rows from the new
     edition. No download link for this month, by design;
   - move the outgoing edition into `.nl-cards` as a new first card. That
     move is not a copy and paste: the archive markup wraps the image in
     `a.nl-thumb` (`aria-hidden="true" tabindex="-1"`), changes the `alt` to
     `alt=""`, sets `width="180" height="240"`, carries the title as an
     `h4`, and adds the `a.nl-dl` download link with its `aria-label`. Copy
     an existing card and edit the month, title and filename;
   - keep every older card. The archive grid is four across and wraps.
5. Run `deploy/build.sh`. It fails if any cover file or PDF path is wrong.
