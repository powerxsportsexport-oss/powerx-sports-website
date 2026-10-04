import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/sportsData';
import { ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';

interface HowItWorksProps {
  onOpenQuoteModal: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className="py-24 bg-[#090A0F] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
            Clear B2B Workflow
          </div>
          <h2 className="font-sports text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
            How It <span className="text-red-500">Works</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            A straightforward 4-step export workflow designed for international buyers, clubs, and sports distributors.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((item, index) => (
            <div
              key={item.step}
              className="bg-[#0D0F16] border border-white/10 hover:border-red-500/40 rounded-2xl p-6 relative flex flex-col justify-between group transition-all duration-300"
            >
              {/* Step Number with Sport Glow */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-sports text-5xl font-black text-white/20 group-hover:text-red-500/60 transition-colors">
                  {item.step}
                </span>
                <span className="w-8 h-8 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center font-sports text-sm font-bold border border-red-500/20">
                  {index + 1}
                </span>
              </div>

              {/* Step Details */}
              <div className="space-y-3">
                <h3 className="font-sports text-2xl font-black uppercase text-white group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Sub-detail footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{item.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenQuoteModal}
            className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-sports text-xl font-bold uppercase tracking-wider rounded-lg shadow-lg border border-red-500 flex items-center justify-center gap-2"
          >
            <span>Start Step 1: Request a Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="https://wa.me/923230748123?text=Hello%20PowerX%20Sports%20team%2C%20I%20would%20like%20to%20discuss%20the%20custom%20order%20process%20and%20specifications."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-sports text-xl font-bold uppercase tracking-wider rounded-lg border border-white/15 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp (+92 323 0748123)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
