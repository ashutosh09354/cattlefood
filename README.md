# Cattle Feed – React storefront (frontend only)

React 18 + Vite + React Router. State is kept with Context API and persisted in localStorage. There is no backend.

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview
```

## Structure
```
src/
  main.jsx, App.jsx          entry and routes
  layouts/MainLayout.jsx     announcement bar, header, footer
  pages/                     Home, Shop, ProductDetails, Cart, Checkout, OrderSuccess,
                             Login, Signup, MyAccount, About, Contact, NotFound
  components/                Header, Footer, AnnouncementBar, Hero, BenefitsBar, CategoryCards,
                             FeaturedProducts, PromoBanner, WhyChooseUs, HowItWorks, Testimonials,
                             FAQ, Newsletter, ProductCard, ProductThumb, FormField, Icon, SEO,
                             ProtectedRoute
  context/StoreContext.jsx   cart, wishlist, coupon, orders, demo auth
  data/                      products (20 demo items), categories, nutrition text, icons, image paths
  utils/                     currency helpers, localStorage wrapper
public/assets/               logo and images
```

## Routes
`/`, `/shop` (`?q=` and `?cat=`), `/product/:id`, `/cart`, `/checkout`, `/order-success`, `/login`, `/signup`, `/account` (login required), `/about`, `/contact`, anything else gives 404.

## Demo notes
- Login, signup and orders are stored only in the browser. Passwords are unhashed, so this is not secure.
- Checkout validates input and simulates payment. No real payment is made. Real payments need a backend plus a gateway such as Razorpay, Cashfree or PayU.
- Coupon `CATTLE10`. Test card `4111 1111 1111 1111`, any future expiry.
- Product pack images are placeholders cropped from the design reference.
- Styling is one `src/index.css` (plain CSS, not Tailwind).

## Not built yet
Forgot/reset password, saved addresses, policy pages, separate wishlist page, Framer Motion animations.
