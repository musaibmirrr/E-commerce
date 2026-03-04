# AI-Powered E-Commerce Platform

A modern, production-grade e-commerce application built with Next.js, featuring AI shopping assistance, semantic search, and secure payments.

## 🚀 Features

- **AI Shopping Assistant:** Conversational chatbot to help find products and answer FAQs.
- **Semantic Search:** Natural language search powered by OpenAI Embeddings and `pgvector`.
- **Complete Shop Flow:** Product catalog, detailed views, shopping cart, and Stripe checkout.
- **Admin Dashboard:** Manage products, categories, and view sales analytics.
- **Secure Auth:** JWT-based authentication with NextAuth and role-based access control.
- **Responsive Design:** Mobile-first UI built with TailwindCSS and Shadcn/UI.

## 🛠 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Database:** PostgreSQL with Prisma ORM & pgvector
- **AI:** OpenAI API (GPT-4 & Text Embeddings)
- **Payments:** Stripe
- **Styling:** TailwindCSS, Shadcn/UI, Framer Motion
- **State Management:** Zustand

## 📋 Prerequisites

- Node.js 20+
- Docker & Docker Compose
- OpenAI API Key
- Stripe Account (API Keys)
- GitHub OAuth App (Optional)

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/aistore?schema=public"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# AI
OPENAI_API_KEY="sk-..."

# Payments
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Auth (Optional)
GITHUB_ID="..."
GITHUB_SECRET="..."

# Public
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🏃 Getting Started

1. **Clone and Install:**
   ```bash
   npm install
   ```

2. **Start Database:**
   ```bash
   docker-compose up -d db
   ```

3. **Database Setup:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

## 🐳 Docker Deployment

To run the entire stack using Docker:

```bash
docker-compose up --build
```

## 📄 License

MIT
