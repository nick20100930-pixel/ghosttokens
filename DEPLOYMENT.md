# GhostTokens Deployment Guide

## Status: Ready for Deployment

### 1. Database Migration

Execute the schema on Supabase:

**URL:** https://supabase.com/dashboard/project/kefboqxcnzuccntmhmqk/sql/new

**File:** `supabase/migrations/001_initial_schema.sql`

Copy the entire file content and execute in the SQL editor.

---

### 2. Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)

1. Push code to GitHub:
```bash
cd /Users/nickmalyugin/Downloads/GhostTokens
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Add environment variables (see below)
5. Deploy

#### Option B: Vercel CLI (if network issues resolved)

```bash
cd /Users/nickmalyugin/Downloads/GhostTokens
vercel login
vercel
```

---

### 3. Environment Variables

Add these to Vercel project settings:

```
NEXT_PUBLIC_SUPABASE_URL=https://kefboqxcnzuccntmhmqk.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlZmJvcXhjbnp1Y2NudG1obXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NTI2OTIsImV4cCI6MjA4NTMyODY5Mn0.GDFG-s8vefmdp88cOWyyxymx5IpqRgXrYhjRFne544A

SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlZmJvcXhjbnp1Y2NudG1obXFrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTc1MjY5MiwiZXhwIjoyMDg1MzI4NjkyfQ.uJ8sTbW6NRdr_JK0iMmlK6ZOQlCuh8T372tAOefH27Y

ENCRYPTION_KEY=e4bdde0f04743f3cc1a49f1be0fb42168751d7d1129a91e789d79a238056ba31

NEXT_PUBLIC_URL=https://your-project.vercel.app

# Stripe (add your keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... (configure after first deploy)
```

---

### 4. Configure Stripe Webhook

After first deployment:

1. Get production URL from Vercel
2. Stripe Dashboard → Webhooks → Add endpoint
3. URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy webhook signing secret
6. Add `STRIPE_WEBHOOK_SECRET` to Vercel
7. Redeploy

---

### 5. Create Admin User

After deployment:

1. Sign up via production site
2. Get user ID from Supabase dashboard (auth.users table)
3. Run in SQL editor:
```sql
UPDATE profiles SET role = 'admin' WHERE id = '<user-id>';
```

---

## Next Steps

- [ ] Execute database migration
- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Configure environment variables
- [ ] Set up Stripe webhook
- [ ] Create admin user
- [ ] Add products via admin dashboard
- [ ] Test checkout flow
