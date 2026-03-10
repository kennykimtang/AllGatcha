# Internet Card

Draw random Wikipedia pages as collectible cards. MVP: no auth, cards saved in localStorage.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the dev server (always on **http://127.0.0.1:3010**):
   ```bash
   npm run dev
   ```
   If you see "address already in use" or **HTTP 500**, run this instead (frees port 3010 and starts the server):
   ```bash
   npm run dev:fresh
   ```

3. Open **http://127.0.0.1:3010** in your browser.

4. Use **DRAW** to get a random Wikipedia card, **KEEP** to save it, **OPEN ARTICLE** to read on Wikipedia, **DRAW AGAIN** to get another card. Visit **/collection** to see saved cards.

## Build

```bash
npm run build
npm start
```

## Deploy to Netlify (Git)

1. **Create a new repo on GitHub** (e.g. `internet-card`). Do **not** initialize with README (project already has one).

2. **Push this project** from the project folder:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/internet-card.git
   git branch -M main
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` and `internet-card` with your GitHub username and repo name.

3. **In Netlify:** Add new site → **Import from Git** → choose **GitHub** → select the repo.

4. **Build settings** (usually auto-detected for Next.js):
   - Build command: `npm run build`
   - Publish directory: leave default (Netlify uses Next.js plugin)

5. Click **Deploy site**. When the build finishes, open the site URL to test.

## Deploy to GitHub Pages (this repo)

1. Push to `main` — the **Deploy to GitHub Pages** workflow runs and publishes the built site to the `gh-pages` branch.

2. **Turn on GitHub Pages** (once per repo):
   - Repo → **Settings** → **Pages**.
   - Under **Source**, choose **Deploy from a branch**.
   - **Branch**: `gh-pages` → **Folder**: `/ (root)` → **Save**.

3. After a minute or two, the site is at:  
   **https://kennykimtang.github.io/AllGatcha/**
