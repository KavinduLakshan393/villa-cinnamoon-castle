# Villa Cinnamoon Castle — Web Platform

> *Find Your Own Peacefulness* — An immersive, photography-led luxury villa reservation platform for Villa Cinnamoon Castle, nestled amidst the lush tropical greenery of Hikkaduwa, Sri Lanka.

---

## 🏰 Overview

Villa Cinnamoon Castle is an authentic Dutch-colonial-inspired private 5-bedroom retreat. This repository houses the complete full-stack web application designed to deliver an editorial, ultra-premium guest experience with seamless reservation capabilities, transparent weekend/weekday pricing, real-time availability calendar, and comprehensive administrative controls.

---

## 📐 Architecture & Tech Stack

### Frontend (`/client`)
- **Core**: React 18 + Vite
- **Styling**: Vanilla CSS with custom Luxury Cinnamon Design Tokens (`tokens.css`, `global.css`)
- **Motion & Interactions**: GSAP 3 (ScrollTrigger, mouse-parallax) & Lenis smooth scroll
- **Routing**: React Router v6
- **Icons**: Lucide React

### Backend (`/server`)
- **Runtime**: Node.js + Express (ES Modules)
- **Database ORM**: Prisma ORM with SQLite database
- **Security & Validation**: bcryptjs, CORS, input sanitization
- **API Endpoints**: RESTful calendar, packages, reservations, reviews, and admin dashboard

---

## 🌟 Key Features

1. **Editorial Parallax Hero**: Cinematic visual storytelling combining authentic property photography, GSAP scroll triggers, mouse tilt parallax, and refined typography.
2. **Interactive Availability Calendar**: Visual indicator of available dates, dynamic weekday vs. weekend pricing rules, and booking restrictions.
3. **Multi-Step Reservation Flow**:
   - Date selection with duration calculation
   - Tiered package selection (Weekend Non-A/C, Weekend Full A/C, Weekday options)
   - Guest count stepper with pricing recalculation
   - WhatsApp direct confirmation dispatch
4. **Verified Guest Reviews**: Authentic traveler ratings, stay category badges, and testimonial carousel.
5. **Staff/Admin Portal**: Booking request verification, status updates (Pending/Approved/Declined), review moderation, and rate configuration.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ installed
- npm or pnpm

### 1. Server Setup
```bash
cd server
npm install
npx prisma generate
npx prisma db push
npm run prisma:seed
npm run dev
```
*Backend API server runs at `http://localhost:5000`.*

### 2. Client Setup
```bash
cd ../client
npm install
npm run dev
```
*Frontend dev server runs at `http://localhost:5173`.*

---

## 📂 Project Structure

```text
├── client/                     # Vite + React Frontend
│   ├── public/                 # Static villa photography & assets
│   ├── src/
│   │   ├── components/         # Modular UI components (Hero, Booking, Stepper, Layout)
│   │   ├── context/            # Global Booking & Calendar state providers
│   │   ├── data/               # Property photography & metadata constants
│   │   ├── pages/              # View routes (Home, Villa, Packages, Reserve, Admin)
│   │   ├── services/           # Axios/Fetch API client service
│   │   └── styles/             # Design tokens & global typography
├── server/                     # Express + Prisma Backend
│   ├── prisma/                 # Schema definition & database seeder
│   └── src/
│       ├── routes/             # API routes (calendar, bookings, packages, reviews, admin)
│       ├── utils/              # Pricing engine & date utilities
│       └── server.js           # Express app initialization
├── Documents/                  # Architecture, business rules & design manifests
├── Sample Design V.1.0/        # Reference UI templates & audits
└── package.json                # Root workspace configuration
```

---

## 🎨 Design System & Palette

- **Deep Cinnamon**: `#6A2E16` / `#4A1E0E` — Earthy warmth of Sri Lankan cinnamon heritage.
- **Sand & Cream**: `#FAF6F0` / `#F0E8DD` — Serene natural surfaces.
- **Antique Gold**: `#D4AF37` / `#C5A028` — Subtle luxury accents.
- **Charcoal Forest**: `#1A1E17` — Deep grounding contrast for typography.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
