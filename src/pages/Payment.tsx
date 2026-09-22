import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  CreditCard, ArrowLeft, Lock, CheckCircle, Truck,
  Building2, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart, useApp } from "@/context/AppContext";

export default function Payment() {
  const navigate = useNavigate();
  const { items, totalHT, clearCart } = useCart();
  const { dispatch } = useApp();
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [method, setMethod] = useState<"card" | "transfer">("card");

  const totalTTC = totalHT * 1.2;
  const shipping = totalHT > 500 ? 0 : 15;
  const finalTotal = totalTTC + shipping;

  const handlePay = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setDone(true);
    clearCart();
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">Paiement confirmé !</h1>
          <p className="text-gray-400 mb-2">
            Votre commande a été validée. Un email de confirmation vous a été envoyé.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            N° de commande: CMD-{Date.now().toString().slice(-6)}
          </p>
          <Link to="/account?tab=orders">
            <Button className="bg-[#D4A853] text-[#0A0A0B]">
              Voir mes commandes
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <CreditCard className="mx-auto h-16 w-16 text-gray-600 mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">Panier vide</h1>
          <p className="text-gray-400 mb-8">Ajoutez des produits pour procéder au paiement.</p>
          <Link to="/products">
            <Button className="bg-[#D4A853] text-[#0A0A0B]">Continuer les achats</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/checkout">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Retour
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">Paiement</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Method */}
            <Card className="bg-[#141415] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Mode de paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => setMethod("card")}
                    className={`p-4 rounded-xl border transition-colors text-left ${
                      method === "card"
                        ? "border-[#D4A853] bg-[#D4A853]/5"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <CreditCard size={24} className="text-[#D4A853] mb-2" />
                    <p className="text-sm font-medium text-white">Carte bancaire</p>
                    <p className="text-xs text-gray-500">Visa, Mastercard</p>
                  </button>
                  <button
                    onClick={() => setMethod("transfer")}
                    className={`p-4 rounded-xl border transition-colors text-left ${
                      method === "transfer"
                        ? "border-[#D4A853] bg-[#D4A853]/5"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <Building2 size={24} className="text-[#D4A853] mb-2" />
                    <p className="text-sm font-medium text-white">Virement</p>
                    <p className="text-xs text-gray-500">SEPA, 3 jours</p>
                  </button>
                </div>

                {method === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-400">Numéro de carte</Label>
                      <div className="relative mt-1">
                        <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <Input placeholder="4242 4242 4242 4242" className="pl-9" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-400">Date d'expiration</Label>
                        <Input placeholder="MM/AA" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-gray-400">CVC</Label>
                        <div className="relative mt-1">
                          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                          <Input placeholder="123" className="pl-9" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-400">Titulaire</Label>
                      <div className="relative mt-1">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <Input placeholder="JEAN DUPONT" className="pl-9" />
                      </div>
                    </div>
                  </div>
                )}

                {method === "transfer" && (
                  <div className="bg-[#1C1C1E] rounded-lg p-4">
                    <p className="text-sm text-white font-medium mb-2">Coordonnées bancaires</p>
                    <p className="text-sm text-gray-400">IBAN: FR76 3000 1000 0100 0000 0000 000</p>
                    <p className="text-sm text-gray-400">BIC: SOGEFRPP</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Votre commande sera traitée dès réception du virement.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card className="bg-[#141415] border-white/10 sticky top-32">
              <CardHeader>
                <CardTitle className="text-white">Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-gray-400">{item.product.name} x{item.quantity}</span>
                      <span className="text-white">{(item.product.priceHT * item.quantity).toFixed(2)} €</span>
                    </div>
                  ))}
                </div>
                <Separator className="bg-white/10 my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total HT</span>
                    <span className="text-white">{totalHT.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">TVA 20%</span>
                    <span className="text-white">{(totalHT * 0.2).toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Livraison</span>
                    <span className="text-white">{shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} €`}</span>
                  </div>
                </div>
                <Separator className="bg-white/10 my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Total TTC</span>
                  <span className="text-[#D4A853]">{finalTotal.toFixed(2)} €</span>
                </div>
                <Button
                  className="w-full mt-6 bg-[#D4A853] text-[#0A0A0B]"
                  onClick={handlePay}
                  disabled={processing}
                >
                  {processing ? "Traitement..." : `Payer ${finalTotal.toFixed(2)} €`}
                </Button>
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                  <Lock size={12} />
                  Paiement sécurisé SSL
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
