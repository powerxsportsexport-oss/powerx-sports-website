import React from 'react';
import { MessageCircle, ArrowRight, MapPin, Sparkles, Layers, ShieldCheck, Globe, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenQuoteModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const trustFeatures = [
    { title: 'Custom Designs', subtitle: 'Bespoke colors & graphics', icon: Sparkles },
    { title: 'Custom Branding', subtitle: 'Your club logo & emblems', icon: ShieldCheck },
    { title: 'Multiple Sizes', subtitle: 'Size 1, 3, 4 & Official 5', icon: Layers },
    { title: 'Wholesale & Bulk Orders', subtitle: 'Sample batches to containers', icon: CheckCircle2 },
    { title: 'International Supply', subtitle: 'Direct export worldwide', icon: Globe },
  ];

  return (
    <section id="home" className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-white/10">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-red-600/15 rounded-full blur-[140px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-800/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 sports-grid-pattern opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Location & Sialkot Badge */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            Supplying Clubs, Brands & Wholesale Distributors
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>Sialkot, Pakistan | Serving International Buyers</span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <h1 className="font-sports text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase text-white leading-[0.92] tracking-tight">
              Custom Footballs <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white">
                for Global Buyers
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-300 tracking-wide font-sports uppercase">
              Wholesale • Custom Designs • Custom Branding • Bulk Orders
            </p>

            <p className="text-neutral-300 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
              PowerX Sports is a Sialkot, Pakistan based sports supply and export business focused on footballs and customized sports products. We serve wholesale and bulk buyers from the UAE, Saudi Arabia, Europe and global sports markets with custom designs, tailored branding and dependable supply.
            </p>

            {/* Prominent Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-sports text-2xl font-black uppercase tracking-wider rounded-lg shadow-xl shadow-red-900/40 border border-red-400 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 group"
              >
                <span>GET A QUOTE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/923230748123?text=Hello%20PowerX%20Sports%20team%2C%20I%20am%20looking%20for%20a%20custom%20football%20quotation%20and%20bulk%20order%20pricing."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-sports text-2xl font-black uppercase tracking-wider rounded-lg shadow-xl shadow-emerald-950/40 border border-emerald-400 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
                <span>WHATSAPP US</span>
              </a>
            </div>

            {/* Quick Sialkot Location Assurance */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-neutral-400 font-medium">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Official WhatsApp: <strong className="text-white">+92 323 0748123</strong>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                Sialkot Sports Export Center
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500"></span>
                Exporting to UAE, KSA, EU & Worldwide
              </span>
            </div>
          </div>

          {/* Right Column: Hero Football Display */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Radial Glow Backing */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 to-white/10 rounded-full blur-2xl transform scale-90"></div>

              {/* Geometric Frame / Backdrop */}
              <div className="relative rounded-2xl bg-gradient-to-b from-white/10 via-neutral-900/60 to-black/80 p-3 sm:p-5 border border-white/15 shadow-2xl backdrop-blur-sm">
                {/* Floating Tag */}
                <div className="absolute -top-3 right-6 bg-red-600 text-white text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-sm shadow-lg border border-red-400">
                  Featured PowerX Ball
                </div>

                {/* Hero Football Image */}
                <div className="relative rounded-xl overflow-hidden aspect-square bg-[#050608] flex items-center justify-center group">
                  <img
                    src="/src/assets/images/hero_football_1791086118631.jpg"
                    alt="PowerX Sports Premium Competition Football with Red, Black and White Panels"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>

                  {/* Corner Brand Stamp */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs backdrop-blur-md bg-black/60 p-3 rounded-lg border border-white/10">
                    <div>
                      <div className="font-sports text-lg font-black uppercase text-white leading-none">
                        PowerX Match Series
                      </div>
                      <div className="text-[11px] text-neutral-300 font-medium">
                        Custom Graphic & Panel Layout
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-red-600/90 text-white font-sports text-sm font-bold uppercase rounded">
                      Size 5 Pro
                    </span>
                  </div>
                </div>

                {/* Sub-badge strip */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white/5 py-2 px-1 rounded border border-white/5">
                    <span className="block text-[10px] uppercase text-neutral-400">Panels</span>
                    <strong className="text-white text-xs">Geometric Fit</strong>
                  </div>
                  <div className="bg-white/5 py-2 px-1 rounded border border-white/5">
                    <span className="block text-[10px] uppercase text-neutral-400">Branding</span>
                    <strong className="text-white text-xs">100% Custom</strong>
                  </div>
                  <div className="bg-white/5 py-2 px-1 rounded border border-white/5">
                    <span className="block text-[10px] uppercase text-neutral-400">Origin</span>
                    <strong className="text-red-400 text-xs">Sialkot Hub</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust / Features Section Bar */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {trustFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="bg-neutral-900/60 hover:bg-neutral-900 border border-white/10 hover:border-red-500/40 p-4 rounded-xl transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center mb-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-sports text-lg font-bold uppercase text-white leading-tight">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    {feat.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
