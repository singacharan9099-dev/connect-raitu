# UI Specification - Connect Raitu

## 1. Screen Inventory

### A. Farmer App (Android-first)
1.  **Onboarding:** 3 slides (Illustrations + "Get Started").
2.  **Login:** Phone Entry, OTP Entry.
3.  **Home Dashboard:** Search, Hero Banner, Categories, Weather, Mandi Prices.
4.  **Marketplace:** Category List, Product List (Grid), Filters.
5.  **Product Detail:** Image, Info, Add to Cart, Reviews.
6.  **Cart & Checkout:** Summary, Coupon, Payment Options, Success.
7.  **AI Plant Doctor:** Camera Capture, Preview, Diagnosis Result.
8.  **AI Crop Planner:** Farm Details Form, Plan Result.
9.  **Advisory Feed:** Article List, Article Detail.
10. **Profile:** User Info, Farm Details, Orders, Settings.

### B. Retailer App
1.  **Login:** Phone + OTP.
2.  **Wholesale Catalog:** Bulk items, Brand filters.
3.  **Inventory:** Stock list, Add/Edit Stock.
4.  **Orders:** Dashboard (Pending/Delivered).
5.  **Credit:** Limit view, Payment history.

### C. Admin Panel (Web)
1.  **Dashboard:** KPI Cards, Charts.
2.  **Product Manager:** SKU List, Edit Form.
3.  **Order Manager:** List View, Detail View.
4.  **Advisory CMS:** Editor, Publish.
5.  **Analytics:** User Stats, Reports.

## 2. Low-Fidelity Wireframes (ASCII)

### 2.3 Home Dashboard (Farmer)
```
[Header: Menu | Connect Raitu | Cart]
[Search Bar: "Search seeds, tools..."]
-------------------------------------
[Hero Banner: "Kharif Season Sale"]
-------------------------------------
[Categories]
(Seeds) (Fertilizer) (Pesticides) (Tools)
-------------------------------------
[Weather Widget]
[Hyderabad: 28°C | Rain likely]
-------------------------------------
[Mandi Prices]
[Tomato: ₹20/kg | Onion: ₹30/kg]
-------------------------------------
[Recommended Products]
[Img] [Img]
[Name] [Name]
[₹500] [₹1200]
-------------------------------------
[Bottom Nav: Home | Shop | Doctor | Advisory | Profile]
```

### 2.5 Product Detail Page
```
[Header: < Back | Product Details | Cart]
-------------------------------------
[       Product Image       ]
[       (Carousel)          ]
-------------------------------------
[Product Name: Hybrid Tomato Seeds]
[Brand: Syngenta]
[Rating: ★★★★☆ (120)]
[Price: ₹450] [MRP: ₹500]
-------------------------------------
[Quantity Selector: - 1 +]
[Button: Add to Cart]
-------------------------------------
[Description (Accordion) v]
[Specifications (Accordion) v]
-------------------------------------
[Similar Products]
[Img] [Img]
```

## 3. High-Fidelity UI Directions

### Home Dashboard
- **Layout:** Vertical scroll, sticky top search, fixed bottom nav.
- **Colors:** White bg, Green-600 primary, Neutral-100 section dividers.
- **Typography:** H2 for section titles ("Categories"), Body for product names.
- **Components:** `Card/Product/Small`, `Widget/Weather`, `Nav/Bottom`.
- **Spacing:** 16px padding container, 12px gap between sections.

### AI Plant Doctor (Result)
- **Layout:** Image preview (top 30%), Diagnosis card (overlapping).
- **Colors:** Red-50 bg for disease detection, Green-50 for healthy.
- **Components:** `Card/Diagnosis`, `Button/Primary` ("View Remedies").
- **Motion:** Slide-up card animation on result load.

## 4. UI Flows

### Login Flow
`Splash -> Onboarding -> Phone Entry -> OTP Entry -> Home Dashboard`

### Purchase Flow
`Home -> Category -> Product List -> PDP -> Add to Cart -> Cart -> Checkout -> Payment -> Success -> Home`

### Plant Doctor Flow
`Home -> Doctor Tab -> Camera Permission -> Capture/Upload -> Analyzing (Loader) -> Diagnosis Result -> View Remedies -> Add Remedy to Cart`
