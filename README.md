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
