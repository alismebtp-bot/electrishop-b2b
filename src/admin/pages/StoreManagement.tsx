import { useState } from 'react';
import { Store, MapPin, Phone, Mail, Globe, Clock, Edit, Plus, Trash2, CheckCircle } from 'lucide-react';

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  manager: string;
  hours: string;
  isActive: boolean;
}

const mockStores: StoreLocation[] = [
  { id: '1', name: 'Magasin Paris Centre', address: '12 Rue de l\'Électricité', city: '75001 Paris', phone: '01 23 45 67 89', email: 'paris@electrishop.fr', manager: 'Pierre Martin', hours: 'Lun-Sam: 8h-19h', isActive: true },
  { id: '2', name: 'Magasin Lyon', address: '45 Avenue des Bricoleurs', city: '69001 Lyon', phone: '04 56 78 90 12', email: 'lyon@electrishop.fr', manager: 'Marie Dubois', hours: 'Lun-Sam: 8h30-18h30', isActive: true },
  { id: '3', name: 'Magasin Marseille', address: '78 Bd de la République', city: '13001 Marseille', phone: '04 91 23 45 67', email: 'marseille@electrishop.fr', manager: 'Jean Bernard', hours: 'Lun-Ven: 9h-18h', isActive: false },
];

export default function StoreManagement() {
  const [stores, setStores] = useState<StoreLocation[]>(mockStores);
  const [showAdd, setShowAdd] = useState(false);
  const [newStore, setNewStore] = useState({ name: '', address: '', city: '', phone: '', email: '', manager: '', hours: '' });

  const handleAdd = () => {
    if (!newStore.name) return;
    const store: StoreLocation = {
      id: Date.now().toString(),
      ...newStore,
      isActive: true,
    };
    setStores([...stores, store]);
    setShowAdd(false);
    setNewStore({ name: '', address: '', city: '', phone: '', email: '', manager: '', hours: '' });
  };

  const handleDelete = (id: string) => {
    setStores(stores.filter(s => s.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Store size={28} className="text-[#D4A853]" />
          Gestion des magasins
        </h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all"
        >
          <Plus size={18} />
          Ajouter
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#141415] rounded-xl p-6 border border-white/10 space-y-4">
          <h3 className="text-lg font-semibold text-white">Nouveau magasin</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { key: 'name', label: 'Nom' },
              { key: 'address', label: 'Adresse' },
              { key: 'city', label: 'Ville / CP' },
              { key: 'phone', label: 'Téléphone' },
              { key: 'email', label: 'Email' },
              { key: 'manager', label: 'Responsable' },
              { key: 'hours', label: 'Horaires' },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm text-gray-400 mb-1">{field.label}</label>
                <input
                  type="text"
                  value={newStore[field.key as keyof typeof newStore]}
                  onChange={(e) => setNewStore({ ...newStore, [field.key]: e.target.value })}
                  className="w-full h-11 px-4 bg-[#0A0A0B] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4A853]"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="px-6 py-2 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110">
              Ajouter
            </button>
            <button onClick={() => setShowAdd(false)} className="px-6 py-2 bg-[#1C1C1E] text-gray-400 rounded-lg hover:text-white">
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <div key={store.id} className="bg-[#141415] rounded-xl p-5 border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#D4A853]/20 rounded-lg flex items-center justify-center">
                <Store size={24} className="text-[#D4A853]" />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${store.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                {store.isActive ? 'Actif' : 'Inactif'}
              </span>
            </div>
            <h3 className="text-white font-semibold mb-1">{store.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{store.manager}</p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400 flex items-center gap-2"><MapPin size={14} /> {store.address}, {store.city}</p>
              <p className="text-gray-400 flex items-center gap-2"><Phone size={14} /> {store.phone}</p>
              <p className="text-gray-400 flex items-center gap-2"><Mail size={14} /> {store.email}</p>
              <p className="text-gray-400 flex items-center gap-2"><Clock size={14} /> {store.hours}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[#1C1C1E] text-gray-400 rounded-lg text-sm hover:text-white">
                <Edit size={14} /> Modifier
              </button>
              <button
                onClick={() => handleDelete(store.id)}
                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
