import { Truck, Package, CheckCircle, MapPin, Clock } from 'lucide-react';

interface TimelineEvent {
  status: string;
  location: string;
  timestamp: string;
  completed: boolean;
}

interface DeliveryTimelineProps {
  events: TimelineEvent[];
  currentStatus: string;
}

export default function DeliveryTimeline({ events, currentStatus }: DeliveryTimelineProps) {
  const statusIcons: Record<string, React.ReactNode> = {
    'ordered': <Package size={16} />,
    'processing': <Clock size={16} />,
    'shipped': <Truck size={16} />,
    'in_transit': <MapPin size={16} />,
    'delivered': <CheckCircle size={16} />,
  };

  return (
    <div className="bg-[#141415] rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-6">Suivi de livraison</h3>
      <div className="relative">
        {events.map((event, index) => {
          const isLast = index === events.length - 1;
          const isActive = event.status === currentStatus;
          const isCompleted = event.completed;

          return (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-green-500/20 text-green-400' :
                  isActive ? 'bg-[#D4A853]/20 text-[#D4A853]' :
                  'bg-[#1C1C1E] text-gray-600'
                }`}>
                  {statusIcons[event.status] || <Package size={16} />}
                </div>
                {!isLast && (
                  <div className={`w-0.5 h-12 mt-2 ${
                    isCompleted ? 'bg-green-500/30' : 'bg-[#1C1C1E]'
                  }`} />
                )}
              </div>
              <div className="pb-8">
                <p className={`font-medium ${
                  isActive ? 'text-[#D4A853]' : isCompleted ? 'text-white' : 'text-gray-500'
                }`}>
                  {event.location}
                </p>
                <p className="text-sm text-gray-500">{event.timestamp}</p>
                {isActive && (
                  <p className="text-xs text-[#D4A853] mt-1">En cours</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
