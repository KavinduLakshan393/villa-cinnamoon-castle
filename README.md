# Villa Cinnamoon Castle — Web Platform

> *Find Your Own Peacefulness* — An immersive, photography-led luxury villa reservation platform for Villa Cinnamoon Castle, nestled amidst the lush tropical greenery of Hikkaduwa, Sri Lanka.

---

## 🏰 Overview

Villa Cinnamoon Castle is an authentic Dutch-colonial-inspired private 5-bedroom retreat. This repository houses the full-stack web application for an editorial guest experience, transparent weekday/weekend pricing, WhatsApp-assisted stay inquiries and focused administrative controls.

---

## 📐 Architecture & Tech Stack

### Frontend (`/client`)
- **Core**: React 19 + Vite
- **Styling**: Vanilla CSS using the shared tokens in `src/styles/tokens.css`
- **Motion & interactions**: GSAP 3, ScrollTrigger and Lenis smooth scroll
- **Routing**: React Router
- **Admin UI**: Authenticated inquiries and package-management screens using the same public-site design tokens

### Backend (`/server`)
- **Runtime**: Node.js + Express 5 (ES Modules and TypeScript)
- **Database**: PostgreSQL with Prisma ORM and 3NF migrations
- **Security**: Argon2id passwords, short-lived access JWTs, rotating opaque refresh tokens in HttpOnly cookies, CORS, origin checks and rate limiting
- **API endpoints**: Public packages/inquiries plus authenticated package CRUD and inquiry decisions

---

## 🌟 Key Features

1. **Editorial Parallax Hero**: Cinematic visual storytelling combining authentic property photography, GSAP scroll triggers, mouse tilt parallax, and refined typography.
2. **Date & Pricing Flow**: Dynamic weekday/weekend classification and transparent estimated pricing.
3. **Multi-Step Inquiry Flow**:
   - Date selection with duration calculation
   - Tiered package selection (Weekend Non-A/C, Weekend Full A/C, Weekday options)
   - Guest count stepper with pricing recalculation
   - Database persistence followed by a customer-reviewed WhatsApp handoff to the host
4. **Verified Guest Reviews**: Authentic traveler ratings, stay category badges, and testimonial carousel.
5. **Admin Portal**: Secure sign-in, date-grouped inquiry priority, Accept/Reject WhatsApp drafts and full package/price-variant CRUD.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ installed
- PostgreSQL 18 (local or hosted)
- npm

### 1. Install and configure
```powershell
npm --prefix client install
npm --prefix server install
Copy-Item server/.env.example server/.env
```

Set the PostgreSQL URLs and `AUTH_ACCESS_TOKEN_SECRET` in `server/.env`, then run:

```powershell
npm run db:migrate:deploy
npm run db:seed
npm run admin:create
```

### 2. Run locally

Backend terminal:

```powershell
npm run server:dev
```

Frontend terminal:

```powershell
npm run dev
```

The API runs at `http://localhost:4000`, the site at `http://localhost:5173`, and the admin sign-in at `http://localhost:5173/admin/login`.

---

## 📂 Project Structure

```text
├── client/                     # Vite + React Frontend
│   ├── public/                 # Static villa photography & assets
│   ├── src/
│   │   ├── components/         # Modular UI components (Hero, Booking, Stepper, Layout)
│   │   ├── admin/              # Admin authentication and dashboard views
│   │   ├── data/               # Property photography & metadata constants
│   │   ├── pages/              # View routes (Home, Villa, Packages, Reserve, Admin)
│   │   ├── lib/                # Fetch client, inquiry and interaction utilities
│   │   └── styles/             # Design tokens & global typography
├── server/                     # Express + Prisma Backend
│   ├── prisma/                 # Schema definition & database seeder
│   └── src/
│       ├── auth/               # Access/refresh-token authentication services
│       ├── routes/             # Auth, packages and inquiry REST endpoints
│       └── server.ts           # Express app initialization
├── Documents/                  # Architecture, business rules & design manifests
├── Sample Design V.1.0/        # Reference UI templates & audits
└── package.json                # Root workspace configuration
```

---

## 🎨 Design System & Palette

- **Background / surface**: `#F3F1EB` / `#FCFBF8`
- **Primary / secondary text**: `#171A17` / `#626862`
- **Accent / hover**: `#285447` / `#1E4238`
- **Typography**: Plus Jakarta Sans with Bodoni Moda editorial accents

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
