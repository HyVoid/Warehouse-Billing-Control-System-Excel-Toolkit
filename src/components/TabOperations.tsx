import React, { useState, useMemo } from 'react';
import { RawOperation, ComputedOperation, SystemParameters } from '../types';
import { computeAllOperations } from '../utils/engine';
import {
  Plus,
  Search,
  Filter,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  PackageCheck,
  Building2,
  Truck,
  Box
} from 'lucide-react';

interface TabOperationsProps {
  operations: RawOperation[];
  parameters: SystemParameters;
  onUpdateOperations: (newOps: RawOperation[]) => void;
}

export const TabOperations: React.FC<TabOperationsProps> = ({
  operations,
  parameters,
  onUpdateOperations,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClientFilter, setSelectedClientFilter] = useState('ALL');
  const [selectedHealthFilter, setSelectedHealthFilter] = useState('ALL');

  // Calculate all computed operations dynamically
  const computedOps = useMemo(() => {
    return computeAllOperations(operations, parameters);
  }, [operations, parameters]);

  // Unique client list for filter
  const uniqueClients = useMemo(() => {
    const clients = new Set<string>();
    operations.forEach((op) => {
      if (op.clientName) clients.add(op.clientName.trim());
    });
    return Array.from(clients).sort();
  }, [operations]);

  // Max charge value for inline data bars
  const maxTotalCharge = useMemo(() => {
    return Math.max(...computedOps.map((op) => op.totalCharges), 1);
  }, [computedOps]);

  // Filtered computed operations
  const filteredOps = useMemo(() => {
    return computedOps.filter((op) => {
      const matchSearch =
        !searchTerm ||
        op.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.itemDescription.toLowerCase().includes(searchTerm.toLowerCase());

      const matchClient =
        selectedClientFilter === 'ALL' || op.clientName === selectedClientFilter;

      let matchHealth = true;
      if (selectedHealthFilter === 'NORMAL') {
        matchHealth = op.dataHealth === '✅ Normal';
      } else if (selectedHealthFilter === 'ANOMALY') {
        matchHealth = op.dataHealth !== '✅ Normal';
      }

      return matchSearch && matchClient && matchHealth;
    });
  }, [computedOps, searchTerm, selectedClientFilter, selectedHealthFilter]);

  // KPI Summary stats
  const totalChargeSum = useMemo(() => {
    return computedOps.reduce((sum, op) => sum + op.totalCharges, 0);
  }, [computedOps]);

  const anomalyCount = useMemo(() => {
    return computedOps.filter((op) => op.dataHealth !== '✅ Normal').length;
  }, [computedOps]);

  const inWarehouseCount = useMemo(() => {
    return computedOps.filter((op) => !op.dateDispatched).length;
  }, [computedOps]);

  // Handle single cell edit
  const handleCellChange = (id: string, field: keyof RawOperation, value: any) => {
    const updated = operations.map((op) => {
      if (op.id === id) {
        return { ...op, [field]: value };
      }
      return op;
    });
    onUpdateOperations(updated);
  };

  // Add new blank row
  const handleAddRow = () => {
    const newId = `op-${Date.now().toString().slice(-6)}`;
    const todayStr = new Date().toISOString().split('T')[0];
    const newOp: RawOperation = {
      id: newId,
      trackingCode: `TRK-NEW-${operations.length + 1}`,
      clientName: uniqueClients[0] || 'Client Alpha',
      itemDescription: 'New Cargo Shipment',
      dateReceived: todayStr,
      dateDispatched: '',
      palletQty: 10,
      workHours: 1.0,
      transportFlag: 'Yes',
    };
    onUpdateOperations([newOp, ...operations]);
  };

  // Delete single row
  const handleDeleteRow = (id: string) => {
    if (confirm('Are you sure you want to delete this operation log record?')) {
      onUpdateOperations(operations.filter((op) => op.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fadeUp">
      {/* Header & KPI Summary */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-[#E8E8E6]">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#051C2C] tracking-tight">
            01_Warehouse Operations & Billing Engine
          </h1>
          <p className="text-xs text-[#888888] mt-1">
            Single Source of Truth: Enter operational facts, view real-time Javascript calculated charges, and inspect Data Health diagnostics.
          </p>
        </div>

        <button
          onClick={handleAddRow}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#051C2C] hover:bg-[#051C2C]/90 rounded-md shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 text-[#2251FF]" />
          <span>Add New Operation</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bcs-card p-4 space-y-1">
          <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider block">
            Total Logged Tasks
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-heading text-2xl font-bold text-[#051C2C] tracking-display">
              {computedOps.length}
            </span>
            <Box className="w-5 h-5 text-[#051C2C]/40" />
          </div>
          <span className="text-[11px] text-[#888888]">
            {inWarehouseCount} currently active in warehouse
          </span>
        </div>

        <div className="bcs-card p-4 space-y-1">
          <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider block">
            Total Calculated Charges
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-heading text-2xl font-bold text-[#051C2C] tracking-display">
              €{totalChargeSum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs font-semibold text-[#2251FF] bg-[#2251FF]/10 px-2 py-0.5 rounded">
              Real-time
            </span>
          </div>
          <span className="text-[11px] text-[#888888]">
            Storage + Handling + Transport
          </span>
        </div>

        <div className="bcs-card p-4 space-y-1">
          <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider block">
            Unique Clients
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-heading text-2xl font-bold text-[#051C2C] tracking-display">
              {uniqueClients.length}
            </span>
            <Building2 className="w-5 h-5 text-[#051C2C]/40" />
          </div>
          <span className="text-[11px] text-[#888888]">Active billing accounts</span>
        </div>

        <div className="bcs-card p-4 space-y-1">
          <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider block">
            Data Health Diagnostics
          </span>
          <div className="flex items-baseline justify-between">
            <span
              className={`font-heading text-2xl font-bold tracking-display ${
                anomalyCount > 0 ? 'text-[#D32F2F]' : 'text-[#00C853]'
              }`}
            >
              {anomalyCount === 0 ? '100% Valid' : `${anomalyCount} Issues`}
            </span>
            {anomalyCount > 0 ? (
              <AlertTriangle className="w-5 h-5 text-[#D32F2F]" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#00C853]" />
            )}
          </div>
          <span className="text-[11px] text-[#888888]">
            {anomalyCount === 0 ? 'Zero missing dates or logic errors' : 'Action required on flagged rows'}
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bcs-card-static p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#888888]" />
          <input
            type="text"
            placeholder="Search tracking, client, or item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F5F5F2] border border-[#E8E8E6] rounded-md focus:outline-none focus:border-[#2251FF]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-[#888888]">
            <Filter className="w-3.5 h-3.5 text-[#051C2C]" />
            <span>Filters:</span>
          </div>

          <select
            value={selectedClientFilter}
            onChange={(e) => setSelectedClientFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-[#F5F5F2] border border-[#E8E8E6] rounded-md text-[#051C2C] focus:outline-none"
          >
            <option value="ALL">All Clients ({uniqueClients.length})</option>
            {uniqueClients.map((client) => (
              <option key={client} value={client}>
                {client}
              </option>
            ))}
          </select>

          <select
            value={selectedHealthFilter}
            onChange={(e) => setSelectedHealthFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-[#F5F5F2] border border-[#E8E8E6] rounded-md text-[#051C2C] focus:outline-none"
          >
            <option value="ALL">All Data Health</option>
            <option value="NORMAL">✅ Normal Only</option>
            <option value="ANOMALY">⚠️ / ❌ Issues Only</option>
          </select>
        </div>
      </div>

      {/* Main Interactive Table */}
      <div className="bcs-card-static overflow-hidden shadow-sm border border-[#E8E8E6]">
        <div className="overflow-x-auto max-h-[650px] overflow-y-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#051C2C]/5 border-b border-[#051C2C]/15 text-[#051C2C] font-semibold uppercase tracking-wider sticky top-0 bg-[#F5F5F2] z-10">
                <th className="py-3 px-3 w-10 text-center">#</th>
                <th className="py-3 px-3">Tracking Code (A)</th>
                <th className="py-3 px-3">Client Name (B)</th>
                <th className="py-3 px-[#10] min-w-[160px]">Item Description (C)</th>
                <th className="py-3 px-3 text-center">Received (D)</th>
                <th className="py-3 px-3 text-center">Dispatched (E)</th>
                <th className="py-3 px-3 text-right">Pallets (F)</th>
                <th className="py-3 px-3 text-right">Work Hrs (G)</th>
                <th className="py-3 px-3 text-center">Transport (H)</th>
                {/* Calculated columns */}
                <th className="py-3 px-3 text-right bg-[#2251FF]/5 text-[#2251FF]">Days (I)</th>
                <th className="py-3 px-3 text-right bg-[#2251FF]/5 text-[#2251FF]">Billed Spaces (J)</th>
                <th className="py-3 px-3 text-right bg-[#2251FF]/5 text-[#2251FF]">Storage € (K)</th>
                <th className="py-3 px-3 text-right bg-[#2251FF]/5 text-[#2251FF]">Billed Hrs (L)</th>
                <th className="py-3 px-3 text-right bg-[#2251FF]/5 text-[#2251FF]">Handling € (M)</th>
                <th className="py-3 px-3 text-right bg-[#2251FF]/5 text-[#2251FF]">Transport € (N)</th>
                <th className="py-3 px-3 text-right bg-[#2251FF]/10 text-[#051C2C] font-bold">Total € (O)</th>
                <th className="py-3 px-3 text-center">Billing Period (P)</th>
                <th className="py-3 px-3 text-center">Data Health (Q)</th>
                <th className="py-3 px-2 text-center w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]">
              {filteredOps.length === 0 ? (
                <tr>
                  <td colSpan={19} className="py-12 text-center text-[#888888]">
                    No operation logs matching current filters. Click "Add New Operation" to create one.
                  </td>
                </tr>
              ) : (
                filteredOps.map((op, idx) => {
                  const isAnomaly = op.dataHealth !== '✅ Normal';
                  const barPercent = Math.min(100, Math.max(5, (op.totalCharges / maxTotalCharge) * 100));

                  return (
                    <tr
                      key={op.id}
                      className={`hover:bg-[#2251FF]/5 transition-colors ${
                        isAnomaly ? 'bg-[#D32F2F]/5' : idx % 2 === 0 ? 'bg-white' : 'bg-[#F5F5F2]/60'
                      }`}
                    >
                      {/* Index */}
                      <td className="py-2 px-3 text-center text-[#888888] font-mono text-[11px]">
                        {idx + 1}
                      </td>

                      {/* A: Tracking Code */}
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={op.trackingCode}
                          onChange={(e) => handleCellChange(op.id, 'trackingCode', e.target.value)}
                          className="bcs-input-editable w-full font-mono text-xs font-semibold text-[#051C2C]"
                        />
                      </td>

                      {/* B: Client Name */}
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={op.clientName}
                          onChange={(e) => handleCellChange(op.id, 'clientName', e.target.value)}
                          className="bcs-input-editable w-full text-xs font-medium text-[#051C2C]"
                        />
                      </td>

                      {/* C: Item Description */}
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={op.itemDescription}
                          onChange={(e) => handleCellChange(op.id, 'itemDescription', e.target.value)}
                          className="bcs-input-editable w-full text-xs text-[#1A1A2E]"
                        />
                      </td>

                      {/* D: Date Received */}
                      <td className="py-2 px-3">
                        <input
                          type="date"
                          value={op.dateReceived}
                          onChange={(e) => handleCellChange(op.id, 'dateReceived', e.target.value)}
                          className="bcs-input-editable w-full font-mono text-[11px] text-center"
                        />
                      </td>

                      {/* E: Date Dispatched (Blank = in warehouse) */}
                      <td className="py-2 px-3">
                        <input
                          type="date"
                          value={op.dateDispatched}
                          onChange={(e) => handleCellChange(op.id, 'dateDispatched', e.target.value)}
                          placeholder="In Warehouse"
                          className={`bcs-input-editable w-full font-mono text-[11px] text-center ${
                            !op.dateDispatched ? 'italic text-[#2251FF] bg-[#2251FF]/5' : ''
                          }`}
                        />
                      </td>

                      {/* F: Pallet Qty */}
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          min="1"
                          value={op.palletQty}
                          onChange={(e) => handleCellChange(op.id, 'palletQty', parseInt(e.target.value, 10) || 0)}
                          className="bcs-input-editable w-16 text-right font-mono text-xs font-semibold"
                        />
                      </td>

                      {/* G: Work Hours */}
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={op.workHours}
                          onChange={(e) => handleCellChange(op.id, 'workHours', parseFloat(e.target.value) || 0)}
                          className="bcs-input-editable w-16 text-right font-mono text-xs"
                        />
                      </td>

                      {/* H: Transport Flag */}
                      <td className="py-2 px-3 text-center">
                        <select
                          value={op.transportFlag}
                          onChange={(e) => handleCellChange(op.id, 'transportFlag', e.target.value)}
                          className="bcs-input-editable text-xs font-semibold text-center"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </td>

                      {/* COMPUTED COLUMNS (I - Q) */}
                      {/* I: Storage Days */}
                      <td className="py-2 px-3 text-right font-mono font-medium text-[#051C2C] bg-[#2251FF]/5">
                        {op.storageDays} d
                      </td>

                      {/* J: Billed Pallet Spaces */}
                      <td className="py-2 px-3 text-right font-mono font-semibold text-[#051C2C] bg-[#2251FF]/5">
                        {op.billedPalletSpaces}
                      </td>

                      {/* K: Storage Cost */}
                      <td className="py-2 px-3 text-right font-mono font-medium text-[#051C2C] bg-[#2251FF]/5">
                        €{op.storageCost.toFixed(2)}
                      </td>

                      {/* L: Billed Work Hours */}
                      <td className="py-2 px-3 text-right font-mono font-medium text-[#051C2C] bg-[#2251FF]/5">
                        {op.billedWorkHours.toFixed(1)} h
                      </td>

                      {/* M: Handling Cost */}
                      <td className="py-2 px-3 text-right font-mono font-medium text-[#051C2C] bg-[#2251FF]/5">
                        €{op.handlingCost.toFixed(2)}
                      </td>

                      {/* N: Transport Cost */}
                      <td className="py-2 px-3 text-right font-mono font-medium text-[#051C2C] bg-[#2251FF]/5">
                        €{op.transportCost.toFixed(2)}
                      </td>

                      {/* O: Total Charges (with Inline Data Bar) */}
                      <td className="py-2 px-3 text-right bg-[#2251FF]/10">
                        <div className="font-mono font-bold text-[#051C2C]">
                          €{op.totalCharges.toFixed(2)}
                        </div>
                        <div className="bcs-databar-track mt-1">
                          <div
                            className="bcs-databar-fill"
                            style={{ width: `${barPercent}%` }}
                          />
                        </div>
                      </td>

                      {/* P: Billing Period */}
                      <td className="py-2 px-3 text-center font-mono text-[11px] text-[#051C2C]">
                        {op.billingPeriod}
                      </td>

                      {/* Q: Data Health Diagnosis */}
                      <td className="py-2 px-3 text-center whitespace-nowrap">
                        <span
                          className={`bcs-pill ${
                            op.dataHealth === '✅ Normal'
                              ? 'bcs-pill-success'
                              : op.dataHealth.startsWith('⚠️')
                              ? 'bcs-pill-warning'
                              : 'bcs-pill-danger'
                          }`}
                        >
                          {op.dataHealth}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-2 px-2 text-center">
                        <button
                          onClick={() => handleDeleteRow(op.id)}
                          title="Delete Record"
                          className="text-[#888888] hover:text-[#D32F2F] p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
