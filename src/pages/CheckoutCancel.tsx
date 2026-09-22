import React from "react";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <XCircle className="mx-auto h-16 w-16 text-red-500 mb-6" />
        <h1 className="text-2xl font-bold text-white mb-4">
          Paiement annulé
        </h1>
        <p className="text-gray-400 mb-8">
          Votre paiement a été annulé. Aucun montant n'a été débité. Vous pouvez réessayer à tout moment.
        </p>
        <div className="flex flex-col gap-3">
          <Link to="/cart">
            <Button className="w-full bg-[#D4A853] text-[#0A0A0B]">
              Retour au panier
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
