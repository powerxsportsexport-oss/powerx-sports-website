import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
      {/* Tooltip bubble on desktop */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#0D0F16] border border-white/15 text-white px-3.5 py-2 rounded-xl shadow-2xl backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <div className="text-xs">
            <span className="font-bold text-white block">WhatsApp Export Desk</span>
            <span className="text-[10px] text-neutral-400">+92 323 0748123</span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-neutral-500 hover:text-white p-0.5 ml-1"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href="https://wa.me/923230748123?text=Hello%20PowerX%20Sports%20team%2C%20I%20am%20interested%20in%20custom%20footballs%20and%20bulk%20supply.%20Please%20share%20quotation%20details."
        target="_blank"
        rel="noopener noreferrer"
        className="relative group w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/60 border-2 border-emerald-400 transition-all transform hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp (+92 323 0748123)"
      >
        {/* Glow / Pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 animate-ping pointer-events-none group-hover:opacity-0"></span>
        <MessageCircle className="w-7 h-7 fill-white text-emerald-600 relative z-10" />
      </a>
    </div>
  );
};
