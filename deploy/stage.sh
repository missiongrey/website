#!/usr/bin/env bash
# Stage mg-site for preview under the /new/ URL prefix on dev.missiongrey.com.
# Produces deploy/stage/new/** — a tree whose URL structure equals the final
# prod structure, one directory down. Purely local; rsync happens separately.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STAGE="$ROOT/deploy/stage"
PREFIX="/new"

rm -rf "$STAGE"
mkdir -p "$STAGE/new"

# 1) Pages: site/** -> stage/new/**
cp -r "$ROOT/site/." "$STAGE/new/"
# COMPONENTS.md is a build doc, not a page
rm -f "$STAGE/new/COMPONENTS.md"

# 2) Assets + fonts move INSIDE the prefix
cp -r "$ROOT/assets" "$STAGE/new/assets"
cp -r "$ROOT/fonts"  "$STAGE/new/fonts"
cp "$ROOT/assets/favicon.ico" "$STAGE/new/favicon.ico"

# 3) Rewrites, depth-aware.
#    Local tree:  site/index.html        refs ../assets/../fonts (one up to mg-site/)
#                 site/<page>/index.html refs ../../assets, ../styles.css
#                 site/styles.css        refs ../fonts/
#    Staged tree: everything lives under new/, so strip ONE ../ level from
#    asset/font refs, and prefix root-relative internal hrefs with /new.
find "$STAGE/new" -name '*.html' -print0 | while IFS= read -r -d '' f; do
  depth_rel="${f#"$STAGE/new/"}"
  slashes="${depth_rel//[^\/]/}"
  # root-relative internal links: href="/x..." -> href="/new/x..." (skip //, /new/)
  sed -i 's|href="/new/|href="__KEEPNEW__|g' "$f"
  sed -i 's|href="//|href="__PROTOREL__|g' "$f"
  sed -i 's|href="/|href="'"$PREFIX"'/|g' "$f"
  sed -i 's|href="__PROTOREL__|href="//|g' "$f"
  sed -i 's|href="__KEEPNEW__|href="/new/|g' "$f"
  # same for src="/ and content="/ (og:image)
  sed -i 's|src="/|src="'"$PREFIX"'/|g' "$f"
  sed -i 's|content="/assets/|content="'"$PREFIX"'/assets/|g' "$f"
  # asset/font relative refs lose one level
  if [ -z "$slashes" ]; then
    sed -i 's|\.\./assets/|assets/|g; s|\.\./fonts/|fonts/|g' "$f"
  else
    sed -i 's|\.\./\.\./assets/|../assets/|g; s|\.\./\.\./fonts/|../fonts/|g' "$f"
  fi
done
# styles.css: ../fonts/ -> fonts/ (it now sits beside fonts/)
sed -i 's|\.\./fonts/|fonts/|g' "$STAGE/new/styles.css"

echo "staged -> $STAGE/new"
find "$STAGE/new" -name '*.html' | wc -l | xargs echo "html files:"
UNPREFIXED=$(grep -RInP 'href="/(?!new/|/)' "$STAGE/new" --include='*.html' | wc -l)
echo "unprefixed root-relative hrefs remaining: $UNPREFIXED (want 0)"
