import { useState, useRef, useEffect } from 'react';
import { QrCode, Camera, CheckCircle, XCircle, Search, Loader2 } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

export default function BarcodeScanner() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerDivId = 'scanner-div';

  const startScan = async () => {
    setScanning(true);
    setResult(null);
    setError(null);

    try {
      const scanner = new Html5Qrcode(scannerDivId);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setResult(decodedText);
          stopScan();
        },
        (errorMessage) => {
          // Silent error during scanning
        }
      );
    } catch (err) {
      setError('Impossible d\'accéder à la caméra. Vérifiez les permissions.');
      setScanning(false);
    }
  };

  const stopScan = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      } catch (e) {
        // Ignore
      }
      scannerRef.current = null;
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      stopScan();
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3">
        <QrCode size={28} className="text-[#D4A853]" />
        Scanner de codes-barres
      </h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Scanner</h2>
          
          {scanning ? (
            <div>
              <div id={scannerDivId} className="w-full rounded-lg overflow-hidden" />
              <button
                onClick={stopScan}
                className="w-full mt-4 h-12 flex items-center justify-center gap-2 bg-red-500/20 text-red-400 rounded-lg font-semibold hover:bg-red-500/30 transition-all"
              >
                <XCircle size={18} />
                Arrêter le scan
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <Camera size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 mb-6">Scannez un code-barres EAN-13 pour trouver un produit</p>
              <button
                onClick={startScan}
                className="px-6 py-3 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all"
              >
                Démarrer la caméra
              </button>
              {error && (
                <p className="mt-4 text-red-400 text-sm">{error}</p>
              )}
            </div>
          )}
        </div>

        <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Résultat</h2>
          {result ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle size={20} />
                <span className="font-medium">Code détecté</span>
              </div>
              <div className="p-4 bg-[#0A0A0B] rounded-lg">
                <p className="text-xs text-gray-500 mb-1">EAN-13</p>
                <p className="text-2xl font-mono text-white tracking-wider">{result}</p>
              </div>
              <button className="w-full h-12 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all">
                Rechercher le produit
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Search size={48} className="mx-auto mb-4 opacity-30" />
              <p>Scannez un code pour voir le résultat</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
