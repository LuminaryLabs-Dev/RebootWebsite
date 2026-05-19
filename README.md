# RebootWebsite

Static deployment wrapper for the Reboot dashboard.

## What This Builds

This repo packages `RebootSoftware/RebootDashboard` into one static site that can be deployed with GitHub Pages.

```text
RebootWebsite
├── scripts/build-static-site.mjs
├── dist/                  # generated static site
└── .github/workflows/pages.yml

RebootSoftware
└── RebootDashboard        # source dashboard app
```

## Local Build

From this repo:

```bash
cd /Users/crimsonwheeler/Documents/GitHub/RebootWebsite
npm install
npm run build
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

The GitHub workflow checks out `LuminaryLabs-Dev/RebootSoftware`, builds `RebootDashboard`, copies its `dist` output into this repo's `dist`, and publishes it to GitHub Pages.

If `RebootSoftware` is private and this repo cannot read it with the default workflow token, add a repository secret named:

```text
REBOOT_SOFTWARE_TOKEN
```

The token only needs read access to `LuminaryLabs-Dev/RebootSoftware`.
