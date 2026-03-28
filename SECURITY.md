# Security Policy

## Secret Rotation Schedule

| Secret | Location | Rotation Frequency | Last Rotated |
|--------|----------|-------------------|--------------|
| RESEND_API_KEY | Vercel env vars, .env.local | Every 90 days | 2026-03-28 |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Vercel env vars, .env.local | Publishable key, rotate if compromised | 2026-03-28 |

## Rotation Steps

1. Generate a new key in the provider's dashboard (Resend, Supabase)
2. Update the key in Vercel environment variables (Settings > Environment Variables)
3. Update `.env.local` for local development
4. Redeploy on Vercel
5. Verify the app works with the new key
6. Revoke the old key in the provider's dashboard
7. Update the "Last Rotated" date in this file

## Data Privacy

This application collects email addresses via the lead capture form. Emails are stored in the Supabase `leads` table.

To request deletion of your email data, contact: erika@lawlab.ai

Deletion requests will be processed within 30 days by removing the relevant row from the `leads` table.
