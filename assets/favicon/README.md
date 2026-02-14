# Favicon Setup

This folder contains favicon and app icon placeholders for the site.

To properly configure favicons for your academic website:

---

## 1. Generate Real Favicons

Use a generator such as:

- https://realfavicongenerator.net/
- https://favicon.io/

Upload:
- A square PNG (recommended: 512×512)
- Simple, high-contrast design (e.g., initials, molecular motif, minimal geometric mark)

Avoid:
- Tiny text
- Overly detailed graphics

---

## 2. Replace These Files

Replace the placeholder files in this folder:

- favicon.ico
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png
- site.webmanifest

Keep the filenames the same to avoid editing HTML.

---

## 3. Add to `<head>` (if not already included)

In each HTML file, inside `<head>`:

```html
<link rel="icon" href="assets/favicon/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.png">
<link rel="manifest" href="assets/favicon/site.webmanifest">
Make sure paths remain relative (no leading /) for GitHub Pages compatibility.

4. Recommended Style for This Site

Given the site's identity (computational + academic + chemistry):

Good favicon concepts:

Minimal serif initial (e.g., first letter of your name)

Simple hexagon (chemical motif)

Dot–circle motif representing membrane-protein systems

Monochrome mark using accent color (deep navy)

Keep it:

Clean

Recognizable at 16px

Visually balanced

5. Test After Deployment

After pushing to GitHub Pages:

Hard refresh (Ctrl/Cmd + Shift + R)

Test on mobile

Validate in Chrome DevTools → Application → Manifest