import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-[#D4A853] mb-6" />
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-xl font-bold text-white mb-4">Page non trouvée</h2>
        <p className="text-gray-400 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/">
          <Button className="bg-[#D4A853] text-[#0A0A0B]">
            <ArrowLeft size={16} className="mr-2" />
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
}
