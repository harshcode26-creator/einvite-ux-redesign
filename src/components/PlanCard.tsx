import { PlanInfo, BillingCycle } from '../types';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

interface PlanCardProps {
  key?: string;
  plan: PlanInfo;
  cycle: BillingCycle;
  onSubscribe: (plan: PlanInfo) => void;
}

export default function PlanCard({ plan, cycle, onSubscribe }: PlanCardProps) {
  // Calculate dynamic price based on cycle
  const isYearly = cycle === 'yearly';
  const displayPrice = isYearly ? plan.price.yearly : plan.price.monthly;
  const originalPrice = isYearly ? plan.price.yearlyOriginal || (plan.price.monthlyOriginal ? plan.price.monthlyOriginal * 12 : undefined) : plan.price.monthlyOriginal;
  const saveAmount = originalPrice ? originalPrice - displayPrice : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`p-8 rounded-2xl flex flex-col relative transition-all h-full ${
        plan.isOutstanding
          ? 'bg-brand-primary text-white shadow-xl border border-brand-primary'
          : plan.isRecommended
          ? 'bg-white rounded-2xl border-2 border-brand-gold luxury-shadow-l2'
          : 'bg-white rounded-2xl border border-gray-200/60 hover:shadow-lg'
      }`}
    >
      {/* Popular/Recommended absolute badge */}
      {plan.isRecommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-gold text-[10px] font-bold rounded-full uppercase tracking-widest text-brand-primary shadow-sm">
          Most Popular
        </div>
      )}

      {/* Header Info */}
      <div className="mb-4">
        <span className={`text-[10px] font-bold uppercase tracking-wider ${
          plan.isOutstanding 
            ? 'text-gray-400' 
            : plan.isRecommended 
            ? 'text-brand-secondary' 
            : 'text-brand-muted'
        }`}>
          {plan.badge}
        </span>
        <h4 className="font-serif text-2xl mt-1 tracking-tight">{plan.name}</h4>
      </div>

      <p className={`text-sm mb-6 ${plan.isOutstanding ? 'text-gray-300' : 'text-brand-muted'}`}>
        {plan.tagline}
      </p>

      {/* Pricing display */}
      <div className="mb-6 h-16 flex flex-col justify-end">
        {displayPrice === 0 ? (
          <span className="font-serif text-3xl font-medium">₹0</span>
        ) : (
          <div>
            <div className="flex items-baseline gap-2">
              {originalPrice && (
                <span className={`text-sm line-through ${plan.isOutstanding ? 'text-gray-400' : 'text-gray-400'}`}>
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="font-serif text-3xl font-medium">
                ₹{displayPrice.toLocaleString('en-IN')}
              </span>
              <span className={`text-xs ${plan.isOutstanding ? 'text-gray-400' : 'text-brand-muted'}`}>
                /{isYearly ? 'yr' : 'mo'}
              </span>
            </div>
            
            {saveAmount > 0 && (
              <span className={`text-[10px] font-bold mt-1 uppercase block ${
                plan.isOutstanding ? 'text-brand-champagne' : 'text-red-600'
              }`}>
                Save ₹{saveAmount.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Features count Badge */}
      <div className="mb-8">
        <span className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded ${
          plan.isOutstanding
            ? 'bg-white/15 text-white'
            : plan.isRecommended
            ? 'bg-brand-warm text-brand-secondary border border-brand-gold/20'
            : 'bg-brand-surface text-brand-primary border border-gray-100'
        }`}>
          {plan.allFeaturesCount}
        </span>
      </div>

      {/* Subscribe Button */}
      <button
        onClick={() => onSubscribe(plan)}
        className={`w-full py-3 rounded-xl text-sm font-semibold mb-8 transition-all active:scale-98 cursor-pointer ${
          plan.isOutstanding
            ? 'bg-white text-brand-primary hover:bg-brand-surface'
            : plan.isRecommended
            ? 'bg-brand-primary text-white hover:bg-brand-primary/95 shadow-md shadow-brand-primary/10'
            : 'border border-gray-300 text-brand-primary hover:bg-brand-surface hover:border-brand-primary'
        }`}
      >
        {plan.buttonText}
      </button>

      {/* Features list */}
      <ul className="space-y-4 flex-grow">
        {plan.features.map((feature, idx) => {
          const isAdditional = feature.includes('+');
          return (
            <li 
              key={idx} 
              className={`flex items-start gap-3 text-sm ${
                isAdditional 
                  ? 'font-semibold mt-4 text-brand-secondary' 
                  : plan.isOutstanding 
                  ? 'text-gray-200' 
                  : 'text-brand-muted'
              }`}
            >
              {!isAdditional && (
                <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                  plan.isOutstanding 
                    ? 'text-brand-champagne' 
                    : 'text-brand-secondary'
                }`} />
              )}
              <span>{feature}</span>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
