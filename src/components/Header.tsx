import React from 'react';
import { Package, Download, Upload, FileSpreadsheet, RotateCcw, Clock } from 'lucide-react';

interface HeaderProps {
  activeTab: '00_settings' | '01_operations' | '02_summary' | '03_invoice';
  setActiveTab: (tab: '00_settings' | '01_operations' | '02_summary' | '03_invoice') => void;
  lastSaved: string;
  onExportBackup: () => void;
  onOpenImportJSON: () => void;
  onOpenBulkCSV: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lastSaved,
  onExportBackup,
  onOpenImportJSON,
  onOpenBulkCSV,
  onResetData,
}) => {
  const tabs = [
    { id: '00_settings', label: '00_System Settings', sub: 'Parameters & Tiers' },
    { id: '01_operations', label: '01_Operations Log', sub: 'Log & Calculation Engine' },
    { id: '02_summary', label: '02_Bi-weekly Summary', sub: 'Revenue 看板' },
    { id: '03_invoice', label: '03_Printable Invoice', sub: 'Single-Page Invoice' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 h-[56px] bg-white border-b border-[#E8E8E6] shadow-[0_1px_3px_rgba(5,28,44,0.06)] no-print">
      <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#051C2C] text-white flex items-center justify-center shadow-sm">
            <Package className="w-4 h-4 text-[#2251FF]" />
          </div>
          <div>
            <span className="font-heading text-lg font-bold text-[#051C2C] tracking-tight block leading-tight">
              Warehouse Billing Control System — Excel Toolkit
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#888888] font-semibold block leading-tight">
              Warehouse & Bi-weekly Invoice Engine
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 h-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`h-full px-4 text-xs font-semibold flex flex-col justify-center transition-all relative ${
                  isActive
                    ? 'text-[#051C2C]'
                    : 'text-[#051C2C]/60 hover:text-[#051C2C] hover:bg-black/5'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2251FF] rounded-t-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions & Status */}
        <div className="flex items-center gap-2">
          {/* Last Saved Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F5F5F2] text-[#888888] text-[11px] font-medium border border-[#E8E8E6]">
            <Clock className="w-3 h-3 text-[#2251FF]" />
            <span>Last saved: {lastSaved}</span>
          </div>

          <div className="h-4 w-[1px] bg-[#E8E8E6] hidden lg:block" />

          {/* Action Buttons */}
          <button
            onClick={onExportBackup}
            title="Export JSON Backup"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] rounded-md transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#2251FF]" />
            <span className="hidden sm:inline">Export Backup</span>
          </button>

          <button
            onClick={onOpenImportJSON}
            title="Import JSON Backup"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] rounded-md transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-[#051C2C]" />
            <span className="hidden sm:inline">Import Backup</span>
          </button>

          <button
            onClick={onOpenBulkCSV}
            title="Bulk CSV Import"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-white bg-[#051C2C] hover:bg-[#051C2C]/90 rounded-md transition-colors shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#00C853]" />
            <span className="hidden sm:inline">Bulk CSV</span>
          </button>

          <button
            onClick={onResetData}
            title="Reset Data"
            className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-[#D32F2F] hover:bg-red-50 rounded-md transition-colors ml-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
