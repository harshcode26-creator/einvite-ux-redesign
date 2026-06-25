import { Check, Info, Sparkles } from 'lucide-react';
import { PlanInfo } from '../types';

interface ComparisonTableProps {
  onSelectPlan: (planId: string) => void;
  plans: PlanInfo[];
}

interface FeatureRow {
  name: string;
  free: boolean;
  interactive: boolean;
  personal: boolean;
  outstanding: boolean;
  tooltip: string;
}

const COMPARISON_FEATURES: FeatureRow[] = [
  { name: '24-Hour Access', free: true, interactive: true, personal: true, outstanding: true, tooltip: 'Access your invitation dashboard at any time of day' },
  { name: 'Creation upto 5 invitations', free: false, interactive: true, personal: true, outstanding: true, tooltip: 'Draft and test up to 5 variations of your invitation' },
  { name: '1 Year Validity', free: false, interactive: true, personal: true, outstanding: true, tooltip: 'Keep the digital invitation active online for up to 1 year' },
  { name: 'Extra Programs', free: false, interactive: true, personal: true, outstanding: true, tooltip: 'Add multi-day schedules (e.g. rehearsal, reception, brunch)' },
  { name: 'Extra Venue', free: false, interactive: true, personal: true, outstanding: true, tooltip: 'Map multiple event venues with step-by-step directions' },
  { name: 'PDF on Request', free: false, interactive: true, personal: true, outstanding: true, tooltip: 'Generate beautiful downloadable print versions' },
  { name: 'Video Link', free: false, interactive: true, personal: true, outstanding: true, tooltip: 'Embed elegant pre-wedding or proposal video trailers' },
  { name: 'Countdown', free: false, interactive: true, personal: true, outstanding: true, tooltip: 'Live dynamic wedding day countdown widget' },
  { name: 'Love Story QR', free: false, interactive: true, personal: true, outstanding: true, tooltip: 'Bespoke custom QR codes leading directly to your page' },
  { name: 'Guest Name', free: false, interactive: false, personal: true, outstanding: true, tooltip: 'Display personalized greeting names for every specific guest' },
  { name: 'Selective Sharing', free: false, interactive: false, personal: true, outstanding: true, tooltip: 'Show specific events to specific guests only' },
  { name: 'Personalized Note', free: false, interactive: false, personal: true, outstanding: true, tooltip: 'Allow guests to read personalized notes written just for them' },
  { name: 'RSVP', free: false, interactive: false, personal: true, outstanding: true, tooltip: 'Manage guest list responses, diets, and plus-ones' },
  { name: 'Custom Domain', free: false, interactive: false, personal: false, outstanding: true, tooltip: 'Use your own premium URL (e.g. www.sophia-james.com)' },
  { name: '300 Sharing', free: false, interactive: false, personal: false, outstanding: true, tooltip: 'Generate up to 300 unique links to trace guest views' },
  { name: 'Dedicated Support', free: false, interactive: false, personal: false, outstanding: true, tooltip: 'A direct event concierge to help with custom code or setups' }
];

