# 🚑 Emergency Rescue Plan

If your app is stuck or not updating, follow these steps exactly.

## 1. Force a Clean Update
Sometimes the browser or Vercel gets stuck with old code.

**Run these commands in your terminal:**
```bash
# 1. Add all changes
git add .

# 2. Commit with a clear message
git commit -m "Emergency fix: Add auth timeout and safety checks"

# 3. Push to GitHub (triggers Vercel deploy)
git push
```

## 2. Verify Vercel Deployment
1. Go to your Vercel Dashboard.
2. Look at the **latest deployment**.
3. Is it **Green (Ready)** or **Red (Error)**?
   - **If Red:** Click "View Build Logs" and tell me the error.
   - **If Green:** Click "Visit" to open the fresh version.

## 3. Local "Hard Reset" (If testing on laptop)
If you are running `npm run dev` locally:
1. Stop the server (Ctrl+C).
2. Delete the `.next` folder:
   ```bash
   rm -rf .next
   ```
3. Restart:
   ```bash
   npm run dev
   ```

## 4. Check Your Environment
Ensure your `.env.local` file has the correct Supabase keys. If they are missing, the app will hang forever.

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 5. "It's still spinning!"
I added a **5-second safety timer**. 
- Refresh the page.
- Wait 5 seconds.
- It should force the page to load even if the database is slow.

**Report back:**
- "I see the home page now" OR
- "It is still white screen" OR
- "I see an error message: [Error Text]"
