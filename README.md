# vanvoor.st 🦕

The personal site of Menno van Voorst, software engineer and product builder.

Live at **[vanvoor.st](https://vanvoor.st/)**.

It's one page, there's no build step and no framework, and nothing gets tracked. HTML, CSS and a bit of JavaScript, the way the web was when I first started poking at it.

## Run it locally

Open `index.html` in your browser. That's it.

The 404 page uses absolute paths, so to check it, start a tiny server:

```sh
python -m http.server
# → http://localhost:8000/does-not-exist
```

## What's in here

```
index.html     the page
404.html       where lost visitors end up
style.css      every style, light and dark
script.js      the cursor trail and a few surprises
fonts/         Bricolage Grotesque and Silkscreen, self-hosted (no Google calls)
me.jpg         hi 👋
favicon.svg    🦕
robots.txt     the welcome mat for crawlers
sitemap.xml    a very short map
```

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
- Poke the photo three times, fast.
- While the dino is out, your cursor leaves footprints.
- Switch to another tab and back again.
- Open the console.
- Visit a page that doesn't exist, then poke what you find there.

</details>

## Deploying

Upload the files to any static host. Netlify, Vercel, Cloudflare Pages and GitHub Pages all pick up `404.html` on their own.

---

Made with care, taste and a lot of help from AI. No dinosaurs were harmed.
