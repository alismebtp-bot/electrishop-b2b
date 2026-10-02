# ElectriShop

B2B E-commerce Marketplace Platform built with React 19 + TypeScript + Vite + Tailwind CSS.

## Features

- 442 products across 14 categories
- AI-powered chatbot with image recognition
- GPS tracking for deliveries
- Barcode scanner (EAN-13)
- Admin dashboard (20+ pages)
- Multi-language support (12 languages)
- PDF quote generation
- Stripe payment integration

## Tech Stack

- React 19 + TypeScript
- Vite + Tailwind CSS
- React Router v7 (HashRouter)
- Context API + useReducer
- Recharts, Leaflet, jsPDF, Framer Motion

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Démo

- Catalogue : `src/data/products.ts` — 448 références, 14 catégories (repris de la version en ligne), visuels dans `public/img/`.
- Comptes de test : `admin@demo.com` / `demo` (espace admin) et `client@demo.com` / `demo`.
- Routes principales : `/home`, `/catalogue`, `/produit/:id`, `/panier`, `/checkout`, `/quote` (devis), `/profil`, `/admin`.
