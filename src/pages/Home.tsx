import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Truck, Shield, Headphones, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";

const ProductCard = lazy(() => import("@/components/ProductCard"));

function ProductCardFallback() {
  return (
    <div className="bg-[#141415] border border-white/10 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-[#1C1C1E]" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-[#1C1C1E] rounded w-1/3" />
        <div className="h-5 bg-[#1C1C1E] rounded w-3/4" />
        <div className="h-4 bg-[#1C1C1E] rounded w-1/4" />
      </div>
    </div>
  );
}

const categories = [
  { name: "Câbles & Fils", icon: "🔌", slug: "cables-et-fils" },
  { name: "Éclairage LED", icon: "💡", slug: "eclairage-led" },
  { name: "Tableaux Électriques", icon: "⚡", slug: "tableaux-electriques" },
  { name: "Prises & Interrupteurs", icon: "🔘", slug: "prises-et-interrupteurs" },
  { name: "Outils", icon: "🔧", slug: "outils" },
  { name: "Domotique", icon: "🏠", slug: "domotique" },
  { name: "Sécurité", icon: "🔒", slug: "securite" },
  { name: "Chauffage & Clim", icon: "🌡️", slug: "chauffage-et-climatisation" },
];

const featuredProducts = products.filter((p) => p.featured).slice(0, 8);
const newProducts = products.filter((p) => p.new).slice(0, 4);
const bestsellers = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A853]/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-[#D4A853]/10 text-[#D4A853] border-[#D4A853]/20 mb-6">
                B2B - Matériel électrique professionnel
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Votre partenaire
                <span className="text-[#D4A853]"> électrique</span>
                <br />
                de confiance
              </h1>
              <p className="text-lg text-gray-400 mb-8 max-w-lg">
                Plus de 400 références de matériel électrique pour les professionnels.
                Prix HT, livraison rapide et devis personnalisés.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button className="bg-[#D4A853] text-[#0A0A0B] px-8 py-6 text-base font-semibold">
                    Découvrir le catalogue
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/quote">
                  <Button variant="outline" className="px-8 py-6 text-base">
                    Demander un devis
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-[#1C1C1E] border-2 border-[#0A0A0B] flex items-center justify-center text-xs text-gray-400">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} className="text-[#D4A853] fill-[#D4A853]" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">+500 professionnels nous font confiance</p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#1C1C1E] to-[#141415] border border-white/10 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80"
                  alt="Matériel électrique professionnel"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#141415] border border-white/10 rounded-xl p-4 shadow-xl">
                <p className="text-2xl font-bold text-[#D4A853]">400+</p>
                <p className="text-xs text-gray-500">Références en stock</p>
              </div>
              <div className="absolute -top-6 -right-6 bg-[#141415] border border-white/10 rounded-xl p-4 shadow-xl">
                <p className="text-2xl font-bold text-[#D4A853]">24h</p>
                <p className="text-xs text-gray-500">Devis sous 24h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#D4A853]/10 rounded-xl flex items-center justify-center">
              <Zap size={24} className="text-[#D4A853]" />
            </div>
            <div>
              <p className="text-white font-medium">Prix pros</p>
              <p className="text-xs text-gray-500">Tous nos prix en HT</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#D4A853]/10 rounded-xl flex items-center justify-center">
              <Truck size={24} className="text-[#D4A853]" />
            </div>
            <div>
              <p className="text-white font-medium">Livraison rapide</p>
              <p className="text-xs text-gray-500">2-5 jours ouvrés</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#D4A853]/10 rounded-xl flex items-center justify-center">
              <Shield size={24} className="text-[#D4A853]" />
            </div>
            <div>
              <p className="text-white font-medium">Garantie 2 ans</p>
              <p className="text-xs text-gray-500">Sur tout le matériel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#D4A853]/10 rounded-xl flex items-center justify-center">
              <Headphones size={24} className="text-[#D4A853]" />
            </div>
            <div>
              <p className="text-white font-medium">Support pro</p>
              <p className="text-xs text-gray-500">Conseil technique</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Catégories</h2>
            <Link to="/products" className="text-[#D4A853] text-sm hover:underline flex items-center gap-1">
              Voir tout <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="bg-[#141415] border border-white/10 rounded-xl p-4 text-center hover:border-[#D4A853]/30 transition-colors"
              >
                <span className="text-3xl mb-2 block">{cat.icon}</span>
                <p className="text-xs text-white font-medium line-clamp-2">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A0A0B]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Produits en vedette</h2>
              <p className="text-gray-500 text-sm mt-1">Notre sélection pour vos projets</p>
            </div>
            <Link to="/products">
              <Button variant="outline" size="sm">
                Voir tout
                <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Suspense fallback={<>{Array(4).fill(null).map((_, i) => <ProductCardFallback key={i} />)}</>}>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Nouveautés</h2>
                <p className="text-gray-500 text-sm mt-1">Les derniers produits ajoutés</p>
              </div>
              <Link to="/products?sort=new">
                <Button variant="outline" size="sm">
                  Voir tout
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Suspense fallback={<>{Array(4).fill(null).map((_, i) => <ProductCardFallback key={i} />)}</>}>
                {newProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </Suspense>
            </div>
          </div>
        </section>
      )}

      {/* Bestsellers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Meilleures ventes</h2>
              <p className="text-gray-500 text-sm mt-1">Les produits préférés des pros</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Suspense fallback={<>{Array(4).fill(null).map((_, i) => <ProductCardFallback key={i} />)}</>}>
              {bestsellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Suspense>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Besoin d'un devis personnalisé ?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Nos experts étudient vos besoins et vous proposent une solution sur mesure.
            Devis sous 24h ouvrées.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/quote">
              <Button className="bg-[#D4A853] text-[#0A0A0B] px-8 py-6 text-base font-semibold">
                Demander un devis
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="px-8 py-6 text-base">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
