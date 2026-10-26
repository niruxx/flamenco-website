// Content the page builds itself from. Edit here, not in main.js.

// The 18 Flamenco palettes, in the shell's own order, from Flamenco's shell/Commons/Palettes.qml
// (surface = surfaceHigh, outline = border, primary/secondary/tertiary = accent/accent2/accent3).
// A few light-mode primaries and dim-text colors are nudged so text on this page stays readable.
// "Flamenco" is the shell's black-and-grey look; the original rose palette is now "Material Design".
export const PALETTES = {
  "Flamenco": {
    dark:  { bg: "#0a0a0b", outline: "#303035", surface: "#1d1d20", primary: "#d9d9df", secondary: "#a7a7b0", tertiary: "#ff7a5c", text: "#ececef", subtext: "#9c9ca4", onPrimary: "#0e0e10" },
    light: { bg: "#ececee", outline: "#c6c6cc", surface: "#e4e4e7", primary: "#26262a", secondary: "#55555c", tertiary: "#d9532f", text: "#151517", subtext: "#5f5f66", onPrimary: "#f7f7f8" } },
  "Material Design": {
    dark:  { bg: "#140f10", outline: "#46343a", surface: "#281e20", primary: "#ff5d73", secondary: "#ffb867", tertiary: "#e98aa8", text: "#f5e9e7", subtext: "#b9a3a2", onPrimary: "#2a0910" },
    light: { bg: "#fbf3f1", outline: "#ddc6c2", surface: "#f4e8e5", primary: "#d0304d", secondary: "#b8740f", tertiary: "#a8456a", text: "#2b1b1c", subtext: "#7b6564", onPrimary: "#ffffff" } },
  "Liquid Glass": {
    dark:  { bg: "#1c1c1e", outline: "#545458", surface: "#3a3a3c", primary: "#0a84ff", secondary: "#5e5ce6", tertiary: "#64d2ff", text: "#f5f5f7", subtext: "#a1a1a6", onPrimary: "#ffffff" },
    light: { bg: "#f2f2f7", outline: "#c6c6c8", surface: "#f2f2f7", primary: "#007aff", secondary: "#5856d6", tertiary: "#32ade6", text: "#1d1d1f", subtext: "#6e6e73", onPrimary: "#ffffff" } },
  "Y2K": {
    dark:  { bg: "#140f2b", outline: "#4b4180", surface: "#2a2350", primary: "#ff5fd2", secondary: "#41e2ff", tertiary: "#c9a7ff", text: "#f3eeff", subtext: "#b6aee0", onPrimary: "#2a0425" },
    light: { bg: "#e9e7f7", outline: "#c4c0e6", surface: "#ecebfa", primary: "#e0249f", secondary: "#0090c8", tertiary: "#7b4fd6", text: "#1d1838", subtext: "#5f5a86", onPrimary: "#ffffff" } },
  "Frutiger Aero": {
    dark:  { bg: "#06263a", outline: "#2a6d99", surface: "#114265", primary: "#4cc3ff", secondary: "#7fe08f", tertiary: "#4fe3d8", text: "#e8f7ff", subtext: "#9cc7df", onPrimary: "#032033" },
    light: { bg: "#dff3ff", outline: "#a9d4ee", surface: "#e6f5ff", primary: "#1698ff", secondary: "#3cc85a", tertiary: "#18c3c9", text: "#0b2a3d", subtext: "#4a6f86", onPrimary: "#ffffff" } },
  "Unity": {
    dark:  { bg: "#2c2b28", outline: "#5f5d55", surface: "#47463f", primary: "#e95420", secondary: "#77216f", tertiary: "#5e2750", text: "#f2f1f0", subtext: "#aea79f", onPrimary: "#ffffff" },
    light: { bg: "#f2f1f0", outline: "#cdc8c1", surface: "#e8e6e3", primary: "#e95420", secondary: "#77216f", tertiary: "#5e2750", text: "#3c3b37", subtext: "#6e6b63", onPrimary: "#ffffff" } },
  "Breeze": {
    dark:  { bg: "#1b1e20", outline: "#3f454b", surface: "#2a2e32", primary: "#3daee9", secondary: "#1d99f3", tertiary: "#c678dd", text: "#fcfcfc", subtext: "#a1a9b1", onPrimary: "#0d1a21" },
    light: { bg: "#eff0f1", outline: "#c3c7cb", surface: "#e3e5e7", primary: "#1a9add", secondary: "#1d99f3", tertiary: "#8e44ad", text: "#232629", subtext: "#646d7a", onPrimary: "#ffffff" } },
  "Catppuccin": {
    dark:  { bg: "#11111b", outline: "#3b3d52", surface: "#313244", primary: "#cba6f7", secondary: "#f5c2e7", tertiary: "#89b4fa", text: "#cdd6f4", subtext: "#a6adc8", onPrimary: "#1e1e2e" },
    light: { bg: "#dce0e8", outline: "#bcc0cc", surface: "#e6e9ef", primary: "#8839ef", secondary: "#ea76cb", tertiary: "#1e66f5", text: "#4c4f69", subtext: "#606175", onPrimary: "#eff1f5" } },
  "Rosé Pine": {
    dark:  { bg: "#191724", outline: "#403d52", surface: "#26233a", primary: "#ebbcba", secondary: "#c4a7e7", tertiary: "#9ccfd8", text: "#e0def4", subtext: "#908caa", onPrimary: "#191724" },
    light: { bg: "#faf4ed", outline: "#dfdad9", surface: "#f2e9e1", primary: "#d37672", secondary: "#907aa9", tertiary: "#56949f", text: "#575279", subtext: "#716d8c", onPrimary: "#fffaf3" } },
  "Nord": {
    dark:  { bg: "#242933", outline: "#4c566a", surface: "#3b4252", primary: "#88c0d0", secondary: "#81a1c1", tertiary: "#b48ead", text: "#eceff4", subtext: "#aab3c4", onPrimary: "#2e3440" },
    light: { bg: "#e5e9f0", outline: "#c2c9d6", surface: "#dfe3eb", primary: "#5e81ac", secondary: "#81a1c1", tertiary: "#b48ead", text: "#2e3440", subtext: "#4c566a", onPrimary: "#eceff4" } },
  "Tokyo Night": {
    dark:  { bg: "#16161e", outline: "#3b4261", surface: "#24283b", primary: "#7aa2f7", secondary: "#bb9af7", tertiary: "#7dcfff", text: "#c0caf5", subtext: "#a9b1d6", onPrimary: "#16161e" },
    light: { bg: "#d0d5e3", outline: "#a8aecb", surface: "#d5d6db", primary: "#2e7de9", secondary: "#9854f1", tertiary: "#007197", text: "#3760bf", subtext: "#485992", onPrimary: "#e1e2e7" } },
  "Gruvbox": {
    dark:  { bg: "#1d2021", outline: "#504945", surface: "#32302f", primary: "#fe8019", secondary: "#fabd2f", tertiary: "#83a598", text: "#ebdbb2", subtext: "#a89984", onPrimary: "#1d2021" },
    light: { bg: "#f2e5bc", outline: "#bdae93", surface: "#ebdbb2", primary: "#af3a03", secondary: "#b57614", tertiary: "#076678", text: "#3c3836", subtext: "#70635b", onPrimary: "#fbf1c7" } },
  "Everforest": {
    dark:  { bg: "#232a2e", outline: "#475258", surface: "#343f44", primary: "#a7c080", secondary: "#83c092", tertiary: "#d699b6", text: "#d3c6aa", subtext: "#9da9a0", onPrimary: "#232a2e" },
    light: { bg: "#efebd4", outline: "#d8d3ba", surface: "#f4f0d9", primary: "#7f9101", secondary: "#35a77c", tertiary: "#df69ba", text: "#5c6a72", subtext: "#5e6d5d", onPrimary: "#fdf6e3" } },
  "Dracula": {
    dark:  { bg: "#1e1f29", outline: "#44475a", surface: "#323443", primary: "#bd93f9", secondary: "#ff79c6", tertiary: "#8be9fd", text: "#f8f8f2", subtext: "#b4b6c8", onPrimary: "#21222c" },
    light: { bg: "#f3f1f8", outline: "#cdc8de", surface: "#ebe8f4", primary: "#7c4dcc", secondary: "#c2307f", tertiary: "#1c8aa3", text: "#282a36", subtext: "#696b81", onPrimary: "#ffffff" } },
  "Kanagawa": {
    dark:  { bg: "#16161d", outline: "#3f3f52", surface: "#2a2a37", primary: "#7e9cd8", secondary: "#ffa066", tertiary: "#957fb8", text: "#dcd7ba", subtext: "#a6a69c", onPrimary: "#16161d" },
    light: { bg: "#e7dba0", outline: "#c7bd8f", surface: "#e5ddb0", primary: "#4d699b", secondary: "#cc6d00", tertiary: "#624c83", text: "#545464", subtext: "#615e52", onPrimary: "#f2ecbc" } },
  "Solarized": {
    dark:  { bg: "#00212b", outline: "#1b4e5b", surface: "#073642", primary: "#268bd2", secondary: "#2aa198", tertiary: "#d33682", text: "#eee8d5", subtext: "#93a1a1", onPrimary: "#fdf6e3" },
    light: { bg: "#eee8d5", outline: "#d6cfb8", surface: "#f3ecd8", primary: "#268bd2", secondary: "#2aa198", tertiary: "#d33682", text: "#073642", subtext: "#596b73", onPrimary: "#fdf6e3" } },
  "One Dark": {
    dark:  { bg: "#1e2127", outline: "#434956", surface: "#2f343e", primary: "#61afef", secondary: "#c678dd", tertiary: "#56b6c2", text: "#dcdfe4", subtext: "#9da5b4", onPrimary: "#1e2127" },
    light: { bg: "#f0f0f1", outline: "#cfd0d4", surface: "#eaeaeb", primary: "#4078f2", secondary: "#a626a4", tertiary: "#0184bc", text: "#383a42", subtext: "#696c77", onPrimary: "#ffffff" } },
  "Monochrome": {
    dark:  { bg: "#0e0e0e", outline: "#3a3a3a", surface: "#212121", primary: "#e6e6e6", secondary: "#bdbdbd", tertiary: "#8f8f8f", text: "#ededed", subtext: "#a0a0a0", onPrimary: "#111111" },
    light: { bg: "#f2f2f2", outline: "#cccccc", surface: "#ebebeb", primary: "#1f1f1f", secondary: "#474747", tertiary: "#6e6e6e", text: "#161616", subtext: "#666666", onPrimary: "#ffffff" } },
};

