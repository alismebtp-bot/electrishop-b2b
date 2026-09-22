import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Truck, ArrowLeft, CheckCircle, Upload, MapPin,
  User, Mail, Phone, FileText, CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DriverSignup() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    licenseNumber: "",
    vehicleType: "",
    iban: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">
            Inscription envoyée !
          </h1>
          <p className="text-gray-400 mb-8">
            Notre équipe vérifie votre dossier et vous contactera sous 48h pour finaliser votre inscription.
          </p>
          <Link to="/">
            <Button className="bg-[#D4A853] text-[#0A0A0B]">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Retour
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">
            Devenir livreur
          </h1>
        </div>

        <Card className="bg-[#141415] border-white/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D4A853]/10 rounded-lg flex items-center justify-center">
                <Truck size={20} className="text-[#D4A853]" />
              </div>
              <div>
                <CardTitle className="text-white">Inscription livreur</CardTitle>
                <p className="text-sm text-gray-500">Rejoignez notre réseau de livraison</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">Prénom</Label>
                  <div className="relative mt-1">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Input required className="pl-9" placeholder="Jean" />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-400">Nom</Label>
                  <div className="relative mt-1">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Input required className="pl-9" placeholder="Dupont" />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-400">Email</Label>
                  <div className="relative mt-1">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Input type="email" required className="pl-9" placeholder="jean@email.com" />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-400">Téléphone</Label>
                  <div className="relative mt-1">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Input required className="pl-9" placeholder="06 12 34 56 78" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-gray-400">Adresse</Label>
                  <div className="relative mt-1">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Input required className="pl-9" placeholder="12 rue de Paris" />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-400">Ville</Label>
                  <Input required placeholder="Paris" />
                </div>
                <div>
                  <Label className="text-gray-400">Code postal</Label>
                  <Input required placeholder="75001" />
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">N° permis de conduire</Label>
                  <div className="relative mt-1">
                    <FileText size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Input required className="pl-9" placeholder="123456789" />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-400">Type de véhicule</Label>
                  <Input required placeholder="Camionnette, utilitaire..." />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-gray-400">IBAN</Label>
                  <div className="relative mt-1">
                    <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <Input className="pl-9" placeholder="FR76 3000 1000 0100 0000 0000 000" />
                  </div>
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div className="space-y-4">
                <p className="text-sm font-medium text-white">Documents requis</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-white/20 transition-colors cursor-pointer">
                    <Upload size={24} className="mx-auto text-gray-500 mb-2" />
                    <p className="text-sm text-gray-400">Carte d'identité</p>
                    <p className="text-xs text-gray-600">PDF, JPG ou PNG</p>
                  </div>
                  <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-white/20 transition-colors cursor-pointer">
                    <Upload size={24} className="mx-auto text-gray-500 mb-2" />
                    <p className="text-sm text-gray-400">Permis de conduire</p>
                    <p className="text-xs text-gray-600">PDF, JPG ou PNG</p>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#D4A853] text-[#0A0A0B]">
                Envoyer ma candidature
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
