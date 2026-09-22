import { useState } from 'react';
import { Share2, Link, CheckCircle, Mail, MessageCircle } from 'lucide-react';

interface ShareTrackingLinkProps {
  orderId: string;
  trackingUrl: string;
}

export default function ShareTrackingLink({ orderId, trackingUrl }: ShareTrackingLinkProps) {
  const [copied, setCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trackingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = trackingUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Suivi de commande ${orderId}`);
    const body = encodeURIComponent(`Suivez votre commande ${orderId} : ${trackingUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`Suivi de commande ${orderId} : ${trackingUrl}`);
    window.open(`https://wa.me/?text=${text}`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center gap-2 px-4 py-2 bg-[#1C1C1E] text-gray-400 rounded-lg text-sm hover:text-white transition-all"
      >
        <Share2 size={16} />
        Partager
      </button>

      {showOptions && (
        <>
          <div className="fixed inset-0" onClick={() => setShowOptions(false)} />
          <div className="absolute right-0 top-full mt-2 bg-[#141415] rounded-xl border border-white/10 shadow-xl py-2 min-w-[200px] z-50">
            <button
              onClick={() => { handleCopy(); setShowOptions(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {copied ? <CheckCircle size={16} className="text-green-400" /> : <Link size={16} />}
              {copied ? 'Lien copié !' : 'Copier le lien'}
            </button>
            <button
              onClick={() => { shareViaEmail(); setShowOptions(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Mail size={16} />
              Envoyer par email
            </button>
            <button
              onClick={() => { shareViaWhatsApp(); setShowOptions(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <MessageCircle size={16} />
              Partager sur WhatsApp
            </button>
          </div>
        </>
      )}
    </div>
  );
}
