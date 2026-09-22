import { Routes, Route, useLocation } from 'react-router'
import { lazy, Suspense, useEffect } from 'react'

// === EAGER imports — critical for first paint ===
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import Admin from './pages/Admin'

// === LAZY imports — loaded on demand ===
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Quote = lazy(() => import('./pages/Quote'))
const Account = lazy(() => import('./pages/Account'))
const Favorites = lazy(() => import('./pages/Favorites'))
const Compare = lazy(() => import('./pages/Compare'))
const OrderTracking = lazy(() => import('./pages/OrderTracking'))

function LazyFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/product/:id" element={<Suspense fallback={<LazyFallback />}><ProductDetail /></Suspense>} />
      <Route path="/cart" element={<Suspense fallback={<LazyFallback />}><Cart /></Suspense>} />
      <Route path="/quote" element={<Suspense fallback={<LazyFallback />}><Quote /></Suspense>} />
      <Route path="/account" element={<Suspense fallback={<LazyFallback />}><Account /></Suspense>} />
      <Route path="/favorites" element={<Suspense fallback={<LazyFallback />}><Favorites /></Suspense>} />
      <Route path="/compare" element={<Suspense fallback={<LazyFallback />}><Compare /></Suspense>} />
      <Route path="/tracking" element={<Suspense fallback={<LazyFallback />}><OrderTracking /></Suspense>} />
      <Route path="/admin/*" element={<Suspense fallback={<LazyFallback />}><Admin /></Suspense>} />
    </Routes>
  )
}
