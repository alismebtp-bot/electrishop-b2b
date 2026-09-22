import { Phone, MessageSquare, MapPin, Navigation, Camera } from 'lucide-react';

interface DriverActionBarProps {
  customerPhone?: string;
  address?: string;
  onPhotoCapture?: () => void;
}

export default function DriverActionBar({ customerPhone, address, onPhotoCapture }: DriverActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#141415] border-t border-white/10 p-4 z-40">
      <div className="max-w-lg mx-auto flex items-center justify-around">
        {customerPhone && (
          <a
            href={`tel:${customerPhone}`}
            className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-green-400 transition-colors"
          >
            <Phone size={24} />
            <span className="text-xs">Appeler</span>
          </a>
        )}
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-blue-400 transition-colors">
          <MessageSquare size={24} />
          <span className="text-xs">SMS</span>
        </button>
        {address && (
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-[#D4A853] transition-colors"
          >
            <Navigation size={24} />
            <span className="text-xs">GPS</span>
          </a>
        )}
        {onPhotoCapture && (
          <button
            onClick={onPhotoCapture}
            className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-purple-400 transition-colors"
          >
            <Camera size={24} />
            <span className="text-xs">Photo</span>
          </button>
        )}
      </div>
    </div>
  );
}
