import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/sportsData';
import { Maximize2, X, MessageCircle } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<any | null>(null);

  const filters = [
    { id: 'all', label: 'All Showcase' },
    { id: 'products', label: 'Football Products' },
    { id: 'custom', label: 'Custom Designs' },
    { id: 'details', label: 'Close-Up Details' },
    { id: 'packaging', label: 'Packaging & Export' },
    { id: 'sports', label: 'Sports Visuals' },
  ];

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-24 bg-[#090A0F] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
            Visual Catalog
          </div>
          <h2 className="font-sports text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
            Product & Export <span className="text-red-500">Gallery</span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            High-resolution photography showcasing our football models, bespoke club concepts, surface textures, and export packaging.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-xs font-sports font-bold uppercase tracking-wider transition-all ${
                activeFilter === filter.id
                  ? 'bg-red-600 text-white shadow-md shadow-red-950/50 border border-red-500'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#0D0F16] border border-white/10 hover:border-red-500/50 aspect-square cursor-pointer transition-all duration-300 shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>

              {/* View Overlay Button */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Card Label */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 block">
                  {item.category}
                </span>
                <h3 className="font-sports text-xl sm:text-2xl font-black uppercase text-white leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-400">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeModalItem && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveModalItem(null)}
          >
            <div
              className="bg-[#0D0F16] border border-white/15 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center border border-white/20 hover:bg-red-600 transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-square bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <h3 className="font-sports text-2xl font-black uppercase text-white">
                    {activeModalItem.title}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {activeModalItem.subtitle}
                  </p>
                </div>

                <a
                  href={`https://wa.me/923230748123?text=${encodeURIComponent(
                    `Hello PowerX Sports, I am inquiring about the design shown in "${activeModalItem.title}". Can you provide pricing for this style?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 shrink-0"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Inquire via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
