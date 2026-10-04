import React, { useState } from 'react';
import { Palette, Image, Shield, Layers, Copy, Check, Upload, Send, MessageCircle, Sparkles, HardDrive, RefreshCw } from 'lucide-react';
import { User } from 'firebase/auth';
import { createSpecificationFileInDrive } from '../services/googleDrive';

interface CustomFootballSectionProps {
  onOpenDriveModal: () => void;
  currentUser: User | null;
  onGoogleSignIn: () => void;
  initialProduct?: string;
}

export const CustomFootballSection: React.FC<CustomFootballSectionProps> = ({
  currentUser,
  onGoogleSignIn,
  initialProduct = 'Custom Footballs',
}) => {
  // Customizer interactive state
  const [selectedColorway, setSelectedColorway] = useState<'powerx' | 'stealth' | 'electric' | 'classic' | 'gold'>('powerx');
  const [ballSize, setBallSize] = useState<'Size 5' | 'Size 4' | 'Size 3' | 'Size 1'>('Size 5');
  const [includeCustomLogo, setIncludeCustomLogo] = useState(true);
  const [customBrandText, setCustomBrandText] = useState('YOUR CLUB / BRAND');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    country: '',
    whatsappNumber: '',
    email: '',
    product: initialProduct,
    quantity: 'Wholesale Tier (100 - 500 Balls)',
    size: 'Size 5 (Official Standard)',
    customizationRequirements: '',
    message: '',
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [isSavingToDrive, setIsSavingToDrive] = useState(false);
  const [driveSavedLink, setDriveSavedLink] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const colorways = [
    { id: 'powerx', name: 'PowerX Crimson & Black', primary: '#E11D48', secondary: '#090A0F', accent: '#FFFFFF' },
    { id: 'stealth', name: 'Stealth Matte Black & Red', primary: '#18181B', secondary: '#DC2626', accent: '#71717A' },
    { id: 'electric', name: 'High-Vis Velocity Yellow', primary: '#EAB308', secondary: '#090A0F', accent: '#FFFFFF' },
    { id: 'classic', name: 'Royal White & Deep Navy', primary: '#FFFFFF', secondary: '#1E3A8A', accent: '#DC2626' },
    { id: 'gold', name: 'Championship Black & Gold', primary: '#0A0A0A', secondary: '#D97706', accent: '#FEF3C7' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.whatsappNumber.trim() || !formData.country.trim()) {
      setErrorMessage('Please fill in your Name, WhatsApp Number, and Destination Country.');
      return;
    }

    setIsSubmitting(true);
    const quoteId = `PX-${Math.floor(100000 + Math.random() * 900000)}`;
    const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const submissionPayload = {
      ...formData,
      quoteId,
      date,
      ballColors: colorways.find((c) => c.id === selectedColorway),
      ballSize,
      hasLogoArtwork: Boolean(uploadedFile || customBrandText),
      brandPreviewText: customBrandText,
    };

    setSubmittedData(submissionPayload);

    // If user is logged in with Google, save to Drive
    if (currentUser) {
      try {
        setIsSavingToDrive(true);
        const res = await createSpecificationFileInDrive({
          quoteId,
          date,
          clientName: formData.name,
          companyName: formData.companyName,
          country: formData.country,
          whatsapp: formData.whatsappNumber,
          email: formData.email,
          productType: formData.product,
          quantityTier: formData.quantity,
          size: formData.size,
          customizationRequirements: formData.customizationRequirements,
          message: formData.message,
          ballColors: submissionPayload.ballColors,
          hasLogoArtwork: submissionPayload.hasLogoArtwork,
        });
        if (res.webViewLink) {
          setDriveSavedLink(res.webViewLink);
        }
      } catch (err: any) {
        console.error('Google Drive automatic save error:', err);
      } finally {
        setIsSavingToDrive(false);
      }
    }

    setIsSubmitting(false);
  };

  const handleManualDriveSave = async () => {
    if (!currentUser) {
      onGoogleSignIn();
      return;
    }
    if (!submittedData) return;

    try {
      setIsSavingToDrive(true);
      const res = await createSpecificationFileInDrive({
        quoteId: submittedData.quoteId,
        date: submittedData.date,
        clientName: submittedData.name,
        companyName: submittedData.companyName,
        country: submittedData.country,
        whatsapp: submittedData.whatsappNumber,
        email: submittedData.email,
        productType: submittedData.product,
        quantityTier: submittedData.quantity,
        size: submittedData.size,
        customizationRequirements: submittedData.customizationRequirements,
        message: submittedData.message,
        ballColors: submittedData.ballColors,
        hasLogoArtwork: submittedData.hasLogoArtwork,
      });
      if (res.webViewLink) {
        setDriveSavedLink(res.webViewLink);
      }
    } catch (err: any) {
      alert(`Could not save to Drive: ${err.message}`);
    } finally {
      setIsSavingToDrive(false);
    }
  };

  const formatWhatsAppMessage = (data: any) => {
    return encodeURIComponent(
      `*POWERX SPORTS - CUSTOM ORDER INQUIRY*\n` +
      `--------------------------------------\n` +
      `*Quote Ref:* ${data.quoteId}\n` +
      `*Name:* ${data.name}\n` +
      `*Company:* ${data.companyName || 'N/A'}\n` +
      `*Country:* ${data.country}\n` +
      `*WhatsApp:* ${data.whatsappNumber}\n` +
      `*Email:* ${data.email || 'N/A'}\n\n` +
      `*Product:* ${data.product}\n` +
      `*Size:* ${data.size}\n` +
      `*Quantity Tier:* ${data.quantity}\n` +
      `*Custom Colorway:* ${data.ballColors?.name || 'Custom'}\n` +
      `*Logo/Brand Text:* ${data.brandPreviewText || 'Custom Logo Provided'}\n\n` +
      `*Requirements:*\n${data.customizationRequirements || 'Standard custom branding'}\n\n` +
      `*Additional Notes:*\n${data.message || 'Please provide quotation, sample policy, and export transit timeline.'}`
    );
  };

  return (
    <section id="custom-footballs" className="py-24 bg-[#090A0F] relative border-b border-white/10">
      {/* Background flare */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
            Bespoke Export Orders
          </div>
          <h2 className="font-sports text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
            Your Design. Your Logo. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">
              Your Football.
            </span>
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            We supply customized footballs tailored to your precise brand requirements, club colors, tournament specs, or retail packaging.
          </p>
        </div>

        {/* Feature Grid: What Buyers Can Request */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
          {[
            { title: 'Custom Colors', desc: 'Exact Pantone & club shades', icon: Palette },
            { title: 'Custom Artwork', desc: 'Unique panel graphic prints', icon: Image },
            { title: 'Custom Logo', desc: 'Crest & sponsor branding', icon: Shield },
            { title: 'Different Sizes', desc: 'Size 1 mini to Official Size 5', icon: Layers },
            { title: 'Reference-Based', desc: 'Matched from your samples/photos', icon: Copy },
            { title: 'Bulk Quantities', desc: 'From pilot batches to containers', icon: Check },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-900/60 p-4 rounded-xl border border-white/10 hover:border-red-500/30 transition-all text-center flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center mb-2.5">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-sports text-lg font-bold uppercase text-white leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Customizer + Quotation Form Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Customizer & Preview (5 cols) */}
          <div className="lg:col-span-5 bg-[#0D0F16] rounded-2xl border border-white/10 p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-500" />
                <h3 className="font-sports text-2xl font-black uppercase text-white">
                  Visual Concept Mockup
                </h3>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold bg-white/5 px-2.5 py-1 rounded">
                Interactive Preview
              </span>
            </div>

            {/* Ball Visual Display */}
            <div className="relative aspect-square rounded-xl bg-gradient-to-b from-neutral-950 via-[#10121A] to-neutral-900 flex items-center justify-center border border-white/10 overflow-hidden group">
              {/* Dynamic lighting */}
              <div
                className="absolute inset-0 opacity-20 blur-2xl rounded-full"
                style={{
                  backgroundColor: colorways.find((c) => c.id === selectedColorway)?.primary || '#E11D48',
                }}
              ></div>

              {/* Base Football Image */}
              <img
                src={
                  selectedColorway === 'powerx'
                    ? '/src/assets/images/hero_football_1791086118631.jpg'
                    : selectedColorway === 'stealth'
                    ? '/src/assets/images/match_football_1791086140094.jpg'
                    : selectedColorway === 'electric'
                    ? '/src/assets/images/training_football_1791086156017.jpg'
                    : '/src/assets/images/custom_football_1791086172397.jpg'
                }
                alt="Custom Football Mockup"
                referrerPolicy="no-referrer"
                className="w-4/5 h-4/5 object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-105"
              />

              {/* Logo & Brand Overlay Badge */}
              {includeCustomLogo && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
                  <div className="px-3.5 py-1.5 rounded bg-black/75 backdrop-blur-md border border-white/20 shadow-2xl flex items-center gap-2">
                    {uploadedPreview ? (
                      <img src={uploadedPreview} alt="Uploaded logo preview" className="w-6 h-6 object-contain" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center font-sports text-xs font-black text-white">
                        PX
                      </div>
                    )}
                    <span className="font-sports text-sm sm:text-base font-black tracking-wider uppercase text-white truncate max-w-[130px]">
                      {customBrandText || 'YOUR LOGO'}
                    </span>
                  </div>
                </div>
              )}

              {/* Size Badge */}
              <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 rounded text-[11px] font-sports font-bold text-neutral-300 uppercase border border-white/10">
                Mockup: {ballSize}
              </div>

              {/* Colorway Tag */}
              <div className="absolute bottom-3 right-3 bg-red-600/90 px-2.5 py-1 rounded text-[11px] font-sports font-bold text-white uppercase shadow">
                {colorways.find((c) => c.id === selectedColorway)?.name.split(' ')[0]}
              </div>
            </div>

            {/* Customizer Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Select Base Colorway Concept
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {colorways.map((col) => (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setSelectedColorway(col.id as any)}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-left text-xs transition-all ${
                        selectedColorway === col.id
                          ? 'border-red-500 bg-red-950/30 text-white shadow'
                          : 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/20'
                      }`}
                    >
                      <span className="flex items-center -space-x-1 shrink-0">
                        <span className="w-3.5 h-3.5 rounded-full border border-black" style={{ backgroundColor: col.primary }}></span>
                        <span className="w-3.5 h-3.5 rounded-full border border-black" style={{ backgroundColor: col.secondary }}></span>
                        <span className="w-3.5 h-3.5 rounded-full border border-black" style={{ backgroundColor: col.accent }}></span>
                      </span>
                      <span className="font-medium truncate">{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Target Size
                  </label>
                  <select
                    value={ballSize}
                    onChange={(e) => setBallSize(e.target.value as any)}
                    className="w-full bg-neutral-900 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Size 5">Size 5 (Official Standard)</option>
                    <option value="Size 4">Size 4 (Youth 9-12)</option>
                    <option value="Size 3">Size 3 (Junior 6-9)</option>
                    <option value="Size 1">Size 1 (Mini / Skill)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Mockup Club / Brand Text
                  </label>
                  <input
                    type="text"
                    value={customBrandText}
                    onChange={(e) => setCustomBrandText(e.target.value)}
                    placeholder="Enter club or brand"
                    className="w-full bg-neutral-900 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quotation Form & Submission (7 cols) */}
          <div className="lg:col-span-7 bg-[#0D0F16] rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl">
            {submittedData ? (
              /* Success State */
              <div className="space-y-6 text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/30">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    Inquiry Generated Successfully
                  </span>
                  <h3 className="font-sports text-3xl sm:text-4xl font-black uppercase text-white">
                    Quotation Reference #{submittedData.quoteId}
                  </h3>
                  <p className="text-neutral-400 text-sm max-w-lg mx-auto">
                    Thank you, <strong className="text-white">{submittedData.name}</strong>! Your customized football inquiry for <strong className="text-white">{submittedData.country}</strong> has been structured.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-neutral-900/80 border border-white/10 rounded-xl p-5 text-left text-xs space-y-2 text-neutral-300 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-neutral-400">Product:</span>
                    <strong className="text-white">{submittedData.product}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-neutral-400">Volume Tier:</span>
                    <strong className="text-white">{submittedData.quantity}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-neutral-400">Selected Size:</span>
                    <strong className="text-white">{submittedData.size}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-neutral-400">Destination:</span>
                    <strong className="text-white">{submittedData.country}</strong>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-neutral-400">WhatsApp:</span>
                    <strong className="text-emerald-400">{submittedData.whatsappNumber}</strong>
                  </div>
                </div>

                {/* Google Drive Status Link */}
                {currentUser && driveSavedLink && (
                  <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-lg text-xs text-blue-200 flex items-center justify-between gap-3 max-w-md mx-auto">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Saved directly to your Google Drive!</span>
                    </div>
                    <a
                      href={driveSavedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold underline"
                    >
                      Open File
                    </a>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/923230748123?text=${formatWhatsAppMessage(submittedData)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-sports text-xl font-black uppercase tracking-wider rounded-lg shadow-lg border border-emerald-400 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                    <span>Send Order to WhatsApp (+92 323 0748123)</span>
                  </a>

                  {!driveSavedLink && (
                    <button
                      onClick={handleManualDriveSave}
                      disabled={isSavingToDrive}
                      className="w-full sm:w-auto px-5 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-sports text-lg font-bold uppercase tracking-wider rounded-lg border border-white/20 flex items-center justify-center gap-2"
                    >
                      <HardDrive className="w-4 h-4 text-blue-400" />
                      <span>{isSavingToDrive ? 'Saving...' : 'Save to Google Drive'}</span>
                    </button>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmittedData(null);
                      setDriveSavedLink(null);
                    }}
                    className="text-xs text-neutral-400 hover:text-white underline"
                  >
                    ← Submit another quotation request
                  </button>
                </div>
              </div>
            ) : (
              /* Quotation Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-sports text-2xl font-black uppercase text-white">
                      Start Your Custom Order
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Share your required quantity, design, and specs to receive an accurate B2B quotation.
                    </p>
                  </div>
                  <span className="font-sports text-sm text-red-500 font-bold uppercase tracking-wider bg-red-950/40 px-2.5 py-1 rounded border border-red-500/20">
                    B2B Export
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-950/80 border border-red-500/40 rounded-lg text-xs text-red-300">
                    {errorMessage}
                  </div>
                )}

                {/* Row 1: Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tariq Al-Mansoor"
                      className="w-full bg-neutral-900/90 border border-white/15 focus:border-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Company / Club Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Al-Ain FC Academy / Sports Retail"
                      className="w-full bg-neutral-900/90 border border-white/15 focus:border-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Row 2: Country & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Destination Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. UAE, Saudi Arabia, UK, Germany"
                      className="w-full bg-neutral-900/90 border border-white/15 focus:border-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      placeholder="e.g. +971 50 1234567"
                      className="w-full bg-neutral-900/90 border border-white/15 focus:border-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Row 3: Email & Product Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="buyer@sportscompany.com"
                      className="w-full bg-neutral-900/90 border border-white/15 focus:border-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Product Category
                    </label>
                    <select
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full bg-neutral-900/90 border border-white/15 focus:border-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    >
                      <option value="Match Footballs">Match Footballs</option>
                      <option value="Training Footballs">Training Footballs</option>
                      <option value="Custom Footballs">Custom Footballs (Fully Bespoke)</option>
                      <option value="Promotional Footballs">Promotional Footballs</option>
                      <option value="Club & Academy Footballs">Club & Academy Footballs</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Quantity & Size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Quantity Requirement
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-neutral-900/90 border border-white/15 focus:border-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    >
                      <option value="Sample Order (1 - 10 Balls)">Sample Order (1 - 10 Balls)</option>
                      <option value="Small Bulk (25 - 100 Balls)">Small Bulk (25 - 100 Balls)</option>
                      <option value="Wholesale Tier (100 - 500 Balls)">Wholesale Tier (100 - 500 Balls)</option>
                      <option value="Large Volume (500+ Balls / Container)">Large Volume (500+ Balls / Container)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Ball Size
                    </label>
                    <select
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="w-full bg-neutral-900/90 border border-white/15 focus:border-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none"
                    >
                      <option value="Size 5 (Official Standard)">Size 5 (Official Standard)</option>
                      <option value="Size 4 (Youth 9-12 Years)">Size 4 (Youth 9-12 Years)</option>
                      <option value="Size 3 (Junior 6-9 Years)">Size 3 (Junior 6-9 Years)</option>
                      <option value="Size 1 (Mini / Skill)">Size 1 (Mini / Skill)</option>
                      <option value="Mixed Assorted Sizes">Mixed Assorted Sizes</option>
                    </select>
                  </div>
                </div>

                {/* Customization Requirements */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Customization Requirements
                  </label>
                  <input
                    type="text"
                    value={formData.customizationRequirements}
                    onChange={(e) => setFormData({ ...formData, customizationRequirements: e.target.value })}
                    placeholder="e.g. Red and black panels with our academy crest, matte finish, custom barcode packaging"
                    className="w-full bg-neutral-900/90 border border-white/15 focus:border-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>

                {/* Reference Image Upload */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Reference Image / Logo Upload (Optional)
                  </label>
                  <div className="relative border-2 border-dashed border-white/15 hover:border-red-500/50 rounded-xl p-4 text-center cursor-pointer transition-colors bg-neutral-900/50">
                    <input
                      type="file"
                      accept="image/*,.pdf,.ai,.eps,.psd"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      {uploadedPreview ? (
                        <div className="flex items-center gap-3">
                          <img src={uploadedPreview} alt="Preview" className="w-12 h-12 object-contain rounded border border-white/20" />
                          <div className="text-left">
                            <span className="text-xs text-white font-medium block truncate max-w-[200px]">{uploadedFile?.name}</span>
                            <span className="text-[11px] text-emerald-400">File attached successfully</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-neutral-400" />
                          <div className="text-xs text-neutral-300 font-medium">
                            <span className="text-red-400 font-semibold">Click to upload</span> or drag and drop artwork
                          </div>
                          <p className="text-[10px] text-neutral-500">
                            PNG, JPG, PDF, or vector tech packs (up to 25MB)
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Additional Message / Export Port Details
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide any specific timeline, target delivery date, or shipping terms (CIF / FOB / Door-to-door)."
                    className="w-full bg-neutral-900/90 border border-white/15 focus:border-red-500 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none"
                  ></textarea>
                </div>

                {/* Google Drive Option Callout */}
                <div className="p-3 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-between text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>
                      {currentUser
                        ? `Connected with ${currentUser.email} (Spec will sync to Drive)`
                        : 'Connect Google Drive to auto-archive your quote specifications'}
                    </span>
                  </div>
                  {!currentUser && (
                    <button
                      type="button"
                      onClick={onGoogleSignIn}
                      className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] font-semibold shrink-0"
                    >
                      Connect
                    </button>
                  )}
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-sports text-2xl font-black uppercase tracking-wider rounded-lg shadow-xl shadow-red-950/50 border border-red-500 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Processing Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>START YOUR CUSTOM ORDER</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
