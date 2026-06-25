import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, Heart, QrCode, CalendarDays, Globe, CreditCard, CheckCircle2, Copy, Download } from 'lucide-react';
import { PlanInfo, BillingCycle } from '../types';

interface SubscriptionModalProps {
  plan: PlanInfo;
  cycle: BillingCycle;
  onClose: () => void;
}

export default function SubscriptionModal({ plan, cycle, onClose }: SubscriptionModalProps) {
  const isYearly = cycle === 'yearly';
  const displayPrice = isYearly ? plan.price.yearly : plan.price.monthly;
  const originalPrice = isYearly ? plan.price.yearlyOriginal || (plan.price.monthlyOriginal ? plan.price.monthlyOriginal * 12 : undefined) : plan.price.monthlyOriginal;
  const saveAmount = originalPrice ? originalPrice - displayPrice : 0;

  // Personalization State
  const [coupleNames, setCoupleNames] = useState('');
  const [celebrationDate, setCelebrationDate] = useState('');
  const [subdomain, setSubdomain] = useState('');
  
  // Payment State
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = value.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || '';
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(value);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (value.length >= 2) {
      setCardExpiry(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
    } else {
      setCardExpiry(value);
    }
  };

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setSubdomain(raw);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate luxury processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${subdomain || 'celebration'}.einvite.co`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReceipt = () => {
    const content = `EINVITE SUBSCRIPTION RECEIPT
--------------------------------------
Invoice Code: INV-2026-${Math.floor(Math.random() * 9000) + 1000}
Date: ${new Date().toLocaleDateString()}
Client: ${cardName || coupleNames || 'EInvite Guest'}
Plan Purchased: ${plan.name} (${cycle} billing)
Subdomain Reserved: https://${subdomain || 'celebration'}.einvite.co
Celebration Date: ${celebrationDate || 'TBD'}
Amount Paid: INR ${displayPrice.toLocaleString('en-IN')}
--------------------------------------
Thank you for your choice of editorial excellence.`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EInvite_Receipt_${plan.name.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
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

        {isSuccess ? (
          /* High Fidelity Subscription Success Screen with Premium Printable Certificate */
          <div className="p-8 md:p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-brand-warm text-brand-secondary rounded-full flex items-center justify-center mb-6 border border-brand-champagne">
              <Heart className="w-8 h-8 fill-brand-secondary text-brand-secondary" />
            </div>

            <span className="font-sans font-bold text-xs uppercase tracking-widest text-brand-secondary bg-brand-warm px-3.5 py-1.5 rounded-full border border-brand-champagne mb-4">
              Subscription Successfully Activated
            </span>
            <h3 className="font-serif text-3xl text-brand-primary mb-3">Welcome to your suite, {coupleNames || 'Beloved Client'}</h3>
            <p className="text-brand-muted text-sm max-w-md leading-relaxed mb-8">
              Your premium <span className="font-bold text-brand-primary">{plan.name}</span> invitation module is live and fully provisioned. Check your receipt and subdomain reservation details.
            </p>

            {/* Custom Invitation Card Certificate */}
            <div className="w-full max-w-xl bg-brand-warm p-8 rounded-3xl border-2 border-brand-gold relative overflow-hidden text-left mb-8 shadow-md">
              {/* Premium watermark overlay */}
              <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full border border-brand-gold/10 pointer-events-none flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border border-brand-gold/20 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-brand-gold/30"></div>
                </div>
              </div>

              {/* Card Header */}
              <div className="flex justify-between items-start mb-8 pb-4 border-b border-brand-gold/25">
                <div>
                  <h4 className="font-serif text-2xl text-brand-primary tracking-wide">EInvite</h4>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-secondary">Bespoke Digital Invitation Suite</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-sans font-bold uppercase tracking-widest block text-brand-secondary">Membership ID</span>
                  <span className="font-mono text-xs font-semibold text-brand-primary">#EI-2026-{Math.floor(Math.random()*90000)+10000}</span>
                </div>
              </div>

              {/* Hosts & Celebrations info */}
              <div className="space-y-4 mb-8">
                <div>
                  <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-brand-muted block">Hosts / Celebrated Couple</span>
                  <span className="font-serif text-xl text-brand-primary">{coupleNames || 'Sophia & James'}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-brand-muted block">Celebration Date</span>
                    <span className="font-serif text-sm text-brand-primary flex items-center gap-1.5 mt-0.5">
                      <CalendarDays className="w-3.5 h-3.5 text-brand-secondary" /> {celebrationDate ? new Date(celebrationDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'To Be Decided'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-brand-muted block">Active Tier</span>
                    <span className="font-sans text-xs font-bold text-brand-secondary flex items-center gap-1 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-gold" /> {plan.name} Plan ({cycle})
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-brand-muted block">Bespoke Subdomain Reserved</span>
                  <span className="font-sans text-xs font-semibold text-brand-primary flex items-center gap-1.5 mt-0.5">
                    <Globe className="w-3.5 h-3.5 text-brand-secondary" /> https://{subdomain || 'celebration'}.einvite.co
                  </span>
                </div>
              </div>

              {/* QR Code section placeholder */}
              <div className="pt-4 border-t border-brand-gold/15 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode className="w-10 h-10 text-brand-primary stroke-[1.5]" />
                  <div className="leading-tight">
                    <span className="text-[9px] font-sans font-bold text-brand-secondary block uppercase tracking-wider">Love Story QR</span>
                    <span className="text-[9px] text-brand-muted block">Interactive scan to dashboard</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleCopyLink}
                    className="p-2 bg-white text-brand-primary border border-brand-gold/20 rounded-lg hover:bg-brand-surface transition-colors cursor-pointer text-xs flex items-center gap-1 font-sans"
                  >
                    <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied' : 'Copy Subdomain'}
                  </button>
                  <button 
                    onClick={downloadReceipt}
                    className="p-2 bg-brand-primary text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer text-xs flex items-center gap-1 font-sans"
                  >
                    <Download className="w-3.5 h-3.5" /> Invoice
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-brand-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Go to My Dashboard
            </button>
          </div>
        ) : (
          /* Checkout Split Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Order Summary */}
            <div className="lg:col-span-5 bg-brand-warm/60 p-8 border-r border-gray-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider block mb-2">Checkout Summary</span>
                <h3 className="font-serif text-2xl text-brand-primary mb-1">Selected Package</h3>
                <p className="text-xs text-brand-muted mb-6">Review your curated tier and active features.</p>

                {/* Plan Card Mini view */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200/60 shadow-sm mb-6">
                  <span className="text-[9px] font-bold text-brand-secondary uppercase tracking-widest">{plan.badge}</span>
                  <h4 className="font-serif text-xl text-brand-primary mt-0.5">{plan.name}</h4>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">{plan.tagline}</p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-baseline">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">Billed {cycle}</span>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1 justify-end">
                        <span className="text-lg font-bold font-serif text-brand-primary">₹{displayPrice.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-brand-muted">/{isYearly ? 'yr' : 'mo'}</span>
                      </div>
                      {saveAmount > 0 && (
                        <span className="text-[9px] font-semibold text-red-600 uppercase block">Save ₹{saveAmount.toLocaleString('en-IN')} included</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bulleted feature checkmarks */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">Key inclusions</span>
                  {plan.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-brand-muted">
                      <div className="w-3.5 h-3.5 rounded-full bg-brand-gold/20 text-brand-secondary flex items-center justify-center shrink-0">
                        <Sparkles className="w-2.5 h-2.5" />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety banner */}
              <div className="mt-8 pt-4 border-t border-gray-200 text-[10px] text-brand-muted flex items-center gap-2 leading-relaxed">
                <ShieldCheck className="w-5 h-5 text-brand-secondary shrink-0" />
                <span>Secure SSL encrypted Checkout. Subscriptions can be managed or canceled easily from event controls.</span>
              </div>
            </div>

            {/* Right Column: Information & Pay Forms */}
            <div className="lg:col-span-7 p-8 max-h-[600px] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personalization Section */}
                <div>
                  <h4 className="font-serif text-lg text-brand-primary mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
                    <Heart className="w-4 h-4 text-brand-secondary" /> 1. Event Personalization
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">Couple / Host Names *</label>
                      <input 
                        type="text" 
                        required
                        value={coupleNames}
                        onChange={(e) => setCoupleNames(e.target.value)}
                        placeholder="Sophia & James"
                        className="w-full px-4 py-2.5 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">Target Celebration Date *</label>
                      <input 
                        type="date" 
                        required
                        value={celebrationDate}
                        onChange={(e) => setCelebrationDate(e.target.value)}
                        className="w-full px-4 py-2.5 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-xs"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">Bespoke URL Subdomain *</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-brand-muted text-xs font-sans">
                        https://
                      </span>
                      <input 
                        type="text" 
                        required
                        value={subdomain}
                        onChange={handleSubdomainChange}
                        placeholder="sophia-james"
                        className="flex-1 min-w-0 px-4 py-2.5 bg-brand-surface border border-gray-200 rounded-none focus:outline-none focus:border-brand-secondary text-xs"
                      />
                      <span className="inline-flex items-center px-3 rounded-r-xl border border-l-0 border-gray-200 bg-gray-50 text-brand-secondary font-semibold text-xs font-sans">
                        .einvite.co
                      </span>
                    </div>
                    <span className="text-[10px] text-brand-muted block mt-1">Lowercase letters, numbers, and hyphens only. URL is instantly reserved.</span>
                  </div>
                </div>

                {/* Payment Section (Mock) */}
                <div>
                  <h4 className="font-serif text-lg text-brand-primary mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
                    <CreditCard className="w-4.5 h-4.5 text-brand-secondary" /> 2. Secure Mock Billing
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">Cardholder Name *</label>
                      <input 
                        type="text" 
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Sophia Bennett"
                        className="w-full px-4 py-2.5 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      <div className="sm:col-span-6">
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">Card Number *</label>
                        <input 
                          type="text" 
                          required
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4111 2222 3333 4444"
                          maxLength={19}
                          className="w-full px-4 py-2.5 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-xs"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">Expiry Date *</label>
                        <input 
                          type="text" 
                          required
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-2.5 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-xs text-center"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">Secure CVC *</label>
                        <input 
                          type="password" 
                          required
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ''))}
                          placeholder="•••"
                          maxLength={3}
                          className="w-full px-4 py-2.5 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-xs text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Disclaimer */}
                <p className="text-[10px] text-brand-muted leading-relaxed">
                  By clicking "Complete Subscription Activation", you authorize a mock subscription to EInvite of ₹{displayPrice.toLocaleString('en-IN')}. This is a demonstration sandbox suite and no actual financial charge will occur.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 bg-brand-primary text-white rounded-xl font-sans font-semibold text-xs hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isSubmitting ? 'opacity-70 cursor-wait' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Initializing Bespoke invitation space...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-brand-champagne animate-pulse" />
                      <span>Complete Subscription Activation</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
