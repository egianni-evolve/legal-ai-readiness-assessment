# CLAUDE.md — Legal AI Readiness Assessment

## What This Project Is

A web-based assessment tool that helps legal teams evaluate their readiness for AI adoption across five dimensions: Data & Document Readiness, Process Maturity, Technology Infrastructure, Governance & Risk, and People & Culture. Built and branded for LawLab AI. Live in production.

## Current State

- Live on Vercel
- Assessment flow and scoring functional
- Responses captured in Supabase
- Results emailed via Resend

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router), TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (Postgres) |
| Email | Resend |
| Deployment | Vercel |

## Branding

LawLab AI. Not Erika Gianni personal brand. Not Designed on Purpose.

## Branch Strategy

- Work on `develop` or a feature branch
- Never push directly to `main` without testing
- Push to `main` triggers production deploy on Vercel

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
```

## Coding Conventions

- This is a live production app — test locally before pushing to main
- Run `/security-audit` before any significant changes merge to main
- Keep the assessment flow and scoring logic in sync with LawLab AI's positioning
