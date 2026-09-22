import { useRef } from 'react';
import { Printer, Receipt } from 'lucide-react';

interface ReceiptItem {
  name: string;
  qty: number;
  priceHT: number;
  vatRate: number;
}

interface ReceiptProps {
  orderId: string;
  date: string;
  customer: string;
  items: ReceiptItem[];
  totalHT: number;
  totalTTC: number;
}

export default function PrintReceipt({ orderId, date, customer, items, totalHT, totalTTC }: ReceiptProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Ticket ${orderId}</title>
              <style>
                body { font-family: 'Courier New', monospace; padding: 10px; width: 80mm; }
                .center { text-align: center; }
                .bold { font-weight: bold; }
                .line { border-top: 1px dashed #000; margin: 5px 0; }
                .right { text-align: right; }
                table { width: 100%; }
                td { padding: 2px 0; }
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
        <Receipt size={18} />
        Imprimer ticket
      </button>

      <div ref={printRef} style={{ width: '80mm', fontFamily: 'Courier New, monospace', fontSize: '12px' }}>
        <div className="center">
          <p className="bold" style={{ fontSize: '16px' }}>ELECTRISHOP</p>
          <p>Fournitures Électriques</p>
          <p>Tel: 01 23 45 67 89</p>
        </div>
        <div className="line"></div>
        <p>Ticket: {orderId}</p>
        <p>Date: {date}</p>
        <p>Client: {customer}</p>
        <div className="line"></div>
        <table>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td className="right">{item.qty} x {item.priceHT.toFixed(2)}€</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="line"></div>
        <p className="right">Total HT: {totalHT.toFixed(2)}€</p>
        <p className="right bold" style={{ fontSize: '14px' }}>Total TTC: {totalTTC.toFixed(2)}€</p>
        <div className="line"></div>
        <div className="center">
          <p>Merci de votre confiance!</p>
          <p>www.electrishop.fr</p>
        </div>
      </div>
    </div>
  );
}
