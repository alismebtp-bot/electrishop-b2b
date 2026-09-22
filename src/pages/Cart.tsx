import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowRight,
  FileText, Truck, Package, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart, useApp, useUser, useQuotes } from "@/context/AppContext";
import { products } from "@/data/products";

const TVA_RATE = 0.20;

const deliveryOptions = [
  { id: "standard", label: "Livraison standard", price: 15, delay: "2-5 jours ouvrés" },
  { id: "express", label: "Livraison express", price: 35, delay: "24-48h" },
  { id: "pickup", label: "Retrait en magasin", price: 0, delay: "Dès demain" },
];

export default function Cart() {
  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { dispatch } = useApp();
  const { isLoggedIn } = useUser();
  const { addQuote } = useQuotes();
  const navigate = useNavigate();
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [quoteMode, setQuoteMode] = useState(false);
  const [quoteNotes, setQuoteNotes] = useState("");

  const deliveryPrice = deliveryOptions.find((d) => d.id === deliveryMethod)?.price || 15;
  const subtotal = cartTotal;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tva = (subtotal - discount) * TVA_RATE;
  const totalTTC = subtotal - discount + tva + deliveryPrice;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "ELECTRI10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Code promo invalide");
      setPromoApplied(false);
    }
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate("/login?redirect=/checkout");
      return;
    }
    navigate("/checkout");
  };

  const handleQuoteRequest = () => {
    if (cart.length === 0) return;
    const quote = {
      id: `DEV-${Date.now()}`,
      items: cart,
      total: subtotal,
      status: "pending" as const,
      date: new Date().toISOString(),
      notes: quoteNotes,
    };
    addQuote(quote);
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: Date.now().toString(),
        title: "Devis demandé",
        message: `Votre devis ${quote.id} a été envoyé. Notre équipe vous contactera sous 24h.`,
        type: "success",
        read: false,
        date: new Date().toISOString(),
      },
    });
    clearCart();
    navigate("/account?tab=quotes");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-600 mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">
            Votre panier est vide
          </h1>
          <p className="text-gray-400 mb-8">
            Découvrez notre catalogue de matériel électrique professionnel.
          </p>
          <Link to="/products">
            <Button className="bg-[#D4A853] text-[#0A0A0B] px-8">
              Explorer les produits
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Mon panier ({cartCount} article{cartCount > 1 ? "s" : ""})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(({ product, quantity }) => (
              <Card key={product.id} className="bg-[#141415] border-white/10">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 rounded-lg object-cover bg-[#1C1C1E] flex-shrink-0"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link to={`/product/${product.id}`}>
                            <h3 className="text-sm font-medium text-white hover:text-[#D4A853] transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-[#D4A853] mt-1">{product.category}</p>
                          <p className="text-xs text-gray-500 mt-1">Réf: {product.id}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(product.id)}
                          className="text-red-500 hover:text-red-400 flex-shrink-0"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-10 text-center text-sm text-white font-medium">
                            {quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-white">
                            {(product.priceHT * quantity).toFixed(2)} € HT
                          </p>
                          <p className="text-xs text-gray-500">
                            {(product.priceHT * quantity * (1 + TVA_RATE)).toFixed(2)} € TTC
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={clearCart} className="text-red-500">
                <Trash2 size={16} className="mr-2" />
                Vider le panier
              </Button>
              <Link to="/products">
                <Button variant="ghost">
                  Continuer mes achats
                </Button>
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <Card className="bg-[#141415] border-white/10 sticky top-32">
              <CardHeader>
                <CardTitle className="text-white text-lg">Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Delivery Options */}
                <div>
                  <p className="text-sm font-medium text-white mb-3">Mode de livraison</p>
                  <div className="space-y-2">
                    {deliveryOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          deliveryMethod === option.id
                            ? "border-[#D4A853] bg-[#D4A853]/5"
                            : "border-white/10 hover:border-white/20"
                        }`}
                        onClick={() => setDeliveryMethod(option.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              deliveryMethod === option.id ? "border-[#D4A853]" : "border-white/20"
                            }`}>
                              {deliveryMethod === option.id && (
                                <div className="w-2 h-2 rounded-full bg-[#D4A853]" />
                              )}
                            </div>
                            <span className="text-sm text-white">{option.label}</span>
                          </div>
                          <span className="text-sm font-medium text-white">
                            {option.price === 0 ? "Gratuit" : `${option.price.toFixed(2)} €`}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 ml-6 mt-1">{option.delay}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Promo Code */}
                <div>
                  <p className="text-sm font-medium text-white mb-2">Code promo</p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="ELECTRI10"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={handleApplyPromo}>
                      Appliquer
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-green-400 mt-1">Code promo appliqué : -10%</p>
                  )}
                  {promoError && (
                    <p className="text-xs text-red-400 mt-1">{promoError}</p>
                  )}
                </div>

                <Separator className="bg-white/10" />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Sous-total HT</span>
                    <span className="text-white">{subtotal.toFixed(2)} €</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400">Remise (-10%)</span>
                      <span className="text-green-400">-{discount.toFixed(2)} €</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">TVA (20%)</span>
                    <span className="text-white">{tva.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Livraison</span>
                    <span className="text-white">
                      {deliveryPrice === 0 ? "Gratuit" : `${deliveryPrice.toFixed(2)} €`}
                    </span>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-white">Total TTC</span>
                    <span className="text-xl font-bold text-[#D4A853]">{totalTTC.toFixed(2)} €</span>
                  </div>
                  <p className="text-xs text-gray-500 text-right">
                    Soit {(totalTTC / 1.2).toFixed(2)} € HT
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <Button
                    className="w-full bg-[#D4A853] text-[#0A0A0B] font-semibold"
                    onClick={handleCheckout}
                  >
                    Passer commande
                    <ArrowRight size={16} className="ml-2" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setQuoteMode(!quoteMode)}
                  >
                    <FileText size={16} className="mr-2" />
                    Demander un devis
                  </Button>
                </div>

                {quoteMode && (
                  <div className="p-3 bg-[#1C1C1E] rounded-lg border border-white/10">
                    <p className="text-sm text-gray-400 mb-2">Notes pour le devis</p>
                    <textarea
                      className="w-full bg-[#141415] border border-white/10 rounded-lg p-2 text-sm text-white placeholder:text-gray-600 resize-none"
                      rows={3}
                      placeholder="Précisez vos besoins (délai, quantité, etc.)..."
                      value={quoteNotes}
                      onChange={(e) => setQuoteNotes(e.target.value)}
                    />
                    <Button
                      className="w-full mt-2 bg-[#D4A853] text-[#0A0A0B]"
                      onClick={handleQuoteRequest}
                    >
                      Envoyer la demande
                    </Button>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <AlertCircle size={14} />
                  <span>Prix HT affichés. TVA 20% ajoutée au checkout.</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
