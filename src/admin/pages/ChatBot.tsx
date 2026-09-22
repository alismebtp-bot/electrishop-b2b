import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Loader2, ImagePlus, Camera, X } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: '0',
  role: 'assistant',
  content: 'Bonjour ! Je suis l\'assistant ElectriShop. Je peux vous aider à :\n\n• Trouver des produits\n• Vérifier la compatibilité\n• Générer un devis\n• Répondre à vos questions techniques\n\nComment puis-je vous aider aujourd\'hui ?',
  timestamp: new Date(),
};

const MOCK_RESPONSES: Record<string, string> = {
  'disjoncteur': 'Pour un circuit standard, je recommande le **Disjoncteur DNX³ 1P+N 16A** (12.90€ HT). Pour plus de puissance, le **20A** est disponible à 14.50€ HT. Souhaitez-vous ajouter l\'un d\'eux à votre panier ?',
  'cable': 'Nous avons plusieurs types de câbles :\n\n• **R2V 3G1.5** - 1.89€/m (usage général)\n• **R2V 3G2.5** - 2.45€/m (puissance)\n• **U1000R2V 5G6** - 8.90€/m (tertiaire)\n\nQuelle section et longueur vous faut-il ?',
  'ampoule': 'Nos ampoules LED les plus populaires :\n\n• **E27 10W 4000K** - 4.99€ HT\n• **GU10 5W 3000K** - 3.49€ HT\n• **Tube LED T8 120cm** - 12.90€ HT\n\nQuel culot et température de couleur recherchez-vous ?',
  'devis': 'Je peux vous aider à préparer un devis. Pourriez-vous me préciser :\n\n1. Les produits souhaités\n2. Les quantités\n3. Vos coordonnées entreprise\n\nJe générerai un devis professionnel au format PDF.',
  'compatible': 'Pour vérifier la compatibilité, j\'ai besoin de quelques informations :\n\n• Type d\'installation (domicile/tertiaire/industriel)\n• Puissance totale estimée\n• Norme applicable (NFC 15-100)\n\nPouvez-vous me donner ces détails ?',
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [keyword, response] of Object.entries(MOCK_RESPONSES)) {
    if (lower.includes(keyword)) return response;
  }
  return 'Je comprends. Pourriez-vous me donner plus de détails ? Je peux vous aider à trouver des produits, vérifier les compatibilités, ou générer un devis personnalisé.';
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !image) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      image: image || undefined,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setImage(null);
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response = getMockResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 h-[calc(100vh-80px)] flex flex-col">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
        <MessageSquare size={28} className="text-[#D4A853]" />
        Chat IA
      </h1>

      <div className="flex-1 bg-[#141415] rounded-xl border border-white/10 overflow-hidden flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'assistant' ? 'bg-[#D4A853]/20' : 'bg-blue-500/20'
              }`}>
                {msg.role === 'assistant' ? <Bot size={16} className="text-[#D4A853]" /> : <User size={16} className="text-blue-400" />}
              </div>
              <div className={`max-w-[70%] p-3 rounded-xl ${
                msg.role === 'assistant'
                  ? 'bg-[#0A0A0B] text-white'
                  : 'bg-[#D4A853]/20 text-white'
              }`}>
                {msg.image && (
                  <img src={msg.image} alt="Uploaded" className="max-w-full rounded-lg mb-2 max-h-48 object-cover" />
                )}
                <p className="text-sm whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D4A853]/20 flex items-center justify-center">
                <Bot size={16} className="text-[#D4A853]" />
              </div>
              <div className="bg-[#0A0A0B] p-3 rounded-xl">
                <Loader2 size={18} className="animate-spin text-[#D4A853]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          {image && (
            <div className="relative inline-block mb-2">
              <img src={image} alt="Preview" className="h-16 rounded-lg" />
              <button
                onClick={() => setImage(null)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
              >
                <X size={12} />
              </button>
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 text-gray-400 hover:text-white transition-colors"
            >
              <ImagePlus size={20} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Posez votre question..."
              className="flex-1 h-11 px-4 bg-[#0A0A0B] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4A853]"
            />
            <button
              onClick={handleSend}
              disabled={loading || (!input.trim() && !image)}
              className="p-3 bg-[#D4A853] text-[#0A0A0B] rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
