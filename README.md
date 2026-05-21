# 🌱 Your Digital Garden Portfolio

A pixel-faithful recreation of chester.how's personal portfolio.
Built with **React + Vite + Framer Motion**.

---

## Quick Start

```bash
npm install
npm run dev        # frontend only → http://localhost:5173
npm run server     # Mongo API only → http://localhost:4000
npm run dev:full   # frontend + API together
npm run seed       # seed MongoDB from src/data/site.js
npm run build      # production build → /dist
```

Create a `.env` file (or copy `.env.example`) with:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/garden_portfolio
PORT=4000
VITE_API_BASE_URL=http://localhost:4000/api
```

---

## ✏️ How to Customise

**All content lives in one file:**

```
src/data/site.js
```

Open it and edit:

| Export | What it controls |
|--------|-----------------|
| `SITE` | Your name, handles, hero paragraph text, social links |
| `PROJECTS` | Project cards — title, description, tags, link, image |
| `HOBBIES` | Hobby photo cards — caption, image URL or gradient |
| `BOOKS` | Reading list — title, author, status, cover image URL |
| `SKILLS` | Skill bars — name, level (0–100), category |
| `CONTACT` | Email, GitHub, Twitter, LinkedIn |

### Adding a real project image

In `PROJECTS`, set `imageUrl` to any hosted image URL:
```js
imageUrl: "https://your-cdn.com/screenshot.png",
```
Leave it `null` to use the gradient placeholder.

### Adding a real book cover

Set `coverUrl` in `BOOKS`:
```js
coverUrl: "https://covers.openlibrary.org/b/isbn/0201633612-M.jpg",
```

### Changing card order in the feed

Edit `src/components/Feed.jsx` — the `leftCol` and `rightCol` arrays
control which cards appear in which order in the two-column masonry feed.

---

## 🗂️ File Structure

```
src/
  data/
    site.js          ← ALL your content (edit here)
  components/
    Nav.jsx          ← Sticky nav with active-section tracking
    Hero.jsx         ← Large italic serif intro
    Feed.jsx         ← Two-column masonry card feed
    Cards.jsx        ← ProjectCard, BookCard, HobbyCard, SkillsCard, ContactCard
    Footer.jsx       ← Animated leaf + "Planted by" text
  App.jsx            ← Main layout (sticky left + scrolling right)
  index.css          ← Global tokens, reset, fonts
```

---

## 🎨 Design Tokens

All colours and spacing are in `src/index.css` under `:root {}`.
Key tokens:
- `--font-serif` → Lora (body & headings)
- `--font-mono` → DM Mono (labels, tags, metadata)
- `--ink` → `#1a1a1a` (primary text)
- `--ink-3` → `#999` (labels, muted text)
- `--card-border` → `rgba(0,0,0,0.07)` (subtle borders)

---

Planted with ❤️
