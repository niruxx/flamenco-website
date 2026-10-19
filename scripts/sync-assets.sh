#!/usr/bin/env bash
# Pull the screenshots and artwork from the Flamenco repos and convert them to WebP.
# Run again whenever the screenshots in either repo change:  ./scripts/sync-assets.sh
# Needs: curl, cwebp (libwebp), ffmpeg
set -euo pipefail

cd "$(dirname "$0")/.."

RAW=https://raw.githubusercontent.com/niruxx
QUALITY=${QUALITY:-82}
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

fetch_webp() {   # repo  remote-path  local-path(.webp)
    local repo=$1 src=$2 dst=$3
    mkdir -p "$(dirname "$dst")"
    curl -fsSL "$RAW/$repo/main/$src" -o "$TMP/in.png"
    cwebp -quiet -q "$QUALITY" -resize 1920 0 "$TMP/in.png" -o "$dst"
    echo "  $dst"
}

crop_webp() {    # local-full.webp-name  out.webp  x y w h   (fractions of the full screenshot; uses the PNG still in $TMP)
    mkdir -p "$(dirname "$2")"
    ffmpeg -loglevel error -y -i "$TMP/in.png" -vf "crop=iw*$5:ih*$6:iw*$3:ih*$4" "$TMP/crop.png"
    cwebp -quiet -q "$QUALITY" "$TMP/crop.png" -o "$2"
    echo "  $2 (crop)"
}

fetch_raw() {    # repo  remote-path  local-path
    mkdir -p "$(dirname "$3")"
    curl -fsSL "$RAW/$1/main/$2" -o "$3"
    echo "  $3"
}

echo "Flamenco Shell"
for f in desktop launcher control-center control-center-light notification-center \
         calendar power-menu \
         settings-appearance settings-app-theming settings-bar settings-windows \
         settings-workspaces settings-edges settings-keyboard settings-displays \
         settings-screenshots settings-defaults settings-autostart settings-flatpak; do
    fetch_webp Flamenco "docs/screenshots/$f.png" "assets/shell/$f.webp"
    # Close-up of the panel each screenshot is about. Keep these boxes in step with `box` in js/data.js.
    case $f in
        settings-*)              crop_webp "$f" "assets/shell/crop/$f.webp" 0.289 0.238 0.422 0.557 ;;
        control-center*)         crop_webp "$f" "assets/shell/crop/$f.webp" 0.818 0.027 0.182 0.431 ;;
        launcher)                crop_webp "$f" "assets/shell/crop/$f.webp" 0     0     0.245 0.426 ;;
        calendar)                crop_webp "$f" "assets/shell/crop/$f.webp" 0.385 0.033 0.227 0.410 ;;
        power-menu)              crop_webp "$f" "assets/shell/crop/$f.webp" 0.344 0.390 0.300 0.210 ;;
        notification-center)     crop_webp "$f" "assets/shell/crop/$f.webp" 0.818 0.027 0.182 0.140 ;;
    esac
done
for f in banner-dark banner-light palettes-dark palettes-light; do
    fetch_raw Flamenco "docs/assets/$f.svg" "assets/shell/$f.svg"
done

echo "Flamenco Greeter"
for f in login-dark login-light user-picker session-picker wrong-password \
         fingerprint fingerprint-miss fingerprint-typing \
         palette-catppuccin palette-rosepine palette-nord palette-gruvbox \
         palette-dracula palette-kanagawa palette-tokyonight palette-everforest; do
    fetch_webp flamenco-greeter "docs/screenshots/$f.png" "assets/greeter/$f.webp"
done
for f in flow-dark flow-light; do
    fetch_raw flamenco-greeter "docs/assets/$f.svg" "assets/greeter/$f.svg"
done

echo "Done."
