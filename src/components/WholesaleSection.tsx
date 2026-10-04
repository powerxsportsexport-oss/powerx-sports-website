import React from 'react';
import { QUANTITY_TIERS, EXPORT_DESTINATIONS } from '../data/sportsData';
import { Package, ArrowRight, MessageCircle, Globe2, ShieldAlert } from 'lucide-react';

interface WholesaleSectionProps {
  onSelectTier: (tierName: string) => void;
}

export const WholesaleSection: React.FC<WholesaleSectionProps> = ({ onSelectTier }) => {
  return (
    <section id="wholesale" className="py-24 bg-[#07080C] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
            Bulk Supply & Export
          </div>
          <h2 className="font-sports text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
            Wholesale & Bulk <span className="text-red-500">Football Supply</span>
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
            We work with buyers looking for customized footballs and bulk sports-product supply. Share your required quantity, design and specifications with us to receive a quotation.
          </p>
        </div>

        {/* 4 Quantity Inquiry Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {QUANTITY_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                tier.popular
                  ? 'bg-gradient-to-b from-red-950/40 via-[#10121B] to-[#0A0B10] border-2 border-red-500 shadow-xl shadow-red-950/30'
                  : 'bg-[#0D0F16] border border-white/10 hover:border-white/25'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-red-600 text-white font-sports text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  Most Inquired Tier
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {tier.badge}
                  </span>
                  <Package className="w-5 h-5 text-red-500" />
                </div>

                <div>
                  <h3 className="font-sports text-3xl font-black uppercase text-white">
                    {tier.title}
                  </h3>
                  <div className="text-red-400 font-sports text-xl font-bold uppercase mt-1">
                    {tier.range}
                  </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {tier.desc}
                </p>

                <div className="pt-2 text-[11px] text-neutral-400 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    <span>Custom Logo & Colors available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    <span>Export packaging & documentation</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
                <button
                  onClick={() => onSelectTier(`${tier.title} (${tier.range})`)}
                  className={`w-full py-3 rounded-lg font-sports text-base font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    tier.popular
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/40 border border-red-400'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  }`}
                >
                  <span>Inquire This Tier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/923230748123?text=${encodeURIComponent(
                    `Hello PowerX Sports, I am inquiring about the ${tier.title} (${tier.range}) tier for custom football supply.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-emerald-400 hover:bg-white/5 transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* International Export Destinations Strip */}
        <div className="bg-[#0D0F16] rounded-2xl border border-white/10 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-sports text-2xl font-black uppercase text-white">
                  Global Export Route Support
                </h4>
                <p className="text-xs text-neutral-400">
                  Reliable shipment coordination from Sialkot, Pakistan to key international commercial hubs
                </p>
              </div>
            </div>
            <span className="text-xs text-neutral-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              Air Express & Sea Cargo Options
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {EXPORT_DESTINATIONS.map((dest, i) => (
              <div key={i} className="bg-neutral-900/60 p-3 rounded-lg border border-white/5">
                <span className="text-[10px] font-bold uppercase text-red-400 block tracking-wider">
                  {dest.region}
                </span>
                <strong className="text-white text-xs block font-semibold mt-0.5">
                  {dest.name}
                </strong>
                <span className="text-[11px] text-neutral-400 block mt-1">
                  {dest.cities}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-neutral-400">
            <ShieldAlert className="w-4 h-4 text-neutral-500 shrink-0" />
            <span>
              Quotations are prepared individually per buyer requirements depending on ball volume, panel design, surface material specification, and destination freight terms.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
