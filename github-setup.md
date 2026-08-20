# GitHub Setup Commands

## Replace YOUR_USERNAME with your actual GitHub username

# 1. Check current branch name
git branch

# 2. Rename to main if needed (skip if already on main)
git branch -M main

# 3. Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/malikal-events.git

# 4. Verify remote was added
git remote -v

# 5. Push to GitHub
git push -u origin main

# 6. Verify the push
git log --oneline -5

## Alternative: If you prefer SSH instead of HTTPS
# git remote add origin git@github.com:YOUR_USERNAME/malikal-events.git
