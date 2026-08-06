import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 border-t border-[#E8E8E6] text-center text-[#888888] text-xs no-print">
      <div className="max-w-[1400px] mx-auto px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#051C2C]/70">
          <ShieldCheck className="w-4 h-4 text-[#00C853]" />
          <span>Billing Control System — Single Page Operational Financial Engine</span>
        </div>
        <p className="max-w-xl text-center sm:text-right text-[11px] text-[#888888] leading-relaxed">
          <Info className="w-3.5 h-3.5 inline-block mr-1 text-[#2251FF] -mt-0.5" />
          All data in this tool is stored locally in your browser's LocalStorage. The page itself does not retain or upload any user data.
        </p>
      </div>
    </footer>
  );
};
