import React, { useState, useMemo } from 'react';
import { ComputedOperation } from '../types';
import { generateBiweeklySummary } from '../utils/engine';
import {
  BarChart3,
  Building2,
  CalendarDays,
  Layers,
  Search,
  Filter,
  DollarSign
} from 'lucide-react';

interface TabSummaryProps {
  computedOperations: ComputedOperation[];
}

export const TabSummary: React.FC<TabSummaryProps> = ({
  computedOperations,
}) => {
  const [selectedClient, setSelectedClient] = useState('ALL');
  const [selectedPeriod, setSelectedPeriod] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Full summary matrix
  const fullSummary = useMemo(() => {
    return generateBiweeklySummary(computedOperations);
  }, [computedOperations]);

  // Filters option lists
  const uniqueClients = useMemo(() => {
    const set = new Set<string>();
    fullSummary.forEach((r) => set.add(r.clientName));
    return Array.from(set).sort();
  }, [fullSummary]);

  const uniquePeriods = useMemo(() => {
    const set = new Set<string>();
    fullSummary.forEach((r) => set.add(r.billingPeriod));
    return Array.from(set).sort().reverse();
  }, [fullSummary]);

  // Filtered rows
  const filteredSummary = useMemo(() => {
    return fullSummary.filter((row) => {
      const matchClient = selectedClient === 'ALL' || row.clientName === selectedClient;
      const matchPeriod = selectedPeriod === 'ALL' || row.billingPeriod === selectedPeriod;
      const matchSearch =
        !searchTerm ||
        row.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.billingPeriod.toLowerCase().includes(searchTerm.toLowerCase());
      return matchClient && matchPeriod && matchSearch;
    });
  }, [fullSummary, selectedClient, selectedPeriod, searchTerm]);

  // Portfolio Totals
  const portfolioStats = useMemo(() => {
    const totalRev = filteredSummary.reduce((sum, r) => sum + r.totalRevenue, 0);
    const storageRev = filteredSummary.reduce((sum, r) => sum + r.storageRevenue, 0);
    const handlingRev = filteredSummary.reduce((sum, r) => sum + r.handlingRevenue, 0);
    const transportRev = filteredSummary.reduce((sum, r) => sum + r.transportRevenue, 0);
    const totalTasks = filteredSummary.reduce((sum, r) => sum + r.totalTasksCount, 0);

    return { totalRev, storageRev, handlingRev, transportRev, totalTasks };
  }, [filteredSummary]);

  // Max value for inline data bar relative scaling
  const maxRevenue = useMemo(() => {
    return Math.max(...filteredSummary.map((r) => r.totalRevenue), 1);
  }, [filteredSummary]);

  return (
    <div className="space-y-6 animate-fadeUp">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E8E6]">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#2251FF]" />
            <h1 className="font-heading text-2xl font-bold text-[#051C2C] tracking-tight">
              02_Bi-weekly Billing Summary Dashboard (Automatic Aggregation)
            </h1>
          </div>
          <p className="text-xs text-[#888888] mt-1">
            Dynamic透视视角: Automatic zero-refresh bi-weekly aggregation by Client & Billing Period from operations log.
          </p>
        </div>
        <div className="bcs-pill bcs-pill-normal">
          <Layers className="w-3.5 h-3.5 text-[#2251FF]" />
          <span>{filteredSummary.length} Billing Pairs</span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Revenue */}
        <div className="bcs-card p-4 space-y-1 bg-gradient-to-br from-white to-[#2251FF]/5">
          <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider block">
            Total Revenue
          </span>
          <div className="font-heading text-2xl font-bold text-[#051C2C] tracking-display">
            €{portfolioStats.totalRev.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-[#2251FF] font-medium block">
            Across {portfolioStats.totalTasks} operations
          </span>
        </div>

        {/* Storage Revenue Share */}
        <div className="bcs-card p-4 space-y-1">
          <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider block">
            Storage Revenue
          </span>
          <div className="font-heading text-xl font-bold text-[#051C2C] tracking-display">
            €{portfolioStats.storageRev.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-[#888888]">
            {portfolioStats.totalRev > 0
              ? `${((portfolioStats.storageRev / portfolioStats.totalRev) * 100).toFixed(1)}% of portfolio`
              : '0%'}
          </span>
        </div>

        {/* Handling Revenue Share */}
        <div className="bcs-card p-4 space-y-1">
          <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider block">
            Handling Revenue
          </span>
          <div className="font-heading text-xl font-bold text-[#051C2C] tracking-display">
            €{portfolioStats.handlingRev.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-[#888888]">
            {portfolioStats.totalRev > 0
              ? `${((portfolioStats.handlingRev / portfolioStats.totalRev) * 100).toFixed(1)}% of portfolio`
              : '0%'}
          </span>
        </div>

        {/* Transport Revenue Share */}
        <div className="bcs-card p-4 space-y-1">
          <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider block">
            Transport Revenue
          </span>
          <div className="font-heading text-xl font-bold text-[#051C2C] tracking-display">
            €{portfolioStats.transportRev.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-[#888888]">
            {portfolioStats.totalRev > 0
              ? `${((portfolioStats.transportRev / portfolioStats.totalRev) * 100).toFixed(1)}% of portfolio`
              : '0%'}
          </span>
        </div>

        {/* Cycles Count */}
        <div className="bcs-card p-4 space-y-1">
          <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider block">
            Active Cycles
          </span>
          <div className="font-heading text-xl font-bold text-[#051C2C] tracking-display">
            {uniquePeriods.length}
          </div>
          <span className="text-[11px] text-[#888888]">
            14-day bi-weekly periods
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bcs-card-static p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#888888]" />
          <input
            type="text"
            placeholder="Search period or client name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F5F5F2] border border-[#E8E8E6] rounded-md focus:outline-none focus:border-[#2251FF]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1 text-xs text-[#888888]">
            <Filter className="w-3.5 h-3.5 text-[#051C2C]" />
            <span>Filter by:</span>
          </div>

          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-[#F5F5F2] border border-[#E8E8E6] rounded-md text-[#051C2C] focus:outline-none"
          >
            <option value="ALL">All Bi-weekly Periods ({uniquePeriods.length})</option>
            {uniquePeriods.map((period) => (
              <option key={period} value={period}>
                {period}
              </option>
            ))}
          </select>

          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-[#F5F5F2] border border-[#E8E8E6] rounded-md text-[#051C2C] focus:outline-none"
          >
            <option value="ALL">All Clients ({uniqueClients.length})</option>
            {uniqueClients.map((client) => (
              <option key={client} value={client}>
                {client}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Summary Table */}
      <div className="bcs-card-static overflow-hidden border border-[#E8E8E6]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#051C2C]/5 border-b border-[#051C2C]/15 text-[#051C2C] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Billing Period (A)</th>
                <th className="py-3 px-4">Client Name (B)</th>
                <th className="py-3 px-4 text-right">Tasks Count (C)</th>
                <th className="py-3 px-4 text-right">Storage Revenue € (D)</th>
                <th className="py-3 px-4 text-right">Handling Revenue € (E)</th>
                <th className="py-3 px-4 text-right">Transport Revenue € (F)</th>
                <th className="py-3 px-4 text-right bg-[#2251FF]/10 text-[#051C2C] font-bold">Total Revenue € (G)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6]">
              {filteredSummary.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#888888]">
                    No bi-weekly summary data available for current selection.
                  </td>
                </tr>
              ) : (
                filteredSummary.map((row, idx) => {
                  const barPercent = Math.min(100, Math.max(5, (row.totalRevenue / maxRevenue) * 100));

                  return (
                    <tr
                      key={`${row.billingPeriod}-${row.clientName}`}
                      className={`hover:bg-[#2251FF]/5 transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-[#F5F5F2]/60'
                      }`}
                    >
                      {/* Period */}
                      <td className="py-3 px-4 font-mono font-medium text-[#051C2C]">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5 text-[#2251FF]" />
                          <span>{row.billingPeriod}</span>
                        </div>
                      </td>

                      {/* Client Name */}
                      <td className="py-3 px-4 font-semibold text-[#051C2C]">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#051C2C]/50" />
                          <span>{row.clientName}</span>
                        </div>
                      </td>

                      {/* Tasks Count */}
                      <td className="py-3 px-4 text-right font-mono font-medium text-[#051C2C]">
                        {row.totalTasksCount} tasks
                      </td>

                      {/* Storage Revenue */}
                      <td className="py-3 px-4 text-right font-mono text-[#051C2C]">
                        €{row.storageRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>

                      {/* Handling Revenue */}
                      <td className="py-3 px-4 text-right font-mono text-[#051C2C]">
                        €{row.handlingRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>

                      {/* Transport Revenue */}
                      <td className="py-3 px-4 text-right font-mono text-[#051C2C]">
                        €{row.transportRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>

                      {/* Total Revenue with Data Bar */}
                      <td className="py-3 px-4 text-right bg-[#2251FF]/10">
                        <div className="font-mono font-bold text-sm text-[#051C2C]">
                          €{row.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div className="bcs-databar-track mt-1.5">
                          <div
                            className="bcs-databar-fill"
                            style={{ width: `${barPercent}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            {filteredSummary.length > 0 && (
              <tfoot>
                <tr className="bg-[#051C2C] text-white font-bold border-t-2 border-[#051C2C]">
                  <td className="py-3 px-4">Portfolio Summary Total</td>
                  <td className="py-3 px-4">{uniqueClients.length} Clients</td>
                  <td className="py-3 px-4 text-right font-mono">{portfolioStats.totalTasks} tasks</td>
                  <td className="py-3 px-4 text-right font-mono">
                    €{portfolioStats.storageRev.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-right font-mono">
                    €{portfolioStats.handlingRev.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-right font-mono">
                    €{portfolioStats.transportRev.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-base text-[#00C853]">
                    €{portfolioStats.totalRev.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};
