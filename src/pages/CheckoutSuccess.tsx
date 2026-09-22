import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/AppContext";

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const orderId = searchParams.get("order_id") || "CMD-" + Date.now();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
        <h1 className="text-2xl font-bold text-white mb-4">
          Commande confirmée !
        </h1>
        <p className="text-gray-400 mb-2">
          Merci pour votre commande. Vous recevrez un email de confirmation sous peu.
        </p>
        <div className="bg-[#141415] rounded-lg p-4 mb-8 border border-white/10">
          <p className="text-sm text-gray-500 mb-1">Numéro de commande</p>
          <p className="text-lg font-mono font-bold text-[#D4A853]">{orderId}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#141415] rounded-lg p-4 border border-white/10">
            <Package className="mx-auto h-6 w-6 text-gray-400 mb-2" />
            <p className="text-xs text-gray-500">Préparation</p>
            <p className="text-sm font-medium text-white">24-48h</p>
          </div>
          <div className="bg-[#141415] rounded-lg p-4 border border-white/10">
            <Truck className="mx-auto h-6 w-6 text-gray-400 mb-2" />
            <p className="text-xs text-gray-500">Livraison</p>
            <p className="text-sm font-medium text-white">2-5 jours</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/account?tab=orders">
            <Button className="w-full bg-[#D4A853] text-[#0A0A0B]">
              Suivre ma commande
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" className="w-full">
              Continuer mes achats
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
