"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "te" | "hi";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.shop": "Shop",
        "nav.orders": "Orders",
        "nav.profile": "Profile",

        // Home Page
        "home.welcome": "Welcome back",
        "home.search": "Search for seeds, fertilizers...",
        "home.categories": "Categories",
        "home.popular": "Popular Products",
        "home.recommended": "Recommended",
        "home.viewAll": "View All",
        "home.mandiPrices": "Mandi Prices",
        "home.shopNow": "Shop Now",

        // Auth & Onboarding
        "onboard.welcome": "Welcome to Connect Raitu",
        "onboard.desc": "Your digital farming companion",
        "onboard.getStarted": "Get Started",
        "onboard.skip": "Skip",
        "onboard.next": "Next",
        "login.title": "Sign In",
        "login.googleSignIn": "Sign in with Google",
        "login.continue": "Continue",

        // Shop
        "shop.title": "Shop",
        "shop.search": "Search products...",
        "shop.allCategories": "All Categories",
        "shop.addToCart": "Add to Cart",
        "shop.outOfStock": "Out of Stock",
        "shop.filters": "Filters",
        "shop.sortBy": "Sort By",

        // Product Details
        "product.details": "Product Details",
        "product.description": "Description",
        "product.brand": "Brand",
        "product.category": "Category",
        "product.price": "Price",
        "product.mrp": "MRP",
        "product.addToCart": "Add to Cart",
        "product.buyNow": "Buy Now",

        // Cart
        "cart.title": "My Cart",
        "cart.empty": "Your cart is empty",
        "cart.emptyDesc": "Add items to get started",
        "cart.shopNow": "Shop Now",
        "cart.remove": "Remove",
        "cart.total": "Total",
        "cart.subtotal": "Subtotal",
        "cart.checkout": "Proceed to Checkout",
        "cart.items": "items",

        // Checkout
        "checkout.title": "Checkout",
        "checkout.deliveryAddress": "Delivery Address",
        "checkout.addressLine1": "Address Line 1",
        "checkout.addressLine2": "Address Line 2 (Optional)",
        "checkout.city": "City/Village",
        "checkout.pincode": "Pincode",
        "checkout.paymentMethod": "Payment Method",
        "checkout.cod": "Cash on Delivery",
        "checkout.online": "Online Payment",
        "checkout.orderSummary": "Order Summary",
        "checkout.placeOrder": "Place Order",

        // Orders
        "orders.title": "My Orders",
        "orders.empty": "No orders yet",
        "orders.emptyDesc": "Your orders will appear here",
        "orders.orderDetails": "Order Details",
        "orders.orderId": "Order ID",
        "orders.orderDate": "Order Date",
        "orders.status": "Status",
        "orders.total": "Total",
        "orders.items": "Items",
        "orders.deliveryAddress": "Delivery Address",
        "orders.paymentMethod": "Payment Method",
        "orders.processing": "Processing",
        "orders.shipped": "Shipped",
        "orders.delivered": "Delivered",

        // Profile
        "profile.title": "My Profile",
        "profile.editProfile": "Edit Profile",
        "profile.myOrders": "My Orders",
        "profile.myAddresses": "My Addresses",
        "profile.changeLanguage": "Change Language",
        "profile.helpSupport": "Help & Support",
        "profile.logout": "Log Out",
        "profile.totalOrders": "Total Orders",
        "profile.totalSavings": "Total Savings",
        "profile.fullName": "Full Name",
        "profile.phoneNumber": "Phone Number",
        "profile.saveChanges": "Save Changes",
        "profile.cancel": "Cancel",

        // Addresses
        "address.title": "My Addresses",
        "address.addNew": "Add New Address",
        "address.type": "Address Type",
        "address.home": "Home",
        "address.farm": "Farm",
        "address.other": "Other",
        "address.line1": "Address Line 1",
        "address.line2": "Address Line 2",
        "address.city": "City/Village",
        "address.pincode": "Pincode",
        "address.save": "Save Address",
        "address.delete": "Delete",

        // Language
        "language.title": "Select Language",
        "language.english": "English",
        "language.telugu": "Telugu",
        "language.hindi": "Hindi",

        // Support
        "support.title": "Help & Support",
        "support.needHelp": "Need immediate help?",
        "support.availability": "Our support team is available 9 AM - 6 PM",
        "support.callUs": "Call Us",
        "support.emailSupport": "Email Support",
        "support.whatsapp": "WhatsApp",
        "support.chatWithUs": "Chat with us",

        // AI Features
        "ai.doctor.title": "AI Plant Doctor",
        "ai.doctor.subtitle": "Identify Plant Diseases",
        "ai.doctor.description": "Upload a photo of your affected crop to get instant diagnosis and treatment advice.",
        "ai.doctor.uploadImage": "Upload Image",
        "ai.doctor.takePhoto": "Take Photo",
        "ai.doctor.diagnose": "Diagnose Issue",
        "ai.doctor.analyzing": "Analyzing...",
        "ai.doctor.diagnosis": "Diagnosis",
        "ai.doctor.treatment": "Treatment",
        "ai.doctor.tryAgain": "Try Again",

        "ai.planner.title": "Crop Planner",
        "ai.planner.subtitle": "Smart Crop Planning",
        "ai.planner.description": "Get personalized crop recommendations based on your soil, season, and land area.",
        "ai.planner.soilType": "Soil Type",
        "ai.planner.season": "Season",
        "ai.planner.landArea": "Land Area (Acres)",
        "ai.planner.generatePlan": "Generate Plan",
        "ai.planner.generating": "Generating...",
        "ai.planner.recommendations": "Recommended Crops",
        "ai.planner.startOver": "Start Over",

        // Common
        "common.loading": "Loading...",
        "common.error": "Error",
        "common.success": "Success",
        "common.confirm": "Confirm",
        "common.cancel": "Cancel",
        "common.save": "Save",
        "common.delete": "Delete",
        "common.edit": "Edit",
        "common.add": "Add",
        "common.remove": "Remove",
        "common.back": "Back",
        "common.next": "Next",
        "common.previous": "Previous",
        "common.close": "Close",
        "common.search": "Search",
        "common.filter": "Filter",
        "common.sort": "Sort",
    },
    te: {
        // Navigation
        "nav.home": "హోమ్",
        "nav.shop": "షాపు",
        "nav.orders": "ఆర్డర్లు",
        "nav.profile": "ప్రొఫైల్",

        // Home Page
        "home.welcome": "స్వాగతం",
        "home.search": "విత్తనాలు, ఎరువుల కోసం వెతకండి...",
        "home.categories": "వర్గాలు",
        "home.popular": "ప్రసిద్ధ ఉత్పత్తులు",
        "home.recommended": "సిఫార్సు చేయబడినవి",
        "home.viewAll": "అన్నీ చూడండి",
        "home.mandiPrices": "మండి ధరలు",
        "home.shopNow": "ఇప్పుడు షాపింగ్ చేయండి",

        // Auth & Onboarding
        "onboard.welcome": "కనెక్ట్ రైతుకు స్వాగతం",
        "onboard.desc": "మీ డిజిటల్ వ్యవసాయ సహాయకుడు",
        "onboard.getStarted": "ప్రారంభించండి",
        "onboard.skip": "దాటవేయండి",
        "onboard.next": "తరువాత",
        "login.title": "సైన్ ఇన్",
        "login.googleSignIn": "గూగుల్‌తో సైన్ ఇన్ చేయండి",
        "login.continue": "కొనసాగించు",

        // Shop
        "shop.title": "షాపు",
        "shop.search": "ఉత్పత్తులను శోధించండి...",
        "shop.allCategories": "అన్ని వర్గాలు",
        "shop.addToCart": "కార్ట్‌కు జోడించండి",
        "shop.outOfStock": "స్టాక్ అయిపోయింది",
        "shop.filters": "ఫిల్టర్లు",
        "shop.sortBy": "క్రమపరచు",

        // Product Details
        "product.details": "ఉత్పత్తి వివరాలు",
        "product.description": "వివరణ",
        "product.brand": "బ్రాండ్",
        "product.category": "వర్గం",
        "product.price": "ధర",
        "product.mrp": "MRP",
        "product.addToCart": "కార్ట్‌కు జోడించండి",
        "product.buyNow": "ఇప్పుడు కొనండి",

        // Cart
        "cart.title": "నా కార్ట్",
        "cart.empty": "మీ కార్ట్ ఖాళీగా ఉంది",
        "cart.emptyDesc": "ప్రారంభించడానికి వస్తువులను జోడించండి",
        "cart.shopNow": "ఇప్పుడు షాపింగ్ చేయండి",
        "cart.remove": "తొలగించు",
        "cart.total": "మొత్తం",
        "cart.subtotal": "ఉప మొత్తం",
        "cart.checkout": "చెక్‌అవుట్‌కు వెళ్లండి",
        "cart.items": "వస్తువులు",

        // Checkout
        "checkout.title": "చెక్‌అవుట్",
        "checkout.deliveryAddress": "డెలివరీ చిరునామా",
        "checkout.addressLine1": "చిరునామా లైన్ 1",
        "checkout.addressLine2": "చిరునామా లైన్ 2 (ఐచ్ఛికం)",
        "checkout.city": "నగరం/గ్రామం",
        "checkout.pincode": "పిన్‌కోడ్",
        "checkout.paymentMethod": "చెల్లింపు పద్ధతి",
        "checkout.cod": "క్యాష్ ఆన్ డెలివరీ",
        "checkout.online": "ఆన్‌లైన్ చెల్లింపు",
        "checkout.orderSummary": "ఆర్డర్ సారాంశం",
        "checkout.placeOrder": "ఆర్డర్ చేయండి",

        // Orders
        "orders.title": "నా ఆర్డర్లు",
        "orders.empty": "ఇంకా ఆర్డర్లు లేవు",
        "orders.emptyDesc": "మీ ఆర్డర్లు ఇక్కడ కనిపిస్తాయి",
        "orders.orderDetails": "ఆర్డర్ వివరాలు",
        "orders.orderId": "ఆర్డర్ ID",
        "orders.orderDate": "ఆర్డర్ తేదీ",
        "orders.status": "స్థితి",
        "orders.total": "మొత్తం",
        "orders.items": "వస్తువులు",
        "orders.deliveryAddress": "డెలివరీ చిరునామా",
        "orders.paymentMethod": "చెల్లింపు పద్ధతి",
        "orders.processing": "ప్రాసెస్ అవుతోంది",
        "orders.shipped": "రవాణా చేయబడింది",
        "orders.delivered": "డెలివరీ అయింది",

        // Profile
        "profile.title": "నా ప్రొఫైల్",
        "profile.editProfile": "ప్రొఫైల్ సవరించు",
        "profile.myOrders": "నా ఆర్డర్లు",
        "profile.myAddresses": "నా చిరునామాలు",
        "profile.changeLanguage": "భాషను మార్చండి",
        "profile.helpSupport": "సహాయం & మద్దతు",
        "profile.logout": "లాగ్ అవుట్",
        "profile.totalOrders": "మొత్తం ఆర్డర్లు",
        "profile.totalSavings": "మొత్తం ఆదా",
        "profile.fullName": "పూర్తి పేరు",
        "profile.phoneNumber": "ఫోన్ నంబర్",
        "profile.saveChanges": "మార్పులను సేవ్ చేయండి",
        "profile.cancel": "రద్దు చేయండి",

        // Addresses
        "address.title": "నా చిరునామాలు",
        "address.addNew": "కొత్త చిరునామా జోడించండి",
        "address.type": "చిరునామా రకం",
        "address.home": "ఇల్లు",
        "address.farm": "పొలం",
        "address.other": "ఇతర",
        "address.line1": "చిరునామా లైన్ 1",
        "address.line2": "చిరునామా లైన్ 2",
        "address.city": "నగరం/గ్రామం",
        "address.pincode": "పిన్‌కోడ్",
        "address.save": "చిరునామా సేవ్ చేయండి",
        "address.delete": "తొలగించు",

        // Language
        "language.title": "భాషను ఎంచుకోండి",
        "language.english": "ఆంగ్లం",
        "language.telugu": "తెలుగు",
        "language.hindi": "హిందీ",

        // Support
        "support.title": "సహాయం & మద్దతు",
        "support.needHelp": "తక్షణ సహాయం అవసరమా?",
        "support.availability": "మా సపోర్ట్ టీమ్ ఉదయం 9 నుండి సాయంత్రం 6 వరకు అందుబాటులో ఉంటుంది",
        "support.callUs": "మాకు కాల్ చేయండి",
        "support.emailSupport": "ఇమెయిల్ మద్దతు",
        "support.whatsapp": "వాట్సాప్",
        "support.chatWithUs": "మాతో చాట్ చేయండి",

        // AI Features
        "ai.doctor.title": "AI ప్లాంట్ డాక్టర్",
        "ai.doctor.subtitle": "మొక్కల వ్యాధులను గుర్తించండి",
        "ai.doctor.description": "తక్షణ నిర్ధారణ మరియు చికిత్స సలహా కోసం మీ ప్రభావిత పంట ఫోటోను అప్‌లోడ్ చేయండి.",
        "ai.doctor.uploadImage": "చిత్రాన్ని అప్‌లోడ్ చేయండి",
        "ai.doctor.takePhoto": "ఫోటో తీయండి",
        "ai.doctor.diagnose": "సమస్యను నిర్ధారించండి",
        "ai.doctor.analyzing": "విశ్లేషిస్తోంది...",
        "ai.doctor.diagnosis": "నిర్ధారణ",
        "ai.doctor.treatment": "చికిత్స",
        "ai.doctor.tryAgain": "మళ్లీ ప్రయత్నించండి",

        "ai.planner.title": "పంట ప్లానర్",
        "ai.planner.subtitle": "స్మార్ట్ పంట ప్లానింగ్",
        "ai.planner.description": "మీ నేల, సీజన్ మరియు భూమి విస్తీర్ణం ఆధారంగా వ్యక్తిగతీకరించిన పంట సిఫార్సులను పొందండి.",
        "ai.planner.soilType": "నేల రకం",
        "ai.planner.season": "సీజన్",
        "ai.planner.landArea": "భూమి విస్తీర్ణం (ఎకరాలు)",
        "ai.planner.generatePlan": "ప్లాన్ రూపొందించండి",
        "ai.planner.generating": "రూపొందిస్తోంది...",
        "ai.planner.recommendations": "సిఫార్సు చేయబడిన పంటలు",
        "ai.planner.startOver": "మళ్లీ ప్రారంభించండి",

        // Common
        "common.loading": "లోడ్ అవుతోంది...",
        "common.error": "లోపం",
        "common.success": "విజయం",
        "common.confirm": "నిర్ధారించు",
        "common.cancel": "రద్దు చేయండి",
        "common.save": "సేవ్ చేయండి",
        "common.delete": "తొలగించు",
        "common.edit": "సవరించు",
        "common.add": "జోడించు",
        "common.remove": "తీసివేయండి",
        "common.back": "వెనుకకు",
        "common.next": "తరువాత",
        "common.previous": "మునుపటిది",
        "common.close": "మూసివేయండి",
        "common.search": "శోధించండి",
        "common.filter": "ఫిల్టర్",
        "common.sort": "క్రమపరచు",
    },
    hi: {
        // Navigation
        "nav.home": "होम",
        "nav.shop": "दुकान",
        "nav.orders": "ऑर्डर",
        "nav.profile": "प्रोफ़ाइल",

        // Home Page
        "home.welcome": "स्वागत",
        "home.search": "बीज, उर्वरक खोजें...",
        "home.categories": "श्रेणियाँ",
        "home.popular": "लोकप्रिय उत्पाद",
        "home.recommended": "अनुशंसित",
        "home.viewAll": "सभी देखें",
        "home.mandiPrices": "मंडी दरें",
        "home.shopNow": "अभी खरीदें",

        // Auth & Onboarding
        "onboard.welcome": "कनेक्ट रायतू में आपका स्वागत है",
        "onboard.desc": "आपका डिजिटल कृषि साथी",
        "onboard.getStarted": "शुरू करें",
        "onboard.skip": "छोड़ें",
        "onboard.next": "अगला",
        "login.title": "साइन इन",
        "login.googleSignIn": "Google से साइन इन करें",
        "login.continue": "जारी रखें",

        // Shop
        "shop.title": "दुकान",
        "shop.search": "उत्पाद खोजें...",
        "shop.allCategories": "सभी श्रेणियाँ",
        "shop.addToCart": "कार्ट में डालें",
        "shop.outOfStock": "स्टॉक में नहीं",
        "shop.filters": "फ़िल्टर",
        "shop.sortBy": "क्रमबद्ध करें",

        // Product Details
        "product.details": "उत्पाद विवरण",
        "product.description": "विवरण",
        "product.brand": "ब्रांड",
        "product.category": "श्रेणी",
        "product.price": "मूल्य",
        "product.mrp": "एमआरपी",
        "product.addToCart": "कार्ट में डालें",
        "product.buyNow": "अभी खरीदें",

        // Cart
        "cart.title": "मेरी गाड़ी",
        "cart.empty": "आपकी गाड़ी खाली है",
        "cart.emptyDesc": "शुरू करने के लिए आइटम जोड़ें",
        "cart.shopNow": "अभी खरीदें",
        "cart.remove": "हटाएं",
        "cart.total": "कुल",
        "cart.subtotal": "उप-योग",
        "cart.checkout": "चेकआउट के लिए आगे बढ़ें",
        "cart.items": "आइटम",

        // Checkout
        "checkout.title": "चेकआउट",
        "checkout.deliveryAddress": "डिलीवरी पता",
        "checkout.addressLine1": "पता लाइन 1",
        "checkout.addressLine2": "पता लाइन 2 (वैकल्पिक)",
        "checkout.city": "शहर/गाँव",
        "checkout.pincode": "पिनकोड",
        "checkout.paymentMethod": "भुगतान का तरीका",
        "checkout.cod": "कैश ऑन डिलीवरी",
        "checkout.online": "ऑनलाइन भुगतान",
        "checkout.orderSummary": "ऑर्डर सारांश",
        "checkout.placeOrder": "ऑर्डर करें",

        // Orders
        "orders.title": "मेरे ऑर्डर",
        "orders.empty": "अभी तक कोई ऑर्डर नहीं",
        "orders.emptyDesc": "आपके ऑर्डर यहां दिखाई देंगे",
        "orders.orderDetails": "ऑर्डर विवरण",
        "orders.orderId": "ऑर्डर ID",
        "orders.orderDate": "ऑर्डर तिथि",
        "orders.status": "स्थिति",
        "orders.total": "कुल",
        "orders.items": "आइटम",
        "orders.deliveryAddress": "डिलीवरी पता",
        "orders.paymentMethod": "भुगतान का तरीका",
        "orders.processing": "प्रक्रिया में",
        "orders.shipped": "भेज दिया गया",
        "orders.delivered": "डिलीवर हो गया",

        // Profile
        "profile.title": "मेरी प्रोफ़ाइल",
        "profile.editProfile": "प्रोफ़ाइल संपादित करें",
        "profile.myOrders": "मेरे ऑर्डर",
        "profile.myAddresses": "मेरे पते",
        "profile.changeLanguage": "भाषा बदलें",
        "profile.helpSupport": "सहायता और समर्थन",
        "profile.logout": "लॉग आउट",
        "profile.totalOrders": "कुल ऑर्डर",
        "profile.totalSavings": "कुल बचत",
        "profile.fullName": "पूरा नाम",
        "profile.phoneNumber": "फ़ोन नंबर",
        "profile.saveChanges": "परिवर्तन सहेजें",
        "profile.cancel": "रद्द करें",

        // Addresses
        "address.title": "मेरे पते",
        "address.addNew": "नया पता जोड़ें",
        "address.type": "पता प्रकार",
        "address.home": "घर",
        "address.farm": "खेत",
        "address.other": "अन्य",
        "address.line1": "पता लाइन 1",
        "address.line2": "पता लाइन 2",
        "address.city": "शहर/गाँव",
        "address.pincode": "पिनकोड",
        "address.save": "पता सहेजें",
        "address.delete": "हटाएं",

        // Language
        "language.title": "भाषा चुनें",
        "language.english": "अंग्रेज़ी",
        "language.telugu": "तेलुगू",
        "language.hindi": "हिंदी",

        // Support
        "support.title": "सहायता और समर्थन",
        "support.needHelp": "तत्काल सहायता चाहिए?",
        "support.availability": "हमारी सहायता टीम सुबह 9 बजे से शाम 6 बजे तक उपलब्ध है",
        "support.callUs": "हमें कॉल करें",
        "support.emailSupport": "ईमेल समर्थन",
        "support.whatsapp": "व्हाट्सएप",
        "support.chatWithUs": "हमसे चैट करें",

        // AI Features
        "ai.doctor.title": "AI प्लांट डॉक्टर",
        "ai.doctor.subtitle": "पौधों की बीमारियों की पहचान करें",
        "ai.doctor.description": "तत्काल निदान और उपचार सलाह के लिए अपनी प्रभावित फसल की तस्वीर अपलोड करें।",
        "ai.doctor.uploadImage": "चित्र अपलोड करें",
        "ai.doctor.takePhoto": "फोटो लें",
        "ai.doctor.diagnose": "समस्या का निदान करें",
        "ai.doctor.analyzing": "विश्लेषण कर रहे हैं...",
        "ai.doctor.diagnosis": "निदान",
        "ai.doctor.treatment": "उपचार",
        "ai.doctor.tryAgain": "फिर कोशिश करें",

        "ai.planner.title": "फसल योजनाकार",
        "ai.planner.subtitle": "स्मार्ट फसल योजना",
        "ai.planner.description": "अपनी मिट्टी, मौसम और भूमि क्षेत्र के आधार पर व्यक्तिगत फसल सिफारिशें प्राप्त करें।",
        "ai.planner.soilType": "मिट्टी का प्रकार",
        "ai.planner.season": "मौसम",
        "ai.planner.landArea": "भूमि क्षेत्र (एकड़)",
        "ai.planner.generatePlan": "योजना बनाएं",
        "ai.planner.generating": "बना रहे हैं...",
        "ai.planner.recommendations": "अनुशंसित फसलें",
        "ai.planner.startOver": "फिर से शुरू करें",

        // Common
        "common.loading": "लोड हो रहा है...",
        "common.error": "त्रुटि",
        "common.success": "सफलता",
        "common.confirm": "पुष्टि करें",
        "common.cancel": "रद्द करें",
        "common.save": "सहेजें",
        "common.delete": "हटाएं",
        "common.edit": "संपादित करें",
        "common.add": "जोड़ें",
        "common.remove": "हटाएं",
        "common.back": "वापस",
        "common.next": "अगला",
        "common.previous": "पिछला",
        "common.close": "बंद करें",
        "common.search": "खोजें",
        "common.filter": "फ़िल्टर",
        "common.sort": "क्रमबद्ध",
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    useEffect(() => {
        const savedLang = localStorage.getItem("language") as Language;
        if (savedLang) setLanguage(savedLang);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const t = (key: string) => {
        return (translations[language] as any)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
