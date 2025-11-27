# 🚀 Deployment Instructions

You are 3 steps away from being live! Follow these exact instructions.

## Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new) (Log in if needed)
2. **Repository name**: `connect-raitu`
3. **Visibility**: Public (or Private, up to you)
4. Click **Create repository**

## Step 2: Push Your Code

Copy the commands below (replace `YOUR_USERNAME` with your actual GitHub username) and run them in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/connect-raitu.git
git branch -M main
git push -u origin main
```

*(If asked to sign in, follow the browser prompt)*

## Step 3: Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** next to `connect-raitu`
3. In the **Configure Project** screen, click **Environment Variables**
4. Add these two variables (copy from your local `.env.local` file or Supabase dashboard):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**

## 🎉 You're Done!

- Wait ~2 minutes for Vercel to build
- You'll get a URL like `https://connect-raitu.vercel.app`
- Share this URL with farmers!
- Go to `/admin/products` on that URL to manage your shop.
