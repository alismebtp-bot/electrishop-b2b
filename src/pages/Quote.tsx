import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText, Plus, Trash2, Send, ArrowLeft, Download,
  CheckCircle, Building, User, Mail, Phone, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { useQuotes, useApp } from "@/context/AppContext";
import type { Product } from "@/data/products";

interface QuoteItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export default function Quote() {
  const navigate = useNavigate();
  const { addQuote } = useQuotes();
  const { dispatch } = useApp();
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    siret: "",
    address: "",
    message: "",
    urgent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addItem = (product: Product) => {
    const exists = items.find((i) => i.product.id === product.id);
    if (exists) {
      setItems(items.map((i) =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setItems([...items, { product, quantity: 1 }]);
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.product.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems(items.map((i) =>
      i.product.id === id ? { ...i, quantity } : i
    ));
  };

  const updateItemNotes = (id: string, notes: string) => {
    setItems(items.map((i) =>
      i.product.id === id ? { ...i, notes } : i
    ));
  };

  const subtotal = items.reduce((sum, i) => sum + i.product.priceHT * i.quantity, 0);
  const tva = subtotal * 0.20;
  const total = subtotal + tva;

  const handleSubmit = () => {
    if (items.length === 0 || !formData.email || !formData.name) return;
    const quote = {
      id: `DEV-${Date.now()}`,
      items: items.map((i) => ({ product: i.product, quantity: i.quantity })),
      total: subtotal,
      status: "pending" as const,
      date: new Date().toISOString(),
      notes: `${formData.message}\n\nUrgent: ${formData.urgent ? "Oui" : "Non"}\nEntreprise: ${formData.company}\nSIRET: ${formData.siret}\nAdresse: ${formData.address}\nTéléphone: ${formData.phone}`,
    };
    addQuote(quote);
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: Date.now().toString(),
        title: "Devis envoyé",
        message: `Votre devis ${quote.id} a été envoyé avec succès. Notre équipe vous contactera sous 24h ouvrées.`,
        type: "success",
        read: false,
        date: new Date().toISOString(),
      },
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">
            Devis envoyé avec succès !
          </h1>
          <p className="text-gray-400 mb-2">
            Notre équipe commerciale étudiera votre demande et vous contactera sous 24h ouvrées.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Un récapitulatif a été envoyé à {formData.email}
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/account?tab=quotes">
              <Button className="w-full bg-[#D4A853] text-[#0A0A0B]">
                Voir mes devis
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

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/products">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Retour
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">
            Demander un devis
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Items & Contact */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Items */}
            <Card className="bg-[#141415] border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white text-lg">Produits sélectionnés</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowProductSelector(!showProductSelector)}
                >
                  <Plus size={16} className="mr-2" />
                  Ajouter un produit
                </Button>
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-10 w-10 text-gray-600 mb-3" />
                    <p className="text-gray-500 text-sm">Aucun produit sélectionné</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => setShowProductSelector(true)}
                    >
                      <Plus size={14} className="mr-2" />
                      Ajouter des produits
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="border border-white/10 rounded-lg p-4">
                        <div className="flex gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 rounded object-cover bg-[#1C1C1E] flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <Link to={`/product/${item.product.id}`}>
                                  <h3 className="text-sm font-medium text-white hover:text-[#D4A853] line-clamp-1">
                                    {item.product.name}
                                  </h3>
                                </Link>
                                <p className="text-xs text-gray-500">Réf: {item.product.id}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.product.id)}
                                className="text-red-500 flex-shrink-0"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                >
                                  <span className="text-xs">-</span>
                                </Button>
                                <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                >
                                  <span className="text-xs">+</span>
                                </Button>
                              </div>
                              <p className="text-sm font-bold text-white">
                                {(item.product.priceHT * item.quantity).toFixed(2)} € HT
                              </p>
                            </div>
                            <Textarea
                              placeholder="Notes spécifiques pour ce produit..."
                              className="mt-3 text-xs min-h-[60px]"
                              value={item.notes || ""}
                              onChange={(e) => updateItemNotes(item.product.id, e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product Selector */}
            {showProductSelector && (
              <Card className="bg-[#141415] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Ajouter des produits</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Rechercher par nom, catégorie ou référence..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-4"
                  />
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {filteredProducts.slice(0, 20).map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                        onClick={() => addItem(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover bg-[#1C1C1E]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                        <p className="text-sm text-[#D4A853] flex-shrink-0">{product.priceHT.toFixed(2)} € HT</p>
                        <Plus size={16} className="text-gray-400 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Form */}
            <Card className="bg-[#141415] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Vos coordonnées</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400 text-sm">Nom complet *</Label>
                    <div className="relative mt-1">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-9"
                        placeholder="Jean Dupont"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Email *</Label>
                    <div className="relative mt-1">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-9"
                        placeholder="jean@entreprise.fr"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Téléphone</Label>
                    <div className="relative mt-1">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-9"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Entreprise</Label>
                    <div className="relative mt-1">
                      <Building size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="pl-9"
                        placeholder="SARL Example"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">SIRET</Label>
                    <Input
                      value={formData.siret}
                      onChange={(e) => setFormData({ ...formData, siret: e.target.value })}
                      placeholder="123 456 789 00010"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Adresse de livraison</Label>
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="12 rue Example, 75001 Paris"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-gray-400 text-sm">Message / Besoins spécifiques</Label>
                    <div className="relative mt-1">
                      <MessageSquare size={16} className="absolute left-3 top-3 text-gray-500" />
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="pl-9 min-h-[100px]"
                        placeholder="Décrivez votre projet, délais souhaités, quantités spéciales..."
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="urgent"
                      checked={formData.urgent}
                      onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                      className="w-4 h-4 rounded border-white/20 bg-[#141415] text-[#D4A853]"
                    />
                    <Label htmlFor="urgent" className="text-sm text-white cursor-pointer">
                      Demande urgente (traitement prioritaire)
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Summary */}
          <div>
            <Card className="bg-[#141415] border-white/10 sticky top-32">
              <CardHeader>
                <CardTitle className="text-white text-lg">Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-gray-400 truncate max-w-[180px]">
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="text-white">
                        {(item.product.priceHT * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="bg-white/10" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Sous-total HT</span>
                    <span className="text-white">{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">TVA (20%)</span>
                    <span className="text-white">{tva.toFixed(2)} €</span>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-white">Total estimé TTC</span>
                    <span className="text-xl font-bold text-[#D4A853]">{total.toFixed(2)} €</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Ce montant est une estimation. Le devis final peut varier selon les quantités et conditions.
                  </p>
                </div>

                <Button
                  className="w-full bg-[#D4A853] text-[#0A0A0B] font-semibold"
                  disabled={items.length === 0 || !formData.name || !formData.email}
                  onClick={handleSubmit}
                >
                  <Send size={16} className="mr-2" />
                  Envoyer le devis
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Notre équipe commerciale vous répondra sous 24h ouvrées.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
