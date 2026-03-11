# Internet Card

Draw random Wikipedia pages as collectible cards. MVP: no auth, cards saved in localStorage.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the dev server at **http://127.0.0.1:3010** (automatically frees port 3010 if in use):
   ```bash
   npm run dev
   ```

3. Open **http://127.0.0.1:3010** in your browser.

4. Use **DRAW** to get a random Wikipedia card, **KEEP** to save it, **OPEN ARTICLE** to read on Wikipedia, **DRAW AGAIN** to get another card. Visit **/collection** to see saved cards.

## Build

```bash
npm run build
npm start
```

## Deploy to Netlify (Git)

1. Push this repo to GitHub (e.g. `kennykimtang/AllGatcha`).

2. **In Netlify:** [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project** → **GitHub** → select **AllGatcha**.

3. **Build settings** (use repo’s `netlify.toml` or set manually):
   - Build command: `npm run build`
   - Publish directory: `out`

4. **Deploy site**. The site will be at `https://<site-name>.netlify.app` (no `/AllGatcha` path).

## Deploy to GitHub Pages (this repo)

1. Push to `main` — the **Deploy to GitHub Pages** workflow runs and publishes the built site to the `gh-pages` branch.

2. **Turn on GitHub Pages** (once per repo):
   - Repo → **Settings** → **Pages**.
   - Under **Source**, choose **Deploy from a branch**.
   - **Branch**: `gh-pages` → **Folder**: `/ (root)` → **Save**.

3. After a minute or two, the site is at:  
   **https://kennykimtang.github.io/AllGatcha/**
