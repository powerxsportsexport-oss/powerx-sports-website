import React from 'react';
import { MapPin, Globe, ShieldCheck, MessageCircle, ArrowRight, Award, Compass, Truck } from 'lucide-react';
import { TRUST_STATS } from '../data/sportsData';

interface AboutSectionProps {
  onOpenQuoteModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="about" className="py-24 bg-[#07080C] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0D0F16] p-2 shadow-2xl">
              <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
                <img
                  src="/src/assets/images/football_details_1791086186139.jpg"
                  alt="PowerX Sports Ball Craftsmanship in Sialkot, Pakistan"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                {/* Sialkot Stamp Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-red-500 tracking-wider">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span>Sialkot, Punjab, Pakistan</span>
                  </div>
                  <h4 className="font-sports text-2xl font-black uppercase text-white leading-tight">
                    The Global Capital of Football Craft
                  </h4>
                  <p className="text-[11px] text-neutral-300">
                    Supplying international sports markets with custom-crafted balls through specialized export coordination.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Mini Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-red-600 to-red-800 text-white p-3.5 rounded-xl border border-red-400 shadow-xl hidden sm:flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-white" />
              <div className="text-left">
                <span className="block font-sports text-lg font-black leading-none uppercase">B2B Verified</span>
                <span className="text-[10px] uppercase font-semibold text-neutral-200">Export Supplier</span>
              </div>
            </div>
          </div>

          {/* Right Column: About Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
              About PowerX Sports
            </div>

            <h2 className="font-sports text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[0.95]">
              Sports Supply & Export <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">
                from Sialkot to Global Markets
              </span>
            </h2>

            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-semibold">
              PowerX Sports is a Sialkot, Pakistan based sports supply and export business focused on footballs and customized sports products.
            </p>

            <div className="space-y-4 text-sm text-neutral-400 leading-relaxed">
              <p>
                We work closely with international clubs, tournament organizers, sports brands, and bulk distributors across the UAE, Saudi Arabia, Europe, and worldwide markets to supply tailored football products built to exact branding requirements.
              </p>
              <p>
                From bespoke club colorways and custom sponsor logos to age-graded balls (Sizes 1, 3, 4, and 5) and commercial wholesale volumes, we coordinate the entire order cycle with direct communication and dependable export documentation.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {TRUST_STATS.map((stat, i) => (
                <div key={i} className="bg-[#0D0F16] border border-white/10 p-3 rounded-xl">
                  <span className="text-[10px] font-bold uppercase text-neutral-400 block tracking-wider">
                    {stat.label}
                  </span>
                  <strong className="font-sports text-xl font-bold uppercase text-white block mt-0.5">
                    {stat.value}
                  </strong>
                  <span className="text-[10px] text-red-400 block mt-0.5">
                    {stat.note}
                  </span>
                </div>
              ))}
            </div>

            {/* Direct Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/10">
              <button
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white font-sports text-xl font-bold uppercase tracking-wider rounded-lg shadow-lg border border-red-500 flex items-center justify-center gap-2"
              >
                <span>GET A QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/923230748123?text=Hello%20PowerX%20Sports%20team%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20export%20capabilities%20and%20product%20catalog."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-sports text-xl font-bold uppercase tracking-wider rounded-lg border border-emerald-500 flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>WHATSAPP US</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
