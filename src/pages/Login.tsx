import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/context/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email === "admin@demo.com" && password === "demo") {
      dispatch({ type: "LOGIN", payload: { email, role: "admin" } });
      navigate("/admin");
    } else if (email === "client@demo.com" && password === "demo") {
      dispatch({ type: "LOGIN", payload: { email, role: "client" } });
      navigate("/home");
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#D4A853]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn size={32} className="text-[#D4A853]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Connexion</h1>
          <p className="text-gray-400 mt-2">Accédez à votre espace professionnel</p>
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
                  placeholder="admin@demo.com ou client@demo.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-400">Mot de passe</Label>
                <div className="relative mt-1">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="demo"
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
              {error && <p className="text-sm text-red-400">{error}</p>}
              <Button type="submit" className="w-full bg-[#D4A853] text-[#0A0A0B]">
                Se connecter
              </Button>
            </form>

            <div className="mt-4 p-3 bg-[#1C1C1E] rounded-lg space-y-1">
              <p className="text-xs text-gray-500">Admin: admin@demo.com / demo</p>
              <p className="text-xs text-gray-500">Client: client@demo.com / demo</p>
            </div>

            <Separator className="my-4 bg-white/10" />

            <p className="text-center text-sm text-gray-500">
              Pas encore de compte ?{" "}
              <Link to="/register" className="text-[#D4A853] hover:underline">
                S'inscrire
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
