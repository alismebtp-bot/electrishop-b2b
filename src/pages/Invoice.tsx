import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Printer, Download, ArrowLeft, FileText, Building2, MapPin, Phone, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const invoices = [
  {
    id: "FAC-2024-001",
    orderId: "CMD-123456",
    date: "2024-12-24",
    dueDate: "2025-01-24",
    status: "payee",
    client: {
      name: "SARL BTP Construction",
      address: "45 rue du Commerce",
      city: "75015 Paris",
      siret: "123 456 789 00012",
      email: "contact@btp-construction.fr",
      phone: "01 23 45 67 89",
    },
    items: [
      { ref: "CABLE-R2V-3G25", name: "Câble R2V 3G2.5", qty: 100, unitPrice: 1.20 },
      { ref: "LED-PAN-600", name: "Panneau LED 600x600", qty: 20, unitPrice: 35.00 },
    ],
  },
];

export default function Invoice() {
  const { id } = useParams<{ id: string }>();
  const printRef = useRef<HTMLDivElement>(null);
  const invoice = invoices.find((i) => i.id === id) || invoices[0];

  const subtotal = invoice.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const vat = subtotal * 0.20;
  const total = subtotal + vat;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/account?tab=orders">
              <Button variant="outline" size="sm">
                <ArrowLeft size={16} className="mr-2" />
                Retour
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">{invoice.id}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer size={16} className="mr-2" />
              Imprimer
            </Button>
            <Button className="bg-[#D4A853] text-[#0A0A0B]">
              <Download size={16} className="mr-2" />
              PDF
            </Button>
          </div>
        </div>

        <div ref={printRef} className="bg-white text-black rounded-xl p-8 print:p-0">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold">ElectriShop Pro</h2>
              <p className="text-sm text-gray-600">12 avenue de l'Industrie</p>
              <p className="text-sm text-gray-600">75011 Paris</p>
              <p className="text-sm text-gray-600">SIRET: 987 654 321 00021</p>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold">FACTURE</h3>
              <p className="text-sm text-gray-600">{invoice.id}</p>
              <p className="text-sm text-gray-600">Date: {new Date(invoice.date).toLocaleDateString("fr-FR")}</p>
              <p className="text-sm text-gray-600">Échéance: {new Date(invoice.dueDate).toLocaleDateString("fr-FR")}</p>
            </div>
          </div>

          {/* Client */}
          <div className="mb-8">
            <p className="text-sm font-medium text-gray-500 mb-2">FACTURÉ À</p>
            <p className="font-bold">{invoice.client.name}</p>
            <p className="text-sm">{invoice.client.address}</p>
            <p className="text-sm">{invoice.client.city}</p>
            <p className="text-sm">SIRET: {invoice.client.siret}</p>
          </div>

          {/* Items */}
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-2">Référence</th>
                <th className="text-left py-2">Désignation</th>
                <th className="text-right py-2">Qté</th>
                <th className="text-right py-2">Prix unit. HT</th>
                <th className="text-right py-2">Total HT</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-2 text-sm">{item.ref}</td>
                  <td className="py-2">{item.name}</td>
                  <td className="py-2 text-right">{item.qty}</td>
                  <td className="py-2 text-right">{item.unitPrice.toFixed(2)} €</td>
                  <td className="py-2 text-right">{(item.qty * item.unitPrice).toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-1">
                <span>Total HT</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between py-1">
                <span>TVA 20%</span>
                <span>{vat.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between py-2 border-t-2 border-black font-bold text-lg">
                <span>Total TTC</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>ElectriShop Pro - 12 avenue de l'Industrie, 75011 Paris</p>
            <p>TVA FR12 345 678 901 - SIRET 987 654 321 00021</p>
            <p>Conditions de paiement: 30 jours nets</p>
          </div>
        </div>
      </div>
    </div>
  );
}
