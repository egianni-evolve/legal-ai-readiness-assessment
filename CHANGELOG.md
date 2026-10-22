## 2026-10-21 - Dependency security remediation

Upgrade Next.js to 16.4.2 and Resend to 6.34.1, and refresh vulnerable transitive packages. Replace the unused Next lint preset, which depends on unpatched braces, with ESLint and TypeScript recommended rules. Replace the removed next lint command with eslint and run it in security CI. Existing unused-variable findings remain warnings.

## 2026-10-21 - Node.js security release

Pin CI to the patched October 21 Node.js release so setup-node cannot select an older cached runtime.

# CHANGELOG — Legal AI Readiness Assessment

## 2026-08-01 — SHIPPED

Marked shipped during the monthly `/audit`. The app is done, live, and no longer under active development.

- **State at ship:** live at https://legal-ai-readiness-assessment.vercel.app/ (verified HTTP 200 on 2026-08-01). Last source change 2026-03-28, so 126 days stable in production with no reported issues.
- **Why now:** the project reads as neglected active work when it is actually finished work. It is LawLab-branded, and LawLab is on hold per the 2026-07-09 pivot to the local Metrowest practice, so no further development is planned.
- **Housekeeping in this commit:** `CHANGELOG.md`, `CLAUDE.md`, and `.env.example` existed in the working tree since the 2026-05-29 audit but were never committed. Committed now so the repo matches the disk.
- **Retrospective:** the two known failure modes are already captured in the memory topic file and worth carrying forward. Resend must be initialized inside the request handler, never at module scope, or the build crashes. The Supabase anon key must be the JWT format, not `sb_publishable_`.
- **Open items deliberately not done** (from the topic file's future-work list): rate limiting on API routes, Resend domain verification so mail sends from lawlab.ai, benchmarking after 50+ completions, a custom domain, and audit logging. These matter only if the app is put back in front of real traffic. Reopen the project before doing any of them.

## 2026-05-29 — CHANGELOG created
- Backfilled during file-hygiene audit. `.env.example` added alongside `.env.local`. Entries below reconstruct known history; future changes logged going forward.

## 2026-03-28 — Last source update
- Most recent git activity prior to CHANGELOG creation. App live on Vercel (Next.js, Supabase, Resend), LawLab AI branded.
