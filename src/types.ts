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

export type FlyerTemplate = 
  | 'classic'         // Clássico: Header + Foto + Card1 + 2 Cards + Footer
  | 'photo-focused'   // Foto em destaque + Cards compactos
  | 'contact-heavy'   // Contato gigante + QR + Cards mínimos
  | 'services-grid'   // Grid de serviços (3-4 cards)
  | 'minimal'         // Mínimo: Logo + Telefone + QR
  | 'double-deck';    // Dois andares (cima/baixo)

export interface ImagePosition {
  x: number;      // -100 to 100 (percentage)
  y: number;      // -100 to 100 (percentage)
  scale: number;  // 0.5 to 3.0
  rotation: number; // -180 to 180 (degrees)
}

export type TruckViewPreset = 
  | 'front'           // Frente do caminhão
  | 'side'            // Lateral (perfil)
  | 'rear'            // Traseira
  | 'curve-mountain'  // Curva subindo serra (mostra bau, altura)
  | 'loading'         // Carregando/Descarregando
  | 'highway';        // Em movimento na estrada

export interface FlyerData {
  title: string;
  subtitle: string;
  driverName: string;
  phone: string;
  phoneSecondary: string;
  vehicleType: string;
  truckPhotoUrl: string;
  imagePosition: ImagePosition;
  truckViewPreset: TruckViewPreset;
  
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
  template: FlyerTemplate; // Template/grid predefinido
}

export interface TruckPreset {
  id: string;
  name: string;
  url: string;
  tag: string;
}

