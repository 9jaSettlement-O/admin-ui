# Admin UI deployment

## GitHub Pages

### How deployment works

- **Trigger:** Pushing to the **`main`** or **`temitope9js`** branch runs the "Deploy to GitHub Pages" workflow.
- **What gets deployed:** The workflow builds the app and publishes the `dist/` output to GitHub Pages. The live site is whatever was last successfully built from **`main`** on **this repository**.

### Aligning the repo you push to with the live site

If the dashboard or latest changes don’t show on the live site, it’s usually because a different branch or repo is being used.

1. **Push to the branch that triggers the workflow**  
   The workflow is configured to run only on **`main`**. Pushing to `master`, `develop`, or any other branch will **not** update the GitHub Pages site.  
   - Ensure your default branch is `main`, or always push/merge to `main` when you want to update the live site.

2. **Use the same repo that hosts GitHub Pages**  
   - In GitHub: **Settings → Pages**. Under "Build and deployment", the source should be **"GitHub Actions"** (not "Deploy from a branch").  
   - The URL will be: `https://<owner>.github.io/<repository-name>/`.  
   - Push and merge to **`main` on this same repository**. If you push to a fork or another repo, that repo’s Actions run (if any), and **that** repo’s Pages would update, not the one you expect.

3. **Check what’s actually deployed**  
   - **Actions** tab: open the "Deploy to GitHub Pages" workflow. The run that deployed the current site is the one from the **repository and branch** shown there (e.g. `main`).  
   - **Settings → Pages**: note the published URL. That URL is always tied to **this** repo; pushing to another repo will not change this URL’s content.

**Summary:** To see your dashboard and latest changes on GitHub Pages, push to **`main`** or **`temitope9js`** on the **same repository** that has Pages enabled and is set to use **GitHub Actions**. That way the "link you push to" and the "link that is deployed" are the same.

### Clickable link after push

When you run `git push origin temitope9js`, the line `To github.com:9jaSettlement-O/admin-ui.git` is in **SSH form**, so many terminals (including Cursor’s) don’t turn it into a clickable link. To get a link you can click, run:

```bash
pnpm run repo-url
```

This prints the repo URL in HTTPS form and the GitHub Pages URL, which most terminals will linkify.

### Base URL

The app is built with a base path equal to the repository name, so the site is served at:

`https://<owner>.github.io/<repository-name>/`

For example, if the repo is `admin-ui`, the URL is `https://<owner>.github.io/admin-ui/`. The workflow sets this automatically; no extra config is needed.

---

## AWS (e.g. S3 + CloudFront)

If the app is deployed at the **root** of the domain (e.g. `https://admin.example.com/`), the build must use base path **`/`**. Otherwise assets are requested under a subpath and you get a blank page.

When building for this setup, set:

```bash
VITE_BASE_PATH=/ pnpm run build
```

Then deploy the contents of `dist/` to your web server or CDN. If your AWS deployment is under a subpath (e.g. `https://example.com/admin/`), set `VITE_BASE_PATH=/admin/` (with trailing slash) so it matches the URL.

---

## Local preview of production build

To simulate the GitHub Pages base path locally:

```bash
VITE_BASE_PATH=/admin-ui/ pnpm run build
pnpm run preview
```

Open the URL shown (e.g. `http://localhost:4173/admin-ui/`) to test routing and assets.
