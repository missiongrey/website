# missiongrey.com

Source for the public Mission Grey website. Hand written static HTML and
one stylesheet, built by a bash script and published to GitHub Pages on the
apex domain `missiongrey.com`.

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
.github/workflows/     the deploy action
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
3. The `Deploy to GitHub Pages` action runs `deploy/build.sh` and publishes
   `deploy/prod/`. It takes about a minute.

The build fails, and nothing is published, if any internal link or asset
reference does not resolve, if the page count does not match the sitemap, or
if the consent script is missing from a page. A red build means the site you
are looking at is still the previous one.

You can also start a build by hand from the Actions tab
(`Deploy to GitHub Pages` then `Run workflow`), which is what you want after
changing a repository variable.

## Preview locally

```bash
deploy/build.sh
python3 -m http.server 8080 --directory deploy/prod
# then open http://localhost:8080/
```

That serves exactly the tree that gets published. The one difference is the
404 page: `http.server` shows its own error page instead of `404.html`.

## Analytics

Google Analytics 4 is wired but switched off until it is configured, and it
never runs without the visitor agreeing to it.

- `assets/consent.js` reads the measurement id from its own `data-ga`
  attribute. Until a real id is set, that attribute holds the placeholder
  `__GA_MEASUREMENT_ID__`, the script does nothing, no banner appears and no
  request is made to Google.
- To switch it on, set a repository variable named `GA_MEASUREMENT_ID` to
  the GA4 measurement id (`Settings` then `Secrets and variables` then
  `Actions` then `Variables`). The value looks like `G-XXXXXXXXXX`. Then run
  the workflow. The build substitutes the id into every page.
- With a real id set, a first time visitor sees a small notice offering
  `Allow` and `Decline`. Nothing is requested from Google before `Allow` is
  clicked. The choice is stored in the visitor's browser under `mg-consent`
  and the notice does not come back.
- The privacy policy describes this behaviour in section 3, Activity
  Logging. If the analytics setup changes, that section changes with it.

## DNS

The domain is served from GitHub Pages at the apex, with `www` redirecting
to it. `deploy/build.sh` writes the `CNAME` file on every build, so do not
add one by hand.

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `missiongrey.github.io` |

In the repository, `Settings` then `Pages`, set the source to
`GitHub Actions`, set the custom domain to `missiongrey.com` and tick
`Enforce HTTPS` once the certificate has been issued.

## Newsletter PDFs

`newsletters/*.pdf` are copied to the web root as
`https://missiongrey.com/newsletters/<file>.pdf`. No page links to them: the
addresses exist because they are handed out by mail and by the Guild, so the
filenames must not change. Add a new edition by dropping the PDF into
`newsletters/` and pushing.
