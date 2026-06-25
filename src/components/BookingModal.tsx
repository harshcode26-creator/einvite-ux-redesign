import React, { useState } from 'react';
import { X, CalendarDays, Clock, PhoneCall, Sparkles, CheckCircle2, MapPin } from 'lucide-react';

interface BookingModalProps {
  onClose: () => void;
}

const AVAILABLE_DAYS = [
  { label: 'Thu, June 25', dateStr: '2026-06-25' },
  { label: 'Fri, June 26', dateStr: '2026-06-26' },
  { label: 'Mon, June 29', dateStr: '2026-06-29' },
  { label: 'Tue, June 30', dateStr: '2026-06-30' },
  { label: 'Wed, July 01', dateStr: '2026-07-01' },
];

const TIME_SLOTS = [
  { time: '10:00 AM', label: 'Morning Slot (EInvite Office)', available: true },
  { time: '11:30 AM', label: 'Morning Slot (Google Meet)', available: true },
  { time: '02:00 PM', label: 'Afternoon Slot (Google Meet)', available: false },
  { time: '03:30 PM', label: 'Afternoon Slot (Google Meet)', available: true },
  { time: '05:00 PM', label: 'Evening Slot (EInvite Office)', available: true },
];

export default function BookingModal({ onClose }: BookingModalProps) {
  const [selectedDay, setSelectedDay] = useState(AVAILABLE_DAYS[0]);
  const [selectedTime, setSelectedTime] = useState<string>('11:30 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [callType, setCallType] = useState<'video' | 'phone'>('video');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && phone) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-brand-primary/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full luxury-shadow-l2 border border-gray-200 overflow-hidden relative my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-muted hover:text-brand-primary cursor-pointer p-1.5 rounded-full hover:bg-brand-surface z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-10 text-center flex flex-col items-center justify-center min-h-[450px]">
            <div className="w-16 h-16 bg-brand-warm text-brand-secondary rounded-full flex items-center justify-center mb-6 border border-brand-champagne">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="font-sans font-bold text-xs uppercase tracking-widest text-brand-secondary bg-brand-warm px-4 py-1.5 rounded-full border border-brand-champagne mb-4">
              Consultation Scheduled
            </span>
            <h3 className="font-serif text-3xl text-brand-primary mb-3">Your celebration call is booked!</h3>
            <p className="text-brand-muted text-sm max-w-md leading-relaxed mb-8">
              Congratulations, <span className="font-semibold text-brand-primary">{name}</span>. An invitation with the {callType === 'video' ? 'Google Meet link' : 'direct call credentials'} has been dispatched to your email <span className="font-semibold text-brand-primary">{email}</span>.
            </p>

            {/* Calendar Card Visualizer */}
            <div className="bg-brand-surface p-6 rounded-2xl border border-gray-200/50 text-left max-w-md w-full relative">
              <div className="absolute top-3 right-3 text-[10px] bg-brand-champagne/40 text-brand-secondary px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                Added
              </div>
              <h4 className="font-serif text-base text-brand-primary mb-4 flex items-center gap-2">
                <CalendarDays className="w-4.5 h-4.5 text-brand-secondary" /> Consultation Card
              </h4>
              <div className="space-y-3 text-xs text-brand-muted">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-muted" />
                  <span>{selectedDay.label} at <span className="font-semibold text-brand-primary">{selectedTime}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-brand-muted" />
                  <span className="capitalize">{callType === 'video' ? 'Google Meet Video Call' : 'Direct Phone Call'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-muted" />
                  <span>Interactive EInvite VIP Suite</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-8 px-8 py-3 bg-brand-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Return to Pricing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Left Info Panel */}
            <div className="md:col-span-5 bg-brand-warm/60 p-8 border-r border-gray-100 flex flex-col justify-between">
              <div>
                <span className="font-sans font-bold text-xs uppercase tracking-wider text-brand-secondary block mb-1">Bespoke Guidance</span>
                <h3 className="font-serif text-2xl text-brand-primary mb-4">Celebration Strategy Session</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs shrink-0 font-serif">1</div>
                    <div>
                      <span className="text-xs font-bold text-brand-primary block">Select Your Slot</span>
                      <span className="text-[11px] text-brand-muted">Pick a time to meet our high-society events consultant.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs shrink-0 font-serif">2</div>
                    <div>
                      <span className="text-xs font-bold text-brand-primary block">Personalized Setup</span>
                      <span className="text-[11px] text-brand-muted">Describe guest metrics, design layout expectations and themes.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs shrink-0 font-serif">3</div>
                    <div>
                      <span className="text-xs font-bold text-brand-primary block">One-Click Customization</span>
                      <span className="text-[11px] text-brand-muted">Review curated samples during the call and claim customized VIP rates.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-200 flex items-center gap-2 text-xs text-brand-secondary font-semibold">
                <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" /> 100% Free Consultation Suite
              </div>
            </div>

            {/* Right Interactive Scheduler */}
            <div className="md:col-span-7 p-8 flex flex-col justify-between">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Day selector */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">1. Choose Date</span>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    {AVAILABLE_DAYS.map((day, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                          selectedDay.dateStr === day.dateStr
                            ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                            : 'bg-brand-surface border-gray-200 text-brand-primary hover:border-brand-primary'
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slot Selector */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">2. Choose Time Slot</span>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map((slot, idx) => (
                      <button
                        key={idx}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex flex-col justify-between h-14 cursor-pointer ${
                          !slot.available
                            ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                            : selectedTime === slot.time
                            ? 'bg-brand-warm border-brand-gold/60 text-brand-secondary ring-1 ring-brand-gold'
                            : 'bg-white border-gray-200 text-brand-primary hover:border-brand-primary'
                        }`}
                      >
                        <span>{slot.time}</span>
                        <span className={`text-[9px] font-normal ${
                          !slot.available ? 'text-gray-300' : selectedTime === slot.time ? 'text-brand-secondary' : 'text-brand-muted'
                        }`}>{slot.available ? slot.label : 'Booked'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Call Type Toggle */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">3. Select Medium</span>
                  <div className="flex gap-4">
                    <label className="flex-1 flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-brand-surface cursor-pointer hover:border-brand-gold/30">
                      <div className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name="callType" 
                          checked={callType === 'video'}
                          onChange={() => setCallType('video')}
                          className="text-brand-secondary focus:ring-brand-secondary"
                        />
                        <span className="text-xs font-bold text-brand-primary">Google Meet</span>
                      </div>
                    </label>
                    <label className="flex-1 flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-brand-surface cursor-pointer hover:border-brand-gold/30">
                      <div className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name="callType" 
                          checked={callType === 'phone'}
                          onChange={() => setCallType('phone')}
                          className="text-brand-secondary focus:ring-brand-secondary"
                        />
                        <span className="text-xs font-bold text-brand-primary">Direct Phone</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Contact Inputs */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <span className="block text-xs font-bold uppercase tracking-wider text-brand-muted">4. Contact Information</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Diana Prince"
                      className="w-full px-3 py-2.5 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-xs"
                    />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="diana@google.com"
                      className="w-full px-3 py-2.5 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-xs"
                    />
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2.5 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-primary text-white rounded-xl font-sans font-semibold text-xs hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <CalendarDays className="w-4 h-4 text-brand-champagne" /> Confirm Strategy Consultation Call
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
