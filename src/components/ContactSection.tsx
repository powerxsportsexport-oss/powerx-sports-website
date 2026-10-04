import React, { useState } from 'react';
import { MessageCircle, MapPin, Mail, Phone, Clock, Send, CheckCircle2, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
  onOpenQuoteModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenQuoteModal }) => {
  const [quickMsg, setQuickMsg] = useState({
    name: '',
    country: '',
    message: '',
  });

  const sendQuickWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello PowerX Sports team,\n\n` +
      `My name is ${quickMsg.name || 'a prospective buyer'} from ${quickMsg.country || 'International Market'}.\n` +
      `Inquiry: ${quickMsg.message || 'I would like to inquire about customized footballs and wholesale bulk pricing.'}`
    );
    window.open(`https://wa.me/923230748123?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-[#090A0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
            Direct Communications
          </div>
          <h2 className="font-sports text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
            Connect with <span className="text-red-500">PowerX Sports</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Direct coordination for international buyers across UAE, Saudi Arabia, Europe, UK, and global sports markets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Primary WhatsApp Card */}
            <div className="bg-gradient-to-br from-emerald-950/60 via-[#0D1513] to-[#0A0F0D] border-2 border-emerald-500/60 rounded-2xl p-6 shadow-xl shadow-emerald-950/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-900/40">
                  <MessageCircle className="w-7 h-7 fill-white text-emerald-600" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-emerald-400 tracking-wider block">
                    Fastest Response Channel
                  </span>
                  <h3 className="font-sports text-3xl font-black uppercase text-white leading-none">
                    Official WhatsApp
                  </h3>
                </div>
              </div>

              <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
                Connect directly with our export desk for instant questions, photo references, spec sheets, and quotation reviews.
              </p>

              <div className="space-y-3">
                <a
                  href="https://wa.me/923230748123?text=Hello%20PowerX%20Sports%20team%2C%20I%20am%20interested%20in%20custom%20footballs%20and%20bulk%20supply."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-sports text-2xl font-black uppercase tracking-wider rounded-xl shadow-lg border border-emerald-400 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>+92 323 0748123</span>
                </a>
                <span className="text-[11px] text-center block text-neutral-400">
                  Available for text, voice notes, and document sharing
                </span>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-[#0D0F16] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sports text-xl font-bold uppercase text-white">
                    Export Office Location
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Sialkot, Punjab, Pakistan
                  </p>
                </div>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Headquartered in Sialkot, Pakistan. Serving international sports buyers with customized products and bulk export logistics.
              </p>
            </div>

            {/* Response Time & Key Markets */}
            <div className="bg-[#0D0F16] border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 text-neutral-300 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sports text-xl font-bold uppercase text-white">
                    Buyer Support Hours
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Monday – Saturday (GST / PKT Timezones)
                  </p>
                </div>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We coordinate seamlessly with buyers in the UAE (UTC+4), Saudi Arabia (UTC+3), and European time zones.
              </p>
            </div>
          </div>

          {/* Right Column: Direct Quick Inquire & Quote Option (7 cols) */}
          <div className="lg:col-span-7 bg-[#0D0F16] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <div className="inline-block text-xs font-bold text-red-500 uppercase tracking-wider mb-1">
                Instant Chat Launcher
              </div>
              <h3 className="font-sports text-3xl font-black uppercase text-white">
                Send a Quick WhatsApp Message
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Type your message below to immediately launch an inquiry into WhatsApp with our export team.
              </p>
            </div>

            <form onSubmit={sendQuickWhatsApp} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={quickMsg.name}
                    onChange={(e) => setQuickMsg({ ...quickMsg, name: e.target.value })}
                    placeholder="e.g. David Mueller / Ahmed"
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Your Country
                  </label>
                  <input
                    type="text"
                    required
                    value={quickMsg.country}
                    onChange={(e) => setQuickMsg({ ...quickMsg, country: e.target.value })}
                    placeholder="e.g. UAE / Saudi Arabia / Germany"
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Message / Required Ball Specifications
                </label>
                <textarea
                  rows={4}
                  required
                  value={quickMsg.message}
                  onChange={(e) => setQuickMsg({ ...quickMsg, message: e.target.value })}
                  placeholder="Tell us what type of footballs you require (Match, Training, Custom), quantity range, and if you have custom artwork ready."
                  className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-sports text-2xl font-black uppercase tracking-wider rounded-lg shadow-lg border border-emerald-400 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>WHATSAPP US</span>
              </button>
            </form>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-400">
                Prefer a detailed multi-field quotation spec sheet?
              </span>
              <button
                onClick={onOpenQuoteModal}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-sports text-base font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5"
              >
                <span>GET A QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
