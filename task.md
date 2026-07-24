# Project Task List

## Phase 1: Planning & Setup
- [x] Project discovery (mapping existing Next.js architecture)
- [x] Define global design system (colors, typography, animations)
- [x] Initialize StoreProvider for local state management (Cart, Wishlist, Auth)

## Phase 2: Configuration & State
- [x] src/app/globals.css — Add exact hex codes, glassmorphism utilities, keyframes
- [x] src/lib/store.tsx — Context for Auth, Cart, Wishlist using localStorage
- [x] src/app/layout.tsx — Wrap root layout with StoreProvider, setup fonts

## Phase 3: Core UI Components
- [x] src/components/ui/Button.tsx — pink gradient, sage variants
- [x] src/components/ui/ProductCard.tsx — glassmorphism card
- [x] src/components/ui/Badge.tsx
- [x] src/components/ui/Toast.tsx
- [x] src/components/ui/FloatingPetals.tsx
- [x] src/components/ui/LoadingSkeleton.tsx
- [x] src/components/ui/SearchBar.tsx
- [x] src/components/ui/StarRating.tsx

## Phase 4: Layout Components
- [x] Navbar.tsx — mega menu, cart badge, auth dropdown
- [x] Footer.tsx — updated palette, newsletter
- [x] FloatingButtons.tsx — WhatsApp, scroll-to-top

## Phase 5: Home Page
- [x] Hero.tsx — parallax, floating petals, search bar, CTAs
- [x] FeaturedCollections.tsx — glassmorphism cards
- [x] BestSellers.tsx — horizontal carousel
- [x] FreshToday.tsx — fresh collection section
- [x] EventCategories.tsx — occasion grid
- [x] BulkOrders.tsx — bulk CTA
- [x] InstagramGallery.tsx — masonry gallery
- [x] Testimonials.tsx — auto-scroll carousel
- [x] page.tsx — assemble all sections

## Phase 6: Shop Pages
- [x] src/app/collections/page.tsx — advanced filters, grid/list view
- [x] src/app/shop/customize/page.tsx — custom mala builder wizard

## Phase 7: Product & Cart
- [ ] src/app/product/[slug]/page.tsx — image gallery, variants, add to cart
- [ ] src/app/cart/page.tsx — order summary, item management
- [ ] src/app/checkout/page.tsx — multistep checkout (delivery, payment)

## Phase 8: Auth & Dashboard
- [ ] src/app/auth/login/page.tsx — login/register forms
- [ ] src/app/dashboard/page.tsx — user stats
- [ ] src/app/dashboard/orders/page.tsx — order history with tracking
- [ ] src/app/dashboard/wishlist/page.tsx

## Phase 9: Admin Panel
- [ ] src/app/admin/layout.tsx — admin sidebar
- [ ] src/app/admin/page.tsx — dashboard overview
- [ ] src/app/admin/orders/page.tsx — order management table

## Phase 10: Final Polish
- [ ] Test mobile responsiveness across all routes
- [ ] Verify local storage hydration
- [ ] Add loading skeletons for data fetching simulation
