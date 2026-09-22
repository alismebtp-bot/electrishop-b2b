import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Store, Package, ShoppingBag, TrendingUp, DollarSign, Users,
  Plus, Search, Eye, Edit, Trash2, BarChart3, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const vendorProducts = [
  { id: "VEN-001", name: "Câble H07RN-F 3G1.5", price: 2.50, stock: 150, sales: 45 },
  { id: "VEN-002", name: "Panneau LED 120x30", price: 55.00, stock: 30, sales: 12 },
  { id: "VEN-003", name: "Disjoncteur 16A", price: 8.90, stock: 200, sales: 89 },
];

const vendorOrders = [
  { id: "CMD-V001", client: "SARL BTP", amount: 245.50, status: "delivered", date: "2024-12-20" },
  { id: "CMD-V002", client: "Electric Pro", amount: 89.00, status: "shipped", date: "2024-12-22" },
  { id: "CMD-V003", client: "Build Corp", amount: 456.00, status: "processing", date: "2024-12-23" },
];

export default function VendorPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const totalRevenue = vendorOrders.reduce((sum, o) => sum + o.amount, 0);
  const totalOrders = vendorOrders.length;
  const totalProducts = vendorProducts.length;

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#D4A853]/10 rounded-xl flex items-center justify-center">
              <Store size={24} className="text-[#D4A853]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Espace Vendeur</h1>
              <p className="text-gray-500">Gérez votre boutique et vos ventes</p>
            </div>
          </div>
          <Link to="/">
            <Button variant="outline">Retour au site</Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-[#141415] border border-white/10 mb-6">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#1C1C1E]">Tableau de bord</TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-[#1C1C1E]">Produits</TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-[#1C1C1E]">Commandes</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-[#141415] border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Chiffre d'affaires</p>
                      <p className="text-2xl font-bold text-white">{totalRevenue.toFixed(2)} €</p>
                    </div>
                    <DollarSign size={24} className="text-[#D4A853]" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#141415] border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Commandes</p>
                      <p className="text-2xl font-bold text-white">{totalOrders}</p>
                    </div>
                    <ShoppingBag size={24} className="text-[#D4A853]" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#141415] border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Produits</p>
                      <p className="text-2xl font-bold text-white">{totalProducts}</p>
                    </div>
                    <Package size={24} className="text-[#D4A853]" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#141415] border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Clients</p>
                      <p className="text-2xl font-bold text-white">3</p>
                    </div>
                    <Users size={24} className="text-[#D4A853]" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="bg-[#141415] border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Commandes récentes</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("orders")}>
                    Voir tout
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vendorOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-[#1C1C1E] rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-white">{order.id}</p>
                        <p className="text-xs text-gray-500">{order.client} - {new Date(order.date).toLocaleDateString("fr-FR")}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-sm font-bold text-white">{order.amount.toFixed(2)} €</p>
                        <Badge variant="outline" className={
                          order.status === "delivered" ? "text-green-500 border-green-500/30" :
                          order.status === "shipped" ? "text-[#D4A853] border-[#D4A853]/30" :
                          "text-blue-500 border-blue-500/30"
                        }>
                          {order.status === "delivered" ? "Livrée" :
                           order.status === "shipped" ? "Expédiée" : "En préparation"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 flex-1">
                <Search size={16} className="text-gray-500" />
                <Input placeholder="Rechercher un produit..." className="max-w-xs" />
              </div>
              <Button className="bg-[#D4A853] text-[#0A0A0B]">
                <Plus size={16} className="mr-2" />
                Ajouter un produit
              </Button>
            </div>

            <Card className="bg-[#141415] border-white/10">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-gray-500 font-medium">Référence</th>
                      <th className="text-left p-4 text-gray-500 font-medium">Produit</th>
                      <th className="text-right p-4 text-gray-500 font-medium">Prix HT</th>
                      <th className="text-right p-4 text-gray-500 font-medium">Stock</th>
                      <th className="text-right p-4 text-gray-500 font-medium">Ventes</th>
                      <th className="text-right p-4 text-gray-500 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorProducts.map((product) => (
                      <tr key={product.id} className="border-b border-white/5 hover:bg-[#1C1C1E]/50">
                        <td className="p-4 text-sm text-gray-400 font-mono">{product.id}</td>
                        <td className="p-4 text-sm text-white">{product.name}</td>
                        <td className="p-4 text-sm text-white text-right">{product.price.toFixed(2)} €</td>
                        <td className="p-4 text-right">
                          <span className={`text-sm ${product.stock < 50 ? "text-red-400" : "text-green-400"}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-white text-right">{product.sales}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye size={14} className="text-gray-400" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit size={14} className="text-gray-400" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 size={14} className="text-red-400" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="bg-[#141415] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Toutes les commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vendorOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-[#1C1C1E] rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#D4A853]/10 rounded-lg flex items-center justify-center">
                          <ShoppingBag size={18} className="text-[#D4A853]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{order.id}</p>
                          <p className="text-xs text-gray-500">{order.client}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString("fr-FR")}</p>
                        <p className="text-sm font-bold text-white">{order.amount.toFixed(2)} €</p>
                        <Badge variant="outline" className={
                          order.status === "delivered" ? "text-green-500 border-green-500/30" :
                          order.status === "shipped" ? "text-[#D4A853] border-[#D4A853]/30" :
                          "text-blue-500 border-blue-500/30"
                        }>
                          {order.status === "delivered" ? "Livrée" :
                           order.status === "shipped" ? "Expédiée" : "En préparation"}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