// Greeter screenshots that exist for a palette (Flamenco Greeter's docs/screenshots/palette-*.png).
export const GREETER_PALETTE_SHOTS = {
  "Catppuccin": "palette-catppuccin", "Rosé Pine": "palette-rosepine", "Nord": "palette-nord",
  "Gruvbox": "palette-gruvbox", "Dracula": "palette-dracula", "Kanagawa": "palette-kanagawa",
  "Tokyo Night": "palette-tokyonight", "Everforest": "palette-everforest",
};

// The guided tour. `box` is the part of the screenshot to zoom into, as fractions [x, y, w, h];
// keep it in step with the crops in scripts/sync-assets.sh. Leave it out to stay on the whole screen.
export const TOUR = [
  { src: "assets/shell/desktop.webp", chapter: "Desktop", title: "A complete desktop shell",
    text: "Bar, panels, notifications, lock screen, wallpaper and a full Settings app, all in one Material 3 look. The first-run setup walks you through it." },
  { src: "assets/shell/launcher.webp", chapter: "Launcher", box: [0, 0, 0.245, 0.426], title: "Launcher",
    text: "Fuzzy app search ranked by how often you use each app. Type = for a calculator, > to run a command, ; for clipboard history." },
  { src: "assets/shell/control-center.webp", chapter: "Quick settings", box: [0.818, 0.027, 0.182, 0.431], title: "Control center",
    text: "Sliders, an app mixer, and tiles for Wi-Fi, Bluetooth, DND, night light, VPN, recording and more. Press and hold to remove, resize or drag them." },
  { src: "assets/shell/calendar.webp", chapter: "Dashboard", box: [0.385, 0.033, 0.227, 0.41], title: "Dashboard",
    text: "Opens from the clock: calendar and agenda, weather, media with a visualizer, wallpapers and live system graphs." },
  { src: "assets/shell/settings-appearance.webp", chapter: "Settings", box: [0.289, 0.238, 0.422, 0.557], title: "A real Settings app",
    text: "40 pages, from palettes and the bar to displays, online accounts, firewall and Flatpak permissions. Search any setting with Ctrl+F. Every change applies live." },
  { src: "assets/shell/settings-displays.webp", chapter: "Displays", box: [0.289, 0.238, 0.422, 0.557], title: "Safe display changes",
    text: "Resolution, refresh rate, scale, rotation and VRR, with drag-to-arrange. A change you don't confirm reverts by itself after 15 seconds." },
  { src: "assets/shell/power-menu.webp", chapter: "Power", box: [0.344, 0.39, 0.3, 0.21], title: "Power menu",
    text: "Lock, suspend, log out, restart or shut down, with keyboard navigation. The destructive ones need a 3-second hold." },
  { src: "assets/shell/control-center-light.webp", chapter: "Light mode", box: [0.818, 0.027, 0.182, 0.431], title: "Dark and light",
    text: "Every palette is hand-tuned in both modes. Switch by hand, at sunset, or on a schedule." },
  { src: "assets/greeter/login-dark.webp", chapter: "Login", title: "Flamenco Greeter",
    text: "The same clock, avatar, password pill and motion as the lock screen, at the greetd login screen, with your palette and wallpaper." },
  { src: "assets/greeter/widgets.webp", chapter: "Login widgets", title: "Widgets at login",
    text: "Press and hold the login screen's background to add a clock, calendar, weather, battery, system info or a note, and drag them anywhere." },
  { src: "assets/greeter/fingerprint.webp", chapter: "Fingerprint", title: "Fingerprint ready",
    text: "The reader starts listening the moment you're picked. A typed password always works too." },
  { src: "assets/greeter/palette-catppuccin.webp", chapter: "Palettes", title: "Wears every palette",
    text: "Eighteen palettes, from the black-and-grey Flamenco look to Liquid Glass, Y2K, Frutiger Aero, Unity, Catppuccin and Nord, or colors from your wallpaper." },
];