export default function ComparisonTable({ onSelectPlan, plans }: ComparisonTableProps) {
  return (
    <section id="comparison-table" className="bg-brand-surface py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-warm rounded-full border border-brand-champagne mb-6 shadow-sm">
            <span className="material-symbols-outlined text-sm text-brand-secondary">
              <Sparkles className="w-3.5 h-3.5 text-brand-secondary" />
            </span>
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-brand-secondary">
              Detailed Comparison
            </span>
          </div>
          <h2 className="font-serif text-4xl text-brand-primary mb-4 md:text-5xl">
            Compare Plans Side-by-Side
          </h2>
          <p className="font-sans text-brand-muted max-w-2xl mx-auto text-sm md:text-base">
            Quickly see which features are included in each plan and choose the perfect invitation experience for your celebration.
          </p>
        </div>

        {/* Scrollable container for table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full border-collapse text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-6 px-6 font-serif text-lg text-brand-primary font-medium w-1/3">
                  Feature
                </th>
                <th className="py-6 px-4 text-center font-serif text-lg text-brand-primary font-medium">
                  Free
                </th>
                <th className="py-6 px-4 text-center font-serif text-lg text-brand-primary font-medium">
                  Interactive
                </th>
                <th className="py-6 px-4 text-center bg-brand-warm/35 relative w-[22%]">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-brand-gold text-[9px] font-bold rounded-full uppercase tracking-widest text-brand-primary shadow-sm">
                    Recommended
                  </div>
                  <span className="font-serif text-lg text-brand-primary font-semibold">Personal Touch</span>
                </th>
                <th className="py-6 px-4 text-center bg-brand-primary text-white rounded-t-xl font-serif text-lg font-medium">
                  Outstanding
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-100">
              {COMPARISON_FEATURES.map((row, idx) => (
                <tr key={idx} className="hover:bg-brand-surface/40 transition-colors group">
                  {/* Feature Name & Tooltip */}
                  <td className="py-4 px-6 text-sm text-brand-primary font-medium flex items-center gap-2">
                    <span>{row.name}</span>
                    <div className="relative group/tooltip">
                      <Info className="w-3.5 h-3.5 text-gray-300 hover:text-brand-primary cursor-pointer transition-colors" />
                      <div className="absolute left-6 bottom-full mb-2 hidden group-hover/tooltip:block w-64 bg-brand-primary text-white text-xs p-3 rounded-xl shadow-lg z-20 font-sans font-normal leading-relaxed">
                        {row.tooltip}
                        <div className="absolute w-2 h-2 bg-brand-primary rotate-45 -left-1 bottom-2"></div>
                      </div>
                    </div>
                  </td>

                  {/* Free Column */}
                  <td className="py-4 px-4 text-center">
                    {row.free ? (
                      <Check className="w-5 h-5 text-brand-secondary mx-auto" />
                    ) : (
                      <span className="text-gray-300 font-normal">—</span>
                    )}
                  </td>

                  {/* Interactive Column */}
                  <td className="py-4 px-4 text-center">
                    {row.interactive ? (
                      <Check className="w-5 h-5 text-brand-secondary mx-auto" />
                    ) : (
                      <span className="text-gray-300 font-normal">—</span>
                    )}
                  </td>

                  {/* Personal Touch Column */}
                  <td className="py-4 px-4 text-center bg-brand-warm/35">
                    {row.personal ? (
                      <Check className="w-5 h-5 text-brand-secondary mx-auto font-bold" />
                    ) : (
                      <span className="text-gray-300 font-normal">—</span>
                    )}
                  </td>

                  {/* Outstanding Column */}
                  <td className="py-4 px-4 text-center bg-brand-primary/5">
                    {row.outstanding ? (
                      <Check className="w-5 h-5 text-brand-secondary mx-auto font-bold" />
                    ) : (
                      <span className="text-gray-300 font-normal">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Footer Row with Select Buttons */}
            <tfoot>
              <tr>
                <td className="py-8 px-6"></td>
                <td className="py-8 px-4 text-center">
                  <button
                    onClick={() => onSelectPlan('free')}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold hover:bg-brand-surface hover:border-brand-primary transition-all cursor-pointer"
                  >
                    Select Free
                  </button>
                </td>
                <td className="py-8 px-4 text-center">
                  <button
                    onClick={() => onSelectPlan('interactive')}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold hover:bg-brand-surface hover:border-brand-primary transition-all cursor-pointer"
                  >
                    Select Interactive
                  </button>
                </td>
                <td className="py-8 px-4 text-center bg-brand-warm/35 rounded-b-xl">
                  <button
                    onClick={() => onSelectPlan('personal')}
                    className="px-4 py-2 bg-brand-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-all cursor-pointer shadow-sm"
                  >
                    Select Personal
                  </button>
                </td>
                <td className="py-8 px-4 text-center bg-brand-primary text-white rounded-b-xl">
                  <button
                    onClick={() => onSelectPlan('outstanding')}
                    className="px-4 py-2 bg-white text-brand-primary rounded-lg text-xs font-semibold hover:bg-brand-surface transition-all cursor-pointer"
                  >
                    Select Outstanding
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

      </div>
    </section>
  );
}
