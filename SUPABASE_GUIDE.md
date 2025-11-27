# 🔧 Supabase Production Configuration

**CRITICAL STEP**: For Google Sign-In to work on your live website, you must update Supabase settings.

## Step 1: Get Your Vercel URL
1. Go to your Vercel Dashboard
2. Find your deployed project
3. Copy the **Domain** (e.g., `https://connect-raitu.vercel.app`)

## Step 2: Update Supabase Auth Settings
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project (`pyro-curiosity`)
3. In the left sidebar, click **Authentication**
4. Click **URL Configuration**

## Step 3: Add Production URLs
1. **Site URL**: Paste your Vercel URL: `https://connect-raitu.vercel.app`
2. **Redirect URLs**:
   - Click "Add URL"
   - Add: `https://connect-raitu.vercel.app/**` (The `/**` is important!)
   - Ensure your localhost URLs (`http://localhost:3000/**`) are still there for testing.

3. Click **Save**

## Step 4: Verify Google Cloud (Optional but Recommended)
If you see a "403: redirect_uri_mismatch" error:
1. Go to Google Cloud Console
2. Go to APIs & Services > Credentials
3. Edit your OAuth 2.0 Client ID
4. Add your Vercel URL to "Authorized redirect URIs":
   - `https://connect-raitu.vercel.app/auth/callback` (if using Supabase Auth helpers)
   - Or just rely on Supabase to handle it (usually sufficient)

## ✅ Test It
1. Open your Vercel URL on your phone
2. Try to "Sign in with Google"
3. If it works, you are 100% live!
