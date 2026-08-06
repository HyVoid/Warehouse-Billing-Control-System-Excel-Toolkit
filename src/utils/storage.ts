import { AppState, SystemParameters, RawOperation, InvoiceState } from '../types';
import { DEFAULT_PARAMETERS, DEFAULT_OPERATIONS } from '../data/defaults';

const STORAGE_KEY = 'billing_control_system_app_state_v1';

export function getFormattedNow(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

export function loadAppState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          parameters: { ...DEFAULT_PARAMETERS, ...parsed.parameters },
          operations: Array.isArray(parsed.operations) ? parsed.operations : DEFAULT_OPERATIONS,
          invoiceState: {
            selectedClient: parsed.invoiceState?.selectedClient || '',
            selectedPeriod: parsed.invoiceState?.selectedPeriod || '',
          },
          lastSaved: parsed.lastSaved || getFormattedNow(),
        };
      }
    }
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
  }

  return {
    parameters: DEFAULT_PARAMETERS,
    operations: DEFAULT_OPERATIONS,
    invoiceState: {
      selectedClient: 'Client Alpha',
      selectedPeriod: '',
    },
    lastSaved: getFormattedNow(),
  };
}

export function saveAppState(
  params: SystemParameters,
  ops: RawOperation[],
  invState: InvoiceState
): string {
  const timestamp = getFormattedNow();
  const stateToSave: AppState = {
    parameters: params,
    operations: ops,
    invoiceState: invState,
    lastSaved: timestamp,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }

  return timestamp;
}

export function exportBackupJSON(state: AppState) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `billing_control_backup_${dateStr}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
