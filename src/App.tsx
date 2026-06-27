import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BillingToggle from './components/BillingToggle';
import PlanCard from './components/PlanCard';
import ComparisonTable from './components/ComparisonTable';
import ContactModal from './components/ContactModal';
import BookingModal from './components/BookingModal';
import SubscriptionModal from './components/SubscriptionModal';
import Footer from './components/Footer';
import { BillingCycle, PlanInfo } from './types';
import { 
  Building2, 
  Clock, 
  ArrowDown, 
  Headset,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PLANS_DATA: PlanInfo[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Simple basics',
    category: 'Getting Started',
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      'Two Event Creation',
      '24-Hour Access To Event'
    ],
    allFeaturesCount: '2 Features',
    buttonText: 'Signup & Subscribe',
    isPopular: false,
    badge: 'Getting Started',
    highlightedFeaturesCount: 2
  },
  {
    id: 'interactive',
    name: 'Interactive',
    tagline: 'Engagement first',
    category: 'Most Popular Features',
    price: {
      monthly: 2100,
      yearly: 1000,
      monthlyOriginal: 4200,
      yearlyOriginal: 2100
    },
    features: [
      'Creation upto 5 invitations',
      '1 year validity',
      'Video Support',
      'Love Story QR',
      '+4 More Features'
    ],
    allFeaturesCount: '8 Features',
    buttonText: 'Signup & Subscribe',
    isPopular: false,
    badge: 'Most Popular Features',
    highlightedFeaturesCount: 5
  },
  {
    id: 'personal',
    name: 'Personal Touch',
    tagline: 'Detailed elegance',
    category: 'Recommended',
    price: {
      monthly: 3100,
      yearly: 1500,
      monthlyOriginal: 6200,
      yearlyOriginal: 3100
    },
    features: [
      'Guest Name Invitation',
      'RSVP',
      'Personalized Guest Note',
      'Selective Program Sharing',
      '+4 More Features'
    ],
    allFeaturesCount: '8+ Features',
    buttonText: 'Signup & Subscribe',
    isPopular: true,
    isRecommended: true,
    badge: 'Recommended',
    highlightedFeaturesCount: 5
  },
  {
    id: 'outstanding',
    name: 'Outstanding',
    tagline: 'Concierge tier',
    category: 'Premium Experience',
    price: {
      monthly: 5100,
      yearly: 3500,
      monthlyOriginal: 10200,
      yearlyOriginal: 5100
    },
    features: [
      'Custom Domain',
      'Dedicated Digital Address',
      'Dedicated Support Person',
      '300 Custom URL Sharing',
      '+4 More Features'
    ],
    allFeaturesCount: 'Premium Package',
    buttonText: 'Signup & Subscribe',
    isPopular: false,
    isOutstanding: true,
    badge: 'Premium Experience',
    highlightedFeaturesCount: 5
  }
];

