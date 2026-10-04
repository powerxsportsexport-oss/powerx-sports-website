import React, { useState } from 'react';
import { MessageCircle, Menu, X, HardDrive, UserCheck, Shield } from 'lucide-react';
import { User } from 'firebase/auth';

interface NavbarProps {
  onOpenQuoteModal: (product?: string) => void;
  onOpenDriveModal: () => void;
  currentUser: User | null;
  onGoogleSignIn: () => void;
  onLogout: () => void;
  isLoggingIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuoteModal,
  onOpenDriveModal,
  currentUser,
  onGoogleSignIn,
  onLogout,
  isLoggingIn,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'Custom Footballs', href: '#custom-footballs' },
    { name: 'Wholesale & Bulk', href: '#wholesale' },
    { name: 'About Us', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090A0F]/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-sports text-2xl font-black tracking-wider text-white shadow-lg shadow-red-900/40 border border-red-500/40 group-hover:scale-105 transition-transform">
              PX
            </div>
            <div className="flex flex-col">
              <span className="font-sports text-2xl sm:text-3xl font-black tracking-wider text-white leading-none">
                POWER<span className="text-red-500">X</span> <span className="text-neutral-300 font-bold">SPORTS</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                Sialkot • B2B Football Export
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold tracking-wide text-neutral-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Google Drive Status / Sign-in */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenDriveModal}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/15 rounded-md transition-colors"
                  title="View Saved Quote Documents in Google Drive"
                >
                  <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                  <span>My Drive Specs</span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-xs text-neutral-400 hover:text-red-400 transition-colors px-2 py-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onGoogleSignIn}
                disabled={isLoggingIn}
                className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 rounded-md text-xs font-medium transition-all"
                title="Connect Google Drive to save and sync quote specs"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.97 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>{isLoggingIn ? 'Connecting...' : 'Connect Drive'}</span>
              </button>
            )}

            {/* Quick WhatsApp Link */}
            <a
              href="https://wa.me/923230748123?text=Hello%20PowerX%20Sports%20team%2C%20I%20am%20interested%20in%20custom%20footballs%20and%20bulk%20supply.%20Please%20share%20your%20quotation%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>WHATSAPP US</span>
            </a>

            {/* Get Quote CTA */}
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-4 py-2 text-xs uppercase tracking-wider font-extrabold text-white bg-red-600 hover:bg-red-500 rounded-md shadow-lg shadow-red-900/40 border border-red-500 transition-all hover:scale-[1.02]"
            >
              GET A QUOTE
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-3 py-1.5 text-xs uppercase tracking-wider font-bold text-white bg-red-600 hover:bg-red-500 rounded-md"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white rounded-md hover:bg-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#090A0F] px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-base font-semibold text-neutral-200 hover:text-white hover:bg-white/5 rounded-md"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            {currentUser ? (
              <div className="flex items-center justify-between bg-neutral-900 p-3 rounded-lg border border-neutral-800">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-neutral-200 truncate max-w-[150px]">{currentUser.email}</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDriveModal();
                  }}
                  className="text-xs font-semibold text-red-400 underline"
                >
                  Drive Specs
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGoogleSignIn();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-neutral-900 text-neutral-200 border border-neutral-700 rounded-md text-sm font-medium"
              >
                <HardDrive className="w-4 h-4 text-blue-400" />
                <span>Connect Google Drive</span>
              </button>
            )}

            <a
              href="https://wa.me/923230748123?text=Hello%20PowerX%20Sports%20team%2C%20I%20am%20interested%20in%20custom%20footballs%20and%20bulk%20supply."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-sm font-bold uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>WhatsApp: +92 323 0748123</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
