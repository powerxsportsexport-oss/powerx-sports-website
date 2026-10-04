/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductsSection } from './components/ProductsSection';
import { CustomFootballSection } from './components/CustomFootballSection';
import { WholesaleSection } from './components/WholesaleSection';
import { HowItWorks } from './components/HowItWorks';
import { WhyPowerX } from './components/WhyPowerX';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { BottomCTA } from './components/BottomCTA';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { QuoteModal } from './components/QuoteModal';
import { GoogleDriveFilesModal } from './components/GoogleDriveFilesModal';
import { initAuth, googleSignIn, logout as authLogout } from './services/firebaseAuth';
import { User } from 'firebase/auth';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Modals state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string>('Match Footballs');
  const [selectedTierForQuote, setSelectedTierForQuote] = useState<string>('Wholesale Tier (100 - 500 Balls)');
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);

  // Initialize Firebase Auth & Google Drive access token listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
      },
      () => {
        setCurrentUser(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    try {
      const res = await googleSignIn();
      if (res?.user) {
        setCurrentUser(res.user);
      }
    } catch (err: any) {
      console.error('Google Sign In failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authLogout();
      setCurrentUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleOpenQuoteModal = (product?: string, tier?: string) => {
    if (product) setSelectedProductForQuote(product);
    if (tier) setSelectedTierForQuote(tier);
    setIsQuoteModalOpen(true);
  };

  const handleSelectProduct = (productName: string) => {
    setSelectedProductForQuote(productName);
    setIsQuoteModalOpen(true);
  };

  const handleSelectTier = (tierName: string) => {
    setSelectedTierForQuote(tierName);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar
        onOpenQuoteModal={handleOpenQuoteModal}
        onOpenDriveModal={() => setIsDriveModalOpen(true)}
        currentUser={currentUser}
        onGoogleSignIn={handleGoogleSignIn}
        onLogout={handleLogout}
        isLoggingIn={isLoggingIn}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenQuoteModal={() => handleOpenQuoteModal('Custom Footballs')} />
        <ProductsSection onSelectProductForQuote={handleSelectProduct} />
        <CustomFootballSection
          onOpenDriveModal={() => setIsDriveModalOpen(true)}
          currentUser={currentUser}
          onGoogleSignIn={handleGoogleSignIn}
          initialProduct={selectedProductForQuote}
        />
        <WholesaleSection onSelectTier={handleSelectTier} />
        <HowItWorks onOpenQuoteModal={() => handleOpenQuoteModal('Match Footballs')} />
        <WhyPowerX onOpenQuoteModal={() => handleOpenQuoteModal('Custom Footballs')} />
        <GallerySection />
        <AboutSection onOpenQuoteModal={() => handleOpenQuoteModal()} />
        <BottomCTA onOpenQuoteModal={() => handleOpenQuoteModal('Custom Footballs')} />
        <ContactSection onOpenQuoteModal={() => handleOpenQuoteModal()} />
      </main>

      {/* Global Footer */}
      <Footer onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Quick Quotation Dialog */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        preSelectedProduct={selectedProductForQuote}
        preSelectedTier={selectedTierForQuote}
        currentUser={currentUser}
        onGoogleSignIn={handleGoogleSignIn}
      />

      {/* Google Drive Saved Specs Modal */}
      <GoogleDriveFilesModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        currentUser={currentUser}
        onGoogleSignIn={handleGoogleSignIn}
      />
    </div>
  );
}
