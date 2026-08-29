export type FlyerTheme = 
  | 'clean-white'
  | 'white-blue'
  | 'white-red'
  | 'white-emerald'
  | 'white-amber'
  | 'white-minimal'
  | 'yellow-black' 
  | 'black-gold'
  | 'blue-yellow' 
  | 'red-black' 
  | 'print-grayscale';

export type FlyerFormat = 
  | 'vertical'     // A4 Vertical / 1 por folha
  | 'double-a5'    // Folha Dupla / 2 por folha A4 (A5)
  | '4-up'         // 4 por folha A4 (Mini Panfletos)
  | 'square'       // Quadrado 1:1 (WhatsApp & Redes)
  | 'landscape'    // Paisagem / Horizontal A4
  | 'card';        // Cartão Compacto

export type FlyerElementKey = 
  | 'header'          // Cabeçalho (Título, Subtítulo, Motorista)
  | 'photo'           // Foto do Caminhão + Badge do Veículo
  | 'card1'           // Card Principal (Telefone Gigante, 2º Tel, QR Code, Urgência)
  | 'servicesCards'   // Os 2 Cards Secundários (Serviços + Região/Pagamento)
  | 'footer';         // Rodapé

export type ImposingFont = 
  | 'anton' 
  | 'bebas' 
  | 'archivo' 
  | 'oswald' 
  | 'montserrat' 
  | 'rubik';

export interface FlyerData {
  title: string;
  subtitle: string;
  driverName: string;
  phone: string;
  phoneSecondary: string;
  vehicleType: string;
  truckPhotoUrl: string;
  
  // 1 Card em Destaque Principal + 2 Cards a seguir (suportam HTML)
  card1Title: string;
  card1Highlight: string;
  card2Title: string;
  card2Content: string; // Serviços / O que transporta (HTML permitido)
  card3Title: string;
  card3Content: string; // Região & Pagamento (HTML permitido)
  
  footerText: string;
  showQrCode: boolean;
  theme: FlyerTheme;
  format: FlyerFormat;
  fontFamily: ImposingFont;
  elementOrder: FlyerElementKey[]; // Ordem dos blocos com arrastar e soltar
}

export interface TruckPreset {
  id: string;
  name: string;
  url: string;
  tag: string;
}

