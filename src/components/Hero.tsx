 import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, Award, Globe } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: 'home' | 'custom' | 'wholesale' | 'about' | 'gallery' | 'contact') => void;
  onOpenDrive: () => void;
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, onOpenDrive, onOpenQuote }) => {
  return (
    <div className="relative bg-slate-950 text-white overflow-hidden pt-8 pb-16">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium">
              <Award className="w-4 h-4" />
              <span>Sialkot, Pakistan • Global Football Manufacturing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              CUSTOM FOOTBALLS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                FOR GLOBAL BUYERS
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
              PowerX Sports is a Sialkot-based sports supply and export business focused on footballs and customized sports products. We serve wholesale and bulk buyers from the UAE, Saudi Arabia, Europe, and global markets with custom designs, tailored branding, and dependable supply.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={onOpenQuote}
                className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-600/30 transition-all flex items-center gap-2"
              >
                GET A QUOTE <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" /> WHATSAPP US
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span>FIFA Quality Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span>Global Export Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span>Custom Brand Printing</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
                alt="PowerX Sports Premium Competition Football"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transpa
