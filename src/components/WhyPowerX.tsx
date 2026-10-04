import React from 'react';
import { MapPin, Palette, PackageCheck, Globe2, MessageCircle, ArrowRight } from 'lucide-react';
import { WHY_POWERX_POINTS } from '../data/sportsData';

interface WhyPowerXProps {
  onOpenQuoteModal: () => void;
}

export const WhyPowerX: React.FC<WhyPowerXProps> = ({ onOpenQuoteModal }) => {
  const iconMap: Record<string, React.ElementType> = {
    MapPin,
    Palette,
    PackageCheck,
    Globe2,
    MessageCircle,
  };

  return (
    <section className="py-24 bg-[#07080C] relative border-b border-white/10 overflow-hidden">
      {/* Background accents */}
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and Context (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
              Supplier & Export Advantages
            </div>

            <h2 className="font-sports text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[0.95]">
              Why PowerX <span className="text-red-500">Sports</span>
            </h2>

            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
              We position our export operations to bridge international sports clubs, academies, tournament directors, and wholesale buyers with the craftsmanship of Sialkot, Pakistan.
            </p>

            <div className="p-5 rounded-xl bg-[#0D0F16] border border-white/10 space-y-3">
              <div className="font-sports text-xl font-bold uppercase text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>Our Business Commitment</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                As a professional sports supply and export partner, PowerX Sports prioritizes transparent communication, realistic sample confirmation, and reliable batch deliveries without bureaucratic delays.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white font-sports text-xl font-black uppercase tracking-wider rounded-lg shadow-lg border border-red-400 flex items-center justify-center gap-2"
              >
                <span>Request B2B Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 5 Core Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {WHY_POWERX_POINTS.map((item, idx) => {
              const Icon = iconMap[item.icon] || MapPin;
              return (
                <div
                  key={item.id}
                  className="bg-[#0D0F16] hover:bg-[#12141F] border border-white/10 hover:border-red-500/40 p-5 sm:p-6 rounded-2xl transition-all duration-300 flex items-start gap-4 sm:gap-5 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-600/10 text-red-500 border border-red-500/20 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-sports text-xs font-bold text-red-400 uppercase tracking-widest">
                        0{idx + 1}
                      </span>
                      <h3 className="font-sports text-2xl font-black uppercase text-white group-hover:text-red-400 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
