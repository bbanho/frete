import QRCode from 'qrcode';

export async function generateQrCodeDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      margin: 1,
      width: 256,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error('Error generating QR code', err);
    return '';
  }
}

export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const clean = cleanPhoneNumber(phone);
  // Add Brazil country code 55 if not present
  const fullNumber = clean.startsWith('55') ? clean : `55${clean}`;
  const encodedMsg = encodeURIComponent(message || 'Olá! Vi seu panfleto de fretes e gostaria de um orçamento.');
  return `https://wa.me/${fullNumber}?text=${encodedMsg}`;
}

export function formatPhoneMask(val: string): string {
  const digits = val.replace(/\D/g, '');
  if (digits.length <= 10) {
    // (XX) XXXX-XXXX
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 14);
  }
  // (XX) XXXXX-XXXX
  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
}

export function stripHtmlToWhatsApp(html: string): string {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?b>/gi, '*')
    .replace(/<\/?strong>/gi, '*')
    .replace(/<\/?i>/gi, '_')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

export function generateWhatsAppBroadcastText(data: {
  title: string;
  driverName: string;
  phone: string;
  phoneSecondary: string;
  vehicleType: string;
  card2Title: string;
  card2Content: string;
  card3Title: string;
  card3Content: string;
  footerText: string;
}): string {
  const cleanTitle = stripHtmlToWhatsApp(data.title);
  const cleanDriver = stripHtmlToWhatsApp(data.driverName);
  const cleanVehicle = stripHtmlToWhatsApp(data.vehicleType);
  const cleanCard2 = stripHtmlToWhatsApp(data.card2Content);
  const cleanCard3 = stripHtmlToWhatsApp(data.card3Content);

  return `🚛 *${cleanTitle}* 🚛\n` +
    (cleanDriver ? `👤 *${cleanDriver}*\n` : '') +
    (cleanVehicle ? `🚚 *Veículo:* ${cleanVehicle}\n\n` : '\n') +
    `*${data.card2Title.toUpperCase()}:*\n${cleanCard2}\n\n` +
    `*${data.card3Title.toUpperCase()}:*\n${cleanCard3}\n\n` +
    `📞 *CONTATO / WHATSAPP:* ${data.phone}\n` +
    (data.phoneSecondary ? `📞 *Tel Secundário:* ${data.phoneSecondary}\n` : '') +
    `📲 Link direto: ${getWhatsAppUrl(data.phone, '')}\n\n` +
    `_${stripHtmlToWhatsApp(data.footerText)}_`;
}
