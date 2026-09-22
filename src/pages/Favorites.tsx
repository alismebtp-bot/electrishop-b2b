import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/data/products";
import { useFavorites, useCart } from "@/context/AppContext";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Mes favoris ({favoriteProducts.length})
        </h1>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto h-16 w-16 text-gray-600 mb-6" />
            <h2 className="text-xl font-bold text-white mb-4">Aucun favori</h2>
            <p className="text-gray-400 mb-8">
              Ajoutez des produits à vos favoris pour les retrouver ici.
            </p>
            <Link to="/products">
              <Button className="bg-[#D4A853] text-[#0A0A0B]">
                Explorer le catalogue
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoriteProducts.map((product) => (
              <Card key={product.id} className="bg-[#141415] border-white/10 overflow-hidden group">
                <div className="relative">
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-[#0A0A0B]/80 rounded-full flex items-center justify-center text-red-500"
                  >
                    <Heart size={16} className="fill-current" />
                  </button>
                </div>
                <CardContent className="p-3">
                  <p className="text-xs text-[#D4A853] mb-1">{product.category}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-medium text-white line-clamp-2 mb-2 hover:text-[#D4A853] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">{product.priceHT.toFixed(2)} € HT</p>
                      <p className="text-xs text-gray-500">{(product.priceHT * 1.2).toFixed(2)} € TTC</p>
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