export default function App() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<PlanInfo | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleSelectPlan = (planId: string) => {
    const plan = PLANS_DATA.find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const handleStartFree = () => {
    const freePlan = PLANS_DATA.find(p => p.id === 'free');
    if (freePlan) {
      setSelectedPlan(freePlan);
    }
  };

  return (
    <div className="bg-brand-surface min-h-screen font-sans text-brand-primary overflow-x-hidden antialiased">
      
      {/* Header / Navbar */}
      <Navbar onStartFree={handleStartFree} />

      {/* Main Content (Offset for fixed nav) */}
      <main className="pt-20">
        
        {/* Two-Column Premium Hero Section */}
        <section className="bg-white py-20 md:py-28 border-b border-gray-100/50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Heading and info card */}
              <div className="lg:col-span-7 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-primary leading-[1.1] tracking-tight">
                    Customized Pricing Plans For Your Events
                  </h1>
                  <p className="font-sans text-brand-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                    Choose the perfect invitation experience for your celebration. From intimate gatherings to large-scale events, EInvite offers flexible plans tailored to your needs.
                  </p>
                </motion.div>

                {/* Hosting guests Info Box */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-start gap-4 p-5 bg-brand-surface rounded-2xl border border-gray-200/40 max-w-xl"
                >
                  <Building2 className="w-6 h-6 text-brand-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-xs sm:text-sm text-brand-primary leading-relaxed">
                      <span className="font-bold">Hosting more than 10,000 guests?</span> Contact our team for custom enterprise pricing and dedicated event solutions.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Subscriber Exclusive Widget */}
              <div className="lg:col-span-5 relative">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white p-8 md:p-10 rounded-[24px] luxury-shadow-l2 border border-gray-100 relative z-10"
                >
                  <div className="mb-8">
                    <span className="font-sans font-bold text-xs uppercase tracking-widest text-brand-secondary block mb-2">
                      Exclusive Access
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-brand-primary leading-snug">
                      2026 Discount Offer For Our Beloved Subscribers
                    </h3>

                    {/* Flash Sales Badges */}
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <div className="px-3.5 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold flex items-center gap-1 border border-red-200/50">
                        <Clock className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        50% OFF Until 1st June
                      </div>
                      <div className="px-3.5 py-1 bg-brand-warm text-brand-secondary rounded-full text-[10px] font-bold uppercase tracking-wider border border-brand-champagne">
                        Save Extra
                      </div>
                    </div>
                  </div>

                  {/* Pricing Switcher Removed, leaving Support Info with Divider */}
                  <div className="pt-6 border-t border-gray-100">
                    {/* Support Card Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center">
                          <Headset className="w-4 h-4 text-brand-champagne" />
                        </div>
                        <span className="font-sans font-semibold text-xs text-brand-primary">
                          Support from EInvite Team
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Absolute visual layered board card effect */}
                <div className="absolute -z-10 -top-4 -right-4 w-full h-full border border-brand-gold/20 rounded-[24px] pointer-events-none"></div>
              </div>

            </div>
          </div>
        </section>

        {/* Pricing Matrix Section */}
        <section className="bg-brand-surface py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            {/* Centered Billing Toggle */}
            <div className="flex flex-col items-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-3">
                Select Billing Period
              </span>
              <BillingToggle cycle={billingCycle} onChange={setBillingCycle} />
            </div>

            {/* Grid Layout of 4 Plans */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PLANS_DATA.map((plan) => (
                <PlanCard 
                  key={plan.id}
                  plan={plan}
                  cycle={billingCycle}
                  onSubscribe={(p) => setSelectedPlan(p)}
                />
              ))}
            </div>

            {/* Jump to comparison action links */}
            <div className="mt-16 text-center">
              <a 
                href="#comparison-table" 
                className="inline-flex items-center gap-2 text-brand-secondary font-sans font-semibold hover:opacity-80 transition-opacity"
              >
                View Full Feature Comparison <ArrowDown className="w-4 h-4 text-brand-secondary animate-bounce" />
              </a>
            </div>

          </div>
        </section>

        {/* Detailed Side-by-Side Comparison Section */}
        <ComparisonTable 
          plans={PLANS_DATA}
          onSelectPlan={handleSelectPlan}
        />

        {/* Customized Booking/Celebration CTA Box */}
        <section className="bg-white py-20 border-t border-gray-100/50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl mx-auto bg-brand-warm p-10 md:p-12 rounded-3xl border border-brand-champagne/30 text-center relative luxury-shadow-l2 overflow-hidden">
              
              {/* Soft prestige watermark */}
              <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-brand-gold/10 blur-xl pointer-events-none"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-brand-gold text-brand-primary rounded-full text-[10px] font-bold uppercase tracking-widest border border-brand-gold/30">
                  <Building2 className="w-3.5 h-3.5 text-brand-primary" /> Need a Custom Solution?
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl text-brand-primary">
                  Planning a Large Celebration?
                </h3>
                
                <p className="font-sans text-brand-muted text-sm leading-relaxed max-w-xl mx-auto">
                  Hosting more than 10,000 guests or need a custom invitation experience? Talk with our team for personalized pricing, dedicated support, and enterprise event management solutions.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-brand-primary text-white rounded-xl font-sans font-semibold text-sm hover:opacity-95 transition-all duration-200 shadow-md active:scale-98 cursor-pointer"
                  >
                    Contact Sales
                  </button>
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white text-brand-primary border border-gray-300 rounded-xl font-sans font-semibold text-sm hover:bg-brand-surface transition-all duration-200 active:scale-98 cursor-pointer"
                  >
                    Schedule a Call
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Overlay Dialogs / Modals with active backdrop filters */}
      <AnimatePresence>
        
        {/* Contact/Enterprise Calculator Modal */}
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <ContactModal onClose={() => setShowContactModal(false)} />
          </motion.div>
        )}

        {/* Schedule Call / Calendar Booking Modal */}
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <BookingModal onClose={() => setShowBookingModal(false)} />
          </motion.div>
        )}

        {/* Checkout subscription plan modal */}
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <SubscriptionModal 
              plan={selectedPlan} 
              cycle={billingCycle} 
              onClose={() => setSelectedPlan(null)} 
            />
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
