import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200/50 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 pb-12 border-b border-gray-100">
          
          {/* Logo & description */}
          <div className="max-w-xs space-y-4">
            <a href="#" className="font-serif text-2xl font-medium tracking-tight text-brand-primary">
              EInvite
            </a>
            <p className="font-sans text-xs text-brand-muted leading-relaxed">
              Redefining the digital planning experience with editorial excellence and modern software precision.
            </p>
          </div>

          {/* Links structure */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 w-full md:w-auto">
            
            {/* Product */}
            <div className="space-y-4">
              <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-brand-primary">
                Product
              </h5>
              <ul className="space-y-2.5">
                <li><a href="#" className="font-sans text-xs text-brand-muted hover:text-brand-primary transition-colors">Features</a></li>
                <li><a href="#comparison-table" className="font-sans text-xs text-brand-muted hover:text-brand-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="font-sans text-xs text-brand-muted hover:text-brand-primary transition-colors">Templates</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-brand-primary">
                Company
              </h5>
              <ul className="space-y-2.5">
                <li><a href="#" className="font-sans text-xs text-brand-muted hover:text-brand-primary transition-colors">About Us</a></li>
                <li><a href="#" className="font-sans text-xs text-brand-muted hover:text-brand-primary transition-colors">Careers</a></li>
                <li><a href="#" className="font-sans text-xs text-brand-muted hover:text-brand-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-brand-primary">
                Legal
              </h5>
              <ul className="space-y-2.5">
                <li><a href="#" className="font-sans text-xs text-brand-muted hover:text-brand-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="font-sans text-xs text-brand-muted hover:text-brand-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="font-sans text-xs text-brand-muted hover:text-brand-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-brand-muted">
            © 2026 EInvite. Editorial Excellence in Digital Planning.
          </p>
          <p className="font-sans text-[10px] text-gray-400 flex items-center gap-1.5">
            Bespoke software crafted with <Heart className="w-3 h-3 fill-red-400/50 text-red-400" /> for luxury memories
          </p>
        </div>

      </div>
    </footer>
  );
}
