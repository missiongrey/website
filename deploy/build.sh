#!/usr/bin/env bash
# Build the production tree for missiongrey.com (GitHub Pages, apex domain).
# Sibling of stage.sh: same depth-aware asset rewrite, no URL prefix, plus
# everything the live site needs that the preview does not (CNAME,
# .nojekyll, robots.txt, sitemap.xml, redirect stubs for retired URLs,
# absolute social-image URLs, and the analytics measurement id).
#
#   GA_MEASUREMENT_ID=G-XXXXXXXXXX deploy/build.sh
#
# Without that variable the build leaves the __GA_MEASUREMENT_ID__ token in
# place, which the runtime treats as "analytics off": no banner, no request.
# The script fails non-zero if any self-check below does not hold.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROD="$ROOT/deploy/prod"
DOMAIN="missiongrey.com"
BASE="https://$DOMAIN"

rm -rf "$PROD"
mkdir -p "$PROD"

# 1) Pages: site/** -> prod/**  (COMPONENTS.md is a build doc, not a page)
cp -r "$ROOT/site/." "$PROD/"
rm -f "$PROD/COMPONENTS.md"

# 2) Assets, fonts and the newsletter PDFs live inside the webroot.
#    /newsletters/*.pdf are linked from outside the site (mail, the Guild),
#    so the paths must keep working even though no page links them.
cp -r "$ROOT/assets" "$PROD/assets"
cp -r "$ROOT/fonts"  "$PROD/fonts"
cp -r "$ROOT/newsletters" "$PROD/newsletters"

# 3) /favicon.ico is requested by browsers without being linked.
cp "$ROOT/assets/favicon.ico" "$PROD/favicon.ico"

# 4) Rewrites, sitemap and the redirect stubs.
PROD="$PROD" BASE="$BASE" GA="${GA_MEASUREMENT_ID:-}" python3 - <<'PY'
import os
import re
import sys

PROD = os.environ["PROD"]
BASE = os.environ["BASE"]
GA = os.environ.get("GA", "").strip()
TOKEN = "__GA_MEASUREMENT_ID__"

html_files = []
for dp, _dn, fn in os.walk(PROD):
    if os.path.relpath(dp, PROD).split(os.sep)[0] in ("assets", "fonts", "newsletters"):
        continue
    for f in fn:
        if f.endswith(".html"):
            html_files.append(os.path.join(dp, f))
html_files.sort()

# --- depth-aware asset/font rewrite ------------------------------------
# Source convention: site/index.html refs ../assets/, a one-level page refs
# ../../assets/, an article refs ../../../assets/. In the built tree assets/
# sits at the webroot, one level up from where it sat locally, so every
# ref loses exactly one ../ level. Root-relative hrefs are already right.
REF = re.compile(r'((?:\.\./)+)(assets/|fonts/)')

for path in html_files:
    src = open(path, encoding="utf-8").read()
    src = REF.sub(lambda m: m.group(1)[3:] + m.group(2), src)
    # social images must be absolute for scrapers that do not resolve /paths
    src = re.sub(r'(<meta[^>]+(?:property="og:image"|name="twitter:image")[^>]+content=")/',
                 r"\g<1>" + BASE + "/", src)
    open(path, "w", encoding="utf-8").write(src)

# styles.css now sits beside fonts/ at the webroot
css = os.path.join(PROD, "styles.css")
s = open(css, encoding="utf-8").read()
open(css, "w", encoding="utf-8").write(s.replace("../fonts/", "fonts/"))

# --- 404.html is served at ANY path depth ------------------------------
# GitHub Pages returns /404.html for a miss under /a/b/c/ too, so its own
# refs cannot be relative: they must all resolve from the root.
nf = os.path.join(PROD, "404.html")
s = open(nf, encoding="utf-8").read()
s = re.sub(r'(\b(?:src|href)=")(assets/|fonts/|styles\.css)', r"\1/\2", s)
open(nf, "w", encoding="utf-8").write(s)

