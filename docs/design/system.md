# Design System - Connect Raitu

## 1. Design System Setup

### 1.1 Colors (Tokens)
- **Primary/Green-600:** `#0E8F47` (Main Action)
- **Primary/Green-500:** `#20A958` (Hover/Active)
- **Primary/Green-300:** `#7DD9A7` (Light Accents)
- **Secondary/Blue-600:** `#1E88E5` (Links/Info)
- **Secondary/Teal-500:** `#0FBF83` (Success/Growth)
- **Neutral-900:** `#111827` (Headings)
- **Neutral-700:** `#374151` (Body Text)
- **Neutral-500:** `#6B7280` (Secondary Text)
- **Neutral-300:** `#D1D5DB` (Borders)
- **Neutral-100:** `#F3F4F6` (Backgrounds)
- **Error/Red-600:** `#DC2626`
- **Warning/Amber-600:** `#D97706`
- **Success/Green-700:** `#15803D`

### 1.2 Typography (Inter / SF Pro)
- **Display:** 32px / Bold
- **H1:** 24px / Semi-Bold
- **H2:** 20px / Semi-Bold
- **H3:** 18px / Medium
- **Body:** 16px / Regular
- **Body-Bold:** 16px / Semi-Bold
- **Caption:** 14px / Regular
- **Micro:** 12px / Regular

### 1.3 Spacing Tokens
- `spacing-4`: 4px
- `spacing-8`: 8px
- `spacing-12`: 12px
- `spacing-16`: 16px
- `spacing-20`: 20px
- `spacing-24`: 24px
- `spacing-32`: 32px
- `spacing-40`: 40px

### 1.4 Components (Variants)
- **Buttons:** Primary, Secondary, Outline, Disabled.
- **Inputs:** Default, Error, Search Bar, OTP.
- **Cards:** Product (S/M/L), Advisory, Weather, Mandi Price.
- **Navigation:** Bottom Bar, Top Bar.
- **Feedback:** Toast, Dialog, Bottom Sheet, Skeleton.
- **Chips:** Filter, Tags.

## 5. Component Library Specification

### Buttons
- **Primary:** Green-600 bg, White text, 48px height, rounded-lg.
- **Secondary:** Blue-600 bg, White text.
- **Outline:** Transparent bg, Green-600 border.

### Cards
- **Product Card:** Image (top), Title (H3), Price (Body-Bold), Add Button (Small). Elevation-1 shadow.
- **Advisory Card:** Thumbnail (left), Title (Body-Bold), Excerpt (Caption).

### Input Fields
- **Default:** Neutral-100 bg, Neutral-300 border, 48px height.
- **Focus:** Green-600 border, Ring-2.

## 6. UI Branding Guide

- **Personality:** Trustworthy, Modern, Accessible, Growth-oriented.
- **Palette:** Dominant Green (Nature/Growth) with Blue accents (Technology/Trust).
- **Iconography:** Rounded, filled or outlined (consistent 2px stroke).
- **Shadows:** Soft, diffused shadows (`0 4px 6px -1px rgba(0, 0, 0, 0.1)`).
- **Images:** Authentic photography of Indian farmers and crops. No generic stock photos.

## 7. Accessibility & Localization

- **Touch Targets:** Minimum 48x48px for all interactive elements.
- **Contrast:** WCAG AA compliance (4.5:1 minimum) for text.
- **Localization:**
    - Support for English, Hindi, Telugu.
    - UI must handle text expansion (up to 30% for Hindi/Telugu).
    - Font fallback support for Indian scripts.
- **Offline Mode:** Clear indicators for "No Internet", cached data display.
- **Low-End Devices:** Optimize image sizes (WebP), reduce heavy animations.
