import React from 'react';
import { PRODUCTS, ProductItem } from '../data/sportsData';
import { ArrowRight, Check, MessageSquare, Layers, ShieldCheck } from 'lucide-react';

interface ProductsSectionProps {
  onSelectProductForQuote: (productName: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onSelectProductForQuote }) => {
  return (
    <section id="products" className="py-20 bg-[#07080C] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
            Export Catalog
          </div>
          <h2 className="font-sports text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
            Our Football <span className="text-red-500">Products</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Supplying international clubs, academies, tournament organizers, and sports brands with tailored football categories. All products available for custom branding and wholesale bulk export.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product: ProductItem) => (
            <div
              key={product.id}
              className="bg-[#0D0F16] rounded-2xl border border-white/10 hover:border-red-500/50 transition-all duration-300 flex flex-col overflow-hidden group shadow-xl hover:shadow-2xl hover:shadow-red-950/20"
            >
              {/* Product Image Box */}
              <div className="relative aspect-[4/3] bg-black/60 overflow-hidden">
                <img
                  src={product.image}
                  alt={`PowerX Sports ${product.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F16] via-transparent to-black/30 pointer-events-none"></div>

                {/* Badge */}
                <div className="absolute top-3 left-3 bg-red-600/90 text-white font-sports text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow">
                  {product.category}
                </div>

                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-neutral-300 text-[11px] font-semibold px-2.5 py-1 rounded border border-white/10">
                  {product.highlight}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="font-sports text-2xl font-black uppercase text-white tracking-wide group-hover:text-red-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-red-400 font-semibold uppercase tracking-wider mt-0.5">
                    {product.tagline}
                  </p>
                  <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Available Sizes */}
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">
                      <Layers className="w-3.5 h-3.5 text-red-500" />
                      <span>Available Sizes</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.availableSizes.map((size) => (
                        <span
                          key={size}
                          className="px-2.5 py-1 text-xs font-medium bg-white/5 text-neutral-200 rounded border border-white/10"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Customization Availability */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                      <span>Customization Options</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-neutral-300">
                      {product.customizationAvailable.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2">
                  <a
                    href={`https://wa.me/923230748123?text=${encodeURIComponent(
                      `Hello PowerX Sports, I would like to inquire about price and bulk supply for "${product.name}". Please share pricing and export options.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-sports text-lg font-bold uppercase tracking-wider rounded-lg shadow-md border border-red-500 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Request Price</span>
                  </a>

                  <button
                    onClick={() => onSelectProductForQuote(product.name)}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white font-sports text-lg font-bold uppercase tracking-wider rounded-lg border border-white/15 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom inquiry banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-red-950/60 via-neutral-900 to-[#0F111A] border border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-sports text-2xl sm:text-3xl font-black uppercase text-white">
              Need a Custom Product Specification?
            </h4>
            <p className="text-neutral-400 text-sm max-w-xl">
              We work with clubs, tournaments, and brands requiring specific panel geometry, customized colors, or tailored packaging. Share your requirements directly with our team.
            </p>
          </div>
          <button
            onClick={() => onSelectProductForQuote('Custom Footballs')}
            className="shrink-0 px-6 py-3.5 bg-white text-black hover:bg-neutral-200 font-sports text-xl font-black uppercase tracking-wider rounded-lg shadow transition-all hover:scale-105"
          >
            Start Custom Specification
          </button>
        </div>
      </div>
    </section>
  );
};
