import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart, Heart, Share2, ArrowLeft, Star, Check,
  Truck, Shield, RotateCcw, Package, Minus, Plus,
  FileText, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/products";
import { useCart, useFavorites, useApp } from "@/context/AppContext";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { dispatch } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    setQuantity(1);
    setSelectedImage(0);
    setAddedToCart(false);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <Package className="mx-auto h-16 w-16 text-gray-600 mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">Produit non trouvé</h1>
          <p className="text-gray-400 mb-8">Ce produit n'existe pas ou a été retiré du catalogue.</p>
          <Link to="/products">
            <Button className="bg-[#D4A853] text-[#0A0A0B]">Voir le catalogue</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          id: Date.now().toString(),
          title: "Lien copié",
          message: "Le lien du produit a été copié dans le presse-papiers.",
          type: "success",
          read: false,
          date: new Date().toISOString(),
        },
      });
    }
  };

  const priceTTC = product.priceHT * 1.2;
  const favorite = isFavorite(product.id);

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#D4A853]">Accueil</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-[#D4A853]">Produits</Link>
          <ChevronRight size={14} />
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-[#D4A853]">
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-400 truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-xl bg-[#141415] border border-white/10 overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <Badge variant="outline" className="text-[#D4A853] border-[#D4A853]/30">
                {product.category}
              </Badge>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(product.id)}
                  className={favorite ? "text-red-500" : "text-gray-400"}
                >
                  <Heart size={20} className={favorite ? "fill-current" : ""} />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleShare} className="text-gray-400">
                  <Share2 size={20} />
                </Button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{product.name}</h1>
            <p className="text-gray-500 text-sm mb-4">Référence: {product.id}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-[#D4A853]">{product.priceHT.toFixed(2)} €</span>
              <span className="text-gray-500">HT</span>
              <span className="text-gray-600">/</span>
              <span className="text-lg text-gray-400">{priceTTC.toFixed(2)} € TTC</span>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed">{product.description}</p>

            {/* Quantity & Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={14} />
                </Button>
                <span className="w-10 text-center text-white font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
              <Button
                className={`flex-1 min-w-[200px] font-semibold ${
                  addedToCart
                    ? "bg-green-500 text-white"
                    : "bg-[#D4A853] text-[#0A0A0B]"
                }`}
                onClick={handleAddToCart}
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <Check size={18} className="mr-2" />
                    Ajouté !
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} className="mr-2" />
                    Ajouter au panier
                  </>
                )}
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link to="/quote" className="flex-1">
                <Button variant="outline" className="w-full">
                  <FileText size={16} className="mr-2" />
                  Demander un devis
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Truck size={16} className="text-[#D4A853]" />
                Livraison 2-5 jours
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield size={16} className="text-[#D4A853]" />
                Garantie 2 ans
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <RotateCcw size={16} className="text-[#D4A853]" />
                Retour 30 jours
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Check size={16} className="text-[#D4A853]" />
                Pro certifié
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="specs" className="mb-12">
          <TabsList className="bg-[#141415] border border-white/10">
            <TabsTrigger value="specs" className="data-[state=active]:bg-[#1C1C1E]">Spécifications</TabsTrigger>
            <TabsTrigger value="shipping" className="data-[state=active]:bg-[#1C1C1E]">Livraison</TabsTrigger>
            <TabsTrigger value="warranty" className="data-[state=active]:bg-[#1C1C1E]">Garantie</TabsTrigger>
          </TabsList>
          <TabsContent value="specs">
            <Card className="bg-[#141415] border-white/10">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">Référence</span>
                    <span className="text-white">{product.id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">Catégorie</span>
                    <span className="text-white">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">Prix HT</span>
                    <span className="text-white">{product.priceHT.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">Prix TTC</span>
                    <span className="text-white">{priceTTC.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">TVA</span>
                    <span className="text-white">20%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">Disponibilité</span>
                    <span className="text-green-400">En stock</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="shipping">
            <Card className="bg-[#141415] border-white/10">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="text-[#D4A853] mt-1" size={20} />
                    <div>
                      <p className="text-white font-medium">Livraison standard</p>
                      <p className="text-gray-400 text-sm">2 à 5 jours ouvrés - 15 € HT (gratuite dès 500 € HT)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="text-[#D4A853] mt-1" size={20} />
                    <div>
                      <p className="text-white font-medium">Livraison express</p>
                      <p className="text-gray-400 text-sm">24 à 48h - 35 € HT</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="text-[#D4A853] mt-1" size={20} />
                    <div>
                      <p className="text-white font-medium">Retrait en magasin</p>
                      <p className="text-gray-400 text-sm">Gratuit - disponible dès demain</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="warranty">
            <Card className="bg-[#141415] border-white/10">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="text-[#D4A853] mt-1" size={20} />
                    <div>
                      <p className="text-white font-medium">Garantie constructeur</p>
                      <p className="text-gray-400 text-sm">2 ans pièces et main d'œuvre</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RotateCcw className="text-[#D4A853] mt-1" size={20} />
                    <div>
                      <p className="text-white font-medium">Satisfait ou remboursé</p>
                      <p className="text-gray-400 text-sm">Retour sous 30 jours dans l'emballage d'origine</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Produits similaires</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`}>
                  <Card className="bg-[#141415] border-white/10 hover:border-[#D4A853]/30 transition-colors overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-3">
                      <p className="text-xs text-[#D4A853] mb-1">{p.category}</p>
                      <h3 className="text-sm font-medium text-white line-clamp-2 mb-2">{p.name}</h3>
                      <p className="text-sm font-bold text-white">{p.priceHT.toFixed(2)} € HT</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
