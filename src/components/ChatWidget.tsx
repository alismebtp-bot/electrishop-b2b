import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: '0',
  role: 'assistant',
  content: 'Bonjour ! Je suis l\'assistant ElectriShop. Comment puis-je vous aider ?',
  timestamp: new Date(),
};

const MOCK_RESPONSES: Record<string, string> = {
  'prix': 'Nos prix sont affichés hors taxes (HT) pour les professionnels. La TVA de 20% est appliquée au panier.',
  'livraison': 'Nous livrons sous 24-48h en France métropolitaine. La livraison est gratuite à partir de 200€ HT.',
  'retour': 'Vous disposez de 14 jours pour retourner un produit non utilisé dans son emballage d\'origine.',
  'compte': 'Créez un compte professionnel pour accéder à nos tarifs B2B et générer des devis.',
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [keyword, response] of Object.entries(MOCK_RESPONSES)) {
    if (lower.includes(keyword)) return response;
  }
  return 'Je peux vous aider sur les prix, la livraison, les retours ou la création de compte. Posez votre question !';
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const response = getResponse(userMsg.content);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date() }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#D4A853] rounded-full flex items-center justify-center shadow-lg hover:brightness-110 transition-all"
        >
          <MessageSquare size={24} className="text-[#0A0A0B]" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-[#141415] rounded-xl border border-white/10 flex flex-col shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#D4A853]/20 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-[#D4A853]" />
              </div>
              <span className="text-white font-semibold">Assistant ElectriShop</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <Minimize2 size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-[#D4A853]/20' : 'bg-blue-500/20'}`}>
                  {msg.role === 'assistant' ? <Bot size={12} className="text-[#D4A853]" /> : <User size={12} className="text-blue-400" />}
                </div>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.role === 'assistant' ? 'bg-[#0A0A0B] text-white' : 'bg-[#D4A853]/20 text-white'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-[#D4A853]/20 flex items-center justify-center">
                  <Bot size={12} className="text-[#D4A853]" />
                </div>
                <div className="bg-[#0A0A0B] p-3 rounded-xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#D4A853] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#D4A853] rounded-full animate-bounce [animation-delay:0.1s]" />
                    <div className="w-2 h-2 bg-[#D4A853] rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Écrivez votre message..."
                className="flex-1 h-10 px-3 bg-[#0A0A0B] border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#D4A853]"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="p-2 bg-[#D4A853] text-[#0A0A0B] rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
