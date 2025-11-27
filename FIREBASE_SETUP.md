# Firebase Setup Guide

## Step 1: Seed Firestore with Sample Products

Run the seeding script to populate your Firestore with sample products:

```bash
npx tsx scripts/seed-firestore.ts
```

This will add 5 sample products to your `products` collection.

## Step 2: Configure Test Phone Numbers

To test authentication without real SMS:

1. Go to [Firebase Console - Authentication](https://console.firebase.google.com/project/connect-raitu/authentication/providers)
2. Click on **Phone** provider
3. Scroll down to **Phone numbers for testing**
4. Click **Add phone number**
5. Add the following:
   - Phone number: `+919999999999`
   - Verification code: `123456`
6. Click **Save**

Now you can test login with:
- Phone: `9999999999`
- OTP: `123456`

## Step 3: Whitelist localhost Domain

Firebase needs to know which domains can use your auth:

1. Go to [Firebase Console - Authentication - Settings](https://console.firebase.google.com/project/connect-raitu/authentication/settings)
2. Scroll to **Authorized domains**
3. Ensure `localhost` is in the list
4. If not, click **Add domain** and add `localhost`

## Common Errors & Solutions

### Error: `auth/invalid-api-key`
- Check that `.env.local` has the correct API key
- Verify the key matches the one in Firebase Console

### Error: `auth/unauthorized-domain`
- Add `localhost` to authorized domains (see Step 3)

### Error: `Firestore permission denied`
- Go to [Firestore Rules](https://console.firebase.google.com/project/connect-raitu/firestore/rules)
- Update rules to allow read/write (for development):
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if true;
      }
    }
  }
  ```
  **WARNING:** This is insecure! Only use for development.

### Products not showing in Shop
- Run the seed script (Step 1)
- Check browser console for errors
- Verify Firestore has data in Firebase Console

## Verification Checklist

- [ ] Seed script ran successfully
- [ ] Test phone number configured
- [ ] localhost is authorized
- [ ] Products visible at `/shop`
- [ ] Can login with test phone number
- [ ] Orders save to Firestore after checkout
