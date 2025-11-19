# Visitor Tracking Setup Guide

This guide explains how to set up visitor tracking and weekly email reports for the CleverBirds website.

## Overview

The tracking system consists of:
1. **Frontend tracking**: A script in `app/page.js` that sends visit data to an API endpoint
2. **API endpoint**: A serverless function that stores visits in Supabase
3. **Database**: Supabase PostgreSQL database to store visit records
4. **Email reports**: Weekly automated emails sent via GitHub Actions and Resend

## Setup Steps

### 1. Set Up Supabase Database

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run the SQL from `supabase-schema.sql`
4. Go to Settings → API and note:
   - **Project URL** (SUPABASE_URL)
   - **Service Role Key** (SUPABASE_SERVICE_KEY) - Keep this secret!

### 2. Deploy API Endpoint (Vercel)

**Option A: Deploy as separate Vercel project (Recommended)**

1. Create a free account at [vercel.com](https://vercel.com)
2. Create a new project:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Set **Root Directory** to `api/` (or create a separate repo/folder for just the API)
   - Framework Preset: "Other"
3. Add environment variables in Vercel dashboard (Settings → Environment Variables):
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_SERVICE_KEY`: Your Supabase service role key
4. Deploy the project
5. Note the deployment URL (e.g., `https://cleverbirds-tracking.vercel.app/api/track`)

**Option B: Deploy API files in same repo**

If you want to deploy the API from the same repository:
1. Create a Vercel project connected to your GitHub repo
2. Vercel will automatically detect the `api/` directory as serverless functions
3. Add the same environment variables as above
4. The API will be available at `https://your-project.vercel.app/api/track`

### 3. Configure Frontend Tracking

1. Add the tracking API URL as a GitHub Secret:
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `TRACKING_API_URL`
   - Value: Your API endpoint URL (e.g., `https://cleverbirds-tracking.vercel.app/api/track`)
   - Click "Add secret"

2. The deployment workflow (`.github/workflows/deploy.yml`) is already configured to use this secret.

**Alternative**: If you prefer not to use secrets, you can hardcode the URL in `app/page.js` by updating the default value in the tracking code.

### 4. Set Up Email Service (Resend)

1. Create a free account at [resend.com](https://resend.com)
2. Verify your sending domain (or use the default `onboarding@resend.dev` for testing)
3. Get your API key from the dashboard
4. Add GitHub Secrets:
   - Go to your GitHub repository → Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `SUPABASE_URL`: Your Supabase project URL
     - `SUPABASE_SERVICE_KEY`: Your Supabase service role key
     - `RESEND_API_KEY`: Your Resend API key
     - `REPORT_EMAIL_TO`: Your email address (where reports will be sent)
     - `REPORT_EMAIL_FROM`: Verified sender email (e.g., `noreply@yourdomain.com`)

### 5. Test the Setup

1. **Test tracking**: Visit your website and check Supabase dashboard → Table Editor → `visits` table for new entries
2. **Test email**: Manually trigger the GitHub Actions workflow (Actions tab → Weekly Visitor Report → Run workflow)

## How It Works

### Visitor Tracking Flow

1. User visits the website
2. Frontend script (`app/page.js`) sends a POST request to the API endpoint
3. API endpoint (`api/track.js`) stores the visit in Supabase
4. Visit is recorded with timestamp and path

### Weekly Report Flow

1. GitHub Actions workflow runs every Monday at 9:00 AM UTC
2. Script (`api/weekly-report.js`) queries Supabase for last 7 days of visits
3. Calculates statistics (total visits, unique pages, daily breakdown)
4. Sends formatted email via Resend
5. You receive the weekly report in your inbox

## Customization

### Change Report Frequency

Edit `.github/workflows/weekly-report.yml` and modify the cron schedule:
- Daily: `0 9 * * *` (every day at 9 AM UTC)
- Weekly: `0 9 * * 1` (every Monday at 9 AM UTC)
- Monthly: `0 9 1 * *` (first day of month at 9 AM UTC)

### Customize Email Template

Edit `api/weekly-report.js` to modify the email HTML template.

### Add More Statistics

Modify `api/weekly-report.js` to add additional queries and statistics to the report.

## Troubleshooting

### Tracking Not Working

- Check browser console for errors
- Verify API endpoint URL is correct
- Check Vercel function logs
- Verify Supabase credentials are correct

### Emails Not Sending

- Check GitHub Actions workflow logs
- Verify all secrets are set correctly
- Check Resend dashboard for email status
- Verify sender email is verified in Resend

### Database Issues

- Check Supabase dashboard for connection issues
- Verify RLS policies are set correctly
- Check table exists and has correct schema

## Cost Estimate

All services used have free tiers that should be sufficient for most use cases:

- **Supabase**: Free tier includes 500MB database, 2GB bandwidth
- **Vercel**: Free tier includes 100GB bandwidth, serverless functions
- **Resend**: Free tier includes 3,000 emails/month
- **GitHub Actions**: Free tier includes 2,000 minutes/month

For a typical academic website, these limits should be more than enough.

## Privacy Considerations

- No personal information is collected (no IP addresses, cookies, or user identifiers)
- Only page path and timestamp are recorded
- Data is stored securely in Supabase
- You can delete visit records at any time from Supabase dashboard

