import { useState, useRef, useEffect } from 'react';
import { QrCode, Camera, XCircle, CheckCircle } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

interface BarcodeScannerProps {
  onScan: (code: string) => void;
  onClose: () => void;
}

export default function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerDivId = 'scanner-div-component';

  useEffect(() => {
    const startScan = async () => {
      setScanning(true);
      try {
        const scanner = new Html5Qrcode(scannerDivId);
        scannerRef.current = scanner;
        await scanner.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            onScan(decodedText);
            stopScan();
          },
          () => {}
        );
      } catch (err) {
        setError('Impossible d\'accéder à la caméra.');
        setScanning(false);
      }
    };

    startScan();

    return () => {
      stopScan();
    };
  }, []);

  const stopScan = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      } catch (e) {}
      scannerRef.current = null;
    }
    setScanning(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="bg-[#141415] rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <QrCode size={20} className="text-[#D4A853]" />
            Scanner
          </h3>
          <button onClick={() => { stopScan(); onClose(); }} className="text-gray-400 hover:text-white">
            <XCircle size={24} />
          </button>
        </div>
        <div id={scannerDivId} className="w-full rounded-lg overflow-hidden" />
        {error && <p className="mt-4 text-red-400 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
}
