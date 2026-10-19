# flamenco-website

The website for [Flamenco Shell](https://github.com/niruxx/Flamenco) and
[Flamenco Greeter](https://github.com/niruxx/flamenco-greeter): a guided tour, screenshots,
features, the 13 palettes (the page re-themes itself live) and install steps for both.

Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Publish on GitHub Pages

1. Push this repository to GitHub.
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. After a minute it's live at `https://<user>.github.io/flamenco-website/`.

`.nojekyll` tells Pages to serve the files as they are.

## Preview locally

```sh
python3 -m http.server 8000      # then open http://localhost:8000
```

(Opening `index.html` straight from disk won't work: browsers block JavaScript modules on `file://`.)

## Updating

| To change | Edit |
|---|---|
| Screenshots | Run `./scripts/sync-assets.sh` (needs `curl`, `cwebp`, `ffmpeg`). It pulls the latest screenshots from both repos and converts them to WebP |
| Tour chapters and captions | `TOUR` in `js/data.js` |
| Settings carousel | `SETTINGS_PAGES` in `js/data.js` |
| Palettes | `PALETTES` in `js/data.js` |
| Text, features, install steps | `index.html` |

The version numbers and download links for the prebuilt packages update themselves from GitHub
(the shell's latest release, and the newest folder in the greeter's `History Builds/`).

### Adding a real video

Record a screen capture (for example with `wf-recorder` or Flamenco's own recorder), save it as
`assets/video/tour.mp4`, and push. A **Video** tab appears above the guided tour automatically.
To use a YouTube video instead, put its id in `TOUR_VIDEO.youtube` in `js/data.js`.

Keep the file under ~50 MB (GitHub warns above 50 MB and refuses files over 100 MB):

```sh
ffmpeg -i recording.mkv -c:v libx264 -crf 26 -preset slow -vf scale=1920:-2 -an -movflags +faststart assets/video/tour.mp4
```
