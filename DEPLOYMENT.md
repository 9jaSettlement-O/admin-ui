# Admin UI deployment

## GitHub Pages

### How deployment works

- **Trigger:** Pushing to the **`main`** branch runs the "Deploy to GitHub Pages" workflow.
- **What gets deployed:** The workflow builds the app and publishes the `dist/` output to GitHub Pages. The live site is whatever was last successfully built from **`main`** on **this repository**.

### Aligning the repo you push to with the live site

If the dashboard or latest changes don’t show on the live site, it’s usually because a different branch or repo is being used.

1. **Push to the branch that triggers the workflow**  
   The workflow is configured to run only on **`main`**. Pushing to `temitope9js`, `master`, `develop`, or any other branch will **not** update the GitHub Pages site.  
   - To update the live site, merge your branch into `main` and push, or push directly to `main`.

2. **Use the same repo that hosts GitHub Pages**  
   - In GitHub: **Settings → Pages**. Under "Build and deployment", the source should be **"GitHub Actions"** (not "Deploy from a branch").  
   - The URL will be: `https://<owner>.github.io/<repository-name>/`.  
   - Push and merge to **`main` on this same repository**. If you push to a fork or another repo, that repo’s Actions run (if any), and **that** repo’s Pages would update, not the one you expect.

3. **Check what’s actually deployed**  
   - **Actions** tab: open the "Deploy to GitHub Pages" workflow. The run that deployed the current site is the one from the **repository and branch** shown there (e.g. `main`).  
   - **Settings → Pages**: note the published URL. That URL is always tied to **this** repo; pushing to another repo will not change this URL’s content.

**Summary:** To see your dashboard and latest changes on GitHub Pages, push to **`main`** on the **same repository** that has Pages enabled and is set to use **GitHub Actions**. That way the "link you push to" and the "link that is deployed" are the same.

### "Branch not allowed to deploy" / environment protection rules

If the workflow runs but the deploy step fails with:

- **"Branch 'temitope9js' is not allowed to deploy to github-pages due to environment protection rules"**
- **"The deployment was rejected or didn't satisfy other protection rules"**

then the **`github-pages`** environment has protection rules that limit which branches can deploy (often only `main`). You can either:

- **Option A (recommended):** Deploy to GitHub Pages only from `main`. Merge your branch into `main` when you want to update the live site. The workflow is set to trigger only on `main`, so this is the default.
- **Option B:** Allow another branch (e.g. `temitope9js`) to deploy. A **repo admin** must go to **Settings → Environments → github-pages** → under "Deployment protection rules" or "Deployment branch" add the branch (e.g. `temitope9js`) to the allowed list, or relax the rule so the branch that triggered the workflow can deploy. Until that is done, the deploy step will keep failing for that branch.

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

## AWS Amplify (fix for blank page)

If the app is deployed at the **root** of an Amplify URL (e.g. `https://temitope9js.d3bjewjvqcsuyj.amplifyapp.com/`), the build **must** use base path **`/`**. Otherwise the bundle asks for assets at `/admin-ui/assets/...`, which don’t exist at that path, and the page stays blank.

**Fix for DevOps:** Set the build to use base path `/`:

1. **Amplify Console** → your app → **Hosting** (or **Build settings** / **Environment variables**).
2. Add an **environment variable** for the build:
   - **Name:** `VITE_BASE_PATH`
   - **Value:** `/`
3. **Redeploy** (trigger a new build, or push a commit so Amplify rebuilds).

If the build is configured in the Amplify Console as a single command (e.g. `pnpm run build`), you can instead set the variable in the build command:

```bash
VITE_BASE_PATH=/ pnpm run build
```

After the next successful build, the app at e.g. `https://temitope9js.d3bjewjvqcsuyj.amplifyapp.com/` should load correctly.

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
