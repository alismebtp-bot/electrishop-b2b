import { useEffect, useState } from 'react';
import { X, Mail, Gift } from 'lucide-react';

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !sessionStorage.getItem('exitIntentShown')) {
        setShow(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setShow(false), 2000);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-[#141415] rounded-xl p-8 max-w-md w-full border border-white/10 relative">
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift size={32} className="text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Merci !</h3>
            <p className="text-gray-400">Votre code de réduction vous a été envoyé par email.</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-[#D4A853]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift size={32} className="text-[#D4A853]" />
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">Attendez !</h3>
            <p className="text-gray-400 text-center mb-6">
              Inscrivez-vous et recevez <span className="text-[#D4A853] font-semibold">10% de réduction</span> sur votre première commande.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="w-full h-12 pl-10 pr-4 bg-[#0A0A0B] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4A853]"
                />
              </div>
              <button
                type="submit"
                className="w-full h-12 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all"
              >
                Recevoir mon code -10%
              </button>
            </form>
            <p className="text-xs text-gray-600 text-center mt-4">
              En vous inscrivant, vous acceptez de recevoir nos offres promotionnelles.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
