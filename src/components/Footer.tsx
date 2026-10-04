import React from 'react';
import { MessageCircle, MapPin, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050609] border-t border-white/10 text-neutral-400 text-xs">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-sports text-3xl font-black text-white shadow-lg border border-red-500/40">
              PX
            </div>
            <div>
              <span className="font-sports text-3xl font-black tracking-wider text-white">
                POWER<span className="text-red-500">X</span> SPORTS
              </span>
              <p className="text-xs text-neutral-400 mt-0.5">
                Custom Footballs & B2B Sports Export • Sialkot, Pakistan
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-sports text-base font-bold uppercase tracking-wider rounded-lg shadow-md transition-all"
            >
              GET A QUOTE
            </button>
            <a
              href="https://wa.me/923230748123?text=Hello%20PowerX%20Sports%20team%2C%20I%20am%20interested%20in%20custom%20footballs."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-sports text-base font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>WHATSAPP US</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Overview */}
          <div className="space-y-3">
            <h4 className="font-sports text-lg font-bold uppercase text-white tracking-wider">
              About PowerX Sports
            </h4>
            <p className="text-neutral-400 leading-relaxed text-xs">
              PowerX Sports is a Sialkot, Pakistan based sports supply and export business focused on footballs and customized sports products for buyers in UAE, Saudi Arabia, Europe and global markets.
            </p>
            <div className="flex items-center gap-2 text-neutral-300 pt-1">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>Sialkot, Punjab, Pakistan</span>
            </div>
          </div>

          {/* Col 2: Products */}
          <div className="space-y-3">
            <h4 className="font-sports text-lg font-bold uppercase text-white tracking-wider">
              Football Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#products" className="hover:text-red-400 transition-colors">
                  Match Grade Footballs
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-red-400 transition-colors">
                  Club & Academy Training Balls
                </a>
              </li>
              <li>
                <a href="#custom-footballs" className="hover:text-red-400 transition-colors">
                  Custom & Bespoke Branded Balls
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-red-400 transition-colors">
                  Promotional & Event Footballs
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-red-400 transition-colors">
                  Sizes 1, 3, 4 and Official Size 5
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Export Destinations */}
          <div className="space-y-3">
            <h4 className="font-sports text-lg font-bold uppercase text-white tracking-wider">
              Target Export Markets
            </h4>
            <ul className="space-y-2">
              <li>United Arab Emirates (Dubai, Abu Dhabi)</li>
              <li>Saudi Arabia (Riyadh, Jeddah, Dammam)</li>
              <li>United Kingdom & Europe</li>
              <li>Germany, Spain & Italy</li>
              <li>North America & Global Sports Retail</li>
            </ul>
          </div>

          {/* Col 4: Contact & WhatsApp */}
          <div className="space-y-3">
            <h4 className="font-sports text-lg font-bold uppercase text-white tracking-wider">
              Export Communications
            </h4>
            <p className="leading-relaxed">
              We respond promptly to commercial inquiries, tech pack reviews, and bulk shipping estimates.
            </p>
            <div className="pt-1 space-y-2">
              <a
                href="https://wa.me/923230748123"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-emerald-400 font-semibold hover:underline"
              >
                WhatsApp: +92 323 0748123
              </a>
              <span className="block text-neutral-400">Location: Sialkot, Pakistan</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Disclaimer & Back to Top */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-neutral-500 text-center sm:text-left">
            © {new Date().getFullYear()} POWERX SPORTS. All Rights Reserved. Sialkot, Pakistan. Professional B2B Sports Supplier & Exporter.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors text-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
