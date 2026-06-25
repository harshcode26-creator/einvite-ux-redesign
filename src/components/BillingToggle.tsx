import { BillingCycle } from '../types';

interface BillingToggleProps {
  cycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
}

export default function BillingToggle({ cycle, onChange }: BillingToggleProps) {
  return (
    <div className="flex items-center justify-between p-1 bg-gray-100 rounded-full max-w-[280px]">
      <button
        type="button"
        onClick={() => onChange('monthly')}
        className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
          cycle === 'monthly'
            ? 'bg-white text-brand-primary shadow-sm'
            : 'text-brand-muted hover:text-brand-primary'
        }`}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange('yearly')}
        className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
          cycle === 'yearly'
            ? 'bg-white text-brand-primary shadow-sm'
            : 'text-brand-muted hover:text-brand-primary'
        }`}
      >
        Yearly
      </button>
    </div>
  );
}
