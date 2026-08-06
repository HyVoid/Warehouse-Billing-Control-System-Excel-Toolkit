import React, { useState } from 'react';
import {
  Package,
  Sliders,
  Table,
  BarChart3,
  FileText,
  Download,
  Upload,
  FileSpreadsheet,
  RotateCcw,
  Clock,
  Menu,
  X,
  Database,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  activeTab: '00_settings' | '01_operations' | '02_summary' | '03_invoice';
  setActiveTab: (tab: '00_settings' | '01_operations' | '02_summary' | '03_invoice') => void;
  lastSaved: string;
  onExportBackup: () => void;
  onOpenImportJSON: () => void;
  onOpenBulkCSV: () => void;
  onResetData: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  lastSaved,
  onExportBackup,
  onOpenImportJSON,
  onOpenBulkCSV,
  onResetData,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const tabs = [
    {
      id: '00_settings',
      label: '00_System Settings',
      sub: 'Parameters & Tiers',
      icon: Sliders,
    },
    {
      id: '01_operations',
      label: '01_Operations Log',
      sub: 'Log & Calculation Engine',
      icon: Table,
    },
    {
      id: '02_summary',
      label: '02_Bi-weekly Summary',
      sub: 'Revenue 看板',
      icon: BarChart3,
    },
    {
      id: '03_invoice',
      label: '03_Printable Invoice',
      sub: 'Single-Page Invoice',
      icon: FileText,
    },
  ] as const;

  const handleTabClick = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    setMobileOpen(false);
  };

  const SidebarContent = (
    <div className="flex flex-col h-full bg-white text-[#051C2C]">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#E8E8E6]">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#051C2C] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <Package className="w-5 h-5 text-[#2251FF]" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-heading text-base font-bold text-[#051C2C] leading-snug tracking-tight">
              Warehouse Billing Control System
            </h1>
            <p className="text-[11px] font-semibold text-[#2251FF] tracking-wide mt-0.5 uppercase">
              Excel Toolkit
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2.5 border-t border-[#E8E8E6]/60 flex items-center justify-between text-[11px] text-[#888888]">
          <span className="flex items-center gap-1 font-medium">
            <Database className="w-3 h-3 text-[#2251FF]" />
            Local Engine
          </span>
          <span className="bg-[#2251FF]/10 text-[#2251FF] font-semibold px-2 py-0.5 rounded text-[10px]">
            v2.4 Pro
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[#888888]">
            Worksheets Navigation
          </div>
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all group ${
                    isActive
                      ? 'bg-[#2251FF]/10 text-[#2251FF] font-bold shadow-xs'
                      : 'text-[#051C2C]/70 hover:text-[#051C2C] hover:bg-[#F5F5F2]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#2251FF]' : 'text-[#888888] group-hover:text-[#051C2C]'
                      }`}
                    />
                    <div className="text-left truncate">
                      <div className="truncate leading-tight">{tab.label}</div>
                      <div
                        className={`text-[10px] font-normal truncate mt-0.5 ${
                          isActive ? 'text-[#2251FF]/80' : 'text-[#888888]'
                        }`}
                      >
                        {tab.sub}
                      </div>
                    </div>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-[#2251FF] shrink-0 ml-1" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Data Actions Section */}
        <div className="pt-2 border-t border-[#E8E8E6]">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[#888888]">
            Data Management
          </div>
          <div className="space-y-1.5">
            <button
              onClick={onExportBackup}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] transition-colors"
            >
              <Download className="w-4 h-4 text-[#2251FF] shrink-0" />
              <span>Export JSON Backup</span>
            </button>

            <button
              onClick={onOpenImportJSON}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] transition-colors"
            >
              <Upload className="w-4 h-4 text-[#051C2C] shrink-0" />
              <span>Import JSON Backup</span>
            </button>

            <button
              onClick={onOpenBulkCSV}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-[#051C2C] hover:bg-[#051C2C]/90 transition-colors shadow-xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#00C853] shrink-0" />
              <span>Bulk CSV Import</span>
            </button>

            <button
              onClick={onResetData}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#D32F2F] hover:bg-red-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4 shrink-0" />
              <span>Reset Factory Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Status Box */}
      <div className="p-4 border-t border-[#E8E8E6] bg-[#F5F5F2]/50 text-[11px]">
        <div className="flex items-center gap-2 text-[#888888] font-medium">
          <Clock className="w-3.5 h-3.5 text-[#2251FF] shrink-0" />
          <span className="truncate">Last saved: {lastSaved}</span>
        </div>
        <div className="mt-1 text-[10px] text-[#888888]/80 leading-relaxed">
          Auto-synced to LocalStorage
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:z-30 border-r border-[#E8E8E6] shadow-xs no-print">
        {SidebarContent}
      </aside>

      {/* Mobile Top Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-[#E8E8E6] px-4 py-3 flex items-center justify-between no-print shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#051C2C] text-white flex items-center justify-center shrink-0">
            <Package className="w-4 h-4 text-[#2251FF]" />
          </div>
          <div>
            <h1 className="font-heading text-sm font-bold text-[#051C2C] leading-tight truncate max-w-[200px] sm:max-w-none">
              Warehouse Billing Control System
            </h1>
            <p className="text-[10px] font-semibold text-[#2251FF] uppercase tracking-wider">
              Excel Toolkit
            </p>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-[#051C2C] hover:bg-[#F5F5F2] rounded-lg transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay / Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex no-print">
          <div
            className="fixed inset-0 bg-[#051C2C]/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl animate-slideRight">
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 text-[#888888] hover:text-[#051C2C] bg-white rounded-full shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {SidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
