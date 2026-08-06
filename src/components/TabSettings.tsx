import React from 'react';
import { SystemParameters } from '../types';
import { Sliders, Calculator, ShieldAlert, Sparkles } from 'lucide-react';

interface TabSettingsProps {
  parameters: SystemParameters;
  onUpdateParameters: (newParams: SystemParameters) => void;
}

export const TabSettings: React.FC<TabSettingsProps> = ({
  parameters,
  onUpdateParameters,
}) => {
  const handleChange = (key: keyof SystemParameters, value: string | number) => {
    const numVal = typeof value === 'number' ? value : parseFloat(value);
    onUpdateParameters({
      ...parameters,
      [key]: isNaN(numVal) && key !== 'cycleBaseDate' ? value : numVal,
    });
  };

  return (
    <div className="space-y-8 animate-fadeUp">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E8E6]">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#2251FF]" />
            <h1 className="font-heading text-2xl font-bold text-[#051C2C] tracking-tight">
              00_System Parameters & Assumptions (Data Dictionary)
            </h1>
          </div>
          <p className="text-xs text-[#888888] mt-1">
            Centralized management of storage rates, pallet tiers, labor costs, transport fees, and bi-weekly billing cycle anchors.
          </p>
        </div>
        <div className="bcs-pill bcs-pill-normal">
          <Sparkles className="w-3.5 h-3.5 text-[#2251FF]" />
          <span>Single Source of Truth</span>
        </div>
      </div>

      {/* Insight Callout */}
      <div className="bcs-insight-block">
        <h4 className="text-xs font-bold text-[#051C2C] uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Calculator className="w-4 h-4 text-[#2251FF]" />
          Global Parameter Impact
        </h4>
        <p className="text-xs text-[#1A1A2E]/80 leading-relaxed">
          Modifying parameters here immediately updates all existing and new operations in <strong>01_Operations Log</strong>, recalculates bi-weekly revenues in <strong>02_Summary</strong>, and refreshes the printable bill in <strong>03_Invoice</strong> without requiring page submission or manual formula maintenance.
        </p>
      </div>

      {/* Grid of Parameter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 1. Storage Daily Rate */}
        <div className="bcs-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#051C2C] uppercase tracking-wider">
              Storage Daily Rate (C4)
            </span>
            <span className="text-xs font-mono font-semibold text-[#2251FF]">€/space/day</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-[#051C2C]">€</span>
              <input
                type="number"
                step="0.10"
                min="0"
                value={parameters.storageDailyRate}
                onChange={(e) => handleChange('storageDailyRate', parseFloat(e.target.value) || 0)}
                className="bcs-input-editable w-full text-base font-bold font-mono text-[#051C2C]"
              />
            </div>
            <p className="text-[11px] text-[#888888] mt-2">
              Daily storage rental rate generated per billed pallet space.
            </p>
          </div>
        </div>

        {/* 2. Storage Billing Tier */}
        <div className="bcs-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#051C2C] uppercase tracking-wider">
              Storage Tier Step (C5)
            </span>
            <span className="text-xs font-mono font-semibold text-[#2251FF]">Pallets</span>
          </div>
          <div>
            <input
              type="number"
              step="1"
              min="1"
              value={parameters.storageBillingTier}
              onChange={(e) => handleChange('storageBillingTier', parseInt(e.target.value, 10) || 1)}
              className="bcs-input-editable w-full text-base font-bold font-mono text-[#051C2C]"
            />
            <p className="text-[11px] text-[#888888] mt-2">
              Ceiling rounding step (e.g., 10 means 1–10 pallets billed as 10 spaces).
            </p>
          </div>
        </div>

        {/* 3. Hourly Work Rate */}
        <div className="bcs-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#051C2C] uppercase tracking-wider">
              Hourly Work Rate (C6)
            </span>
            <span className="text-xs font-mono font-semibold text-[#2251FF]">€/hour</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-[#051C2C]">€</span>
              <input
                type="number"
                step="0.50"
                min="0"
                value={parameters.hourlyWorkRate}
                onChange={(e) => handleChange('hourlyWorkRate', parseFloat(e.target.value) || 0)}
                className="bcs-input-editable w-full text-base font-bold font-mono text-[#051C2C]"
              />
            </div>
            <p className="text-[11px] text-[#888888] mt-2">
              Labor rate for inbound receiving, picking, packing, and handling.
            </p>
          </div>
        </div>

        {/* 4. Minimum Work Hours */}
        <div className="bcs-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#051C2C] uppercase tracking-wider">
              Min Billed Hours (C7)
            </span>
            <span className="text-xs font-mono font-semibold text-[#2251FF]">Hours</span>
          </div>
          <div>
            <input
              type="number"
              step="0.1"
              min="0"
              value={parameters.minimumWorkHours}
              onChange={(e) => handleChange('minimumWorkHours', parseFloat(e.target.value) || 0)}
              className="bcs-input-editable w-full text-base font-bold font-mono text-[#051C2C]"
            />
            <p className="text-[11px] text-[#888888] mt-2">
              Minimum labor hour floor (if actual work hours &gt; 0, billed at min floor).
            </p>
          </div>
        </div>

        {/* 5. Transport Base Fee */}
        <div className="bcs-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#051C2C] uppercase tracking-wider">
              Transport Base Fee (C8)
            </span>
            <span className="text-xs font-mono font-semibold text-[#2251FF]">€ 1st Pallet</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-[#051C2C]">€</span>
              <input
                type="number"
                step="1.00"
                min="0"
                value={parameters.transportBaseFee}
                onChange={(e) => handleChange('transportBaseFee', parseFloat(e.target.value) || 0)}
                className="bcs-input-editable w-full text-base font-bold font-mono text-[#051C2C]"
              />
            </div>
            <p className="text-[11px] text-[#888888] mt-2">
              Base transport fee covering the 1st pallet when Transport Flag = Yes.
            </p>
          </div>
        </div>

        {/* 6. Additional Pallet Fee */}
        <div className="bcs-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#051C2C] uppercase tracking-wider">
              Extra Pallet Fee (C9)
            </span>
            <span className="text-xs font-mono font-semibold text-[#2251FF]">€/pallet</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-[#051C2C]">€</span>
              <input
                type="number"
                step="0.50"
                min="0"
                value={parameters.additionalPalletFee}
                onChange={(e) => handleChange('additionalPalletFee', parseFloat(e.target.value) || 0)}
                className="bcs-input-editable w-full text-base font-bold font-mono text-[#051C2C]"
              />
            </div>
            <p className="text-[11px] text-[#888888] mt-2">
              Additional transport fee for each pallet beyond the 1st pallet.
            </p>
          </div>
        </div>

        {/* 7. Billing Cycle Days */}
        <div className="bcs-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#051C2C] uppercase tracking-wider">
              Bi-weekly Cycle Days (C10)
            </span>
            <span className="text-xs font-mono font-semibold text-[#2251FF]">Days</span>
          </div>
          <div>
            <input
              type="number"
              step="1"
              min="1"
              value={parameters.billingCycleDays}
              onChange={(e) => handleChange('billingCycleDays', parseInt(e.target.value, 10) || 14)}
              className="bcs-input-editable w-full text-base font-bold font-mono text-[#051C2C]"
            />
            <p className="text-[11px] text-[#888888] mt-2">
              Bi-weekly accounting cycle window duration (fixed at 14 days).
            </p>
          </div>
        </div>

        {/* 8. Cycle Base Date */}
        <div className="bcs-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#051C2C] uppercase tracking-wider">
              Cycle Anchor Date (C11)
            </span>
            <span className="text-xs font-mono font-semibold text-[#2251FF]">YYYY-MM-DD</span>
          </div>
          <div>
            <input
              type="date"
              value={parameters.cycleBaseDate}
              onChange={(e) => handleChange('cycleBaseDate', e.target.value)}
              className="bcs-input-editable w-full text-base font-bold font-mono text-[#051C2C]"
            />
            <p className="text-[11px] text-[#888888] mt-2">
              Historical anchor date from which all 14-day bi-weekly periods radiate.
            </p>
          </div>
        </div>
      </div>

      {/* Formula Logic Cards */}
      <div className="bcs-card-static p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-[#051C2C] flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#2251FF]" />
          Formula Standard & Logic Rules Reference
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-[#F5F5F2] rounded-lg border border-[#E8E8E6] space-y-1">
            <span className="font-bold text-[#051C2C] block">Storage Cost Formula</span>
            <code className="text-[11px] text-[#2251FF] block font-mono">
              Storage Days × Billed Spaces × Daily Rate (€{parameters.storageDailyRate})
            </code>
            <p className="text-[#888888] text-[11px]">
              Billed Spaces = CEILING(Pallet Qty / {parameters.storageBillingTier}) × {parameters.storageBillingTier}
            </p>
          </div>

          <div className="p-3.5 bg-[#F5F5F2] rounded-lg border border-[#E8E8E6] space-y-1">
            <span className="font-bold text-[#051C2C] block">Handling Cost Formula</span>
            <code className="text-[11px] text-[#2251FF] block font-mono">
              Billed Hours × Hourly Rate (€{parameters.hourlyWorkRate})
            </code>
            <p className="text-[#888888] text-[11px]">
              Billed Hours = IF(Work Hours &gt; 0, MAX(Work Hours, {parameters.minimumWorkHours}), 0)
            </p>
          </div>

          <div className="p-3.5 bg-[#F5F5F2] rounded-lg border border-[#E8E8E6] space-y-1">
            <span className="font-bold text-[#051C2C] block">Transport Cost Formula</span>
            <code className="text-[11px] text-[#2251FF] block font-mono">
              IF(Flag == 'Yes', €{parameters.transportBaseFee} + MAX(0, Pallets - 1) × €{parameters.additionalPalletFee}, €0)
            </code>
            <p className="text-[#888888] text-[11px]">
              First pallet gets base fee; subsequent pallets billed at additional pallet fee.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
