import { useState } from 'react';
import { Settings, Store, Bell, Shield, CreditCard, Palette, Globe } from 'lucide-react';

interface StoreSettings {
  name: string;
  siret: string;
  address: string;
  phone: string;
  email: string;
  vatNumber: string;
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<StoreSettings>({
    name: 'ElectriShop',
    siret: '123 456 789 00010',
    address: '12 Rue de l\'Électricité, 75001 Paris',
    phone: '01 23 45 67 89',
    email: 'contact@electrishop.fr',
    vatNumber: 'FR12345678910',
  });

  const tabs = [
    { id: 'general', label: 'Général', icon: Store },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'payment', label: 'Paiement', icon: CreditCard },
    { id: 'appearance', label: 'Apparence', icon: Palette },
    { id: 'language', label: 'Langue', icon: Globe },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3">
        <Settings size={28} className="text-[#D4A853]" />
        Paramètres
      </h1>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id ? 'bg-[#D4A853] text-[#0A0A0B]' : 'bg-[#1C1C1E] text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'general' && (
        <div className="bg-[#141415] rounded-xl p-6 border border-white/10 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Informations de l'entreprise</h2>
          {[
            { label: 'Nom de l\'entreprise', key: 'name' },
            { label: 'SIRET', key: 'siret' },
            { label: 'Adresse', key: 'address' },
            { label: 'Téléphone', key: 'phone' },
            { label: 'Email', key: 'email' },
            { label: 'Numéro de TVA', key: 'vatNumber' },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm text-gray-400 mb-1">{field.label}</label>
              <input
                type="text"
                value={settings[field.key as keyof StoreSettings]}
                onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                className="w-full h-11 px-4 bg-[#0A0A0B] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4A853]"
              />
            </div>
          ))}
          <button className="w-full h-12 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all">
            Sauvegarder
          </button>
        </div>
      )}

      {activeTab === 'payment' && (
        <div className="bg-[#141415] rounded-xl p-6 border border-white/10 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-4">Configuration Stripe</h2>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Clé publique Stripe (pk_...)</label>
            <input
              type="text"
              placeholder="pk_test_..."
              className="w-full h-11 px-4 bg-[#0A0A0B] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4A853]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Clé secrète Stripe (sk_...)</label>
            <input
              type="password"
              placeholder="sk_test_..."
              className="w-full h-11 px-4 bg-[#0A0A0B] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4A853]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">URL API backend</label>
            <input
              type="text"
              placeholder="https://api.electrishop.fr"
              className="w-full h-11 px-4 bg-[#0A0A0B] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4A853]"
            />
          </div>
          <button className="w-full h-12 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all">
            Sauvegarder
          </button>
        </div>
      )}

      {activeTab === 'language' && (
        <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Langue par défaut</h2>
          <select className="w-full h-11 px-4 bg-[#0A0A0B] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4A853]">
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
          </select>
        </div>
      )}
    </div>
  );
}
