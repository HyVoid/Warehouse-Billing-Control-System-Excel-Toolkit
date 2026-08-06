import React, { useState } from 'react';
import { AppState } from '../types';
import { Upload, X, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface ImportJSONModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportState: (importedState: AppState) => void;
}

export const ImportJSONModal: React.FC<ImportJSONModalProps> = ({
  isOpen,
  onClose,
  onImportState,
}) => {
  const [jsonContent, setJsonContent] = useState('');
  const [parsedState, setParsedState] = useState<AppState | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonContent(content || '');
      validateAndSet(content || '');
    };
    reader.readAsText(file);
  };

  const validateAndSet = (rawText: string) => {
    setErrorMsg('');
    setParsedState(null);
    try {
      const obj = JSON.parse(rawText);
      if (!obj || typeof obj !== 'object') {
        setErrorMsg('Invalid JSON format.');
        return;
      }
      if (!obj.parameters || !Array.isArray(obj.operations)) {
        setErrorMsg('JSON backup file is missing parameters or operations data structure.');
        return;
      }
      setParsedState(obj as AppState);
    } catch (err: any) {
      setErrorMsg(`JSON Parse Error: ${err.message}`);
    }
  };

  const handleConfirm = () => {
    if (parsedState) {
      onImportState(parsedState);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#051C2C]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bcs-card-static bg-white max-w-lg w-full p-6 shadow-xl rounded-xl space-y-5 animate-fadeUp">
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E8E6]">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#2251FF]" />
            <h3 className="font-heading text-xl font-bold text-[#051C2C]">
              Import JSON Backup
            </h3>
          </div>
          <button onClick={onClose} className="text-[#888888] hover:text-[#051C2C]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <label className="block font-semibold text-[#051C2C] uppercase tracking-wider">
            Select JSON Backup File
          </label>
          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#E8E8E6] hover:border-[#2251FF] rounded-lg cursor-pointer bg-[#F5F5F2] transition-colors">
            <Upload className="w-6 h-6 text-[#2251FF] mb-2" />
            <span className="font-semibold text-[#051C2C]">Click to Upload JSON Backup</span>
            <span className="text-[11px] text-[#888888] mt-0.5">
              Restores parameters, operation logs, and invoice settings
            </span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <textarea
            rows={4}
            value={jsonContent}
            onChange={(e) => {
              setJsonContent(e.target.value);
              validateAndSet(e.target.value);
            }}
            placeholder="Or paste JSON backup string here..."
            className="bcs-input-editable w-full font-mono text-[11px]"
          />

          {errorMsg && (
            <div className="p-3 bg-[#D32F2F]/10 text-[#D32F2F] rounded-md flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {parsedState && (
            <div className="p-3 bg-[#00C853]/10 text-[#008938] rounded-md flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>
                Valid Backup: {parsedState.operations?.length || 0} operations records found.
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E8E6]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!parsedState}
            className={`px-5 py-2 text-xs font-semibold text-white rounded-md transition-colors shadow-sm ${
              parsedState
                ? 'bg-[#2251FF] hover:bg-[#2251FF]/90 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Restore App State
          </button>
        </div>
      </div>
    </div>
  );
};
