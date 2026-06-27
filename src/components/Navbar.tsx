import React, { useState } from 'react';
import { Menu, X, LogIn, Sparkles } from 'lucide-react';

interface NavbarProps {
  onStartFree: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'Create', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Pricing', href: '#comparison-table', active: true },
  { label: 'Articles', href: '#' },
  { label: 'Feedback', href: '#' }
];

export default function Navbar({ onStartFree }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setUserName(email.split('@')[0]);
      setIsLoggedIn(true);
      setShowLoginModal(false);
    }
  };

  return (
    <>
      <nav id="navbar-shell" className="bg-white border-b border-gray-100 fixed w-full top-0 z-40 transition-all duration-300 h-16 md:h-20 shadow-none">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 h-full flex items-center justify-between md:grid md:grid-cols-[150px_1fr_150px] lg:grid-cols-[220px_1fr_220px]">
          
          {/* Logo Aligned Left */}
          <div className="flex items-center justify-start">
            <a 
              id="nav-logo" 
              href="#" 
              className="font-script text-[36px] md:text-[30px] lg:text-[40px] font-normal text-brand-primary hover:opacity-85 transition-opacity leading-none select-none pt-1"
            >
              EInvite
            </a>
          </div>
          
          {/* Navigation Centered */}
          <div className="hidden md:flex items-center justify-center gap-3 lg:gap-8">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className={item.active 
                  ? "text-brand-primary font-bold border-b-2 border-brand-primary pb-1 font-sans text-[13px] lg:text-[14px] tracking-wide transition-colors whitespace-nowrap"
                  : "text-brand-muted hover:text-brand-primary font-sans font-medium text-[13px] lg:text-[14px] tracking-wide transition-colors whitespace-nowrap"
                }
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Authentication & controls Aligned Right */}
          <div className="flex items-center justify-end gap-2 md:gap-3">
            {!isLoggedIn ? (
              <div className="hidden sm:flex items-center gap-2 lg:gap-3">
                <button 
                  id="nav-login-btn"
                  onClick={() => setShowLoginModal(true)}
                  className="px-3.5 lg:px-5 py-1.5 lg:py-2 text-brand-primary border border-brand-primary/20 hover:border-brand-primary rounded-full font-sans font-medium text-[13px] lg:text-[14px] transition-all cursor-pointer hover:bg-brand-surface whitespace-nowrap"
                >
                  Log in
                </button>
                <button 
                  id="nav-signup-btn"
                  onClick={onStartFree}
                  className="px-3.5 lg:px-5 py-1.5 lg:py-2 bg-brand-primary text-white border border-transparent rounded-full font-sans font-medium text-[13px] lg:text-[14px] transition-all cursor-pointer hover:bg-brand-primary/90 whitespace-nowrap"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 lg:gap-3 bg-brand-warm py-1 lg:py-1.5 px-3 lg:px-4 rounded-full border border-brand-gold/20">
                <div className="w-5.5 h-5.5 lg:w-6 lg:h-6 rounded-full bg-brand-primary text-white flex items-center justify-center text-[11px] lg:text-xs font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs lg:text-sm font-medium text-brand-primary hidden sm:inline capitalize">Hi, {userName}</span>
                <button 
                  onClick={() => setIsLoggedIn(false)} 
                  className="text-[10px] lg:text-xs text-brand-muted hover:text-brand-primary underline ml-1.5 lg:ml-2 cursor-pointer"
                >
                  Log out
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 text-brand-primary hover:bg-brand-surface rounded-full transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg px-6 py-6 flex flex-col gap-4 z-40">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                onClick={() => setIsOpen(false)} 
                className={item.active 
                  ? "text-brand-primary font-bold py-2 border-l-2 border-brand-primary pl-3 font-sans text-[15px]"
                  : "text-brand-muted hover:text-brand-primary py-2 pl-3 font-sans text-[15px]"
                }
              >
                {item.label}
              </a>
            ))}
            
            {!isLoggedIn && (
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => { setIsOpen(false); setShowLoginModal(true); }}
                  className="w-full py-2.5 text-center text-brand-primary border border-brand-primary/20 rounded-full font-sans font-medium text-[14px]"
                >
                  Log in
                </button>
                <button 
                  onClick={() => { setIsOpen(false); onStartFree(); }}
                  className="w-full py-2.5 text-center bg-brand-primary text-white rounded-full font-sans font-medium text-[14px]"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-brand-primary/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full luxury-shadow-l2 border border-gray-200 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowLoginModal(false)} 
              className="absolute top-4 right-4 text-brand-muted hover:text-brand-primary cursor-pointer p-1 rounded-full hover:bg-brand-surface"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-warm rounded-full text-xs font-bold text-brand-secondary border border-brand-champagne uppercase tracking-widest mb-2">
                <Sparkles className="w-3 h-3 text-brand-secondary" /> Editorial Access
              </span>
              <h3 className="font-serif text-2xl text-brand-primary">Welcome to EInvite</h3>
              <p className="text-sm text-brand-muted mt-1">Access your bespoke invitation suite</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@celebration.com"
                  className="w-full px-4 py-3 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-sm font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-primary mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-brand-surface border border-gray-200 rounded-xl focus:outline-none focus:border-brand-secondary text-sm font-sans"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-brand-muted">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-brand-secondary focus:ring-brand-secondary" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="hover:underline">Forgot password?</a>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-brand-primary text-white rounded-xl font-sans font-semibold text-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" /> Sign In Securely
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-brand-muted">
              Don't have an account?{' '}
              <button 
                onClick={() => { setShowLoginModal(false); onStartFree(); }} 
                className="text-brand-secondary font-semibold hover:underline"
              >
                Start free here
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