# --- sitemap over the real pages ---------------------------------------
def url_for(path):
    rel = os.path.relpath(path, PROD)
    if rel == "index.html":
        return BASE + "/"
    return BASE + "/" + os.path.dirname(rel).replace(os.sep, "/") + "/"

indexable = [p for p in html_files if os.path.relpath(p, PROD) != "404.html"]
urls = sorted(url_for(p) for p in indexable)
with open(os.path.join(PROD, "sitemap.xml"), "w", encoding="utf-8") as fh:
    fh.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    fh.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
    for u in urls:
        fh.write("  <url><loc>%s</loc></url>\n" % u)
    fh.write("</urlset>\n")

# --- redirect stubs for retired old-site URLs --------------------------
# The previous site split Insights into three pages. They now live as
# sections of one page, so the old addresses bounce to the right anchor.
STUBS = {
    "insights/newsletters": ("#newsletters", "the Guild Newsletter section"),
    "insights/podcast": ("#podcast", "the podcast section"),
    "insights/articles": ("#articles", "the articles section"),
}
STUB = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Moved to Insights &middot; Mission Grey</title>
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url={target}">
<link rel="canonical" href="{canonical}">
</head>
<body>
<p>This page has moved to {label} on <a href="{target}">{target}</a>.</p>
</body>
</html>
"""
insights = BASE + "/insights/"
for rel, (anchor, label) in STUBS.items():
    d = os.path.join(PROD, *rel.split("/"))
    os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, "index.html"), "w", encoding="utf-8") as fh:
        fh.write(STUB.format(target=insights + anchor, canonical=insights,
                             label=label))

# --- analytics measurement id ------------------------------------------
if GA and re.fullmatch(r"G-[A-Z0-9]+", GA):
    hits = 0
    for path in html_files:
        s = open(path, encoding="utf-8").read()
        if TOKEN in s:
            open(path, "w", encoding="utf-8").write(s.replace(TOKEN, GA))
            hits += 1
    print("GA measurement id injected into %d pages" % hits)
elif GA:
    print("WARNING: GA_MEASUREMENT_ID=%r is not a G-XXXXXXXX measurement id. "
          "Token left in place, analytics stays off." % GA, file=sys.stderr)
else:
    print("GA_MEASUREMENT_ID unset: token left in place, analytics stays off")

print("pages built: %d (of which indexable: %d)" % (len(html_files), len(indexable)))
print("sitemap urls: %d" % len(urls))
PY

# 5) Hosting files.
printf '%s\n' "$DOMAIN" > "$PROD/CNAME"
: > "$PROD/.nojekyll"
cat > "$PROD/robots.txt" <<ROBOTS
User-agent: *
Allow: /

Sitemap: $BASE/sitemap.xml
ROBOTS

# 6) Self-verification. Any failure here fails the build.
SRC_PAGES=$(find "$ROOT/site" -name '*.html' | wc -l)
OUT_PAGES=$(find "$PROD" -name '*.html' -not -path "$PROD/assets/*" | wc -l)
echo "source pages: $SRC_PAGES · built html (pages + 3 redirect stubs): $OUT_PAGES"
if [ "$OUT_PAGES" -ne "$((SRC_PAGES + 3))" ]; then
  echo "FAIL: built html count does not equal source pages plus the 3 stubs" >&2
  exit 1
fi

PROD="$PROD" SRC_PAGES="$SRC_PAGES" python3 - <<'PY'
import os
import re
import sys
from urllib.parse import unquote, urlparse

PROD = os.environ["PROD"]
SRC_PAGES = int(os.environ["SRC_PAGES"])
problems = []

html_files = []
for dp, _dn, fn in os.walk(PROD):
    if os.path.relpath(dp, PROD).split(os.sep)[0] in ("assets", "fonts", "newsletters"):
        continue
    for f in fn:
        if f.endswith(".html"):
            html_files.append(os.path.join(dp, f))
html_files.sort()

# 1) every RELATIVE asset/font ref must carry exactly as many ../ as its depth
DEPTH_REF = re.compile(r'(?:href|src)="((?:\.\./)*)(assets/|fonts/)')
for path in html_files:
    rel = os.path.relpath(path, PROD)
    depth = rel.count(os.sep)
    if rel == "404.html":
        continue  # root-relative by design
    for m in DEPTH_REF.finditer(open(path, encoding="utf-8").read()):
        levels = len(m.group(1)) // 3
        if levels != depth:
            problems.append("%s: %s%s has %d ../ levels, depth is %d"
                            % (rel, m.group(1), m.group(2), levels, depth))

# 2) every internal href/src/url() must resolve to a file in the tree
REFS = re.compile(r'(?:href|src)="([^"]+)"')
CSSREFS = re.compile(r"url\(['\"]?([^)'\"]+)['\"]?\)")


def resolve(base_dir, ref):
    ref = unquote(urlparse(ref).path)
    if not ref:
        return None
    target = os.path.join(PROD, ref.lstrip("/")) if ref.startswith("/") \
        else os.path.normpath(os.path.join(base_dir, ref))
    if ref.endswith("/") or os.path.isdir(target):
        target = os.path.join(target, "index.html")
    return target


def check(path, text, pattern):
    rel = os.path.relpath(path, PROD)
    base_dir = os.path.dirname(path)
    for m in pattern.finditer(text):
        ref = m.group(1).strip()
        if (not ref or ref.startswith("#") or ref.startswith("data:")
                or re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*:", ref)):
            continue
        target = resolve(base_dir, ref)
        if target is None or not os.path.isfile(target):
            problems.append("%s: broken ref %s" % (rel, ref))


for path in html_files:
    check(path, open(path, encoding="utf-8").read(), REFS)
for dp, _dn, fn in os.walk(PROD):
    for f in fn:
        if f.endswith(".css"):
            p = os.path.join(dp, f)
            check(p, open(p, encoding="utf-8").read(), CSSREFS)

# 3) sitemap covers exactly the indexable pages
sitemap = open(os.path.join(PROD, "sitemap.xml"), encoding="utf-8").read()
locs = re.findall(r"<loc>([^<]+)</loc>", sitemap)
stub_dirs = {"insights/newsletters/", "insights/podcast/", "insights/articles/"}
expected = SRC_PAGES - 1  # every source page except 404.html
if len(locs) != expected:
    problems.append("sitemap has %d urls, expected %d" % (len(locs), expected))
for loc in locs:
    if urlparse(loc).path.lstrip("/") in stub_dirs:
        problems.append("sitemap lists a redirect stub: %s" % loc)
    if loc.endswith("404.html"):
        problems.append("sitemap lists 404.html")

# 4) the analytics token is either a real id everywhere or nowhere
tokens = sum("__GA_MEASUREMENT_ID__" in open(p, encoding="utf-8").read()
             for p in html_files)
ids = sum(bool(re.search(r'data-ga="G-[A-Z0-9]+"', open(p, encoding="utf-8").read()))
          for p in html_files)
if tokens and ids:
    problems.append("mixed analytics state: %d pages with the token, %d with an id"
                    % (tokens, ids))
if tokens + ids != SRC_PAGES:
    problems.append("consent script missing on %d pages"
                    % (SRC_PAGES - tokens - ids))

if problems:
    print("\nBUILD CHECKS FAILED (%d):" % len(problems), file=sys.stderr)
    for p in problems:
        print("  " + p, file=sys.stderr)
    sys.exit(1)

print("link + asset check: %d html files, %d sitemap urls, 0 broken refs"
      % (len(html_files), len(locs)))
print("analytics: %d pages carry the token, %d carry a measurement id"
      % (tokens, ids))
PY

echo "built -> $PROD"
du -sh "$PROD" | awk '{print "total size: " $1}'
