export interface SystemParameters {
  storageDailyRate: number;       // € / pallet space / day (default: 1.50)
  storageBillingTier: number;     // Pallet tier step (default: 10)
  hourlyWorkRate: number;         // € / hour (default: 25.00)
  minimumWorkHours: number;       // Min work hours floor (default: 0.5)
  transportBaseFee: number;       // € 1st pallet base fee (default: 45.00)
  additionalPalletFee: number;    // € / additional pallet from 2nd (default: 6.00)
  billingCycleDays: number;       // Days per cycle (default: 14)
  cycleBaseDate: string;          // YYYY-MM-DD anchor date (default: 2026-01-01)
}

export interface RawOperation {
  id: string;
  trackingCode: string;
  clientName: string;
  itemDescription: string;
  dateReceived: string;           // YYYY-MM-DD
  dateDispatched: string;         // YYYY-MM-DD or empty
  palletQty: number;
  workHours: number;
  transportFlag: 'Yes' | 'No' | string;
}

export interface ComputedOperation extends RawOperation {
  storageDays: number;
  billedPalletSpaces: number;
  storageCost: number;
  billedWorkHours: number;
  handlingCost: number;
  transportCost: number;
  totalCharges: number;
  billingPeriod: string;          // e.g. "2026/08/01 - 2026/08/14"
  dataHealth: string;             // "✅ Normal" | "❌ Missing Received Date" | "❌ Dispatched Before Received" | "⚠️ Transport Flag Invalid"
}

export interface BiweeklySummaryRow {
  billingPeriod: string;
  clientName: string;
  totalTasksCount: number;
  storageRevenue: number;
  handlingRevenue: number;
  transportRevenue: number;
  totalRevenue: number;
}

export interface InvoiceState {
  selectedClient: string;
  selectedPeriod: string;
}

export interface AppState {
  parameters: SystemParameters;
  operations: RawOperation[];
  invoiceState: InvoiceState;
  lastSaved: string;
}
