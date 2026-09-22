import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Truck, Shield, Users, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4A853]/5 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#D4A853]/10 border border-[#D4A853]/20 rounded-full px-4 py-2 mb-8">
            <Zap size={14} className="text-[#D4A853]" />
            <span className="text-sm text-[#D4A853]">B2B Marketplace Électrique</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            ElectriShop
            <span className="block text-[#D4A853]">Pro</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            La marketplace B2B dédiée aux professionnels de l'électricité.
            +400 références, prix HT, livraison express.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/home">
              <Button className="bg-[#D4A853] text-[#0A0A0B] px-10 py-7 text-lg font-semibold">
                Accéder au catalogue
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link to="/quote">
              <Button variant="outline" className="px-10 py-7 text-lg">
                Demander un devis
              </Button>
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div>
              <p className="text-3xl font-bold text-[#D4A853]">400+</p>
              <p className="text-sm text-gray-500 mt-1">Produits</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#D4A853]">500+</p>
              <p className="text-sm text-gray-500 mt-1">Clients pro</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#D4A853]">24h</p>
              <p className="text-sm text-gray-500 mt-1">Devis</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#D4A853]">4.8/5</p>
              <p className="text-sm text-gray-500 mt-1">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Pourquoi choisir ElectriShop ?</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Tout ce dont vous avez besoin pour vos chantiers électriques, au meilleur prix.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#141415] border border-white/10 rounded-xl p-8 text-center hover:border-[#D4A853]/30 transition-colors">
              <div className="w-16 h-16 bg-[#D4A853]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap size={32} className="text-[#D4A853]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Prix professionnels</h3>
              <p className="text-gray-400">
                Tous nos prix sont affichés en HT avec TVA à 20%. Tarifs négociés pour les volumes.
              </p>
            </div>
            <div className="bg-[#141415] border border-white/10 rounded-xl p-8 text-center hover:border-[#D4A853]/30 transition-colors">
              <div className="w-16 h-16 bg-[#D4A853]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Truck size={32} className="text-[#D4A853]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Livraison rapide</h3>
              <p className="text-gray-400">
                Standard 2-5 jours ou express 24-48h. Suivi GPS en temps réel de vos livraisons.
              </p>
            </div>
            <div className="bg-[#141415] border border-white/10 rounded-xl p-8 text-center hover:border-[#D4A853]/30 transition-colors">
              <div className="w-16 h-16 bg-[#D4A853]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield size={32} className="text-[#D4A853]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Qualité garantie</h3>
              <p className="text-gray-400">
                Produits certifiés NF, garantie 2 ans, satisfait ou remboursé sous 30 jours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Prêt à commander ?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Créez votre compte professionnel en 2 minutes et accédez à nos prix HT.
          </p>
          <Link to="/home">
            <Button className="bg-[#D4A853] text-[#0A0A0B] px-10 py-7 text-lg font-semibold">
              Commencer maintenant
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
