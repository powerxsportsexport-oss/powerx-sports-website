import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ProductsSectionProps {
  onOpenQuote: () => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onOpenQuote }) => {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-orange-500 font-semibold tracking-wider uppercase text-sm">Our Manufacturing Range</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-6">Professional Football Collections</h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-10">
          Engineered in Sialkot with precision craftsmanship, meeting rigorous international performance standards.
        </p>
        <button
          onClick={onOpenQuote}
          className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
        >
          REQUEST BULK QUOTE <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
