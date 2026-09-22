import { useState, useRef } from 'react';
import { Camera, CheckCircle, XCircle, RotateCcw, Upload } from 'lucide-react';

interface DeliveryPhotoCaptureProps {
  onCapture: (photos: string[]) => void;
  onCancel: () => void;
}

export default function DeliveryPhotoCapture({ onCapture, onCancel }: DeliveryPhotoCaptureProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      alert('Impossible d\'accéder à la caméra');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      const photo = canvas.toDataURL('image/jpeg');
      setPhotos([...photos, photo]);
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onCapture(photos);
    stopCamera();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="bg-[#141415] rounded-xl p-6 w-full max-w-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Camera size={20} className="text-[#D4A853]" />
          Photos de livraison
        </h3>

        {stream ? (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-black">
              <video ref={videoRef} autoPlay playsInline className="w-full aspect-video" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={capturePhoto}
                className="flex-1 h-12 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110"
              >
                Prendre une photo
              </button>
              <button
                onClick={stopCamera}
                className="px-4 h-12 bg-[#1C1C1E] text-gray-400 rounded-lg hover:text-white"
              >
                <XCircle size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Camera size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500 mb-4">Prenez des photos pour confirmer la livraison</p>
            <button
              onClick={startCamera}
              className="px-6 py-3 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110"
            >
              Démarrer la caméra
            </button>
          </div>
        )}

        {photos.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Photos capturées ({photos.length})</p>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                  <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <XCircle size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />

        <div className="flex gap-2 mt-6">
          <button
            onClick={() => { stopCamera(); onCancel(); }}
            className="flex-1 h-12 bg-[#1C1C1E] text-gray-400 rounded-lg font-medium hover:text-white"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={photos.length === 0}
            className="flex-1 h-12 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 disabled:opacity-50"
          >
            <CheckCircle size={18} className="inline mr-2" />
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
