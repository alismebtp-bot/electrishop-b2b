import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VendorLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Demo login
    if (email === "vendor@demo.com" && password === "demo") {
      navigate("/vendor");
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#D4A853]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Store size={32} className="text-[#D4A853]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Espace Vendeur</h1>
          <p className="text-gray-400 mt-2">Connectez-vous à votre espace vendeur</p>
        </div>

        <Card className="bg-[#141415] border-white/10">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-gray-400">Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vendor@demo.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-400">Mot de passe</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="demo"
                  className="mt-1"
                />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <Button type="submit" className="w-full bg-[#D4A853] text-[#0A0A0B]">
                Se connecter
              </Button>
            </form>
            <div className="mt-4 p-3 bg-[#1C1C1E] rounded-lg">
              <p className="text-xs text-gray-500">Demo: vendor@demo.com / demo</p>
            </div>
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
