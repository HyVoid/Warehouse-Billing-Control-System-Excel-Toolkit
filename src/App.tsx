import React, { useState, useEffect, useMemo } from 'react';
import { SystemParameters, RawOperation, InvoiceState, AppState } from './types';
import { loadAppState, saveAppState, exportBackupJSON, getFormattedNow } from './utils/storage';
import { DEFAULT_PARAMETERS, DEFAULT_OPERATIONS } from './data/defaults';
import { computeAllOperations } from './utils/engine';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { TabSettings } from './components/TabSettings';
import { TabOperations } from './components/TabOperations';
import { TabSummary } from './components/TabSummary';
import { TabInvoice } from './components/TabInvoice';
import { BulkCSVModal } from './components/BulkCSVModal';
import { ImportJSONModal } from './components/ImportJSONModal';

export default function App() {
  // Load state from localStorage on initial render
  const initialState = useMemo(() => loadAppState(), []);

  const [parameters, setParameters] = useState<SystemParameters>(initialState.parameters);
  const [operations, setOperations] = useState<RawOperation[]>(initialState.operations);
  const [invoiceState, setInvoiceState] = useState<InvoiceState>(initialState.invoiceState);
  const [lastSaved, setLastSaved] = useState<string>(initialState.lastSaved);

  const [activeTab, setActiveTab] = useState<'00_settings' | '01_operations' | '02_summary' | '03_invoice'>('01_operations');

  // Modals state
  const [isBulkCSVOpen, setIsBulkCSVOpen] = useState(false);
  const [isImportJSONOpen, setIsImportJSONOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Auto-save to LocalStorage whenever parameters, operations, or invoiceState change
  useEffect(() => {
    const savedTime = saveAppState(parameters, operations, invoiceState);
    setLastSaved(savedTime);
  }, [parameters, operations, invoiceState]);

  // Compute operations for summary view
  const computedOps = useMemo(() => {
    return computeAllOperations(operations, parameters);
  }, [operations, parameters]);

  // Handle Export Backup
  const handleExportBackup = () => {
    exportBackupJSON({
      parameters,
      operations,
      invoiceState,
      lastSaved: getFormattedNow(),
    });
  };

  // Handle Import JSON State
  const handleImportState = (importedState: AppState) => {
    if (importedState.parameters) setParameters(importedState.parameters);
    if (importedState.operations) setOperations(importedState.operations);
    if (importedState.invoiceState) setInvoiceState(importedState.invoiceState);
  };

  // Handle Bulk CSV Import
  const handleImportCSVOperations = (importedOps: RawOperation[], replace: boolean) => {
    if (replace) {
      setOperations(importedOps);
    } else {
      setOperations([...importedOps, ...operations]);
    }
  };

  // Handle Reset Data
  const handleConfirmReset = () => {
    setParameters(DEFAULT_PARAMETERS);
    setOperations(DEFAULT_OPERATIONS);
    setInvoiceState({
      selectedClient: 'Client Alpha',
      selectedPeriod: '',
    });
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F5F5F2] text-[#1A1A2E] font-body selection:bg-[#2251FF] selection:text-white">
      {/* Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lastSaved={lastSaved}
        onExportBackup={handleExportBackup}
        onOpenImportJSON={() => setIsImportJSONOpen(true)}
        onOpenBulkCSV={() => setIsBulkCSVOpen(true)}
        onResetData={() => setIsResetConfirmOpen(true)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Desktop Top Worksheet Status Bar */}
        <header className="hidden lg:flex h-14 bg-white border-b border-[#E8E8E6] px-8 items-center justify-between no-print sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#888888] uppercase tracking-wider">
              Current Worksheet:
            </span>
            <span className="font-heading text-sm font-bold text-[#051C2C]">
              {activeTab === '00_settings' && '00_System Settings (Parameters & Tiers)'}
              {activeTab === '01_operations' && '01_Operations Log (Log & Calculation Engine)'}
              {activeTab === '02_summary' && '02_Bi-weekly Summary (Revenue 看板)'}
              {activeTab === '03_invoice' && '03_Printable Invoice (Single-Page Invoice)'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-[#F5F5F2] text-[#888888] font-medium border border-[#E8E8E6] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
              Auto-save Synced
            </span>
          </div>
        </header>

        {/* Main Workspace View */}
        <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-8 py-8">
          {activeTab === '00_settings' && (
            <TabSettings
              parameters={parameters}
              onUpdateParameters={setParameters}
            />
          )}

          {activeTab === '01_operations' && (
            <TabOperations
              operations={operations}
              parameters={parameters}
              onUpdateOperations={setOperations}
            />
          )}

          {activeTab === '02_summary' && (
            <TabSummary computedOperations={computedOps} />
          )}

          {activeTab === '03_invoice' && (
            <TabInvoice
              operations={operations}
              parameters={parameters}
              invoiceState={invoiceState}
              onUpdateInvoiceState={setInvoiceState}
            />
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Bulk CSV Modal */}
      <BulkCSVModal
        isOpen={isBulkCSVOpen}
        onClose={() => setIsBulkCSVOpen(false)}
        onImportOperations={handleImportCSVOperations}
      />

      {/* Import JSON Modal */}
      <ImportJSONModal
        isOpen={isImportJSONOpen}
        onClose={() => setIsImportJSONOpen(false)}
        onImportState={handleImportState}
      />

      {/* Confirm Reset Data Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-[#051C2C]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bcs-card-static bg-white max-w-md w-full p-6 shadow-xl rounded-xl space-y-4 animate-fadeUp">
            <h3 className="font-heading text-xl font-bold text-[#D32F2F]">
              Confirm Data Reset
            </h3>
            <p className="text-xs text-[#051C2C]/80 leading-relaxed">
              Are you sure you want to reset all parameters, operations log, and invoice state to default factory preset dataset? This action will overwrite current browser local storage.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#D32F2F] hover:bg-[#D32F2F]/90 rounded-md transition-colors shadow-sm"
              >
                Reset All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

