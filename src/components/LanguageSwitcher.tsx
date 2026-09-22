import { Globe } from 'lucide-react';
import { useState } from 'react';

const LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
];

export default function LanguageSwitcher() {
  const [current, setCurrent] = useState('fr');
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors"
      >
        <Globe size={18} />
        <span className="text-sm uppercase">{current}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 bg-[#141415] rounded-lg border border-white/10 shadow-xl py-1 min-w-[140px]">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setCurrent(lang.code); setOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors ${
                  current === lang.code ? 'text-[#D4A853]' : 'text-gray-400'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
