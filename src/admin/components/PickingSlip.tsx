import { useRef } from 'react';
import { Printer, Package, MapPin, User, Truck } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  ref: string;
  qty: number;
  location: string;
  image?: string;
}

interface PickingSlipProps {
  orderId: string;
  customer: string;
  address: string;
  items: OrderItem[];
  deliveryDate: string;
  notes?: string;
}

export default function PickingSlip({ orderId, customer, address, items, deliveryDate, notes }: PickingSlipProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && printRef.current) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Bon de préparation - ${orderId}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
              .section { margin-bottom: 15px; }
              .label { font-weight: bold; display: inline-block; width: 120px; }
              table { width: 100%; border-collapse: collapse; margin-top: 15px; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              th { background: #f0f0f0; }
              .checkbox { width: 20px; height: 20px; border: 2px solid #000; display: inline-block; }
              @media print { .no-print { display: none; } }
            </style>
          </head>
          <body>
            ${printRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div>
      <button
        onClick={handlePrint}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all"
      >
        <Printer size={18} />
        Imprimer le bon
      </button>

      <div ref={printRef} className="bg-white text-black p-8 max-w-2xl">
        <div className="header">
          <h1 className="text-2xl font-bold">BON DE PRÉPARATION</h1>
          <p className="text-sm text-gray-600">ElectriShop - Fournitures Électriques Professionnelles</p>
        </div>

        <div className="section">
          <p><span className="label">Commande:</span> {orderId}</p>
          <p><span className="label">Date:</span> {deliveryDate}</p>
        </div>

        <div className="section">
          <p><span className="label">Client:</span> {customer}</p>
          <p><span className="label">Adresse:</span> {address}</p>
        </div>

        {notes && (
          <div className="section bg-yellow-50 p-3 rounded">
            <p className="font-bold text-yellow-800">Notes:</p>
            <p>{notes}</p>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>✓</th>
              <th>Référence</th>
              <th>Produit</th>
              <th>Qté</th>
              <th>Emplacement</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td><span className="checkbox"></span></td>
                <td>{item.ref}</td>
                <td>{item.name}</td>
                <td className="font-bold">{item.qty}</td>
                <td>{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 text-center text-sm text-gray-500">
          Bon de préparation généré le {new Date().toLocaleDateString('fr-FR')}
        </div>
      </div>
    </div>
  );
}
