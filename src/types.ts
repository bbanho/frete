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

export type FlyerFormat = 'vertical' | 'square' | 'card';

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
}

export interface TruckPreset {
  id: string;
  name: string;
  url: string;
  tag: string;
}
