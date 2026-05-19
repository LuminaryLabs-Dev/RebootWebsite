# RebootWebsite

Static deployment wrapper for the Reboot website.

## What This Builds

This repo publishes `RebootSoftware/RebootSiteV6` as the root GitHub Pages site on `main` pushes. It can still build the dashboard locally when needed.

```text
RebootWebsite
├── scripts/build-static-site.mjs
├── dist/                  # generated static site
└── .github/workflows/pages.yml

RebootSoftware
├── RebootSiteV6           # published root site
└── RebootDashboard        # optional local launcher app
```

## Local Build

From this repo:

```bash
cd /Users/crimsonwheeler/Documents/GitHub/RebootWebsite
npm install
npm run build
```

By default this builds the dashboard wrapper output. To build the same root site that GitHub Pages publishes:

```bash
REBOOT_PUBLISH_TARGET=v6 npm run build
```

By default the build uses:

```text
/Users/crimsonwheeler/Documents/GitHub/RebootSoftware
```

To point at another checkout:

```bash
REBOOT_SOFTWARE_DIR=/path/to/RebootSoftware npm run build
```

## Deploy

The GitHub workflow checks out `LuminaryLabs-Dev/RebootSoftware`, copies `RebootSiteV6` into this repo's `dist`, and publishes it to GitHub Pages. That means the Pages root serves the V6 site directly, not the dashboard launcher.

If `RebootSoftware` is private and this repo cannot read it with the default workflow token, add a repository secret named:

```text
REBOOT_SOFTWARE_TOKEN
```

The token only needs read access to `LuminaryLabs-Dev/RebootSoftware`.
