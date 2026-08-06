import React from 'react';
import { RawOperation, ComputedOperation, InvoiceState } from '../types';
import {
  computeAllOperations,
  getUniqueClients,
  getUniqueBillingPeriods,
  evaluateInvoiceHealth
} from '../utils/engine';
import {
  Printer,
  Copy,
  Check,
  Package,
  Building2,
  Calendar,
  FileCheck,
  AlertCircle
} from 'lucide-react';

interface TabInvoiceProps {
  operations: RawOperation[];
  parameters: any;
  invoiceState: InvoiceState;
  onUpdateInvoiceState: (newState: InvoiceState) => void;
}

export const TabInvoice: React.FC<TabInvoiceProps> = ({
  operations,
  parameters,
  invoiceState,
  onUpdateInvoiceState,
}) => {
  const [copied, setCopied] = React.useState(false);

  const computedOps = React.useMemo(() => {
    return computeAllOperations(operations, parameters);
  }, [operations, parameters]);

  const uniqueClients = React.useMemo(() => {
    return getUniqueClients(operations);
  }, [operations]);

  const uniquePeriods = React.useMemo(() => {
    return getUniqueBillingPeriods(computedOps);
  }, [computedOps]);

  // Evaluate Invoice Health and retrieve data
  const invoiceEval = React.useMemo(() => {
    return evaluateInvoiceHealth(
      invoiceState.selectedClient,
      invoiceState.selectedPeriod,
      operations,
      computedOps
    );
  }, [invoiceState, operations, computedOps]);

  const handleClientChange = (client: string) => {
    onUpdateInvoiceState({ ...invoiceState, selectedClient: client });
  };

  const handlePeriodChange = (period: string) => {
    onUpdateInvoiceState({ ...invoiceState, selectedPeriod: period });
  };

  // Trigger print
  const handlePrint = () => {
    window.print();
  };

  // Copy summary text
  const handleCopySummary = () => {
    const summaryText = `
INVOICE STATEMENT
Invoice No: ${invoiceEval.invoiceNo}
Client: ${invoiceState.selectedClient}
Billing Period: ${invoiceState.selectedPeriod}
Invoice Date: ${new Date().toISOString().split('T')[0]}

SUMMARY BREAKDOWN:
- Storage Subtotal: €${invoiceEval.storageTotal.toFixed(2)}
- Handling Subtotal: €${invoiceEval.handlingTotal.toFixed(2)}
- Transport Subtotal: €${invoiceEval.transportTotal.toFixed(2)}
- GRAND TOTAL: €${invoiceEval.grandTotal.toFixed(2)}

Total Line Items: ${invoiceEval.matchingOps.length}
    `.trim();

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6 animate-fadeUp">
      {/* Page Title & Controls - Hidden during print */}
      <div className="no-print space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E8E6]">
          <div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#2251FF]" />
              <h1 className="font-heading text-2xl font-bold text-[#051C2C] tracking-tight">
                03_Single-Page Printable Invoice
              </h1>
            </div>
            <p className="text-xs text-[#888888] mt-1">
              Terminal Billing Output: Select Client and Bi-weekly Period to dynamically generate official statement for printing / PDF export.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] rounded-md transition-colors border border-[#E8E8E6]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00C853]" /> : <Copy className="w-3.5 h-3.5 text-[#2251FF]" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={handlePrint}
              disabled={invoiceEval.statusType !== 'success'}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-md shadow-sm transition-colors ${
                invoiceEval.statusType === 'success'
                  ? 'bg-[#2251FF] hover:bg-[#2251FF]/90 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export PDF</span>
            </button>
          </div>
        </div>

        {/* Control Selection Card */}
        <div className="bcs-card-static p-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* C4: Select Client */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#051C2C] uppercase tracking-wider block">
              1. Select Client Name (C4)
            </label>
            <select
              value={invoiceState.selectedClient}
              onChange={(e) => handleClientChange(e.target.value)}
              className="bcs-input-editable w-full text-xs font-semibold text-[#051C2C]"
            >
              <option value="">-- Choose Client --</option>
              {uniqueClients.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
          </div>

          {/* C5: Select Period */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#051C2C] uppercase tracking-wider block">
              2. Select Billing Period (C5)
            </label>
            <select
              value={invoiceState.selectedPeriod}
              onChange={(e) => handlePeriodChange(e.target.value)}
              className="bcs-input-editable w-full text-xs font-semibold text-[#051C2C]"
            >
              <option value="">-- Choose Bi-weekly Period --</option>
              {uniquePeriods.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>

          {/* C6: Invoice Health Diagnosis */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#051C2C] uppercase tracking-wider block">
              3. Invoice Status Diagnosis (C6)
            </label>
            <div>
              <span
                className={`bcs-pill ${
                  invoiceEval.statusType === 'success'
                    ? 'bcs-pill-success'
                    : invoiceEval.statusType === 'warning'
                    ? 'bcs-pill-warning'
                    : invoiceEval.statusType === 'info'
                    ? 'bcs-pill-normal'
                    : 'bcs-pill-danger'
                }`}
              >
                {invoiceEval.healthText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Invoice Container */}
      <div className="bcs-card-static p-8 sm:p-10 border border-[#E8E8E6] bg-white text-[#051C2C] shadow-md print:shadow-none print:border-none print:p-0">
        {/* Header Branding */}
        <div className="flex items-start justify-between border-b-2 border-[#051C2C] pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#051C2C] text-white flex items-center justify-center">
              <Package className="w-6 h-6 text-[#2251FF]" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold tracking-tight text-[#051C2C]">
                LOGISTICS & WAREHOUSE INVOICE
              </h2>
              <span className="text-xs text-[#888888] font-semibold uppercase tracking-wider block">
                Billing Control System — Formal Statement
              </span>
            </div>
          </div>

          <div className="text-right font-mono text-xs space-y-1">
            <div className="text-[#888888] font-sans text-[11px] uppercase tracking-wider">
              Invoice Date (F4): <strong className="text-[#051C2C] font-mono">{todayStr}</strong>
            </div>
            <div className="text-[#051C2C] text-sm font-bold">
              Invoice No (F5): <span className="text-[#2251FF]">{invoiceEval.invoiceNo}</span>
            </div>
          </div>
        </div>

        {/* Client & Period Information */}
        <div className="grid grid-cols-2 gap-6 p-4 bg-[#F5F5F2] rounded-lg mb-6 text-xs border border-[#E8E8E6]">
          <div className="space-y-1">
            <span className="text-[10px] text-[#888888] uppercase font-bold tracking-wider block">
              Billed Customer (Client Name)
            </span>
            <div className="font-heading text-lg font-bold text-[#051C2C] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#2251FF]" />
              <span>{invoiceState.selectedClient || '— Select Client —'}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-[#888888] uppercase font-bold tracking-wider block">
              Bi-weekly Accounting Cycle
            </span>
            <div className="font-heading text-lg font-bold text-[#051C2C] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#2251FF]" />
              <span>{invoiceState.selectedPeriod || '— Select Period —'}</span>
            </div>
          </div>
        </div>

        {/* Financial Subtotals Summary Grid (C8, E8, G8, I8) */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="p-3.5 bg-white border border-[#E8E8E6] rounded-md text-center">
            <span className="text-[10px] text-[#888888] uppercase font-bold tracking-wider block">
              Storage Total (C8)
            </span>
            <div className="font-mono text-base font-semibold text-[#051C2C] mt-1">
              €{invoiceEval.storageTotal.toFixed(2)}
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#E8E8E6] rounded-md text-center">
            <span className="text-[10px] text-[#888888] uppercase font-bold tracking-wider block">
              Handling Total (E8)
            </span>
            <div className="font-mono text-base font-semibold text-[#051C2C] mt-1">
              €{invoiceEval.handlingTotal.toFixed(2)}
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#E8E8E6] rounded-md text-center">
            <span className="text-[10px] text-[#888888] uppercase font-bold tracking-wider block">
              Transport Total (G8)
            </span>
            <div className="font-mono text-base font-semibold text-[#051C2C] mt-1">
              €{invoiceEval.transportTotal.toFixed(2)}
            </div>
          </div>

          <div className="p-3.5 bg-[#051C2C] text-white rounded-md text-center shadow-sm">
            <span className="text-[10px] text-white/70 uppercase font-bold tracking-wider block">
              Grand Total (I8)
            </span>
            <div className="font-heading text-xl font-bold text-[#00C853] mt-0.5 tracking-tight">
              €{invoiceEval.grandTotal.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Line Items Detail Table (A12:K30) */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-[#051C2C] uppercase tracking-wider flex items-center justify-between">
            <span>Operation Tasks Line Items Breakdown (A12:K30)</span>
            <span className="text-[11px] text-[#888888] font-normal">
              {invoiceEval.matchingOps.length} Record(s) Billed
            </span>
          </h4>

          <div className="overflow-x-auto border border-[#E8E8E6] rounded-md">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#051C2C]/5 border-b border-[#051C2C]/15 text-[#051C2C] font-semibold uppercase">
                  <th className="py-2 px-2.5">Tracking Code</th>
                  <th className="py-2 px-2.5">Item Description</th>
                  <th className="py-2 px-2.5 text-center">Received</th>
                  <th className="py-2 px-2.5 text-center">Dispatched</th>
                  <th className="py-2 px-2.5 text-right">Pallets</th>
                  <th className="py-2 px-2.5 text-right">Days</th>
                  <th className="py-2 px-2.5 text-right">Storage €</th>
                  <th className="py-2 px-2.5 text-right">Work Hrs</th>
                  <th className="py-2 px-2.5 text-right">Handling €</th>
                  <th className="py-2 px-2.5 text-right">Transport €</th>
                  <th className="py-2 px-2.5 text-right bg-[#2251FF]/10 text-[#051C2C] font-bold">
                    Total €
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E6]">
                {invoiceEval.matchingOps.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-10 text-center text-[#888888] italic">
                      <AlertCircle className="w-5 h-5 mx-auto mb-2 text-[#888888]/60" />
                      No matching operation records found for the selected client and period.
                    </td>
                  </tr>
                ) : (
                  invoiceEval.matchingOps.map((op, idx) => (
                    <tr key={op.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F5F5F2]/40'}>
                      <td className="py-2 px-2.5 font-mono font-medium text-[#051C2C]">{op.trackingCode}</td>
                      <td className="py-2 px-2.5 text-[#1A1A2E]">{op.itemDescription}</td>
                      <td className="py-2 px-2.5 text-center font-mono">{op.dateReceived}</td>
                      <td className="py-2 px-2.5 text-center font-mono">{op.dateDispatched || 'In Storage'}</td>
                      <td className="py-2 px-2.5 text-right font-mono">{op.palletQty}</td>
                      <td className="py-2 px-2.5 text-right font-mono">{op.storageDays} d</td>
                      <td className="py-2 px-2.5 text-right font-mono">€{op.storageCost.toFixed(2)}</td>
                      <td className="py-2 px-2.5 text-right font-mono">{op.billedWorkHours.toFixed(1)} h</td>
                      <td className="py-2 px-2.5 text-right font-mono">€{op.handlingCost.toFixed(2)}</td>
                      <td className="py-2 px-2.5 text-right font-mono">€{op.transportCost.toFixed(2)}</td>
                      <td className="py-2 px-2.5 text-right font-mono font-bold bg-[#2251FF]/5 text-[#051C2C]">
                        €{op.totalCharges.toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {invoiceEval.matchingOps.length > 0 && (
                <tfoot>
                  <tr className="bg-[#F5F5F2] font-bold border-t-2 border-[#051C2C] text-[#051C2C]">
                    <td colSpan={6} className="py-2.5 px-2.5 text-right">Total Statement Charges:</td>
                    <td className="py-2.5 px-2.5 text-right font-mono">€{invoiceEval.storageTotal.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5"></td>
                    <td className="py-2.5 px-2.5 text-right font-mono">€{invoiceEval.handlingTotal.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5 text-right font-mono">€{invoiceEval.transportTotal.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5 text-right font-mono text-xs bg-[#051C2C] text-[#00C853]">
                      €{invoiceEval.grandTotal.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>

        {/* Formal Footer Signatures */}
        <div className="mt-12 pt-6 border-t border-[#E8E8E6] flex justify-between items-end text-[11px] text-[#888888]">
          <div className="space-y-1">
            <p className="font-semibold text-[#051C2C]">Payment Terms & Notes:</p>
            <p>Payment due within 14 calendar days of statement date.</p>
            <p>Calculations derived from automated warehouse log telemetry.</p>
          </div>
          <div className="text-right border-t border-dashed border-[#051C2C]/30 pt-2 w-48">
            <p className="font-semibold text-[#051C2C]">Authorized Finance Officer</p>
          </div>
        </div>
      </div>
    </div>
  );
};