// Close-ups for the Settings carousel.
export const SETTINGS_PAGES = [
  ["settings-appearance", "Appearance", "Palette, mode, accent, roundness, fonts and motion"],
  ["settings-app-theming", "App theming", "Qt 5/6, GTK 3/4 and KDE colors follow your palette"],
  ["settings-bar", "Bar", "Position, style, thickness and every widget"],
  ["settings-windows", "Windows & layout", "Gaps, radius, focus ring and shadows, written to your compositor"],
  ["settings-workspaces", "Workspaces", "Named workspaces pinned to a screen"],
  ["settings-edges", "Screen edges", "Hot corners on every screen"],
  ["settings-keyboard", "Keyboard", "Layouts, repeat and shortcuts, recorded live"],
  ["settings-displays", "Displays", "Arrange, scale, rotate, with a 15-second safety net"],
  ["settings-screenshots", "Screenshots", "Area, screen or window; clipboard or disk"],
  ["settings-defaults", "Default apps", "Browser, files, mail, media and more"],
  ["settings-autostart", "Auto-start", "XDG autostart entries and plain commands"],
  ["settings-flatpak", "Flatpak permissions", "Per-app files, network, devices and features"],
];

// A real video for the tour. Drop a screen recording at assets/video/tour.mp4 and a "Video" tab
// appears above the guided tour on its own; or put a YouTube video id in `youtube` instead.
export const TOUR_VIDEO = { file: "assets/video/tour.mp4", youtube: "" };
