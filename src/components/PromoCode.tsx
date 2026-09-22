import { useState } from 'react';
import { Ticket, CheckCircle, XCircle } from 'lucide-react';

interface PromoCodeProps {
  onApply: (code: string, discount: number) => void;
}

const VALID_CODES: Record<string, number> = {
  'BIENVENUE': 10,
  'PRO2026': 15,
  'STOCK10': 10,
  'FIDELITE': 5,
};

export default function PromoCode({ onApply }: PromoCodeProps) {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleApply = () => {
    const upperCode = code.trim().toUpperCase();
    if (VALID_CODES[upperCode]) {
      setStatus('success');
      setMessage(`Code appliqué : -${VALID_CODES[upperCode]}%`);
      onApply(upperCode, VALID_CODES[upperCode]);
    } else {
      setStatus('error');
      setMessage('Code invalide ou expiré');
    }
  };

  return (
    <div className="bg-[#141415] rounded-xl p-4 border border-white/10">
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <Ticket size={18} className="text-[#D4A853]" />
        Code promo
      </h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => { setCode(e.target.value); setStatus('idle'); }}
          placeholder="Entrez votre code"
          className="flex-1 h-10 px-3 bg-[#0A0A0B] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4A853] uppercase"
        />
        <button
          onClick={handleApply}
          className="px-4 h-10 bg-[#D4A853] text-[#0A0A0B] rounded-lg text-sm font-semibold hover:brightness-110 transition-all"
        >
          Appliquer
        </button>
      </div>
      {status !== 'idle' && (
        <div className={`flex items-center gap-2 mt-2 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {status === 'success' ? <CheckCircle size={14} /> : <XCircle size={14} />}
          {message}
        </div>
      )}
    </div>
  );
}
