import { Download, FileSpreadsheet, FileText, File } from 'lucide-react';

interface ReportExportProps {
  data: any[];
  filename: string;
}

export default function ReportExport({ data, filename }: ReportExportProps) {
  const exportCSV = () => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(';'),
      ...data.map((row) => headers.map((h) => `"${row[h]}"`).join(';')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.json`;
    link.click();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={exportCSV}
        className="flex items-center gap-2 px-3 py-2 bg-[#1C1C1E] border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/5 transition-all"
      >
        <FileSpreadsheet size={16} className="text-green-400" />
        CSV
      </button>
      <button
        onClick={exportJSON}
        className="flex items-center gap-2 px-3 py-2 bg-[#1C1C1E] border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/5 transition-all"
      >
        <FileText size={16} className="text-blue-400" />
        JSON
      </button>
    </div>
  );
}
