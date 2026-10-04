import { getAccessToken } from './firebaseAuth';

export interface DriveFileItem {
  id: string;
  name: string;
  webViewLink?: string;
  createdTime?: string;
  size?: string;
}

export interface QuoteSpecificationData {
  quoteId: string;
  date: string;
  clientName: string;
  companyName: string;
  country: string;
  whatsapp: string;
  email: string;
  productType: string;
  quantityTier: string;
  size: string;
  customizationRequirements: string;
  message?: string;
  ballColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  hasLogoArtwork: boolean;
}

export const createSpecificationFileInDrive = async (
  spec: QuoteSpecificationData
): Promise<{ fileId: string; webViewLink?: string }> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Google Drive access token is not available. Please sign in with Google first.');
  }

  const fileName = `PowerX_Sports_Spec_${spec.productType.replace(/\s+/g, '_')}_${spec.quoteId}.txt`;
  
  const content = `=====================================================
POWERX SPORTS - B2B EXPORT SPECIFICATION SHEET
Sialkot, Pakistan | Serving International Buyers
WhatsApp: +92 323 0748123
=====================================================

INQUIRY REFERENCE: ${spec.quoteId}
DATE GENERATED: ${spec.date}

BUYER DETAILS:
- Contact Name: ${spec.clientName}
- Company Name: ${spec.companyName || 'Not specified'}
- Destination Country: ${spec.country}
- WhatsApp Number: ${spec.whatsapp}
- Email: ${spec.email || 'Not specified'}

PRODUCT SPECIFICATIONS:
- Category: ${spec.productType}
- Selected Size: ${spec.size}
- Quantity Volume Tier: ${spec.quantityTier}
${spec.ballColors ? `- Custom Colorway: Primary ${spec.ballColors.primary}, Secondary ${spec.ballColors.secondary}, Accent ${spec.ballColors.accent}` : ''}
- Artwork / Logo Included: ${spec.hasLogoArtwork ? 'Yes (Uploaded reference / mockup)' : 'Standard / Request custom placement'}

CUSTOMIZATION REQUIREMENTS:
${spec.customizationRequirements || 'Standard custom branding as agreed.'}

ADDITIONAL BUYER MESSAGE:
${spec.message || 'No additional notes.'}

-----------------------------------------------------
SUPPLY & EXPORT GUIDELINES:
- Headquartered in the sports goods hub of Sialkot, Pakistan.
- Specialized in custom football supply & international bulk export.
- To confirm pricing, sample development, and shipment lead time,
  send this reference directly to WhatsApp: +92 323 0748123.
=====================================================
`;

  const metadata = {
    name: fileName,
    mimeType: 'text/plain',
    description: `PowerX Sports B2B Quotation Tech-Pack for ${spec.clientName} (${spec.country})`,
  };

  const boundary = '-------PowerXSportsDriveBoundary987654321';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: text/plain; charset=UTF-8\r\n\r\n' +
    content +
    closeDelimiter;

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartRequestBody,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to create file in Google Drive (${res.status})`);
  }

  const data = await res.json();
  return { fileId: data.id, webViewLink: data.webViewLink };
};

export const listPowerXDriveFiles = async (): Promise<DriveFileItem[]> => {
  const token = await getAccessToken();
  if (!token) return [];

  const query = encodeURIComponent("name contains 'PowerX_Sports' and trashed = false");
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&orderBy=createdTime desc&pageSize=10&fields=files(id,name,webViewLink,createdTime,size)`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    console.error('Failed to list files from Google Drive');
    return [];
  }

  const data = await res.json();
  return data.files || [];
};

export const deleteFileFromDrive = async (fileId: string): Promise<boolean> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated with Google');

  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok && res.status !== 204) {
    throw new Error(`Failed to delete file from Google Drive (${res.status})`);
  }

  return true;
};
