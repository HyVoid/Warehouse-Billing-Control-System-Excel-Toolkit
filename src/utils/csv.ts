import { RawOperation } from '../types';

/**
 * Parses CSV text into RawOperation records with header auto-matching
 */
export function parseCSVToOperations(csvText: string): {
  records: RawOperation[];
  errors: string[];
} {
  const errors: string[] = [];
  const records: RawOperation[] = [];

  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length < 2) {
    return { records: [], errors: ['CSV file is empty or missing data rows.'] };
  }

  // Parse header
  const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''));

  // Find column indices
  const getColIndex = (aliases: string[]): number => {
    return headers.findIndex((h) => aliases.some((alias) => h.includes(alias)));
  };

  const idxTracking = getColIndex(['tracking', 'code', 'trknumber', 'id', 'trackingcode']);
  const idxClient = getColIndex(['client', 'customer', 'clientname', 'account']);
  const idxDesc = getColIndex(['item', 'description', 'goods', 'sku', 'desc', 'itemdescription']);
  const idxRec = getColIndex(['received', 'datereceived', 'indate', 'entrydate', 'inbound']);
  const idxDisp = getColIndex(['dispatched', 'datedispatched', 'outdate', 'exitdate', 'outbound', 'dispatch']);
  const idxPallets = getColIndex(['pallet', 'pallets', 'palletqty', 'qty', 'spaces']);
  const idxHours = getColIndex(['hours', 'workhours', 'labor', 'time', 'workhour']);
  const idxTransport = getColIndex(['transport', 'transportflag', 'freight', 'shipping', 'truck']);

  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    if (row.length === 0 || row.every((c) => !c.trim())) continue;

    const getValue = (idx: number, fallback = '') => (idx >= 0 && idx < row.length ? row[idx].trim() : fallback);

    const trackingCode = getValue(idxTracking, `TRK-IMP-${Date.now().toString().slice(-4)}-${i}`);
    const clientName = getValue(idxClient, 'Unassigned Client');
    const itemDescription = getValue(idxDesc, 'Bulk Imported Logistics Cargo');
    const dateReceived = getValue(idxRec, new Date().toISOString().slice(0, 10));
    const dateDispatched = getValue(idxDisp, '');
    const palletQtyStr = getValue(idxPallets, '1');
    const workHoursStr = getValue(idxHours, '0');
    const transportFlagRaw = getValue(idxTransport, 'No');

    const palletQty = parseInt(palletQtyStr, 10) || 1;
    const workHours = parseFloat(workHoursStr) || 0;
    
    // Clean transport flag
    let transportFlag = 'No';
    const flagUpper = transportFlagRaw.toUpperCase();
    if (flagUpper === 'YES' || flagUpper === 'Y' || flagUpper === 'TRUE' || flagUpper === '1') {
      transportFlag = 'Yes';
    } else if (flagUpper === 'NO' || flagUpper === 'N' || flagUpper === 'FALSE' || flagUpper === '0') {
      transportFlag = 'No';
    } else {
      transportFlag = transportFlagRaw || 'No';
    }

    records.push({
      id: `imp-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
      trackingCode,
      clientName,
      itemDescription,
      dateReceived,
      dateDispatched,
      palletQty,
      workHours,
      transportFlag,
    });
  }

  return { records, errors };
}

/**
 * Split CSV line handling quotes
 */
function parseCSVLine(text: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
    } else {
      cur += char;
    }
  }
  result.push(cur);

  return result.map((val) => val.replace(/^"|"$/g, '').trim());
}

/**
 * Download sample CSV template
 */
export function downloadSampleCSV() {
  const csvContent = [
    'Tracking Code,Client Name,Item Description,Date Received,Date Dispatched,Pallet Qty,Work Hours,Transport Flag',
    'TRK-2026-101,Client Alpha,High Precision Automotive Valves,2026-08-01,2026-08-09,15,2.0,Yes',
    'TRK-2026-102,Client Beta,Sterile Pharmaceutical Packaging,2026-08-03,,8,0.5,No',
    'TRK-2026-103,Apex Global,Heavy Duty Electric Motor Stators,2026-08-02,2026-08-11,22,3.5,Yes',
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'billing_control_sample_import.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
