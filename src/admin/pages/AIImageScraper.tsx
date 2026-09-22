import { useState, useRef } from 'react';
import { Camera, Search, Loader2, ImagePlus, CheckCircle } from 'lucide-react';

export default function AIImageScraper() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!image) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        productName: 'Disjoncteur modulaire DNX³ 1P+N 16A',
        brand: 'Legrand',
        reference: '406774',
        priceHT: 12.90,
        confidence: 0.94,
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Camera size={28} className="text-[#D4A853]" />
        Scanner IA d'images
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Importer une image</h2>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center cursor-pointer hover:border-[#D4A853] transition-all"
          >
            {image ? (
              <img src={image} alt="Uploaded" className="max-h-64 mx-auto rounded-lg" />
            ) : (
              <>
                <ImagePlus size={48} className="mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400">Cliquez pour importer ou glissez-déposez</p>
                <p className="text-gray-600 text-sm mt-2">PNG, JPG jusqu'à 10MB</p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            onClick={handleAnalyze}
            disabled={!image || loading}
            className="w-full mt-4 h-12 flex items-center justify-center gap-2 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
            {loading ? 'Analyse en cours...' : 'Analyser l\'image'}
          </button>
        </div>

        <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Résultat de l'analyse</h2>
          {result ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={20} />
                <span className="font-medium">Produit identifié ({Math.round(result.confidence * 100)}% confiance)</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-[#0A0A0B] rounded-lg">
                  <p className="text-xs text-gray-500">Nom du produit</p>
                  <p className="text-white font-medium">{result.productName}</p>
                </div>
                <div className="p-3 bg-[#0A0A0B] rounded-lg">
                  <p className="text-xs text-gray-500">Marque</p>
                  <p className="text-white font-medium">{result.brand}</p>
                </div>
                <div className="p-3 bg-[#0A0A0B] rounded-lg">
                  <p className="text-xs text-gray-500">Référence</p>
                  <p className="text-white font-medium">{result.reference}</p>
                </div>
                <div className="p-3 bg-[#0A0A0B] rounded-lg">
                  <p className="text-xs text-gray-500">Prix HT estimé</p>
                  <p className="text-[#D4A853] font-bold text-lg">{result.priceHT.toFixed(2)}€</p>
                </div>
              </div>
              <button className="w-full h-11 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all">
                Ajouter au catalogue
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Search size={48} className="mx-auto mb-4 opacity-30" />
              <p>Importez une image pour commencer l'analyse</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
