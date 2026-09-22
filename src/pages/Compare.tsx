import React from "react";
import { Link } from "react-router-dom";
import { X, ShoppingCart, Check, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/data/products";

export default function Compare() {
  // Demo: compare first 3 products
  const compareIds = ["CABLE-R2V-3G25", "LED-PAN-600", "TBL-LEG-48"];
  const compareProducts = products.filter((p) => compareIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Comparateur de produits</h1>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 text-gray-500 font-medium min-w-[150px]">Caractéristique</th>
                {compareProducts.map((product) => (
                  <th key={product.id} className="p-4 min-w-[250px]">
                    <Card className="bg-[#141415] border-white/10 overflow-hidden">
                      <div className="aspect-square overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <p className="text-xs text-[#D4A853] mb-1">{product.category}</p>
                        <h3 className="text-sm font-medium text-white line-clamp-2 mb-2">{product.name}</h3>
                        <p className="text-lg font-bold text-white">{product.priceHT.toFixed(2)} € HT</p>
                        <div className="flex gap-2 mt-3">
                          <Link to={`/product/${product.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              Voir
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className="p-4 text-gray-400">Prix HT</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center text-white font-medium">{p.priceHT.toFixed(2)} €</td>
                ))}
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-4 text-gray-400">Prix TTC</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center text-white">{(p.priceHT * 1.2).toFixed(2)} €</td>
                ))}
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-4 text-gray-400">Catégorie</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center text-white">{p.category}</td>
                ))}
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-4 text-gray-400">Référence</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center text-gray-500 font-mono text-sm">{p.id}</td>
                ))}
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-4 text-gray-400">Garantie</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <Check size={16} className="text-green-500 mx-auto" />
                  </td>
                ))}
              </tr>
              <tr className="border-t border-white/10">
                <td className="p-4 text-gray-400">Livraison express</td>
                {compareProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <Check size={16} className="text-green-500 mx-auto" />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
