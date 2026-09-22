import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, ArrowRight, Share2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/products";
import { useFavorites, useCart, useApp } from "@/context/AppContext";

export default function Wishlist() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { dispatch } = useApp();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Ma liste de souhaits ElectriShop",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          id: Date.now().toString(),
          title: "Lien copié",
          message: "Le lien de votre liste a été copié.",
          type: "success",
          read: false,
          date: new Date().toISOString(),
        },
      });
    }
  };

  const totalHT = favoriteProducts.reduce((sum, p) => sum + p.priceHT, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            Liste de souhaits ({favoriteProducts.length})
          </h1>
          {favoriteProducts.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 size={14} className="mr-2" />
              Partager
            </Button>
          )}
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto h-16 w-16 text-gray-600 mb-6" />
            <h2 className="text-xl font-bold text-white mb-4">Votre liste est vide</h2>
            <p className="text-gray-400 mb-8">
              Ajoutez des produits à votre liste de souhaits pour les retrouver ici.
            </p>
            <Link to="/products">
              <Button className="bg-[#D4A853] text-[#0A0A0B]">
                Explorer le catalogue
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {favoriteProducts.map((product) => (
                <Card key={product.id} className="bg-[#141415] border-white/10">
                  <CardContent className="p-4 flex items-center gap-4">
                    <Link to={`/product/${product.id}`}>
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#D4A853] mb-1">{product.category}</p>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-sm font-medium text-white hover:text-[#D4A853] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">{product.id}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-bold text-white">{product.priceHT.toFixed(2)} € HT</p>
                      <p className="text-xs text-gray-500">{(product.priceHT * 1.2).toFixed(2)} € TTC</p>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-400"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card className="bg-[#141415] border-white/10 sticky top-32">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Résumé</h3>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Produits</span>
                      <span className="text-white">{favoriteProducts.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total HT</span>
                      <span className="text-white">{totalHT.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total TTC</span>
                      <span className="text-white">{(totalHT * 1.2).toFixed(2)} €</span>
                    </div>
                  </div>
                  <Separator className="bg-white/10 my-4" />
                  <Button
                    className="w-full bg-[#D4A853] text-[#0A0A0B]"
                    onClick={() => {
                      favoriteProducts.forEach((p) => addToCart(p));
                      dispatch({
                        type: "ADD_NOTIFICATION",
                        payload: {
                          id: Date.now().toString(),
                          title: "Panier mis à jour",
                          message: `${favoriteProducts.length} produits ajoutés au panier`,
                          type: "success",
                          read: false,
                          date: new Date().toISOString(),
                        },
                      });
                    }}
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Tout ajouter au panier
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
