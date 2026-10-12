import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

interface ProductsSectionProps {
  onOpenQuote: () => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onOpenQuote }) => {
  const products = [
    {
      title: 'PowerX Pro Match Match Ball',
      category: 'Match Football',
      description: 'Hand-stitched professional match football built for optimal flight accuracy and durability under all weather conditions.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      specs: ['FIFA Quality Pro', 'PU Japanese Teijin Leather', '4-Layer Polyester Lining']
    },
    {
      title: 'PowerX Training Series',
      category: 'Training Football',
      description: 'Designed for high-intensity club training sessions. Excellent shape retention and abrasion resistance.',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      specs: ['High Durability', 'Reinforced Bladder', 'All-Weather Grip']
    },
    {
      title: 'Custom Branded Promo Ball',
      category: 'Customized & Promotional',
      description: 'Tailored with your corporate logos, team colors, and custom artwork for tournaments, brands, and promotions.',
      image: 'https://images.unsplash.com/photo-1614637301935-397c981170bf?auto=format&fit=crop&w=800&q=80',
      specs: ['Custom Logo Printing', 'Pantone Color Matching', 'Bulk Order Discounts']
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-500 font-semibold tracking-wider uppercase text-sm">Our Manufacturing Range</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Professional Football Collections</h2>
          <p className="text-slate-400 mt-4">
            Engineered in Sialkot with precision craftsmanship, meeting rigorous international performance standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between shadow-xl">
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{product.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{product.description}</p>
                  <ul className="space-y-2 mb-6">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                        <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500 flex-shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button
                  onClick={onOpenQuote}
                  className="w-full py-3 bg-slate-800 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  REQUEST BULK QUOTE <ArrowRight className="w-4 h-4" />
                </button>
          
