import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductsSection } from './components/ProductsSection';
import { CustomFootballSection } from './components/CustomFootballSection';
import { WholesaleSection } from './components/WholesaleSection';
import { HowItWorks } from './components/HowItWorks';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { GoogleDriveFilesModal } from './components/GoogleDriveFilesModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'custom' | 'wholesale' | 'about' | 'gallery' | 'contact'>('home');
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onOpenQuote={() => setIsQuoteModalOpen(true)} />
      
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero setActiveTab={setActiveTab} onOpenDrive={() => setIsDriveModalOpen(true)} onOpenQuote={() => setIsQuoteModalOpen(true)} />
            <ProductsSection onOpenQuote={() => setIsQuoteModalOpen(true)} />
            <CustomFootballSection setActiveTab={setActiveTab} onOpenQuote={() => setIsQuoteModalOpen(true)} />
            <WholesaleSection onOpenQuote={() => setIsQuoteModalOpen(true)} />
            <HowItWorks />
            <GallerySection />
            <AboutSection />
            <ContactSection />
          </>
        )}
        {activeTab === 'custom' && (
          <div className="py-12">
            <CustomFootballSection setActiveTab={setActiveTab} onOpenQuote={() => setIsQuoteModalOpen(true)} />
          </div>
        )}
        {activeTab === 'wholesale' && (
          <div className="py-12">
            <WholesaleSection onOpenQuote={() => setIsQuoteModalOpen(true)} />
          </div>
        )}
        {activeTab === 'about' && (
          <div className="py-12">
            <AboutSection />
            <HowItWorks />
          </div>
        )}
        {activeTab === 'gallery' && (
          <div className="py-12">
            <GallerySection />
          </div>
        )}
        {activeTab === 'contact' && (
          <div className="py-12">
            <ContactSection />
          </div>
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />
      <FloatingWhatsApp />
      
      <GoogleDriveFilesModal isOpen={isDriveModalOpen} onClose={() => setIsDriveModalOpen(false)} />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
}

export default App;
