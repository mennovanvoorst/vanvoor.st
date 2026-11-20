# vanvoor.st 🦕

The personal site of Menno van Voorst, software engineer and product builder.

Live at **[vanvoor.st](https://vanvoor.st/)**.

It's one page, there's no build step and no framework, and nothing gets tracked. HTML, CSS and a bit of JavaScript, the way the web was when I first started poking at it.

The page is in English and Dutch, in light and dark. There's a button for each in the top right.

## Run it locally

Open `index.html` in your browser. That's it.

The 404 page uses absolute paths, so to check it, start a tiny server:

```sh
python -m http.server
# → http://localhost:8000/does-not-exist
```

## What's in here

```
index.html     the page, in English and Dutch
404.html       where lost visitors end up
style.css      every style, light and dark
script.js      the switches, the cursor trail and a few surprises
fonts/         Bricolage Grotesque and Silkscreen, self-hosted (no Google calls)
me.jpg         hi 👋
favicon.svg    🦕
robots.txt     the welcome mat for crawlers
sitemap.xml    a very short map
```

## Two languages, two themes

Both languages live in the HTML. Every bit of text comes twice, marked `data-l="en"` and `data-l="nl"`, and the CSS hides the one that doesn't match `<html lang>`. Without JavaScript you get English.

The first visit follows the browser: Dutch for Dutch browsers, and light or dark from the system setting. Once you click a switch, the choice is saved in `localStorage` (the only thing the site stores) and a small script in the `<head>` applies it before the page shows, so nothing flashes.

To change the text, edit both versions.

## The palette

| | | |
|---|---|---|
| 🍅 | tomato | `#f2542d` |
| 🌭 | mustard | `#f5b700` |
| 🥬 | leaf | `#2fa36b` |
| 🫐 | sky | `#3a86ff` |
| 🍇 | grape | `#a07aff` |

Yes, it's basically a sandwich.

## Easter eggs

<details>
<summary>Spoilers, obviously.</summary>

- Type `rawr` or `dino` anywhere on the page.
- Poke my name three times, fast. Or poke the dino.
- Click a tree, or the ground.
- Click the star, or type `boom`. Then click fast.
- Switch to another tab and back again.
- Open the console.
- Visit a page that doesn't exist.

</details>

## Deploying

Upload the files to any static host. Netlify, Vercel, Cloudflare Pages and GitHub Pages all pick up `404.html` on their own.

---

Made with care, taste and a lot of help from AI. No dinosaurs were harmed.

The T-Rex comes from Chrome's offline page: © The Chromium Authors, [BSD licence](https://chromium.googlesource.com/chromium/src/+/main/LICENSE).
