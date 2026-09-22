import { useState } from 'react';
import { Store, CheckCircle, ChevronRight, ChevronLeft, Upload, MapPin, Phone, Mail, User } from 'lucide-react';

interface OnboardingData {
  storeName: string;
  siret: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  managerName: string;
  managerEmail: string;
  categories: string[];
}

const STEPS = [
  { id: 1, title: 'Informations', description: 'Informations de base' },
  { id: 2, title: 'Contact', description: 'Responsable' },
  { id: 3, title: 'Catégories', description: 'Spécialités' },
  { id: 4, title: 'Validation', description: 'Vérification' },
];

const CATEGORIES = [
  'Disjoncteurs', 'Câbles', 'Ampoules LED', 'Outillage',
  'Connectique', 'Tableaux électriques', 'Domotique', 'Éclairage industriel'
];

export default function StoreOnboarding() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    storeName: '', siret: '', address: '', city: '', phone: '', email: '',
    managerName: '', managerEmail: '', categories: [],
  });

  const updateField = (field: keyof OnboardingData, value: string | string[]) => {
    setData({ ...data, [field]: value });
  };

  const toggleCategory = (cat: string) => {
    const cats = data.categories.includes(cat)
      ? data.categories.filter(c => c !== cat)
      : [...data.categories, cat];
    updateField('categories', cats);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3">
        <Store size={28} className="text-[#D4A853]" />
        Intégration magasin
      </h1>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= s.id ? 'bg-[#D4A853] text-[#0A0A0B]' : 'bg-[#1C1C1E] text-gray-500'
            }`}>
              {step > s.id ? <CheckCircle size={16} /> : s.id}
            </div>
            <div className="hidden md:block">
              <p className="text-sm text-white font-medium">{s.title}</p>
              <p className="text-xs text-gray-500">{s.description}</p>
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 ${step > s.id ? 'bg-[#D4A853]' : 'bg-[#1C1C1E]'}`} />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Informations du magasin</h3>
            {[
              { key: 'storeName', label: 'Nom du magasin', type: 'text' },
              { key: 'siret', label: 'SIRET', type: 'text' },
              { key: 'address', label: 'Adresse', type: 'text' },
              { key: 'city', label: 'Ville / Code postal', type: 'text' },
              { key: 'phone', label: 'Téléphone', type: 'tel' },
              { key: 'email', label: 'Email', type: 'email' },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm text-gray-400 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  value={data[field.key as keyof OnboardingData] as string}
                  onChange={(e) => updateField(field.key as keyof OnboardingData, e.target.value)}
                  className="w-full h-11 px-4 bg-[#0A0A0B] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4A853]"
                />
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Responsable</h3>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nom complet</label>
              <input
                type="text"
                value={data.managerName}
                onChange={(e) => updateField('managerName', e.target.value)}
                className="w-full h-11 px-4 bg-[#0A0A0B] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4A853]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={data.managerEmail}
                onChange={(e) => updateField('managerEmail', e.target.value)}
                className="w-full h-11 px-4 bg-[#0A0A0B] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4A853]"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Catégories proposées</h3>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    data.categories.includes(cat)
                      ? 'bg-[#D4A853]/20 border-[#D4A853] text-white'
                      : 'bg-[#0A0A0B] border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {data.categories.includes(cat) && <CheckCircle size={16} className="text-[#D4A853]" />}
                    <span>{cat}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={32} className="text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Presque terminé !</h3>
            <p className="text-gray-400">Vérifiez vos informations avant de soumettre la demande.</p>
            <div className="text-left bg-[#0A0A0B] rounded-lg p-4 space-y-2 text-sm">
              <p className="text-gray-400"><span className="text-gray-500">Magasin:</span> {data.storeName}</p>
              <p className="text-gray-400"><span className="text-gray-500">SIRET:</span> {data.siret}</p>
              <p className="text-gray-400"><span className="text-gray-500">Adresse:</span> {data.address}, {data.city}</p>
              <p className="text-gray-400"><span className="text-gray-500">Contact:</span> {data.phone} / {data.email}</p>
              <p className="text-gray-400"><span className="text-gray-500">Responsable:</span> {data.managerName}</p>
              <p className="text-gray-400"><span className="text-gray-500">Catégories:</span> {data.categories.join(', ')}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="flex items-center gap-2 px-6 py-3 bg-[#1C1C1E] text-gray-400 rounded-lg font-medium disabled:opacity-50 hover:text-white transition-all"
        >
          <ChevronLeft size={18} /> Précédent
        </button>
        {step < 4 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-2 px-6 py-3 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all"
          >
            Suivant <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={() => alert('Demande soumise !')}
            className="flex items-center gap-2 px-6 py-3 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all"
          >
            <CheckCircle size={18} /> Soumettre
          </button>
        )}
      </div>
    </div>
  );
}
