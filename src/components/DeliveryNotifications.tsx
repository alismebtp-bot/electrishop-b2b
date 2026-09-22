import { useState } from 'react';
import { Bell, Truck, Package, CheckCircle, X, Clock } from 'lucide-react';

interface Notification {
  id: string;
  type: 'shipped' | 'delivered' | 'processing';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', type: 'shipped', title: 'Commande expédiée', message: 'Votre commande CMD-2026-001234 a été expédiée', time: 'Il y a 2h', read: false },
  { id: '2', type: 'delivered', title: 'Commande livrée', message: 'Votre commande CMD-2026-001230 est livrée', time: 'Il y a 5h', read: false },
  { id: '3', type: 'processing', title: 'En préparation', message: 'Votre commande CMD-2026-001233 est en cours de préparation', time: 'Il y a 1j', read: true },
];

export default function DeliveryNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const iconConfig = {
    shipped: { icon: Truck, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    delivered: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/20' },
    processing: { icon: Package, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-80 bg-[#141415] rounded-xl border border-white/10 shadow-xl z-50">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-white font-semibold">Notifications</h3>
              <button onClick={markAllRead} className="text-xs text-[#D4A853] hover:underline">
                Tout marquer lu
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notif) => {
                const config = iconConfig[notif.type];
                return (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={`flex gap-3 p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${
                      !notif.read ? 'bg-[#D4A853]/5' : ''
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${config.bg}`}>
                      <config.icon size={18} className={config.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{notif.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{notif.message}</p>
                      <p className="text-gray-600 text-xs mt-1 flex items-center gap-1">
                        <Clock size={10} /> {notif.time}
                      </p>
                    </div>
                    {!notif.read && <div className="w-2 h-2 bg-[#D4A853] rounded-full shrink-0 mt-1" />}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
