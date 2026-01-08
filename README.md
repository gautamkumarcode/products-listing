# Product Listing E-Commerce Application

A modern, full-featured e-commerce product listing application built with Next.js 15, React 19, and TypeScript. This application provides a seamless shopping experience with advanced filtering, cart management, product details, checkout flow, and more.

## 🚀 Live Demo

**[View Live Application](https://products-listing-liart.vercel.app/)**

## ✨ Features

### 🛍️ Product Management
- **Product Listing**: Browse 16+ products across multiple categories
- **Product Details**: Server-side rendered product detail pages with image gallery
- **Search Functionality**: Real-time search across product names
- **Advanced Filtering**: 
  - Filter by category (Electronics, Clothing, Home)
  - Filter by brand (Nike, Sony, Apple, Samsung, Dell, Canon, Ray-Ban, JBL, Logitech)
  - Dual range price slider (min-max)
  - Single price input filter
- **URL-based Filters**: Shareable URLs with filter parameters

### 🛒 Shopping Cart
- Add/Remove items from cart
- Update product quantities
- Real-time cart badge counter
- Persistent cart storage (localStorage)
- Cart total calculation

### ❤️ Wishlist/Likes
- Like/unlike products
- Persistent likes storage
- Heart icon on product cards and detail pages
- Consolidated with cart context for efficiency

### 📦 Checkout & Orders
- Complete checkout form with validation
- Multiple payment methods (Credit Card, UPI, Cash on Delivery)
- Shipping address collection
- Order confirmation page with order number
- Expected delivery date calculation

### 🎨 UI/UX Features
- Responsive design (mobile, tablet, desktop)
- Custom scrollbar styling
- Mobile-friendly filter sidebar
- Product image galleries
- Social media integration in footer
- User account icon
- Loading states and suspense boundaries

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.7 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react
- **State Management**: React Context API + useReducer
- **Routing**: Next.js App Router with useSearchParams, useRouter, usePathname
- **Storage**: localStorage for cart and likes persistence
- **Deployment**: Vercel

## 📁 Project Structure

```
productlisting/
├── app/
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── success/           # Order success page
│   ├── products/[id]/     # Dynamic product detail pages (SSR)
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page with product listing
│   └── globals.css        # Global styles + custom components
├── components/
│   └── custom/
│       ├── Filter/        # Filter sidebar component
│       ├── Footer/        # Footer with links and social media
│       ├── Header/        # Navigation header with search and cart
│       ├── ProductCard/   # Product card component
│       └── ProductDetails/# Product detail client component
├── context/
│   ├── CartContext.tsx    # Cart + Likes state management
│   └── SearchContext.tsx  # Filter state management
├── reducers/
│   └── cartReducer.ts     # Cart and likes reducer logic
├── data/
│   └── products.ts        # Product data
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd productlisting
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Features Implementation

### State Management
- **CartContext**: Manages shopping cart items and liked products using useReducer pattern
- **SearchContext**: Manages all filter states (search, category, brands, price range)
- **localStorage**: Persists cart and likes data across sessions

### Routing & Navigation
- **Server-Side Rendering**: Product detail pages with generateStaticParams
- **URL Parameters**: Filters are synced with URL for shareable links
- **Dynamic Routes**: `/products/[id]` for individual product pages

### Styling Approach
- Tailwind CSS v4 for utility-first styling
- Custom CSS classes for complex components (dual range slider, scrollbar)
- Responsive breakpoints (mobile-first approach)
- Custom color palette based on design (#0C5BA0 primary blue)

## 📱 Pages Overview

### Home Page (`/`)
- Product grid with filters
- Real-time search and filtering
- Category, brand, and price filters
- Mobile-responsive filter sidebar

### Product Detail Page (`/products/[id]`)
- Server-side rendered for SEO
- Image gallery with thumbnails
- Quantity selector
- Add to cart and like functionality
- Related product recommendations

### Cart Page (`/cart`)
- List of cart items
- Quantity adjustment
- Remove items
- Total price calculation
- Proceed to checkout button

### Checkout Page (`/checkout`)
- Contact information form
- Shipping address
- Payment method selection (Card/UPI/COD)
- Order summary sidebar
- Form validation

### Success Page (`/success`)
- Order confirmation
- Order number display
- Expected delivery date
- Navigation to home or continue shopping

## 🎨 Design Features

- **Color Scheme**: Blue (#0C5BA0) and white theme
- **Typography**: Clean, modern fonts
- **Icons**: lucide-react for consistent iconography
- **Responsive**: Mobile-first design with breakpoints
- **Custom Scrollbar**: Themed scrollbar matching brand colors
- **Loading States**: Suspense boundaries for better UX

## 🔧 Configuration

### Next.js Config
- Image optimization with remote patterns (Unsplash)
- TypeScript strict mode enabled

### Tailwind Config
- Custom color extensions
- Responsive breakpoints
- Custom component styles in globals.css

## 📝 Environment Variables

No environment variables required for basic functionality. All product data is included in the codebase.

## 🚢 Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

**Live URL**: [https://products-listing-liart.vercel.app/](https://products-listing-liart.vercel.app/)

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)



