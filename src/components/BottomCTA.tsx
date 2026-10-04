import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface BottomCTAProps {
  onOpenQuoteModal: () => void;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#07080C] via-[#0F111A] to-[#090A0F] border-b border-white/10 relative overflow-hidden">
      {/* Glow elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute inset-0 sports-grid-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          B2B Football Export from Sialkot, Pakistan
        </div>

        <h2 className="font-sports text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase text-white tracking-tight leading-none">
          Looking for Custom Footballs <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white">
            in Bulk?
          </span>
        </h2>

        <p className="text-neutral-300 text-lg sm:text-2xl font-sports uppercase tracking-wider font-semibold max-w-2xl mx-auto">
          Send us your design, quantity and requirements.
        </p>

        <p className="text-neutral-400 text-sm max-w-xl mx-auto">
          Serving international sports brands, clubs, academies, tournament organizers, and wholesale distributors in the UAE, Saudi Arabia, Europe, and worldwide markets.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenQuoteModal}
            className="w-full sm:w-auto px-9 py-4 bg-red-600 hover:bg-red-500 text-white font-sports text-2xl font-black uppercase tracking-wider rounded-lg shadow-xl shadow-red-950/50 border border-red-400 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 group"
          >
            <span>REQUEST A QUOTE</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="https://wa.me/923230748123?text=Hello%20PowerX%20Sports%20team%2C%20I%20am%20looking%20for%20custom%20footballs%20in%20bulk.%20Here%20are%20my%20requirements."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-9 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-sports text-2xl font-black uppercase tracking-wider rounded-lg shadow-xl shadow-emerald-950/50 border border-emerald-400 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
            <span>WHATSAPP US</span>
          </a>
        </div>
      </div>
    </section>
  );
};
