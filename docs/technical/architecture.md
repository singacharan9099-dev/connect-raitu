# Technical Architecture - Connect Raitu

## 3. System Architecture (High-Level Tech Blueprint)

### Frontend
- **Farmer App:** Android-first (React Native or Flutter) for broad device compatibility.
- **Retailer App:** Android (React Native/Flutter).
- **Admin Dashboard:** Web App (Next.js + React).

### Backend
- **Microservices:** NestJS (Node.js) or FastAPI (Python) for AI services.
- **API Gateway:** Kong or Nginx for routing, rate limiting, and auth.
- **Authentication:** JWT + OTP login via Firebase Auth or custom solution.

### Database & Storage
- **Primary DB:** PostgreSQL for relational data (Users, Orders, Inventory).
- **Caching:** Redis for session management and frequent queries (Mandi prices).
- **Search:** Elasticsearch for product and content search.
- **Object Storage:** AWS S3 / Google Cloud Storage for images (Plant Doctor, Products).

### AI Layer
- **Plant Disease Detection:** CNN models (ResNet/EfficientNet) trained on plant disease datasets (e.g., PlantVillage). Hosted on FastAPI.
- **Crop Advisory LLM:** Fine-tuned LLM (Llama 3 / Mistral) or RAG pipeline with vector DB (Pinecone/Milvus) for localized advisory.
- **Recommendation Engine:** Collaborative filtering for product recommendations.

### Notifications
- **Channels:** Firebase Cloud Messaging (FCM) for push, SMS gateway (Twilio/Gupshup) for transactional alerts.

### Scalability
- **Containerization:** Docker for all services.
- **Orchestration:** Kubernetes (K8s) for scaling microservices.
- **CI/CD:** GitHub Actions / GitLab CI.

## 5. Database Schema (Tables + Relationships)

### Users
- `id` (UUID, PK)
- `phone` (String, Unique)
- `role` (Enum: FARMER, RETAILER, ADMIN, AGENT)
- `created_at` (Timestamp)

### FarmerProfile
- `user_id` (UUID, FK -> Users)
- `name` (String)
- `language_pref` (Enum)
- `location` (Point)

### RetailerProfile
- `user_id` (UUID, FK -> Users)
- `shop_name` (String)
- `gst_number` (String)
- `credit_limit` (Decimal)

### Products
- `id` (UUID, PK)
- `name` (String)
- `category_id` (UUID, FK -> Categories)
- `price` (Decimal)
- `sku` (String)
- `image_url` (String)

### Orders
- `id` (UUID, PK)
- `user_id` (UUID, FK -> Users)
- `status` (Enum: PENDING, CONFIRMED, SHIPPED, DELIVERED)
- `total_amount` (Decimal)
- `payment_status` (Enum)

### OrderItems
- `order_id` (UUID, FK -> Orders)
- `product_id` (UUID, FK -> Products)
- `quantity` (Integer)
- `price_at_time` (Decimal)

### Inventory
- `product_id` (UUID, FK -> Products)
- `warehouse_id` (UUID, FK -> Warehouse)
- `quantity` (Integer)

### PlantDiseaseReports
- `id` (UUID, PK)
- `farmer_id` (UUID, FK -> Users)
- `image_url` (String)
- `diagnosis_result` (JSON)
- `confidence_score` (Float)

*(Schema continues for Payments, Categories, Warehouse, Logistics, CropPlans, ChatMessages, Coupons, Transactions, Subscriptions)*

## 6. API Endpoints (Swagger-Ready)

### Auth
- `POST /auth/login-otp` (Input: phone -> Output: success/fail)
- `POST /auth/verify-otp` (Input: phone, otp -> Output: JWT)

### Orders
- `POST /orders` (Input: items, address -> Output: order_id)
- `GET /orders` (Output: list of orders)
- `GET /orders/:id` (Output: order details)

### Products
- `GET /products` (Input: filters -> Output: list)
- `GET /products/:id` (Output: details)

### AI Plant Doctor
- `POST /ai/diagnose` (Input: image -> Output: diagnosis, confidence, remedies)

### AI Planner
- `POST /ai/plan` (Input: soil, crop, acres -> Output: seasonal_plan)

## 7. AI Feature Implementation

### AI Plant Doctor
- **Pipeline:** Mobile App -> API Gateway -> AI Service (FastAPI).
- **Model:** EfficientNet-B4 fine-tuned on crop disease dataset.
- **Fallback:** If confidence < 70%, route to human agronomist queue.

### AI Crop Planner
- **Architecture:** RAG (Retrieval-Augmented Generation).
- **Components:** Vector DB with agricultural handbooks + LLM (e.g., Gemini Pro via API).
- **Logic:** Input (Region, Soil) -> Retrieve Context -> LLM Generation -> Structured Plan.
