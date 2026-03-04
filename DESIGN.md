# AI-Powered E-Commerce Platform - Design Document

## 1. System Architecture
The application is built using a modern full-stack architecture with Next.js as the primary framework.

- **Frontend:** Next.js (App Router), TailwindCSS, Shadcn/UI, Framer Motion, Zustand (State Management).
- **Backend:** Next.js API Routes (Serverless functions).
- **Database:** PostgreSQL with Prisma ORM.
- **Authentication:** NextAuth.js with JWT and OAuth (GitHub).
- **Payments:** Stripe integration.
- **AI Integration:** OpenAI API for Chatbot, Semantic Search, and Recommendations.
- **Infrastructure:** Docker & Docker Compose for local development and deployment.

## 2. Database Schema (Prisma)
- **User:** name, email, password, image, role (ADMIN/CUSTOMER).
- **Account/Session:** NextAuth requirements.
- **Product:** name, description, price, inventory, images, categoryId.
- **Category:** name, description.
- **Order:** userId, totalAmount, status, paymentIntentId.
- **OrderItem:** orderId, productId, quantity, price.
- **Review:** userId, productId, rating, comment.
- **Wishlist:** userId, productId.

## 3. API Structure
- `/api/auth/*`: Authentication (NextAuth).
- `/api/products`: CRUD operations for products.
- `/api/categories`: CRUD operations for categories.
- `/api/orders`: Order management and history.
- `/api/checkout`: Stripe checkout session creation.
- `/api/webhook`: Stripe webhook handler.
- `/api/ai/chat`: AI Shopping Assistant.
- `/api/ai/search`: Semantic search using embeddings.

## 4. AI Integration Architecture
- **Chatbot:** Uses OpenAI GPT-4 to provide a conversational interface for product discovery and FAQs.
- **Semantic Search:** Uses OpenAI Embeddings to allow natural language queries.
- **Recommendations:** Logic-based and AI-assisted personalized suggestions.

## 5. Folder Structure
```
/src
  /app          # Next.js App Router
    /(auth)     # Auth pages
    /(admin)    # Admin dashboard
    /api        # API Routes
    /products   # Product pages
    /cart       # Cart page
    /checkout   # Checkout flow
  /components   # Reusable UI components
    /ui         # Shadcn/UI components
    /ai         # AI-specific components
  /lib          # Shared utilities (Prisma, Stripe, OpenAI)
  /store        # Zustand store definitions
  /types        # TypeScript types/interfaces
  /hooks        # Custom React hooks
/prisma         # Prisma schema and migrations
/public         # Static assets
```
