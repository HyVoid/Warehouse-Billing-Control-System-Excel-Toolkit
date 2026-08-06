import React, { useState } from 'react';
import { RawOperation } from '../types';
import { parseCSVToOperations, downloadSampleCSV } from '../utils/csv';
import { FileSpreadsheet, X, Upload, Download, CheckCircle2, AlertCircle } from 'lucide-react';

interface BulkCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportOperations: (importedOps: RawOperation[], replace: boolean) => void;
}

export const BulkCSVModal: React.FC<BulkCSVModalProps> = ({
  isOpen,
  onClose,
  onImportOperations,
}) => {
  const [csvRawText, setCsvRawText] = useState('');
  const [parsedPreview, setParsedPreview] = useState<RawOperation[]>([]);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');

  if (!isOpen) return null;

  const handleTextChange = (text: string) => {
    setCsvRawText(text);
    if (!text.trim()) {
      setParsedPreview([]);
      setParseErrors([]);
      return;
    }
    const { records, errors } = parseCSVToOperations(text);
    setParsedPreview(records);
    setParseErrors(errors);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      handleTextChange(content || '');
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (parsedPreview.length === 0) return;
    onImportOperations(parsedPreview, importMode === 'replace');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#051C2C]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bcs-card-static bg-white max-w-2xl w-full p-6 shadow-xl rounded-xl space-y-5 animate-fadeUp max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-[#00C853]" />
            <h3 className="font-heading text-xl font-bold text-[#051C2C]">
              Bulk CSV Import
            </h3>
          </div>
          <button onClick={onClose} className="text-[#888888] hover:text-[#051C2C]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload options */}
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <label className="font-semibold text-[#051C2C] uppercase tracking-wider">
              Upload CSV File or Paste Raw CSV Text
            </label>
            <button
              onClick={downloadSampleCSV}
              className="text-[#2251FF] hover:underline flex items-center gap-1 font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Sample CSV Template</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex-1 border-2 border-dashed border-[#E8E8E6] hover:border-[#2251FF] p-4 rounded-lg text-center cursor-pointer transition-colors bg-[#F5F5F2]">
              <Upload className="w-5 h-5 mx-auto text-[#2251FF] mb-1" />
              <span className="font-semibold text-[#051C2C] block">Click to select CSV File</span>
              <span className="text-[11px] text-[#888888]">Auto-matches column headers</span>
              <input
                type="file"
                accept=".csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <textarea
            rows={4}
            value={csvRawText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Or paste CSV content here directly..."
            className="bcs-input-editable w-full font-mono text-[11px]"
          />
        </div>

        {/* Preview Summary */}
        {parsedPreview.length > 0 && (
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#051C2C] flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-[#00C853]" />
                Parsed {parsedPreview.length} Operation Record(s) Ready for Import
              </span>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1 text-[11px] cursor-pointer">
                  <input
                    type="radio"
                    name="importMode"
                    value="append"
                    checked={importMode === 'append'}
                    onChange={() => setImportMode('append')}
                  />
                  <span>Append to existing records</span>
                </label>
                <label className="flex items-center gap-1 text-[11px] cursor-pointer text-[#D32F2F]">
                  <input
                    type="radio"
                    name="importMode"
                    value="replace"
                    checked={importMode === 'replace'}
                    onChange={() => setImportMode('replace')}
                  />
                  <span>Replace existing records</span>
                </label>
              </div>
            </div>

            {/* Preview Table */}
            <div className="max-h-40 overflow-y-auto border border-[#E8E8E6] rounded-md">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-[#051C2C]/5 font-semibold text-[#051C2C]">
                  <tr>
                    <th className="p-1.5">Tracking</th>
                    <th className="p-1.5">Client</th>
                    <th className="p-1.5">Received</th>
                    <th className="p-1.5">Dispatched</th>
                    <th className="p-1.5 text-right">Pallets</th>
                    <th className="p-1.5 text-right">Work Hrs</th>
                    <th className="p-1.5 text-center">Transport</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E6]">
                  {parsedPreview.slice(0, 5).map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-1.5 font-mono">{row.trackingCode}</td>
                      <td className="p-1.5">{row.clientName}</td>
                      <td className="p-1.5 font-mono">{row.dateReceived}</td>
                      <td className="p-1.5 font-mono">{row.dateDispatched || 'In Storage'}</td>
                      <td className="p-1.5 text-right font-mono">{row.palletQty}</td>
                      <td className="p-1.5 text-right font-mono">{row.workHours}</td>
                      <td className="p-1.5 text-center font-semibold">{row.transportFlag}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {parsedPreview.length > 5 && (
              <p className="text-[10px] text-[#888888] italic">
                Showing first 5 of {parsedPreview.length} records...
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E8E6]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmImport}
            disabled={parsedPreview.length === 0}
            className={`px-5 py-2 text-xs font-semibold text-white rounded-md transition-colors shadow-sm ${
              parsedPreview.length > 0
                ? 'bg-[#051C2C] hover:bg-[#051C2C]/90 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Confirm & Import {parsedPreview.length} Rows
          </button>
        </div>
      </div>
    </div>
  );
};
