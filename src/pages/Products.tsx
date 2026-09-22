import React, { useState, useMemo, Suspense, lazy } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search, SlidersHorizontal, Grid3X3, List, ArrowUpDown,
  X, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

const categories = Array.from(new Set(products.map((p) => p.category)));
const priceRanges = [
  { label: "Tous les prix", min: 0, max: Infinity },
  { label: "Moins de 10 €", min: 0, max: 10 },
  { label: "10 - 50 €", min: 10, max: 50 },
  { label: "50 - 100 €", min: 50, max: 100 },
  { label: "Plus de 100 €", min: 100, max: Infinity },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<"name" | "price-asc" | "price-desc" | "new">("name");

  const categoryFilter = searchParams.get("category") || "";

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s) ||
          p.id.toLowerCase().includes(s)
      );
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.priceHT - b.priceHT);
        break;
      case "price-desc":
        result.sort((a, b) => b.priceHT - a.priceHT);
        break;
      case "new":
        result = result.filter((p) => p.new);
        break;
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [categoryFilter, search, sort]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-2">Catalogue</h1>
        <p className="text-gray-500 mb-8">{filteredProducts.length} produits disponibles</p>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex-1 min-w-[200px] relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "border-[#D4A853]" : ""}
          >
            <SlidersHorizontal size={16} className="mr-2" />
            Filtres
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="icon"
              className="h-9 w-9"
              onClick={() => setView("grid")}
            >
              <Grid3X3 size={16} />
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="icon"
              className="h-9 w-9"
              onClick={() => setView("list")}
            >
              <List size={16} />
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-[#141415] border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-white">Filtres</p>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                <X size={14} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    if (categoryFilter === cat) {
                      searchParams.delete("category");
                    } else {
                      searchParams.set("category", cat);
                    }
                    setSearchParams(searchParams);
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    categoryFilter === cat
                      ? "bg-[#D4A853] text-[#0A0A0B]"
                      : "bg-[#1C1C1E] text-gray-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sort */}
        <div className="flex items-center gap-2 mb-6">
          <ArrowUpDown size={14} className="text-gray-500" />
          <span className="text-sm text-gray-500">Trier par:</span>
          <div className="flex gap-2">
            {[
              { value: "name" as const, label: "Nom" },
              { value: "price-asc" as const, label: "Prix croissant" },
              { value: "price-desc" as const, label: "Prix décroissant" },
              { value: "new" as const, label: "Nouveautés" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSort(option.value)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  sort === option.value
                    ? "bg-[#D4A853]/10 text-[#D4A853]"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Search className="mx-auto h-12 w-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500">Essayez une autre recherche ou catégorie.</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Suspense fallback={<>{Array(8).fill(null).map((_, i) => <ProductCardFallback key={i} />)}</>}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Suspense>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="bg-[#141415] border-white/10 hover:border-[#D4A853]/30 transition-colors">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#D4A853] mb-1">{product.category}</p>
                      <h3 className="text-sm font-medium text-white truncate">{product.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{product.id}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-white">{product.priceHT.toFixed(2)} € HT</p>
                      <p className="text-xs text-gray-500">{(product.priceHT * 1.2).toFixed(2)} € TTC</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
