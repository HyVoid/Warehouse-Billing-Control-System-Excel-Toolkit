import {
  SystemParameters,
  RawOperation,
  ComputedOperation,
  BiweeklySummaryRow,
  InvoiceState
} from '../types';

/**
 * Format date object or string to YYYY/MM/DD
 */
export function formatDateSlash(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd}`;
}

/**
 * Parse YYYY-MM-DD or YYYY/MM/DD string to midnight Date in local timezone
 */
export function parseLocalDate(dateStr: string): Date | null {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const cleanStr = dateStr.trim().replace(/\//g, '-');
  const parts = cleanStr.split('-');
  if (parts.length !== 3) return null;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  return new Date(year, month, day);
}

/**
 * Calculate Billing Period string based on Date Received and System Cycle Parameters
 */
export function calculateBillingPeriod(
  dateReceivedStr: string,
  params: SystemParameters
): string {
  const receivedDate = parseLocalDate(dateReceivedStr);
  const baseDate = parseLocalDate(params.cycleBaseDate) || new Date(2026, 0, 1);
  if (!receivedDate) return 'N/A';

  const dayMs = 24 * 60 * 60 * 1000;
  // Calculate difference in days from anchor base date
  const diffDays = Math.floor((receivedDate.getTime() - baseDate.getTime()) / dayMs);
  const cycleDays = params.billingCycleDays || 14;
  const periodIndex = Math.floor(diffDays / cycleDays);

  const startMs = baseDate.getTime() + periodIndex * cycleDays * dayMs;
  const endMs = startMs + (cycleDays - 1) * dayMs;

  const startDate = new Date(startMs);
  const endDate = new Date(endMs);

  return `${formatDateSlash(startDate)} - ${formatDateSlash(endDate)}`;
}

/**
 * Computes full calculations for a single RawOperation record
 */
export function computeOperation(
  op: RawOperation,
  params: SystemParameters,
  referenceToday?: Date
): ComputedOperation {
  const today = referenceToday || new Date();
  today.setHours(0, 0, 0, 0);

  const recDate = parseLocalDate(op.dateReceived);
  const dispDate = parseLocalDate(op.dateDispatched);

  // 1. Storage Days
  let storageDays = 0;
  if (recDate) {
    if (dispDate) {
      const diffMs = dispDate.getTime() - recDate.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
      storageDays = diffDays > 0 ? diffDays : 0;
    } else {
      const diffMs = today.getTime() - recDate.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
      storageDays = diffDays > 0 ? diffDays : 1;
    }
  }

  // 2. Billed Pallet Spaces (Tier ceiling logic)
  const tier = params.storageBillingTier > 0 ? params.storageBillingTier : 10;
  const palletQty = Number(op.palletQty) || 0;
  const billedPalletSpaces = palletQty > 0 ? Math.ceil(palletQty / tier) * tier : 0;

  // 3. Storage Cost
  const storageCost = storageDays * billedPalletSpaces * params.storageDailyRate;

  // 4. Billed Work Hours (0.5h minimum threshold floor if workHours > 0)
  const workHours = Number(op.workHours) || 0;
  let billedWorkHours = 0;
  if (workHours > 0) {
    billedWorkHours = Math.max(workHours, params.minimumWorkHours);
  }

  // 5. Handling Cost
  const handlingCost = billedWorkHours * params.hourlyWorkRate;

  // 6. Transport Cost
  const cleanFlag = String(op.transportFlag || '').trim().toUpperCase();
  let transportCost = 0;
  if (cleanFlag === 'YES') {
    const additionalPallets = Math.max(0, palletQty - 1);
    transportCost = params.transportBaseFee + additionalPallets * params.additionalPalletFee;
  }

  // 7. Total Charges
  const totalCharges = storageCost + handlingCost + transportCost;

  // 8. Billing Period
  const billingPeriod = calculateBillingPeriod(op.dateReceived, params);

  // 9. Data Health Check
  let dataHealth = '✅ Normal';
  if (!op.dateReceived || !recDate) {
    dataHealth = '❌ Missing Received Date';
  } else if (dispDate && dispDate.getTime() < recDate.getTime()) {
    dataHealth = '❌ Dispatched Before Received';
  } else if (cleanFlag !== 'YES' && cleanFlag !== 'NO') {
    dataHealth = '⚠️ Transport Flag Invalid';
  }

  return {
    ...op,
    storageDays,
    billedPalletSpaces,
    storageCost,
    billedWorkHours,
    handlingCost,
    transportCost,
    totalCharges,
    billingPeriod,
    dataHealth,
  };
}

/**
 * Computes all operation records
 */
export function computeAllOperations(
  ops: RawOperation[],
  params: SystemParameters
): ComputedOperation[] {
  return ops.map((op) => computeOperation(op, params));
}

/**
 * Generates the Bi-weekly Billing Summary matrix (Sheet 02)
 */
export function generateBiweeklySummary(
  computedOps: ComputedOperation[]
): BiweeklySummaryRow[] {
  const groups = new Map<string, BiweeklySummaryRow>();

  computedOps.forEach((op) => {
    if (!op.clientName || !op.billingPeriod || op.billingPeriod === 'N/A') return;

    const key = `${op.billingPeriod}___${op.clientName}`;
    const existing = groups.get(key) || {
      billingPeriod: op.billingPeriod,
      clientName: op.clientName,
      totalTasksCount: 0,
      storageRevenue: 0,
      handlingRevenue: 0,
      transportRevenue: 0,
      totalRevenue: 0,
    };

    existing.totalTasksCount += 1;
    existing.storageRevenue += op.storageCost;
    existing.handlingRevenue += op.handlingCost;
    existing.transportRevenue += op.transportCost;
    existing.totalRevenue += op.totalCharges;

    groups.set(key, existing);
  });

  const result = Array.from(groups.values());

  // Sort descending by period start date, then client name
  result.sort((a, b) => {
    if (a.billingPeriod !== b.billingPeriod) {
      return b.billingPeriod.localeCompare(a.billingPeriod);
    }
    return a.clientName.localeCompare(b.clientName);
  });

  return result;
}

/**
 * Unique client names from operations
 */
export function getUniqueClients(ops: RawOperation[]): string[] {
  const clients = new Set<string>();
  ops.forEach((op) => {
    if (op.clientName && op.clientName.trim()) {
      clients.add(op.clientName.trim());
    }
  });
  return Array.from(clients).sort();
}

/**
 * Unique billing periods from computed operations
 */
export function getUniqueBillingPeriods(computedOps: ComputedOperation[]): string[] {
  const periods = new Set<string>();
  computedOps.forEach((op) => {
    if (op.billingPeriod && op.billingPeriod !== 'N/A') {
      periods.add(op.billingPeriod);
    }
  });
  return Array.from(periods).sort().reverse();
}

/**
 * Invoice Health Diagnosis & Data Evaluator (Sheet 03)
 */
export function evaluateInvoiceHealth(
  selectedClient: string,
  selectedPeriod: string,
  ops: RawOperation[],
  computedOps: ComputedOperation[]
): {
  healthText: string;
  statusType: 'success' | 'warning' | 'danger' | 'info';
  invoiceNo: string;
  matchingOps: ComputedOperation[];
  storageTotal: number;
  handlingTotal: number;
  transportTotal: number;
  grandTotal: number;
} {
  const allClients = getUniqueClients(ops);

  if (!selectedClient || !selectedPeriod) {
    return {
      healthText: '⚠️ Please select client & period',
      statusType: 'warning',
      invoiceNo: 'INV-INVALID',
      matchingOps: [],
      storageTotal: 0,
      handlingTotal: 0,
      transportTotal: 0,
      grandTotal: 0,
    };
  }

  const clientExists = allClients.includes(selectedClient);
  if (!clientExists) {
    return {
      healthText: '❌ Selected client does not exist',
      statusType: 'danger',
      invoiceNo: 'INV-INVALID',
      matchingOps: [],
      storageTotal: 0,
      handlingTotal: 0,
      transportTotal: 0,
      grandTotal: 0,
    };
  }

  const matchingOps = computedOps.filter(
    (op) => op.clientName === selectedClient && op.billingPeriod === selectedPeriod
  );

  if (matchingOps.length === 0) {
    return {
      healthText: 'ℹ️ No task records in this period',
      statusType: 'info',
      invoiceNo: 'INV-INVALID',
      matchingOps: [],
      storageTotal: 0,
      handlingTotal: 0,
      transportTotal: 0,
      grandTotal: 0,
    };
  }

  // Calculate totals
  const storageTotal = matchingOps.reduce((sum, op) => sum + op.storageCost, 0);
  const handlingTotal = matchingOps.reduce((sum, op) => sum + op.handlingCost, 0);
  const transportTotal = matchingOps.reduce((sum, op) => sum + op.transportCost, 0);
  const grandTotal = storageTotal + handlingTotal + transportTotal;

  // Invoice No calculation: INV-YYYYMM-XX
  let invoiceNo = 'INV-INVALID';
  try {
    const clientIndex = allClients.indexOf(selectedClient) + 1;
    const clientIdxFormatted = String(clientIndex).padStart(2, '0');
    const startPeriodStr = selectedPeriod.split(' - ')[0] || '';
    const yyyymm = startPeriodStr.replace(/\//g, '').slice(0, 6);
    invoiceNo = `INV-${yyyymm || '202608'}-${clientIdxFormatted}`;
  } catch {
    invoiceNo = 'INV-INVALID';
  }

  return {
    healthText: '✅ Invoice generated normally',
    statusType: 'success',
    invoiceNo,
    matchingOps,
    storageTotal,
    handlingTotal,
    transportTotal,
    grandTotal,
  };
}
