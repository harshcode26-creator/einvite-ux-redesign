import React, { useState } from 'react';
import { Menu, X, LogIn, Sparkles, User, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onStartFree: () => void;
}

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
      <nav id="navbar-shell" className="bg-brand-surface/90 backdrop-blur-md border-b border-gray-200/50 fixed w-full top-0 z-40 transition-all duration-300 h-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex justify-between items-center">
          <div className="flex items-center gap-12">
            <a 
              id="nav-logo" 
              href="#" 
              className="font-serif text-3xl font-medium tracking-tight text-brand-primary hover:opacity-85 transition-opacity"
            >
              EInvite
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8">
              <a href="#" className="text-brand-muted hover:text-brand-primary font-sans font-medium text-[15px] tracking-wide transition-colors">
                Home
              </a>
              <a href="#" className="text-brand-muted hover:text-brand-primary font-sans font-medium text-[15px] tracking-wide transition-colors">
                Features
              </a>
              <a href="#comparison-table" className="text-brand-primary font-bold border-b-2 border-brand-primary pb-1 font-sans text-[15px] tracking-wide transition-colors">
                Pricing
              </a>
              <a href="#" className="text-brand-muted hover:text-brand-primary font-sans font-medium text-[15px] tracking-wide transition-colors">
                About
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 bg-brand-warm py-1.5 px-4 rounded-full border border-brand-gold/20">
                <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-brand-primary hidden sm:inline capitalize">Hi, {userName}</span>
                <button 
                  onClick={() => setIsLoggedIn(false)} 
                  className="text-xs text-brand-muted hover:text-brand-primary underline ml-2 cursor-pointer"
                >
                  Log out
                </button>
              </div>
            ) : (
              <button 
                id="nav-login-btn"
                onClick={() => setShowLoginModal(true)}
                className="px-5 py-2 text-brand-muted hover:text-brand-primary font-sans font-semibold text-[15px] transition-colors cursor-pointer"
              >
                Log In
              </button>
            )}
            
            <button 
              id="nav-start-free-btn"
              onClick={onStartFree}
              className="px-6 py-2.5 bg-brand-primary text-white rounded-xl font-sans font-semibold text-[15px] hover:bg-brand-primary/90 transition-all duration-200 luxury-shadow-l1 active:scale-95 cursor-pointer"
            >
              Start Free
            </button>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 text-brand-primary"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-brand-surface border-b border-gray-200/50 shadow-lg px-6 py-6 flex flex-col gap-4 z-40">
            <a href="#" onClick={() => setIsOpen(false)} className="text-brand-muted hover:text-brand-primary font-sans font-medium py-2">
              Home
            </a>
            <a href="#" onClick={() => setIsOpen(false)} className="text-brand-muted hover:text-brand-primary font-sans font-medium py-2">
              Features
            </a>
            <a href="#comparison-table" onClick={() => setIsOpen(false)} className="text-brand-primary font-bold py-2">
              Pricing
            </a>
            <a href="#" onClick={() => setIsOpen(false)} className="text-brand-muted hover:text-brand-primary font-sans font-medium py-2">
              About
            </a>
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
