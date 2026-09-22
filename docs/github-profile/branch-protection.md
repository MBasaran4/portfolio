# Branch Protection Strategy for Solo Engineering & Repositories

This document defines professional, sustainable branch protection rules for Mücahit Başaran's public GitHub repositories (`MBasaran4`), calibrated specifically for an active solo developer while maintaining high code quality.

---

## 1. Core Principles for Solo Developer Repositories

1. **Safety without Gridlock**: A strict rule requiring 2 peer code reviews will paralyze a solo developer unless another reviewer is always on call. Branch protection should enforce **automated testing and build verification** rather than bureaucratic bottlenecks.
2. **History Integrity**: Prevent accidental destruction of git history by disallowing force pushes (`git push --force`) on production branches (`main` / `master`).
3. **Green Builds Only**: Never allow unverified code into `main`. The CI workflow (`npm run lint`, `npm run build` or pytest) must pass before merging.

---

## 2. Recommended Branch Protection Settings (`main` Branch)

### A. Pull Request Reviews
- **Require a pull request before merging**: **Enabled** (Recommended for major features).
  - *Required approvals*: **0** (or **1** when collaborating with peers).
  - *Dismiss stale pull request approvals when new commits are pushed*: **Enabled**.
  - *Allow specified actors to bypass pull request requirements*: Enable for `MBasaran4` for urgent hotfixes if desired, but default to feature branch workflow (`feature/...` -> `main`).

### B. Status Checks (Continuous Integration)
- **Require status checks to pass before merging**: **Enabled** (Crucial).
  - *Status checks that are required*: Select the CI workflow (e.g. `Lint & Build Validation` from `.github/workflows/ci.yml`).
  - *Require branches to be up to date before merging*: **Enabled**.
  - *Rationale*: Prevents regressions caused by merging branches that were based on outdated `main` commits.

### C. Git History Integrity
- **Do not allow force pushes**: **Enabled**.
  - *Rationale*: Protects public commit history and prevents lost work from accidental `git push --force`.
- **Do not allow deletions**: **Enabled**.
  - *Rationale*: Prevents accidental deletion of the `main` branch.
- **Require linear history**: **Optional / Recommended** (Squash and merge).
  - *Rationale*: Keeps git log clean and readable without merge commit noise.

---

## 3. Step-by-Step Setup Guide in GitHub UI

1. Open repository on GitHub (`https://github.com/MBasaran4/<repo>`).
2. Click **Settings** > **Branches** in the left sidebar.
3. Under "Branch protection rules", click **Add branch ruleset** or **Add rule**.
4. Set "Branch name pattern" to `main`.
5. Check:
   - [x] **Require status checks to pass before merging** -> search for `validate` or `Lint & Build Validation`.
   - [x] **Require branches to be up to date before merging**.
   - [x] **Block force pushes**.
   - [x] **Block deletions**.
6. Click **Save changes** (or **Create**).
