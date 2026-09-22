import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Package, Heart, FileText, Settings, User, LogOut,
  ChevronRight, MapPin, Phone, Building, CreditCard,
  Bell, Shield, Truck, CheckCircle, Clock, XCircle,
  Eye, Download, Star, ShoppingBag, Edit, Save, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useUser, useCart, useOrders, useQuotes, useFavorites, useNotifications } from "@/context/AppContext";
import { products } from "@/data/products";

const statusIcons = {
  pending: <Clock size={16} className="text-yellow-500" />,
  processing: <Package size={16} className="text-blue-500" />,
  shipped: <Truck size={16} className="text-purple-500" />,
  delivered: <CheckCircle size={16} className="text-green-500" />,
  cancelled: <XCircle size={16} className="text-red-500" />,
  approved: <CheckCircle size={16} className="text-green-500" />,
  rejected: <XCircle size={16} className="text-red-500" />,
};

const statusLabels = {
  pending: "En attente",
  processing: "En préparation",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
  approved: "Approuvée",
  rejected: "Refusée",
};

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  shipped: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  delivered: "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  approved: "bg-green-500/10 text-green-400 border-green-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function Account() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") || "overview";
  const { user, isLoggedIn, logout, updateUser } = useUser();
  const { orders } = useOrders();
  const { quotes } = useQuotes();
  const { favorites, toggleFavorite } = useFavorites();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    company: user?.company || "",
    siret: user?.siret || "",
    address: user?.address || "",
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <User className="mx-auto h-16 w-16 text-gray-600 mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">
            Connectez-vous
          </h1>
          <p className="text-gray-400 mb-8">
            Accédez à votre compte pour voir vos commandes, devis et favoris.
          </p>
          <Link to="/login">
            <Button className="bg-[#D4A853] text-[#0A0A0B] px-8">
              Se connecter
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    updateUser(profileData);
    setEditingProfile(false);
  };

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Mon compte
            </h1>
            <p className="text-gray-400 mt-1">
              Bienvenue, {user?.name || user?.email}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/cart">
              <Button variant="outline" size="sm">
                <ShoppingBag size={16} className="mr-2" />
                Panier
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut size={16} className="mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#141415] border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Package size={20} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{orders.length}</p>
                  <p className="text-xs text-gray-500">Commandes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141415] border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{quotes.length}</p>
                  <p className="text-xs text-gray-500">Devis</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141415] border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <Heart size={20} className="text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{favorites.length}</p>
                  <p className="text-xs text-gray-500">Favoris</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#141415] border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Bell size={20} className="text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{unreadCount}</p>
                  <p className="text-xs text-gray-500">Notifications</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={tabParam} onValueChange={(v) => setSearchParams({ tab: v })}>
          <TabsList className="bg-[#141415] border border-white/10 mb-8 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#1C1C1E]">
              <User size={14} className="mr-2" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-[#1C1C1E]">
              <Package size={14} className="mr-2" />
              Commandes
            </TabsTrigger>
            <TabsTrigger value="quotes" className="data-[state=active]:bg-[#1C1C1E]">
              <FileText size={14} className="mr-2" />
              Devis
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-[#1C1C1E]">
              <Heart size={14} className="mr-2" />
              Favoris
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-[#1C1C1E]">
              <Bell size={14} className="mr-2" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#1C1C1E]">
              <Settings size={14} className="mr-2" />
              Paramètres
            </TabsTrigger>
          </TabsList>

          {/* Overview / Profile */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-[#141415] border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white text-lg">Informations personnelles</CardTitle>
                    {!editingProfile ? (
                      <Button variant="ghost" size="sm" onClick={() => setEditingProfile(true)}>
                        <Edit size={16} className="mr-2" />
                        Modifier
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setEditingProfile(false)}>
                          <X size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleSaveProfile}>
                          <Save size={16} className="mr-2" />
                          Enregistrer
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-400 text-sm">Nom complet</Label>
                        {editingProfile ? (
                          <Input
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-white mt-1">{user?.name || "Non renseigné"}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm">Email</Label>
                        {editingProfile ? (
                          <Input
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-white mt-1">{user?.email}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm">Téléphone</Label>
                        {editingProfile ? (
                          <Input
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-white mt-1">{user?.phone || "Non renseigné"}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm">Entreprise</Label>
                        {editingProfile ? (
                          <Input
                            value={profileData.company}
                            onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-white mt-1">{user?.company || "Non renseigné"}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm">SIRET</Label>
                        {editingProfile ? (
                          <Input
                            value={profileData.siret}
                            onChange={(e) => setProfileData({ ...profileData, siret: e.target.value })}
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-white mt-1">{user?.siret || "Non renseigné"}</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-gray-400 text-sm">Adresse</Label>
                        {editingProfile ? (
                          <Input
                            value={profileData.address}
                            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                            className="mt-1"
                          />
                        ) : (
                          <p className="text-white mt-1">{user?.address || "Non renseigné"}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-[#141415] border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Résumé</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Shield size={16} className="text-green-500" />
                      <span className="text-sm text-gray-400">Compte vérifié</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building size={16} className="text-blue-500" />
                      <span className="text-sm text-gray-400">Compte professionnel</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CreditCard size={16} className="text-yellow-500" />
                      <span className="text-sm text-gray-400">Paiement sécurisé</span>
                    </div>
                    <Separator className="bg-white/10" />
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Dernière connexion</p>
                      <p className="text-sm text-white">{new Date().toLocaleDateString("fr-FR")}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Orders Preview */}
            {orders.length > 0 && (
              <Card className="bg-[#141415] border-white/10 mt-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white text-lg">Commandes récentes</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSearchParams({ tab: "orders" })}>
                    Voir tout
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#1C1C1E] hover:bg-[#252527] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {statusIcons[order.status as keyof typeof statusIcons] || <Package size={16} className="text-gray-500" />}
                          <div>
                            <p className="text-sm font-medium text-white">{order.id}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(order.date).toLocaleDateString("fr-FR")} · {order.items.length} article(s)
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-white">{order.total.toFixed(2)} € HT</p>
                          <Badge variant="outline" className={statusColors[order.status as keyof typeof statusColors] || ""}>
                            {statusLabels[order.status as keyof typeof statusLabels] || order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders">
            <Card className="bg-[#141415] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Mes commandes</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Aucune commande</h3>
                    <p className="text-gray-500 mb-6">Vous n'avez pas encore passé de commande.</p>
                    <Link to="/products">
                      <Button className="bg-[#D4A853] text-[#0A0A0B]">
                        Découvrir les produits
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                          <div>
                            <p className="text-sm font-medium text-white">{order.id}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(order.date).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className={statusColors[order.status as keyof typeof statusColors] || ""}>
                              {statusLabels[order.status as keyof typeof statusLabels] || order.status}
                            </Badge>
                            <p className="text-sm font-bold text-white">{order.total.toFixed(2)} € HT</p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          {order.items.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-3">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-10 h-10 rounded object-cover bg-[#1C1C1E]"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-white truncate">{item.product.name}</p>
                                <p className="text-xs text-gray-500">
                                  {item.quantity} x {item.product.priceHT.toFixed(2)} € HT
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm">
                            <Eye size={14} className="mr-2" />
                            Détails
                          </Button>
                          {order.trackingNumber && (
                            <Link to={`/tracking?n=${order.trackingNumber}`}>
                              <Button variant="outline" size="sm">
                                <Truck size={14} className="mr-2" />
                                Suivre
                              </Button>
                            </Link>
                          )}
                          <Button variant="outline" size="sm">
                            <Download size={14} className="mr-2" />
                            Facture
                          </Button>
                        </div>

                        {order.estimatedDelivery && (
                          <div className="mt-3 p-3 bg-[#1C1C1E] rounded-lg">
                            <p className="text-xs text-gray-500">Livraison estimée</p>
                            <p className="text-sm text-white">
                              {new Date(order.estimatedDelivery).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                              })}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quotes */}
          <TabsContent value="quotes">
            <Card className="bg-[#141415] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Mes devis</CardTitle>
              </CardHeader>
              <CardContent>
                {quotes.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Aucun devis</h3>
                    <p className="text-gray-500 mb-6">Demandez un devis personnalisé pour vos projets.</p>
                    <Link to="/contact">
                      <Button className="bg-[#D4A853] text-[#0A0A0B]">
                        Demander un devis
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {quotes.map((quote) => (
                      <div
                        key={quote.id}
                        className="border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                          <div>
                            <p className="text-sm font-medium text-white">{quote.id}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(quote.date).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                          <Badge variant="outline" className={statusColors[quote.status] || ""}>
                            {statusLabels[quote.status] || quote.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 mb-3">
                          {quote.items.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-3">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-10 h-10 rounded object-cover bg-[#1C1C1E]"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-white truncate">{item.product.name}</p>
                                <p className="text-xs text-gray-500">Qté: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-white">{quote.total.toFixed(2)} € HT</p>
                          <Button variant="outline" size="sm">
                            <Eye size={14} className="mr-2" />
                            Voir le détail
                          </Button>
                        </div>
                        {quote.notes && (
                          <p className="mt-3 text-xs text-gray-500 bg-[#1C1C1E] p-2 rounded">
                            {quote.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites */}
          <TabsContent value="favorites">
            <Card className="bg-[#141415] border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Mes favoris</CardTitle>
              </CardHeader>
              <CardContent>
                {favoriteProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Aucun favori</h3>
                    <p className="text-gray-500 mb-6">Ajoutez des produits à vos favoris pour les retrouver ici.</p>
                    <Link to="/products">
                      <Button className="bg-[#D4A853] text-[#0A0A0B]">
                        Explorer les produits
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favoriteProducts.map((product) => (
                      <div
                        key={product.id}
                        className="border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-colors"
                      >
                        <Link to={`/product/${product.id}`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover"
                          />
                        </Link>
                        <div className="p-4">
                          <p className="text-xs text-[#D4A853] mb-1">{product.category}</p>
                          <Link to={`/product/${product.id}`}>
                            <h3 className="text-sm font-medium text-white mb-2 hover:text-[#D4A853] transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                          </Link>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-bold text-white">{product.priceHT.toFixed(2)} € HT</p>
                              <p className="text-xs text-gray-500">{(product.priceHT * 1.2).toFixed(2)} € TTC</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleFavorite(product.id)}
                              className="text-red-500 hover:text-red-400"
                            >
                              <Heart size={16} className="fill-current" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card className="bg-[#141415] border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white text-lg">Notifications</CardTitle>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => notifications.forEach((n) => markAsRead(n.id))}>
                    Tout marquer comme lu
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Aucune notification</h3>
                    <p className="text-gray-500">Vous n'avez pas encore reçu de notification.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                          notification.read
                            ? "bg-[#141415] border-white/5"
                            : "bg-[#1C1C1E] border-white/10"
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            notification.type === "success" ? "bg-green-500" :
                            notification.type === "warning" ? "bg-yellow-500" :
                            notification.type === "error" ? "bg-red-500" :
                            "bg-blue-500"
                          }`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className={`text-sm font-medium ${notification.read ? "text-gray-400" : "text-white"}`}>
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-600 flex-shrink-0">
                                {new Date(notification.date).toLocaleDateString("fr-FR")}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-[#D4A853] flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#141415] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Emails de commande</p>
                      <p className="text-xs text-gray-500">Recevoir un email à chaque commande</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Notifications livraison</p>
                      <p className="text-xs text-gray-500">Suivi des expéditions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Offres promotionnelles</p>
                      <p className="text-xs text-gray-500">Nouveautés et promotions</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#141415] border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Sécurité</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-400 text-sm">Mot de passe actuel</Label>
                    <Input type="password" placeholder="••••••••" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Nouveau mot de passe</Label>
                    <Input type="password" placeholder="••••••••" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm">Confirmer le mot de passe</Label>
                    <Input type="password" placeholder="••••••••" className="mt-1" />
                  </div>
                  <Button className="w-full bg-[#D4A853] text-[#0A0A0B]">
                    Mettre à jour le mot de passe
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
