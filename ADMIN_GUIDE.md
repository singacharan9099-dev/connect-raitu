# Connect Raitu - Admin Product Management Guide

## Accessing the Admin Panel

1. **Navigate to Admin Products Page**:
   - URL: `https://your-app.vercel.app/admin/products`
   - Or from main app: Click Profile → Navigate manually to `/admin/products`

2. **Admin Features**:
   - View all products
   - Search products by name or brand
   - Add new products
   - Edit existing products
   - Update prices instantly
   - Manage stock status
   - Delete products

---

## Adding a New Product

1. Click the **"Add Product"** button
2. Fill in the form:
   - **Product Name**: e.g., "Hybrid Tomato Seeds"
   - **Brand**: e.g., "Syngenta"
   - **Category**: Select from Seeds, Fertilizers, Pesticides, Tools
   - **Price**: Selling price in ₹ (e.g., 450)
   - **MRP**: Maximum retail price in ₹ (e.g., 500)
   - **Image URL**: (Optional) Link to product image
   - **Description**: (Optional) Product details
   - **In Stock**: Check if product is available

3. Click **"Add Product"**
4. Product appears immediately in the shop for farmers

---

## Editing Products & Prices

1. Find the product in the list (use search if needed)
2. Click the **Edit (pencil) icon**
3. Update any fields (commonly price for market changes)
4. Click **"Update Product"**
5. Changes reflect instantly for all users

### Quick Price Update:
- Search for the product
- Click Edit
- Change Price and/or MRP
- Save

---

## Managing Stock

- **Mark as Out of Stock**: Uncheck "In Stock" checkbox
- **Mark as In Stock**: Check "In Stock" checkbox
- Out of stock products show "Out of Stock" badge to farmers

---

## Deleting Products

1. Click the **Delete (trash) icon** on the product
2. Confirm deletion
3. Product is removed from the shop immediately

---

## Best Practices

### Regular Updates
- Update prices based on market rates
- Keep stock status current
- Add seasonal products when available

### Product Information
- Use clear, descriptive product names
- Include brand name for authenticity
- Set competitive prices
- Add product images for better sales

### Testing
- Add a test product first
- Verify it appears in the shop
- Test editing and deleting
- Then add real products

---

## Deployment to Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account

### Step 2: Import Project
1. Click "Add New Project"
2. Import your GitHub repository
3. Select `pyro-curiosity` project

### Step 3: Configure Environment Variables
Before deploying, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

**To get these values**:
1. Go to your Supabase project dashboard
2. Click Settings → API
3. Copy "Project URL" and "anon public" key

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Get your production URL: `https://your-app.vercel.app`

### Step 5: Configure Supabase
1. Go to Supabase Dashboard
2. Navigate to Authentication → URL Configuration
3. Add Site URL: `https://your-app.vercel.app`
4. Add Redirect URLs: `https://your-app.vercel.app/**`

---

## Post-Deployment

### Share with Farmers
- **Public URL**: `https://your-app.vercel.app`
- **Admin URL**: `https://your-app.vercel.app/admin/products`

### Testing Checklist
- [ ] Can sign in with Google
- [ ] Products load correctly
- [ ] Can add to cart
- [ ] Can place orders
- [ ] Language switching works
- [ ] Admin can add products
- [ ] Admin can update prices
- [ ] Mobile view works well

---

## Troubleshooting

### Products not showing?
- Check if products exist in Supabase
- Verify environment variables are set correctly
- Check browser console for errors

### Can't add products?
- Ensure you're signed in
- Check Supabase RLS policies allow inserts
- Verify all required fields are filled

### Changes not appearing?
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Check if Supabase update was successful
- Verify correct environment variables

---

## Support

For any issues during deployment or product management:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Use browser dev tools (F12) to see errors

Happy farming! 🌱
