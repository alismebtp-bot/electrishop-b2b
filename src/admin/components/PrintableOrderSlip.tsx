import { useRef } from 'react';
import { Printer } from 'lucide-react';

interface PrintableOrderSlipProps {
  orderId: string;
  customer: string;
  address: string;
  items: { name: string; ref: string; qty: number; priceHT: number }[];
  totalHT: number;
  totalTTC: number;
  date: string;
}

export default function PrintableOrderSlip({ orderId, customer, address, items, totalHT, totalTTC, date }: PrintableOrderSlipProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Bon de commande ${orderId}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
                .header { text-align: center; border-bottom: 3px solid #D4A853; padding-bottom: 20px; margin-bottom: 30px; }
                .section { margin-bottom: 20px; }
                .label { font-weight: bold; color: #666; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th { background: #D4A853; color: #0A0A0B; padding: 10px; text-align: left; }
                td { padding: 10px; border-bottom: 1px solid #eee; }
                .total { text-align: right; font-size: 18px; font-weight: bold; margin-top: 20px; }
                .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
                @media print { body { padding: 0; } }
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
    }
  };

  return (
    <div>
      <button
        onClick={handlePrint}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-[#D4A853] text-[#0A0A0B] rounded-lg font-semibold hover:brightness-110 transition-all"
      >
        <Printer size={18} />
        Imprimer
      </button>

      <div ref={printRef}>
        <div className="header">
          <h1 style={{ fontSize: '28px', margin: '0', color: '#D4A853' }}>ELECTRISHOP</h1>
          <p style={{ margin: '5px 0 0', color: '#666' }}>Fournitures Électriques Professionnelles</p>
          <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#999' }}>SIRET: 123 456 789 00010 | TVA: FR12345678910</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="section">
            <p><span className="label">Bon de commande:</span> {orderId}</p>
            <p><span className="label">Date:</span> {date}</p>
          </div>
          <div className="section" style={{ textAlign: 'right' }}>
            <p><span className="label">Client:</span> {customer}</p>
            <p><span className="label">Adresse:</span> {address}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Référence</th>
              <th>Produit</th>
              <th>Qté</th>
              <th>Prix HT</th>
              <th>Total HT</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>{item.ref}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.priceHT.toFixed(2)}€</td>
                <td>{(item.qty * item.priceHT).toFixed(2)}€</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total">
          <p>Total HT: {totalHT.toFixed(2)}€</p>
          <p>TVA 20%: {(totalTTC - totalHT).toFixed(2)}€</p>
          <p style={{ color: '#D4A853', fontSize: '24px' }}>Total TTC: {totalTTC.toFixed(2)}€</p>
        </div>

        <div className="footer">
          <p>Conditions de paiement: 30 jours fin de mois</p>
          <p>ElectriShop - contact@electrishop.fr - www.electrishop.fr</p>
        </div>
      </div>
    </div>
  );
}
