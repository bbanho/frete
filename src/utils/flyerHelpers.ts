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

export function generateWhatsAppBroadcastText(data: {
  headline: string;
  driverName: string;
  phone: string;
  vehicleType: string;
  services: string[];
  coverageArea: string;
  paymentNotice: string;
}): string {
  const serviceList = data.services.map(s => `✔️ ${s}`).join('\n');
  return `🚛 *${data.headline}* 🚛\n` +
    `👤 *${data.driverName}*\n\n` +
    `🚚 *Veículo:* ${data.vehicleType}\n` +
    `📍 *Atendemos:* ${data.coverageArea}\n\n` +
    `*SERVIÇOS REALIZADOS:*\n${serviceList}\n\n` +
    `💳 *Pagamento:* ${data.paymentNotice}\n\n` +
    `📞 *CONTATO DIRETO:* ${data.phone}\n` +
    `📲 WhatsApp: ${getWhatsAppUrl(data.phone, '')}\n\n` +
    `_Peça seu orçamento sem compromisso agora mesmo!_`;
}
