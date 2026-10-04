import React, { useState, useEffect } from 'react';
import { X, Send, Check, Upload, MessageCircle, HardDrive, RefreshCw } from 'lucide-react';
import { User } from 'firebase/auth';
import { createSpecificationFileInDrive } from '../services/googleDrive';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedProduct?: string;
  preSelectedTier?: string;
  currentUser: User | null;
  onGoogleSignIn: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preSelectedProduct = 'Match Footballs',
  preSelectedTier = 'Wholesale Tier (100 - 500 Balls)',
  currentUser,
  onGoogleSignIn,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    country: '',
    whatsappNumber: '',
    email: '',
    product: preSelectedProduct,
    quantity: preSelectedTier,
    size: 'Size 5 (Official Standard)',
    customizationRequirements: '',
    message: '',
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [driveSavedLink, setDriveSavedLink] = useState<string | null>(null);
  const [isSavingToDrive, setIsSavingToDrive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (preSelectedProduct) {
      setFormData((prev) => ({ ...prev, product: preSelectedProduct }));
    }
    if (preSelectedTier) {
      setFormData((prev) => ({ ...prev, quantity: preSelectedTier }));
    }
  }, [preSelectedProduct, preSelectedTier]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.whatsappNumber.trim() || !formData.country.trim()) {
      setErrorMessage('Please fill in Name, WhatsApp Number, and Destination Country.');
      return;
    }

    setIsSubmitting(true);
    const quoteId = `PX-${Math.floor(100000 + Math.random() * 900000)}`;
    const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const submission = {
      ...formData,
      quoteId,
      date,
      hasLogoArtwork: Boolean(uploadedFile),
    };

    setSubmittedData(submission);

    // Auto-save to Google Drive if user is logged in
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
          hasLogoArtwork: Boolean(uploadedFile),
        });
        if (res.webViewLink) {
          setDriveSavedLink(res.webViewLink);
        }
      } catch (err: any) {
        console.error('Drive save error:', err);
      } finally {
        setIsSavingToDrive(false);
      }
    }

    setIsSubmitting(false);
  };

  const formatWhatsAppMessage = (data: any) => {
    return encodeURIComponent(
      `*POWERX SPORTS - QUOTATION REQUEST*\n` +
      `------------------------------------\n` +
      `*Ref:* ${data.quoteId}\n` +
      `*Client:* ${data.name}\n` +
      `*Company:* ${data.companyName || 'N/A'}\n` +
      `*Country:* ${data.country}\n` +
      `*WhatsApp:* ${data.whatsappNumber}\n` +
      `*Email:* ${data.email || 'N/A'}\n\n` +
      `*Product:* ${data.product}\n` +
      `*Size:* ${data.size}\n` +
      `*Quantity Tier:* ${data.quantity}\n\n` +
      `*Customization:*\n${data.customizationRequirements || 'Standard branding inquiry'}\n\n` +
      `*Notes:* ${data.message || 'Please provide quotation with shipping estimate to ' + data.country}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0D0F16] border border-white/15 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative my-8">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
              Sialkot, Pakistan • B2B Export
            </div>
            <h3 className="font-sports text-2xl sm:text-3xl font-black uppercase text-white">
              Request a B2B Quotation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submittedData ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Inquiry Ref: {submittedData.quoteId}
                </span>
                <h4 className="font-sports text-3xl font-black uppercase text-white">
                  Quotation Ready to Send
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Click below to open WhatsApp with your pre-filled inquiry to connect directly with our export desk in Sialkot.
                </p>
              </div>

              {driveSavedLink && (
                <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-lg text-xs text-blue-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Saved to your Google Drive!</span>
                  </div>
                  <a
                    href={driveSavedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline text-white"
                  >
                    Open Document
                  </a>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/923230748123?text=${formatWhatsAppMessage(submittedData)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-sports text-xl font-black uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>Send via WhatsApp (+92 323 0748123)</span>
                </a>

                <button
                  onClick={() => {
                    setSubmittedData(null);
                    onClose();
                  }}
                  className="w-full py-2.5 bg-white/10 text-white text-xs font-semibold rounded-lg"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-red-950/80 border border-red-500/40 rounded-lg text-xs text-red-300">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                    Company / Club
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Club or company name"
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. UAE, Saudi Arabia, UK"
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    placeholder="e.g. +971 50 1234567"
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="buyer@domain.com"
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                    Product
                  </label>
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Match Footballs">Match Footballs</option>
                    <option value="Training Footballs">Training Footballs</option>
                    <option value="Custom Footballs">Custom Footballs</option>
                    <option value="Promotional Footballs">Promotional Footballs</option>
                    <option value="Club & Academy Footballs">Club & Academy Footballs</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                    Quantity Tier
                  </label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Sample Order (1 - 10 Balls)">Sample Order (1 - 10 Balls)</option>
                    <option value="Small Bulk (25 - 100 Balls)">Small Bulk (25 - 100 Balls)</option>
                    <option value="Wholesale Tier (100 - 500 Balls)">Wholesale Tier (100 - 500 Balls)</option>
                    <option value="Large Volume (500+ Balls)">Large Volume (500+ Balls)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                    Size
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Size 5 (Official Standard)">Size 5 (Official Standard)</option>
                    <option value="Size 4 (Youth)">Size 4 (Youth)</option>
                    <option value="Size 3 (Junior)">Size 3 (Junior)</option>
                    <option value="Size 1 (Mini / Skill)">Size 1 (Mini / Skill)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                  Customization Requirements
                </label>
                <input
                  type="text"
                  value={formData.customizationRequirements}
                  onChange={(e) => setFormData({ ...formData, customizationRequirements: e.target.value })}
                  placeholder="Colors, club crest, panel graphic style, custom packaging"
                  className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
                />
              </div>

              {/* Reference Image Upload */}
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                  Reference Image / Logo (Optional)
                </label>
                <div className="border border-dashed border-white/20 hover:border-red-500 rounded-lg p-3 text-center bg-neutral-900/60 relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*,.pdf,.ai,.eps,.psd"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadedFile(e.target.files[0]);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex items-center justify-center gap-2 text-xs text-neutral-300">
                    <Upload className="w-4 h-4 text-red-400" />
                    <span>
                      {uploadedFile ? (
                        <span className="text-emerald-400 font-semibold">{uploadedFile.name}</span>
                      ) : (
                        <span>Upload artwork, club crest, or design reference</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-300 mb-1">
                  Message / Requirements
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share required specifications, target timelines or destination port details"
                  className="w-full bg-neutral-900 border border-white/15 focus:border-red-500 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-sports text-xl font-black uppercase tracking-wider rounded-lg shadow-lg border border-red-500 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Structuring Quote...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit & Get WhatsApp Quote</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
