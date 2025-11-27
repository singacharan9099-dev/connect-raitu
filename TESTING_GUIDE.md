# Admin Panel Testing - Manual Verification Guide

## ⚠️ Automated Testing Limitations

Due to browser automation connectivity issues, manual testing is required. Follow this guide to verify all admin features work correctly.

---

## 🎯 Testing Prerequisites

### 1. Start the Development Server

```bash
cd c:\Users\singa\.gemini\antigravity\playground\pyro-curiosity
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

**Expected Output:**
```
✓ Starting...
- Local: http://localhost:3000 (or 3001 if 3000 is in use)
```

**Note the port number** - use it in all URLs below.

---

## ✅ Admin Panel Feature Tests

### **Test 1: Access Admin Panel**

**Steps:**
1. Navigate to: `http://localhost:3000/admin/products`
2. Page should load successfully

**Expected Result:**
- ✅ Page shows "Products" header
- ✅ Shows total count of products
- ✅ "Add Product" button visible in top right
- ✅ Search bar present
- ✅ List of products (or "No products found" message)

**Screenshot**: Take a screenshot of the admin panel

---

### **Test 2: Add New Product**

**Steps:**
1. Click **"Add Product"** button
2. Form should appear with fields:
   - Product Name
   - Brand
   - Category (dropdown)
   - Price
   - MRP
   - Image URL (optional)
   - Description (optional)
   - In Stock (checkbox)

3. Fill in test data:
   ```
   Product Name: Test Hybrid Tomato Seeds
   Brand: Test Agro
   Category: Seeds
   Price: 299
   MRP: 399
   In Stock: ✓ (checked)
   ```

4. Click **"Add Product"**

**Expected Result:**
- ✅ Form closes automatically
- ✅ Product appears in the list immediately
- ✅ Product shows correct price (₹299)
- ✅ Shows "In Stock" badge (green)
- ✅ Total product count increases by 1

**If it fails:**
- Check browser console (F12) for errors
- Check if Supabase credentials are correct in `.env.local`
- Verify Supabase RLS policies allow INSERT

---

### **Test 3: Search Products**

**Steps:**
1. In the search bar, type part of a product name (e.g., "Tomato")
2. Type a brand name (e.g., "Test")

**Expected Result:**
- ✅ List filters to show only matching products
- ✅ Filtering happens instantly as you type
- ✅ Clearing search shows all products again

---

### **Test 4: Edit Product (Price Update)**

**Steps:**
1. Find the test product you added
2. Click the **Edit button (pencil icon)**
3. Form appears with current product data
4. Change the **Price** from `299` to `249`
5. Click **"Update Product"**

**Expected Result:**
- ✅ Form closes
- ✅ Product shows new price (₹249)
- ✅ Changes appear immediately
- ✅ No console errors

**Critical Test:**
6. Navigate to `/shop` in another tab
7. Find the same product

**Expected:**
- ✅ Product shows updated price (₹249) in the shop too

---

### **Test 5: Stock Management**

**Steps:**
1. Edit the test product again
2. **Uncheck** "In Stock" checkbox
3. Click "Update Product"

**Expected Result:**
- ✅ Badge changes from green "In Stock" to red "Out of Stock"
- ✅ In `/shop`, product shows "Out of Stock" overlay

**Then:**
4. Edit again and **check** "In Stock"
5. Update

**Expected:**
- ✅ Badge returns to green "In Stock"
- ✅ Product is purchasable in shop again

---

### **Test 6: Delete Product**

**Steps:**
1. Click **Delete button (trash icon)** on test product
2. Confirm deletion in the popup

**Expected Result:**
- ✅ Product removed from list immediately
- ✅ Total count decreases by 1
- ✅ Product no longer appears in `/shop`

---

## 🌍 Integration Tests

### **Test 7: Verify in Shop**

**Steps:**
1. Add 2-3 products via admin panel with different categories
2. Navigate to `/shop`

**Expected Result:**
- ✅ All products visible in shop
- ✅ Correct prices displayed
- ✅ Category filters work
- ✅ Can add products to cart

---

### **Test 8: Multi-Language Admin**

**Steps:**
1. On admin page, click **Globe icon** in header
2. Switch to **Telugu**
3. Add a new product

**Expected:**
- ✅ Admin panel translates (if we added translations - currently may be English)
- ✅ Product addition still works
- ✅ Can switch back to English

**Note**: Admin panel is primarily for you (admin), so English-only is acceptable. The shop is what farmers see, which has full translation.

---

## 🛠️ Troubleshooting

### Products Don't Appear After Adding

**Check:**
1. Browser console for errors (F12 → Console tab)
2. Network tab shows successful POST request to Supabase
3. Supabase database actually has the product:
   - Go to Supabase Dashboard
   - Check `products` table
   - Verify new row exists

**Common Fixes:**
- Refresh the page
- Check `.env.local` has correct Supabase credentials
- Verify Supabase RLS policies

### Can't Edit/Delete

**Check:**
- Supabase RLS policies allow UPDATE and DELETE
- Check console for permission errors

### Images Don't Show

**Fix:**
- Use direct image URLs (Unsplash, Imgur, etc.)
- Or leave blank for default placeholder

---

## 📊 Test Results Template

Copy and fill this out:

```
✅ Test 1: Access Admin Panel - PASS/FAIL
✅ Test 2: Add Product - PASS/FAIL
  - Product appears in list: YES/NO
  - Correct details: YES/NO
✅ Test 3: Search Products - PASS/FAIL
✅ Test 4: Edit Price - PASS/FAIL
  - Price updates in admin: YES/NO
  - Price updates in shop: YES/NO
✅ Test 5: Stock Management - PASS/FAIL
✅ Test 6: Delete Product - PASS/FAIL
✅ Test 7: Shop Integration - PASS/FAIL
✅ Test 8: Multi-Language - PASS/FAIL (Optional)

Overall Status: READY FOR DEPLOYMENT / NEEDS FIXES

Issues Found:
1. [Describe any issues]
2. [Describe any issues]
```

---

## 🎬 Next Steps After Testing

### If All Tests Pass:
1. ✅ Admin panel is production-ready
2. ✅ Proceed with GitHub + Vercel deployment
3. ✅ Start testing with farmers

### If Tests Fail:
1. Share error messages/screenshots
2. I'll help fix the issues
3. Retest until everything works

---

**Thank you for testing! 🚀**
