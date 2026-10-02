import { Routes, Route, useLocation } from 'react-router'
import { lazy, Suspense, useEffect } from 'react'

// === EAGER imports — critical for first paint ===
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import Layout from './components/Layout'

// === LAZY imports — loaded on demand ===
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Payment = lazy(() => import('./pages/Payment'))
const CheckoutSuccess = lazy(() => import('./pages/CheckoutSuccess'))
const CheckoutCancel = lazy(() => import('./pages/CheckoutCancel'))
const Invoice = lazy(() => import('./pages/Invoice'))
const Quote = lazy(() => import('./pages/Quote'))
const Account = lazy(() => import('./pages/Account'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Favorites = lazy(() => import('./pages/Favorites'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Compare = lazy(() => import('./pages/Compare'))
const Tracking = lazy(() => import('./pages/Tracking'))
const TrackOrder = lazy(() => import('./pages/TrackOrder'))
const VendorLogin = lazy(() => import('./pages/VendorLogin'))
const VendorPortal = lazy(() => import('./pages/VendorPortal'))
const DriverSignup = lazy(() => import('./pages/DriverSignup'))
const Admin = lazy(() => import('./pages/Admin'))
const NotFound = lazy(() => import('./pages/NotFound'))

function LazyFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

const lazyEl = (C: React.ComponentType) => (
  <Suspense fallback={<LazyFallback />}>
    <C />
  </Suspense>
)

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Pages boutique : barre de navigation + pied de page */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={lazyEl(Products)} />
        <Route path="/catalogue" element={lazyEl(Products)} />
        <Route path="/nouveautes" element={lazyEl(Products)} />
        <Route path="/promotions" element={lazyEl(Products)} />
        <Route path="/product/:id" element={lazyEl(ProductDetail)} />
        <Route path="/produit/:id" element={lazyEl(ProductDetail)} />
        <Route path="/cart" element={lazyEl(Cart)} />
        <Route path="/panier" element={lazyEl(Cart)} />
        <Route path="/checkout" element={lazyEl(Payment)} />
        <Route path="/payment" element={lazyEl(Payment)} />
        <Route path="/checkout/success" element={lazyEl(CheckoutSuccess)} />
        <Route path="/checkout/cancel" element={lazyEl(CheckoutCancel)} />
        <Route path="/invoice/:id" element={lazyEl(Invoice)} />
        <Route path="/quote" element={lazyEl(Quote)} />
        <Route path="/account" element={lazyEl(Account)} />
        <Route path="/profil" element={lazyEl(Account)} />
        <Route path="/favorites" element={lazyEl(Favorites)} />
        <Route path="/wishlist" element={lazyEl(Wishlist)} />
        <Route path="/compare" element={lazyEl(Compare)} />
        <Route path="/tracking" element={lazyEl(Tracking)} />
        <Route path="/track-order" element={lazyEl(TrackOrder)} />
      </Route>

      <Route path="/login" element={lazyEl(Login)} />
      <Route path="/register" element={lazyEl(Register)} />
      <Route path="/vendor-login" element={lazyEl(VendorLogin)} />
      <Route path="/vendor" element={lazyEl(VendorPortal)} />
      <Route path="/driver-signup" element={lazyEl(DriverSignup)} />
      <Route path="/admin/*" element={lazyEl(Admin)} />
      <Route path="*" element={lazyEl(NotFound)} />
    </Routes>
  )
}
