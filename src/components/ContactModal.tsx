import React, { useState } from 'react';
import { X, Calculator, ShieldCheck, Sparkles, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const [guests, setGuests] = useState(15000);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Dynamic quote calculation
  const calculateEstimatedQuote = () => {
    const basePricePerGuest = 0.5; // ₹0.50 per guest above 10k
    const guestPremium = (guests - 10000) * basePricePerGuest;
    const baseLicense = 9500; // Enterprise Base
    const addonPrice = selectedAddons.length * 2500;
    return baseLicense + guestPremium + addonPrice;
  };

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(item => item !== addonId)
        : [...prev, addonId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-brand-primary/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full luxury-shadow-l2 border border-gray-200 overflow-hidden relative my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-muted hover:text-brand-primary cursor-pointer p-1.5 rounded-full hover:bg-brand-surface z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 border border-green-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-brand-secondary bg-brand-warm px-3.5 py-1.5 rounded-full border border-brand-champagne mb-4">
              Proposal Request Submitted
            </span>
            <h3 className="font-serif text-3xl text-brand-primary mb-4">We are drafting your bespoke quote</h3>
            <p className="text-brand-muted text-sm max-w-lg leading-relaxed mb-8">
              Thank you, <span className="font-semibold text-brand-primary">{name}</span>. Our Enterprise Events team will contact you at <span className="font-semibold text-brand-primary">{email}</span> within 2 business hours with an official customized proposal.
            </p>
            <div className="p-6 bg-brand-warm rounded-2xl border border-brand-champagne/30 text-left max-w-md w-full">
              <h4 className="font-serif text-lg text-brand-primary mb-3">Custom Estimation Summary</h4>
              <ul className="space-y-2.5 text-xs text-brand-muted">
                <li className="flex justify-between">
                  <span>Primary Contact:</span>
                  <span className="font-semibold text-brand-primary">{name}</span>
                </li>
                <li className="flex justify-between">
                  <span>Guest Capacity:</span>
                  <span className="font-semibold text-brand-primary">{guests.toLocaleString()} guests</span>
                </li>
                <li className="flex justify-between">
                  <span>Dynamic Estimate:</span>
                  <span className="font-semibold text-brand-primary">₹{calculateEstimatedQuote().toLocaleString('en-IN')} / event</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="mt-8 px-8 py-3 bg-brand-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Return to Pricing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Grid: Live quotation calculator */}
            <div className="lg:col-span-5 bg-brand-warm/60 p-8 border-r border-gray-100 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-primary text-white rounded-full text-[10px] font-bold uppercase tracking-wider mb-6">
                  <Calculator className="w-3 h-3 text-brand-champagne" /> Quote Estimator
                </div>
                <h3 className="font-serif text-2xl text-brand-primary mb-2">Configure Your Scale</h3>
                <p className="text-xs text-brand-muted leading-relaxed mb-6">
                  Move the slider to specify your guest count. Enterprise rates adjust based on scale, starting above 10,000 guests.
                </p>

                {/* Slider range */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">Expected Guests</span>
                    <span className="text-lg font-bold text-brand-primary font-sans">
                      {guests.toLocaleString()} guests
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="10000" 
                    max="100000" 
                    step="5000"
                    value={guests} 
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full accent-brand-secondary h-1 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                    <span>10k Guests</span>
                    <span>100k Guests</span>
                  </div>
                </div>

                {/* Custom Addons selection */}
                <div className="space-y-3 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-muted block">Enterprise Add-ons</span>
                  
                  <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 cursor-pointer hover:border-brand-gold/30 transition-all">
                    <input 
                      type="checkbox" 
                      checked={selectedAddons.includes('concierge')}
                      onChange={() => handleAddonToggle('concierge')}
                      className="rounded text-brand-secondary focus:ring-brand-secondary mt-0.5"
                    />
                    <div>
                      <span className="text-xs font-bold text-brand-primary block">Direct Phone Concierge</span>
                      <span className="text-[10px] text-brand-muted block">Direct support line for guests who experience issues (+₹2,500)</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 cursor-pointer hover:border-brand-gold/30 transition-all">
                    <input 
                      type="checkbox" 
                      checked={selectedAddons.includes('analytics')}
                      onChange={() => handleAddonToggle('analytics')}
                      className="rounded text-brand-secondary focus:ring-brand-secondary mt-0.5"
                    />
                    <div>
                      <span className="text-xs font-bold text-brand-primary block">Real-time RSVP Analytics</span>
                      <span className="text-[10px] text-brand-muted block">Bespoke analytics reporting for guest tracking (+₹2,500)</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Dynamic quotation card */}
              <div className="bg-brand-primary text-white p-5 rounded-xl border border-brand-gold/20 shadow-md">
                <span className="text-[10px] font-bold text-brand-champagne uppercase tracking-wider block">Estimated Investment</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold font-serif">₹{calculateEstimatedQuote().toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-gray-400 font-sans font-normal">/ event limit</span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] text-gray-300 mt-2.5 pt-2.5 border-t border-white/10 font-sans">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" /> Includes enterprise-grade security & SLAs
                </div>
              </div>
            </div>

            {/* Right Grid: Form */}
            <div className="lg:col-span-7 p-8">
              <div className="mb-6">
                <span className="font-sans font-bold text-xs uppercase tracking-wider text-brand-secondary mb-1 block">Custom Enterprise Suite</span>
                <h3 className="font-serif text-3xl text-brand-primary">Bespoke Celebration Form</h3>
                <p className="text-sm text-brand-muted mt-1">Provide your event details to initialize consultation.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Diana Prince"
                      className="w-full px-4 py-3 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">Work/Personal Email *</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="diana@celebrations.com"
                      className="w-full px-4 py-3 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-sm font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">Target Celebration Date</label>
                    <input 
                      type="date" 
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-3 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-sm font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">Bespoke Requirements / Event Details</label>
                  <textarea 
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="We are hosting a multi-day heritage wedding event and require personalized white-glove onboarding for high-profile international guests..."
                    className="w-full px-4 py-3 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-sm font-sans resize-none"
                  />
                </div>

                <div className="flex items-center gap-2.5 p-4 bg-brand-surface rounded-xl border border-gray-200/50">
                  <Sparkles className="w-5 h-5 text-brand-secondary shrink-0" />
                  <span className="text-[11px] text-brand-muted leading-relaxed">
                    By submitting, you agree to receive direct priority communication from EInvite VIP events concierge about this proposal.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-primary text-white rounded-xl font-sans font-semibold text-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4 text-brand-champagne" /> Submit Bespoke Proposal Request
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
