# work.margaretalba.com

Static site, no build step. Open `index.html` through any web server to preview, or just publish it.

## Publish on GitHub Pages
1. On GitHub, create a new **public** repository (for example `work-site`). Pages on a free account needs a public repo.
2. Click **Add file > Upload files** and drag in everything inside this folder (not the folder itself), so `index.html`, `CNAME`, `assets/` and the page folders sit at the top level. Commit.
3. In the repo, go to **Settings > Pages**. Under Build and deployment, choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. Under **Custom domain**, enter `work.margaretalba.com` and save (the `CNAME` file already says this). Once DNS is working, tick **Enforce HTTPS**.

## Point the subdomain at it (Squarespace Domains)
1. In Squarespace, open **Domains**, pick `margaretalba.com`, then **DNS > DNS settings**.
2. Add a record: Type **CNAME**, Host **work**, Data **YOUR-GITHUB-USERNAME.github.io**.
3. Leave the existing records for `margaretalba.com` alone, so your studio site keeps working.
4. DNS can take from a few minutes to a day to update.

## Before you share it
- **Fonts:** headings use IvyPresto Display and body text uses Inter, the same as the studio site at margaretalba.com. IvyPresto Display loads from the Adobe Fonts web project `haz5lhc`. If it ever goes missing from that project, headings fall back to Instrument Serif from Google Fonts.
- **Search engines:** every page has `<meta name="robots" content="noindex">`, so Google won’t list the site; people only find it through a link you share. Delete that line from each page (and add a `sitemap.xml` back) when you want it findable.
- **Link previews:** each page has its own 1200×630 preview image in `assets/img/og/`, shown when a link is shared on LinkedIn, Slack, iMessage and similar.
- **Links:** About and the case studies live at `/about`, `/ltk-madewell`, `/stitch-fix-meta`, `/video`, `/ltk-adidas`, `/project-object` and `/more-to-say`. The Studio links go to margaretalba.com.

## Editing later
Each page is a single `index.html`. Text edits can be made right in GitHub's editor. Images and videos are in `assets/`.
