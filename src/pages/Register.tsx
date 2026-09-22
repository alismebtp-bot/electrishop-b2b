import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlus, ArrowLeft, Eye, EyeOff, Building2, User,
  Mail, Phone, Lock, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/context/AppContext";

export default function Register() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    siret: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: Date.now().toString(),
        title: "Inscription réussie",
        message: "Votre compte a été créé. Bienvenue sur ElectriShop Pro !",
        type: "success",
        read: false,
        date: new Date().toISOString(),
      },
    });
    dispatch({ type: "LOGIN", payload: { email: formData.email, role: "client" } });
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#D4A853]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus size={32} className="text-[#D4A853]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Créer un compte</h1>
          <p className="text-gray-400 mt-2">Accédez aux prix professionnels</p>
        </div>

        <Card className="bg-[#141415] border-white/10">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <div>
                    <Label className="text-gray-400">Nom de l'entreprise</Label>
                    <div className="relative mt-1">
                      <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <Input
                        required
                        className="pl-9"
                        placeholder="SARL Construction"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400">SIRET</Label>
                    <Input
                      required
                      placeholder="123 456 789 00012"
                      value={formData.siret}
                      onChange={(e) => handleChange("siret", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-400">Prénom</Label>
                      <div className="relative mt-1">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <Input
                          required
                          className="pl-9"
                          placeholder="Jean"
                          value={formData.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-400">Nom</Label>
                      <Input
                        required
                        placeholder="Dupont"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>
                  <Button type="button" className="w-full bg-[#D4A853] text-[#0A0A0B]" onClick={() => setStep(2)}>
                    Continuer
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <Label className="text-gray-400">Email</Label>
                    <div className="relative mt-1">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <Input
                        type="email"
                        required
                        className="pl-9"
                        placeholder="jean@entreprise.fr"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400">Téléphone</Label>
                    <div className="relative mt-1">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <Input
                        required
                        className="pl-9"
                        placeholder="06 12 34 56 78"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400">Mot de passe</Label>
                    <div className="relative mt-1">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        required
                        className="pl-9"
                        placeholder="Min. 8 caractères"
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                      Retour
                    </Button>
                    <Button type="button" className="flex-1 bg-[#D4A853] text-[#0A0A0B]" onClick={() => setStep(3)}>
                      Continuer
                    </Button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <Label className="text-gray-400">Adresse</Label>
                    <div className="relative mt-1">
                      <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <Input
                        required
                        className="pl-9"
                        placeholder="12 rue de Paris"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-400">Ville</Label>
                      <Input
                        required
                        placeholder="Paris"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400">Code postal</Label>
                      <Input
                        required
                        placeholder="75001"
                        value={formData.postalCode}
                        onChange={(e) => handleChange("postalCode", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(2)}>
                      Retour
                    </Button>
                    <Button type="submit" className="flex-1 bg-[#D4A853] text-[#0A0A0B]">
                      Créer mon compte
                    </Button>
                  </div>
                </>
              )}
            </form>

            <Separator className="my-4 bg-white/10" />

            <p className="text-center text-sm text-gray-500">
              Déjà inscrit ?{" "}
              <Link to="/login" className="text-[#D4A853] hover:underline">
                Se connecter
              </Link>
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-[#D4A853] text-sm hover:underline inline-flex items-center gap-1">
            <ArrowLeft size={14} />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
