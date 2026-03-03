#!/usr/bin/env bash
# Print the repo URL in clickable HTTPS form (git push shows SSH form which many terminals don't linkify).
set -e
origin=$(git remote get-url origin 2>/dev/null || true)
if [ -z "$origin" ]; then
  echo "No git remote 'origin' found."
  exit 1
fi
# Convert git@github.com:owner/repo.git or https://github.com/owner/repo.git to https://github.com/owner/repo
if [[ "$origin" == git@github.com:* ]]; then
  path="${origin#git@github.com:}"
  path="${path%.git}"
  echo "https://github.com/${path}"
elif [[ "$origin" == https://github.com/* ]]; then
  echo "${origin%.git}"
else
  echo "$origin"
fi
# GitHub Pages URL (project site)
if [[ "$origin" == *github.com* ]]; then
  if [[ "$origin" == git@github.com:* ]]; then
    path="${origin#git@github.com:}"
    path="${path%.git}"
    org="${path%%/*}"
    repo_name="${path##*/}"
  else
    org=$(echo "$origin" | sed -n 's|.*github.com/\([^/]*\)/.*|\1|p')
    repo_name=$(basename "$origin" .git)
  fi
  echo ""
  echo "GitHub Pages: https://${org}.github.io/${repo_name}/"
fi
